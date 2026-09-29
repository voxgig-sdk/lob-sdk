"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Lob',
        slug: "lob",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.lob.com/v1",
        auth: {
            prefix: 'Basic',
            basic: true,
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            address: {},
            bank_account: {},
            bank_deletion: {},
            billing_group: {},
            booklet: {},
            buckslip: {},
            buckslip_order: {},
            campaign: {},
            card: {},
            card_order: {},
            check: {},
            creative: {},
            domain: {},
            identity_validation: {},
            intl_verification: {},
            letter: {},
            link: {},
            lob_credits_balance: {},
            postcard: {},
            qr_code: {},
            resource_proof: {},
            response: {},
            reverse_geocode: {},
            self_mailer: {},
            snap_pack: {},
            template: {},
            template_version: {},
            template_version_deletion: {},
            upload: {},
            upload_create_export: {},
            us_autocompletion: {},
            us_verification: {},
            zip: {},
        }
    };
    entity = {
        "address": {
            "fields": [
                {
                    "name": "address_city",
                    "title": "Address City",
                    "type": "`$STRING`"
                },
                {
                    "name": "address_country",
                    "title": "Address Country",
                    "type": "`$STRING`"
                },
                {
                    "name": "address_line1",
                    "title": "Address Line1",
                    "type": "`$STRING`"
                },
                {
                    "name": "address_line2",
                    "title": "Address Line2",
                    "type": "`$STRING`"
                },
                {
                    "name": "address_state",
                    "title": "Address State",
                    "type": "`$STRING`"
                },
                {
                    "name": "address_zip",
                    "title": "Address Zip",
                    "type": "`$STRING`"
                },
                {
                    "name": "company",
                    "title": "Company",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "title": "Phone",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "address",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/addresses",
                            "segments": [
                                {
                                    "lit": "addresses"
                                }
                            ],
                            "parts": [
                                "addresses"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/addresses",
                            "segments": [
                                {
                                    "lit": "addresses"
                                }
                            ],
                            "parts": [
                                "addresses"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "metadata"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/addresses/{adr_id}",
                            "segments": [
                                {
                                    "lit": "addresses"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "addresses",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "adr_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "adr_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/addresses/{adr_id}",
                            "segments": [
                                {
                                    "lit": "addresses"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "addresses",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "adr_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "adr_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "bank_account": {
            "fields": [
                {
                    "name": "account_number",
                    "title": "Account Number",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "account_type",
                    "title": "Account Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of entity that holds the account."
                },
                {
                    "name": "bank_name",
                    "title": "Bank Name",
                    "type": "`$STRING`",
                    "short": "The name of the bank based on the provided routing number, e.g."
                },
                {
                    "name": "check_template",
                    "title": "Check Template",
                    "type": "`$STRING`",
                    "short": "The check template used for printing."
                },
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "The city associated with your home bank account."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "fractional_routing_number",
                    "title": "Fractional Routing Number",
                    "type": "`$STRING`",
                    "short": "The fractional routing number for your home bank account."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "microdeposit_type",
                    "title": "Microdeposit Type",
                    "type": "`$STRING`",
                    "short": "The type of microdeposit verification required for this bank account."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "list": {
                            "type": "`$STRING`"
                        },
                        "load": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "routing_number",
                    "title": "Routing Number",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Must be a <a href=\"https://www.frbservices.org/index.html\" target=\"_blank\">valid US routing number</a>."
                },
                {
                    "name": "signatory",
                    "title": "Signatory",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The signatory associated with your account."
                },
                {
                    "name": "signature_url",
                    "title": "Signature Url",
                    "type": "`$ANY`"
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`",
                    "short": "The state associated with your home bank account."
                },
                {
                    "name": "verified",
                    "title": "Verified",
                    "type": "`$BOOLEAN`",
                    "short": "A bank account must be verified before a check can be created."
                },
                {
                    "name": "zipcode",
                    "title": "Zipcode",
                    "type": "`$STRING`",
                    "short": "The zipcode associated with your home bank account."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "bank_account",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bank_accounts/{bank_id}/verify",
                            "segments": [
                                {
                                    "lit": "bank_accounts"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "verify"
                                }
                            ],
                            "parts": [
                                "bank_accounts",
                                "{id}",
                                "verify"
                            ],
                            "rename": {
                                "param": {
                                    "bank_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bank_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "verify",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bank_accounts",
                            "segments": [
                                {
                                    "lit": "bank_accounts"
                                }
                            ],
                            "parts": [
                                "bank_accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/bank_accounts",
                            "segments": [
                                {
                                    "lit": "bank_accounts"
                                }
                            ],
                            "parts": [
                                "bank_accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "metadata"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/bank_accounts/{bank_id}",
                            "segments": [
                                {
                                    "lit": "bank_accounts"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "bank_accounts",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "bank_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bank_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "bank_deletion": {
            "fields": [],
            "name": "bank_deletion",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/bank_accounts/{bank_id}",
                            "segments": [
                                {
                                    "lit": "bank_accounts"
                                },
                                {
                                    "var": "bank_id"
                                }
                            ],
                            "parts": [
                                "bank_accounts",
                                "{bank_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "bank_id",
                                        "orig": "bank_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "bank_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.bank_account"
                    ]
                ]
            }
        },
        "billing_group": {
            "fields": [
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Description of the billing group."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `bg_`."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the billing group."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "billing_group",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/billing_groups/{bg_id}",
                            "segments": [
                                {
                                    "lit": "billing_groups"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "billing_groups",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "bg_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bg_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/billing_groups",
                            "segments": [
                                {
                                    "lit": "billing_groups"
                                }
                            ],
                            "parts": [
                                "billing_groups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/billing_groups",
                            "segments": [
                                {
                                    "lit": "billing_groups"
                                }
                            ],
                            "parts": [
                                "billing_groups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_modified",
                                        "orig": "date_modified",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date_created",
                                    "date_modified",
                                    "include",
                                    "limit",
                                    "offset",
                                    "sort_by"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/billing_groups/{bg_id}",
                            "segments": [
                                {
                                    "lit": "billing_groups"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "billing_groups",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "bg_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "bg_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "booklet": {
            "fields": [
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "fsc",
                    "title": "Fsc",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "mail_type",
                    "title": "Mail Type",
                    "type": "`$STRING`",
                    "short": "A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is less predictable and takes longer to delive…"
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`",
                    "short": "You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`"
                },
                {
                    "name": "pages",
                    "title": "Pages",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production."
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "source_material",
                    "title": "Source Material",
                    "type": "`$STRING`"
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`",
                    "short": "An array of tracking events ordered by ascending `time`."
                },
                {
                    "name": "tracking_number",
                    "title": "Tracking Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "booklet",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/booklets",
                            "segments": [
                                {
                                    "lit": "booklets"
                                }
                            ],
                            "parts": [
                                "booklets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/booklets",
                            "segments": [
                                {
                                    "lit": "booklets"
                                }
                            ],
                            "parts": [
                                "booklets"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "send_date",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/booklets/{booklet_id}",
                            "segments": [
                                {
                                    "lit": "booklets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "booklets",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "booklet_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "booklet_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/booklets/{booklet_id}",
                            "segments": [
                                {
                                    "lit": "booklets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "booklets",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "booklet_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "booklet_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "buckslip": {
            "fields": [
                {
                    "name": "account_id",
                    "title": "Account Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "allocated_quantity",
                    "title": "Allocated Quantity",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The allocated quantity of buckslips."
                },
                {
                    "name": "auto_reorder",
                    "title": "Auto Reorder",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "True if the buckslips should be auto-reordered."
                },
                {
                    "name": "available_quantity",
                    "title": "Available Quantity",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The available quantity of buckslips."
                },
                {
                    "name": "back_original_url",
                    "title": "Back Original Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The original URL of the back template.",
                    "format": "uri"
                },
                {
                    "name": "buckslip_orders",
                    "title": "Buckslip Orders",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "An array of buckslip orders that are associated with the buckslip."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Description of the buckslip."
                },
                {
                    "name": "finish",
                    "title": "Finish",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "front_original_url",
                    "title": "Front Original Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The original URL of the front template.",
                    "format": "uri"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `bck_`."
                },
                {
                    "name": "mode",
                    "title": "Mode",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "onhand_quantity",
                    "title": "Onhand Quantity",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The onhand quantity of buckslips."
                },
                {
                    "name": "pending_quantity",
                    "title": "Pending Quantity",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The pending quantity of buckslips."
                },
                {
                    "name": "projected_quantity",
                    "title": "Projected Quantity",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The sum of pending and onhand quantities of buckslips."
                },
                {
                    "name": "raw_url",
                    "title": "Raw Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The raw URL of the buckslip.",
                    "format": "uri"
                },
                {
                    "name": "reorder_quantity",
                    "title": "Reorder Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "The number of buckslips to be reordered."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`",
                    "short": "The size of the buckslip"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "stock",
                    "title": "Stock",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "threshold_amount",
                    "title": "Threshold Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The threshold amount of the buckslip"
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The signed link for the buckslip.",
                    "format": "uri"
                },
                {
                    "name": "weight",
                    "title": "Weight",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "buckslip",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/buckslips",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                }
                            ],
                            "parts": [
                                "buckslips"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/buckslips",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                }
                            ],
                            "parts": [
                                "buckslips"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "include",
                                    "limit"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/buckslips/{buckslip_id}",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "buckslips",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "buckslip_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "buckslip_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/buckslips/{buckslip_id}",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "buckslips",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "buckslip_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "buckslip_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/buckslips/{buckslip_id}",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "buckslips",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "buckslip_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "buckslip_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "buckslip_order": {
            "fields": [
                {
                    "name": "availability_date",
                    "title": "Availability Date",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "buckslip_id",
                    "title": "Buckslip Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `bck_`."
                },
                {
                    "name": "cancelled_reason",
                    "title": "Cancelled Reason",
                    "type": "`$STRING`",
                    "short": "The reason for cancellation."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "expected_availability_date",
                    "title": "Expected Availability Date",
                    "type": "`$STRING`",
                    "short": "The fixed deadline for the buckslips to be printed.",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `bo_`."
                },
                {
                    "name": "inventory",
                    "title": "Inventory",
                    "type": "`$NUMBER`",
                    "short": "The inventory of the buckslip order."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Value is resource type."
                },
                {
                    "name": "quantity",
                    "title": "Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The quantity of buckslips in the order (minimum 5,000)."
                },
                {
                    "name": "quantity_ordered",
                    "title": "Quantity Ordered",
                    "type": "`$NUMBER`",
                    "short": "The quantity of buckslips ordered."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The status of the buckslip order."
                },
                {
                    "name": "unit_price",
                    "title": "Unit Price",
                    "type": "`$NUMBER`",
                    "short": "The unit price for the buckslip order."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "buckslip_order",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/buckslips/{buckslip_id}/orders",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "orders"
                                }
                            ],
                            "parts": [
                                "buckslips",
                                "{id}",
                                "orders"
                            ],
                            "rename": {
                                "param": {
                                    "buckslip_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "buckslip_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/buckslips/{buckslip_id}/orders",
                            "segments": [
                                {
                                    "lit": "buckslips"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "orders"
                                }
                            ],
                            "parts": [
                                "buckslips",
                                "{id}",
                                "orders"
                            ],
                            "rename": {
                                "param": {
                                    "buckslip_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "buckslip_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "limit",
                                    "offset"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "campaign": {
            "fields": [
                {
                    "name": "auto_cancel_if_ncoa",
                    "title": "Auto Cancel If Ncoa",
                    "type": "`$BOOLEAN`",
                    "short": "Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA."
                },
                {
                    "name": "billing_group_id",
                    "title": "Billing Group Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `bg_`."
                },
                {
                    "name": "cancel_window_campaign_minutes",
                    "title": "Cancel Window Campaign Minutes",
                    "type": "`$INTEGER`",
                    "short": "A window, in minutes, within which the campaign can be canceled."
                },
                {
                    "name": "creatives",
                    "title": "Creatives",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of creatives that have been associated with this campaign."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier prefixed with `cmp_`."
                },
                {
                    "name": "is_draft",
                    "title": "Is Draft",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether or not the campaign is still a draft."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Name of the campaign."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Value is resource type."
                },
                {
                    "name": "print_speed",
                    "title": "Print Speed",
                    "type": "`$STRING`",
                    "short": "A string designating the mail speed type: * `core` - 2 production business days"
                },
                {
                    "name": "schedule_type",
                    "title": "Schedule Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "How the campaign should be scheduled."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`",
                    "short": "If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.",
                    "format": "date-time"
                },
                {
                    "name": "target_delivery_date",
                    "title": "Target Delivery Date",
                    "type": "`$STRING`",
                    "short": "If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.",
                    "format": "date-time"
                },
                {
                    "name": "uploads",
                    "title": "Uploads",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "A single-element array containing the upload object that is assocated with this campaign."
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The use type for each mailpiece."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "campaign",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/campaigns/{cmp_id}/send",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "send"
                                }
                            ],
                            "parts": [
                                "campaigns",
                                "{id}",
                                "send"
                            ],
                            "rename": {
                                "param": {
                                    "cmp_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "cmp_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "send",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/campaigns",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                }
                            ],
                            "parts": [
                                "campaigns"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_lang_output",
                                        "orig": "x-lang-output",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "x_lang_output"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/campaigns",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                }
                            ],
                            "parts": [
                                "campaigns"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "include",
                                    "limit"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/campaigns/{cmp_id}",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "campaigns",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "cmp_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "cmp_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/campaigns/{cmp_id}",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "campaigns",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "cmp_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "cmp_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/campaigns/{cmp_id}",
                            "segments": [
                                {
                                    "lit": "campaigns"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "campaigns",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "cmp_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "cmp_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "card": {
            "fields": [
                {
                    "name": "account_id",
                    "title": "Account Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "auto_reorder",
                    "title": "Auto Reorder",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "True if the cards should be auto-reordered."
                },
                {
                    "name": "available_quantity",
                    "title": "Available Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The available quantity of cards."
                },
                {
                    "name": "back_original_url",
                    "title": "Back Original Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The original URL of the back template.",
                    "format": "uri"
                },
                {
                    "name": "countries",
                    "title": "Countries",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "Description of the card."
                },
                {
                    "name": "front_original_url",
                    "title": "Front Original Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The original URL of the front template.",
                    "format": "uri"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `card_`."
                },
                {
                    "name": "mode",
                    "title": "Mode",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "orientation",
                    "title": "Orientation",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The orientation of the card."
                },
                {
                    "name": "pending_quantity",
                    "title": "Pending Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The pending quantity of cards."
                },
                {
                    "name": "raw_url",
                    "title": "Raw Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The raw URL of the card.",
                    "format": "uri"
                },
                {
                    "name": "reorder_quantity",
                    "title": "Reorder Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The number of cards to be reordered."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`",
                    "short": "The size of the card"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "threshold_amount",
                    "title": "Threshold Amount",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The threshold amount of the card"
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    }
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The signed link for the card.",
                    "format": "uri"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "card",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/cards/{card_id}",
                            "segments": [
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "cards",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/cards",
                            "segments": [
                                {
                                    "lit": "cards"
                                }
                            ],
                            "parts": [
                                "cards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cards",
                            "segments": [
                                {
                                    "lit": "cards"
                                }
                            ],
                            "parts": [
                                "cards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "include",
                                    "limit"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cards/{card_id}",
                            "segments": [
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "cards",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/cards/{card_id}",
                            "segments": [
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "cards",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "card_order": {
            "fields": [
                {
                    "name": "availability_date",
                    "title": "Availability Date",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "cancelled_reason",
                    "title": "Cancelled Reason",
                    "type": "`$STRING`",
                    "short": "The reason for cancellation."
                },
                {
                    "name": "card_id",
                    "title": "Card Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `card_`."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "expected_availability_date",
                    "title": "Expected Availability Date",
                    "type": "`$STRING`",
                    "short": "The fixed deadline for the cards to be printed.",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `co_`."
                },
                {
                    "name": "inventory",
                    "title": "Inventory",
                    "type": "`$NUMBER`",
                    "short": "The inventory of the card order."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Value is resource type."
                },
                {
                    "name": "quantity",
                    "title": "Quantity",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "The quantity of cards in the order (minimum 10,000)."
                },
                {
                    "name": "quantity_ordered",
                    "title": "Quantity Ordered",
                    "type": "`$NUMBER`",
                    "short": "The quantity of cards ordered"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The status of the card order."
                },
                {
                    "name": "unit_price",
                    "title": "Unit Price",
                    "type": "`$NUMBER`",
                    "short": "The unit price for the card order."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "card_order",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/cards/{card_id}/orders",
                            "segments": [
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "orders"
                                }
                            ],
                            "parts": [
                                "cards",
                                "{id}",
                                "orders"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cards/{card_id}/orders",
                            "segments": [
                                {
                                    "lit": "cards"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "orders"
                                }
                            ],
                            "parts": [
                                "cards",
                                "{id}",
                                "orders"
                            ],
                            "rename": {
                                "param": {
                                    "card_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "card_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "limit",
                                    "offset"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "check": {
            "fields": [
                {
                    "name": "amount",
                    "title": "Amount",
                    "type": "`$NUMBER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$NUMBER`"
                        }
                    },
                    "short": "The payment amount to be sent in US dollars.",
                    "format": "float"
                },
                {
                    "name": "attachment_template_id",
                    "title": "Attachment Template Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "attachment_template_version_id",
                    "title": "Attachment Template Version Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "bank_account",
                    "title": "Bank Account",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "check_bottom_template_id",
                    "title": "Check Bottom Template Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "check_bottom_template_version_id",
                    "title": "Check Bottom Template Version Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "check_number",
                    "title": "Check Number",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`",
                    "short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
                    "format": "date"
                },
                {
                    "name": "failure_reason",
                    "title": "Failure Reason",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$ANY`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `chk_`."
                },
                {
                    "name": "mail_type",
                    "title": "Mail Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "memo",
                    "title": "Memo",
                    "type": "`$STRING`"
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress."
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`",
                    "short": "An array of tracking_event objects ordered by ascending `time`."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A [signed link](#section/Asset-URLs) served over HTTPS."
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "TThe use type for each mailpiece."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "check",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/checks",
                            "segments": [
                                {
                                    "lit": "checks"
                                }
                            ],
                            "parts": [
                                "checks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/checks",
                            "segments": [
                                {
                                    "lit": "checks"
                                }
                            ],
                            "parts": [
                                "checks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scheduled",
                                        "orig": "scheduled",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "scheduled",
                                    "send_date",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/checks/{chk_id}",
                            "segments": [
                                {
                                    "lit": "checks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "checks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "chk_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "chk_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/checks/{chk_id}",
                            "segments": [
                                {
                                    "lit": "checks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "checks",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "chk_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "chk_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "creative": {
            "fields": [
                {
                    "name": "campaigns",
                    "title": "Campaigns",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "Array of campaigns associated with the creative ID"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "op": {
                        "load": {
                            "req": true,
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "details",
                    "title": "Details",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$STRING`",
                    "short": "Must either be an address ID or an inline object with correct address parameters."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `crv_`."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "resource_type",
                    "title": "Resource Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "template_preview_urls",
                    "title": "Template Preview Urls",
                    "type": "`$OBJECT`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    },
                    "short": "Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets."
                },
                {
                    "name": "template_previews",
                    "title": "Template Previews",
                    "type": "`$ARRAY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ARRAY`"
                        }
                    },
                    "short": "A list of template preview objects if the creative uses HTML template(s) as artwork asset(s)."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "creative",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/creatives",
                            "segments": [
                                {
                                    "lit": "creatives"
                                }
                            ],
                            "parts": [
                                "creatives"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_lang_output",
                                        "orig": "x-lang-output",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "x_lang_output"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/creatives/{crv_id}",
                            "segments": [
                                {
                                    "lit": "creatives"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "creatives",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "crv_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "crv_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "crv_2a3b096c409b32c"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/creatives/{crv_id}",
                            "segments": [
                                {
                                    "lit": "creatives"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "creatives",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "crv_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "crv_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "crv_2a3b096c409b32c"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "domain": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "The date and time the domain was created."
                },
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The registered domain/hostname."
                },
                {
                    "name": "error_redirect_link",
                    "title": "Error Redirect Link",
                    "type": "`$STRING`",
                    "short": "URL to redirect customers if a short link is broken or inactive."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for a domain."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The configuration status of the domain."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "short": "The date and time the domain was last updated."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "domain",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/domains",
                            "segments": [
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domains",
                            "segments": [
                                {
                                    "lit": "domains"
                                }
                            ],
                            "parts": [
                                "domains"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "limit",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/domains/{domain_id}",
                            "segments": [
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "domains",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/domains/{domain_id}",
                            "segments": [
                                {
                                    "lit": "domains"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "domains",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "identity_validation": {
            "fields": [
                {
                    "name": "confidence",
                    "title": "Confidence",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_line",
                    "title": "Last Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`"
                },
                {
                    "name": "primary_line",
                    "title": "Primary Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "recipient",
                    "title": "Recipient",
                    "type": "`$STRING`"
                },
                {
                    "name": "score",
                    "title": "Score",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "secondary_line",
                    "title": "Secondary Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "urbanization",
                    "title": "Urbanization",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "identity_validation",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/identity_validation",
                            "segments": [
                                {
                                    "lit": "identity_validation"
                                }
                            ],
                            "parts": [
                                "identity_validation"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "intl_verification": {
            "fields": [
                {
                    "name": "addresses",
                    "title": "Addresses",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "components",
                    "title": "Components",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`"
                },
                {
                    "name": "coverage",
                    "title": "Coverage",
                    "type": "`$STRING`"
                },
                {
                    "name": "deliverability",
                    "title": "Deliverability",
                    "type": "`$STRING`"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Indicates whether any errors occurred during the verification process."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_line",
                    "title": "Last Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`"
                },
                {
                    "name": "primary_line",
                    "title": "Primary Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "recipient",
                    "title": "Recipient",
                    "type": "`$STRING`"
                },
                {
                    "name": "secondary_line",
                    "title": "Secondary Line",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "intl_verification",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/intl_verifications",
                            "segments": [
                                {
                                    "lit": "intl_verifications"
                                }
                            ],
                            "parts": [
                                "intl_verifications"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "x_lang_output",
                                        "orig": "x-lang-output",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "x_lang_output"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bulk/intl_verifications",
                            "segments": [
                                {
                                    "lit": "bulk"
                                },
                                {
                                    "lit": "intl_verifications"
                                }
                            ],
                            "parts": [
                                "bulk",
                                "intl_verifications"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "letter": {
            "fields": [
                {
                    "name": "address_placement",
                    "title": "Address Placement",
                    "type": "`$STRING`"
                },
                {
                    "name": "cards",
                    "title": "Cards",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`"
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "custom_envelope",
                    "title": "Custom Envelope",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "double_sided",
                    "title": "Double Sided",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "extra_service",
                    "title": "Extra Service",
                    "type": "`$STRING`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "fsc",
                    "title": "Fsc",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "mail_type",
                    "title": "Mail Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`"
                },
                {
                    "name": "perforated_page",
                    "title": "Perforated Page",
                    "type": "`$STRING`"
                },
                {
                    "name": "return_envelope",
                    "title": "Return Envelope",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "template_id",
                    "title": "Template Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "template_version_id",
                    "title": "Template Version Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tracking_number",
                    "title": "Tracking Number",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "letter",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/letters",
                            "segments": [
                                {
                                    "lit": "letters"
                                }
                            ],
                            "parts": [
                                "letters"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    },
                                    {
                                        "name": "lob_version",
                                        "orig": "Lob-Version",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "2024-01-01"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key",
                                    "lob_version"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/letters",
                            "segments": [
                                {
                                    "lit": "letters"
                                }
                            ],
                            "parts": [
                                "letters"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "color",
                                        "orig": "color",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scheduled",
                                        "orig": "scheduled",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "color",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "scheduled",
                                    "send_date",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/letters/{ltr_id}",
                            "segments": [
                                {
                                    "lit": "letters"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "letters",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "ltr_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "ltr_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/letters/{ltr_id}",
                            "segments": [
                                {
                                    "lit": "letters"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "letters",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "ltr_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "ltr_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "link": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "The date and time the link was created."
                },
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "short": "The registered domain to be used for the short URL."
                },
                {
                    "name": "domain_id",
                    "title": "Domain Id",
                    "type": "`$STRING`",
                    "short": "A unique identifier for the registered domain."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `lnk_`."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "redirect_link",
                    "title": "Redirect Link",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The original target URL."
                },
                {
                    "name": "short_link",
                    "title": "Short Link",
                    "type": "`$STRING`",
                    "short": "The shortened URL for the associated original URL."
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "short": "The unique path for the shortened URL, if empty a unique path will be used."
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "short": "The title of the URL."
                },
                {
                    "name": "updated_at",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "short": "The date and time the link was last updated."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "link",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/links",
                            "segments": [
                                {
                                    "lit": "links"
                                }
                            ],
                            "parts": [
                                "links"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/links",
                            "segments": [
                                {
                                    "lit": "links"
                                }
                            ],
                            "parts": [
                                "links"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "domain_id",
                                        "orig": "domain_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "domain_id",
                                    "limit"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/links/{link_id}",
                            "segments": [
                                {
                                    "lit": "links"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "links",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "link_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "link_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/links/{link_id}",
                            "segments": [
                                {
                                    "lit": "links"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "links",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "link_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "link_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/links/{link_id}",
                            "segments": [
                                {
                                    "lit": "links"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "links",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "link_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "link_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "lob_credits_balance": {
            "fields": [
                {
                    "name": "balance",
                    "title": "Balance",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Account's current balance of Lob Credits."
                }
            ],
            "name": "lob_credits_balance",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/accounts",
                            "segments": [
                                {
                                    "lit": "accounts"
                                }
                            ],
                            "parts": [
                                "accounts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "postcard": {
            "fields": [
                {
                    "name": "back_template_id",
                    "title": "Back Template Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The unique ID of the HTML template used for the back of the postcard."
                },
                {
                    "name": "back_template_version_id",
                    "title": "Back Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the back of the postcard."
                },
                {
                    "name": "campaign_id",
                    "title": "Campaign Id",
                    "type": "`$STRING`",
                    "short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`."
                },
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`",
                    "short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
                    "format": "date"
                },
                {
                    "name": "failure_reason",
                    "title": "Failure Reason",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$ANY`"
                },
                {
                    "name": "front_template_id",
                    "title": "Front Template Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The unique ID of the HTML template used for the front of the postcard."
                },
                {
                    "name": "front_template_version_id",
                    "title": "Front Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the front of the postcard."
                },
                {
                    "name": "fsc",
                    "title": "Fsc",
                    "type": "`$BOOLEAN`",
                    "short": "This is in beta."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `psc_`."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress."
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`",
                    "short": "An array of tracking_event objects ordered by ascending `time`."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A [signed link](#section/Asset-URLs) served over HTTPS."
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`",
                    "short": "The use type for each mailpiece."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "postcard",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/postcards",
                            "segments": [
                                {
                                    "lit": "postcards"
                                }
                            ],
                            "parts": [
                                "postcards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/postcards",
                            "segments": [
                                {
                                    "lit": "postcards"
                                }
                            ],
                            "parts": [
                                "postcards"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scheduled",
                                        "orig": "scheduled",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "scheduled",
                                    "send_date",
                                    "size",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/postcards/{psc_id}",
                            "segments": [
                                {
                                    "lit": "postcards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "postcards",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "psc_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "psc_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/postcards/{psc_id}",
                            "segments": [
                                {
                                    "lit": "postcards"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "postcards",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "psc_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "psc_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "qr_code": {
            "fields": [
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "number_of_scans",
                    "title": "Number Of Scans",
                    "type": "`$NUMBER`",
                    "short": "Number of times the QR Code associated with this mail piece was scanned."
                },
                {
                    "name": "resource_id",
                    "title": "Resource Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for each mail piece."
                },
                {
                    "name": "scans",
                    "title": "Scans",
                    "type": "`$ARRAY`",
                    "short": "Detailed scan information associated with each mail piece."
                }
            ],
            "name": "qr_code",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/qr_code_analytics",
                            "segments": [
                                {
                                    "lit": "qr_code_analytics"
                                }
                            ],
                            "parts": [
                                "qr_code_analytics"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "resource_id",
                                        "orig": "resource_ids",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scanned",
                                        "orig": "scanned",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date_created",
                                    "include",
                                    "limit",
                                    "offset",
                                    "resource_id",
                                    "scanned"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "resource_proof": {
            "fields": [
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "short": "Errors encountered during processing."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `res_prf_`."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "resource_type",
                    "title": "Resource Type",
                    "type": "`$STRING`",
                    "short": "The type of resource to generate a proof for."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "The processing status of the resource proof."
                },
                {
                    "name": "template_id",
                    "title": "Template Id",
                    "type": "`$STRING`",
                    "short": "The template ID associated with the resource proof, if any."
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`",
                    "short": "Thumbnail images of the resource proof."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "short": "A URL to the resource proof PDF."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "resource_proof",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/resource_proofs",
                            "segments": [
                                {
                                    "lit": "resource_proofs"
                                }
                            ],
                            "parts": [
                                "resource_proofs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/resource_proofs/{res_prf_id}",
                            "segments": [
                                {
                                    "lit": "resource_proofs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "resource_proofs",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "res_prf_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "res_prf_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/resource_proofs/{res_prf_id}",
                            "segments": [
                                {
                                    "lit": "resource_proofs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "resource_proofs",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "res_prf_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "res_prf_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "response": {
            "fields": [
                {
                    "name": "account_id",
                    "title": "Account Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Your Lob account id."
                },
                {
                    "name": "brand_name",
                    "title": "Brand Name",
                    "type": "`$STRING`"
                },
                {
                    "name": "campaign_code",
                    "title": "Campaign Code",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The campaign code associated with the Informed Delivery campaign."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$BOOLEAN`"
                        },
                        "update": {
                            "type": "`$BOOLEAN`"
                        }
                    },
                    "short": "Whether the resource has been deleted."
                },
                {
                    "name": "end_date",
                    "title": "End Date",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A timestamp in ISO 8601 format of the date the campaign ends.",
                    "format": "date-time"
                },
                {
                    "name": "end_serial",
                    "title": "End Serial",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        },
                        "update": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The last serial number in the range of serial numbers for this campaign."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `infd_`."
                },
                {
                    "name": "lob_campaign_id",
                    "title": "Lob Campaign Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "mode",
                    "title": "Mode",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The mode of the Informed Delivery campaign."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is the resource type."
                },
                {
                    "name": "quantity",
                    "title": "Quantity",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "representative_image_s3_link",
                    "title": "Representative Image S3 Link",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A URL link to the campaigns representative image."
                },
                {
                    "name": "ride_along_image_s3_link",
                    "title": "Ride Along Image S3 Link",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A URL link to the campaigns ride along image."
                },
                {
                    "name": "ride_along_url",
                    "title": "Ride Along Url",
                    "type": "`$STRING`"
                },
                {
                    "name": "service_request_number",
                    "title": "Service Request Number",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The USPS promotion service request number used to create this campaign (if there was one used)."
                },
                {
                    "name": "start_date",
                    "title": "Start Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "start_serial",
                    "title": "Start Serial",
                    "type": "`$INTEGER`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$INTEGER`"
                        },
                        "update": {
                            "type": "`$INTEGER`"
                        }
                    },
                    "short": "The first serial number in the range of serial numbers for this campaign."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "usps_campaign_id",
                    "title": "Usps Campaign Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        },
                        "update": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A numberical string up to 12 characters long."
                },
                {
                    "name": "usps_title",
                    "title": "Usps Title",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "response",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/informed_delivery_campaigns",
                            "segments": [
                                {
                                    "lit": "informed_delivery_campaigns"
                                }
                            ],
                            "parts": [
                                "informed_delivery_campaigns"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/informed_delivery_campaigns",
                            "segments": [
                                {
                                    "lit": "informed_delivery_campaigns"
                                }
                            ],
                            "parts": [
                                "informed_delivery_campaigns"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/informed_delivery_campaigns/{usps_campaign_id}",
                            "segments": [
                                {
                                    "lit": "informed_delivery_campaigns"
                                },
                                {
                                    "var": "usps_campaign_id"
                                }
                            ],
                            "parts": [
                                "informed_delivery_campaigns",
                                "{usps_campaign_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "usps_campaign_id",
                                        "orig": "usps_campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "1200772869"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "usps_campaign_id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/informed_delivery_campaigns/{usps_campaign_id}",
                            "segments": [
                                {
                                    "lit": "informed_delivery_campaigns"
                                },
                                {
                                    "var": "usps_campaign_id"
                                }
                            ],
                            "parts": [
                                "informed_delivery_campaigns",
                                "{usps_campaign_id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "usps_campaign_id",
                                        "orig": "usps_campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "1200772869"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "usps_campaign_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "reverse_geocode": {
            "fields": [
                {
                    "name": "addresses",
                    "title": "Addresses",
                    "type": "`$ARRAY`",
                    "short": "list of addresses"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `us_reverse_geocode_`."
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location.",
                    "format": "float"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location.",
                    "format": "float"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "reverse_geocode",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/us_reverse_geocode_lookups",
                            "segments": [
                                {
                                    "lit": "us_reverse_geocode_lookups"
                                }
                            ],
                            "parts": [
                                "us_reverse_geocode_lookups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 5
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "size"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "self_mailer": {
            "fields": [
                {
                    "name": "campaign_id",
                    "title": "Campaign Id",
                    "type": "`$STRING`",
                    "short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`."
                },
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`",
                    "short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
                    "format": "date"
                },
                {
                    "name": "failure_reason",
                    "title": "Failure Reason",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$ANY`"
                },
                {
                    "name": "fsc",
                    "title": "Fsc",
                    "type": "`$BOOLEAN`",
                    "short": "This is in beta."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `sfm_`."
                },
                {
                    "name": "inside_template_id",
                    "title": "Inside Template Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the HTML template used for the inside of the self mailer."
                },
                {
                    "name": "inside_template_version_id",
                    "title": "Inside Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the inside of the self mailer."
                },
                {
                    "name": "mail_type",
                    "title": "Mail Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "outside_template_id",
                    "title": "Outside Template Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the HTML template used for the outside of the self mailer."
                },
                {
                    "name": "outside_template_version_id",
                    "title": "Outside Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the outside of the self mailer."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress."
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`",
                    "short": "An array of certified tracking events ordered by ascending `time`."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A [signed link](#section/Asset-URLs) served over HTTPS."
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The use type for each mailpiece."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "self_mailer",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/self_mailers",
                            "segments": [
                                {
                                    "lit": "self_mailers"
                                }
                            ],
                            "parts": [
                                "self_mailers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/self_mailers",
                            "segments": [
                                {
                                    "lit": "self_mailers"
                                }
                            ],
                            "parts": [
                                "self_mailers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scheduled",
                                        "orig": "scheduled",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "size",
                                        "orig": "size",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "scheduled",
                                    "send_date",
                                    "size",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/self_mailers/{sfm_id}",
                            "segments": [
                                {
                                    "lit": "self_mailers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "self_mailers",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "sfm_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "sfm_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/self_mailers/{sfm_id}",
                            "segments": [
                                {
                                    "lit": "self_mailers"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "self_mailers",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "sfm_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "sfm_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "snap_pack": {
            "fields": [
                {
                    "name": "campaign_id",
                    "title": "Campaign Id",
                    "type": "`$STRING`",
                    "short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`."
                },
                {
                    "name": "carrier",
                    "title": "Carrier",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    }
                },
                {
                    "name": "color",
                    "title": "Color",
                    "type": "`$BOOLEAN`",
                    "short": "Set this key to `true` if you would like to print in color."
                },
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "expected_delivery_date",
                    "title": "Expected Delivery Date",
                    "type": "`$STRING`",
                    "short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
                    "format": "date"
                },
                {
                    "name": "failure_reason",
                    "title": "Failure Reason",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "from",
                    "title": "From",
                    "type": "`$ANY`"
                },
                {
                    "name": "fsc",
                    "title": "Fsc",
                    "type": "`$BOOLEAN`",
                    "short": "Contact support@lob.com or your account contact to learn more."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Unique identifier prefixed with `ord_`."
                },
                {
                    "name": "inside_template_id",
                    "title": "Inside Template Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the HTML template used for the inside of the snap pack."
                },
                {
                    "name": "inside_template_version_id",
                    "title": "Inside Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the inside of the snap pack."
                },
                {
                    "name": "mail_type",
                    "title": "Mail Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "outside_template_id",
                    "title": "Outside Template Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the HTML template used for the outside of the snap pack."
                },
                {
                    "name": "outside_template_version_id",
                    "title": "Outside Template Version Id",
                    "type": "`$STRING`",
                    "short": "The unique ID of the specific version of the HTML template used for the outside of the snap pack."
                },
                {
                    "name": "send_date",
                    "title": "Send Date",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$STRING`"
                },
                {
                    "name": "sla",
                    "title": "Sla",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress."
                },
                {
                    "name": "thumbnails",
                    "title": "Thumbnails",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "to",
                    "title": "To",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$OBJECT`"
                        }
                    }
                },
                {
                    "name": "tracking_events",
                    "title": "Tracking Events",
                    "type": "`$ARRAY`",
                    "short": "An array of tracking events ordered by ascending `time`."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "A [signed link](#section/Asset-URLs) served over HTTPS."
                },
                {
                    "name": "use_type",
                    "title": "Use Type",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The use type for each mailpiece."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "snap_pack",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/snap_packs",
                            "segments": [
                                {
                                    "lit": "snap_packs"
                                }
                            ],
                            "parts": [
                                "snap_packs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "Idempotency-Key",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/snap_packs",
                            "segments": [
                                {
                                    "lit": "snap_packs"
                                }
                            ],
                            "parts": [
                                "snap_packs"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaign_id",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "mail_type",
                                        "orig": "mail_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "usps_first_class"
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "send_date",
                                        "orig": "send_date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "sort_by",
                                        "orig": "sort_by",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "campaign_id",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "mail_type",
                                    "metadata",
                                    "send_date",
                                    "sort_by",
                                    "status"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/snap_packs/{snap_pack_id}",
                            "segments": [
                                {
                                    "lit": "snap_packs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "snap_packs",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "snap_pack_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "snap_pack_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/snap_packs/{snap_pack_id}",
                            "segments": [
                                {
                                    "lit": "snap_packs"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "snap_packs",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "snap_pack_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "snap_pack_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "template": {
            "fields": [
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "engine",
                    "title": "Engine",
                    "type": "`$STRING`",
                    "short": "The engine used to combine HTML template with merge variables."
                },
                {
                    "name": "html",
                    "title": "Html",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier prefixed with `tmpl_`."
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "short": "Use metadata to store custom information for tagging and labeling back to your internal systems."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "published_version",
                    "title": "Published Version",
                    "type": "`$ANY`",
                    "req": true,
                    "op": {
                        "create": {
                            "type": "`$ANY`"
                        }
                    }
                },
                {
                    "name": "required_vars",
                    "title": "Required Vars",
                    "type": "`$ARRAY`",
                    "short": "An array of required variables to be used in a template."
                },
                {
                    "name": "versions",
                    "title": "Versions",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "template",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/templates/{tmpl_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/templates",
                            "segments": [
                                {
                                    "lit": "templates"
                                }
                            ],
                            "parts": [
                                "templates"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/templates",
                            "segments": [
                                {
                                    "lit": "templates"
                                }
                            ],
                            "parts": [
                                "templates"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "metadata",
                                        "orig": "metadata",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "date_created",
                                    "include",
                                    "limit",
                                    "metadata"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/templates/{tmpl_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/templates/{tmpl_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "template_version": {
            "fields": [
                {
                    "name": "date_created",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was created.",
                    "format": "date-time"
                },
                {
                    "name": "date_modified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Only returned if the resource has been successfully deleted."
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`",
                    "short": "An internal description that identifies this resource."
                },
                {
                    "name": "engine",
                    "title": "Engine",
                    "type": "`$STRING`",
                    "short": "The engine used to combine HTML template with merge variables."
                },
                {
                    "name": "html",
                    "title": "Html",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier prefixed with `vrsn_`."
                },
                {
                    "name": "merge_variables",
                    "title": "Merge Variables",
                    "type": "`$OBJECT`",
                    "short": "Object representing the keys of every merge variable present in the template."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "req": true,
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        },
                        "load": {
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Value is resource type."
                },
                {
                    "name": "required_vars",
                    "title": "Required Vars",
                    "type": "`$ARRAY`",
                    "short": "An array of required variables to be used in a template."
                },
                {
                    "name": "suggest_json_editor",
                    "title": "Suggest Json Editor",
                    "type": "`$BOOLEAN`",
                    "short": "Used by frontend, true if the template uses advanced features."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "template_version",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "template_id"
                                },
                                {
                                    "lit": "versions"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{template_id}",
                                "versions",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "template_id",
                                    "vrsn_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "vrsn_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "template_id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "template_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/templates/{tmpl_id}/versions",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "versions"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{id}",
                                "versions"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/templates/{tmpl_id}/versions",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "versions"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{id}",
                                "versions"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "before/after",
                                        "orig": "before/after",
                                        "type": "`$ANY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date_created",
                                        "orig": "date_created",
                                        "type": "`$OBJECT`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "include",
                                        "orig": "include",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before/after",
                                    "date_created",
                                    "id",
                                    "include",
                                    "limit"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "template_id"
                                },
                                {
                                    "lit": "versions"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{template_id}",
                                "versions",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "template_id",
                                    "vrsn_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "vrsn_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "template_id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "template_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.template"
                    ]
                ]
            }
        },
        "template_version_deletion": {
            "fields": [],
            "name": "template_version_deletion",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
                            "segments": [
                                {
                                    "lit": "templates"
                                },
                                {
                                    "var": "template_id"
                                },
                                {
                                    "lit": "versions"
                                },
                                {
                                    "var": "vrsn_id"
                                }
                            ],
                            "parts": [
                                "templates",
                                "{template_id}",
                                "versions",
                                "{vrsn_id}"
                            ],
                            "rename": {
                                "param": {
                                    "tmpl_id": "template_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "template_id",
                                        "orig": "tmpl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "vrsn_id",
                                        "orig": "vrsn_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "template_id",
                                    "vrsn_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.template"
                    ]
                ]
            }
        },
        "upload": {
            "fields": [
                {
                    "name": "accountId",
                    "title": "Account Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Account ID that made the request"
                },
                {
                    "name": "bytesProcessed",
                    "title": "Bytes Processed",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of bytes processed in your CSV"
                },
                {
                    "name": "campaignId",
                    "title": "Campaign Id",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "dateCreated",
                    "title": "Date Created",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the export was created",
                    "format": "date-time"
                },
                {
                    "name": "dateModified",
                    "title": "Date Modified",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A timestamp in ISO 8601 format of the date the export was last modified",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Returns as `true` if the resource has been successfully deleted."
                },
                {
                    "name": "failedMailpieces",
                    "title": "Failed Mailpieces",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of mailpieces that failed to create"
                },
                {
                    "name": "failuresUrl",
                    "title": "Failures Url",
                    "type": "`$STRING`",
                    "short": "Url where your campaign mailpiece failures can be retrieved"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier prefixed with `ex_`."
                },
                {
                    "name": "mergeVariableColumnMapping",
                    "title": "Merge Variable Column Mapping",
                    "type": "`$OBJECT`",
                    "short": "test"
                },
                {
                    "name": "metadata",
                    "title": "Metadata",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The list of column headers in your file as an array that you want as metadata associated with each mailpiece."
                },
                {
                    "name": "mode",
                    "title": "Mode",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The environment in which the mailpieces were created."
                },
                {
                    "name": "optionalAddressColumnMapping",
                    "title": "Optional Address Column Mapping",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The mapping of column headers in your file to Lob-optional fields for the resource created."
                },
                {
                    "name": "originalFilename",
                    "title": "Original Filename",
                    "type": "`$STRING`",
                    "short": "Filename of the upload"
                },
                {
                    "name": "requiredAddressColumnMapping",
                    "title": "Required Address Column Mapping",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "The mapping of column headers in your file to Lob-required fields for the resource created."
                },
                {
                    "name": "s3Url",
                    "title": "S3 Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The URL for the generated export file."
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The state of the export file, which can be `in_progress`, `failed` or `succeeded`."
                },
                {
                    "name": "totalMailpieces",
                    "title": "Total Mailpieces",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Total number of recipients for the campaign"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The export file type, which can be `all`, `failures` or `successes`."
                },
                {
                    "name": "uploadId",
                    "title": "Upload Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier prefixed with `upl_`."
                },
                {
                    "name": "validatedMailpieces",
                    "title": "Validated Mailpieces",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Number of mailpieces that were successfully created"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "upload",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/uploads/{upl_id}/file",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "file"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}",
                                "file"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "file",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/uploads",
                            "segments": [
                                {
                                    "lit": "uploads"
                                }
                            ],
                            "parts": [
                                "uploads"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/uploads/{upl_id}/report",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "report"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}",
                                "report"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "report",
                                "exist": [
                                    "id",
                                    "limit",
                                    "offset",
                                    "status"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/uploads",
                            "segments": [
                                {
                                    "lit": "uploads"
                                }
                            ],
                            "parts": [
                                "uploads"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "campaign_id",
                                        "orig": "campaignId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "campaign_id"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/uploads/{upl_id}/exports/{ex_id}",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "exports"
                                },
                                {
                                    "var": "ex_id"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}",
                                "exports",
                                "{ex_id}"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "ex_id",
                                        "orig": "ex_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "ex_id",
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/uploads/{upl_id}",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/uploads/{upl_id}",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/uploads/{upl_id}",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "upload_create_export": {
            "fields": [
                {
                    "name": "exportId",
                    "title": "Export Id",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "upload_create_export",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/uploads/{upl_id}/exports",
                            "segments": [
                                {
                                    "lit": "uploads"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "exports"
                                }
                            ],
                            "parts": [
                                "uploads",
                                "{id}",
                                "exports"
                            ],
                            "rename": {
                                "param": {
                                    "upl_id": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "upl_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "us_autocompletion": {
            "fields": [
                {
                    "name": "address_prefix",
                    "title": "Address Prefix",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Only accepts numbers and street names in an alphanumeric format."
                },
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "An optional city input used to filter suggestions."
                },
                {
                    "name": "geo_ip_sort",
                    "title": "Geo Ip Sort",
                    "type": "`$BOOLEAN`",
                    "short": "If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `us_auto_`."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "state",
                    "title": "State",
                    "type": "`$STRING`",
                    "short": "An optional state input used to filter suggestions."
                },
                {
                    "name": "suggestions",
                    "title": "Suggestions",
                    "type": "`$ARRAY`",
                    "short": "An array of objects representing suggested addresses."
                },
                {
                    "name": "zip_code",
                    "title": "Zip Code",
                    "type": "`$STRING`",
                    "short": "An optional ZIP Code input used to filter suggestions."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "us_autocompletion",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/us_autocompletions",
                            "segments": [
                                {
                                    "lit": "us_autocompletions"
                                }
                            ],
                            "parts": [
                                "us_autocompletions"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "case",
                                        "orig": "case",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "upper"
                                    },
                                    {
                                        "name": "valid_address",
                                        "orig": "valid_addresses",
                                        "type": "`$BOOLEAN`",
                                        "kind": "query",
                                        "example": false
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "case",
                                    "valid_address"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "us_verification": {
            "fields": [
                {
                    "name": "addresses",
                    "title": "Addresses",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "components",
                    "title": "Components",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A nested object containing a breakdown of each component of an address."
                },
                {
                    "name": "deliverability",
                    "title": "Deliverability",
                    "type": "`$STRING`",
                    "short": "Summarizes the deliverability of the `us_verification` object."
                },
                {
                    "name": "deliverability_analysis",
                    "title": "Deliverability Analysis",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "A nested object containing a breakdown of the deliverability of an address."
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Indicates whether any errors occurred during the verification process."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier prefixed with `us_ver_`."
                },
                {
                    "name": "last_line",
                    "title": "Last Line",
                    "type": "`$STRING`",
                    "short": "Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`)"
                },
                {
                    "name": "lob_confidence_score",
                    "title": "Lob Confidence Score",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households."
                },
                {
                    "name": "object",
                    "title": "Object",
                    "type": "`$STRING`",
                    "short": "Value is resource type."
                },
                {
                    "name": "primary_line",
                    "title": "Primary Line",
                    "type": "`$STRING`",
                    "short": "The primary delivery line (usually the street address) of the address."
                },
                {
                    "name": "recipient",
                    "title": "Recipient",
                    "type": "`$STRING`",
                    "short": "The intended recipient, typically a person's or firm's name."
                },
                {
                    "name": "secondary_line",
                    "title": "Secondary Line",
                    "type": "`$STRING`",
                    "short": "The secondary delivery line of the address."
                },
                {
                    "name": "urbanization",
                    "title": "Urbanization",
                    "type": "`$STRING`",
                    "short": "Only present for addresses in Puerto Rico."
                },
                {
                    "name": "valid_address",
                    "title": "Valid Address",
                    "type": "`$BOOLEAN`",
                    "short": "This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data."
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "us_verification",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/bulk/us_verifications",
                            "segments": [
                                {
                                    "lit": "bulk"
                                },
                                {
                                    "lit": "us_verifications"
                                }
                            ],
                            "parts": [
                                "bulk",
                                "us_verifications"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "case",
                                        "orig": "case",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "upper"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "case"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/us_verifications",
                            "segments": [
                                {
                                    "lit": "us_verifications"
                                }
                            ],
                            "parts": [
                                "us_verifications"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "case",
                                        "orig": "case",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "upper"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "case"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "zip": {
            "fields": [
                {
                    "name": "zip_code",
                    "title": "Zip Code",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "A 5-digit ZIP code."
                }
            ],
            "name": "zip",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/us_zip_lookups",
                            "segments": [
                                {
                                    "lit": "us_zip_lookups"
                                }
                            ],
                            "parts": [
                                "us_zip_lookups"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map