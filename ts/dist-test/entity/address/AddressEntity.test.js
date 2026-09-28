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
(0, node_test_1.describe)('AddressEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Address();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'address.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address_city": { "a": true, "h": "Address City", "n": "address_city", "r": false, "t": "`$STRING`", "key$": "address_city", "index$": 0 }, "address_country": { "a": true, "h": "Address Country", "n": "address_country", "r": false, "t": "`$STRING`", "key$": "address_country", "index$": 1 }, "address_line1": { "a": true, "h": "Address Line1", "n": "address_line1", "r": false, "t": "`$STRING`", "key$": "address_line1", "index$": 2 }, "address_state": { "a": true, "h": "Address State", "n": "address_state", "r": false, "t": "`$STRING`", "key$": "address_state", "index$": 3 }, "address_zip": { "a": true, "h": "Address Zip", "n": "address_zip", "r": false, "t": "`$STRING`", "key$": "address_zip", "index$": 4 }, "company": { "a": true, "h": "Company", "n": "company", "r": false, "t": "`$STRING`", "key$": "company", "index$": 5 }, "count": { "a": true, "h": "Count", "n": "count", "r": false, "sh": "number of resources in a set", "t": "`$INTEGER`", "key$": "count", "index$": 6 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "list of addresses", "t": "`$ARRAY`", "union": { "branches": 2, "count": 3, "depth": 5 }, "key$": "data", "index$": 7 }, "date_created": { "a": true, "h": "Date Created", "n": "date_created", "r": false, "t": "`$STRING`", "key$": "date_created", "index$": 8 }, "date_modified": { "a": true, "h": "Date Modified", "n": "date_modified", "r": false, "t": "`$STRING`", "key$": "date_modified", "index$": 9 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 10 }, "email": { "a": true, "h": "Email", "n": "email", "r": false, "t": "`$STRING`", "key$": "email", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 12 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "t": "`$OBJECT`", "key$": "metadata", "index$": 13 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 14 }, "next_url": { "a": true, "h": "Next Url", "n": "next_url", "r": false, "sh": "Url of next page of items in list.", "t": "`$STRING`", "key$": "next_url", "index$": 15 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 16 }, "phone": { "a": true, "h": "Phone", "n": "phone", "r": false, "t": "`$STRING`", "key$": "phone", "index$": 17 }, "previous_url": { "a": true, "h": "Previous Url", "n": "previous_url", "r": false, "sh": "Url of previous page of items in list.", "t": "`$STRING`", "key$": "previous_url", "index$": 18 }, "total_count": { "a": true, "h": "Total Count", "n": "total_count", "r": false, "sh": "Indicates the total number of records.", "t": "`$INTEGER`", "key$": "total_count", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "address", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /addresses", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/addresses", "q": {}, "r": {}, "s": [{ "lit": "addresses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /addresses", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "before/after", "or": "before/after", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "date_created", "or": "date_created", "r": false, "t": "`$OBJECT`", "index$": 1 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "metadata", "or": "metadata", "r": false, "t": "`$OBJECT`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/addresses", "q": { "exist": ["before/after", "date_created", "include", "limit", "metadata"] }, "r": {}, "s": [{ "lit": "addresses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /addresses/{adr_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "adr_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/addresses/{adr_id}", "q": { "exist": ["id"] }, "r": { "param": { "adr_id": "id" } }, "s": [{ "lit": "addresses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /addresses/{adr_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "adr_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/addresses/{adr_id}", "q": { "exist": ["id"] }, "r": { "param": { "adr_id": "id" } }, "s": [{ "lit": "addresses" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "address", "name__orig": "address", "Name": "Address", "name_": "address", "name-": "address", "NAME": "ADDRESS", "index$": 0 }, { "active": true, "entity": "address", "key$": "BasicAddressFlow", "kind": "basic", "name": "BasicAddressFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "address_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "address_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "address_ref01", "srcdatavar": "address_ref01_data", "suffix": "_dt0" }, "m": { "id": "address01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-address_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "address_ref01", "suffix": "_rm0" }, "m": { "id": "address01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "address_ref01" } }], "index$": 4 }] }, 'Address', { "POST /addresses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_city", "address_state", "address_zip"], "type": "object", "x-ref": "#/components/schemas/address_fields_us" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_us" }, { "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_country"], "type": "object", "x-ref": "#/components/schemas/address_fields_intl" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_intl" }], "x-ref": "#/components/schemas/address_editable", "index$": 1 }, "examples": { "full_us": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "210 King St", "address_line2": "# 6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "ncoa_us_test": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "NCOA", "address_line2": "#6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "full_intl": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "370 WATER ST", "address_line2": "", "address_city": "SUMMERSIDE", "address_state": "PRINCE EDWARD ISLAND", "address_zip": "C1N 1C4", "address_country": "CA" } } } }, "application/x-www-form-urlencoded": { "schema": { "oneOf": [{ "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_city", "address_state", "address_zip"], "type": "object", "x-ref": "#/components/schemas/address_fields_us" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_us" }, { "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_country"], "type": "object", "x-ref": "#/components/schemas/address_fields_intl" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_intl" }], "x-ref": "#/components/schemas/address_editable" }, "examples": { "full_us": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "210 King St", "address_line2": "# 6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "ncoa_us_test": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "NCOA", "address_line2": "# 6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "full_intl": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "370 WATER ST", "address_line2": "", "address_city": "SUMMERSIDE", "address_state": "PRINCE EDWARD ISLAND", "address_zip": "C1N 1C4", "address_country": "CA" } } }, "encoding": { "metadata": { "style": "deepObject", "explode": true } } }, "multipart/form-data": { "schema": { "oneOf": [{ "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_city", "address_state", "address_zip"], "type": "object", "x-ref": "#/components/schemas/address_fields_us" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_us" }, { "allOf": [{ "properties": { "address_city": {}, "address_line1": {}, "address_line2": {}, "address_state": {}, "address_zip": {} }, "required": ["address_line1", "address_country"], "type": "object", "x-ref": "#/components/schemas/address_fields_intl" }, { "anyOf": [{}, {}], "properties": { "address_country": {}, "company": {}, "description": {}, "email": {}, "metadata": {}, "name": {}, "phone": {} }, "type": "object" }], "x-ref": "#/components/schemas/address_editable_intl" }], "x-ref": "#/components/schemas/address_editable" }, "examples": { "full_us": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "210 King St", "address_line2": "# 6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "ncoa_us_test": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "NCOA", "address_line2": "# 6100", "address_city": "San Francisco", "address_state": "CA", "address_zip": "94107", "address_country": "US" } }, "full_intl": { "value": { "description": "Harry - Office", "name": "Harry Zhang", "company": "Lob", "email": "harry@lob.com", "phone": "5555555555", "address_line1": "370 WATER ST", "address_line2": "", "address_city": "SUMMERSIDE", "address_state": "PRINCE EDWARD ISLAND", "address_zip": "C1N 1C4", "address_country": "CA" } } } } } }, "parameters": [] }, "GET /addresses": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "before/after", "required": false, "description": "`before` and `after` are both optional but only one of them can be in the query at a time.\n", "schema": { "allOf": [{ "type": "object", "properties": { "before": { "type": "string", "description": "A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n" }, "after": { "type": "string", "description": "A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n" } } }, { "oneOf": [{ "required": ["before"] }, { "required": ["after"] }] }] }, "x-ref": "#/components/parameters/before_after", "index$": 1 }, { "in": "query", "name": "include", "description": "Request that the response include the total count by specifying `include=[\"total_count\"]`.\n", "schema": { "type": "array", "items": { "type": "string" } }, "explode": true, "x-ref": "#/components/parameters/include", "index$": 2 }, { "in": "query", "name": "date_created", "description": "Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_created", "index$": 3 }, { "in": "query", "name": "metadata", "description": "Filter by metadata key-value pair`.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/metadata", "index$": 4 }] }, "GET /addresses/{adr_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "adr_id", "description": "id of the address", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `adr_`.", "pattern": "^adr_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/adr_id" }, "index$": 0 }] }, "DELETE /addresses/{adr_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "adr_id", "description": "id of the address", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `adr_`.", "pattern": "^adr_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/adr_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const address_ref01_ent = client.Address();
        let address_ref01_data = setup.data.new.address['address_ref01'];
        address_ref01_data = (await address_ref01_ent.create(address_ref01_data)).data();
        (0, node_assert_1.default)(null != address_ref01_data.id);
        // LIST
        const address_ref01_match = {};
        const address_ref01_list = (await address_ref01_ent.list(address_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(address_ref01_list, { id: address_ref01_data.id })));
        // LOAD
        const address_ref01_match_dt0 = {};
        address_ref01_match_dt0.id = address_ref01_data.id;
        const address_ref01_data_dt0 = (await address_ref01_ent.load(address_ref01_match_dt0)).data();
        (0, node_assert_1.default)(address_ref01_data_dt0.id === address_ref01_data.id);
        // REMOVE
        const address_ref01_match_rm0 = { id: address_ref01_data.id };
        await address_ref01_ent.remove(address_ref01_match_rm0);
        // LIST
        const address_ref01_match_rt0 = {};
        const address_ref01_list_rt0 = (await address_ref01_ent.list(address_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(address_ref01_list_rt0, { id: address_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/address/AddressTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['address01', 'address02', 'address03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_ADDRESS_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_ADDRESS_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_ADDRESS_ENTID'];
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
//# sourceMappingURL=AddressEntity.test.js.map