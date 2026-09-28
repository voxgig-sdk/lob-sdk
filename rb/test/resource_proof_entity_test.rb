# ResourceProof entity test

require "minitest/autorun"
require "json"
require_relative "../Lob_sdk"
require_relative "runner"

class ResourceProofEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LobSDK.test(nil, nil)
    ent = testsdk.ResourceProof(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = resource_proof_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "resource_proof." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LOB_TEST_RESOURCE_PROOF_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    resource_proof_ref01_ent = client.ResourceProof(nil)
    resource_proof_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.resource_proof"), "resource_proof_ref01"))

    resource_proof_ref01_data_result = resource_proof_ref01_ent.create(resource_proof_ref01_data, nil)
    resource_proof_ref01_data = Helpers.to_map(resource_proof_ref01_data_result.respond_to?(:data_get) ? resource_proof_ref01_data_result.data_get : resource_proof_ref01_data_result)
    assert !resource_proof_ref01_data.nil?
    assert !resource_proof_ref01_data["id"].nil?

    # UPDATE
    resource_proof_ref01_data_up0_up = {
      "id" => resource_proof_ref01_data["id"],
    }

    resource_proof_ref01_markdef_up0_name = "date_created"
    resource_proof_ref01_markdef_up0_value = "Mark01-resource_proof_ref01_#{setup[:now]}"
    resource_proof_ref01_data_up0_up[resource_proof_ref01_markdef_up0_name] = resource_proof_ref01_markdef_up0_value

    resource_proof_ref01_resdata_up0_result = resource_proof_ref01_ent.update(resource_proof_ref01_data_up0_up, nil)
    resource_proof_ref01_resdata_up0 = Helpers.to_map(resource_proof_ref01_resdata_up0_result.respond_to?(:data_get) ? resource_proof_ref01_resdata_up0_result.data_get : resource_proof_ref01_resdata_up0_result)
    assert !resource_proof_ref01_resdata_up0.nil?
    assert_equal resource_proof_ref01_resdata_up0["id"], resource_proof_ref01_data_up0_up["id"]
    assert_equal resource_proof_ref01_resdata_up0[resource_proof_ref01_markdef_up0_name], resource_proof_ref01_markdef_up0_value

    # LOAD
    resource_proof_ref01_match_dt0 = {
      "id" => resource_proof_ref01_data["id"],
    }
    resource_proof_ref01_data_dt0_loaded = resource_proof_ref01_ent.load(resource_proof_ref01_match_dt0, nil)
    resource_proof_ref01_data_dt0_load_result = Helpers.to_map(resource_proof_ref01_data_dt0_loaded.respond_to?(:data_get) ? resource_proof_ref01_data_dt0_loaded.data_get : resource_proof_ref01_data_dt0_loaded)
    assert !resource_proof_ref01_data_dt0_load_result.nil?
    assert_equal resource_proof_ref01_data_dt0_load_result["id"], resource_proof_ref01_data["id"]

  end
end

def resource_proof_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "resource_proof", "ResourceProofTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LobSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["resource_proof01", "resource_proof02", "resource_proof03"],
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
  entid_env_raw = ENV["LOB_TEST_RESOURCE_PROOF_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LOB_TEST_RESOURCE_PROOF_ENTID" => idmap,
    "LOB_TEST_LIVE" => "FALSE",
    "LOB_TEST_EXPLAIN" => "FALSE",
    "LOB_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LOB_TEST_RESOURCE_PROOF_ENTID"])
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
