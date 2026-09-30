# Lob: the Voxgig SDK and the OpenAPI Generator SDK compared

Vergleich: OpenAPI Generator. Compared with lob/lob-typescript-sdk (@lob/lob-typescript-sdk 1.4.2, OpenAPI Generator 5.3.0). Spec: lob/lob-openapi dist/lob-api-bundled.yml at ff3a7f5, OAS 3.0.3, 58 paths / 105 ops, MIT. Added 2026-09-28. Rebuilt 2026-09-29 on sdkgen 4.32.1 and apidef 8.22.0.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | OpenAPI Generator |
|---|---|---|
| SDK | this repository, commit `619cfb4`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@lob/lob-typescript-sdk@1.4.2` (TypeScript) |
| Input | `lob-openapi.yml`: OAS 3.0.3, `info.version` 1.22.0, 58 paths, 105 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 105 of 105 | 70 operation methods |
| Entities | 33 | not applicable |
| ts package | 2.70 MB, 376 files | 3.54 MB, 245 files |
| Runtime dependencies | 0 | 2 |
| Generated tests | ts 455 pass / 0 fail / 8 skipped; py 348 pass / 57 skipped; rb 372 runs / 0 fail; lua 346 pass / 0 fail; php 372 tests / 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 4 of 4 steps right, 0 returned wrong data, 0 request violations (static) | 4 of 4 steps right, 0 request violations (static) |

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

- **Voxgig, static:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`
  - ✓ `auth-as-documented`
- **Voxgig, dynamic:** 0 of 4 steps right, 0 request violations.
  - ✗ `list`: Prism's dynamic mode stopped at its first request, on its own `sl-violations` header (`TypeError: Invalid character in header content`), so this mode tested no SDK
  - ✗ `load`: Prism had stopped, as above
  - ✗ `create`: Prism had stopped, as above
  - ✗ `remove`: Prism had stopped, as above
  - ✗ `auth-as-documented`: Prism had stopped, as above
- **OpenAPI Generator, static:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`: the mock's own example for this response lacks `id` (Prism reports it), so no SDK could return one
  - ✓ `create`
  - ✓ `remove`

## Voxgig toolchain findings

- **Y1-Y4** (@tabnas/yaml, used by apidef). Four YAML parser defects: a quote inside a block scalar, comment or plain scalar inverted the flow scanner's quote parity (Lob failed at line 14557); a digit-first plain scalar was cut at its first colon (Novu's `09:00 AM`); scalars resolve by YAML 1.1 rules, so SaladCloud's country code `no` becomes `false`; and a `#` straight after a leading number ended the scalar, so Lob's buckslip weight `80#` read as the number 80 and was typed as an integer. Y1 and Y2 are fixed in the published parser (apidef 8.18.0 requires @tabnas/yaml 0.5.12, and 0.5.13 parses Lob and Novu), and Y4 in 0.5.14 (tabnas/yaml#95), so this rebuild uses no overlay. Y3 is the parser's documented YAML 1.1 leniency, and SaladCloud's SDK comes out the same with and without a patched parser.
- **UNWRAP** (@voxgig/apidef). The response transform that says where an operation's data sits was inferred wrongly for several resources in the first build. Here: the address list was read at `body`, where Lob puts it at `body.data` inside an allOf, so list yielded 0 entities and the Address type carried the page's `count` and `next_url`. Fixed in apidef 8.18.0 (voxgig/apidef#100): the rebuild lists the mock's addresses.
- **BASIC-BLANK** (@voxgig/sdkgen, PrepareAuth, 20 targets). Basic auth was sent only when both apikey and secret were non-empty. Lob's documented auth is the key as username with a blank password (curl -u key:), which RFC 7617 allows, so a Lob user following Lob's docs sent no Authorization header. Fixed in voxgig/sdkgen#222, released in 4.31.0: the scenario's documented-auth step lists addresses.
- **QUERY-ECHO** (@voxgig/sdkgen, PrepareQuery). Every match field, path parameters included, was also sent as a query parameter, such as `?id=` on a load. Fixed in voxgig/sdkgen#222, released in 4.31.0: query parameters go out under the definition's names, and the rebuild's scenario requests carry no echoed parameter.
- **HEADERS** (@voxgig/sdkgen, PrepareHeaders, 20 targets). A parameter the definition declares `in: header` was sent in the query or the body, never as a header. Here: Lob's `Idempotency-Key`, declared on nine creates, went out in the request body. Fixed in voxgig/sdkgen#223, released in 4.32.0, with a definition-suite check that each one arrives as a header. Cookie parameters have the same gap and stay open in voxgig/sdkgen#221.

## OpenAPI Generator SDK notes

- Generated from an older definition: exposes 70 of today's 105 operations. No retries, timeouts or logging of its own.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.
- Rebuild: 2026-09-29, on create-sdkgen 0.30.4, sdkgen 4.32.1, apidef 8.22.0, model 12.0.0 and @tabnas/yaml 0.5.14, all as published, with no overlay.
- Toolchain refresh: 2026-09-30, to apidef 8.22.1 and @tabnas/yaml 0.5.15, as published. A regeneration on them writes the same SDK, so only `.sdk/package-lock.json` moved.
- Tests on the rebuild: all eight targets, the lua suite under Lua 5.4 with busted 2.2.0.
- Scenario on the rebuild: the Voxgig side was re-run on 2026-09-29; the compared SDK's run is from 2026-09-28, and its package is unchanged. The generated create input honours the definition's minimums, which the first run did not.
