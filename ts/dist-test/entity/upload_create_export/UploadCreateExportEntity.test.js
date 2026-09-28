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
(0, node_test_1.describe)('UploadCreateExportEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.UploadCreateExport();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'upload_create_export.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "exportId": { "a": true, "h": "Export Id", "n": "exportId", "r": true, "t": "`$STRING`", "key$": "exportId", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 2 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$STRING`", "key$": "type", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "upload_create_export", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /uploads/{upl_id}/exports", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/uploads/{upl_id}/exports", "q": { "exist": ["id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }, { "lit": "exports" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "upload_create_export", "name__orig": "upload_create_export", "Name": "UploadCreateExport", "name_": "upload_create_export", "name-": "upload-create-export", "NAME": "UPLOAD_CREATE_EXPORT", "index$": 29 }, { "active": true, "entity": "upload_create_export", "key$": "BasicUploadCreateExportFlow", "kind": "basic", "name": "BasicUploadCreateExportFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "upload_create_export_ref01" }, "m": { "upl_id": "upl01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'UploadCreateExport', { "POST /uploads/{upl_id}/exports": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "type": { "type": "string", "enum": ["all", "failures", "successes"], "key$": "type" } }, "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "upl_id", "description": "ID of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const upload_create_export_ref01_ent = client.UploadCreateExport();
        let upload_create_export_ref01_data = setup.data.new.upload_create_export['upload_create_export_ref01'];
        upload_create_export_ref01_data['upl_id'] = setup.idmap['upl01'];
        upload_create_export_ref01_data = (await upload_create_export_ref01_ent.create(upload_create_export_ref01_data)).data();
        (0, node_assert_1.default)(null != upload_create_export_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/upload_create_export/UploadCreateExportTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['upload_create_export01', 'upload_create_export02', 'upload_create_export03', 'upl01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID'];
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
//# sourceMappingURL=UploadCreateExportEntity.test.js.map