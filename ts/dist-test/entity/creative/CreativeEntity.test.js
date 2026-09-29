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
(0, node_test_1.describe)('CreativeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Creative();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'creative.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "campaigns": { "a": true, "h": "Campaigns", "n": "campaigns", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "Array of campaigns associated with the creative ID", "t": "`$ARRAY`", "key$": "campaigns", "index$": 0 }, "date_created": { "a": true, "fo": "date-time", "h": "Date Created", "n": "date_created", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "date_created", "index$": 1 }, "date_modified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "date_modified", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was last modified.", "t": "`$STRING`", "key$": "date_modified", "index$": 2 }, "deleted": { "a": true, "h": "Deleted", "n": "deleted", "op": { "load": { "req": true, "type": "`$BOOLEAN`" } }, "r": false, "sh": "Only returned if the resource has been successfully deleted.", "t": "`$BOOLEAN`", "key$": "deleted", "index$": 3 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "An internal description that identifies this resource.", "t": "`$STRING`", "key$": "description", "index$": 4 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "t": "`$OBJECT`", "key$": "details", "index$": 5 }, "from": { "a": true, "h": "From", "n": "from", "r": false, "sh": "Must either be an address ID or an inline object with correct address parameters.", "t": "`$STRING`", "key$": "from", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Unique identifier prefixed with `crv_`.", "t": "`$STRING`", "key$": "id", "index$": 7 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Use metadata to store custom information for tagging and labeling back to your internal systems.", "t": "`$OBJECT`", "key$": "metadata", "index$": 8 }, "object": { "a": true, "h": "Object", "n": "object", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 9 }, "resource_type": { "a": true, "h": "Resource Type", "n": "resource_type", "r": false, "t": "`$STRING`", "key$": "resource_type", "index$": 10 }, "template_preview_urls": { "a": true, "h": "Template Preview Urls", "n": "template_preview_urls", "op": { "create": { "req": false, "type": "`$OBJECT`" } }, "r": true, "sh": "Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets.", "t": "`$OBJECT`", "key$": "template_preview_urls", "index$": 11 }, "template_previews": { "a": true, "h": "Template Previews", "n": "template_previews", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "sh": "A list of template preview objects if the creative uses HTML template(s) as artwork asset(s).", "t": "`$ARRAY`", "key$": "template_previews", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "creative", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /creatives", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_lang_output", "or": "x-lang-output", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/creatives", "q": { "exist": ["x_lang_output"] }, "r": {}, "s": [{ "lit": "creatives" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /creatives/{crv_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "crv_2a3b096c409b32c", "k": "param", "n": "id", "or": "crv_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/creatives/{crv_id}", "q": { "exist": ["id"] }, "r": { "param": { "crv_id": "id" } }, "s": [{ "lit": "creatives" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /creatives/{crv_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "crv_2a3b096c409b32c", "k": "param", "n": "id", "or": "crv_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/creatives/{crv_id}", "q": { "exist": ["id"] }, "r": { "param": { "crv_id": "id" } }, "s": [{ "lit": "creatives" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "creative", "name__orig": "creative", "Name": "Creative", "name_": "creative", "name-": "creative", "NAME": "CREATIVE", "index$": 11 }, { "active": true, "entity": "creative", "key$": "BasicCreativeFlow", "kind": "basic", "name": "BasicCreativeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "creative_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "creative_ref01", "srcdatavar": "creative_ref01_data", "suffix": "_up0", "textfield": "date_created" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-creative_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "creative_ref01", "srcdatavar": "creative_ref01_data", "suffix": "_dt0" }, "m": { "id": "creative01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-creative_ref01" } }], "index$": 2 }] }, 'Creative', { "POST /creatives": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "allOf": [{ "title": "Postcard Creative", "required": ["front", "back", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "front": {}, "back": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Letter Creative", "required": ["file", "from", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "details": {}, "file": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Self Mailer Creative", "required": ["inside", "outside", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "inside": {}, "outside": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }], "x-ref": "#/components/schemas/creative_writable", "index$": 1 }, "example": { "campaign_id": "cmp_e05ee61ff80764b", "resource_type": "postcard", "description": "Our 4x6 postcard creative", "details": {} } }, "application/x-www-form-urlencoded": { "schema": { "oneOf": [{ "allOf": [{ "title": "Postcard Creative", "required": ["front", "back", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "front": {}, "back": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Letter Creative", "required": ["file", "from", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "details": {}, "file": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Self Mailer Creative", "required": ["inside", "outside", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "inside": {}, "outside": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }], "x-ref": "#/components/schemas/creative_writable" }, "encoding": { "example-prop": { "style": "deepObject", "explode": true } }, "example": { "campaign_id": "cmp_e05ee61ff80764b", "resource_type": "postcard", "description": "Our 4x6 postcard creative", "details": {} } }, "multipart/form-data": { "schema": { "oneOf": [{ "allOf": [{ "title": "Postcard Creative", "required": ["front", "back", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "front": {}, "back": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Letter Creative", "required": ["file", "from", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "details": {}, "file": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }, { "allOf": [{ "title": "Self Mailer Creative", "required": ["inside", "outside", "campaign_id", "resource_type", "details"], "properties": { "resource_type": {}, "campaign_id": {}, "inside": {}, "outside": {}, "details": {} } }, { "type": "object", "properties": { "from": {}, "description": {}, "metadata": {} }, "x-ref": "#/components/schemas/creative_base" }] }], "x-ref": "#/components/schemas/creative_writable" }, "example": { "campaign_id": "cmp_e05ee61ff80764b", "resource_type": "postcard", "description": "Our 4x6 postcard creative", "details": {} } } } }, "parameters": [{ "in": "header", "name": "x-lang-output", "required": false, "description": "* `native` - Translate response to the native language of the country in the request\n* `match` - match the response to the language in the request\n\nDefault response is in English.\n", "schema": { "type": "string", "enum": ["native", "match"] }, "x-ref": "#/components/parameters/lang_spec", "index$": 0 }] }, "GET /creatives/{crv_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "crv_id", "description": "id of the creative", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `crv_`.", "pattern": "^crv_[a-zA-Z0-9]+$", "example": "crv_2a3b096c409b32c", "x-ref": "#/components/schemas/crv_id" }, "index$": 0 }] }, "PATCH /creatives/{crv_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "from": { "description": "Must either be an address ID or an inline object with correct address parameters. All addresses will be standardized into uppercase without being modified by verification.", "oneOf": [{ "description": "Unique identifier prefixed with `adr_`.", "pattern": "^adr_[a-zA-Z0-9]+$", "type": "string", "x-ref": "#/components/schemas/adr_id" }, { "allOf": [{}, {}], "x-ref": "#/components/schemas/inline_address_us" }], "title": "From", "x-ref": "#/components/schemas/from_attribute", "key$": "from" }, "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "metadata": { "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "type": "object", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/creative_base", "index$": 1 }, "example": { "description": "Test creative" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "from": { "description": "Must either be an address ID or an inline object with correct address parameters. All addresses will be standardized into uppercase without being modified by verification.", "oneOf": [{ "description": "Unique identifier prefixed with `adr_`.", "pattern": "^adr_[a-zA-Z0-9]+$", "type": "string", "x-ref": "#/components/schemas/adr_id" }, { "allOf": [{}, {}], "x-ref": "#/components/schemas/inline_address_us" }], "title": "From", "x-ref": "#/components/schemas/from_attribute", "key$": "from" }, "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "metadata": { "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "type": "object", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/creative_base" }, "example": { "description": "Test creative" } }, "multipart/form-data": { "schema": { "type": "object", "properties": { "from": { "description": "Must either be an address ID or an inline object with correct address parameters. All addresses will be standardized into uppercase without being modified by verification.", "oneOf": [{ "description": "Unique identifier prefixed with `adr_`.", "pattern": "^adr_[a-zA-Z0-9]+$", "type": "string", "x-ref": "#/components/schemas/adr_id" }, { "allOf": [{}, {}], "x-ref": "#/components/schemas/inline_address_us" }], "title": "From", "x-ref": "#/components/schemas/from_attribute", "key$": "from" }, "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "metadata": { "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "type": "object", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/creative_base" }, "example": { "description": "Test creative" } } } }, "parameters": [{ "in": "path", "name": "crv_id", "description": "id of the creative", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `crv_`.", "pattern": "^crv_[a-zA-Z0-9]+$", "example": "crv_2a3b096c409b32c", "x-ref": "#/components/schemas/crv_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const creative_ref01_ent = client.Creative();
        let creative_ref01_data = setup.data.new.creative['creative_ref01'];
        creative_ref01_data = (await creative_ref01_ent.create(creative_ref01_data)).data();
        (0, node_assert_1.default)(null != creative_ref01_data.id);
        // UPDATE
        const creative_ref01_data_up0 = {};
        creative_ref01_data_up0.id = creative_ref01_data.id;
        const creative_ref01_markdef_up0 = { name: 'date_created', value: 'Mark01-creative_ref01_' + setup.now };
        creative_ref01_data_up0[creative_ref01_markdef_up0.name] = creative_ref01_markdef_up0.value;
        const creative_ref01_resdata_up0 = (await creative_ref01_ent.update(creative_ref01_data_up0)).data();
        (0, node_assert_1.default)(creative_ref01_resdata_up0.id === creative_ref01_data_up0.id);
        (0, node_assert_1.default)(creative_ref01_resdata_up0[creative_ref01_markdef_up0.name] === creative_ref01_markdef_up0.value);
        // LOAD
        const creative_ref01_match_dt0 = {};
        creative_ref01_match_dt0.id = creative_ref01_data.id;
        const creative_ref01_data_dt0 = (await creative_ref01_ent.load(creative_ref01_match_dt0)).data();
        (0, node_assert_1.default)(creative_ref01_data_dt0.id === creative_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/creative/CreativeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['creative01', 'creative02', 'creative03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_CREATIVE_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_CREATIVE_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_CREATIVE_ENTID'];
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
//# sourceMappingURL=CreativeEntity.test.js.map