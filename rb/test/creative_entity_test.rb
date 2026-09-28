# Creative entity test

require "minitest/autorun"
require "json"
require_relative "../Lob_sdk"
require_relative "runner"

class CreativeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LobSDK.test(nil, nil)
    ent = testsdk.Creative(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = creative_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "creative." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LOB_TEST_CREATIVE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    creative_ref01_ent = client.Creative(nil)
    creative_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.creative"), "creative_ref01"))

    creative_ref01_data_result = creative_ref01_ent.create(creative_ref01_data, nil)
    creative_ref01_data = Helpers.to_map(creative_ref01_data_result.respond_to?(:data_get) ? creative_ref01_data_result.data_get : creative_ref01_data_result)
    assert !creative_ref01_data.nil?
    assert !creative_ref01_data["id"].nil?

    # UPDATE
    creative_ref01_data_up0_up = {
      "id" => creative_ref01_data["id"],
    }

    creative_ref01_markdef_up0_name = "date_created"
    creative_ref01_markdef_up0_value = "Mark01-creative_ref01_#{setup[:now]}"
    creative_ref01_data_up0_up[creative_ref01_markdef_up0_name] = creative_ref01_markdef_up0_value

    creative_ref01_resdata_up0_result = creative_ref01_ent.update(creative_ref01_data_up0_up, nil)
    creative_ref01_resdata_up0 = Helpers.to_map(creative_ref01_resdata_up0_result.respond_to?(:data_get) ? creative_ref01_resdata_up0_result.data_get : creative_ref01_resdata_up0_result)
    assert !creative_ref01_resdata_up0.nil?
    assert_equal creative_ref01_resdata_up0["id"], creative_ref01_data_up0_up["id"]
    assert_equal creative_ref01_resdata_up0[creative_ref01_markdef_up0_name], creative_ref01_markdef_up0_value

    # LOAD
    creative_ref01_match_dt0 = {
      "id" => creative_ref01_data["id"],
    }
    creative_ref01_data_dt0_loaded = creative_ref01_ent.load(creative_ref01_match_dt0, nil)
    creative_ref01_data_dt0_load_result = Helpers.to_map(creative_ref01_data_dt0_loaded.respond_to?(:data_get) ? creative_ref01_data_dt0_loaded.data_get : creative_ref01_data_dt0_loaded)
    assert !creative_ref01_data_dt0_load_result.nil?
    assert_equal creative_ref01_data_dt0_load_result["id"], creative_ref01_data["id"]

  end
end

def creative_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "creative", "CreativeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LobSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["creative01", "creative02", "creative03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LOB_TEST_CREATIVE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LOB_TEST_CREATIVE_ENTID" => idmap,
    "LOB_TEST_LIVE" => "FALSE",
    "LOB_TEST_EXPLAIN" => "FALSE",
    "LOB_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LOB_TEST_CREATIVE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LOB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["LOB_APIKEY"],
      },
      extra || {},
    ])
    client = LobSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LOB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LOB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
