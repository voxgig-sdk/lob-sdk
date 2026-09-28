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
(0, node_test_1.describe)('UsVerificationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.UsVerification();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'us_verification.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addresses": { "a": true, "h": "Addresses", "n": "addresses", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "addresses", "index$": 0 }, "components": { "a": true, "h": "Components", "n": "components", "r": true, "sh": "A nested object containing a breakdown of each component of an address.", "t": "`$OBJECT`", "key$": "components", "index$": 1 }, "deliverability": { "a": true, "h": "Deliverability", "n": "deliverability", "r": false, "sh": "Summarizes the deliverability of the `us_verification` object.", "t": "`$STRING`", "key$": "deliverability", "index$": 2 }, "deliverability_analysis": { "a": true, "h": "Deliverability Analysis", "n": "deliverability_analysis", "r": true, "sh": "A nested object containing a breakdown of the deliverability of an address.", "t": "`$OBJECT`", "key$": "deliverability_analysis", "index$": 3 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": true, "sh": "Indicates whether any errors occurred during the verification process.", "t": "`$BOOLEAN`", "key$": "errors", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier prefixed with `us_ver_`.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "last_line": { "a": true, "h": "Last Line", "n": "last_line", "r": false, "sh": "Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`)", "t": "`$STRING`", "key$": "last_line", "index$": 6 }, "lob_confidence_score": { "a": true, "h": "Lob Confidence Score", "n": "lob_confidence_score", "r": true, "sh": "Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households.", "t": "`$OBJECT`", "key$": "lob_confidence_score", "index$": 7 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 8 }, "primary_line": { "a": true, "h": "Primary Line", "n": "primary_line", "r": false, "sh": "The primary delivery line (usually the street address) of the address.", "t": "`$STRING`", "key$": "primary_line", "index$": 9 }, "recipient": { "a": true, "h": "Recipient", "n": "recipient", "r": false, "sh": "The intended recipient, typically a person's or firm's name.", "t": "`$STRING`", "key$": "recipient", "index$": 10 }, "secondary_line": { "a": true, "h": "Secondary Line", "n": "secondary_line", "r": false, "sh": "The secondary delivery line of the address.", "t": "`$STRING`", "key$": "secondary_line", "index$": 11 }, "urbanization": { "a": true, "h": "Urbanization", "n": "urbanization", "r": false, "sh": "Only present for addresses in Puerto Rico.", "t": "`$STRING`", "key$": "urbanization", "index$": 12 }, "valid_address": { "a": true, "h": "Valid Address", "n": "valid_address", "r": false, "sh": "This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data.", "t": "`$BOOLEAN`", "key$": "valid_address", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "us_verification", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /bulk/us_verifications", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "upper", "k": "query", "n": "case", "or": "case", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/bulk/us_verifications", "q": { "exist": ["case"] }, "r": {}, "s": [{ "lit": "bulk" }, { "lit": "us_verifications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /us_verifications", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "upper", "k": "query", "n": "case", "or": "case", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/us_verifications", "q": { "exist": ["case"] }, "r": {}, "s": [{ "lit": "us_verifications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "us_verification", "name__orig": "us_verification", "Name": "UsVerification", "name_": "us_verification", "name-": "us-verification", "NAME": "US_VERIFICATION", "index$": 31 }, { "active": true, "entity": "us_verification", "key$": "BasicUsVerificationFlow", "kind": "basic", "name": "BasicUsVerificationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "us_verification_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'UsVerification', { "POST /bulk/us_verifications": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["addresses"], "properties": { "addresses": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "allOf": [{ "anyOf": [] }, { "type": "object", "required": [], "properties": {} }], "x-ref": "#/components/schemas/multiple_components" }, "key$": "addresses" } }, "x-ref": "#/components/schemas/multiple_components_list", "index$": 1 }, "example": { "addresses": [{ "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" }, { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" }] } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["addresses"], "properties": { "addresses": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "allOf": [{ "anyOf": [] }, { "type": "object", "required": [], "properties": {} }], "x-ref": "#/components/schemas/multiple_components" }, "key$": "addresses" } }, "x-ref": "#/components/schemas/multiple_components_list" }, "example": { "addresses": [{ "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" }, { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" }] } }, "multipart/form-data": { "schema": { "type": "object", "required": ["addresses"], "properties": { "addresses": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "allOf": [{ "anyOf": [] }, { "type": "object", "required": [], "properties": {} }], "x-ref": "#/components/schemas/multiple_components" }, "key$": "addresses" } }, "x-ref": "#/components/schemas/multiple_components_list" }, "example": { "addresses": [{ "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" }, { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" }] } } } }, "parameters": [{ "in": "query", "name": "case", "schema": { "type": "string", "enum": ["upper", "proper"], "default": "upper" }, "description": "Casing of the verified address. Possible values are `upper` and `proper` for uppercased (e.g. \"PO BOX\") and proper-cased (e.g. \"PO Box\"), respectively. Only affects `recipient`, `primary_line`, `secondary_line`, `urbanization`, and `last_line`. Default casing is `upper`.", "required": false, "index$": 0 }] }, "POST /us_verifications": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "allOf": [{ "anyOf": [{}, {}] }, { "type": "object", "required": ["primary_line"], "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {}, "urbanization": {}, "city": {}, "state": {}, "zip_code": {} } }], "x-ref": "#/components/schemas/multiple_components" }, { "type": "object", "required": ["address"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"210 King Street 94107\"). _Does not support a recipient and will error when other payload parameters are provided._\n", "maxLength": 500 } }, "x-ref": "#/components/schemas/single_line_address" }], "x-ref": "#/components/schemas/us_verifications_writable", "index$": 1 }, "examples": { "basic": { "value": { "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" } }, "full_payload": { "value": { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" } }, "single_line": { "value": { "address": "210 King Street 94107" } }, "test": { "value": { "primary_line": "po box", "zip_code": "11111" } } } }, "application/x-www-form-urlencoded": { "schema": { "oneOf": [{ "allOf": [{ "anyOf": [{}, {}] }, { "type": "object", "required": ["primary_line"], "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {}, "urbanization": {}, "city": {}, "state": {}, "zip_code": {} } }], "x-ref": "#/components/schemas/multiple_components" }, { "type": "object", "required": ["address"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"210 King Street 94107\"). _Does not support a recipient and will error when other payload parameters are provided._\n", "maxLength": 500 } }, "x-ref": "#/components/schemas/single_line_address" }], "x-ref": "#/components/schemas/us_verifications_writable" }, "examples": { "basic": { "value": { "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" } }, "full_payload": { "value": { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" } }, "single_line": { "value": { "address": "210 King Street 94107" } }, "test": { "value": { "primary_line": "po box", "zip_code": "11111" } } } }, "multipart/form-data": { "schema": { "oneOf": [{ "allOf": [{ "anyOf": [{}, {}] }, { "type": "object", "required": ["primary_line"], "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {}, "urbanization": {}, "city": {}, "state": {}, "zip_code": {} } }], "x-ref": "#/components/schemas/multiple_components" }, { "type": "object", "required": ["address"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"210 King Street 94107\"). _Does not support a recipient and will error when other payload parameters are provided._\n", "maxLength": 500 } }, "x-ref": "#/components/schemas/single_line_address" }], "x-ref": "#/components/schemas/us_verifications_writable" }, "examples": { "basic": { "value": { "primary_line": "210 King Street", "city": "San Francisco", "state": "CA", "zip_code": "94107" } }, "full_payload": { "value": { "recipient": "Walgreens", "primary_line": "Ave Wilson Churchill 123", "secondary_line": "", "urbanization": "URB FAIR OAKS", "city": "RIO PIEDRAS", "state": "PR", "zip_code": "00926" } }, "single_line": { "value": { "address": "210 King Street 94107" } }, "test": { "value": { "primary_line": "po box", "zip_code": "11111" } } } } } }, "parameters": [{ "in": "query", "name": "case", "schema": { "type": "string", "enum": ["upper", "proper"], "default": "upper" }, "description": "Casing of the verified address. Possible values are `upper` and `proper` for uppercased (e.g. \"PO BOX\") and proper-cased (e.g. \"PO Box\"), respectively. Only affects `recipient`, `primary_line`, `secondary_line`, `urbanization`, and `last_line`. Default casing is `upper`.", "required": false, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const us_verification_ref01_ent = client.UsVerification();
        let us_verification_ref01_data = setup.data.new.us_verification['us_verification_ref01'];
        us_verification_ref01_data = (await us_verification_ref01_ent.create(us_verification_ref01_data)).data();
        (0, node_assert_1.default)(null != us_verification_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/us_verification/UsVerificationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['us_verification01', 'us_verification02', 'us_verification03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_US_VERIFICATION_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_US_VERIFICATION_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_US_VERIFICATION_ENTID'];
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
//# sourceMappingURL=UsVerificationEntity.test.js.map