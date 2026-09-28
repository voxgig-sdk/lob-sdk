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

func TestIdentityValidationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.IdentityValidation(nil)
		if ent == nil {
			t.Fatal("expected non-nil IdentityValidationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := identity_validationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "identity_validation." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LOB_TEST_IDENTITY_VALIDATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		identityValidationRef01Ent := client.IdentityValidation(nil)
		identityValidationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "identity_validation"}), "identity_validation_ref01"))

		identityValidationRef01DataResult, err := identityValidationRef01Ent.Create(identityValidationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		identityValidationRef01Data = core.ToMapAny(entityData(identityValidationRef01DataResult))
		if identityValidationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if identityValidationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

	})
}

func identity_validationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "identity_validation", "IdentityValidationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read identity_validation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse identity_validation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"identity_validation01", "identity_validation02", "identity_validation03"},
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
	entidEnvRaw := os.Getenv("LOB_TEST_IDENTITY_VALIDATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LOB_TEST_IDENTITY_VALIDATION_ENTID": idmap,
		"LOB_TEST_LIVE":      "FALSE",
		"LOB_TEST_EXPLAIN":   "FALSE",
		"LOB_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LOB_TEST_IDENTITY_VALIDATION_ENTID"])
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
