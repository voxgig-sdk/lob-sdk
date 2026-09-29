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
(0, node_test_1.describe)('BuckslipOrderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.BuckslipOrder();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'buckslip_order.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "availability_date": { "a": true, "fo": "date-time", "h": "Availability Date", "n": "availability_date", "r": false, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "availability_date", "index$": 0 }, "buckslip_id": { "a": true, "h": "Buckslip Id", "n": "buckslip_id", "r": false, "sh": "Unique identifier prefixed with `bck_`.", "t": "`$STRING`", "key$": "buckslip_id", "index$": 1 }, "cancelled_reason": { "a": true, "h": "Cancelled Reason", "n": "cancelled_reason", "r": false, "sh": "The reason for cancellation.", "t": "`$STRING`", "key$": "cancelled_reason", "index$": 2 }, "date_created": { "a": true, "fo": "date-time", "h": "Date Created", "n": "date_created", "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "date_created", "index$": 3 }, "date_modified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "date_modified", "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was last modified.", "t": "`$STRING`", "key$": "date_modified", "index$": 4 }, "deleted": { "a": true, "h": "Deleted", "n": "deleted", "r": false, "sh": "Only returned if the resource has been successfully deleted.", "t": "`$BOOLEAN`", "key$": "deleted", "index$": 5 }, "expected_availability_date": { "a": true, "fo": "date-time", "h": "Expected Availability Date", "n": "expected_availability_date", "r": false, "sh": "The fixed deadline for the buckslips to be printed.", "t": "`$STRING`", "key$": "expected_availability_date", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier prefixed with `bo_`.", "t": "`$STRING`", "key$": "id", "index$": 7 }, "inventory": { "a": true, "h": "Inventory", "n": "inventory", "r": false, "sh": "The inventory of the buckslip order.", "t": "`$NUMBER`", "key$": "inventory", "index$": 8 }, "object": { "a": true, "h": "Object", "n": "object", "r": true, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 9 }, "quantity": { "a": true, "h": "Quantity", "n": "quantity", "r": true, "sh": "The quantity of buckslips in the order (minimum 5,000).", "t": "`$INTEGER`", "key$": "quantity", "index$": 10 }, "quantity_ordered": { "a": true, "h": "Quantity Ordered", "n": "quantity_ordered", "r": false, "sh": "The quantity of buckslips ordered.", "t": "`$NUMBER`", "key$": "quantity_ordered", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The status of the buckslip order.", "t": "`$STRING`", "key$": "status", "index$": 12 }, "unit_price": { "a": true, "h": "Unit Price", "n": "unit_price", "r": false, "sh": "The unit price for the buckslip order.", "t": "`$NUMBER`", "key$": "unit_price", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "buckslip_order", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /buckslips/{buckslip_id}/orders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "buckslip_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/buckslips/{buckslip_id}/orders", "q": { "exist": ["id"] }, "r": { "param": { "buckslip_id": "id" } }, "s": [{ "lit": "buckslips" }, { "var": "id" }, { "lit": "orders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /buckslips/{buckslip_id}/orders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "buckslip_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/buckslips/{buckslip_id}/orders", "q": { "exist": ["id", "limit", "offset"] }, "r": { "param": { "buckslip_id": "id" } }, "s": [{ "lit": "buckslips" }, { "var": "id" }, { "lit": "orders" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "buckslip_order", "name__orig": "buckslip_order", "Name": "BuckslipOrder", "name_": "buckslip_order", "name-": "buckslip-order", "NAME": "BUCKSLIP_ORDER", "index$": 6 }, { "active": true, "entity": "buckslip_order", "key$": "BasicBuckslipOrderFlow", "kind": "basic", "name": "BasicBuckslipOrderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "buckslip_order_ref01" }, "m": { "buckslip_id": "buckslip01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "buckslip_id": "buckslip01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "buckslip_order_ref01" } }], "index$": 1 }] }, 'BuckslipOrder', { "POST /buckslips/{buckslip_id}/orders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["quantity"], "properties": { "quantity": { "type": "integer", "description": "The quantity of buckslips in the order (minimum 5,000).", "minimum": 5000, "maximum": 10000000, "key$": "quantity" } }, "x-ref": "#/components/schemas/buckslip_order_editable", "index$": 1 }, "example": { "quantity": 10000 } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["quantity"], "properties": { "quantity": { "type": "integer", "description": "The quantity of buckslips in the order (minimum 5,000).", "minimum": 5000, "maximum": 10000000, "key$": "quantity" } }, "x-ref": "#/components/schemas/buckslip_order_editable" }, "example": { "quantity": 10000 } }, "multipart/form-data": { "schema": { "type": "object", "required": ["quantity"], "properties": { "quantity": { "type": "integer", "description": "The quantity of buckslips in the order (minimum 5,000).", "minimum": 5000, "maximum": 10000000, "key$": "quantity" } }, "x-ref": "#/components/schemas/buckslip_order_editable" }, "example": { "quantity": 10000 } } } }, "parameters": [{ "in": "path", "name": "buckslip_id", "description": "The ID of the buckslip to which the buckslip orders belong.", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `bck_`.", "pattern": "^bck_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/buckslip_id" }, "index$": 0 }] }, "GET /buckslips/{buckslip_id}/orders": { "protocol": "http", "parameters": [{ "in": "path", "name": "buckslip_id", "description": "The ID of the buckslip to which the buckslip orders belong.", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `bck_`.", "pattern": "^bck_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/buckslip_id" }, "index$": 0 }, { "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 1 }, { "in": "query", "name": "offset", "required": false, "description": "An integer that designates the offset at which to begin returning results. Defaults to 0.", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const buckslip_order_ref01_ent = client.BuckslipOrder();
        let buckslip_order_ref01_data = setup.data.new.buckslip_order['buckslip_order_ref01'];
        buckslip_order_ref01_data['buckslip_id'] = setup.idmap['buckslip01'];
        buckslip_order_ref01_data = (await buckslip_order_ref01_ent.create(buckslip_order_ref01_data)).data();
        (0, node_assert_1.default)(null != buckslip_order_ref01_data.id);
        // LIST
        const buckslip_order_ref01_match = {};
        buckslip_order_ref01_match['buckslip_id'] = setup.idmap['buckslip01'];
        const buckslip_order_ref01_list = (await buckslip_order_ref01_ent.list(buckslip_order_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(buckslip_order_ref01_list, { id: buckslip_order_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/buckslip_order/BuckslipOrderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['buckslip_order01', 'buckslip_order02', 'buckslip_order03', 'buckslip01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_BUCKSLIP_ORDER_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_BUCKSLIP_ORDER_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_BUCKSLIP_ORDER_ENTID'];
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
//# sourceMappingURL=BuckslipOrderEntity.test.js.map