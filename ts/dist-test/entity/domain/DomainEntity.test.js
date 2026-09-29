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
(0, node_test_1.describe)('DomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Domain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "The date and time the domain was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "domain": { "a": true, "h": "Domain", "n": "domain", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The registered domain/hostname.", "t": "`$STRING`", "key$": "domain", "index$": 1 }, "error_redirect_link": { "a": true, "h": "Error Redirect Link", "n": "error_redirect_link", "r": false, "sh": "URL to redirect customers if a short link is broken or inactive.", "t": "`$STRING`", "key$": "error_redirect_link", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for a domain.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The configuration status of the domain.", "t": "`$STRING`", "key$": "status", "index$": 4 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "The date and time the domain was last updated.", "t": "`$STRING`", "key$": "updated_at", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "domain", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/domains", "q": {}, "r": {}, "s": [{ "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /domains", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "before/after", "or": "before/after", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/domains", "q": { "exist": ["before/after", "limit", "status"] }, "r": {}, "s": [{ "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /domains/{domain_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "domain_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/domains/{domain_id}", "q": { "exist": ["id"] }, "r": { "param": { "domain_id": "id" } }, "s": [{ "lit": "domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /domains/{domain_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "domain_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/domains/{domain_id}", "q": { "exist": ["id"] }, "r": { "param": { "domain_id": "id" } }, "s": [{ "lit": "domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "domain", "name__orig": "domain", "Name": "Domain", "name_": "domain", "name-": "domain", "NAME": "DOMAIN", "index$": 12 }, { "active": true, "entity": "domain", "key$": "BasicDomainFlow", "kind": "basic", "name": "BasicDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "domain_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "domain_ref01", "srcdatavar": "domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "domain01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-domain_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "domain_ref01", "suffix": "_rm0" }, "m": { "id": "domain01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "domain_ref01" } }], "index$": 4 }] }, 'Domain', { "POST /domains": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["domain"], "properties": { "domain": { "type": "string", "description": "The registered domain/hostname.", "x-ref": "#/components/schemas/domain", "key$": "domain" }, "error_redirect_link": { "type": "string", "description": "URL to redirect customers if a short link is broken or inactive.", "x-ref": "#/components/schemas/error_redirect_link", "key$": "error_redirect_link" } }, "x-ref": "#/components/schemas/domains", "index$": 1 }, "examples": { "basic": { "value": { "domain": "lob.st" } }, "test": { "value": { "domain": "lob.st" } } } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["domain"], "properties": { "domain": { "type": "string", "description": "The registered domain/hostname.", "x-ref": "#/components/schemas/domain", "key$": "domain" }, "error_redirect_link": { "type": "string", "description": "URL to redirect customers if a short link is broken or inactive.", "x-ref": "#/components/schemas/error_redirect_link", "key$": "error_redirect_link" } }, "x-ref": "#/components/schemas/domains" }, "examples": { "basic": { "value": { "domain": "lob.st" } }, "test": { "value": { "domain": "lob.st" } } } }, "multipart/form-data": { "schema": { "type": "object", "required": ["domain"], "properties": { "domain": { "type": "string", "description": "The registered domain/hostname.", "x-ref": "#/components/schemas/domain", "key$": "domain" }, "error_redirect_link": { "type": "string", "description": "URL to redirect customers if a short link is broken or inactive.", "x-ref": "#/components/schemas/error_redirect_link", "key$": "error_redirect_link" } }, "x-ref": "#/components/schemas/domains" }, "examples": { "basic": { "value": { "domain": "lob.st" } }, "test": { "value": { "domain": "lob.st" } } } } } }, "parameters": [] }, "GET /domains": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "before/after", "required": false, "description": "`before` and `after` are both optional but only one of them can be in the query at a time.\n", "schema": { "allOf": [{ "type": "object", "properties": { "before": { "type": "string", "description": "A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n" }, "after": { "type": "string", "description": "A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n" } } }, { "oneOf": [{ "required": ["before"] }, { "required": ["after"] }] }] }, "x-ref": "#/components/parameters/before_after", "index$": 1 }, { "in": "query", "name": "status", "description": "Filter domains by their configuration status.", "schema": { "type": "string", "enum": ["configured", "not_configured"] }, "index$": 2 }] }, "GET /domains/{domain_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "domain_id", "required": true, "description": "Unique identifier for a domain.", "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /domains/{domain_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "domain_id", "required": true, "description": "Unique identifier for a domain.", "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const domain_ref01_ent = client.Domain();
        let domain_ref01_data = setup.data.new.domain['domain_ref01'];
        domain_ref01_data = (await domain_ref01_ent.create(domain_ref01_data)).data();
        (0, node_assert_1.default)(null != domain_ref01_data.id);
        // LIST
        const domain_ref01_match = {};
        const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(domain_ref01_list, { id: domain_ref01_data.id })));
        // LOAD
        const domain_ref01_match_dt0 = {};
        domain_ref01_match_dt0.id = domain_ref01_data.id;
        const domain_ref01_data_dt0 = (await domain_ref01_ent.load(domain_ref01_match_dt0)).data();
        (0, node_assert_1.default)(domain_ref01_data_dt0.id === domain_ref01_data.id);
        // REMOVE
        const domain_ref01_match_rm0 = { id: domain_ref01_data.id };
        await domain_ref01_ent.remove(domain_ref01_match_rm0);
        // LIST
        const domain_ref01_match_rt0 = {};
        const domain_ref01_list_rt0 = (await domain_ref01_ent.list(domain_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(domain_ref01_list_rt0, { id: domain_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain/DomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_DOMAIN_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_DOMAIN_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_DOMAIN_ENTID'];
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
//# sourceMappingURL=DomainEntity.test.js.map