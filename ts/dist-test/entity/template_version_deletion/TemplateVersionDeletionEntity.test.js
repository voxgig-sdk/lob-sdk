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
(0, node_test_1.describe)('TemplateVersionDeletionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.TemplateVersionDeletion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template_version_deletion.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "template_version_deletion", "op": { "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /templates/{tmpl_id}/versions/{vrsn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "template_id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "vrsn_id", "or": "vrsn_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/templates/{tmpl_id}/versions/{vrsn_id}", "q": { "exist": ["template_id", "vrsn_id"] }, "r": { "param": { "tmpl_id": "template_id" } }, "s": [{ "lit": "templates" }, { "var": "template_id" }, { "lit": "versions" }, { "var": "vrsn_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.template"]] }, "key$": "template_version_deletion", "name__orig": "template_version_deletion", "Name": "TemplateVersionDeletion", "name_": "template_version_deletion", "name-": "template-version-deletion", "NAME": "TEMPLATE_VERSION_DELETION", "index$": 27 }, { "active": true, "entity": "template_version_deletion", "key$": "BasicTemplateVersionDeletionFlow", "kind": "basic", "name": "BasicTemplateVersionDeletionFlow", "param": {}, "step": [] }, 'TemplateVersionDeletion', { "DELETE /templates/{tmpl_id}/versions/{vrsn_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tmpl_id", "description": "The ID of the template to which the version belongs.", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }, { "in": "path", "name": "vrsn_id", "description": "id of the template_version", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let template_version_deletion_ref01_data = Object.values(setup.data.existing.template_version_deletion)[0];
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template_version_deletion/TemplateVersionDeletionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template_version_deletion01', 'template_version_deletion02', 'template_version_deletion03', 'template01', 'template02', 'template03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID'];
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
//# sourceMappingURL=TemplateVersionDeletionEntity.test.js.map