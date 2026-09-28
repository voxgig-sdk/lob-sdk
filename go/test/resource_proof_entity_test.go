package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/lob-sdk/go"
	"github.com/voxgig-sdk/lob-sdk/go/core"

	vs "github.com/voxgig-sdk/lob-sdk/go/utility/struct"
)

func TestResourceProofEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ResourceProof(nil)
		if ent == nil {
			t.Fatal("expected non-nil ResourceProofEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := resource_proofBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "resource_proof." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LOB_TEST_RESOURCE_PROOF_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		resourceProofRef01Ent := client.ResourceProof(nil)
		resourceProofRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "resource_proof"}), "resource_proof_ref01"))

		resourceProofRef01DataResult, err := resourceProofRef01Ent.Create(resourceProofRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		resourceProofRef01Data = core.ToMapAny(entityData(resourceProofRef01DataResult))
		if resourceProofRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if resourceProofRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		resourceProofRef01DataUp0Up := map[string]any{
			"id": resourceProofRef01Data["id"],
		}

		resourceProofRef01MarkdefUp0Name := "date_created"
		resourceProofRef01MarkdefUp0Value := fmt.Sprintf("Mark01-resource_proof_ref01_%d", setup.now)
		resourceProofRef01DataUp0Up[resourceProofRef01MarkdefUp0Name] = resourceProofRef01MarkdefUp0Value

		resourceProofRef01ResdataUp0Result, err := resourceProofRef01Ent.Update(resourceProofRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		resourceProofRef01ResdataUp0 := core.ToMapAny(entityData(resourceProofRef01ResdataUp0Result))
		if resourceProofRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if resourceProofRef01ResdataUp0["id"] != resourceProofRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if resourceProofRef01ResdataUp0[resourceProofRef01MarkdefUp0Name] != resourceProofRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", resourceProofRef01MarkdefUp0Name, resourceProofRef01ResdataUp0[resourceProofRef01MarkdefUp0Name])
		}

		// LOAD
		resourceProofRef01MatchDt0 := map[string]any{
			"id": resourceProofRef01Data["id"],
		}
		resourceProofRef01DataDt0Loaded, err := resourceProofRef01Ent.Load(resourceProofRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		resourceProofRef01DataDt0LoadResult := core.ToMapAny(entityData(resourceProofRef01DataDt0Loaded))
		if resourceProofRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if resourceProofRef01DataDt0LoadResult["id"] != resourceProofRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func resource_proofBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "resource_proof", "ResourceProofTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read resource_proof test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse resource_proof test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"resource_proof01", "resource_proof02", "resource_proof03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LOB_TEST_RESOURCE_PROOF_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOB_TEST_RESOURCE_PROOF_ENTID": idmap,
		"LOB_TEST_LIVE":      "FALSE",
		"LOB_TEST_EXPLAIN":   "FALSE",
		"LOB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LOB_TEST_RESOURCE_PROOF_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LOB_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LOB_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewLobSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LOB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LOB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
