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
(0, node_test_1.describe)('TemplateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LobSDK.test();
        const ent = testsdk.Template();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOB_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'template.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date_created": { "a": true, "fo": "date-time", "h": "Date Created", "n": "date_created", "r": false, "sh": "A timestamp in ISO 8601 format of the date the resource was created.", "t": "`$STRING`", "key$": "date_created", "index$": 0 }, "date_modified": { "a": true, "fo": "date-time", "h": "Date Modified", "n": "date_modified", "r": false, "sh": "A timestamp in ISO 8601 format of the date the resource was last modified.", "t": "`$STRING`", "key$": "date_modified", "index$": 1 }, "deleted": { "a": true, "h": "Deleted", "n": "deleted", "r": false, "sh": "Only returned if the resource has been successfully deleted.", "t": "`$BOOLEAN`", "key$": "deleted", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "An internal description that identifies this resource.", "t": "`$STRING`", "key$": "description", "index$": 3 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": false, "sh": "The engine used to combine HTML template with merge variables.", "t": "`$STRING`", "key$": "engine", "index$": 4 }, "html": { "a": true, "h": "Html", "n": "html", "r": true, "sh": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template.", "t": "`$STRING`", "key$": "html", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier prefixed with `tmpl_`.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Use metadata to store custom information for tagging and labeling back to your internal systems.", "t": "`$OBJECT`", "key$": "metadata", "index$": 7 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "sh": "Value is resource type.", "t": "`$STRING`", "key$": "object", "index$": 8 }, "published_version": { "a": true, "h": "Published Version", "n": "published_version", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "t": "`$ANY`", "key$": "published_version", "index$": 9 }, "required_vars": { "a": true, "h": "Required Vars", "n": "required_vars", "r": false, "sh": "An array of required variables to be used in a template.", "t": "`$ARRAY`", "key$": "required_vars", "index$": 10 }, "versions": { "a": true, "h": "Versions", "n": "versions", "r": true, "sh": "An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template.", "t": "`$ARRAY`", "key$": "versions", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "template", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /templates/{tmpl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/templates/{tmpl_id}", "q": { "exist": ["id"] }, "r": { "param": { "tmpl_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /templates", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/templates", "q": {}, "r": {}, "s": [{ "lit": "templates" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /templates", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "before/after", "or": "before/after", "r": false, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "date_created", "or": "date_created", "r": false, "t": "`$OBJECT`", "index$": 1 }, { "a": true, "k": "query", "n": "include", "or": "include", "r": false, "t": "`$ARRAY`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "metadata", "or": "metadata", "r": false, "t": "`$OBJECT`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/templates", "q": { "exist": ["before/after", "date_created", "include", "limit", "metadata"] }, "r": {}, "s": [{ "lit": "templates" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /templates/{tmpl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/templates/{tmpl_id}", "q": { "exist": ["id"] }, "r": { "param": { "tmpl_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /templates/{tmpl_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tmpl_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/templates/{tmpl_id}", "q": { "exist": ["id"] }, "r": { "param": { "tmpl_id": "id" } }, "s": [{ "lit": "templates" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "template", "name__orig": "template", "Name": "Template", "name_": "template", "name-": "template", "NAME": "TEMPLATE", "index$": 25 }, { "active": true, "entity": "template", "key$": "BasicTemplateFlow", "kind": "basic", "name": "BasicTemplateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "template_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "template_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "template_ref01", "srcdatavar": "template_ref01_data", "suffix": "_dt0" }, "m": { "id": "template01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-template_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "template_ref01", "suffix": "_rm0" }, "m": { "id": "template01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "template_ref01" } }], "index$": 4 }] }, 'Template', { "POST /templates/{tmpl_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "published_version": { "allOf": [{ "description": "The ID of the published version of a template you'd like to update. The published version is the one that will be used in any Print & Mail API requests that reference the specified template. Will err if the referenced `published_version` has been deleted or does not exist.", "type": "string" }, { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }], "key$": "published_version" } }, "x-ref": "#/components/schemas/template_update", "index$": 1 }, "example": { "description": "Updated Example", "published_version": "vrsn_a" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "published_version": { "allOf": [{ "description": "The ID of the published version of a template you'd like to update. The published version is the one that will be used in any Print & Mail API requests that reference the specified template. Will err if the referenced `published_version` has been deleted or does not exist.", "type": "string" }, { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }], "key$": "published_version" } }, "x-ref": "#/components/schemas/template_update" }, "example": { "description": "Updated Example", "published_version": "vrsn_a" } }, "multipart/form-data": { "schema": { "type": "object", "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "published_version": { "allOf": [{ "description": "The ID of the published version of a template you'd like to update. The published version is the one that will be used in any Print & Mail API requests that reference the specified template. Will err if the referenced `published_version` has been deleted or does not exist.", "type": "string" }, { "type": "string", "description": "Unique identifier prefixed with `vrsn_`.", "pattern": "^vrsn_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/vrsn_id" }], "key$": "published_version" } }, "x-ref": "#/components/schemas/template_update" }, "example": { "description": "Updated Example", "published_version": "vrsn_a" } } } }, "parameters": [{ "in": "path", "name": "tmpl_id", "description": "id of the template", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }] }, "POST /templates": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "type": "string", "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "x-ref": "#/components/schemas/template_html", "key$": "html" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_writable", "index$": 1 }, "example": { "description": "demo", "html": "<html>HTML for {{name}}</html>", "metadata": { "spiffy": "true" }, "engine": "handlebars" } }, "application/x-www-form-urlencoded": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "type": "string", "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "x-ref": "#/components/schemas/template_html", "key$": "html" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_writable" }, "example": { "description": "demo", "html": "<html>HTML for {{name}}</html>", "metadata": { "spiffy": "true" }, "engine": "handlebars" } }, "multipart/form-data": { "schema": { "type": "object", "required": ["html"], "properties": { "description": { "type": "string", "description": "An internal description that identifies this resource. Must be no longer than 255 characters.\n", "maxLength": 255, "nullable": true, "x-ref": "#/components/schemas/resource_description", "key$": "description" }, "html": { "type": "string", "description": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template. See [here](#section/HTML-Examples) for guidance on designing HTML templates. Please see endpoint specific documentation for any other product-specific HTML details:\n- [Postcards](#operation/postcard_create) - `front` and `back`\n- [Self Mailers](#operation/self_mailer_create) - `inside` and `outside`\n- [Letters](#operation/letter_create) - `file`\n- [Checks](#operation/check_create) - `check_bottom` and `attachment`\n- [Cards](#operation/card_create) - `front` and `back`\n\nIf there is a syntax error with your variable names within your HTML, then an error will be thrown, e.g. using a `{{#users}}` opening tag without the corresponding closing tag `{{/users}}`.\n", "maxLength": 100000, "x-ref": "#/components/schemas/template_html", "key$": "html" }, "metadata": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata", "key$": "metadata" }, "engine": { "type": "string", "description": "The engine used to combine HTML template with merge variables.\n  * `legacy` - Lob's original engine\n  * `handlebars`\n", "enum": ["legacy", "handlebars"], "nullable": true, "default": "legacy", "x-ref": "#/components/schemas/engine", "key$": "engine" }, "required_vars": { "type": "array", "items": { "type": "string" }, "description": "An array of required variables to be used in a template. Only available for `handlebars` templates.\n", "x-ref": "#/components/schemas/template_required_vars", "key$": "required_vars" } }, "x-ref": "#/components/schemas/template_writable" }, "example": { "description": "demo", "html": "<html>HTML for {{name}}</html>", "metadata": { "spiffy": "true" }, "engine": "handlebars" } } } }, "parameters": [] }, "GET /templates": { "protocol": "http", "parameters": [{ "in": "query", "name": "limit", "required": false, "description": "How many results to return.", "schema": { "type": "integer", "minimum": 1, "default": 10, "maximum": 100, "example": 10 }, "x-ref": "#/components/parameters/limit", "index$": 0 }, { "in": "query", "name": "before/after", "required": false, "description": "`before` and `after` are both optional but only one of them can be in the query at a time.\n", "schema": { "allOf": [{ "type": "object", "properties": { "before": { "type": "string", "description": "A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n" }, "after": { "type": "string", "description": "A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n" } } }, { "oneOf": [{ "required": ["before"] }, { "required": ["after"] }] }] }, "x-ref": "#/components/parameters/before_after", "index$": 1 }, { "in": "query", "name": "include", "description": "Request that the response include the total count by specifying `include=[\"total_count\"]`.\n", "schema": { "type": "array", "items": { "type": "string" } }, "explode": true, "x-ref": "#/components/parameters/include", "index$": 2 }, { "in": "query", "name": "date_created", "description": "Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.", "x-ref": "#/components/schemas/date_filter" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/date_created", "index$": 3 }, { "in": "query", "name": "metadata", "description": "Filter by metadata key-value pair`.", "schema": { "type": "object", "additionalProperties": { "type": "string" }, "description": "Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.", "maxLength": 500, "pattern": "[^\"\\\\]{0,500}", "x-ref": "#/components/schemas/metadata" }, "style": "deepObject", "explode": true, "x-ref": "#/components/parameters/metadata", "index$": 4 }] }, "GET /templates/{tmpl_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tmpl_id", "description": "id of the template", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }] }, "DELETE /templates/{tmpl_id}": { "protocol": "http", "parameters": [{ "in": "path", "name": "tmpl_id", "description": "id of the template", "required": true, "schema": { "type": "string", "description": "Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).", "pattern": "^tmpl_[a-zA-Z0-9]+$", "x-ref": "#/components/schemas/tmpl_id" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const template_ref01_ent = client.Template();
        let template_ref01_data = setup.data.new.template['template_ref01'];
        template_ref01_data = (await template_ref01_ent.create(template_ref01_data)).data();
        (0, node_assert_1.default)(null != template_ref01_data.id);
        // LIST
        const template_ref01_match = {};
        const template_ref01_list = (await template_ref01_ent.list(template_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(template_ref01_list, { id: template_ref01_data.id })));
        // LOAD
        const template_ref01_match_dt0 = {};
        template_ref01_match_dt0.id = template_ref01_data.id;
        const template_ref01_data_dt0 = (await template_ref01_ent.load(template_ref01_match_dt0)).data();
        (0, node_assert_1.default)(template_ref01_data_dt0.id === template_ref01_data.id);
        // REMOVE
        const template_ref01_match_rm0 = { id: template_ref01_data.id };
        await template_ref01_ent.remove(template_ref01_match_rm0);
        // LIST
        const template_ref01_match_rt0 = {};
        const template_ref01_list_rt0 = (await template_ref01_ent.list(template_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(template_ref01_list_rt0, { id: template_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/template/TemplateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LobSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['template01', 'template02', 'template03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOB_TEST_TEMPLATE_ENTID': idmap,
        'LOB_TEST_LIVE': 'FALSE',
        'LOB_TEST_EXPLAIN': 'FALSE',
        'LOB_APIKEY': '',
        'LOB_SECRET': '',
    });
    idmap = env['LOB_TEST_TEMPLATE_ENTID'];
    const live = 'TRUE' === env.LOB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOB_TEST_TEMPLATE_ENTID'];
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
//# sourceMappingURL=TemplateEntity.test.js.map