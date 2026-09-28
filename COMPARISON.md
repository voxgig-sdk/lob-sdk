# Lob: the Voxgig SDK and the OpenAPI Generator SDK compared

Vergleich: OpenAPI Generator. Compared with lob/lob-typescript-sdk (@lob/lob-typescript-sdk 1.4.2, OpenAPI Generator 5.3.0). Spec: lob/lob-openapi dist/lob-api-bundled.yml at ff3a7f5, OAS 3.0.3, 58 paths / 105 ops, MIT. Added 2026-09-28.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | OpenAPI Generator |
|---|---|---|
| SDK | this repository, commit `bc84043`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@lob/lob-typescript-sdk@1.4.2` (TypeScript) |
| Input | `lob-openapi.yml`: OAS 3.0.3, `info.version` 1.22.0, 58 paths, 105 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 105 of 105 | 70 operation methods |
| Entities | 33 | not applicable |
| ts package | 2.74 MB, 376 files | 3.54 MB, 245 files |
| Runtime dependencies | 0 | 2 |
| Generated tests | ts 347 pass / 0 fail; py 348 pass; rb 372 runs / 0 fail; lua 346 pass / 0 fail; php 372 tests, 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 1 of 4 steps right, 1 returned wrong data, 3 request violations (static) | 4 of 4 steps right, 0 request violations (static) |

## Features

Voxgig's features are opt-in; these builds enable the standard set. The OpenAPI Generator column is read from the published package, with the evidence below.

| Feature | Voxgig | OpenAPI Generator |
|---|---|---|
| Retries | yes | no |
| Timeouts | yes | partial |
| Pagination helper | partial | partial |
| Idempotency keys | yes | no |
| Rate-limit handling | yes | no |
| Logging / debug | yes | no |
| Built-in offline test mode | yes | no |
| Metrics / telemetry | partial | no |
| Cancellation | yes | partial |
| Hooks / middleware | yes | partial |

**Evidence, OpenAPI Generator.**

- Retries: Searched dist/index.cjs.js and index.mjs for retry/retries/backoff/Retry-After: 0 hits. createRequestFunction calls axios.request once, with no retry wrapper.
- Timeouts: No SDK timeout option or default. Configuration.baseOptions and per-call options (AxiosRequestConfig) are spread into axios.request (dist/index.cjs.js), so axios timeout passes through.
- Pagination helper: List models (e.g. dist/models/address-list.d.ts) have nextPageToken/previousPageToken getters parsing after=/before= from next_url; caller re-calls list() by hand. No iterator.
- Idempotency keys: Create methods (checks, letters, postcards, self-mailers) take an optional idempotencyKey arg mapped to the Idempotency-Key header; caller must supply it. Never generated.
- Rate-limit handling: No Retry-After, 429 backoff or throttling code; 429 and rate_limit_exceeded appear only in the LobError/BulkError model enums.
- Logging / debug: Searched debug/logger/console./log level: 0 hits. The only process.env read is npm_package_name/version for a User-Agent value.
- Built-in offline test mode: Searched mock/test mode: 0 hits in the bundle. dist/__tests__/*.d.ts are leftover type stubs with no runtime code and are not exported.
- Metrics / telemetry: Searched telemetry/opentelemetry/tracing/metrics: 0 hits in dist/index.cjs.js or index.mjs.
- Cancellation: No SDK AbortSignal parameter. Per-call options (AxiosRequestConfig) pass through to axios.request, so axios signal/cancelToken work.
- Hooks / middleware: No SDK hook API. Every API class inherits BaseAPI(configuration, basePath, axios?: AxiosInstance) (dist/base.d.ts), so a caller can inject an axios instance with interceptors.
- Auth: HTTP Basic: new Configuration({ username: '<API key>', password? }); all 54 operations call setBasicAuthToObject. Stock apiKey/accessToken fields are declared but no operation reads them.
- Errors: No. API methods catch and rethrow the raw AxiosError, copying response.data.error.message into error.message. LobError is only a response data model; RequiredError covers missing params.

**Evidence, Voxgig.**

- Retries: retry feature: 408, 425, 429 and 5xx, honouring Retry-After.
- Timeouts: timeout feature: 30 s per attempt by default.
- Pagination helper: paging feature: page and cursor state carried between calls (ctrl.paging); no iterator.
- Idempotency keys: idempotency feature: generates an Idempotency-Key for mutating calls, stable across retries.
- Rate-limit handling: ratelimit feature: client-side token bucket; retry honours Retry-After on 429.
- Logging / debug: debug feature: request and response logging with auth headers redacted.
- Built-in offline test mode: test feature: an offline mock transport; every generated suite runs on it.
- Metrics / telemetry: metrics feature: per-operation counts and timings; no OpenTelemetry.
- Cancellation: an AbortSignal per call (callopts.signal).
- Hooks / middleware: extend: custom features hook every pipeline stage.

## Scenario

✓ right, ⚠ returned without error but with the wrong data, ✗ failed.

Each SDK lists one resource, loads and removes the first item it listed, and creates one from the definition's own example or required fields, against a mock built from the same vendor definition. The mock is Prism: static mode answers with the definition's examples, and dynamic mode generates schema-valid data. Each SDK is credited with its better mode. Request violations are Prism's verdicts on what the SDK sent.

- **Voxgig, static:** 1 of 4 steps right, 3 request violations.
  - ✗ `auth-as-documented`: LobSDK: list: request: 401: Unauthorized
  - ⚠ `list`: 0 items where the vendor SDK read 2: the list is `body.data`, and the model says `body`
  - ✗ `load`: LobSDK: load: request: 422: Unprocessable Entity
  - ✓ `create`
  - ✗ `remove`: LobSDK: remove: request: 422: Unprocessable Entity
- **OpenAPI Generator, static:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`: the mock's own example for this response lacks `id` (Prism reports it), so no SDK could return one
  - ✓ `create`
  - ✓ `remove`

## Voxgig toolchain findings

- **Y1-Y3** (@tabnas/yaml 0.5.11 (used by apidef)). Three YAML parser defects. A quote inside a block scalar, comment or plain scalar inverts the flow scanner's quote parity (Lob fails at line 14557). A digit-first plain scalar is cut at its first colon (Novu's `09:00 AM`). Scalars resolve by YAML 1.1 rules, so SaladCloud's country code NO becomes false. Patch written and verified: all eight specs parse identically to js-yaml, 0 regressions over 259 local YAML files. Not applied: attaching tabnas/yaml with push access was refused. The three SDKs were built on the patched parser.
- **UNWRAP** (@voxgig/apidef 8.17.2). The response transform that says where an operation's data sits is inferred wrongly for several resources, in both directions. A schema whose one object-valued property is ordinary data is taken for an envelope (Apicurio's `labels`, SaladCloud's `container`), and a real envelope is missed when it is composed with allOf (Lob) or sits beside another property (Neon's `projects` beside `pagination`). The SDKs' own tests cannot see it, because they mock from the same model; a mock built from the vendor definition does. Here: lob address list: `body`, but the list is `body.data` (an allOf); list yields 0 entities. Reported, not changed: heuristic design in apidef.
- **BASIC-BLANK** (@voxgig/sdkgen 4.30.2 (PrepareAuth, 20 targets)). Basic auth is sent only when both apikey and secret are non-empty. Lob's documented auth is the key as username with a blank password (curl -u key:), which RFC 7617 allows, so a Lob user following Lob's docs sends no Authorization header. Reported, not changed: an auth behaviour change in 20 languages.
- **QUERY-ECHO** (@voxgig/sdkgen 4.30.2 (PrepareQuery: ts, js and rb read the field; other targets not checked)). Every match field, path parameters included, is also sent as a query parameter: GET /video/v1/assets/a1?id=a1 (Mux), GET /assistant/asst_1?id=asst_1 (Vapi), DELETE .../containers/web?id=web&organization_name=acme&project_id=demo (SaladCloud). prepareQuery excludes names in point.params, but the generated config carries path parameters in point.args.params (which prepareParams reads), so nothing is excluded. Harmless to a lenient server, rejected by a strict one. Prism logs paths without query strings, so its runs did not show it. Reported, not changed: the same exclusion exists per target.

## OpenAPI Generator SDK notes

- Generated from an older definition: exposes 70 of today's 105 operations. No retries, timeouts or logging of its own.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.

