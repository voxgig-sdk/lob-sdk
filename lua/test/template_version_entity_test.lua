-- TemplateVersion entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("lob_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("TemplateVersionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:TemplateVersion(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["template_version"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:TemplateVersion(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:TemplateVersion(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = template_version_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "template_version." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set LOB_TEST_TEMPLATE_VERSION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local template_version_ref01_ent = client:TemplateVersion(nil)
    local template_version_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.template_version"), "template_version_ref01"))
    template_version_ref01_data["template_id"] = setup.idmap["template01"]
    template_version_ref01_data["tmpl_id"] = setup.idmap["tmpl01"]

    local template_version_ref01_data_result, err = template_version_ref01_ent:create(template_version_ref01_data, nil)
    assert.is_nil(err)
    template_version_ref01_data = helpers.to_map(type(template_version_ref01_data_result) == 'table' and template_version_ref01_data_result.data_get and template_version_ref01_data_result:data_get() or template_version_ref01_data_result)
    assert.is_not_nil(template_version_ref01_data)
    assert.is_not_nil(template_version_ref01_data["id"])

    -- LIST
    local template_version_ref01_match = {
      ["tmpl_id"] = setup.idmap["tmpl01"],
    }

    local template_version_ref01_list_result, err = template_version_ref01_ent:list(template_version_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(template_version_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(template_version_ref01_list_result),
      { id = template_version_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- LOAD
    local template_version_ref01_match_dt0 = {
      id = template_version_ref01_data["id"],
    }
    local template_version_ref01_data_dt0_loaded, err = template_version_ref01_ent:load(template_version_ref01_match_dt0, nil)
    assert.is_nil(err)
    local template_version_ref01_data_dt0_load_result = helpers.to_map(type(template_version_ref01_data_dt0_loaded) == 'table' and template_version_ref01_data_dt0_loaded.data_get and template_version_ref01_data_dt0_loaded:data_get() or template_version_ref01_data_dt0_loaded)
    assert.is_not_nil(template_version_ref01_data_dt0_load_result)
    assert.are.equal(template_version_ref01_data_dt0_load_result["id"], template_version_ref01_data["id"])

  end)
end)

function template_version_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/template_version/TemplateVersionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read template_version test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "template_version01", "template_version02", "template_version03", "template01", "template02", "template03", "tmpl01" },
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
  local entid_env_raw = os.getenv("LOB_TEST_TEMPLATE_VERSION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["LOB_TEST_TEMPLATE_VERSION_ENTID"] = idmap,
    ["LOB_TEST_LIVE"] = "FALSE",
    ["LOB_TEST_EXPLAIN"] = "FALSE",
    ["LOB_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["LOB_TEST_TEMPLATE_VERSION_ENTID"])
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
