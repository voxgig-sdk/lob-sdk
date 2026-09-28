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

func TestSelfMailerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SelfMailer(nil)
		if ent == nil {
			t.Fatal("expected non-nil SelfMailerEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"self_mailer": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.SelfMailer(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.SelfMailer(nil).Stream("list", nil, nil) {
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
		setup := self_mailerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "self_mailer." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LOB_TEST_SELF_MAILER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		selfMailerRef01Ent := client.SelfMailer(nil)
		selfMailerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "self_mailer"}), "self_mailer_ref01"))

		selfMailerRef01DataResult, err := selfMailerRef01Ent.Create(selfMailerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		selfMailerRef01Data = core.ToMapAny(entityData(selfMailerRef01DataResult))
		if selfMailerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if selfMailerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		selfMailerRef01Match := map[string]any{}

		selfMailerRef01ListResult, err := selfMailerRef01Ent.List(selfMailerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		selfMailerRef01List, selfMailerRef01ListOk := selfMailerRef01ListResult.([]any)
		if !selfMailerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", selfMailerRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(selfMailerRef01List), map[string]any{"id": selfMailerRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		selfMailerRef01MatchDt0 := map[string]any{
			"id": selfMailerRef01Data["id"],
		}
		selfMailerRef01DataDt0Loaded, err := selfMailerRef01Ent.Load(selfMailerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		selfMailerRef01DataDt0LoadResult := core.ToMapAny(entityData(selfMailerRef01DataDt0Loaded))
		if selfMailerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if selfMailerRef01DataDt0LoadResult["id"] != selfMailerRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		selfMailerRef01MatchRm0 := map[string]any{
			"id": selfMailerRef01Data["id"],
		}
		_, err = selfMailerRef01Ent.Remove(selfMailerRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		selfMailerRef01MatchRt0 := map[string]any{}

		selfMailerRef01ListRt0Result, err := selfMailerRef01Ent.List(selfMailerRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		selfMailerRef01ListRt0, selfMailerRef01ListRt0Ok := selfMailerRef01ListRt0Result.([]any)
		if !selfMailerRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", selfMailerRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(selfMailerRef01ListRt0), map[string]any{"id": selfMailerRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func self_mailerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "self_mailer", "SelfMailerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read self_mailer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse self_mailer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"self_mailer01", "self_mailer02", "self_mailer03"},
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
	entidEnvRaw := os.Getenv("LOB_TEST_SELF_MAILER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOB_TEST_SELF_MAILER_ENTID": idmap,
		"LOB_TEST_LIVE":      "FALSE",
		"LOB_TEST_EXPLAIN":   "FALSE",
		"LOB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LOB_TEST_SELF_MAILER_ENTID"])
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
