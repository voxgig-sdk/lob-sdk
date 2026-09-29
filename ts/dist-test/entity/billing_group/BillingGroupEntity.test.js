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
(0, node_test_1.describe)('BillingGroupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.BillingGroup();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing_group.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date_created": { "a": true, "fo": "date-time", "h": "Date Created", "n": "date_created", "r": false, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "date_created", "index$": 0 }, "date_modified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "date_modified", "r": false, "sh": "A timestamp in ISO 8601 format of the date the resource was last modified.", "t": "`$STRING`", "key$": "date_modified", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the billing group.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier prefixed with `bg_`.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the billing group.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "billing_group", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /billing_groups/{bg_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "bg_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/billing_groups/{bg_id}", "q": { "exist": ["id"] }, "r": { "param": { "bg_id": "id" } }, "s": [{ "lit": "billing_groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /billing_groups", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/billing_groups", "q": {}, "r": {}, "s": [{ "lit": "billing_groups" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /billing_groups", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "date_created", "or": "date_created", "r": false, "t": "`$OBJECT`", "index$": 0 }, { "a": true, "k": "query", "n": "date_modified", "or": "date_modified", "r": false, "t": "`$OBJECT`", "index$": 1 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "sort_by", "or": "sort_by", "r": false, "t": "`$ANY`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/billing_groups", "q": { "exist": ["date_created", "date_modified", "include", "limit", "offset", "sort_by"] }, "r": {}, "s": [{ "lit": "billing_groups" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /billing_groups/{bg_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "bg_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/billing_groups/{bg_id}", "q": { "exist": ["id"] }, "r": { "param": { "bg_id": "id" } }, "s": [{ "lit": "billing_groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "billing_group", "name__orig": "billing_group", "Name": "BillingGroup", "name_": "billing_group", "name-": "billing-group", "NAME": "BILLING_GROUP", "index$": 3 }, { "active": true, "entity": "billing_group", "key$": "BasicBillingGroupFlow", "kind": "basic", "name": "BasicBillingGroupFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "billing_group_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "billing_group_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "billing_group_ref01", "srcdatavar": "billing_group_ref01_data", "suffix": "_dt0" }, "m": { "id": "billing_group01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_group_ref01" } }], "index$": 2 }] }, 'BillingGroup', { "POST /billing_groups/{bg_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base", "index$": 1 }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base" }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } }, "multipart/form-data": { "schema": { "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base" }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } } } }, "parameters": [{ "in": "path", "name": "bg_id", "description": "id of the billing_group", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `bg_`.", "pattern": "^bg_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/bg_id" }, "index$": 0 }] }, "POST /billing_groups": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base" }, { "required": ["name"] }], "x-ref": "#/components/schemas/billing_group_editable", "index$": 1 }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } }, "application/x-www-form-urlencoded": { "schema": { "allOf": [{ "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base" }, { "required": ["name"] }], "x-ref": "#/components/schemas/billing_group_editable" }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } }, "multipart/form-data": { "schema": { "allOf": [{ "type": "object", "properties": { "description": { "description": "Description of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/bg_description", "key$": "description" }, "name": { "description": "Name of the billing group.", "maxLength": 255, "type": "string", "x-ref": "#/components/schemas/name", "key$": "name" } }, "x-ref": "#/components/schemas/billing_group_base" }, { "required": ["name"] }], "x-ref": "#/components/schemas/billing_group_editable" }, "example": { "name": "Marketing Dept", "description": "Usage group used for the Marketing Dept resource sends" } } } }, "parameters": [] }, "GET /billing_groups": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "offset", "required": false, "description": "An integer that designates the offset at which to begin returning results. Defaults to 0.", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 1 }, { "in": "query", "name": "include", "description": "Request that the response include the total count by specifying `include=[\"total_count\"]`.\n", "schema": { "type": "array", "items": { "type": "string" } }, "explode": true, "x-ref": "#/components/parameters/include", "index$": 2 }, { "in": "query", "name": "date_created", "description": "Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_created", "index$": 3 }, { "in": "query", "name": "date_modified", "description": "Filter by date modified. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_modified", "index$": 4 }, { "in": "query", "name": "sort_by", "description": "Sorts items by ascending or descending dates. Use either `date_created` or `date_modified`, not both.\n", "schema": { "allOf": [{ "type": "object", "properties": { "date_created": { "type": "string", "enum": ["asc", "desc"] }, "date_modified": { "type": "string", "enum": ["asc", "desc"] } } }, { "oneOf": [{ "required": ["date_created"] }, { "required": ["date_modified"] }] }] }, "index$": 5 }] }, "GET /billing_groups/{bg_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "bg_id", "description": "id of the billing_group", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `bg_`.", "pattern": "^bg_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/bg_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const billing_group_ref01_ent = client.BillingGroup();
        let billing_group_ref01_data = setup.data.new.billing_group['billing_group_ref01'];
        billing_group_ref01_data = (await billing_group_ref01_ent.create(billing_group_ref01_data)).data();
        (0, node_assert_1.default)(null != billing_group_ref01_data.id);
        // LIST
        const billing_group_ref01_match = {};
        const billing_group_ref01_list = (await billing_group_ref01_ent.list(billing_group_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(billing_group_ref01_list, { id: billing_group_ref01_data.id })));
        // LOAD
        const billing_group_ref01_match_dt0 = {};
        billing_group_ref01_match_dt0.id = billing_group_ref01_data.id;
        const billing_group_ref01_data_dt0 = (await billing_group_ref01_ent.load(billing_group_ref01_match_dt0)).data();
        (0, node_assert_1.default)(billing_group_ref01_data_dt0.id === billing_group_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing_group/BillingGroupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing_group01', 'billing_group02', 'billing_group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_BILLING_GROUP_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_BILLING_GROUP_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_BILLING_GROUP_ENTID'];
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
//# sourceMappingURL=BillingGroupEntity.test.js.map