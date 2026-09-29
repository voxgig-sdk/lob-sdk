"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "address",
        "accessor": "Address",
        "op": "create",
        "method": "POST",
        "path": "/addresses",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "adr_d3489cd64c791ab5",
            "description": "Harry - Office",
            "name": "HARRY ZHANG",
            "company": "LOB",
            "phone": "5555555555",
            "email": "harry@lob.com",
            "address_line1": "210 KING ST STE 6100",
            "address_city": "SAN FRANCISCO",
            "address_state": "CA",
            "address_zip": "94107",
            "address_country": "UNITED STATES",
            "metadata": {},
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "address"
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "list",
        "method": "GET",
        "path": "/addresses",
        "args": [],
        "select": {
            "before/after": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "metadata": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "adr_e68217bd744d65c8",
                    "description": "Harry - Office",
                    "name": "HARRY ZHANG",
                    "company": "LOB",
                    "phone": "5555555555",
                    "email": "harry@lob.com",
                    "address_line1": "210 KING ST STE 6100",
                    "address_line2": null,
                    "address_city": "SAN FRANCISCO",
                    "address_state": "CA",
                    "address_zip": "94107-1741",
                    "address_country": "UNITED STATES",
                    "metadata": {},
                    "date_created": "2019-08-12T00:16:00.361Z",
                    "date_modified": "2019-08-12T00:16:00.361Z",
                    "object": "address"
                },
                {
                    "id": "adr_asdi2y3riuasasoi",
                    "description": "Harry - Office",
                    "name": "Harry Zhang",
                    "company": "Lob",
                    "phone": "5555555555",
                    "email": "harry@lob.com",
                    "metadata": {},
                    "address_line1": "370 WATER ST",
                    "address_line2": "",
                    "address_city": "SUMMERSIDE",
                    "address_state": "PRINCE EDWARD ISLAND",
                    "address_zip": "C1N 1C4",
                    "address_country": "CANADA",
                    "date_created": "2019-09-20T00:14:00.361Z",
                    "date_modified": "2019-09-20T00:14:00.361Z",
                    "object": "address"
                }
            ],
            "object": "list",
            "next_url": "https://api.lob.com/v1/addresses?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wOC0wN1QyMTo1OTo0Ni43NjRaIiwiaWRPZmZzZXQiOiJhZHJfODMwYmYwZWFiZGFhYTQwOSJ9",
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "load",
        "method": "GET",
        "path": "/addresses/{adr_id}",
        "args": [
            {
                "name": "id",
                "wire": "adr_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "date_created": "2019-08-12T00:16:00.361Z",
            "date_modified": "2019-08-12T00:16:00.361Z",
            "deleted": true,
            "object": "address",
            "address_city": "SAN FRANCISCO",
            "address_country": "UNITED STATES",
            "address_line1": "210 KING ST STE 6100",
            "address_line2": null,
            "address_state": "CA",
            "address_zip": "94107-1741",
            "company": "LOB",
            "description": "Harry - Office",
            "email": "harry@lob.com",
            "id": "adr_e68217bd744d65c8",
            "metadata": {},
            "name": "HARRY ZHANG",
            "phone": "5555555555",
            "recipient_moved": false
        },
        "idField": "id"
    },
    {
        "entity": "address",
        "accessor": "Address",
        "op": "remove",
        "method": "DELETE",
        "path": "/addresses/{adr_id}",
        "args": [
            {
                "name": "id",
                "wire": "adr_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "adr_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "bank_account",
        "accessor": "BankAccount",
        "op": "create",
        "method": "POST",
        "path": "/bank_accounts/{bank_id}/verify",
        "action": "verify",
        "args": [
            {
                "name": "id",
                "wire": "bank_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bank_8cad8df5354d33f",
            "signature_url": "https://lob-assets.com/letters/asd_asdfghjklqwertyu.pdf?version=45&expires=1234567890&signature=a",
            "description": "Test Bank Account",
            "metadata": {},
            "routing_number": "322271627",
            "fractional_routing_number": "25-3/440",
            "check_template": "jpm",
            "account_number": "123456789",
            "account_type": "company",
            "signatory": "John Doe",
            "bank_name": "J.P. MORGAN CHASE BANK, N.A.,",
            "bank_city": "Columbus",
            "bank_state": "OH",
            "bank_zip": "43240",
            "verified": true,
            "microdeposit_type": null,
            "date_created": "2015-11-06T19:24:24.440Z",
            "date_modified": "2015-11-06T19:24:24.440Z",
            "object": "bank_account"
        },
        "idField": "id"
    },
    {
        "entity": "bank_account",
        "accessor": "BankAccount",
        "op": "create",
        "method": "POST",
        "path": "/bank_accounts",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bank_8cad8df5354d33f",
            "signature_url": "https://lob-assets.com/letters/asd_asdfghjklqwertyu.pdf?version=45&expires=1234567890&signature=a",
            "description": "Test Bank Account",
            "metadata": {},
            "routing_number": "322271627",
            "fractional_routing_number": "25-3/440",
            "check_template": "jpm",
            "account_number": "123456789",
            "account_type": "company",
            "signatory": "John Doe",
            "bank_name": "J.P. MORGAN CHASE BANK, N.A.,",
            "bank_city": "Columbus",
            "bank_state": "OH",
            "bank_zip": "43240",
            "verified": true,
            "microdeposit_type": null,
            "date_created": "2015-11-06T19:24:24.440Z",
            "date_modified": "2015-11-06T19:24:24.440Z",
            "object": "bank_account"
        },
        "idField": "id"
    },
    {
        "entity": "bank_account",
        "accessor": "BankAccount",
        "op": "list",
        "method": "GET",
        "path": "/bank_accounts",
        "args": [],
        "select": {
            "before/after": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "metadata": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "bank_0e3fb07eba0b35b",
                    "signature_url": "https://lob-assets.com/letters/asd_asdfghjklqwertyu.pdf?version=45&expires=1234567890&signature=a",
                    "description": "Example bank account",
                    "metadata": {},
                    "routing_number": "122100024",
                    "account_number": "1234564789",
                    "account_type": "company",
                    "signatory": "John Doe",
                    "bank_name": "JPMORGAN CHASE BANK, NA",
                    "verified": true,
                    "date_created": "2019-03-30T13:13:22.200Z",
                    "date_modified": "2019-03-30T13:13:23.385Z",
                    "object": "bank_account"
                },
                {
                    "id": "bank_eba93f7de3c02d9",
                    "description": "Example bank account",
                    "metadata": {},
                    "routing_number": "122100024",
                    "account_number": "1234564789",
                    "account_type": "company",
                    "signatory": "John Doe",
                    "bank_name": "JPMORGAN CHASE BANK, NA",
                    "verified": true,
                    "date_created": "2019-03-30T13:11:06.809Z",
                    "date_modified": "2019-03-30T13:11:07.872Z",
                    "object": "bank_account"
                }
            ],
            "object": "list",
            "next_url": "https://api.lob.com/v1/bank_accounts?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wMy0zMFQxMzoxMTowNi44MDlaIiwiaWRPZmZzZXQiOiJiYW5rX2ViYTkzZjdkZTNjMDJkOSJ9",
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "bank_account",
        "accessor": "BankAccount",
        "op": "load",
        "method": "GET",
        "path": "/bank_accounts/{bank_id}",
        "args": [
            {
                "name": "id",
                "wire": "bank_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bank_8cad8df5354d33f",
            "signature_url": "https://lob-assets.com/letters/asd_asdfghjklqwertyu.pdf?version=45&expires=1234567890&signature=a",
            "description": "Test Bank Account",
            "metadata": {},
            "routing_number": "322271627",
            "fractional_routing_number": "25-3/440",
            "check_template": "jpm",
            "account_number": "123456789",
            "account_type": "company",
            "signatory": "John Doe",
            "bank_name": "J.P. MORGAN CHASE BANK, N.A.,",
            "bank_city": "Columbus",
            "bank_state": "OH",
            "bank_zip": "43240",
            "verified": true,
            "microdeposit_type": null,
            "date_created": "2015-11-06T19:24:24.440Z",
            "date_modified": "2015-11-06T19:24:24.440Z",
            "object": "bank_account"
        },
        "idField": "id"
    },
    {
        "entity": "bank_deletion",
        "accessor": "BankDeletion",
        "op": "remove",
        "method": "DELETE",
        "path": "/bank_accounts/{bank_id}",
        "args": [
            {
                "name": "bank_id",
                "wire": "bank_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bank_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "billing_group",
        "accessor": "BillingGroup",
        "op": "create",
        "method": "POST",
        "path": "/billing_groups/{bg_id}",
        "args": [
            {
                "name": "id",
                "wire": "bg_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bg_c94e83ca2cd5121",
            "name": "Marketing Dept",
            "description": "Usage group used for the Marketing Dept resource sends",
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "billing_group"
        },
        "idField": "id"
    },
    {
        "entity": "billing_group",
        "accessor": "BillingGroup",
        "op": "create",
        "method": "POST",
        "path": "/billing_groups",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bg_c94e83ca2cd5121",
            "name": "Marketing Dept",
            "description": "Usage group used for the Marketing Dept resource sends",
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "billing_group"
        },
        "idField": "id"
    },
    {
        "entity": "billing_group",
        "accessor": "BillingGroup",
        "op": "list",
        "method": "GET",
        "path": "/billing_groups",
        "args": [],
        "select": {
            "date_created": "v1",
            "date_modified": "v1",
            "include": "v1",
            "limit": 10,
            "offset": "v1",
            "sort_by": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset",
            "include",
            "date_created",
            "date_modified",
            "sort_by"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "bg_d5a5a89da9106f8",
                    "description": "Test billing_group",
                    "metadata": {},
                    "date_created": "2019-07-27T23:49:01.511Z",
                    "date_modified": "2019-07-27T23:49:01.511Z",
                    "object": "billing_group"
                },
                {
                    "id": "bg_59b2150ae120887",
                    "description": "Test billing_group",
                    "metadata": {},
                    "date_created": "2019-03-29T10:22:34.642Z",
                    "date_modified": "2019-03-29T10:22:34.642Z",
                    "object": "billing_group"
                }
            ],
            "object": "list",
            "next_url": null,
            "prev_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "billing_group",
        "accessor": "BillingGroup",
        "op": "load",
        "method": "GET",
        "path": "/billing_groups/{bg_id}",
        "args": [
            {
                "name": "id",
                "wire": "bg_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bg_c94e83ca2cd5121",
            "name": "Marketing Dept",
            "description": "Usage group used for the Marketing Dept resource sends",
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "billing_group"
        },
        "idField": "id"
    },
    {
        "entity": "booklet",
        "accessor": "Booklet",
        "op": "create",
        "method": "POST",
        "path": "/booklets",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "description": "April Campaign",
            "metadata": {},
            "to": {
                "id": "adr_d3489cd64c791ab5",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "mail_type": "usps_first_class",
            "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "carrier": "USPS",
            "tracking_number": null,
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "size": "8.375x5.375",
            "pages": 8,
            "source_material": "60# Gloss Text",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "booklet"
        },
        "idField": "id"
    },
    {
        "entity": "booklet",
        "accessor": "Booklet",
        "op": "list",
        "method": "GET",
        "path": "/booklets",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "send_date": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "send_date",
            "mail_type",
            "sort_by",
            "campaign_id",
            "status"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "ord_0d6a16a3fff6318ac8f8008dc1",
                    "description": "April Campaign",
                    "metadata": {},
                    "to": {
                        "id": "adr_d3489cd64c791ab5",
                        "description": null,
                        "name": "HARRY ZHANG",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2017-09-05T15:54:53.264Z",
                        "date_modified": "2017-09-05T15:54:53.264Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_b8fb5acf3a2b55db",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2017-09-05T15:54:53.264Z",
                        "date_modified": "2017-09-05T15:54:53.264Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "mail_type": "usps_first_class",
                    "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
                    "carrier": "USPS",
                    "tracking_number": null,
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                            "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                            "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                        }
                    ],
                    "merge_variables": {
                        "name": "Harry"
                    },
                    "size": "8.375x5.375",
                    "pages": 8,
                    "source_material": "60# Gloss Text",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:40:40.504Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "booklet"
                },
                {
                    "id": "ord_851100000f31bb1a872f794cee",
                    "description": "April Campaign",
                    "metadata": {},
                    "to": {
                        "id": "adr_f9228b743884ff98",
                        "description": null,
                        "name": "AYA",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "2812 PARK RD",
                        "address_line2": null,
                        "address_city": "CHARLOTTE",
                        "address_state": "NC",
                        "address_zip": "28209-1314",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2021-03-16T18:40:40.410Z",
                        "date_modified": "2021-03-16T18:40:40.410Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": null,
                        "company": "LOB",
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "mail_type": "usps_first_class",
                    "url": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
                    "carrier": "USPS",
                    "tracking_number": null,
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                            "medium": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                            "large": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                        }
                    ],
                    "merge_variables": {
                        "name": "Harry"
                    },
                    "size": "8.375x5.375",
                    "pages": 8,
                    "source_material": "60# Gloss Text",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:40:40.504Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "booklet"
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "booklet",
        "accessor": "Booklet",
        "op": "load",
        "method": "GET",
        "path": "/booklets/{booklet_id}",
        "args": [
            {
                "name": "id",
                "wire": "booklet_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "description": "April Campaign",
            "metadata": {},
            "to": {
                "id": "adr_d3489cd64c791ab5",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "mail_type": "usps_first_class",
            "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "carrier": "USPS",
            "tracking_number": null,
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "size": "8.375x5.375",
            "pages": 8,
            "source_material": "60# Gloss Text",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "booklet"
        },
        "idField": "id"
    },
    {
        "entity": "booklet",
        "accessor": "Booklet",
        "op": "remove",
        "method": "DELETE",
        "path": "/booklets/{booklet_id}",
        "args": [
            {
                "name": "id",
                "wire": "booklet_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "buckslip",
        "accessor": "Buckslip",
        "op": "create",
        "method": "POST",
        "path": "/buckslips",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bck_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test buckslip",
            "url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "8.75x3.755",
            "auto_reorder": false,
            "reorder_quantity": null,
            "threshold_amount": 0,
            "raw_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 0,
            "allocated_quantity": 0,
            "onhand_quantity": 0,
            "pending_quantity": 0,
            "projected_quantity": 0,
            "buckslip_orders": [],
            "stock": "text",
            "weight": "80#",
            "finish": "gloss",
            "status": "rendered",
            "mode": "test",
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "buckslip"
        },
        "idField": "id"
    },
    {
        "entity": "buckslip",
        "accessor": "Buckslip",
        "op": "list",
        "method": "GET",
        "path": "/buckslips",
        "args": [],
        "select": {
            "before/after": "v1",
            "include": "v1",
            "limit": 10
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "bck_7a6d73c5c8457fc",
                    "account_id": "fa9ea650fc7b31a89f92",
                    "description": null,
                    "url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
                    "size": "8.75x3.75",
                    "has_front": true,
                    "has_back": true,
                    "auto_reorder": false,
                    "reorder_quantity": null,
                    "threshold_amount": 0,
                    "raw_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "front_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "back_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                            "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                            "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                        }
                    ],
                    "available_quantity": 0,
                    "allocated_quantity": 0,
                    "onhand_quantity": 0,
                    "pending_quantity": 0,
                    "projected_quantity": 0,
                    "buckslip_orders": [],
                    "stock": "text",
                    "weight": "80#",
                    "finish": "gloss",
                    "status": "rendered",
                    "mode": "test",
                    "date_created": "2021-03-24T22:51:42.838Z",
                    "date_modified": "2021-03-24T22:51:42.838Z",
                    "send_date": "2021-03-24T22:51:42.838Z",
                    "object": "buckslip"
                }
            ],
            "object": "list",
            "previous_url": null,
            "next_url": null,
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "buckslip",
        "accessor": "Buckslip",
        "op": "load",
        "method": "GET",
        "path": "/buckslips/{buckslip_id}",
        "args": [
            {
                "name": "id",
                "wire": "buckslip_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bck_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test buckslip",
            "url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "8.75x3.755",
            "auto_reorder": false,
            "reorder_quantity": null,
            "threshold_amount": 0,
            "raw_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 0,
            "allocated_quantity": 0,
            "onhand_quantity": 0,
            "pending_quantity": 0,
            "projected_quantity": 0,
            "buckslip_orders": [],
            "stock": "text",
            "weight": "80#",
            "finish": "gloss",
            "status": "rendered",
            "mode": "test",
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "buckslip"
        },
        "idField": "id"
    },
    {
        "entity": "buckslip",
        "accessor": "Buckslip",
        "op": "remove",
        "method": "DELETE",
        "path": "/buckslips/{buckslip_id}",
        "args": [
            {
                "name": "id",
                "wire": "buckslip_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "buckslip_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "buckslip",
        "accessor": "Buckslip",
        "op": "update",
        "method": "PATCH",
        "path": "/buckslips/{buckslip_id}",
        "args": [
            {
                "name": "id",
                "wire": "buckslip_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bck_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test buckslip",
            "url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "8.75x3.755",
            "auto_reorder": false,
            "reorder_quantity": null,
            "threshold_amount": 0,
            "raw_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/buckslips/bck_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 0,
            "allocated_quantity": 0,
            "onhand_quantity": 0,
            "pending_quantity": 0,
            "projected_quantity": 0,
            "buckslip_orders": [],
            "stock": "text",
            "weight": "80#",
            "finish": "gloss",
            "status": "rendered",
            "mode": "test",
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "buckslip"
        },
        "idField": "id"
    },
    {
        "entity": "buckslip_order",
        "accessor": "BuckslipOrder",
        "op": "create",
        "method": "POST",
        "path": "/buckslips/{buckslip_id}/orders",
        "args": [
            {
                "name": "id",
                "wire": "buckslip_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "bo_e0f8a0562a06bea7f",
            "buckslip_id": "bck_6afffd19045076c",
            "status": "available",
            "quantity_ordered": 10000,
            "unit_price": 0.75,
            "cancelled_reason": "No longer needed",
            "availability_date": "2021-10-12T21:41:48.326Z",
            "expected_availability_date": "2021-11-04T21:03:18.871Z",
            "date_created": "2021-10-07T21:03:18.871Z",
            "date_modified": "2021-10-16T01:00:30.144Z",
            "object": "buckslip_order"
        },
        "idField": "id"
    },
    {
        "entity": "buckslip_order",
        "accessor": "BuckslipOrder",
        "op": "list",
        "method": "GET",
        "path": "/buckslips/{buckslip_id}/orders",
        "args": [
            {
                "name": "id",
                "wire": "buckslip_id",
                "value": "p1"
            }
        ],
        "select": {
            "limit": 10,
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "bo_e0f8a0562a06bea7f",
                    "buckslip_id": "bck_6afffd19045076c",
                    "status": "available",
                    "quantity_ordered": 5000,
                    "unit_price": 0.75,
                    "cancelled_reason": "No longer needed",
                    "availability_date": "2021-10-12T21:41:48.326Z",
                    "expected_availability_date": "2021-11-04T21:03:18.871Z",
                    "date_created": "2021-10-07T21:03:18.871Z",
                    "date_modified": "2021-10-16T01:00:30.144Z",
                    "object": "buckslip_order"
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "create",
        "method": "POST",
        "path": "/campaigns/{cmp_id}/send",
        "action": "send",
        "args": [
            {
                "name": "id",
                "wire": "cmp_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "cmp_e05ee61ff80764b",
            "billing_group_id": "bg_fe3079dcdd80e5ae",
            "name": "My Campaign",
            "description": "My Campaign's description",
            "schedule_type": "immediate",
            "cancel_window_campaign_minutes": 60,
            "metadata": {},
            "use_type": "marketing",
            "is_draft": true,
            "deleted": false,
            "creatives": [],
            "uploads": [],
            "auto_cancel_if_ncoa": false,
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "campaign"
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "create",
        "method": "POST",
        "path": "/campaigns",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_lang_output",
                "wire": "x-lang-output",
                "value": "h1"
            }
        ],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "cmp_e05ee61ff80764b",
            "billing_group_id": "bg_fe3079dcdd80e5ae",
            "name": "My Campaign",
            "description": "My Campaign's description",
            "schedule_type": "immediate",
            "cancel_window_campaign_minutes": 60,
            "metadata": {},
            "use_type": "marketing",
            "is_draft": true,
            "deleted": false,
            "creatives": [],
            "uploads": [],
            "auto_cancel_if_ncoa": false,
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "campaign"
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "list",
        "method": "GET",
        "path": "/campaigns",
        "args": [],
        "select": {
            "before/after": "v1",
            "include": "v1",
            "limit": 10
        },
        "headers": [],
        "query": [
            "limit",
            "include",
            "before/after"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "cmp_e05ee61ff80764b",
                    "billing_group_id": "bg_fe3079dcdd80e5ae",
                    "name": "My Campaign",
                    "description": "My Campaign's description",
                    "schedule_type": "immediate",
                    "send_date": null,
                    "target_delivery_date": null,
                    "cancel_window_campaign_minutes": 60,
                    "metadata": {},
                    "use_type": "marketing",
                    "is_draft": true,
                    "deleted": false,
                    "creatives": [],
                    "uploads": [],
                    "auto_cancel_if_ncoa": false,
                    "date_created": "2017-09-05T17:47:53.767Z",
                    "date_modified": "2017-09-05T17:47:53.767Z",
                    "object": "campaign"
                }
            ],
            "object": "list",
            "previous_url": null,
            "next_url": null,
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "load",
        "method": "GET",
        "path": "/campaigns/{cmp_id}",
        "args": [
            {
                "name": "id",
                "wire": "cmp_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "cmp_e05ee61ff80764b",
            "billing_group_id": "bg_fe3079dcdd80e5ae",
            "name": "My Campaign",
            "description": "My Campaign's description",
            "schedule_type": "immediate",
            "cancel_window_campaign_minutes": 60,
            "metadata": {},
            "use_type": "marketing",
            "is_draft": true,
            "deleted": false,
            "creatives": [],
            "uploads": [],
            "auto_cancel_if_ncoa": false,
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "campaign"
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "remove",
        "method": "DELETE",
        "path": "/campaigns/{cmp_id}",
        "args": [
            {
                "name": "id",
                "wire": "cmp_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "cmp_e05ee61ff80764b",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "campaign",
        "accessor": "Campaign",
        "op": "update",
        "method": "PATCH",
        "path": "/campaigns/{cmp_id}",
        "args": [
            {
                "name": "id",
                "wire": "cmp_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "cmp_e05ee61ff80764b",
            "billing_group_id": "bg_fe3079dcdd80e5ae",
            "name": "My Campaign",
            "description": "My Campaign's description",
            "schedule_type": "immediate",
            "cancel_window_campaign_minutes": 60,
            "metadata": {},
            "use_type": "marketing",
            "is_draft": true,
            "deleted": false,
            "creatives": [],
            "uploads": [],
            "auto_cancel_if_ncoa": false,
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "campaign"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "create",
        "method": "POST",
        "path": "/cards/{card_id}",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test card",
            "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "2.125x3.375",
            "auto_reorder": false,
            "reorder_quantity": null,
            "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 10000,
            "pending_quantity": 0,
            "countries": null,
            "status": "rendered",
            "mode": "test",
            "orientation": "horizontal",
            "threshold_amount": 0,
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "card"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "create",
        "method": "POST",
        "path": "/cards",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test card",
            "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "2.125x3.375",
            "auto_reorder": false,
            "reorder_quantity": null,
            "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 10000,
            "pending_quantity": 0,
            "countries": null,
            "status": "rendered",
            "mode": "test",
            "orientation": "horizontal",
            "threshold_amount": 0,
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "card"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "list",
        "method": "GET",
        "path": "/cards",
        "args": [],
        "select": {
            "before/after": "v1",
            "include": "v1",
            "limit": 10
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "card_7a6d73c5c8457fc",
                    "account_id": "fa9ea650fc7b31a89f92",
                    "description": null,
                    "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
                    "size": "2.125x3.375",
                    "auto_reorder": false,
                    "reorder_quantity": null,
                    "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                            "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                            "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                        }
                    ],
                    "available_quantity": 10000,
                    "pending_quantity": 0,
                    "countries": null,
                    "status": "rendered",
                    "mode": "test",
                    "orientation": "horizontal",
                    "threshold_amount": 0,
                    "date_created": "2021-03-24T22:51:42.838Z",
                    "date_modified": "2021-03-24T22:51:42.838Z",
                    "send_date": "2021-03-24T22:51:42.838Z",
                    "object": "card"
                }
            ],
            "object": "list",
            "previous_url": null,
            "next_url": null,
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "load",
        "method": "GET",
        "path": "/cards/{card_id}",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_7a6d73c5c8457fc",
            "account_id": "fa9ea650fc7b31a89f92",
            "description": "Test card",
            "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
            "size": "2.125x3.375",
            "auto_reorder": false,
            "reorder_quantity": null,
            "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                },
                {
                    "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                    "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                    "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                }
            ],
            "available_quantity": 10000,
            "pending_quantity": 0,
            "countries": null,
            "status": "rendered",
            "mode": "test",
            "orientation": "horizontal",
            "threshold_amount": 0,
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "object": "card"
        },
        "idField": "id"
    },
    {
        "entity": "card",
        "accessor": "Card",
        "op": "remove",
        "method": "DELETE",
        "path": "/cards/{card_id}",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "card_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "create",
        "method": "POST",
        "path": "/cards/{card_id}/orders",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "co_e0f8a0562a06bea7f",
            "card_id": "card_6afffd19045076c",
            "status": "available",
            "inventory": 9500,
            "quantity_ordered": 10000,
            "unit_price": 0.75,
            "cancelled_reason": "No longer needed",
            "availability_date": "2021-10-12T21:41:48.326Z",
            "expected_availability_date": "2021-11-04T21:03:18.871Z",
            "date_created": "2021-10-07T21:03:18.871Z",
            "date_modified": "2021-10-16T01:00:30.144Z",
            "object": "card_order"
        },
        "idField": "id"
    },
    {
        "entity": "card_order",
        "accessor": "CardOrder",
        "op": "list",
        "method": "GET",
        "path": "/cards/{card_id}/orders",
        "args": [
            {
                "name": "id",
                "wire": "card_id",
                "value": "p1"
            }
        ],
        "select": {
            "limit": 10,
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "co_e0f8a0562a06bea7f",
                    "card_id": "card_6afffd19045076c",
                    "status": "available",
                    "inventory": 9500,
                    "quantity_ordered": 10000,
                    "unit_price": 0.75,
                    "cancelled_reason": "No longer needed",
                    "availability_date": "2021-10-12T21:41:48.326Z",
                    "expected_availability_date": "2021-11-04T21:03:18.871Z",
                    "date_created": "2021-10-07T21:03:18.871Z",
                    "date_modified": "2021-10-16T01:00:30.144Z",
                    "object": "card_order"
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "check",
        "accessor": "Check",
        "op": "create",
        "method": "POST",
        "path": "/checks",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "chk_534f10783683daa0",
            "description": "Demo Check",
            "metadata": {},
            "check_number": 10062,
            "memo": "rent",
            "amount": 22.5,
            "url": "https://lob-assets.com/checks/chk_534f10783683daa0.pdf?expires=1540372221&signature=Ty3IV2bGPEoQfrdraYHlNYTaarnHLXb",
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": "Harry - Office",
                "name": "HARRY ZHANG",
                "company": "LOB",
                "email": "harry@lob.com",
                "phone": "5555555555",
                "address_line1": "210 KING ST STE 6100",
                "address_line2": "",
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2018-12-08T03:08:43.446Z",
                "date_modified": "2018-12-08T03:08:43.446Z",
                "object": "address",
                "recipient_moved": false
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "name": "LEORE AVIDAR",
                "address_line1": "210 KING ST STE 6100",
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "object": "address"
            },
            "bank_account": {
                "id": "bank_8cad8df5354d33f",
                "description": "Test Bank Account",
                "metadata": {},
                "routing_number": "322271627",
                "account_number": "123456789",
                "signatory": "John Doe",
                "bank_name": "J.P. MORGAN CHASE BANK, N.A.",
                "verified": true,
                "account_type": "company",
                "date_created": "2015-11-06T19:24:24.440Z",
                "date_modified": "2015-11-06T19:41:28.312Z",
                "object": "bank_account",
                "signature_url": "https://lob-assets.com/bank-accounts/asd_asdfghjkqwertyui.pdf?expires=1234567890&signature=aksdf"
            },
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_small_1.png?expires=1540372221&signature=ShhPpH74wYkNiAj7Il9B6q8ZKkzlGd4",
                    "medium": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_medium_1.png?expires=1540372221&signature=tmIOq6aAyKgzAECp7STj1rvJuMS5Svd",
                    "large": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_large_1.png?expires=1540372221&signature=04nLEwE9d2qgQJNgJYWSOgPnU0FZbEv"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "expected_delivery_date": "2017-09-12",
            "mail_type": "usps_first_class",
            "date_created": "2017-09-05T17:47:53.896Z",
            "date_modified": "2017-09-05T17:47:53.896Z",
            "send_date": "2017-09-05T17:47:53.896Z",
            "object": "check",
            "message": "pancakes are good",
            "check_bottom_template_id": "tmpl_a",
            "attachment_template_id": "tmpl_a",
            "check_bottom_template_version_id": "vrsn_a",
            "attachment_template_version_id": "vrsn_a",
            "use_type": "operational",
            "sla": "2",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "check",
        "accessor": "Check",
        "op": "list",
        "method": "GET",
        "path": "/checks",
        "args": [],
        "select": {
            "before/after": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "scheduled": "v1",
            "send_date": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "scheduled",
            "send_date",
            "mail_type",
            "sort_by",
            "status"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "chk_0176bf6197100185",
                    "description": "Demo Check",
                    "metadata": {},
                    "check_number": 12559,
                    "memo": "rent",
                    "amount": 22.5,
                    "url": "https://lob-assets.com/checks/chk_0176bf6197100185.pdf?version=v1&expires=1568239682&signature=aqKV5lmg_ktxzyl-qEwIf8-7DbvcguLO0LrfFcyMrUDDt6hxX_da0MEEpElxKR876VUaZrpHq_i_ayDWrsK3BA",
                    "to": {
                        "id": "adr_bae820679f3f536b",
                        "description": "Harry - Office",
                        "name": "HARRY ZHANG",
                        "company": "LOB",
                        "email": "harry@lob.com",
                        "phone": "5555555555",
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": "",
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:08:43.446Z",
                        "date_modified": "2018-12-08T03:08:43.446Z",
                        "object": "address",
                        "recipient_moved": false
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "name": "LEORE AVIDAR",
                        "address_line1": "210 KING ST STE 6100",
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "bank_account": {
                        "id": "bank_8cad8df5354d33f",
                        "description": "Test Bank Account",
                        "metadata": {},
                        "routing_number": "322271627",
                        "account_number": "123456789",
                        "account_type": "individual",
                        "signatory": "John Doe",
                        "bank_name": "J.P. MORGAN CHASE BANK, N.A.",
                        "verified": true,
                        "date_created": "2015-11-06T19:24:24.440Z",
                        "date_modified": "2015-11-06T19:41:28.312Z",
                        "object": "bank_account",
                        "signature_url": "https://lob-assets.com/bank-accounts/asd_asdfghjkqwertyui.pdf?expires=1234567890&signature=aksdf"
                    },
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_small_1.png?version=v1&expires=1568239682&signature=T8DfMm_mxJJzIPgm8I0lvYY4Z6I8aFjsGsrEAicEqw8Ei_FaOtiGQKGeY16rdugAt8lmS_iX0lveBoG2RgWDDw",
                            "medium": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_medium_1.png?version=v1&expires=1568239682&signature=-iJD7C58xOCD8eQ01StqSlw9WbDymL0Ygze9twfTs9s17zQppr2Zx363_Z4bP3ATHNhF3osjHuAxIasI2Wf6DQ",
                            "large": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_large_1.png?version=v1&expires=1568239682&signature=VJlOkVDPKZThstdd632r3Grm2WhoyPkC-pffpcePTw1i1NkpAObDSRaItKMOQgeWkAcUud3SH0tYcVOadaNiCw"
                        },
                        {
                            "small": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_small_2.png?version=v1&expires=1568239682&signature=XpCkOjy2zIKXkuc0s-UAYGNwpD_pgt7c9FKTDUCYbyqXupAg1MV1l2tdqevr0L0LT5FJqrGZH9khD5QRMQTkAA",
                            "medium": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_medium_2.png?version=v1&expires=1568239682&signature=sdgnJMzusEfndu7dNmk37eKc0AV7Hmqev6TQAqkCESs5pg7j6dDTsp7v4pnDvhsj8d7SIMcahl1aGiysoom0CA",
                            "large": "https://lob-assets.com/checks/chk_0176bf6197100185_thumb_large_2.png?version=v1&expires=1568239682&signature=ybe8ovBh8Gf-AWKGRs4CB4XkU-erPVbY66umXARhTiJG2Dg1QlyCb9WmBXWt0tBCwD5NGMl20mHeAgHwecLxBA"
                        }
                    ],
                    "expected_delivery_date": "2019-08-16",
                    "mail_type": "usps_first_class",
                    "date_created": "2019-08-08T19:34:47.571Z",
                    "date_modified": "2019-08-08T19:34:49.612Z",
                    "send_date": "2019-08-08",
                    "message": "pancakes are good",
                    "object": "check",
                    "check_bottom_template_id": "tmpl_a",
                    "attachment_template_id": "tmpl_a",
                    "check_bottom_template_version_id": "vrsn_a",
                    "attachment_template_version_id": "vrsn_a",
                    "merge_variables": {},
                    "use_type": "operational",
                    "deleted": true
                },
                {
                    "id": "chk_92b9a6714bc0557c",
                    "description": "Demo Check",
                    "metadata": {},
                    "check_number": 12558,
                    "memo": "rent",
                    "amount": 22.5,
                    "url": "https://lob-assets.com/checks/chk_92b9a6714bc0557c.pdf?version=v1&expires=1568239682&signature=jCct5PvzU58Iz2pSo58nf6rgsMRcJfMbUWThmm6lztFl5Vn2Y204b9h7gvw0vJvkDK2ThfaYqaUbWc0KzTpvAg",
                    "to": {
                        "id": "adr_bae820679f3f536b",
                        "name": "HARRY ZHANG",
                        "address_line1": "210 KING ST STE 6100",
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:08:43.446Z",
                        "date_modified": "2018-12-08T03:08:43.446Z",
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "name": "LEORE AVIDAR",
                        "address_line1": "210 KING ST STE 6100",
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "bank_account": {
                        "id": "bank_8cad8df5354d33f",
                        "description": "Test Bank Account",
                        "metadata": {},
                        "routing_number": "322271627",
                        "account_number": "123456789",
                        "account_type": "individual",
                        "signatory": "John Doe",
                        "bank_name": "J.P. MORGAN CHASE BANK, N.A.",
                        "verified": true,
                        "date_created": "2015-11-06T19:24:24.440Z",
                        "date_modified": "2015-11-06T19:41:28.312Z",
                        "object": "bank_account"
                    },
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_small_1.png?version=v1&expires=1568239682&signature=ublquO_xAdvAkAwGJuOjgZQwcz7c3Ao4NHWHeDVTBEBjcrQr8LavxWEwUc1KU105Zex3SajRQLd6hqJOrDl0Bw",
                            "medium": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_medium_1.png?version=v1&expires=1568239682&signature=vHyuOtsanX4HnY_0LNft6ZJ8C67JnbI8ZVCjA2d9nR0Rd6lCl0Nk1s6BAhefbBkzecX9Yp0B8NWN9Q5v1Z4ICw",
                            "large": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_large_1.png?version=v1&expires=1568239682&signature=SzCLKJ5m_TKJPLlL9PMw-zW9wo5mVYEK1jCtHwWRwwEaNU2v4Aehy-YHtus3TFJIt8RD2M-0Y3MtCxHwhqSABg"
                        },
                        {
                            "small": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_small_2.png?version=v1&expires=1568239682&signature=iElagODaOCkF_lCUxIw-lK50GhEU1ar_odmslCazZqD4Fsd_rQLx3M4Q5HzYWp4evfzuCoFvk4oAQVuIAaguAw",
                            "medium": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_medium_2.png?version=v1&expires=1568239682&signature=2vwvm_QsfmdtkAa-_F4uk-0yeUPRascyhfwOr-OX1ya9i_8gdFQAxMTrP-FfNBVSYFXeknFm6IUPJHggfgeiBg",
                            "large": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_large_2.png?version=v1&expires=1568239682&signature=NQf7tP9F4rP66S16hQ8duFpZSbTjaGBGK61Sr3H5D4CWtRyaPdoQlIpT2Jw-eKRcuYRkDEtQse_oWtL5gPqXDQ"
                        },
                        {
                            "small": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_small_3.png?version=v1&expires=1568239682&signature=dbjFd44H9TyZsc3d0fqKon5e0GqZ6GA1dT26MH6WnoX8lrQor2CA6sZJ5qmu0Z4SAFlMKAzb-twqN7faLjEbDQ",
                            "medium": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_medium_3.png?version=v1&expires=1568239682&signature=vSgwVs7T9E6KKBK7XU-6jRL9i0jvgTqvNxkdRARFf0UNlryJFm8l_t_x5mPH0sCTFZcLp7ouRaR5hhdHC6vZBQ",
                            "large": "https://lob-assets.com/checks/chk_92b9a6714bc0557c_thumb_large_3.png?version=v1&expires=1568239682&signature=If4tXlN13WYy7JDPpFkWw0HAQpYNJHqi2UstiPHxUA_8IAj6vXORb-22acI124Pd1bR1QSjBHAW1gbiJ0kjiAQ"
                        }
                    ],
                    "merge_variables": null,
                    "expected_delivery_date": "2019-08-16",
                    "mail_type": "usps_first_class",
                    "date_created": "2019-08-08T19:34:27.802Z",
                    "date_modified": "2019-08-08T19:34:30.582Z",
                    "send_date": "2019-08-08T19:34:27.802Z",
                    "use_type": "operational",
                    "object": "check"
                }
            ],
            "object": "list",
            "next_url": "https://api.lob.com/v1/checks?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wOC0wOFQxOTozNDoyNy44MDJaIiwiaWRPZmZzZXQiOiJjaGtfOTJiOWE2NzE0YmMwNTU3YyJ9",
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "check",
        "accessor": "Check",
        "op": "load",
        "method": "GET",
        "path": "/checks/{chk_id}",
        "args": [
            {
                "name": "id",
                "wire": "chk_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "chk_534f10783683daa0",
            "description": "Demo Check",
            "metadata": {},
            "check_number": 10062,
            "memo": "rent",
            "amount": 22.5,
            "url": "https://lob-assets.com/checks/chk_534f10783683daa0.pdf?expires=1540372221&signature=Ty3IV2bGPEoQfrdraYHlNYTaarnHLXb",
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": "Harry - Office",
                "name": "HARRY ZHANG",
                "company": "LOB",
                "email": "harry@lob.com",
                "phone": "5555555555",
                "address_line1": "210 KING ST STE 6100",
                "address_line2": "",
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2018-12-08T03:08:43.446Z",
                "date_modified": "2018-12-08T03:08:43.446Z",
                "object": "address",
                "recipient_moved": false
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "name": "LEORE AVIDAR",
                "address_line1": "210 KING ST STE 6100",
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "object": "address"
            },
            "bank_account": {
                "id": "bank_8cad8df5354d33f",
                "description": "Test Bank Account",
                "metadata": {},
                "routing_number": "322271627",
                "account_number": "123456789",
                "signatory": "John Doe",
                "bank_name": "J.P. MORGAN CHASE BANK, N.A.",
                "verified": true,
                "account_type": "company",
                "date_created": "2015-11-06T19:24:24.440Z",
                "date_modified": "2015-11-06T19:41:28.312Z",
                "object": "bank_account",
                "signature_url": "https://lob-assets.com/bank-accounts/asd_asdfghjkqwertyui.pdf?expires=1234567890&signature=aksdf"
            },
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_small_1.png?expires=1540372221&signature=ShhPpH74wYkNiAj7Il9B6q8ZKkzlGd4",
                    "medium": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_medium_1.png?expires=1540372221&signature=tmIOq6aAyKgzAECp7STj1rvJuMS5Svd",
                    "large": "https://lob-assets.com/checks/chk_534f10783683daa0_thumb_large_1.png?expires=1540372221&signature=04nLEwE9d2qgQJNgJYWSOgPnU0FZbEv"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "expected_delivery_date": "2017-09-12",
            "mail_type": "usps_first_class",
            "date_created": "2017-09-05T17:47:53.896Z",
            "date_modified": "2017-09-05T17:47:53.896Z",
            "send_date": "2017-09-05T17:47:53.896Z",
            "object": "check",
            "message": "pancakes are good",
            "check_bottom_template_id": "tmpl_a",
            "attachment_template_id": "tmpl_a",
            "check_bottom_template_version_id": "vrsn_a",
            "attachment_template_version_id": "vrsn_a",
            "use_type": "operational",
            "sla": "2",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "check",
        "accessor": "Check",
        "op": "remove",
        "method": "DELETE",
        "path": "/checks/{chk_id}",
        "args": [
            {
                "name": "id",
                "wire": "chk_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "chk_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "creative",
        "accessor": "Creative",
        "op": "create",
        "method": "POST",
        "path": "/creatives",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_lang_output",
                "wire": "x-lang-output",
                "value": "h1"
            }
        ],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "crv_2a3b096c409b32c",
            "description": "Our 4x6 postcard creative",
            "from": "adr_210a8d4b0b76d77b",
            "resource_type": "postcard",
            "details": {},
            "metadata": {},
            "template_preview_urls": {},
            "template_previews": [],
            "campaigns": [],
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "creative"
        },
        "idField": "id"
    },
    {
        "entity": "creative",
        "accessor": "Creative",
        "op": "load",
        "method": "GET",
        "path": "/creatives/{crv_id}",
        "args": [
            {
                "name": "id",
                "wire": "crv_id",
                "value": "crv_2a3b096c409b32c"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "crv_2a3b096c409b32c",
            "description": "Our 4x6 postcard creative",
            "from": "adr_210a8d4b0b76d77b",
            "resource_type": "postcard",
            "details": {},
            "metadata": {},
            "template_preview_urls": {},
            "template_previews": [],
            "campaigns": [],
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "creative"
        },
        "idField": "id"
    },
    {
        "entity": "creative",
        "accessor": "Creative",
        "op": "update",
        "method": "PATCH",
        "path": "/creatives/{crv_id}",
        "args": [
            {
                "name": "id",
                "wire": "crv_id",
                "value": "crv_2a3b096c409b32c"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "crv_2a3b096c409b32c",
            "description": "Our 4x6 postcard creative",
            "from": "adr_210a8d4b0b76d77b",
            "resource_type": "postcard",
            "details": {},
            "metadata": {},
            "template_preview_urls": {},
            "template_previews": [],
            "campaigns": [],
            "date_created": "2017-09-05T17:47:53.767Z",
            "date_modified": "2017-09-05T17:47:53.767Z",
            "object": "creative"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "create",
        "method": "POST",
        "path": "/domains",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "domain": "x",
            "error_redirect_link": "x",
            "status": "configured",
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/domains",
        "args": [],
        "select": {
            "before/after": "v1",
            "limit": 10,
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "status"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "object": "x",
            "next_url": "x",
            "previous_url": "x",
            "count": 1,
            "total_count": 1,
            "data": [
                {
                    "created_at": "x",
                    "domain": "x",
                    "error_redirect_link": "x",
                    "id": "x",
                    "status": "configured",
                    "updated_at": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "load",
        "method": "GET",
        "path": "/domains/{domain_id}",
        "args": [
            {
                "name": "id",
                "wire": "domain_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "domain": "x",
            "error_redirect_link": "x",
            "status": "configured",
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "remove",
        "method": "DELETE",
        "path": "/domains/{domain_id}",
        "args": [
            {
                "name": "id",
                "wire": "domain_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "identity_validation",
        "accessor": "IdentityValidation",
        "op": "create",
        "method": "POST",
        "path": "/identity_validation",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "id_validation_8a013f3e",
            "recipient": "LARRY LOBSTER",
            "primary_line": "210 KING ST.",
            "secondary_line": "",
            "urbanization": "",
            "last_line": "SAN FRANCISCO CA 94107-1728",
            "score": 100,
            "confidence": "high",
            "object": "id_validation"
        },
        "idField": "id"
    },
    {
        "entity": "intl_verification",
        "accessor": "IntlVerification",
        "op": "create",
        "method": "POST",
        "path": "/intl_verifications",
        "args": [],
        "select": {},
        "headers": [
            {
                "name": "x_lang_output",
                "wire": "x-lang-output",
                "value": "h1"
            }
        ],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "intl_ver_c7cb63d68f8d6",
            "recipient": null,
            "primary_line": "370 WATER ST",
            "secondary_line": "",
            "last_line": "SUMMERSIDE PE C1N 1C4",
            "country": "CA",
            "coverage": "SUBBUILDING",
            "deliverability": "deliverable",
            "status": "LV4",
            "components": {
                "primary_number": "370",
                "street_name": "WATER ST",
                "city": "SUMMERSIDE",
                "state": "PE",
                "postal_code": "C1N 1C4"
            },
            "object": "intl_verification"
        },
        "idField": "id"
    },
    {
        "entity": "intl_verification",
        "accessor": "IntlVerification",
        "op": "create",
        "method": "POST",
        "path": "/bulk/intl_verifications",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "addresses": [
                {
                    "id": "intl_ver_c7cb63d68f8d6",
                    "recipient": null,
                    "primary_line": "370 WATER ST",
                    "secondary_line": "",
                    "last_line": "SUMMERSIDE PE C1N 1C4",
                    "country": "CA",
                    "coverage": "SUBBUILDING",
                    "deliverability": "deliverable",
                    "status": "LV4",
                    "components": {
                        "primary_number": "370",
                        "street_name": "WATER ST",
                        "city": "SUMMERSIDE",
                        "state": "PE",
                        "postal_code": "C1N 1C4"
                    },
                    "object": "intl_verification"
                }
            ],
            "errors": false
        },
        "idField": "id"
    },
    {
        "entity": "letter",
        "accessor": "Letter",
        "op": "create",
        "method": "POST",
        "path": "/letters",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            },
            {
                "name": "lob_version",
                "wire": "Lob-Version",
                "value": "2024-01-01"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ltr_4868c3b754655f90",
            "description": "Demo Letter",
            "metadata": {},
            "to": {
                "id": "adr_d3489cd64c791ab5",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "color": true,
            "double_sided": true,
            "address_placement": "top_first_page",
            "return_envelope": false,
            "perforated_page": null,
            "custom_envelope": null,
            "extra_service": null,
            "mail_type": "usps_first_class",
            "url": "https://lob-assets.com/letters/ltr_4868c3b754655f90.pdf?expires=1540372221&signature=8r94fse8uam7wGWmW5baxXulU88X2CA",
            "carrier": "USPS",
            "tracking_number": null,
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_small_1.png?expires=1540372221&signature=a5fRBJ22ZA78Vgpg34M9UfmHWTS3eha",
                    "medium": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_medium_1.png?expires=1540372221&signature=bAzL8sv935PY09FWSkpDpWKkyvGSWYF",
                    "large": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_large_1.png?expires=1540372221&signature=gsKvxXgrm4v4iZD3bOibK7jApNkEMdW"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "expected_delivery_date": "2017-09-12",
            "date_created": "2017-09-05T15:54:53.346Z",
            "date_modified": "2017-09-05T15:54:53.346Z",
            "send_date": "2017-09-05T15:54:53.346Z",
            "cards": [
                {
                    "id": "card_c51ae96f5cebf3e",
                    "account_id": "fa9ea650fc7b31a89f92",
                    "description": null,
                    "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
                    "size": "2.125x3.375",
                    "auto_reorder": false,
                    "reorder_quantity": null,
                    "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                            "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                            "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                        },
                        {
                            "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                            "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                            "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                        }
                    ],
                    "available_quantity": 10000,
                    "pending_quantity": 0,
                    "countries": null,
                    "status": "rendered",
                    "mode": "test",
                    "orientation": "horizontal",
                    "threshold_amount": 0,
                    "date_created": "2017-08-05T15:54:53.346Z",
                    "date_modified": "2017-08-05T15:54:53.346Z",
                    "object": "card"
                }
            ],
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "letter"
        },
        "idField": "id"
    },
    {
        "entity": "letter",
        "accessor": "Letter",
        "op": "list",
        "method": "GET",
        "path": "/letters",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "color": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "scheduled": "v1",
            "send_date": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "campaign_id",
            "status",
            "color",
            "scheduled",
            "send_date",
            "mail_type",
            "sort_by"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "ltr_5ba44b462c79f07c",
                    "description": "Demo Letter",
                    "metadata": {},
                    "to": {
                        "id": "adr_asdi2y3riuasasoi",
                        "description": "Harry - Office",
                        "name": "Harry Zhang",
                        "company": "Lob",
                        "phone": "5555555555",
                        "email": "harry@lob.com",
                        "metadata": {},
                        "address_line1": "370 WATER ST",
                        "address_line2": "",
                        "address_city": "SUMMERSIDE",
                        "address_state": "PRINCE EDWARD ISLAND",
                        "address_zip": "C1N 1C4",
                        "address_country": "CANADA",
                        "recipient_moved": false,
                        "date_created": "2019-09-20T00:14:00.361Z",
                        "date_modified": "2019-09-20T00:14:00.361Z",
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "color": true,
                    "double_sided": false,
                    "address_placement": "top_first_page",
                    "return_envelope": false,
                    "perforated_page": null,
                    "extra_service": "certified",
                    "custom_envelope": null,
                    "template_id": "tmpl_a",
                    "template_version_id": "vrsn_a",
                    "mail_type": "usps_first_class",
                    "url": "https://lob-assets.com/letters/ltr_5ba44b462c79f07c.pdf?version=v1&expires=1568239830&signature=Ob-DUPLJLM4scWQeCDNadPJ4j33MZw16pykOxwv2us-bA7utTYi6oZ8WrEtBYDBBo09XkapR3gdJf0NEr90xAA",
                    "merge_variables": null,
                    "carrier": "USPS",
                    "tracking_number": "92071902358909000011275538",
                    "tracking_events": [
                        {
                            "id": "evnt_9e84094c9368cfb",
                            "type": "certified",
                            "name": "Delivered",
                            "details": {
                                "event": "delivered",
                                "description": "Package has been delivered.",
                                "notes": "Delivered, Front Desk/Reception/Mail Room",
                                "action_required": false
                            },
                            "location": "33408",
                            "time": "2019-10-08T19:41:00Z",
                            "date_created": "2019-10-08T19:41:00Z",
                            "date_modified": "2019-10-08T19:41:00Z",
                            "object": "tracking_event"
                        }
                    ],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/letters/ltr_5ba44b462c79f07c_thumb_small_1.png?version=v1&expires=1568239830&signature=xZUmE8rq8wSECHPEb9c37cUDZBzGUO3XK5LsIPZhI6dOXgm6zJEn8_7tKuZ3JWBmvNJNXdTl_ufkNu4avjQUDw",
                            "medium": "https://lob-assets.com/letters/ltr_5ba44b462c79f07c_thumb_medium_1.png?version=v1&expires=1568239830&signature=H7354Qpcm9S4aXbrMsBe6QJ6lSNi9IWPgMJtLWLi4Kyx9tHF8Mp9YEc_IL9x89Jfw4-yRzKDXA410X4W0PssBQ",
                            "large": "https://lob-assets.com/letters/ltr_5ba44b462c79f07c_thumb_large_1.png?version=v1&expires=1568239830&signature=54LUIDKZyItA9pnC87d1pJVAuw8bhKLCsMpNWkB3LgdVWxPxxb_c1IyIWAbSR-dyOYEOlDBCc40J4Kns-O_mAg"
                        }
                    ],
                    "expected_delivery_date": "2019-08-16",
                    "date_created": "2019-08-08T17:09:14.514Z",
                    "date_modified": "2019-08-08T17:09:16.850Z",
                    "send_date": "2019-08-08",
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "letter"
                },
                {
                    "id": "ltr_da8267c6a6545cd6",
                    "description": "Demo Letter",
                    "metadata": {},
                    "to": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "color": true,
                    "double_sided": false,
                    "address_placement": "top_first_page",
                    "return_envelope": false,
                    "perforated_page": null,
                    "extra_service": null,
                    "custom_envelope": null,
                    "mail_type": "usps_first_class",
                    "url": "https://lob-assets.com/letters/ltr_da8267c6a6545cd6.pdf?version=v1&expires=1568239830&signature=HH-5RnbD4x0eJcnEC9HhqKSvQGsbkjovzvqSKgBijUHKIXwEKQJ4CbYhKs_U2q2A1k20Xefcaw7bfdPKozuqCQ",
                    "merge_variables": null,
                    "carrier": "USPS",
                    "tracking_number": null,
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/letters/ltr_da8267c6a6545cd6_thumb_small_1.png?version=v1&expires=1568239830&signature=C1Rs83187HpWGhsg_pJIOhDIKlDtC_IgBBxHiocCEzJ8CncJwqrq5yHke-p97Dv7o81G_pfhFmirai589O6DCw",
                            "medium": "https://lob-assets.com/letters/ltr_da8267c6a6545cd6_thumb_medium_1.png?version=v1&expires=1568239830&signature=gz63l0yi3sK_sXjYfIVdLSvkknJFr_O5TWRulo_iKIgS-PosIl6J0tDR6bx_Tv5Ab_w7DABg3qdKZ846MZ7TCw",
                            "large": "https://lob-assets.com/letters/ltr_da8267c6a6545cd6_thumb_large_1.png?version=v1&expires=1568239830&signature=4Y1OIymaWkSO3aBIHCeshFAVnF-pDcF2FFqkx_jovaUFuk4FT1SI24L7_POwTRXQHlETMGlzkP_CGgqselRUAA"
                        }
                    ],
                    "expected_delivery_date": "2019-08-16",
                    "date_created": "2019-08-08T17:08:12.224Z",
                    "date_modified": "2019-08-08T17:08:13.990Z",
                    "send_date": "2019-08-08T17:08:12.224Z",
                    "cards": null,
                    "use_type": "marketing",
                    "fsc": true,
                    "object": "letter"
                }
            ],
            "object": "list",
            "next_url": "https://api.lob.com/v1/letters?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wOC0wOFQxNzowODoxMi4yMjRaIiwiaWRPZmZzZXQiOiJsdHJfZGE4MjY3YzZhNjU0NWNkNiJ9",
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "letter",
        "accessor": "Letter",
        "op": "load",
        "method": "GET",
        "path": "/letters/{ltr_id}",
        "args": [
            {
                "name": "id",
                "wire": "ltr_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ltr_4868c3b754655f90",
            "description": "Demo Letter",
            "metadata": {},
            "to": {
                "id": "adr_d3489cd64c791ab5",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_b8fb5acf3a2b55db",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T15:54:53.264Z",
                "date_modified": "2017-09-05T15:54:53.264Z",
                "deleted": true,
                "object": "address"
            },
            "color": true,
            "double_sided": true,
            "address_placement": "top_first_page",
            "return_envelope": false,
            "perforated_page": null,
            "custom_envelope": null,
            "extra_service": null,
            "mail_type": "usps_first_class",
            "url": "https://lob-assets.com/letters/ltr_4868c3b754655f90.pdf?expires=1540372221&signature=8r94fse8uam7wGWmW5baxXulU88X2CA",
            "carrier": "USPS",
            "tracking_number": null,
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_small_1.png?expires=1540372221&signature=a5fRBJ22ZA78Vgpg34M9UfmHWTS3eha",
                    "medium": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_medium_1.png?expires=1540372221&signature=bAzL8sv935PY09FWSkpDpWKkyvGSWYF",
                    "large": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_large_1.png?expires=1540372221&signature=gsKvxXgrm4v4iZD3bOibK7jApNkEMdW"
                }
            ],
            "merge_variables": {
                "name": "Harry"
            },
            "expected_delivery_date": "2017-09-12",
            "date_created": "2017-09-05T15:54:53.346Z",
            "date_modified": "2017-09-05T15:54:53.346Z",
            "send_date": "2017-09-05T15:54:53.346Z",
            "cards": [
                {
                    "id": "card_c51ae96f5cebf3e",
                    "account_id": "fa9ea650fc7b31a89f92",
                    "description": null,
                    "url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e.pdf?version=v1&expires=1636910992&signature=mnsDH2DAxdkN9VibdlLMxJC86sME5WYDqkNtmvGwdNsAaUWfbnv0rJhJ1mR8Ol4uxQq61j5wYZ0r3s-lBkQfDA",
                    "size": "2.125x3.375",
                    "auto_reorder": false,
                    "reorder_quantity": null,
                    "raw_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "front_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "back_original_url": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_raw.pdf?version=v1&expires=1636910992&signature=-bZo31FMAp2vmNaZKyXn_Qa4APqwtNinw76FrQ7uyQejFZw6VBQQYfoiQ642iXh0H2K5i2aOo8_BAkt3UJdVDw",
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_1.png?version=v1&expires=1636910992&signature=mrv8JDvpZK4I8WUGH0tPdtK-My5oes0Ltj_gL7BDw96SpCTTeZFHkz81SzclyFP9dQRtlsvAsjcuGcTBvCvOCg",
                            "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_1.png?version=v1&expires=1636910992&signature=VgL_2Ckm_kxKiWGgWtdNoy9HHOn8dGYSVOn7UqyCbwdbVlUtx28TRN4Bo8Iru3n0keKp9He0YhKT1ILotznMDA",
                            "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_1.png?version=v1&expires=1636910992&signature=FKSzymA13j-CQ0uk20cGHZTzT3vimzNBYrgp-xifLFg4mMdo1BZALR5O0aF_jVhsX614hKP35ONdYl47TQxXAw"
                        },
                        {
                            "small": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_small_2.png?version=v1&expires=1636910992&signature=IWsmPa_ULlv2yyqjX564d_YfHHY_M7i9YxDnw-WXDr2jtOFcArmRZQbnHeE9g_rYxnddJbgosuv8-c2utiu7Cg",
                            "medium": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_medium_2.png?version=v1&expires=1636910992&signature=zxK7VKGiTvz5Ywrkaydd0v3GcYf58R7A08J4tNfI7-aiNODDcTF3l0MqY13n9Pyc8RXSdD0XVBY-OpbA1VM-Ag",
                            "large": "https://lob-assets.com/cards/card_c51ae96f5cebf3e_thumb_large_2.png?version=v1&expires=1636910992&signature=r0OFUhh315ZwN0raMZdIwJd2oCIEYsz0BABaMxIuO1PKTD0ckGWrhcGdzk2dlWQ6vSvp0CUQ5k1RXGqkIIqkDw"
                        }
                    ],
                    "available_quantity": 10000,
                    "pending_quantity": 0,
                    "countries": null,
                    "status": "rendered",
                    "mode": "test",
                    "orientation": "horizontal",
                    "threshold_amount": 0,
                    "date_created": "2017-08-05T15:54:53.346Z",
                    "date_modified": "2017-08-05T15:54:53.346Z",
                    "object": "card"
                }
            ],
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "letter"
        },
        "idField": "id"
    },
    {
        "entity": "letter",
        "accessor": "Letter",
        "op": "remove",
        "method": "DELETE",
        "path": "/letters/{ltr_id}",
        "args": [
            {
                "name": "id",
                "wire": "ltr_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ltr_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "link",
        "accessor": "Link",
        "op": "create",
        "method": "POST",
        "path": "/links",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "title": "x",
            "domain_id": "x",
            "redirect_link": "x",
            "short_link": "x",
            "metadata": {},
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "link",
        "accessor": "Link",
        "op": "list",
        "method": "GET",
        "path": "/links",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "domain_id": "v1",
            "limit": 10
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "campaign_id",
            "domain_id"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "object": "x",
            "next_url": "x",
            "previous_url": "x",
            "count": 1,
            "total_count": 1,
            "data": [
                {
                    "created_at": "x",
                    "domain_id": "x",
                    "id": "x",
                    "metadata": {},
                    "redirect_link": "x",
                    "short_link": "x",
                    "title": "x",
                    "updated_at": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "link",
        "accessor": "Link",
        "op": "load",
        "method": "GET",
        "path": "/links/{link_id}",
        "args": [
            {
                "name": "id",
                "wire": "link_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "title": "x",
            "domain_id": "x",
            "redirect_link": "x",
            "short_link": "x",
            "metadata": {},
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "link",
        "accessor": "Link",
        "op": "remove",
        "method": "DELETE",
        "path": "/links/{link_id}",
        "args": [
            {
                "name": "id",
                "wire": "link_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "link",
        "accessor": "Link",
        "op": "update",
        "method": "PATCH",
        "path": "/links/{link_id}",
        "args": [
            {
                "name": "id",
                "wire": "link_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "x",
            "title": "x",
            "domain_id": "x",
            "redirect_link": "x",
            "short_link": "x",
            "metadata": {},
            "created_at": "x",
            "updated_at": "x"
        },
        "idField": "id"
    },
    {
        "entity": "lob_credits_balance",
        "accessor": "LobCreditsBalance",
        "op": "load",
        "method": "GET",
        "path": "/accounts",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "balance": 0
        },
        "idField": "id"
    },
    {
        "entity": "postcard",
        "accessor": "Postcard",
        "op": "create",
        "method": "POST",
        "path": "/postcards",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "psc_208e45e48d271294",
            "description": null,
            "metadata": {},
            "to": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": null,
                "company": "LOB",
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2018-12-08T03:01:07.651Z",
                "date_modified": "2018-12-08T03:01:07.651Z",
                "object": "address"
            },
            "url": "https://lob-assets.com/postcards/psc_208e45e48d271294.pdf?version=v1&expires=1619218302&signature=NfHHLBSr5tOHA_Z4kij4dKqZG8f3vMDtwvuFVeeF9pV_lylcjLsVVODhNCE5hR6-2slUr6t9WMNsi429Pj7_DA",
            "carrier": "USPS",
            "front_template_id": null,
            "back_template_id": null,
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "postcard"
        },
        "idField": "id"
    },
    {
        "entity": "postcard",
        "accessor": "Postcard",
        "op": "list",
        "method": "GET",
        "path": "/postcards",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "scheduled": "v1",
            "send_date": "v1",
            "size": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "campaign_id",
            "status",
            "size",
            "scheduled",
            "send_date",
            "mail_type",
            "sort_by"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "psc_208e45e48d271294",
                    "description": null,
                    "metadata": {},
                    "to": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/postcards/psc_208e45e48d271294.pdf?version=v1&expires=1619218302&signature=NfHHLBSr5tOHA_Z4kij4dKqZG8f3vMDtwvuFVeeF9pV_lylcjLsVVODhNCE5hR6-2slUr6t9WMNsi429Pj7_DA",
                    "carrier": "USPS",
                    "front_template_id": null,
                    "back_template_id": null,
                    "front_template_version_id": null,
                    "back_template_version_id": null,
                    "date_created": "2021-03-24T22:51:42.838Z",
                    "date_modified": "2021-03-24T22:51:42.838Z",
                    "send_date": "2021-03-24T22:51:42.838Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "postcard"
                },
                {
                    "id": "psc_0e03d1ad7d31f151",
                    "description": null,
                    "metadata": {},
                    "to": {
                        "id": "adr_c7cb63d68f8d6",
                        "description": null,
                        "name": "JANE DOE",
                        "company": "LOB",
                        "phone": "5555555555",
                        "email": "jane.doe@lob.com",
                        "address_line1": "370 WATER ST",
                        "address_line2": "",
                        "address_city": "SUMMERSIDE",
                        "address_state": "PE",
                        "address_zip": "C1N 1C4",
                        "address_country": "CANADA",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address",
                        "recipient_moved": false
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/postcards/psc_208e45e48d271294.pdf?version=v1&expires=1619218302&signature=NfHHLBSr5tOHA_Z4kij4dKqZG8f3vMDtwvuFVeeF9pV_lylcjLsVVODhNCE5hR6-2slUr6t9WMNsi429Pj7_DA",
                    "carrier": "USPS",
                    "front_template_id": null,
                    "back_template_id": null,
                    "front_template_version_id": null,
                    "back_template_version_id": null,
                    "tracking_events": [],
                    "size": "6x11",
                    "mail_type": "usps_first_class",
                    "merge_variables": {},
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_small_1.png?expires=1540372221&signature=a5fRBJ22ZA78Vgpg34M9UfmHWTS3eha",
                            "medium": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_medium_1.png?expires=1540372221&signature=bAzL8sv935PY09FWSkpDpWKkyvGSWYF",
                            "large": "https://lob-assets.com/letters/ltr_4868c3b754655f90_thumb_large_1.png?expires=1540372221&signature=gsKvxXgrm4v4iZD3bOibK7jApNkEMdW"
                        }
                    ],
                    "expected_delivery_date": "2021-03-30",
                    "date_created": "2021-03-24T22:51:42.838Z",
                    "date_modified": "2021-03-24T22:51:42.838Z",
                    "send_date": "2021-03-24T22:51:42.838Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "postcard"
                }
            ],
            "object": "list",
            "previous_url": null,
            "next_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "postcard",
        "accessor": "Postcard",
        "op": "load",
        "method": "GET",
        "path": "/postcards/{psc_id}",
        "args": [
            {
                "name": "id",
                "wire": "psc_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "psc_208e45e48d271294",
            "description": null,
            "metadata": {},
            "to": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": null,
                "company": "LOB",
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2018-12-08T03:01:07.651Z",
                "date_modified": "2018-12-08T03:01:07.651Z",
                "object": "address"
            },
            "url": "https://lob-assets.com/postcards/psc_208e45e48d271294.pdf?version=v1&expires=1619218302&signature=NfHHLBSr5tOHA_Z4kij4dKqZG8f3vMDtwvuFVeeF9pV_lylcjLsVVODhNCE5hR6-2slUr6t9WMNsi429Pj7_DA",
            "carrier": "USPS",
            "front_template_id": null,
            "back_template_id": null,
            "date_created": "2021-03-24T22:51:42.838Z",
            "date_modified": "2021-03-24T22:51:42.838Z",
            "send_date": "2021-03-24T22:51:42.838Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "postcard"
        },
        "idField": "id"
    },
    {
        "entity": "postcard",
        "accessor": "Postcard",
        "op": "remove",
        "method": "DELETE",
        "path": "/postcards/{psc_id}",
        "args": [
            {
                "name": "id",
                "wire": "psc_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "psc_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "qr_code",
        "accessor": "QrCode",
        "op": "list",
        "method": "GET",
        "path": "/qr_code_analytics",
        "args": [],
        "select": {
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "offset": "v1",
            "resource_id": "v1",
            "scanned": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset",
            "include",
            "date_created",
            "scanned",
            "resource_ids"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "resource_id": "ltr_d5a5a89da9106f8",
                    "date_created": "2019-07-27T23:49:01.511Z",
                    "number_of_scans": 2,
                    "scans": [
                        {
                            "ip_location": "127.0.0.1",
                            "scan_date": "2022-07-27T23:49:01.511Z"
                        },
                        {
                            "ip_location": "127.0.0.1",
                            "scan_date": "2022-07-29T23:45:00.436Z"
                        }
                    ]
                },
                {
                    "resource_id": "psc_d5a5a89da9106f8",
                    "date_created": "2022-09-27T23:49:01.511Z",
                    "number_of_scans": 1,
                    "scans": [
                        {
                            "ip_location": "127.0.0.1",
                            "scan_date": "2022-09-27T23:49:01.511Z"
                        }
                    ]
                }
            ],
            "object": "list",
            "count": 2,
            "scanned_count": 2,
            "total_count": 2
        },
        "idField": "id"
    },
    {
        "entity": "resource_proof",
        "accessor": "ResourceProof",
        "op": "create",
        "method": "POST",
        "path": "/resource_proofs",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "res_prf_example123",
            "template_id": null,
            "resource_type": "postcard",
            "status": "completed",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_small_1.png",
                    "medium": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_medium_1.png",
                    "large": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_large_1.png"
                }
            ],
            "url": "https://lob-assets.com/resource-proofs/res_prf_example123.pdf",
            "errors": [],
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "resource_proof"
        },
        "idField": "id"
    },
    {
        "entity": "resource_proof",
        "accessor": "ResourceProof",
        "op": "load",
        "method": "GET",
        "path": "/resource_proofs/{res_prf_id}",
        "args": [
            {
                "name": "id",
                "wire": "res_prf_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "res_prf_example123",
            "template_id": null,
            "resource_type": "postcard",
            "status": "completed",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_small_1.png",
                    "medium": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_medium_1.png",
                    "large": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_large_1.png"
                }
            ],
            "url": "https://lob-assets.com/resource-proofs/res_prf_example123.pdf",
            "errors": [],
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "resource_proof"
        },
        "idField": "id"
    },
    {
        "entity": "resource_proof",
        "accessor": "ResourceProof",
        "op": "update",
        "method": "PATCH",
        "path": "/resource_proofs/{res_prf_id}",
        "args": [
            {
                "name": "id",
                "wire": "res_prf_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "res_prf_example123",
            "template_id": null,
            "resource_type": "postcard",
            "status": "completed",
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_small_1.png",
                    "medium": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_medium_1.png",
                    "large": "https://lob-assets.com/resource-proofs/res_prf_example123_thumb_large_1.png"
                }
            ],
            "url": "https://lob-assets.com/resource-proofs/res_prf_example123.pdf",
            "errors": [],
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "resource_proof"
        },
        "idField": "id"
    },
    {
        "entity": "response",
        "accessor": "Response",
        "op": "create",
        "method": "POST",
        "path": "/informed_delivery_campaigns",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "infd_234g5324g324g23",
            "object": "informed_delivery_campaign",
            "account_id": "xxxxxxxxxxxxxxxxxxxx",
            "quantity": 20,
            "usps_campaign_id": "1234567890",
            "usps_title": "Campaign: 1a1a1a1a-9657-423b-b3c7-2",
            "start_date": "2024-08-31T00:00:00.000Z",
            "end_date": "2024-10-15T00:00:00.000Z",
            "start_serial": 3183487,
            "end_serial": 3183506,
            "ride_along_url": "https://www.lob.com",
            "ride_along_image_s3_link": "https://lob-assets.com/informed-delivery/infd_234g5324g324g23_ride_along.jpg",
            "representative_image_s3_link": null,
            "status": "approved",
            "date_created": "2024-08-30T23:30:02.980Z",
            "date_modified": "2024-08-30T23:30:05.027Z",
            "mode": "live",
            "lob_campaign_id": null,
            "deleted": false,
            "campaign_code": "1a1a1a1a-9657-423b-b3c7-2+Code",
            "brand_name": "Lob",
            "service_request_number": null
        },
        "idField": "id"
    },
    {
        "entity": "response",
        "accessor": "Response",
        "op": "list",
        "method": "GET",
        "path": "/informed_delivery_campaigns",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "infd_234g5324g324g23",
                    "object": "informed_delivery_campaign",
                    "account_id": "xxxxxxxxxxxxxxxxxxxx",
                    "quantity": 20,
                    "usps_campaign_id": "1234567890",
                    "usps_title": "Campaign: 1a1a1a1a-9657-423b-b3c7-2",
                    "start_date": "2024-08-31T00:00:00.000Z",
                    "end_date": "2024-10-15T00:00:00.000Z",
                    "start_serial": 3183487,
                    "end_serial": 3183506,
                    "ride_along_url": "https://www.lob.com",
                    "ride_along_image_s3_link": "https://lob-assets.com/informed-delivery/infd_234g5324g324g23_ride_along.jpg",
                    "representative_image_s3_link": null,
                    "status": "approved",
                    "date_created": "2024-08-30T23:30:02.980Z",
                    "date_modified": "2024-08-30T23:30:05.027Z",
                    "mode": "live",
                    "lob_campaign_id": null,
                    "deleted": false,
                    "campaign_code": "1a1a1a1a-9657-423b-b3c7-2+Code",
                    "brand_name": "Lob",
                    "service_request_number": null
                },
                {
                    "id": "infd_23g23g234g23g42",
                    "object": "informed_delivery_campaign",
                    "account_id": "xxxxxxxxxxxxxxxxxxxx",
                    "quantity": 5,
                    "usps_campaign_id": "23452345",
                    "usps_title": "Campaign: 133d228e-f9e9-4056-aaea-f",
                    "start_date": "2024-08-31T00:00:00.000Z",
                    "end_date": "2024-10-15T00:00:00.000Z",
                    "start_serial": null,
                    "end_serial": null,
                    "ride_along_url": "https://www.lob.com",
                    "ride_along_image_s3_link": "https://lob-assets.com/informed-delivery/infd_23g23g234g23g42_ride_along.jpg",
                    "representative_image_s3_link": null,
                    "status": "pending_approval",
                    "date_created": "2024-08-30T23:30:02.980Z",
                    "date_modified": "2024-09-30T23:30:05.027Z",
                    "mode": "live",
                    "lob_campaign_id": null,
                    "deleted": false,
                    "campaign_code": "133d228e-f9e9-4056-aaea-f+Code",
                    "brand_name": "Lob",
                    "service_request_number": null
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "response",
        "accessor": "Response",
        "op": "load",
        "method": "GET",
        "path": "/informed_delivery_campaigns/{usps_campaign_id}",
        "args": [
            {
                "name": "usps_campaign_id",
                "wire": "usps_campaign_id",
                "value": "1200772869"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "infd_234g5324g324g23",
            "object": "informed_delivery_campaign",
            "account_id": "xxxxxxxxxxxxxxxxxxxx",
            "quantity": 20,
            "usps_campaign_id": "1234567890",
            "usps_title": "Campaign: 1a1a1a1a-9657-423b-b3c7-2",
            "start_date": "2024-08-31T00:00:00.000Z",
            "end_date": "2024-10-15T00:00:00.000Z",
            "start_serial": 3183487,
            "end_serial": 3183506,
            "ride_along_url": "https://www.lob.com",
            "ride_along_image_s3_link": "https://lob-assets.com/informed-delivery/infd_234g5324g324g23_ride_along.jpg",
            "representative_image_s3_link": null,
            "status": "approved",
            "date_created": "2024-08-30T23:30:02.980Z",
            "date_modified": "2024-08-30T23:30:05.027Z",
            "mode": "live",
            "lob_campaign_id": null,
            "deleted": false,
            "campaign_code": "1a1a1a1a-9657-423b-b3c7-2+Code",
            "brand_name": "Lob",
            "service_request_number": null
        },
        "idField": "id"
    },
    {
        "entity": "response",
        "accessor": "Response",
        "op": "update",
        "method": "PATCH",
        "path": "/informed_delivery_campaigns/{usps_campaign_id}",
        "args": [
            {
                "name": "usps_campaign_id",
                "wire": "usps_campaign_id",
                "value": "1200772869"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "infd_234g5324g324g23",
            "object": "informed_delivery_campaign",
            "account_id": "xxxxxxxxxxxxxxxxxxxx",
            "quantity": 20,
            "usps_campaign_id": "1234567890",
            "usps_title": "Campaign: 1a1a1a1a-9657-423b-b3c7-2",
            "start_date": "2024-08-31T00:00:00.000Z",
            "end_date": "2024-10-15T00:00:00.000Z",
            "start_serial": 3183487,
            "end_serial": 3183506,
            "ride_along_url": "https://www.lob.com",
            "ride_along_image_s3_link": "https://lob-assets.com/informed-delivery/infd_234g5324g324g23_ride_along.jpg",
            "representative_image_s3_link": null,
            "status": "approved",
            "date_created": "2024-08-30T23:30:02.980Z",
            "date_modified": "2024-08-30T23:30:05.027Z",
            "mode": "live",
            "lob_campaign_id": null,
            "deleted": false,
            "campaign_code": "1a1a1a1a-9657-423b-b3c7-2+Code",
            "brand_name": "Lob",
            "service_request_number": null
        },
        "idField": "id"
    },
    {
        "entity": "reverse_geocode",
        "accessor": "ReverseGeocode",
        "op": "create",
        "method": "POST",
        "path": "/us_reverse_geocode_lookups",
        "args": [],
        "select": {
            "size": 5
        },
        "headers": [],
        "query": [
            "size"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "us_reverse_geocode_8a013f3e",
            "addresses": [
                {
                    "components": {
                        "zip_code": "94107",
                        "zip_code_plus_4": "1702"
                    },
                    "location_analysis": {
                        "latitude": 37.78271,
                        "longitude": -122.416202,
                        "distance": 1.32
                    }
                },
                {
                    "components": {
                        "zip_code": "94107",
                        "zip_code_plus_4": "1702"
                    },
                    "location_analysis": {
                        "latitude": 37.782917,
                        "longitude": -122.416131,
                        "distance": 1.33
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "self_mailer",
        "accessor": "SelfMailer",
        "op": "create",
        "method": "POST",
        "path": "/self_mailers",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "sfm_8ffbe811dea49dcf",
            "description": "April Campaign",
            "metadata": {},
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "url": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "outside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_version_id": "vrsn_bfdf70893b00a85",
            "outside_template_version_id": "vrsn_bfdf70893b00a85",
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                },
                {
                    "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                    "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                    "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                }
            ],
            "merge_variables": {
                "name": null
            },
            "size": "6x18_bifold",
            "mail_type": "usps_first_class",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "self_mailer"
        },
        "idField": "id"
    },
    {
        "entity": "self_mailer",
        "accessor": "SelfMailer",
        "op": "list",
        "method": "GET",
        "path": "/self_mailers",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "scheduled": "v1",
            "send_date": "v1",
            "size": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "size",
            "scheduled",
            "send_date",
            "mail_type",
            "sort_by",
            "campaign_id",
            "status"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "sfm_7239rhwqkrfaskas",
                    "description": "April Campaign",
                    "metadata": {},
                    "to": {
                        "id": "adr_asdi2y3riuasasoi",
                        "description": "Harry - Office",
                        "name": "Harry Zhang",
                        "company": "Lob",
                        "phone": "5555555555",
                        "email": "harry@lob.com",
                        "metadata": {},
                        "address_line1": "370 WATER ST",
                        "address_line2": "",
                        "address_city": "SUMMERSIDE",
                        "address_state": "PRINCE EDWARD ISLAND",
                        "address_zip": "C1N 1C4",
                        "address_country": "CANADA",
                        "recipient_moved": false,
                        "date_created": "2019-09-20T00:14:00.361Z",
                        "date_modified": "2019-09-20T00:14:00.361Z",
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": null,
                        "company": "LOB",
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf.pdf?version=v1&expires=1618781264&signature=YP_bCwrgVA2lz1Gr1YVCJN1f-WspUGsH0aJp2ihjfLXU7lDUV12_xRv4uPch0mfWeOOxEqpyP8hGpgvjmQKNAw",
                    "outside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_version_id": "vrsn_bfdf70893b00a85",
                    "outside_template_version_id": "vrsn_bfdf70893b00a85",
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_1.png?version=v1&expires=1618781264&signature=A7q5HbRO53sUYYnwGlmP5mTS6ylLE7kS2mYhfcEOdexjyqG7UseK0MD26DppE4Q0aE4u2msDVMxd5ukjMerYCg",
                            "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_1.png?version=v1&expires=1618781264&signature=b9pynuawVpU_vrhnT_mTpksdE-FLF_ZjdIBOFR_ltIzEGlx-VKD4VvZrqP98lG2D8V7UKQ7SdRr2nUAk4LxvCg",
                            "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_1.png?version=v1&expires=1618781264&signature=g2jifhCselPqIj8au6lsbJMNFN8ZX3aM6GkLoAXiHBCS8X5mF9nhVbmO0odpnmwNlV1CWIp-MXVsZkC3NmxqBQ"
                        },
                        {
                            "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_2.png?version=v1&expires=1618781264&signature=biJY4-ZbNNRydPYg3cZkq7wxjILbPBK_nIVyoyQsg5X5q4jlsa-2fzeMa48V9jprUetsC6WEuYvasHosRfG_DQ",
                            "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_2.png?version=v1&expires=1618781264&signature=xEAX7bURyc8fSphacuo5yb7iVIpT8Xvq05KgMaNQS4r3aCpx0z1p42wbPmW758B5Ae0li1YDYvVyzS7qJIoWAw",
                            "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_2.png?version=v1&expires=1618781264&signature=NieHDnoQ7STZUvofHrFt7S987CzIkUJWpaSgpVQPZw-C3_wwTPsIrvxYdXEuFrr6ciTUcxRBFPlE0lurmMkyCA"
                        }
                    ],
                    "merge_variables": {
                        "name": null
                    },
                    "size": "6x18_bifold",
                    "mail_type": "usps_first_class",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:41:06.691Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "deleted": true,
                    "use_type": "marketing",
                    "fsc": false,
                    "object": "self_mailer"
                },
                {
                    "id": "sfm_8ffbe811dea49dcf",
                    "description": "April Campaign",
                    "metadata": {},
                    "to": {
                        "id": "adr_f9228b743884ff98",
                        "description": null,
                        "name": "AYA",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "2812 PARK RD",
                        "address_line2": null,
                        "address_city": "CHARLOTTE",
                        "address_state": "NC",
                        "address_zip": "28209-1314",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2021-03-16T18:40:40.410Z",
                        "date_modified": "2021-03-16T18:40:40.410Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": null,
                        "company": "LOB",
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf.pdf?version=v1&expires=1618781264&signature=YP_bCwrgVA2lz1Gr1YVCJN1f-WspUGsH0aJp2ihjfLXU7lDUV12_xRv4uPch0mfWeOOxEqpyP8hGpgvjmQKNAw",
                    "outside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_version_id": "vrsn_bfdf70893b00a85",
                    "outside_template_version_id": "vrsn_bfdf70893b00a85",
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_1.png?version=v1&expires=1618781264&signature=A7q5HbRO53sUYYnwGlmP5mTS6ylLE7kS2mYhfcEOdexjyqG7UseK0MD26DppE4Q0aE4u2msDVMxd5ukjMerYCg",
                            "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_1.png?version=v1&expires=1618781264&signature=b9pynuawVpU_vrhnT_mTpksdE-FLF_ZjdIBOFR_ltIzEGlx-VKD4VvZrqP98lG2D8V7UKQ7SdRr2nUAk4LxvCg",
                            "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_1.png?version=v1&expires=1618781264&signature=g2jifhCselPqIj8au6lsbJMNFN8ZX3aM6GkLoAXiHBCS8X5mF9nhVbmO0odpnmwNlV1CWIp-MXVsZkC3NmxqBQ"
                        },
                        {
                            "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_2.png?version=v1&expires=1618781264&signature=biJY4-ZbNNRydPYg3cZkq7wxjILbPBK_nIVyoyQsg5X5q4jlsa-2fzeMa48V9jprUetsC6WEuYvasHosRfG_DQ",
                            "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_2.png?version=v1&expires=1618781264&signature=xEAX7bURyc8fSphacuo5yb7iVIpT8Xvq05KgMaNQS4r3aCpx0z1p42wbPmW758B5Ae0li1YDYvVyzS7qJIoWAw",
                            "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_2.png?version=v1&expires=1618781264&signature=NieHDnoQ7STZUvofHrFt7S987CzIkUJWpaSgpVQPZw-C3_wwTPsIrvxYdXEuFrr6ciTUcxRBFPlE0lurmMkyCA"
                        }
                    ],
                    "merge_variables": {
                        "name": null
                    },
                    "size": "6x18_bifold",
                    "mail_type": "usps_first_class",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:41:06.691Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "deleted": true,
                    "use_type": "marketing",
                    "fsc": true,
                    "object": "self_mailer"
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "self_mailer",
        "accessor": "SelfMailer",
        "op": "load",
        "method": "GET",
        "path": "/self_mailers/{sfm_id}",
        "args": [
            {
                "name": "id",
                "wire": "sfm_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "sfm_8ffbe811dea49dcf",
            "description": "April Campaign",
            "metadata": {},
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "url": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "outside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_version_id": "vrsn_bfdf70893b00a85",
            "outside_template_version_id": "vrsn_bfdf70893b00a85",
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                },
                {
                    "small": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                    "medium": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                    "large": "https://lob-assets.com/self-mailers/sfm_8ffbe811dea49dcf_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                }
            ],
            "merge_variables": {
                "name": null
            },
            "size": "6x18_bifold",
            "mail_type": "usps_first_class",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "sla": "2",
            "object": "self_mailer"
        },
        "idField": "id"
    },
    {
        "entity": "self_mailer",
        "accessor": "SelfMailer",
        "op": "remove",
        "method": "DELETE",
        "path": "/self_mailers/{sfm_id}",
        "args": [
            {
                "name": "id",
                "wire": "sfm_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "sfm_123456789",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "snap_pack",
        "accessor": "SnapPack",
        "op": "create",
        "method": "POST",
        "path": "/snap_packs",
        "args": [],
        "select": {
            "idempotency_key": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
        },
        "headers": [
            {
                "name": "idempotency_key",
                "wire": "Idempotency-Key",
                "value": "026e7634-24d7-486c-a0bb-4a17fd0eebc5"
            }
        ],
        "query": [
            "idempotency_key"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "description": "April Campaign",
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "outside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_version_id": "vrsn_bfdf70893b00a85",
            "outside_template_version_id": "vrsn_bfdf70893b00a85",
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                },
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                }
            ],
            "merge_variables": {
                "name": null
            },
            "size": "8.5x11",
            "mail_type": "usps_first_class",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "color": false,
            "sla": "2",
            "object": "snap_pack"
        },
        "idField": "id"
    },
    {
        "entity": "snap_pack",
        "accessor": "SnapPack",
        "op": "list",
        "method": "GET",
        "path": "/snap_packs",
        "args": [],
        "select": {
            "before/after": "v1",
            "campaign_id": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "mail_type": "v1",
            "metadata": "v1",
            "send_date": "v1",
            "sort_by": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata",
            "send_date",
            "mail_type",
            "sort_by",
            "campaign_id",
            "status"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "ord_0d6a16a3fff6318ac8f8008dc1",
                    "description": "April Campaign",
                    "to": {
                        "id": "adr_bae820679f3f536b",
                        "description": null,
                        "name": "HARRY ZHANG",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2017-09-05T17:47:53.767Z",
                        "date_modified": "2017-09-05T17:47:53.767Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": "LEORE AVIDAR",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2017-09-05T17:47:53.767Z",
                        "date_modified": "2017-09-05T17:47:53.767Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
                    "outside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_version_id": "vrsn_bfdf70893b00a85",
                    "outside_template_version_id": "vrsn_bfdf70893b00a85",
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                            "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                            "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                        },
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                            "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                            "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                        }
                    ],
                    "merge_variables": {
                        "name": null
                    },
                    "size": "8.5x11",
                    "mail_type": "usps_first_class",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:40:40.504Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "color": false,
                    "object": "snap_pack"
                },
                {
                    "id": "ord_851100000f31bb1a872f794cee",
                    "description": "April Campaign",
                    "to": {
                        "id": "adr_f9228b743884ff98",
                        "description": null,
                        "name": "AYA",
                        "company": null,
                        "phone": null,
                        "email": null,
                        "address_line1": "2812 PARK RD",
                        "address_line2": null,
                        "address_city": "CHARLOTTE",
                        "address_state": "NC",
                        "address_zip": "28209-1314",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2021-03-16T18:40:40.410Z",
                        "date_modified": "2021-03-16T18:40:40.410Z",
                        "deleted": true,
                        "object": "address"
                    },
                    "from": {
                        "id": "adr_210a8d4b0b76d77b",
                        "description": null,
                        "name": null,
                        "company": "LOB",
                        "phone": null,
                        "email": null,
                        "address_line1": "210 KING ST STE 6100",
                        "address_line2": null,
                        "address_city": "SAN FRANCISCO",
                        "address_state": "CA",
                        "address_zip": "94107-1741",
                        "address_country": "UNITED STATES",
                        "metadata": {},
                        "date_created": "2018-12-08T03:01:07.651Z",
                        "date_modified": "2018-12-08T03:01:07.651Z",
                        "object": "address"
                    },
                    "url": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
                    "outside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_id": "tmpl_a3cb937f26d7eec",
                    "inside_template_version_id": "vrsn_bfdf70893b00a85",
                    "outside_template_version_id": "vrsn_bfdf70893b00a85",
                    "carrier": "USPS",
                    "tracking_events": [],
                    "thumbnails": [
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                            "medium": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                            "large": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                        },
                        {
                            "small": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                            "medium": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                            "large": "https://lob-assets.com/order-creatives/ord_851100000f31bb1a872f794cee_comp_a20fd48ba4efda76ee827400d_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                        }
                    ],
                    "merge_variables": {
                        "name": null
                    },
                    "size": "8.5x11",
                    "mail_type": "usps_first_class",
                    "expected_delivery_date": "2021-03-24",
                    "date_created": "2021-03-16T18:40:40.504Z",
                    "date_modified": "2021-03-16T18:40:40.504Z",
                    "send_date": "2021-03-16T18:45:40.493Z",
                    "use_type": "marketing",
                    "fsc": false,
                    "color": false,
                    "object": "snap_pack"
                }
            ],
            "object": "list",
            "next_url": null,
            "previous_url": null,
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "snap_pack",
        "accessor": "SnapPack",
        "op": "load",
        "method": "GET",
        "path": "/snap_packs/{snap_pack_id}",
        "args": [
            {
                "name": "id",
                "wire": "snap_pack_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "description": "April Campaign",
            "to": {
                "id": "adr_bae820679f3f536b",
                "description": null,
                "name": "HARRY ZHANG",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "from": {
                "id": "adr_210a8d4b0b76d77b",
                "description": null,
                "name": "LEORE AVIDAR",
                "company": null,
                "phone": null,
                "email": null,
                "address_line1": "210 KING ST STE 6100",
                "address_line2": null,
                "address_city": "SAN FRANCISCO",
                "address_state": "CA",
                "address_zip": "94107-1741",
                "address_country": "UNITED STATES",
                "metadata": {},
                "date_created": "2017-09-05T17:47:53.767Z",
                "date_modified": "2017-09-05T17:47:53.767Z",
                "deleted": true,
                "object": "address"
            },
            "url": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d.pdf?version=v1&expires=1618512040&signature=qvyCqXI1ndBvc4AjvG8FlirqLXEcfmYo4sDrRtabaXMOsX88to9G3K49uIk_aqevvZXe8HoRYD_nWydbQHqaCA",
            "outside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_id": "tmpl_a3cb937f26d7eec",
            "inside_template_version_id": "vrsn_bfdf70893b00a85",
            "outside_template_version_id": "vrsn_bfdf70893b00a85",
            "carrier": "USPS",
            "tracking_events": [],
            "thumbnails": [
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_1.png?version=v1&expires=1618512040&signature=-bipeUHP-hAMcCBSrWM0ZH1VwRdSPNVGGZN9hAZKr6Lh4ly6uxvratVd5LXJCK_zOEMYk_mTWASt0ge7OY6SDA",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_1.png?version=v1&expires=1618512040&signature=ryxN7bsXGtw_GRFSP3Cs3A3IYjxZi3cW9BHDCNgMt6p3nobVmsc_iFHt2e-S7ndAXhhN7nP-MQVov3bt3r37BQ",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_1.png?version=v1&expires=1618512040&signature=kBrm00xkyCkJNJRHxH8HshFaebtOxnzjVWOs1VVmGMuw8H6OBNcMAMxt9s49K0jlpHoh3Nr9uSncEZMQaaNjAg"
                },
                {
                    "small": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_small_2.png?version=v1&expires=1618512040&signature=3gTgU7Fd3KoT_vNlQnTGptRps5ZgnkhSnPrAwk7L98higIzSwfKoLvuu_DIpMM48dHbxckKT9waR8euJ4KSDBQ",
                    "medium": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_medium_2.png?version=v1&expires=1618512040&signature=Ue1lw5CMj7KRx6cMQL8xPeazaHCdJzWcACd1w3acuYPnWkVIpSt62OIO7hAtpAQK9xm1dhhlFj0rqRZMdRMMBA",
                    "large": "https://lob-assets.com/order-creatives/ord_0d6a16a3fff6318ac8f8008dc1_comp_a20fd48ba4efda76ee827400d_thumb_large_2.png?version=v1&expires=1618512040&signature=cICc7HEm1xG_eyM4a_wtvPk2FqoLRmtgGa29kJisWnMIYBL0OkyzG4ZCYGMhp-5cZpJlSpXfTgGKh_Qmeo1TDw"
                }
            ],
            "merge_variables": {
                "name": null
            },
            "size": "8.5x11",
            "mail_type": "usps_first_class",
            "expected_delivery_date": "2021-03-24",
            "date_created": "2021-03-16T18:40:40.504Z",
            "date_modified": "2021-03-16T18:40:40.504Z",
            "send_date": "2021-03-16T18:45:40.493Z",
            "use_type": "marketing",
            "fsc": false,
            "color": false,
            "sla": "2",
            "object": "snap_pack"
        },
        "idField": "id"
    },
    {
        "entity": "snap_pack",
        "accessor": "SnapPack",
        "op": "remove",
        "method": "DELETE",
        "path": "/snap_packs/{snap_pack_id}",
        "args": [
            {
                "name": "id",
                "wire": "snap_pack_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ord_0d6a16a3fff6318ac8f8008dc1",
            "deleted": true
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
        "path": "/templates/{tmpl_id}",
        "args": [
            {
                "name": "id",
                "wire": "tmpl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "tmpl_c94e83ca2cd5121",
            "description": "Test Template",
            "versions": [
                {
                    "id": "vrsn_362184d96d9b0c9",
                    "suggest_json_editor": true,
                    "description": "Test Template",
                    "engine": "legacy",
                    "html": "<html>HTML for {{name}}</html>",
                    "date_created": "2017-11-07T22:56:10.962Z",
                    "date_modified": "2017-11-07T22:56:10.962Z",
                    "object": "version"
                }
            ],
            "published_version": {
                "id": "vrsn_362184d96d9b0c9",
                "suggest_json_editor": false,
                "description": "Test Template",
                "engine": "handlebars",
                "html": "<html>HTML for {{name}}</html>",
                "date_created": "2017-11-07T22:56:10.962Z",
                "date_modified": "2017-11-07T22:56:10.962Z",
                "object": "version"
            },
            "metadata": {},
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "template"
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "create",
        "method": "POST",
        "path": "/templates",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "tmpl_c94e83ca2cd5121",
            "description": "Test Template",
            "versions": [
                {
                    "id": "vrsn_362184d96d9b0c9",
                    "suggest_json_editor": true,
                    "description": "Test Template",
                    "engine": "legacy",
                    "html": "<html>HTML for {{name}}</html>",
                    "date_created": "2017-11-07T22:56:10.962Z",
                    "date_modified": "2017-11-07T22:56:10.962Z",
                    "object": "version"
                }
            ],
            "published_version": {
                "id": "vrsn_362184d96d9b0c9",
                "suggest_json_editor": false,
                "description": "Test Template",
                "engine": "handlebars",
                "html": "<html>HTML for {{name}}</html>",
                "date_created": "2017-11-07T22:56:10.962Z",
                "date_modified": "2017-11-07T22:56:10.962Z",
                "object": "version"
            },
            "metadata": {},
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "template"
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "list",
        "method": "GET",
        "path": "/templates",
        "args": [],
        "select": {
            "before/after": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10,
            "metadata": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created",
            "metadata"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "tmpl_d5a5a89da9106f8",
                    "description": "Test Template",
                    "versions": [
                        {
                            "id": "vrsn_232a02fb8224791",
                            "suggest_json_editor": true,
                            "description": "Test Template",
                            "engine": "legacy",
                            "html": "HTML for ",
                            "date_created": "2019-07-27T23:49:01.512Z",
                            "date_modified": "2019-07-27T23:49:01.512Z",
                            "object": "version"
                        }
                    ],
                    "published_version": {
                        "id": "vrsn_232a02fb8224791",
                        "suggest_json_editor": false,
                        "description": "Test Template",
                        "engine": "handlebars",
                        "html": "HTML for ",
                        "date_created": "2019-07-27T23:49:01.512Z",
                        "date_modified": "2019-07-27T23:49:01.512Z",
                        "object": "version"
                    },
                    "metadata": {},
                    "date_created": "2019-07-27T23:49:01.511Z",
                    "date_modified": "2019-07-27T23:49:01.511Z",
                    "object": "template"
                },
                {
                    "id": "tmpl_59b2150ae120887",
                    "description": "Test Template",
                    "versions": [
                        {
                            "id": "vrsn_2a7eb63ccb795b9",
                            "description": "Test Template",
                            "html": "HTML for ",
                            "date_created": "2019-03-29T10:22:34.643Z",
                            "date_modified": "2019-03-29T10:22:34.643Z",
                            "object": "version"
                        }
                    ],
                    "published_version": {
                        "id": "vrsn_2a7eb63ccb795b9",
                        "description": "Test Template",
                        "html": "HTML for ",
                        "date_created": "2019-03-29T10:22:34.643Z",
                        "date_modified": "2019-03-29T10:22:34.643Z",
                        "object": "version"
                    },
                    "metadata": {},
                    "date_created": "2019-03-29T10:22:34.642Z",
                    "date_modified": "2019-03-29T10:22:34.642Z",
                    "object": "template"
                }
            ],
            "object": "list",
            "previous_url": null,
            "next_url": "https://api.lob.com/v1/templates?limit=2&after=eyJkYXRlT2Zmc2V0IjoiMjAxOS0wMy0yOVQxMDoyMjozNC42NDJaIiwiaWRPZmZzZXQiOiJ0bXBsXzU5YjIxNTBhZTEyMDg4NyJ9",
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "load",
        "method": "GET",
        "path": "/templates/{tmpl_id}",
        "args": [
            {
                "name": "id",
                "wire": "tmpl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "tmpl_c94e83ca2cd5121",
            "description": "Test Template",
            "versions": [
                {
                    "id": "vrsn_362184d96d9b0c9",
                    "suggest_json_editor": true,
                    "description": "Test Template",
                    "engine": "legacy",
                    "html": "<html>HTML for {{name}}</html>",
                    "date_created": "2017-11-07T22:56:10.962Z",
                    "date_modified": "2017-11-07T22:56:10.962Z",
                    "object": "version"
                }
            ],
            "published_version": {
                "id": "vrsn_362184d96d9b0c9",
                "suggest_json_editor": false,
                "description": "Test Template",
                "engine": "handlebars",
                "html": "<html>HTML for {{name}}</html>",
                "date_created": "2017-11-07T22:56:10.962Z",
                "date_modified": "2017-11-07T22:56:10.962Z",
                "object": "version"
            },
            "metadata": {},
            "date_created": "2017-11-07T22:56:10.962Z",
            "date_modified": "2017-11-07T22:56:10.962Z",
            "object": "template"
        },
        "idField": "id"
    },
    {
        "entity": "template",
        "accessor": "Template",
        "op": "remove",
        "method": "DELETE",
        "path": "/templates/{tmpl_id}",
        "args": [
            {
                "name": "id",
                "wire": "tmpl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "value": {
                "id": "tmpl_123456789",
                "deleted": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "template_version",
        "accessor": "TemplateVersion",
        "op": "create",
        "method": "POST",
        "path": "/templates/{tmpl_id}/versions/{vrsn_id}",
        "args": [
            {
                "name": "id",
                "wire": "vrsn_id",
                "value": "p1"
            },
            {
                "name": "template_id",
                "wire": "tmpl_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "vrsn_534e339882d2282",
            "description": "Second Version",
            "html": "<html>Second HTML for {{name}}</html>",
            "date_created": "2017-11-09T04:49:38.016Z",
            "date_modified": "2017-11-09T04:49:38.016Z",
            "object": "version"
        },
        "idField": "id"
    },
    {
        "entity": "template_version",
        "accessor": "TemplateVersion",
        "op": "create",
        "method": "POST",
        "path": "/templates/{tmpl_id}/versions",
        "args": [
            {
                "name": "id",
                "wire": "tmpl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "vrsn_534e339882d2282",
            "description": "Second Version",
            "html": "<html>Second HTML for {{name}}</html>",
            "date_created": "2017-11-09T04:49:38.016Z",
            "date_modified": "2017-11-09T04:49:38.016Z",
            "object": "version"
        },
        "idField": "id"
    },
    {
        "entity": "template_version",
        "accessor": "TemplateVersion",
        "op": "list",
        "method": "GET",
        "path": "/templates/{tmpl_id}/versions",
        "args": [
            {
                "name": "id",
                "wire": "tmpl_id",
                "value": "p1"
            }
        ],
        "select": {
            "before/after": "v1",
            "date_created": "v1",
            "include": "v1",
            "limit": 10
        },
        "headers": [],
        "query": [
            "limit",
            "before/after",
            "include",
            "date_created"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": "vrsn_4d6ff5d868bf630",
                    "description": "Second Version",
                    "html": "Second HTML for ",
                    "date_created": "2017-11-09T05:09:03.665Z",
                    "date_modified": "2018-05-22T22:01:10.479Z",
                    "object": "version"
                },
                {
                    "id": "vrsn_2a17159c1911919",
                    "description": "Test Template",
                    "html": "HTML for ",
                    "date_created": "2017-11-09T05:08:40.004Z",
                    "date_modified": "2018-05-22T22:01:11.309Z",
                    "object": "version"
                }
            ],
            "object": "list",
            "count": 2
        },
        "idField": "id"
    },
    {
        "entity": "template_version",
        "accessor": "TemplateVersion",
        "op": "load",
        "method": "GET",
        "path": "/templates/{tmpl_id}/versions/{vrsn_id}",
        "args": [
            {
                "name": "id",
                "wire": "vrsn_id",
                "value": "p1"
            },
            {
                "name": "template_id",
                "wire": "tmpl_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "vrsn_534e339882d2282",
            "description": "Second Version",
            "html": "<html>Second HTML for {{name}}</html>",
            "date_created": "2017-11-09T04:49:38.016Z",
            "date_modified": "2017-11-09T04:49:38.016Z",
            "object": "version"
        },
        "idField": "id"
    },
    {
        "entity": "template_version_deletion",
        "accessor": "TemplateVersionDeletion",
        "op": "remove",
        "method": "DELETE",
        "path": "/templates/{tmpl_id}/versions/{vrsn_id}",
        "args": [
            {
                "name": "template_id",
                "wire": "tmpl_id",
                "value": "p1"
            },
            {
                "name": "vrsn_id",
                "wire": "vrsn_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "value": {
                "id": "vrsn_123456789",
                "deleted": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "create",
        "method": "POST",
        "path": "/uploads/{upl_id}/file",
        "action": "file",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 202,
        "sample": {
            "message": "File uploaded successfully",
            "filename": "x"
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "create",
        "method": "POST",
        "path": "/uploads",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": "upl_71be866e430b11e9",
            "accountId": "fa9ea650fc7b31a89f92",
            "campaignId": "cmp_1933ad629bae1408",
            "mode": "live",
            "failuresUrl": "http://www.example.com",
            "originalFilename": "my_audience.csv",
            "state": "Draft",
            "totalMailpieces": 100,
            "failedMailpieces": 5,
            "validatedMailpieces": 95,
            "bytesProcessed": 17628,
            "dateCreated": "2017-09-05T17:47:53.767Z",
            "dateModified": "2017-09-05T17:47:53.767Z",
            "requiredAddressColumnMapping": {
                "name": null,
                "address_line1": null,
                "address_city": null,
                "address_state": null,
                "address_zip": null
            },
            "optionalAddressColumnMapping": {
                "address_line2": null,
                "company": null,
                "address_country": null
            },
            "mergeVariableColumnMapping": null,
            "metadata": {
                "columns": []
            }
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "list",
        "method": "GET",
        "path": "/uploads/{upl_id}/report",
        "action": "report",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {
            "limit": 10,
            "offset": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "status",
            "limit",
            "offset"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ex_6a94fe68fd151e0f8",
            "dateCreated": "2021-07-06T22:51:42.838Z",
            "dateModified": "2022-07-06T22:51:42.838Z",
            "deleted": false,
            "s3Url": null,
            "state": "in_progress",
            "type": "failures",
            "uploadId": "upl_71be866e430b11e9"
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "list",
        "method": "GET",
        "path": "/uploads",
        "args": [],
        "select": {
            "campaign_id": "v1"
        },
        "headers": [],
        "query": [
            "campaignId"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": "upl_71be866e430b11e9",
                "accountId": "fa9ea650fc7b31a89f92",
                "campaignId": "cmp_1933ad629bae1408",
                "mode": "test",
                "failuresUrl": "https://www.example.com",
                "originalFilename": "my_audience.csv",
                "state": "Draft",
                "totalMailpieces": 100,
                "failedMailpieces": 5,
                "validatedMailpieces": 95,
                "bytesProcessed": 17268,
                "dateCreated": "2017-09-05T17:47:53.767Z",
                "dateModified": "2017-09-05T17:47:53.767Z",
                "requiredAddressColumnMapping": {
                    "name": "recipient_name",
                    "address_line1": "primary_line",
                    "address_city": "city",
                    "address_state": "state",
                    "address_zip": "zip_code"
                },
                "optionalAddressColumnMapping": {
                    "address_line2": "secondary_line",
                    "company": "company",
                    "address_country": "country"
                },
                "mergeVariableColumnMapping": {
                    "gift_code": "code"
                },
                "metadata": {
                    "columns": [
                        "recipient_name",
                        "zip_code"
                    ]
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "load",
        "method": "GET",
        "path": "/uploads/{upl_id}/exports/{ex_id}",
        "args": [
            {
                "name": "ex_id",
                "wire": "ex_id",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "ex_6a94fe68fd151e0f8",
            "dateCreated": "2021-07-06T22:51:42.838Z",
            "dateModified": "2022-07-06T22:51:42.838Z",
            "deleted": false,
            "s3Url": null,
            "state": "in_progress",
            "type": "failures",
            "uploadId": "upl_71be866e430b11e9"
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "load",
        "method": "GET",
        "path": "/uploads/{upl_id}",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "upl_71be866e430b11e9",
            "accountId": "fa9ea650fc7b31a89f92",
            "campaignId": "cmp_1933ad629bae1408",
            "mode": "live",
            "failuresUrl": "http://www.example.com",
            "originalFilename": "my_audience.csv",
            "state": "Draft",
            "totalMailpieces": 100,
            "failedMailpieces": 5,
            "validatedMailpieces": 95,
            "bytesProcessed": 17628,
            "dateCreated": "2017-09-05T17:47:53.767Z",
            "dateModified": "2017-09-05T17:47:53.767Z",
            "requiredAddressColumnMapping": {
                "name": null,
                "address_line1": null,
                "address_city": null,
                "address_state": null,
                "address_zip": null
            },
            "optionalAddressColumnMapping": {
                "address_line2": null,
                "company": null,
                "address_country": null
            },
            "mergeVariableColumnMapping": null,
            "metadata": {
                "columns": []
            }
        },
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "remove",
        "method": "DELETE",
        "path": "/uploads/{upl_id}",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "upload",
        "accessor": "Upload",
        "op": "update",
        "method": "PATCH",
        "path": "/uploads/{upl_id}",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "upl_71be866e430b11e9",
            "accountId": "fa9ea650fc7b31a89f92",
            "campaignId": "cmp_1933ad629bae1408",
            "mode": "live",
            "failuresUrl": "http://www.example.com",
            "originalFilename": "my_audience.csv",
            "state": "Draft",
            "totalMailpieces": 100,
            "failedMailpieces": 5,
            "validatedMailpieces": 95,
            "bytesProcessed": 17628,
            "dateCreated": "2017-09-05T17:47:53.767Z",
            "dateModified": "2017-09-05T17:47:53.767Z",
            "requiredAddressColumnMapping": {
                "name": null,
                "address_line1": null,
                "address_city": null,
                "address_state": null,
                "address_zip": null
            },
            "optionalAddressColumnMapping": {
                "address_line2": null,
                "company": null,
                "address_country": null
            },
            "mergeVariableColumnMapping": null,
            "metadata": {
                "columns": []
            }
        },
        "idField": "id"
    },
    {
        "entity": "upload_create_export",
        "accessor": "UploadCreateExport",
        "op": "create",
        "method": "POST",
        "path": "/uploads/{upl_id}/exports",
        "args": [
            {
                "name": "id",
                "wire": "upl_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "message": "Export is processing",
            "exportId": "ex_2dafd758ed3da9c43"
        },
        "idField": "id"
    },
    {
        "entity": "us_autocompletion",
        "accessor": "UsAutocompletion",
        "op": "create",
        "method": "POST",
        "path": "/us_autocompletions",
        "args": [],
        "select": {
            "case": "v1",
            "valid_address": "v1"
        },
        "headers": [],
        "query": [
            "case",
            "valid_addresses"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "us_auto_a3ac97bcfbb2460ab20c",
            "suggestions": [
                {
                    "primary_line": "185 BAYSIDE VILLAGE PL",
                    "city": "SAN FRANCISCO",
                    "state": "CA",
                    "zip_code": "94107"
                },
                {
                    "primary_line": "185 BRANNAN ST",
                    "city": "SAN FRANCISCO",
                    "state": "CA",
                    "zip_code": "94107"
                },
                {
                    "primary_line": "185 BONIFACIO ST",
                    "city": "SAN FRANCISCO",
                    "state": "CA",
                    "zip_code": "94107"
                }
            ],
            "object": "us_autocompletion"
        },
        "idField": "id"
    },
    {
        "entity": "zip",
        "accessor": "Zip",
        "op": "create",
        "method": "POST",
        "path": "/us_zip_lookups",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "basic"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": "us_zip_c7cb63d68f8d6",
            "cities": [
                {
                    "city": "SAN FRANCISCO",
                    "state": "CA",
                    "county": "SAN FRANCISCO",
                    "county_fips": "06075",
                    "preferred": true
                }
            ],
            "zip_code_type": "standard",
            "object": "us_zip_lookup",
            "zip_code": "94107"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map