# Lob SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Lob_types'


class LobSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = LobUtility.new
    @_utility = utility

    config = LobConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = LobHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = LobHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, LobFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    LobUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = LobHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = LobHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = LobHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = LobSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    allow_op.is_a?(String) && allow_op.include?(op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => LobError.new(
        "#{op}_allow",
        "LobSDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\""),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue LobError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = LobHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = LobHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = LobError.new(
        "graphql_error", "LobSDK: graphql: #{msg}")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.Address.list / client.Address.load({ "id" => ... })
  def Address(data = nil)
    require_relative 'entity/address_entity'
    AddressEntity.new(self, data)
  end


  # Canonical facade: client.BankAccount.list / client.BankAccount.load({ "id" => ... })
  def BankAccount(data = nil)
    require_relative 'entity/bank_account_entity'
    BankAccountEntity.new(self, data)
  end


  # Canonical facade: client.BankDeletion.list / client.BankDeletion.load({ "id" => ... })
  def BankDeletion(data = nil)
    require_relative 'entity/bank_deletion_entity'
    BankDeletionEntity.new(self, data)
  end


  # Canonical facade: client.BillingGroup.list / client.BillingGroup.load({ "id" => ... })
  def BillingGroup(data = nil)
    require_relative 'entity/billing_group_entity'
    BillingGroupEntity.new(self, data)
  end


  # Canonical facade: client.Booklet.list / client.Booklet.load({ "id" => ... })
  def Booklet(data = nil)
    require_relative 'entity/booklet_entity'
    BookletEntity.new(self, data)
  end


  # Canonical facade: client.Buckslip.list / client.Buckslip.load({ "id" => ... })
  def Buckslip(data = nil)
    require_relative 'entity/buckslip_entity'
    BuckslipEntity.new(self, data)
  end


  # Canonical facade: client.BuckslipOrder.list / client.BuckslipOrder.load({ "id" => ... })
  def BuckslipOrder(data = nil)
    require_relative 'entity/buckslip_order_entity'
    BuckslipOrderEntity.new(self, data)
  end


  # Canonical facade: client.Campaign.list / client.Campaign.load({ "id" => ... })
  def Campaign(data = nil)
    require_relative 'entity/campaign_entity'
    CampaignEntity.new(self, data)
  end


  # Canonical facade: client.Card.list / client.Card.load({ "id" => ... })
  def Card(data = nil)
    require_relative 'entity/card_entity'
    CardEntity.new(self, data)
  end


  # Canonical facade: client.CardOrder.list / client.CardOrder.load({ "id" => ... })
  def CardOrder(data = nil)
    require_relative 'entity/card_order_entity'
    CardOrderEntity.new(self, data)
  end


  # Canonical facade: client.Check.list / client.Check.load({ "id" => ... })
  def Check(data = nil)
    require_relative 'entity/check_entity'
    CheckEntity.new(self, data)
  end


  # Canonical facade: client.Creative.list / client.Creative.load({ "id" => ... })
  def Creative(data = nil)
    require_relative 'entity/creative_entity'
    CreativeEntity.new(self, data)
  end


  # Canonical facade: client.Domain.list / client.Domain.load({ "id" => ... })
  def Domain(data = nil)
    require_relative 'entity/domain_entity'
    DomainEntity.new(self, data)
  end


  # Canonical facade: client.IdentityValidation.list / client.IdentityValidation.load({ "id" => ... })
  def IdentityValidation(data = nil)
    require_relative 'entity/identity_validation_entity'
    IdentityValidationEntity.new(self, data)
  end


  # Canonical facade: client.IntlVerification.list / client.IntlVerification.load({ "id" => ... })
  def IntlVerification(data = nil)
    require_relative 'entity/intl_verification_entity'
    IntlVerificationEntity.new(self, data)
  end


  # Canonical facade: client.Letter.list / client.Letter.load({ "id" => ... })
  def Letter(data = nil)
    require_relative 'entity/letter_entity'
    LetterEntity.new(self, data)
  end


  # Canonical facade: client.Link.list / client.Link.load({ "id" => ... })
  def Link(data = nil)
    require_relative 'entity/link_entity'
    LinkEntity.new(self, data)
  end


  # Canonical facade: client.LobCreditsBalance.list / client.LobCreditsBalance.load({ "id" => ... })
  def LobCreditsBalance(data = nil)
    require_relative 'entity/lob_credits_balance_entity'
    LobCreditsBalanceEntity.new(self, data)
  end


  # Canonical facade: client.Postcard.list / client.Postcard.load({ "id" => ... })
  def Postcard(data = nil)
    require_relative 'entity/postcard_entity'
    PostcardEntity.new(self, data)
  end


  # Canonical facade: client.QrCode.list / client.QrCode.load({ "id" => ... })
  def QrCode(data = nil)
    require_relative 'entity/qr_code_entity'
    QrCodeEntity.new(self, data)
  end


  # Canonical facade: client.ResourceProof.list / client.ResourceProof.load({ "id" => ... })
  def ResourceProof(data = nil)
    require_relative 'entity/resource_proof_entity'
    ResourceProofEntity.new(self, data)
  end


  # Canonical facade: client.Response.list / client.Response.load({ "id" => ... })
  def Response(data = nil)
    require_relative 'entity/response_entity'
    ResponseEntity.new(self, data)
  end


  # Canonical facade: client.ReverseGeocode.list / client.ReverseGeocode.load({ "id" => ... })
  def ReverseGeocode(data = nil)
    require_relative 'entity/reverse_geocode_entity'
    ReverseGeocodeEntity.new(self, data)
  end


  # Canonical facade: client.SelfMailer.list / client.SelfMailer.load({ "id" => ... })
  def SelfMailer(data = nil)
    require_relative 'entity/self_mailer_entity'
    SelfMailerEntity.new(self, data)
  end


  # Canonical facade: client.SnapPack.list / client.SnapPack.load({ "id" => ... })
  def SnapPack(data = nil)
    require_relative 'entity/snap_pack_entity'
    SnapPackEntity.new(self, data)
  end


  # Canonical facade: client.Template.list / client.Template.load({ "id" => ... })
  def Template(data = nil)
    require_relative 'entity/template_entity'
    TemplateEntity.new(self, data)
  end


  # Canonical facade: client.TemplateVersion.list / client.TemplateVersion.load({ "id" => ... })
  def TemplateVersion(data = nil)
    require_relative 'entity/template_version_entity'
    TemplateVersionEntity.new(self, data)
  end


  # Canonical facade: client.TemplateVersionDeletion.list / client.TemplateVersionDeletion.load({ "id" => ... })
  def TemplateVersionDeletion(data = nil)
    require_relative 'entity/template_version_deletion_entity'
    TemplateVersionDeletionEntity.new(self, data)
  end


  # Canonical facade: client.Upload.list / client.Upload.load({ "id" => ... })
  def Upload(data = nil)
    require_relative 'entity/upload_entity'
    UploadEntity.new(self, data)
  end


  # Canonical facade: client.UploadCreateExport.list / client.UploadCreateExport.load({ "id" => ... })
  def UploadCreateExport(data = nil)
    require_relative 'entity/upload_create_export_entity'
    UploadCreateExportEntity.new(self, data)
  end


  # Canonical facade: client.UsAutocompletion.list / client.UsAutocompletion.load({ "id" => ... })
  def UsAutocompletion(data = nil)
    require_relative 'entity/us_autocompletion_entity'
    UsAutocompletionEntity.new(self, data)
  end


  # Canonical facade: client.UsVerification.list / client.UsVerification.load({ "id" => ... })
  def UsVerification(data = nil)
    require_relative 'entity/us_verification_entity'
    UsVerificationEntity.new(self, data)
  end


  # Canonical facade: client.Zip.list / client.Zip.load({ "id" => ... })
  def Zip(data = nil)
    require_relative 'entity/zip_entity'
    ZipEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = LobSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
