-- Lob SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("lob_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local LobSDK = {}
LobSDK.__index = LobSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

LobSDK._make_feature = _make_feature


function LobSDK.new(options)
  local self = setmetatable({}, LobSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function LobSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function LobSDK:get_utility()
  return Utility.copy(self._utility)
end


function LobSDK:get_root_ctx()
  return self._rootctx
end


function LobSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function LobSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function LobSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function LobSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "LobSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function LobSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function LobSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "LobSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Address():list() / client:Address():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Address(data)
  local EntityMod = require("entity.address_entity")
  if data == nil then
    if self._address == nil then
      self._address = EntityMod.new(self, nil)
    end
    return self._address
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BankAccount():list() / client:BankAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:BankAccount(data)
  local EntityMod = require("entity.bank_account_entity")
  if data == nil then
    if self._bank_account == nil then
      self._bank_account = EntityMod.new(self, nil)
    end
    return self._bank_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BankDeletion():list() / client:BankDeletion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:BankDeletion(data)
  local EntityMod = require("entity.bank_deletion_entity")
  if data == nil then
    if self._bank_deletion == nil then
      self._bank_deletion = EntityMod.new(self, nil)
    end
    return self._bank_deletion
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BillingGroup():list() / client:BillingGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:BillingGroup(data)
  local EntityMod = require("entity.billing_group_entity")
  if data == nil then
    if self._billing_group == nil then
      self._billing_group = EntityMod.new(self, nil)
    end
    return self._billing_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Booklet():list() / client:Booklet():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Booklet(data)
  local EntityMod = require("entity.booklet_entity")
  if data == nil then
    if self._booklet == nil then
      self._booklet = EntityMod.new(self, nil)
    end
    return self._booklet
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Buckslip():list() / client:Buckslip():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Buckslip(data)
  local EntityMod = require("entity.buckslip_entity")
  if data == nil then
    if self._buckslip == nil then
      self._buckslip = EntityMod.new(self, nil)
    end
    return self._buckslip
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BuckslipOrder():list() / client:BuckslipOrder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:BuckslipOrder(data)
  local EntityMod = require("entity.buckslip_order_entity")
  if data == nil then
    if self._buckslip_order == nil then
      self._buckslip_order = EntityMod.new(self, nil)
    end
    return self._buckslip_order
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Campaign():list() / client:Campaign():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Campaign(data)
  local EntityMod = require("entity.campaign_entity")
  if data == nil then
    if self._campaign == nil then
      self._campaign = EntityMod.new(self, nil)
    end
    return self._campaign
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Card():list() / client:Card():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Card(data)
  local EntityMod = require("entity.card_entity")
  if data == nil then
    if self._card == nil then
      self._card = EntityMod.new(self, nil)
    end
    return self._card
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardOrder():list() / client:CardOrder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:CardOrder(data)
  local EntityMod = require("entity.card_order_entity")
  if data == nil then
    if self._card_order == nil then
      self._card_order = EntityMod.new(self, nil)
    end
    return self._card_order
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Check():list() / client:Check():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Check(data)
  local EntityMod = require("entity.check_entity")
  if data == nil then
    if self._check == nil then
      self._check = EntityMod.new(self, nil)
    end
    return self._check
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Creative():list() / client:Creative():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Creative(data)
  local EntityMod = require("entity.creative_entity")
  if data == nil then
    if self._creative == nil then
      self._creative = EntityMod.new(self, nil)
    end
    return self._creative
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Domain():list() / client:Domain():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Domain(data)
  local EntityMod = require("entity.domain_entity")
  if data == nil then
    if self._domain == nil then
      self._domain = EntityMod.new(self, nil)
    end
    return self._domain
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IdentityValidation():list() / client:IdentityValidation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:IdentityValidation(data)
  local EntityMod = require("entity.identity_validation_entity")
  if data == nil then
    if self._identity_validation == nil then
      self._identity_validation = EntityMod.new(self, nil)
    end
    return self._identity_validation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IntlVerification():list() / client:IntlVerification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:IntlVerification(data)
  local EntityMod = require("entity.intl_verification_entity")
  if data == nil then
    if self._intl_verification == nil then
      self._intl_verification = EntityMod.new(self, nil)
    end
    return self._intl_verification
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Letter():list() / client:Letter():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Letter(data)
  local EntityMod = require("entity.letter_entity")
  if data == nil then
    if self._letter == nil then
      self._letter = EntityMod.new(self, nil)
    end
    return self._letter
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Link():list() / client:Link():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Link(data)
  local EntityMod = require("entity.link_entity")
  if data == nil then
    if self._link == nil then
      self._link = EntityMod.new(self, nil)
    end
    return self._link
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LobCreditsBalance():list() / client:LobCreditsBalance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:LobCreditsBalance(data)
  local EntityMod = require("entity.lob_credits_balance_entity")
  if data == nil then
    if self._lob_credits_balance == nil then
      self._lob_credits_balance = EntityMod.new(self, nil)
    end
    return self._lob_credits_balance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Postcard():list() / client:Postcard():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Postcard(data)
  local EntityMod = require("entity.postcard_entity")
  if data == nil then
    if self._postcard == nil then
      self._postcard = EntityMod.new(self, nil)
    end
    return self._postcard
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:QrCode():list() / client:QrCode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:QrCode(data)
  local EntityMod = require("entity.qr_code_entity")
  if data == nil then
    if self._qr_code == nil then
      self._qr_code = EntityMod.new(self, nil)
    end
    return self._qr_code
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ResourceProof():list() / client:ResourceProof():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:ResourceProof(data)
  local EntityMod = require("entity.resource_proof_entity")
  if data == nil then
    if self._resource_proof == nil then
      self._resource_proof = EntityMod.new(self, nil)
    end
    return self._resource_proof
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Response():list() / client:Response():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Response(data)
  local EntityMod = require("entity.response_entity")
  if data == nil then
    if self._response == nil then
      self._response = EntityMod.new(self, nil)
    end
    return self._response
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReverseGeocode():list() / client:ReverseGeocode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:ReverseGeocode(data)
  local EntityMod = require("entity.reverse_geocode_entity")
  if data == nil then
    if self._reverse_geocode == nil then
      self._reverse_geocode = EntityMod.new(self, nil)
    end
    return self._reverse_geocode
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SelfMailer():list() / client:SelfMailer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:SelfMailer(data)
  local EntityMod = require("entity.self_mailer_entity")
  if data == nil then
    if self._self_mailer == nil then
      self._self_mailer = EntityMod.new(self, nil)
    end
    return self._self_mailer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SnapPack():list() / client:SnapPack():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:SnapPack(data)
  local EntityMod = require("entity.snap_pack_entity")
  if data == nil then
    if self._snap_pack == nil then
      self._snap_pack = EntityMod.new(self, nil)
    end
    return self._snap_pack
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Template():list() / client:Template():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Template(data)
  local EntityMod = require("entity.template_entity")
  if data == nil then
    if self._template == nil then
      self._template = EntityMod.new(self, nil)
    end
    return self._template
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TemplateVersion():list() / client:TemplateVersion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:TemplateVersion(data)
  local EntityMod = require("entity.template_version_entity")
  if data == nil then
    if self._template_version == nil then
      self._template_version = EntityMod.new(self, nil)
    end
    return self._template_version
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TemplateVersionDeletion():list() / client:TemplateVersionDeletion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:TemplateVersionDeletion(data)
  local EntityMod = require("entity.template_version_deletion_entity")
  if data == nil then
    if self._template_version_deletion == nil then
      self._template_version_deletion = EntityMod.new(self, nil)
    end
    return self._template_version_deletion
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Upload():list() / client:Upload():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Upload(data)
  local EntityMod = require("entity.upload_entity")
  if data == nil then
    if self._upload == nil then
      self._upload = EntityMod.new(self, nil)
    end
    return self._upload
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UploadCreateExport():list() / client:UploadCreateExport():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:UploadCreateExport(data)
  local EntityMod = require("entity.upload_create_export_entity")
  if data == nil then
    if self._upload_create_export == nil then
      self._upload_create_export = EntityMod.new(self, nil)
    end
    return self._upload_create_export
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UsAutocompletion():list() / client:UsAutocompletion():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:UsAutocompletion(data)
  local EntityMod = require("entity.us_autocompletion_entity")
  if data == nil then
    if self._us_autocompletion == nil then
      self._us_autocompletion = EntityMod.new(self, nil)
    end
    return self._us_autocompletion
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UsVerification():list() / client:UsVerification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:UsVerification(data)
  local EntityMod = require("entity.us_verification_entity")
  if data == nil then
    if self._us_verification == nil then
      self._us_verification = EntityMod.new(self, nil)
    end
    return self._us_verification
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Zip():list() / client:Zip():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LobSDK:Zip(data)
  local EntityMod = require("entity.zip_entity")
  if data == nil then
    if self._zip == nil then
      self._zip = EntityMod.new(self, nil)
    end
    return self._zip
  end
  return EntityMod.new(self, data)
end




function LobSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = LobSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return LobSDK
