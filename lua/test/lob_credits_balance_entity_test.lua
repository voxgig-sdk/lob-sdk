-- LobCreditsBalance entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("lob_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("LobCreditsBalanceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:LobCreditsBalance(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = lob_credits_balance_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "lob_credits_balance." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set LOB_TEST_LOB_CREDITS_BALANCE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local lob_credits_balance_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.lob_credits_balance")))
    local lob_credits_balance_ref01_data = nil
    if #lob_credits_balance_ref01_data_raw > 0 then
      lob_credits_balance_ref01_data = helpers.to_map(lob_credits_balance_ref01_data_raw[1][2])
    end

    -- LOAD
    local lob_credits_balance_ref01_ent = client:LobCreditsBalance(nil)
    local lob_credits_balance_ref01_match_dt0 = {}
    local lob_credits_balance_ref01_data_dt0_loaded, err = lob_credits_balance_ref01_ent:load(lob_credits_balance_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(lob_credits_balance_ref01_data_dt0_loaded)

  end)
end)

function lob_credits_balance_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/lob_credits_balance/LobCreditsBalanceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read lob_credits_balance test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "lob_credits_balance01", "lob_credits_balance02", "lob_credits_balance03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("LOB_TEST_LOB_CREDITS_BALANCE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LOB_TEST_LOB_CREDITS_BALANCE_ENTID"] = idmap,
    ["LOB_TEST_LIVE"] = "FALSE",
    ["LOB_TEST_EXPLAIN"] = "FALSE",
    ["LOB_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["LOB_TEST_LOB_CREDITS_BALANCE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["LOB_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["LOB_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["LOB_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["LOB_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
