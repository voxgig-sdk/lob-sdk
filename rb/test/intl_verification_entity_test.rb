# IntlVerification entity test

require "minitest/autorun"
require "json"
require_relative "../Lob_sdk"
require_relative "runner"

class IntlVerificationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LobSDK.test(nil, nil)
    ent = testsdk.IntlVerification(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = intl_verification_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "intl_verification." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LOB_TEST_INTL_VERIFICATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    intl_verification_ref01_ent = client.IntlVerification(nil)
    intl_verification_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.intl_verification"), "intl_verification_ref01"))

    intl_verification_ref01_data_result = intl_verification_ref01_ent.create(intl_verification_ref01_data, nil)
    intl_verification_ref01_data = Helpers.to_map(intl_verification_ref01_data_result.respond_to?(:data_get) ? intl_verification_ref01_data_result.data_get : intl_verification_ref01_data_result)
    assert !intl_verification_ref01_data.nil?
    assert !intl_verification_ref01_data["id"].nil?

  end
end

def intl_verification_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "intl_verification", "IntlVerificationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LobSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["intl_verification01", "intl_verification02", "intl_verification03"],
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
  entid_env_raw = ENV["LOB_TEST_INTL_VERIFICATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LOB_TEST_INTL_VERIFICATION_ENTID" => idmap,
    "LOB_TEST_LIVE" => "FALSE",
    "LOB_TEST_EXPLAIN" => "FALSE",
    "LOB_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LOB_TEST_INTL_VERIFICATION_ENTID"])
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
