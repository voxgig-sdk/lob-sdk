package sdktest

import (
	"encoding/json"
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

func TestSnapPackEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SnapPack(nil)
		if ent == nil {
			t.Fatal("expected non-nil SnapPackEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"snap_pack": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.SnapPack(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.SnapPack(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := snap_packBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "snap_pack." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LOB_TEST_SNAP_PACK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		snapPackRef01Ent := client.SnapPack(nil)
		snapPackRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "snap_pack"}), "snap_pack_ref01"))

		snapPackRef01DataResult, err := snapPackRef01Ent.Create(snapPackRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		snapPackRef01Data = core.ToMapAny(entityData(snapPackRef01DataResult))
		if snapPackRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if snapPackRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		snapPackRef01Match := map[string]any{}

		snapPackRef01ListResult, err := snapPackRef01Ent.List(snapPackRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		snapPackRef01List, snapPackRef01ListOk := snapPackRef01ListResult.([]any)
		if !snapPackRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", snapPackRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(snapPackRef01List), map[string]any{"id": snapPackRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		snapPackRef01MatchDt0 := map[string]any{
			"id": snapPackRef01Data["id"],
		}
		snapPackRef01DataDt0Loaded, err := snapPackRef01Ent.Load(snapPackRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		snapPackRef01DataDt0LoadResult := core.ToMapAny(entityData(snapPackRef01DataDt0Loaded))
		if snapPackRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if snapPackRef01DataDt0LoadResult["id"] != snapPackRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		snapPackRef01MatchRm0 := map[string]any{
			"id": snapPackRef01Data["id"],
		}
		_, err = snapPackRef01Ent.Remove(snapPackRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		snapPackRef01MatchRt0 := map[string]any{}

		snapPackRef01ListRt0Result, err := snapPackRef01Ent.List(snapPackRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		snapPackRef01ListRt0, snapPackRef01ListRt0Ok := snapPackRef01ListRt0Result.([]any)
		if !snapPackRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", snapPackRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(snapPackRef01ListRt0), map[string]any{"id": snapPackRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func snap_packBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "snap_pack", "SnapPackTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read snap_pack test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse snap_pack test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"snap_pack01", "snap_pack02", "snap_pack03"},
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
	entidEnvRaw := os.Getenv("LOB_TEST_SNAP_PACK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOB_TEST_SNAP_PACK_ENTID": idmap,
		"LOB_TEST_LIVE":      "FALSE",
		"LOB_TEST_EXPLAIN":   "FALSE",
		"LOB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LOB_TEST_SNAP_PACK_ENTID"])
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
