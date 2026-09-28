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
(0, node_test_1.describe)('IntlVerificationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.IntlVerification();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'intl_verification.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addresses": { "a": true, "h": "Addresses", "n": "addresses", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 1 }, "key$": "addresses", "index$": 0 }, "components": { "a": true, "h": "Components", "n": "components", "r": false, "t": "`$OBJECT`", "key$": "components", "index$": 1 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "t": "`$STRING`", "key$": "country", "index$": 2 }, "coverage": { "a": true, "h": "Coverage", "n": "coverage", "r": false, "t": "`$STRING`", "key$": "coverage", "index$": 3 }, "deliverability": { "a": true, "h": "Deliverability", "n": "deliverability", "r": false, "t": "`$STRING`", "key$": "deliverability", "index$": 4 }, "errors": { "a": true, "h": "Errors", "n": "errors", "r": true, "sh": "Indicates whether any errors occurred during the verification process.", "t": "`$BOOLEAN`", "key$": "errors", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "last_line": { "a": true, "h": "Last Line", "n": "last_line", "r": false, "t": "`$STRING`", "key$": "last_line", "index$": 7 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "t": "`$STRING`", "key$": "object", "index$": 8 }, "primary_line": { "a": true, "h": "Primary Line", "n": "primary_line", "r": false, "t": "`$STRING`", "key$": "primary_line", "index$": 9 }, "recipient": { "a": true, "h": "Recipient", "n": "recipient", "r": false, "t": "`$STRING`", "key$": "recipient", "index$": 10 }, "secondary_line": { "a": true, "h": "Secondary Line", "n": "secondary_line", "r": false, "t": "`$STRING`", "key$": "secondary_line", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "intl_verification", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /intl_verifications", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_lang_output", "or": "x_lang_output", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/intl_verifications", "q": { "exist": ["x_lang_output"] }, "r": {}, "s": [{ "lit": "intl_verifications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /bulk/intl_verifications", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/bulk/intl_verifications", "q": {}, "r": {}, "s": [{ "lit": "bulk" }, { "lit": "intl_verifications" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "intl_verification", "name__orig": "intl_verification", "Name": "IntlVerification", "name_": "intl_verification", "name-": "intl-verification", "NAME": "INTL_VERIFICATION", "index$": 14 }, { "active": true, "entity": "intl_verification", "key$": "BasicIntlVerificationFlow", "kind": "basic", "name": "BasicIntlVerificationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "intl_verification_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'IntlVerification', { "POST /intl_verifications": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "allOf": [{ "type": "object", "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {} }, "x-ref": "#/components/schemas/intl_verification_base" }, { "type": "object", "required": ["primary_line", "country"], "properties": { "city": {}, "state": {}, "postal_code": {}, "country": {} } }], "x-ref": "#/components/schemas/multiple_components_intl" }, { "type": "object", "required": ["address", "country"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"370 Water St C1N 1C4\").\n", "maxLength": 500 }, "country": { "type": "string", "description": "Must be a 2 letter country short-name code (ISO 3166). Does not accept `US`, `AS`, `PR`, `FM`, `GU`, `MH`, `MP`, `PW`, or `VI`. For these addresses, please use the US verification API. Also does not accept `PS`, which is not currently supported.", "enum": ["AD", "AE", "AF", "AG", "AI", "AL", "AN", "AO", "AQ", "AR", "AT", "AU", "AW", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CS", "CU", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GH", "GI", "GL", "GM", "GN", "GQ", "GR", "GS", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IO", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MK", "ML", "MM", "MN", "MO", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PN", "PT", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"], "x-ref": "#/components/schemas/country_extended" } }, "x-ref": "#/components/schemas/single_line_address_intl" }], "x-ref": "#/components/schemas/intl_verification_writable", "index$": 1 }, "examples": { "basic": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "full_payload": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "single_line": { "value": { "address": "370 Water St C1N 1C4", "country": "CA" } }, "test": { "value": { "primary_line": "deliverable", "country": "CA" } } } }, "application/x-www-form-urlencoded": { "schema": { "oneOf": [{ "allOf": [{ "type": "object", "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {} }, "x-ref": "#/components/schemas/intl_verification_base" }, { "type": "object", "required": ["primary_line", "country"], "properties": { "city": {}, "state": {}, "postal_code": {}, "country": {} } }], "x-ref": "#/components/schemas/multiple_components_intl" }, { "type": "object", "required": ["address", "country"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"370 Water St C1N 1C4\").\n", "maxLength": 500 }, "country": { "type": "string", "description": "Must be a 2 letter country short-name code (ISO 3166). Does not accept `US`, `AS`, `PR`, `FM`, `GU`, `MH`, `MP`, `PW`, or `VI`. For these addresses, please use the US verification API. Also does not accept `PS`, which is not currently supported.", "enum": ["AD", "AE", "AF", "AG", "AI", "AL", "AN", "AO", "AQ", "AR", "AT", "AU", "AW", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CS", "CU", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GH", "GI", "GL", "GM", "GN", "GQ", "GR", "GS", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IO", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MK", "ML", "MM", "MN", "MO", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PN", "PT", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"], "x-ref": "#/components/schemas/country_extended" } }, "x-ref": "#/components/schemas/single_line_address_intl" }], "x-ref": "#/components/schemas/intl_verification_writable" }, "examples": { "basic": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "full_payload": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "single_line": { "value": { "address": "370 Water St C1N 1C4", "country": "CA" } }, "test": { "value": { "primary_line": "deliverable", "country": "CA" } } } }, "multipart/form-data": { "schema": { "oneOf": [{ "allOf": [{ "type": "object", "properties": { "recipient": {}, "primary_line": {}, "secondary_line": {} }, "x-ref": "#/components/schemas/intl_verification_base" }, { "type": "object", "required": ["primary_line", "country"], "properties": { "city": {}, "state": {}, "postal_code": {}, "country": {} } }], "x-ref": "#/components/schemas/multiple_components_intl" }, { "type": "object", "required": ["address", "country"], "properties": { "address": { "type": "string", "description": "The entire address in one string (e.g., \"370 Water St C1N 1C4\").\n", "maxLength": 500 }, "country": { "type": "string", "description": "Must be a 2 letter country short-name code (ISO 3166). Does not accept `US`, `AS`, `PR`, `FM`, `GU`, `MH`, `MP`, `PW`, or `VI`. For these addresses, please use the US verification API. Also does not accept `PS`, which is not currently supported.", "enum": ["AD", "AE", "AF", "AG", "AI", "AL", "AN", "AO", "AQ", "AR", "AT", "AU", "AW", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CS", "CU", "CV", "CW", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FO", "FR", "GA", "GB", "GD", "GE", "GH", "GI", "GL", "GM", "GN", "GQ", "GR", "GS", "GT", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IO", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MK", "ML", "MM", "MN", "MO", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PN", "PT", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UY", "UZ", "VA", "VC", "VE", "VG", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"], "x-ref": "#/components/schemas/country_extended" } }, "x-ref": "#/components/schemas/single_line_address_intl" }], "x-ref": "#/components/schemas/intl_verification_writable" }, "examples": { "basic": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "full_payload": { "value": { "recipient": "Harry Zhang", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edward Island", "postal code": "C1N 1C4", "country": "CA" } }, "single_line": { "value": { "address": "370 Water St C1N 1C4", "country": "CA" } }, "test": { "value": { "primary_line": "deliverable", "country": "CA" } } } } } }, "parameters": [{ "in": "header", "name": "x-lang-output", "required": false, "description": "* `native` - Translate response to the native language of the country in the request\n* `match` - match the response to the language in the request\n\nDefault response is in English.\n", "schema": { "type": "string", "enum": ["native", "match"] }, "x-ref": "#/components/parameters/lang_spec", "index$": 0 }] }, "POST /bulk/intl_verifications": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["addresses"], "properties": { "addresses": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "allOf": [{ "type": "object", "properties": {}, "x-ref": "#/components/schemas/intl_verification_base" }, { "type": "object", "required": [], "properties": {} }], "x-ref": "#/components/schemas/multiple_components_intl" }, "key$": "addresses" } }, "x-ref": "#/components/schemas/intl_verifications_payload", "index$": 1 }, "example": { "addresses": [{ "recipient": "John Doe", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edwards Island", "postal_code": "C1N 1C4", "country": "CA" }, { "recipient": "Jane Doe", "primary_line": "UL. DOLSKAYA 1", "secondary_line": "", "city": "MOSCOW", "state": "MOSCOW G", "postal_code": "115569", "country": "RU" }] } }, "multipart/form-data": { "schema": { "type": "object", "required": ["addresses"], "properties": { "addresses": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "allOf": [{ "type": "object", "properties": {}, "x-ref": "#/components/schemas/intl_verification_base" }, { "type": "object", "required": [], "properties": {} }], "x-ref": "#/components/schemas/multiple_components_intl" }, "key$": "addresses" } }, "x-ref": "#/components/schemas/intl_verifications_payload" }, "example": { "addresses": [{ "recipient": "John Doe", "primary_line": "370 Water St", "secondary_line": "", "city": "Summerside", "state": "Prince Edwards Island", "postal_code": "C1N 1C4", "country": "CA" }, { "recipient": "Jane Doe", "primary_line": "UL. DOLSKAYA 1", "secondary_line": "", "city": "MOSCOW", "state": "MOSCOW G", "postal_code": "115569", "country": "RU" }] } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const intl_verification_ref01_ent = client.IntlVerification();
        let intl_verification_ref01_data = setup.data.new.intl_verification['intl_verification_ref01'];
        intl_verification_ref01_data = (await intl_verification_ref01_ent.create(intl_verification_ref01_data)).data();
        (0, node_assert_1.default)(null != intl_verification_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/intl_verification/IntlVerificationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['intl_verification01', 'intl_verification02', 'intl_verification03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_INTL_VERIFICATION_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_INTL_VERIFICATION_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_INTL_VERIFICATION_ENTID'];
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
//# sourceMappingURL=IntlVerificationEntity.test.js.map