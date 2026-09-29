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
(0, node_test_1.describe)('TemplateVersionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.TemplateVersion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template_version.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date_created": { "a": true, "fo": "date-time", "h": "Date Created", "n": "date_created", "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "date_created", "index$": 0 }, "date_modified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "date_modified", "r": true, "sh": "A timestamp in ISO 8601 format of the date the resource was last modified.", "t": "`$STRING`", "key$": "date_modified", "index$": 1 }, "deleted": { "a": true, "h": "Deleted", "n": "deleted", "r": false, "sh": "Only returned if the resource has been successfully deleted.", "t": "`$BOOLEAN`", "key$": "deleted", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "An internal description that identifies this resource.", "t": "`$STRING`", "key$": "description", "index$": 3 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": false, "sh": "The engine used to combine HTML template with merge variables.", "t": "`$STRING`", "key$": "engine", "index$": 4 }, "html": { "a": true, "h": "Html", "n": "html", "r": true, "sh": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template.", "t": "`$STRING`", "key$": "html", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier prefixed with `vrsn_`.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "merge_variables": { "a": true, "h": "Merge Variables", "n": "merge_variables", "r": false, "sh": "Object representing the keys of every merge variable present in the template.", "t": "`$OBJECT`", "key$": "merge_variables", "index$": 7 }, "object": { "a": true, "h": "Object", "n": "object", "op": { "list": { "req": false, "type": "`$STRING`" }, "load": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 8 }, "required_vars": { "a": true, "h": "Required Vars", "n": "required_vars", "r": false, "sh": "An array of required variables to be used in a template.", "t": "`$ARRAY`", "key$": "required_vars", "index$": 9 }, "suggest_json_editor": { "a": true, "h": "Suggest Json Editor", "n": "suggest_json_editor", "r": false, "sh": "Used by frontend, true if the template uses advanced features.", "t": "`$BOOLEAN`", "key$": "suggest_json_editor", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "template_version", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /templates/{tmpl_id}/versions/{vrsn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "vrsn_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "template_id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/templates/{tmpl_id}/versions/{vrsn_id}", "q": { "exist": ["id", "template_id"] }, "r": { "param": { "tmpl_id": "template_id", "vrsn_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "template_id" }, { "lit": "versions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /templates/{tmpl_id}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/templates/{tmpl_id}/versions", "q": { "exist": ["id"] }, "r": { "param": { "tmpl_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /templates/{tmpl_id}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "before/after", "or": "before/after", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "date_created", "or": "date_created", "r": false, "t": "`$OBJECT`", "index$": 1 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/templates/{tmpl_id}/versions", "q": { "exist": ["before/after", "date_created", "id", "include", "limit"] }, "r": { "param": { "tmpl_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /templates/{tmpl_id}/versions/{vrsn_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "vrsn_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "template_id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/templates/{tmpl_id}/versions/{vrsn_id}", "q": { "exist": ["id", "template_id"] }, "r": { "param": { "tmpl_id": "template_id", "vrsn_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "template_id" }, { "lit": "versions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.template"]] }, "key$": "template_version", "name__orig": "template_version", "Name": "TemplateVersion", "name_": "template_version", "name-": "template-version", "NAME": "TEMPLATE_VERSION", "index$": 26 }, { "active": true, "entity": "template_version", "key$": "BasicTemplateVersionFlow", "kind": "basic", "name": "BasicTemplateVersionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "template_version_ref01" }, "m": { "template_id": "template01", "tmpl_id": "tmpl01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "tmpl_id": "tmpl01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "template_version_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "template_version_ref01", "srcdatavar": "template_version_ref01_data", "suffix": "_dt0" }, "m": { "id": "template_version01", "template_id": "template01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-template_version_ref01" } }], "index$": 2 }] }, 'TemplateVersion', { "POST /templates/{tmpl_id}/versions/{vrsn_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_updatable", "index$": 1 }, "example": { "description": "Some description" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_updatable" }, "example": { "description": "Some description" } }, "multipart/form-data": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_updatable" }, "example": { "description": "Some description" } } } }, "parameters": [{ "in": "path", "name": "tmpl_id", "description": "The ID of the template to which the version belongs.", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }, { "in": "path", "name": "vrsn_id", "description": "id of the template_version", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }, "index$": 1 }] }, "POST /templates/{tmpl_id}/versions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "type": "string", "x-ref": "#/components/schemas/template_html", "key$": "html" }, "engine": { "default": "legacy", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "type": "string", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "items": { "type": "string" }, "type": "array", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_writable", "index$": 1 }, "example": { "description": "Some Description", "html": "<html>HTML for {{name}}</html>" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "type": "string", "x-ref": "#/components/schemas/template_html", "key$": "html" }, "engine": { "default": "legacy", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "type": "string", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "items": { "type": "string" }, "type": "array", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_writable" }, "example": { "description": "Some Description", "html": "<html>HTML for {{name}}</html>" } }, "multipart/form-data": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "type": "string", "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "type": "string", "x-ref": "#/components/schemas/template_html", "key$": "html" }, "engine": { "default": "legacy", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "type": "string", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "items": { "type": "string" }, "type": "array", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_version_writable" }, "example": { "description": "Some Description", "html": "<html>HTML for {{name}}</html>" } } } }, "parameters": [{ "in": "path", "name": "tmpl_id", "description": "The ID of the template the new version will be attached to", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }] }, "GET /templates/{tmpl_id}/versions": { "protocol": "http", "parameters": [{ "in": "path", "name": "tmpl_id", "description": "The ID of the template associated with the retrieved versions", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }, { "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 1 }, { "in": "query", "name": "before/after", "required": false, "description": "`before` and `after` are both optional but only one of them can be in the query at a time.\n", "schema": { "allOf": [{ "type": "object", "properties": { "before": { "type": "string", "description": "A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n" }, "after": { "type": "string", "description": "A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n" } } }, { "oneOf": [{ "required": ["before"] }, { "required": ["after"] }] }] }, "x-ref": "#/components/parameters/before_after", "index$": 2 }, { "in": "query", "name": "include", "description": "Request that the response include the total count by specifying `include=[\"total_count\"]`.\n", "schema": { "type": "array", "items": { "type": "string" } }, "explode": true, "x-ref": "#/components/parameters/include", "index$": 3 }, { "in": "query", "name": "date_created", "description": "Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_created", "index$": 4 }] }, "GET /templates/{tmpl_id}/versions/{vrsn_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tmpl_id", "description": "The ID of the template to which the version belongs.", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }, { "in": "path", "name": "vrsn_id", "description": "id of the template_version", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const template_version_ref01_ent = client.TemplateVersion();
        let template_version_ref01_data = setup.data.new.template_version['template_version_ref01'];
        template_version_ref01_data['template_id'] = setup.idmap['template01'];
        template_version_ref01_data['tmpl_id'] = setup.idmap['tmpl01'];
        template_version_ref01_data = (await template_version_ref01_ent.create(template_version_ref01_data)).data();
        (0, node_assert_1.default)(null != template_version_ref01_data.id);
        // LIST
        const template_version_ref01_match = {};
        template_version_ref01_match['tmpl_id'] = setup.idmap['tmpl01'];
        const template_version_ref01_list = (await template_version_ref01_ent.list(template_version_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(template_version_ref01_list, { id: template_version_ref01_data.id })));
        // LOAD
        const template_version_ref01_match_dt0 = {};
        template_version_ref01_match_dt0.id = template_version_ref01_data.id;
        const template_version_ref01_data_dt0 = (await template_version_ref01_ent.load(template_version_ref01_match_dt0)).data();
        (0, node_assert_1.default)(template_version_ref01_data_dt0.id === template_version_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template_version/TemplateVersionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template_version01', 'template_version02', 'template_version03', 'template01', 'template02', 'template03', 'tmpl01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_TEMPLATE_VERSION_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_TEMPLATE_VERSION_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_TEMPLATE_VERSION_ENTID'];
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
//# sourceMappingURL=TemplateVersionEntity.test.js.map