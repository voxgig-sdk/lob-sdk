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
(0, node_test_1.describe)('LinkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Link();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'link.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "The date and time the link was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": false, "sh": "The registered domain to be used for the short URL.", "t": "`$STRING`", "key$": "domain", "index$": 1 }, "domain_id": { "a": true, "h": "Domain Id", "n": "domain_id", "r": false, "sh": "A unique identifier for the registered domain.", "t": "`$STRING`", "key$": "domain_id", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier prefixed with `lnk_`.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Use metadata to store custom information for tagging and labeling back to your internal systems.", "t": "`$OBJECT`", "key$": "metadata", "index$": 4 }, "redirect_link": { "a": true, "h": "Redirect Link", "n": "redirect_link", "op": { "create": { "req": true, "type": "`$STRING`" }, "update": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The original target URL.", "t": "`$STRING`", "key$": "redirect_link", "index$": 5 }, "short_link": { "a": true, "h": "Short Link", "n": "short_link", "r": false, "sh": "The shortened URL for the associated original URL.", "t": "`$STRING`", "key$": "short_link", "index$": 6 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": false, "sh": "The unique path for the shortened URL, if empty a unique path will be used.", "t": "`$STRING`", "key$": "slug", "index$": 7 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "The title of the URL.", "t": "`$STRING`", "key$": "title", "index$": 8 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "The date and time the link was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "link", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /links", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/links", "q": {}, "r": {}, "s": [{ "lit": "links" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /links", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "before/after", "or": "before/after", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "campaign_id", "or": "campaign_id", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "domain_id", "or": "domain_id", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/links", "q": { "exist": ["before/after", "campaign_id", "domain_id", "limit"] }, "r": {}, "s": [{ "lit": "links" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /links/{link_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "link_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/links/{link_id}", "q": { "exist": ["id"] }, "r": { "param": { "link_id": "id" } }, "s": [{ "lit": "links" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /links/{link_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "link_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/links/{link_id}", "q": { "exist": ["id"] }, "r": { "param": { "link_id": "id" } }, "s": [{ "lit": "links" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /links/{link_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "link_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/links/{link_id}", "q": { "exist": ["id"] }, "r": { "param": { "link_id": "id" } }, "s": [{ "lit": "links" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "link", "name__orig": "link", "Name": "Link", "name_": "link", "name-": "link", "NAME": "LINK", "index$": 16 }, { "active": true, "entity": "link", "key$": "BasicLinkFlow", "kind": "basic", "name": "BasicLinkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "link_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "link_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "link_ref01", "srcdatavar": "link_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-link_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "link_ref01", "srcdatavar": "link_ref01_data", "suffix": "_dt0" }, "m": { "id": "link01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-link_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "link_ref01", "suffix": "_rm0" }, "m": { "id": "link01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "link_ref01" } }], "index$": 5 }] }, 'Link', { "POST /links": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "domain": { "description": "The registered domain to be used for the short URL.", "default": "lob.st", "type": "string", "key$": "domain" }, "slug": { "description": "The unique path for the shortened URL, if empty a unique path will be used.", "type": "string", "key$": "slug" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_single", "index$": 1 }, "examples": { "basic": { "value": { "redirect_link": "https://www.lob.com", "slug": "a1b2c3" } }, "test": { "value": { "redirect_link": "https://www.lob.com", "slug": "a1b2c3" } } } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "domain": { "description": "The registered domain to be used for the short URL.", "default": "lob.st", "type": "string", "key$": "domain" }, "slug": { "description": "The unique path for the shortened URL, if empty a unique path will be used.", "type": "string", "key$": "slug" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_single" }, "examples": { "basic": { "value": { "redirect_link": "https://www.lob.com", "domain": "lob.st" } }, "test": { "value": { "redirect_link": "https://www.lob.com", "domain": "lob.st" } } } }, "multipart/form-data": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "domain": { "description": "The registered domain to be used for the short URL.", "default": "lob.st", "type": "string", "key$": "domain" }, "slug": { "description": "The unique path for the shortened URL, if empty a unique path will be used.", "type": "string", "key$": "slug" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_single" }, "examples": { "basic": { "value": { "redirect_link": "https://www.lob.com" } }, "test": { "value": { "redirect_link": "https://www.lob.com" } } } } } }, "parameters": [] }, "GET /links": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "before/after", "required": false, "description": "`before` and `after` are both optional but only one of them can be in the query at a time.\n", "schema": { "allOf": [{ "type": "object", "properties": { "before": { "type": "string", "description": "A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n" }, "after": { "type": "string", "description": "A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n" } } }, { "oneOf": [{ "required": ["before"] }, { "required": ["after"] }] }] }, "x-ref": "#/components/parameters/before_after", "index$": 1 }, { "in": "query", "name": "campaign_id", "required": false, "description": "Filters resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.", "schema": { "title": "campaign_id", "description": "Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.", "type": "string", "pattern": "^(cmp|camp)_[a-zA-Z0-9]+$", "nullable": true, "x-ref": "#/components/schemas/campaign_id" }, "x-ref": "#/components/parameters/campaign_id", "index$": 2 }, { "in": "query", "name": "domain_id", "description": "Filters links by the provided domain id.", "schema": { "type": "string", "pattern": "^(dom)_[a-zA-Z0-9]+$" }, "index$": 3 }] }, "GET /links/{link_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "link_id", "required": true, "description": "Unique identifier for a link.", "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /links/{link_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "link_id", "required": true, "description": "Unique identifier for a link.", "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /links/{link_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_update", "index$": 1 }, "examples": { "basic": { "value": { "resource_id": "ltr_133" } }, "test": { "value": { "redirect_link": "ltr_133" } } } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_update" }, "examples": { "basic": { "value": { "resource_id": "ltr_133" } }, "test": { "value": { "resource_id": "ltr_133" } } } }, "multipart/form-data": { "schema": { "type": "object", "required": ["redirect_link"], "properties": { "title": { "description": "The title of the URL.", "type": "string", "key$": "title" }, "redirect_link": { "type": "string", "description": "The original target URL.", "x-ref": "#/components/schemas/redirect_link", "key$": "redirect_link" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" } }, "x-ref": "#/components/schemas/link_update" }, "examples": { "basic": { "value": { "resource_id": "ltr_133" } }, "test": { "value": { "resource_id": "ltr_133" } } } } } }, "parameters": [{ "in": "path", "name": "link_id", "required": true, "description": "Unique identifier for a link.", "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const link_ref01_ent = client.Link();
        let link_ref01_data = setup.data.new.link['link_ref01'];
        link_ref01_data = (await link_ref01_ent.create(link_ref01_data)).data();
        (0, node_assert_1.default)(null != link_ref01_data.id);
        // LIST
        const link_ref01_match = {};
        const link_ref01_list = (await link_ref01_ent.list(link_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(link_ref01_list, { id: link_ref01_data.id })));
        // UPDATE
        const link_ref01_data_up0 = {};
        link_ref01_data_up0.id = link_ref01_data.id;
        const link_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-link_ref01_' + setup.now };
        link_ref01_data_up0[link_ref01_markdef_up0.name] = link_ref01_markdef_up0.value;
        const link_ref01_resdata_up0 = (await link_ref01_ent.update(link_ref01_data_up0)).data();
        (0, node_assert_1.default)(link_ref01_resdata_up0.id === link_ref01_data_up0.id);
        (0, node_assert_1.default)(link_ref01_resdata_up0[link_ref01_markdef_up0.name] === link_ref01_markdef_up0.value);
        // LOAD
        const link_ref01_match_dt0 = {};
        link_ref01_match_dt0.id = link_ref01_data.id;
        const link_ref01_data_dt0 = (await link_ref01_ent.load(link_ref01_match_dt0)).data();
        (0, node_assert_1.default)(link_ref01_data_dt0.id === link_ref01_data.id);
        // REMOVE
        const link_ref01_match_rm0 = { id: link_ref01_data.id };
        await link_ref01_ent.remove(link_ref01_match_rm0);
        // LIST
        const link_ref01_match_rt0 = {};
        const link_ref01_list_rt0 = (await link_ref01_ent.list(link_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(link_ref01_list_rt0, { id: link_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/link/LinkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['link01', 'link02', 'link03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_LINK_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_LINK_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_LINK_ENTID'];
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
//# sourceMappingURL=LinkEntity.test.js.map