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
(0, node_test_1.describe)('UploadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Upload();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'upload.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accountId": { "a": true, "h": "Account Id", "n": "accountId", "r": true, "sh": "Account ID that made the request", "t": "`$STRING`", "key$": "accountId", "index$": 0 }, "bytesProcessed": { "a": true, "h": "Bytes Processed", "n": "bytesProcessed", "r": true, "sh": "Number of bytes processed in your CSV", "t": "`$INTEGER`", "key$": "bytesProcessed", "index$": 1 }, "campaignId": { "a": true, "h": "Campaign Id", "n": "campaignId", "r": true, "t": "`$ANY`", "key$": "campaignId", "index$": 2 }, "dateCreated": { "a": true, "fo": "date-time", "h": "Date Created", "n": "dateCreated", "r": true, "sh": "A timestamp in ISO 8601 format of the date the export was created", "t": "`$STRING`", "key$": "dateCreated", "index$": 3 }, "dateModified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "dateModified", "r": true, "sh": "A timestamp in ISO 8601 format of the date the export was last modified", "t": "`$STRING`", "key$": "dateModified", "index$": 4 }, "deleted": { "a": true, "h": "Deleted", "n": "deleted", "r": true, "sh": "Returns as `true` if the resource has been successfully deleted.", "t": "`$BOOLEAN`", "key$": "deleted", "index$": 5 }, "failedMailpieces": { "a": true, "h": "Failed Mailpieces", "n": "failedMailpieces", "r": true, "sh": "Number of mailpieces that failed to create", "t": "`$INTEGER`", "key$": "failedMailpieces", "index$": 6 }, "failuresUrl": { "a": true, "h": "Failures Url", "n": "failuresUrl", "r": false, "sh": "Url where your campaign mailpiece failures can be retrieved", "t": "`$STRING`", "key$": "failuresUrl", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier prefixed with `ex_`.", "t": "`$STRING`", "key$": "id", "index$": 8 }, "mergeVariableColumnMapping": { "a": true, "h": "Merge Variable Column Mapping", "n": "mergeVariableColumnMapping", "r": false, "sh": "test", "t": "`$OBJECT`", "key$": "mergeVariableColumnMapping", "index$": 9 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "sh": "The list of column headers in your file as an array that you want as metadata associated with each mailpiece.", "t": "`$OBJECT`", "key$": "metadata", "index$": 10 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": true, "sh": "The environment in which the mailpieces were created.", "t": "`$STRING`", "key$": "mode", "index$": 11 }, "optionalAddressColumnMapping": { "a": true, "h": "Optional Address Column Mapping", "n": "optionalAddressColumnMapping", "r": true, "sh": "The mapping of column headers in your file to Lob-optional fields for the resource created.", "t": "`$OBJECT`", "key$": "optionalAddressColumnMapping", "index$": 12 }, "originalFilename": { "a": true, "h": "Original Filename", "n": "originalFilename", "r": false, "sh": "Filename of the upload", "t": "`$STRING`", "key$": "originalFilename", "index$": 13 }, "requiredAddressColumnMapping": { "a": true, "h": "Required Address Column Mapping", "n": "requiredAddressColumnMapping", "r": true, "sh": "The mapping of column headers in your file to Lob-required fields for the resource created.", "t": "`$OBJECT`", "key$": "requiredAddressColumnMapping", "index$": 14 }, "s3Url": { "a": true, "h": "S3 Url", "n": "s3Url", "r": true, "sh": "The URL for the generated export file.", "t": "`$STRING`", "key$": "s3Url", "index$": 15 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "The state of the export file, which can be `in_progress`, `failed` or `succeeded`.", "t": "`$STRING`", "key$": "state", "index$": 16 }, "totalMailpieces": { "a": true, "h": "Total Mailpieces", "n": "totalMailpieces", "r": true, "sh": "Total number of recipients for the campaign", "t": "`$INTEGER`", "key$": "totalMailpieces", "index$": 17 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "The export file type, which can be `all`, `failures` or `successes`.", "t": "`$STRING`", "key$": "type", "index$": 18 }, "uploadId": { "a": true, "h": "Upload Id", "n": "uploadId", "r": true, "sh": "Unique identifier prefixed with `upl_`.", "t": "`$STRING`", "key$": "uploadId", "index$": 19 }, "validatedMailpieces": { "a": true, "h": "Validated Mailpieces", "n": "validatedMailpieces", "r": true, "sh": "Number of mailpieces that were successfully created", "t": "`$INTEGER`", "key$": "validatedMailpieces", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "upload", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /uploads/{upl_id}/file", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/uploads/{upl_id}/file", "q": { "$action": "file", "exist": ["id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }, { "lit": "file" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /uploads", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/uploads", "q": {}, "r": {}, "s": [{ "lit": "uploads" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /uploads/{upl_id}/report", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/uploads/{upl_id}/report", "q": { "$action": "report", "exist": ["id", "limit", "offset", "status"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }, { "lit": "report" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /uploads", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "campaign_id", "or": "campaign_id", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/uploads", "q": { "exist": ["campaign_id"] }, "r": {}, "s": [{ "lit": "uploads" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /uploads/{upl_id}/exports/{ex_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "ex_id", "or": "ex_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/uploads/{upl_id}/exports/{ex_id}", "q": { "exist": ["ex_id", "id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }, { "lit": "exports" }, { "var": "ex_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /uploads/{upl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/uploads/{upl_id}", "q": { "exist": ["id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /uploads/{upl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/uploads/{upl_id}", "q": { "exist": ["id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /uploads/{upl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "upl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/uploads/{upl_id}", "q": { "exist": ["id"] }, "r": { "param": { "upl_id": "id" } }, "s": [{ "lit": "uploads" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "upload", "name__orig": "upload", "Name": "Upload", "name_": "upload", "name-": "upload", "NAME": "UPLOAD", "index$": 28 }, { "active": true, "entity": "upload", "key$": "BasicUploadFlow", "kind": "basic", "name": "BasicUploadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "upload_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "upload_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "upload_ref01", "srcdatavar": "upload_ref01_data", "suffix": "_up0", "textfield": "accountId" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-upload_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "upload_ref01", "srcdatavar": "upload_ref01_data", "suffix": "_dt0" }, "m": { "id": "upload01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-upload_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "upload_ref01", "suffix": "_rm0" }, "m": { "id": "upload01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "upload_ref01" } }], "index$": 5 }] }, 'Upload', { "POST /uploads/{upl_id}/file": { "protocol": "http", "requestBody": { "required": true, "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "file": { "type": "string", "format": "binary" } } } } } }, "parameters": [{ "in": "path", "name": "upl_id", "description": "ID of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }] }, "POST /uploads": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["campaignId"], "properties": { "campaignId": { "allOf": [{ "description": "Unique identifier prefixed with `cmp_`.", "pattern": "^cmp_[a-zA-Z0-9]+$", "title": "Campaign id", "type": "string", "x-ref": "#/components/schemas/cmp_id" }, { "description": "Associated Campaign ID", "example": "cmp_1933ad629bae1408", "type": "string" }], "key$": "campaignId" }, "requiredAddressColumnMapping": { "description": "The mapping of column headers in your file to Lob-required fields for the resource created. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#required-columns-2\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "example": { "address_city": "city", "address_line1": "primary_line", "address_state": "state", "address_zip": "zip_code", "name": "recipient_name" }, "properties": { "address_city": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_city`", "nullable": true, "type": "string" }, "address_line1": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_line1`", "nullable": true, "type": "string" }, "address_state": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_state`", "nullable": true, "type": "string" }, "address_zip": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_zip`", "nullable": true, "type": "string" }, "name": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `name`", "nullable": true, "type": "string" } }, "required": ["name", "address_line1", "address_city", "address_state", "address_zip"], "title": "Required Address Columns", "type": "object", "x-ref": "#/components/schemas/required_address_column_mapping", "key$": "requiredAddressColumnMapping" }, "optionalAddressColumnMapping": { "description": "The mapping of column headers in your file to Lob-optional fields for the resource created. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#optional-columns-3\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "example": { "address_country": "country,", "address_line2": "secondary_line", "company": "company" }, "properties": { "address_country": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"address_country\"", "nullable": true, "type": "string" }, "address_line2": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"address_line2\"", "nullable": true, "type": "string" }, "company": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"company\"", "nullable": true, "type": "string" } }, "required": ["address_line2", "company", "address_country"], "title": "Optional Address Columns", "type": "object", "x-ref": "#/components/schemas/optional_address_column_mapping", "key$": "optionalAddressColumnMapping" }, "metadata": { "default": { "columns": [] }, "description": "The list of column headers in your file as an array that you want as metadata associated with each mailpiece. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#required-columns-2\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "example": { "columns": ["recipient_name"] }, "properties": { "columns": { "default": [], "description": "The list of column names from the csv file which you want associated with each of your mailpieces", "items": { "type": "string" }, "type": "array" } }, "required": ["columns"], "title": "Metadata", "type": "object", "x-ref": "#/components/schemas/uploads_metadata", "key$": "metadata" }, "mergeVariableColumnMapping": { "default": null, "description": "test", "example": { "gift_code": "code", "name": "recipient_name", "qr_code_redirect_url": "redirect_url" }, "nullable": true, "title": "Merge Variable Mapping", "type": "object", "x-ref": "#/components/schemas/merge_variable_column_mapping", "key$": "mergeVariableColumnMapping" } }, "x-ref": "#/components/schemas/upload_writable", "index$": 1 } } } }, "parameters": [] }, "GET /uploads/{upl_id}/report": { "protocol": "http", "parameters": [{ "in": "path", "name": "upl_id", "description": "ID of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }, { "in": "query", "required": false, "name": "status", "description": "The status of line items to filter and retrieve. By default all line items are returned.", "schema": { "enum": ["Validated", "Failed", "Processing"], "type": "string" }, "index$": 1 }, { "in": "query", "required": false, "name": "limit", "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 100, "maximum": 100, "example": 10 }, "index$": 2 }, { "in": "query", "name": "offset", "required": false, "description": "An integer that designates the offset at which to begin returning results. Defaults to 0.", "schema": { "type": "integer", "default": 0 }, "x-ref": "#/components/parameters/offset", "index$": 3 }] }, "GET /uploads": { "protocol": "http", "parameters": [{ "required": false, "schema": { "type": "string", "title": "Campaign id", "description": "Unique identifier prefixed with `cmp_`.", "pattern": "^cmp_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/cmp_id" }, "name": "campaignId", "description": "id of the campaign", "in": "query", "index$": 0 }] }, "GET /uploads/{upl_id}/exports/{ex_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "upl_id", "description": "ID of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }, { "in": "path", "name": "ex_id", "description": "ID of the export", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `ex_`.", "pattern": "^ex_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/ex_id" }, "index$": 1 }] }, "GET /uploads/{upl_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "upl_id", "description": "id of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }] }, "DELETE /uploads/{upl_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "upl_id", "description": "id of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }] }, "PATCH /uploads/{upl_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "originalFilename": { "title": "Original Filename", "type": "string", "description": "Original filename provided when the upload is created.", "key$": "originalFilename" }, "requiredAddressColumnMapping": { "title": "Required Address Columns", "type": "object", "required": ["name", "address_line1", "address_city", "address_state", "address_zip"], "properties": { "name": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `name`", "nullable": true, "type": "string" }, "address_line1": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_line1`", "nullable": true, "type": "string" }, "address_city": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_city`", "nullable": true, "type": "string" }, "address_state": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_state`", "nullable": true, "type": "string" }, "address_zip": { "default": null, "description": "The column header from the csv file that should be mapped to the required field `address_zip`", "nullable": true, "type": "string" } }, "example": { "name": "recipient_name", "address_line1": "primary_line", "address_city": "city", "address_state": "state", "address_zip": "zip_code" }, "description": "The mapping of column headers in your file to Lob-required fields for the resource created. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#required-columns-2\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "x-ref": "#/components/schemas/required_address_column_mapping", "key$": "requiredAddressColumnMapping" }, "optionalAddressColumnMapping": { "title": "Optional Address Columns", "type": "object", "required": ["address_line2", "company", "address_country"], "properties": { "address_line2": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"address_line2\"", "nullable": true, "type": "string" }, "company": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"company\"", "nullable": true, "type": "string" }, "address_country": { "default": null, "description": "The column header from the csv file that should be mapped to the optional field \"address_country\"", "nullable": true, "type": "string" } }, "example": { "address_line2": "secondary_line", "company": "company", "address_country": "country," }, "description": "The mapping of column headers in your file to Lob-optional fields for the resource created. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#optional-columns-3\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "x-ref": "#/components/schemas/optional_address_column_mapping", "key$": "optionalAddressColumnMapping" }, "metadata": { "title": "Metadata", "type": "object", "required": ["columns"], "properties": { "columns": { "default": [], "description": "The list of column names from the csv file which you want associated with each of your mailpieces", "items": { "type": "string" }, "type": "array" } }, "default": { "columns": [] }, "example": { "columns": ["recipient_name"] }, "description": "The list of column headers in your file as an array that you want as metadata associated with each mailpiece. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#required-columns-2\" target=\"_blank\">Campaign Audience Guide</a> for additional details.", "x-ref": "#/components/schemas/uploads_metadata", "key$": "metadata" }, "mergeVariableColumnMapping": { "title": "Merge Variable Mapping", "type": "object", "nullable": true, "default": null, "example": { "name": "recipient_name", "gift_code": "code", "qr_code_redirect_url": "redirect_url" }, "description": "The mapping of column headers in your file to the merge variables present in your creative. See our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/campaign-or-triggered-sends/campaign-audience-guide#step-3-map-merge-variable-data-if-applicable-7\" target=\"_blank\">Campaign Audience Guide</a> for additional details. <br />If a merge variable has the same \"name\" as a \"key\" in the `requiredAddressColumnMapping` or `optionalAddressColumnMapping` objects, then they **CANNOT** have a different value in this object. If a different value is provided, then when the campaign is processing it will get overwritten with the mapped value present in the `requiredAddressColumnMapping` or `optionalAddressColumnMapping` objects. The redirect URLs for QR codes can also be customized using this mapping. If the URL has a variable and the variable mapping existsing here, then data from the respective column in the audience file will be merged into the URL template.", "x-ref": "#/components/schemas/merge_variable_column_mapping", "key$": "mergeVariableColumnMapping" } }, "x-ref": "#/components/schemas/upload_updatable", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "upl_id", "description": "id of the upload", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `upl_`.", "pattern": "^upl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/upl_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const upload_ref01_ent = client.Upload();
        let upload_ref01_data = setup.data.new.upload['upload_ref01'];
        upload_ref01_data = (await upload_ref01_ent.create(upload_ref01_data)).data();
        (0, node_assert_1.default)(null != upload_ref01_data.id);
        // LIST
        const upload_ref01_match = {};
        const upload_ref01_list = (await upload_ref01_ent.list(upload_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(upload_ref01_list, { id: upload_ref01_data.id })));
        // UPDATE
        const upload_ref01_data_up0 = {};
        upload_ref01_data_up0.id = upload_ref01_data.id;
        const upload_ref01_markdef_up0 = { name: 'accountId', value: 'Mark01-upload_ref01_' + setup.now };
        upload_ref01_data_up0[upload_ref01_markdef_up0.name] = upload_ref01_markdef_up0.value;
        const upload_ref01_resdata_up0 = (await upload_ref01_ent.update(upload_ref01_data_up0)).data();
        (0, node_assert_1.default)(upload_ref01_resdata_up0.id === upload_ref01_data_up0.id);
        (0, node_assert_1.default)(upload_ref01_resdata_up0[upload_ref01_markdef_up0.name] === upload_ref01_markdef_up0.value);
        // LOAD
        const upload_ref01_match_dt0 = {};
        upload_ref01_match_dt0.id = upload_ref01_data.id;
        const upload_ref01_data_dt0 = (await upload_ref01_ent.load(upload_ref01_match_dt0)).data();
        (0, node_assert_1.default)(upload_ref01_data_dt0.id === upload_ref01_data.id);
        // REMOVE
        const upload_ref01_match_rm0 = { id: upload_ref01_data.id };
        await upload_ref01_ent.remove(upload_ref01_match_rm0);
        // LIST
        const upload_ref01_match_rt0 = {};
        const upload_ref01_list_rt0 = (await upload_ref01_ent.list(upload_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(upload_ref01_list_rt0, { id: upload_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/upload/UploadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['upload01', 'upload02', 'upload03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_UPLOAD_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_UPLOAD_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_UPLOAD_ENTID'];
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
//# sourceMappingURL=UploadEntity.test.js.map