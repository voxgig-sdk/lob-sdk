# BillingGroup entity test

import json
import os
import time

import pytest

from lob_sdk.utility.voxgig_struct import voxgig_struct as vs
from lob_sdk import LobSDK
from lob_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBillingGroupEntity:

    def test_should_create_instance(self):
        testsdk = LobSDK.test(None, None)
        ent = testsdk.BillingGroup(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "billing_group": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = LobSDK.test(seed, None)
        seen = list(base.BillingGroup(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from lob_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = LobSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.BillingGroup(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _billing_group_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "billing_group." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LOB_TEST_BILLING_GROUP_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        billing_group_ref01_ent = client.BillingGroup(None)
        billing_group_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.billing_group"), "billing_group_ref01"))

        billing_group_ref01_data = helpers.to_map(runner.entity_data(billing_group_ref01_ent.create(billing_group_ref01_data, None)))
        assert billing_group_ref01_data is not None
        assert billing_group_ref01_data["id"] is not None

        # LIST
        billing_group_ref01_match = {}

        billing_group_ref01_list_result = billing_group_ref01_ent.list(billing_group_ref01_match, None)
        assert isinstance(billing_group_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(billing_group_ref01_list_result),
            {"id": billing_group_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        billing_group_ref01_match_dt0 = {
            "id": billing_group_ref01_data["id"],
        }
        billing_group_ref01_data_dt0_loaded = billing_group_ref01_ent.load(billing_group_ref01_match_dt0, None)
        billing_group_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(billing_group_ref01_data_dt0_loaded))
        assert billing_group_ref01_data_dt0_load_result is not None
        assert billing_group_ref01_data_dt0_load_result["id"] == billing_group_ref01_data["id"]



def _billing_group_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/billing_group/BillingGroupTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LobSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["billing_group01", "billing_group02", "billing_group03"],
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
        "LOB_TEST_BILLING_GROUP_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LOB_TEST_BILLING_GROUP_ENTID": idmap,
        "LOB_TEST_LIVE": "FALSE",
        "LOB_TEST_EXPLAIN": "FALSE",
        "LOB_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LOB_TEST_BILLING_GROUP_ENTID"))
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
