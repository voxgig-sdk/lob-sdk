"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('QrCodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.QrCode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'qr_code.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "count": { "a": true, "h": "Count", "n": "count", "r": false, "sh": "number of resources in a set", "t": "`$INTEGER`", "key$": "count", "index$": 0 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "List of QR code analytics", "t": "`$ARRAY`", "key$": "data", "index$": 1 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 2 }, "scanned_count": { "a": true, "h": "Scanned Count", "n": "scanned_count", "r": false, "sh": "Indicates the number of QR Codes out of `count` that were scanned atleast once.", "t": "`$INTEGER`", "key$": "scanned_count", "index$": 3 }, "total_count": { "a": true, "h": "Total Count", "n": "total_count", "r": false, "sh": "Indicates the total number of records.", "t": "`$INTEGER`", "key$": "total_count", "index$": 4 } }, "name": "qr_code", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /qr_code_analytics", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "date_created", "or": "date_created", "r": false, "t": "`$OBJECT`", "index$": 0 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$ARRAY`", "index$": 1 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "resource_id", "or": "resource_id", "r": false, "t": "`$ARRAY`", "index$": 4 }, { "a": true, "k": "query", "n": "scanned", "or": "scanned", "r": false, "t": "`$BOOLEAN`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/qr_code_analytics", "q": { "exist": ["date_created", "include", "limit", "offset", "resource_id", "scanned"] }, "r": {}, "s": [{ "lit": "qr_code_analytics" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "qr_code", "name__orig": "qr_code", "Name": "QrCode", "name_": "qr_code", "name-": "qr-code", "NAME": "QR_CODE", "index$": 19 }, { "active": true, "entity": "qr_code", "key$": "BasicQrCodeFlow", "kind": "basic", "name": "BasicQrCodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "qr_code_ref01" } }], "index$": 0 }] }, 'QrCode', { "GET /qr_code_analytics": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "offset", "required": false, "description": "An integer that designates the offset at which to begin returning results. Defaults to 0.", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 1 }, { "in": "query", "name": "include", "description": "Request that the response include the total count by specifying `include=[\"total_count\"]`.\n", "schema": { "type": "array", "items": { "type": "string" } }, "explode": true, "x-ref": "#/components/parameters/include", "index$": 2 }, { "in": "query", "name": "date_created", "description": "Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_created", "index$": 3 }, { "in": "query", "name": "scanned", "description": "Filter list of responses to only include QR codes with at least one scan event.", "schema": { "type": "boolean" }, "index$": 4 }, { "in": "query", "name": "resource_ids", "description": "Filter by the resource ID.", "schema": { "type": "array", "maxItems": 100, "default": [] }, "index$": 5 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let qr_code_ref01_data = Object.values(setup.data.existing.qr_code)[0];
        // LIST
        const qr_code_ref01_ent = client.QrCode();
        const qr_code_ref01_match = {};
        const qr_code_ref01_list = (await qr_code_ref01_ent.list(qr_code_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/qr_code/QrCodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['qr_code01', 'qr_code02', 'qr_code03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_QR_CODE_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_QR_CODE_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_QR_CODE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LobSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LOB_APIKEY,
                secret: env.LOB_SECRET,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LOB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=QrCodeEntity.test.js.map