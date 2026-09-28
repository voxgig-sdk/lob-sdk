# Creative entity test

import json
import os
import time

import pytest

from lob_sdk.utility.voxgig_struct import voxgig_struct as vs
from lob_sdk import LobSDK
from lob_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestCreativeEntity:

    def test_should_create_instance(self):
        testsdk = LobSDK.test(None, None)
        ent = testsdk.Creative(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _creative_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "creative." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LOB_TEST_CREATIVE_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        creative_ref01_ent = client.Creative(None)
        creative_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.creative"), "creative_ref01"))

        creative_ref01_data = helpers.to_map(runner.entity_data(creative_ref01_ent.create(creative_ref01_data, None)))
        assert creative_ref01_data is not None
        assert creative_ref01_data["id"] is not None

        # UPDATE
        creative_ref01_data_up0_up = {
            "id": creative_ref01_data["id"],
        }

        creative_ref01_markdef_up0_name = "date_created"
        creative_ref01_markdef_up0_value = "Mark01-creative_ref01_" + str(setup["now"])
        creative_ref01_data_up0_up[creative_ref01_markdef_up0_name] = creative_ref01_markdef_up0_value

        creative_ref01_resdata_up0 = helpers.to_map(runner.entity_data(creative_ref01_ent.update(creative_ref01_data_up0_up, None)))
        assert creative_ref01_resdata_up0 is not None
        assert creative_ref01_resdata_up0["id"] == creative_ref01_data_up0_up["id"]
        assert creative_ref01_resdata_up0[creative_ref01_markdef_up0_name] == creative_ref01_markdef_up0_value

        # LOAD
        creative_ref01_match_dt0 = {
            "id": creative_ref01_data["id"],
        }
        creative_ref01_data_dt0_loaded = creative_ref01_ent.load(creative_ref01_match_dt0, None)
        creative_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(creative_ref01_data_dt0_loaded))
        assert creative_ref01_data_dt0_load_result is not None
        assert creative_ref01_data_dt0_load_result["id"] == creative_ref01_data["id"]



def _creative_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/creative/CreativeTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LobSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["creative01", "creative02", "creative03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LOB_TEST_CREATIVE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LOB_TEST_CREATIVE_ENTID": idmap,
        "LOB_TEST_LIVE": "FALSE",
        "LOB_TEST_EXPLAIN": "FALSE",
        "LOB_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LOB_TEST_CREATIVE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LOB_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("LOB_APIKEY"),
            },
            extra or {},
        ])
        client = LobSDK(helpers.to_map(merged_opts))

    _live = env.get("LOB_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LOB_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
