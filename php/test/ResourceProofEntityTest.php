<?php
declare(strict_types=1);

// ResourceProof entity test

require_once __DIR__ . '/../lob_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ResourceProofEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LobSDK::test(null, null);
        $ent = $testsdk->ResourceProof(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = resource_proof_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "resource_proof." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LOB_TEST_RESOURCE_PROOF_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $resource_proof_ref01_ent = $client->ResourceProof(null);
        $resource_proof_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.resource_proof"), "resource_proof_ref01"));

        $resource_proof_ref01_data_result = $resource_proof_ref01_ent->create($resource_proof_ref01_data, null);
        $resource_proof_ref01_data = Helpers::to_map(is_object($resource_proof_ref01_data_result) && method_exists($resource_proof_ref01_data_result, 'data_get') ? $resource_proof_ref01_data_result->data_get() : $resource_proof_ref01_data_result);
        $this->assertNotNull($resource_proof_ref01_data);
        $this->assertNotNull($resource_proof_ref01_data["id"]);

        // UPDATE
        $resource_proof_ref01_data_up0_up = [
            "id" => $resource_proof_ref01_data["id"],
        ];

        $resource_proof_ref01_markdef_up0_name = "date_created";
        $resource_proof_ref01_markdef_up0_value = "Mark01-resource_proof_ref01_" . $setup["now"];
        $resource_proof_ref01_data_up0_up[$resource_proof_ref01_markdef_up0_name] = $resource_proof_ref01_markdef_up0_value;

        $resource_proof_ref01_resdata_up0_result = $resource_proof_ref01_ent->update($resource_proof_ref01_data_up0_up, null);
        $resource_proof_ref01_resdata_up0 = Helpers::to_map(is_object($resource_proof_ref01_resdata_up0_result) && method_exists($resource_proof_ref01_resdata_up0_result, 'data_get') ? $resource_proof_ref01_resdata_up0_result->data_get() : $resource_proof_ref01_resdata_up0_result);
        $this->assertNotNull($resource_proof_ref01_resdata_up0);
        $this->assertEquals($resource_proof_ref01_resdata_up0["id"], $resource_proof_ref01_data_up0_up["id"]);
        $this->assertEquals($resource_proof_ref01_resdata_up0[$resource_proof_ref01_markdef_up0_name], $resource_proof_ref01_markdef_up0_value);

        // LOAD
        $resource_proof_ref01_match_dt0 = [
            "id" => $resource_proof_ref01_data["id"],
        ];
        $resource_proof_ref01_data_dt0_loaded = $resource_proof_ref01_ent->load($resource_proof_ref01_match_dt0, null);
        $resource_proof_ref01_data_dt0_load_result = Helpers::to_map(is_object($resource_proof_ref01_data_dt0_loaded) && method_exists($resource_proof_ref01_data_dt0_loaded, 'data_get') ? $resource_proof_ref01_data_dt0_loaded->data_get() : $resource_proof_ref01_data_dt0_loaded);
        $this->assertNotNull($resource_proof_ref01_data_dt0_load_result);
        $this->assertEquals($resource_proof_ref01_data_dt0_load_result["id"], $resource_proof_ref01_data["id"]);

    }
}

function resource_proof_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/resource_proof/ResourceProofTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LobSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["resource_proof01", "resource_proof02", "resource_proof03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LOB_TEST_RESOURCE_PROOF_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LOB_TEST_RESOURCE_PROOF_ENTID" => $idmap,
        "LOB_TEST_LIVE" => "FALSE",
        "LOB_TEST_EXPLAIN" => "FALSE",
        "LOB_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LOB_TEST_RESOURCE_PROOF_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LOB_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["LOB_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new LobSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["LOB_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LOB_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
