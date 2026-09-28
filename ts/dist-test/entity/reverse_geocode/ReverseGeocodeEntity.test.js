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
(0, node_test_1.describe)('ReverseGeocodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.ReverseGeocode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reverse_geocode.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addresses": { "a": true, "h": "Addresses", "n": "addresses", "r": false, "sh": "list of addresses", "t": "`$ARRAY`", "key$": "addresses", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier prefixed with `us_reverse_geocode_`.", "t": "`$STRING`", "key$": "id", "index$": 1 }, "latitude": { "a": true, "fo": "float", "h": "Latitude", "n": "latitude", "r": true, "sh": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location.", "t": "`$NUMBER`", "key$": "latitude", "index$": 2 }, "longitude": { "a": true, "fo": "float", "h": "Longitude", "n": "longitude", "r": true, "sh": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location.", "t": "`$NUMBER`", "key$": "longitude", "index$": 3 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "reverse_geocode", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /us_reverse_geocode_lookups", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 5, "k": "query", "n": "size", "or": "size", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/us_reverse_geocode_lookups", "q": { "exist": ["size"] }, "r": {}, "s": [{ "lit": "us_reverse_geocode_lookups" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "reverse_geocode", "name__orig": "reverse_geocode", "Name": "ReverseGeocode", "name_": "reverse_geocode", "name-": "reverse-geocode", "NAME": "REVERSE_GEOCODE", "index$": 22 }, { "active": true, "entity": "reverse_geocode", "key$": "BasicReverseGeocodeFlow", "kind": "basic", "name": "BasicReverseGeocodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "reverse_geocode_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ReverseGeocode', { "POST /us_reverse_geocode_lookups": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["latitude", "longitude"], "properties": { "latitude": { "type": "number", "minimum": -90, "maximum": 90, "format": "float", "description": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. This should be input with `longitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "latitude" }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "format": "float", "description": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. This should be input with `latitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "longitude" } }, "x-ref": "#/components/schemas/location", "index$": 1 }, "example": { "latitude": 37.7749, "longitude": 122.4194 } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["latitude", "longitude"], "properties": { "latitude": { "type": "number", "minimum": -90, "maximum": 90, "format": "float", "description": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. This should be input with `longitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "latitude" }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "format": "float", "description": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. This should be input with `latitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "longitude" } }, "x-ref": "#/components/schemas/location" }, "example": { "latitude": 37.7749, "longitude": 122.4194 } }, "multipart/form-data": { "schema": { "type": "object", "required": ["latitude", "longitude"], "properties": { "latitude": { "type": "number", "minimum": -90, "maximum": 90, "format": "float", "description": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. This should be input with `longitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "latitude" }, "longitude": { "type": "number", "minimum": -180, "maximum": 180, "format": "float", "description": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. This should be input with `latitude` to pinpoint locations on a map.\n", "nullable": true, "key$": "longitude" } }, "x-ref": "#/components/schemas/location" }, "example": { "latitude": 37.7749, "longitude": 122.4194 } } } }, "parameters": [{ "in": "query", "name": "size", "schema": { "type": "integer", "minimum": 1, "default": 5, "maximum": 50, "example": 5 }, "description": "Determines the number of locations returned. Possible values are between 1 and 50 and any number higher will be rounded down to 50. Default size is a list of 5 reverse geocoded locations.", "required": false, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const reverse_geocode_ref01_ent = client.ReverseGeocode();
        let reverse_geocode_ref01_data = setup.data.new.reverse_geocode['reverse_geocode_ref01'];
        reverse_geocode_ref01_data = (await reverse_geocode_ref01_ent.create(reverse_geocode_ref01_data)).data();
        (0, node_assert_1.default)(null != reverse_geocode_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reverse_geocode/ReverseGeocodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reverse_geocode01', 'reverse_geocode02', 'reverse_geocode03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_REVERSE_GEOCODE_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_REVERSE_GEOCODE_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_REVERSE_GEOCODE_ENTID'];
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
//# sourceMappingURL=ReverseGeocodeEntity.test.js.map