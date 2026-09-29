package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Lob",
			"slug": "lob",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.lob.com/v1",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"address": map[string]any{},
				"bank_account": map[string]any{},
				"bank_deletion": map[string]any{},
				"billing_group": map[string]any{},
				"booklet": map[string]any{},
				"buckslip": map[string]any{},
				"buckslip_order": map[string]any{},
				"campaign": map[string]any{},
				"card": map[string]any{},
				"card_order": map[string]any{},
				"check": map[string]any{},
				"creative": map[string]any{},
				"domain": map[string]any{},
				"identity_validation": map[string]any{},
				"intl_verification": map[string]any{},
				"letter": map[string]any{},
				"link": map[string]any{},
				"lob_credits_balance": map[string]any{},
				"postcard": map[string]any{},
				"qr_code": map[string]any{},
				"resource_proof": map[string]any{},
				"response": map[string]any{},
				"reverse_geocode": map[string]any{},
				"self_mailer": map[string]any{},
				"snap_pack": map[string]any{},
				"template": map[string]any{},
				"template_version": map[string]any{},
				"template_version_deletion": map[string]any{},
				"upload": map[string]any{},
				"upload_create_export": map[string]any{},
				"us_autocompletion": map[string]any{},
				"us_verification": map[string]any{},
				"zip": map[string]any{},
			},
		},
		"entity": map[string]any{
			"address": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address_city",
						"title": "Address City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_country",
						"title": "Address Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_line1",
						"title": "Address Line1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_line2",
						"title": "Address Line2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_state",
						"title": "Address State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_zip",
						"title": "Address Zip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "address",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/addresses",
								"segments": []any{
									map[string]any{
										"lit": "addresses",
									},
								},
								"parts": []any{
									"addresses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/addresses",
								"segments": []any{
									map[string]any{
										"lit": "addresses",
									},
								},
								"parts": []any{
									"addresses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"date_created",
										"include",
										"limit",
										"metadata",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/addresses/{adr_id}",
								"segments": []any{
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"addresses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"adr_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "adr_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/addresses/{adr_id}",
								"segments": []any{
									map[string]any{
										"lit": "addresses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"addresses",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"adr_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "adr_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bank_account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_number",
						"title": "Account Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "account_type",
						"title": "Account Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of entity that holds the account.",
					},
					map[string]any{
						"name": "bank_name",
						"title": "Bank Name",
						"type": "`$STRING`",
						"short": "The name of the bank based on the provided routing number, e.g.",
					},
					map[string]any{
						"name": "check_template",
						"title": "Check Template",
						"type": "`$STRING`",
						"short": "The check template used for printing.",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"short": "The city associated with your home bank account.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "fractional_routing_number",
						"title": "Fractional Routing Number",
						"type": "`$STRING`",
						"short": "The fractional routing number for your home bank account.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "microdeposit_type",
						"title": "Microdeposit Type",
						"type": "`$STRING`",
						"short": "The type of microdeposit verification required for this bank account.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"list": map[string]any{
								"type": "`$STRING`",
							},
							"load": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "routing_number",
						"title": "Routing Number",
						"type": "`$STRING`",
						"req": true,
						"short": "Must be a <a href=\"https://www.frbservices.org/index.html\" target=\"_blank\">valid US routing number</a>.",
					},
					map[string]any{
						"name": "signatory",
						"title": "Signatory",
						"type": "`$STRING`",
						"req": true,
						"short": "The signatory associated with your account.",
					},
					map[string]any{
						"name": "signature_url",
						"title": "Signature Url",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "The state associated with your home bank account.",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$BOOLEAN`",
						"short": "A bank account must be verified before a check can be created.",
					},
					map[string]any{
						"name": "zipcode",
						"title": "Zipcode",
						"type": "`$STRING`",
						"short": "The zipcode associated with your home bank account.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "bank_account",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bank_accounts/{bank_id}/verify",
								"segments": []any{
									map[string]any{
										"lit": "bank_accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "verify",
									},
								},
								"parts": []any{
									"bank_accounts",
									"{id}",
									"verify",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bank_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bank_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "verify",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bank_accounts",
								"segments": []any{
									map[string]any{
										"lit": "bank_accounts",
									},
								},
								"parts": []any{
									"bank_accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bank_accounts",
								"segments": []any{
									map[string]any{
										"lit": "bank_accounts",
									},
								},
								"parts": []any{
									"bank_accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"date_created",
										"include",
										"limit",
										"metadata",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/bank_accounts/{bank_id}",
								"segments": []any{
									map[string]any{
										"lit": "bank_accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"bank_accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bank_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bank_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bank_deletion": map[string]any{
				"fields": []any{},
				"name": "bank_deletion",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/bank_accounts/{bank_id}",
								"segments": []any{
									map[string]any{
										"lit": "bank_accounts",
									},
									map[string]any{
										"var": "bank_id",
									},
								},
								"parts": []any{
									"bank_accounts",
									"{bank_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "bank_id",
											"orig": "bank_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bank_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.bank_account",
						},
					},
				},
			},
			"billing_group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the billing group.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `bg_`.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the billing group.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "billing_group",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/billing_groups/{bg_id}",
								"segments": []any{
									map[string]any{
										"lit": "billing_groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"billing_groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bg_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bg_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/billing_groups",
								"segments": []any{
									map[string]any{
										"lit": "billing_groups",
									},
								},
								"parts": []any{
									"billing_groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/billing_groups",
								"segments": []any{
									map[string]any{
										"lit": "billing_groups",
									},
								},
								"parts": []any{
									"billing_groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_modified",
											"orig": "date_modified",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date_created",
										"date_modified",
										"include",
										"limit",
										"offset",
										"sort_by",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/billing_groups/{bg_id}",
								"segments": []any{
									map[string]any{
										"lit": "billing_groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"billing_groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"bg_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "bg_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"booklet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fsc",
						"title": "Fsc",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mail_type",
						"title": "Mail Type",
						"type": "`$STRING`",
						"short": "A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is less predictable and takes longer to delive…",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
						"short": "You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pages",
						"title": "Pages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production.",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_material",
						"title": "Source Material",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
						"short": "An array of tracking events ordered by ascending `time`.",
					},
					map[string]any{
						"name": "tracking_number",
						"title": "Tracking Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "booklet",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/booklets",
								"segments": []any{
									map[string]any{
										"lit": "booklets",
									},
								},
								"parts": []any{
									"booklets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/booklets",
								"segments": []any{
									map[string]any{
										"lit": "booklets",
									},
								},
								"parts": []any{
									"booklets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"campaign_id",
										"date_created",
										"include",
										"limit",
										"mail_type",
										"metadata",
										"send_date",
										"sort_by",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/booklets/{booklet_id}",
								"segments": []any{
									map[string]any{
										"lit": "booklets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"booklets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"booklet_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "booklet_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/booklets/{booklet_id}",
								"segments": []any{
									map[string]any{
										"lit": "booklets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"booklets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"booklet_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "booklet_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"buckslip": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_id",
						"title": "Account Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "allocated_quantity",
						"title": "Allocated Quantity",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The allocated quantity of buckslips.",
					},
					map[string]any{
						"name": "auto_reorder",
						"title": "Auto Reorder",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "True if the buckslips should be auto-reordered.",
					},
					map[string]any{
						"name": "available_quantity",
						"title": "Available Quantity",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The available quantity of buckslips.",
					},
					map[string]any{
						"name": "back_original_url",
						"title": "Back Original Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The original URL of the back template.",
						"format": "uri",
					},
					map[string]any{
						"name": "buckslip_orders",
						"title": "Buckslip Orders",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "An array of buckslip orders that are associated with the buckslip.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the buckslip.",
					},
					map[string]any{
						"name": "finish",
						"title": "Finish",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "front_original_url",
						"title": "Front Original Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The original URL of the front template.",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `bck_`.",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "onhand_quantity",
						"title": "Onhand Quantity",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The onhand quantity of buckslips.",
					},
					map[string]any{
						"name": "pending_quantity",
						"title": "Pending Quantity",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The pending quantity of buckslips.",
					},
					map[string]any{
						"name": "projected_quantity",
						"title": "Projected Quantity",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The sum of pending and onhand quantities of buckslips.",
					},
					map[string]any{
						"name": "raw_url",
						"title": "Raw Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The raw URL of the buckslip.",
						"format": "uri",
					},
					map[string]any{
						"name": "reorder_quantity",
						"title": "Reorder Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$NUMBER`",
							},
						},
						"short": "The number of buckslips to be reordered.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
						"short": "The size of the buckslip",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "stock",
						"title": "Stock",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "threshold_amount",
						"title": "Threshold Amount",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The threshold amount of the buckslip",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The signed link for the buckslip.",
						"format": "uri",
					},
					map[string]any{
						"name": "weight",
						"title": "Weight",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "buckslip",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/buckslips",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
								},
								"parts": []any{
									"buckslips",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/buckslips",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
								},
								"parts": []any{
									"buckslips",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"include",
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/buckslips/{buckslip_id}",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"buckslips",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"buckslip_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "buckslip_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/buckslips/{buckslip_id}",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"buckslips",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"buckslip_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "buckslip_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/buckslips/{buckslip_id}",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"buckslips",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"buckslip_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "buckslip_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"buckslip_order": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "availability_date",
						"title": "Availability Date",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "buckslip_id",
						"title": "Buckslip Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `bck_`.",
					},
					map[string]any{
						"name": "cancelled_reason",
						"title": "Cancelled Reason",
						"type": "`$STRING`",
						"short": "The reason for cancellation.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "expected_availability_date",
						"title": "Expected Availability Date",
						"type": "`$STRING`",
						"short": "The fixed deadline for the buckslips to be printed.",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `bo_`.",
					},
					map[string]any{
						"name": "inventory",
						"title": "Inventory",
						"type": "`$NUMBER`",
						"short": "The inventory of the buckslip order.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "quantity",
						"title": "Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The quantity of buckslips in the order (minimum 5,000).",
					},
					map[string]any{
						"name": "quantity_ordered",
						"title": "Quantity Ordered",
						"type": "`$NUMBER`",
						"short": "The quantity of buckslips ordered.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The status of the buckslip order.",
					},
					map[string]any{
						"name": "unit_price",
						"title": "Unit Price",
						"type": "`$NUMBER`",
						"short": "The unit price for the buckslip order.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "buckslip_order",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/buckslips/{buckslip_id}/orders",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "orders",
									},
								},
								"parts": []any{
									"buckslips",
									"{id}",
									"orders",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"buckslip_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "buckslip_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/buckslips/{buckslip_id}/orders",
								"segments": []any{
									map[string]any{
										"lit": "buckslips",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "orders",
									},
								},
								"parts": []any{
									"buckslips",
									"{id}",
									"orders",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"buckslip_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "buckslip_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"campaign": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auto_cancel_if_ncoa",
						"title": "Auto Cancel If Ncoa",
						"type": "`$BOOLEAN`",
						"short": "Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.",
					},
					map[string]any{
						"name": "billing_group_id",
						"title": "Billing Group Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `bg_`.",
					},
					map[string]any{
						"name": "cancel_window_campaign_minutes",
						"title": "Cancel Window Campaign Minutes",
						"type": "`$INTEGER`",
						"short": "A window, in minutes, within which the campaign can be canceled.",
					},
					map[string]any{
						"name": "creatives",
						"title": "Creatives",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of creatives that have been associated with this campaign.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier prefixed with `cmp_`.",
					},
					map[string]any{
						"name": "is_draft",
						"title": "Is Draft",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether or not the campaign is still a draft.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Name of the campaign.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "print_speed",
						"title": "Print Speed",
						"type": "`$STRING`",
						"short": "A string designating the mail speed type: * `core` - 2 production business days",
					},
					map[string]any{
						"name": "schedule_type",
						"title": "Schedule Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "How the campaign should be scheduled.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
						"short": "If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.",
						"format": "date-time",
					},
					map[string]any{
						"name": "target_delivery_date",
						"title": "Target Delivery Date",
						"type": "`$STRING`",
						"short": "If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.",
						"format": "date-time",
					},
					map[string]any{
						"name": "uploads",
						"title": "Uploads",
						"type": "`$ARRAY`",
						"req": true,
						"short": "A single-element array containing the upload object that is assocated with this campaign.",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The use type for each mailpiece.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "campaign",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/campaigns/{cmp_id}/send",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "send",
									},
								},
								"parts": []any{
									"campaigns",
									"{id}",
									"send",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"cmp_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "cmp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "send",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/campaigns",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
								},
								"parts": []any{
									"campaigns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_lang_output",
											"orig": "x-lang-output",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"x_lang_output",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
								},
								"parts": []any{
									"campaigns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"include",
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/campaigns/{cmp_id}",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"campaigns",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"cmp_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "cmp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/campaigns/{cmp_id}",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"campaigns",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"cmp_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "cmp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/campaigns/{cmp_id}",
								"segments": []any{
									map[string]any{
										"lit": "campaigns",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"campaigns",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"cmp_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "cmp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_id",
						"title": "Account Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "auto_reorder",
						"title": "Auto Reorder",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "True if the cards should be auto-reordered.",
					},
					map[string]any{
						"name": "available_quantity",
						"title": "Available Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The available quantity of cards.",
					},
					map[string]any{
						"name": "back_original_url",
						"title": "Back Original Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The original URL of the back template.",
						"format": "uri",
					},
					map[string]any{
						"name": "countries",
						"title": "Countries",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the card.",
					},
					map[string]any{
						"name": "front_original_url",
						"title": "Front Original Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The original URL of the front template.",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `card_`.",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "orientation",
						"title": "Orientation",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The orientation of the card.",
					},
					map[string]any{
						"name": "pending_quantity",
						"title": "Pending Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The pending quantity of cards.",
					},
					map[string]any{
						"name": "raw_url",
						"title": "Raw Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The raw URL of the card.",
						"format": "uri",
					},
					map[string]any{
						"name": "reorder_quantity",
						"title": "Reorder Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The number of cards to be reordered.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
						"short": "The size of the card",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "threshold_amount",
						"title": "Threshold Amount",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The threshold amount of the card",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The signed link for the card.",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/cards/{card_id}",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/cards",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
								},
								"parts": []any{
									"cards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
								},
								"parts": []any{
									"cards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"include",
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{card_id}",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/cards/{card_id}",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"card_order": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "availability_date",
						"title": "Availability Date",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "cancelled_reason",
						"title": "Cancelled Reason",
						"type": "`$STRING`",
						"short": "The reason for cancellation.",
					},
					map[string]any{
						"name": "card_id",
						"title": "Card Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `card_`.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "expected_availability_date",
						"title": "Expected Availability Date",
						"type": "`$STRING`",
						"short": "The fixed deadline for the cards to be printed.",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `co_`.",
					},
					map[string]any{
						"name": "inventory",
						"title": "Inventory",
						"type": "`$NUMBER`",
						"short": "The inventory of the card order.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "quantity",
						"title": "Quantity",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The quantity of cards in the order (minimum 10,000).",
					},
					map[string]any{
						"name": "quantity_ordered",
						"title": "Quantity Ordered",
						"type": "`$NUMBER`",
						"short": "The quantity of cards ordered",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The status of the card order.",
					},
					map[string]any{
						"name": "unit_price",
						"title": "Unit Price",
						"type": "`$NUMBER`",
						"short": "The unit price for the card order.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "card_order",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/cards/{card_id}/orders",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "orders",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
									"orders",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cards/{card_id}/orders",
								"segments": []any{
									map[string]any{
										"lit": "cards",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "orders",
									},
								},
								"parts": []any{
									"cards",
									"{id}",
									"orders",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"card_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "card_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"check": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"title": "Amount",
						"type": "`$NUMBER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$NUMBER`",
							},
						},
						"short": "The payment amount to be sent in US dollars.",
						"format": "float",
					},
					map[string]any{
						"name": "attachment_template_id",
						"title": "Attachment Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "attachment_template_version_id",
						"title": "Attachment Template Version Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bank_account",
						"title": "Bank Account",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "check_bottom_template_id",
						"title": "Check Bottom Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "check_bottom_template_version_id",
						"title": "Check Bottom Template Version Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "check_number",
						"title": "Check Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
						"short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
						"format": "date",
					},
					map[string]any{
						"name": "failure_reason",
						"title": "Failure Reason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `chk_`.",
					},
					map[string]any{
						"name": "mail_type",
						"title": "Mail Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "memo",
						"title": "Memo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress.",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
						"short": "An array of tracking_event objects ordered by ascending `time`.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A [signed link](#section/Asset-URLs) served over HTTPS.",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "TThe use type for each mailpiece.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "check",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/checks",
								"segments": []any{
									map[string]any{
										"lit": "checks",
									},
								},
								"parts": []any{
									"checks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/checks",
								"segments": []any{
									map[string]any{
										"lit": "checks",
									},
								},
								"parts": []any{
									"checks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "scheduled",
											"orig": "scheduled",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"date_created",
										"include",
										"limit",
										"mail_type",
										"metadata",
										"scheduled",
										"send_date",
										"sort_by",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/checks/{chk_id}",
								"segments": []any{
									map[string]any{
										"lit": "checks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"checks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"chk_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "chk_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/checks/{chk_id}",
								"segments": []any{
									map[string]any{
										"lit": "checks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"checks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"chk_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "chk_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"creative": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "campaigns",
						"title": "Campaigns",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "Array of campaigns associated with the creative ID",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Must either be an address ID or an inline object with correct address parameters.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `crv_`.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "resource_type",
						"title": "Resource Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template_preview_urls",
						"title": "Template Preview Urls",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
						"short": "Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets.",
					},
					map[string]any{
						"name": "template_previews",
						"title": "Template Previews",
						"type": "`$ARRAY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ARRAY`",
							},
						},
						"short": "A list of template preview objects if the creative uses HTML template(s) as artwork asset(s).",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "creative",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/creatives",
								"segments": []any{
									map[string]any{
										"lit": "creatives",
									},
								},
								"parts": []any{
									"creatives",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_lang_output",
											"orig": "x-lang-output",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"x_lang_output",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/creatives/{crv_id}",
								"segments": []any{
									map[string]any{
										"lit": "creatives",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"creatives",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"crv_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "crv_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "crv_2a3b096c409b32c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/creatives/{crv_id}",
								"segments": []any{
									map[string]any{
										"lit": "creatives",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"creatives",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"crv_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "crv_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "crv_2a3b096c409b32c",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The date and time the domain was created.",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The registered domain/hostname.",
					},
					map[string]any{
						"name": "error_redirect_link",
						"title": "Error Redirect Link",
						"type": "`$STRING`",
						"short": "URL to redirect customers if a short link is broken or inactive.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for a domain.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The configuration status of the domain.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "The date and time the domain was last updated.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/domains",
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domains",
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
								},
								"parts": []any{
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"limit",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/domains/{domain_id}",
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"domains",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "domain_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/domains/{domain_id}",
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"domains",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "domain_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"identity_validation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_line",
						"title": "Last Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primary_line",
						"title": "Primary Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recipient",
						"title": "Recipient",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "secondary_line",
						"title": "Secondary Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "urbanization",
						"title": "Urbanization",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "identity_validation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/identity_validation",
								"segments": []any{
									map[string]any{
										"lit": "identity_validation",
									},
								},
								"parts": []any{
									"identity_validation",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"intl_verification": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addresses",
						"title": "Addresses",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "components",
						"title": "Components",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coverage",
						"title": "Coverage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deliverability",
						"title": "Deliverability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates whether any errors occurred during the verification process.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_line",
						"title": "Last Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primary_line",
						"title": "Primary Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "recipient",
						"title": "Recipient",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "secondary_line",
						"title": "Secondary Line",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "intl_verification",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/intl_verifications",
								"segments": []any{
									map[string]any{
										"lit": "intl_verifications",
									},
								},
								"parts": []any{
									"intl_verifications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_lang_output",
											"orig": "x-lang-output",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"x_lang_output",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bulk/intl_verifications",
								"segments": []any{
									map[string]any{
										"lit": "bulk",
									},
									map[string]any{
										"lit": "intl_verifications",
									},
								},
								"parts": []any{
									"bulk",
									"intl_verifications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"letter": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address_placement",
						"title": "Address Placement",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cards",
						"title": "Cards",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "custom_envelope",
						"title": "Custom Envelope",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "double_sided",
						"title": "Double Sided",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "extra_service",
						"title": "Extra Service",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "fsc",
						"title": "Fsc",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mail_type",
						"title": "Mail Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "perforated_page",
						"title": "Perforated Page",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "return_envelope",
						"title": "Return Envelope",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "template_version_id",
						"title": "Template Version Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tracking_number",
						"title": "Tracking Number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "letter",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/letters",
								"segments": []any{
									map[string]any{
										"lit": "letters",
									},
								},
								"parts": []any{
									"letters",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
										map[string]any{
											"name": "lob_version",
											"orig": "Lob-Version",
											"type": "`$STRING`",
											"kind": "header",
											"example": "2024-01-01",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
										"lob_version",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/letters",
								"segments": []any{
									map[string]any{
										"lit": "letters",
									},
								},
								"parts": []any{
									"letters",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "color",
											"orig": "color",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "scheduled",
											"orig": "scheduled",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/letters/{ltr_id}",
								"segments": []any{
									map[string]any{
										"lit": "letters",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"letters",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ltr_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ltr_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/letters/{ltr_id}",
								"segments": []any{
									map[string]any{
										"lit": "letters",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"letters",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ltr_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ltr_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"link": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "The date and time the link was created.",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"short": "The registered domain to be used for the short URL.",
					},
					map[string]any{
						"name": "domain_id",
						"title": "Domain Id",
						"type": "`$STRING`",
						"short": "A unique identifier for the registered domain.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `lnk_`.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "redirect_link",
						"title": "Redirect Link",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The original target URL.",
					},
					map[string]any{
						"name": "short_link",
						"title": "Short Link",
						"type": "`$STRING`",
						"short": "The shortened URL for the associated original URL.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"short": "The unique path for the shortened URL, if empty a unique path will be used.",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "The title of the URL.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "The date and time the link was last updated.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "link",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/links",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
								},
								"parts": []any{
									"links",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/links",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
								},
								"parts": []any{
									"links",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "domain_id",
											"orig": "domain_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"campaign_id",
										"domain_id",
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/links/{link_id}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"link_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/links/{link_id}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"link_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/links/{link_id}",
								"segments": []any{
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"links",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"link_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "link_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lob_credits_balance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "balance",
						"title": "Balance",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Account's current balance of Lob Credits.",
					},
				},
				"name": "lob_credits_balance",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"postcard": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "back_template_id",
						"title": "Back Template Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The unique ID of the HTML template used for the back of the postcard.",
					},
					map[string]any{
						"name": "back_template_version_id",
						"title": "Back Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the back of the postcard.",
					},
					map[string]any{
						"name": "campaign_id",
						"title": "Campaign Id",
						"type": "`$STRING`",
						"short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`.",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
						"short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
						"format": "date",
					},
					map[string]any{
						"name": "failure_reason",
						"title": "Failure Reason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "front_template_id",
						"title": "Front Template Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The unique ID of the HTML template used for the front of the postcard.",
					},
					map[string]any{
						"name": "front_template_version_id",
						"title": "Front Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the front of the postcard.",
					},
					map[string]any{
						"name": "fsc",
						"title": "Fsc",
						"type": "`$BOOLEAN`",
						"short": "This is in beta.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `psc_`.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress.",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
						"short": "An array of tracking_event objects ordered by ascending `time`.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A [signed link](#section/Asset-URLs) served over HTTPS.",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
						"short": "The use type for each mailpiece.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "postcard",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/postcards",
								"segments": []any{
									map[string]any{
										"lit": "postcards",
									},
								},
								"parts": []any{
									"postcards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/postcards",
								"segments": []any{
									map[string]any{
										"lit": "postcards",
									},
								},
								"parts": []any{
									"postcards",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "scheduled",
											"orig": "scheduled",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/postcards/{psc_id}",
								"segments": []any{
									map[string]any{
										"lit": "postcards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"postcards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"psc_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "psc_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/postcards/{psc_id}",
								"segments": []any{
									map[string]any{
										"lit": "postcards",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"postcards",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"psc_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "psc_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"qr_code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "number_of_scans",
						"title": "Number Of Scans",
						"type": "`$NUMBER`",
						"short": "Number of times the QR Code associated with this mail piece was scanned.",
					},
					map[string]any{
						"name": "resource_id",
						"title": "Resource Id",
						"type": "`$STRING`",
						"short": "Unique identifier for each mail piece.",
					},
					map[string]any{
						"name": "scans",
						"title": "Scans",
						"type": "`$ARRAY`",
						"short": "Detailed scan information associated with each mail piece.",
					},
				},
				"name": "qr_code",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/qr_code_analytics",
								"segments": []any{
									map[string]any{
										"lit": "qr_code_analytics",
									},
								},
								"parts": []any{
									"qr_code_analytics",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "resource_id",
											"orig": "resource_ids",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "scanned",
											"orig": "scanned",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date_created",
										"include",
										"limit",
										"offset",
										"resource_id",
										"scanned",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"resource_proof": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"short": "Errors encountered during processing.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `res_prf_`.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "resource_type",
						"title": "Resource Type",
						"type": "`$STRING`",
						"short": "The type of resource to generate a proof for.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "The processing status of the resource proof.",
					},
					map[string]any{
						"name": "template_id",
						"title": "Template Id",
						"type": "`$STRING`",
						"short": "The template ID associated with the resource proof, if any.",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
						"short": "Thumbnail images of the resource proof.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "A URL to the resource proof PDF.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "resource_proof",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/resource_proofs",
								"segments": []any{
									map[string]any{
										"lit": "resource_proofs",
									},
								},
								"parts": []any{
									"resource_proofs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/resource_proofs/{res_prf_id}",
								"segments": []any{
									map[string]any{
										"lit": "resource_proofs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"resource_proofs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"res_prf_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "res_prf_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/resource_proofs/{res_prf_id}",
								"segments": []any{
									map[string]any{
										"lit": "resource_proofs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"resource_proofs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"res_prf_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "res_prf_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"response": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_id",
						"title": "Account Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Your Lob account id.",
					},
					map[string]any{
						"name": "brand_name",
						"title": "Brand Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "campaign_code",
						"title": "Campaign Code",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The campaign code associated with the Informed Delivery campaign.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
							"update": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"short": "Whether the resource has been deleted.",
					},
					map[string]any{
						"name": "end_date",
						"title": "End Date",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A timestamp in ISO 8601 format of the date the campaign ends.",
						"format": "date-time",
					},
					map[string]any{
						"name": "end_serial",
						"title": "End Serial",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
							"update": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The last serial number in the range of serial numbers for this campaign.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `infd_`.",
					},
					map[string]any{
						"name": "lob_campaign_id",
						"title": "Lob Campaign Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The mode of the Informed Delivery campaign.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is the resource type.",
					},
					map[string]any{
						"name": "quantity",
						"title": "Quantity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "representative_image_s3_link",
						"title": "Representative Image S3 Link",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A URL link to the campaigns representative image.",
					},
					map[string]any{
						"name": "ride_along_image_s3_link",
						"title": "Ride Along Image S3 Link",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A URL link to the campaigns ride along image.",
					},
					map[string]any{
						"name": "ride_along_url",
						"title": "Ride Along Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "service_request_number",
						"title": "Service Request Number",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The USPS promotion service request number used to create this campaign (if there was one used).",
					},
					map[string]any{
						"name": "start_date",
						"title": "Start Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start_serial",
						"title": "Start Serial",
						"type": "`$INTEGER`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$INTEGER`",
							},
							"update": map[string]any{
								"type": "`$INTEGER`",
							},
						},
						"short": "The first serial number in the range of serial numbers for this campaign.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "usps_campaign_id",
						"title": "Usps Campaign Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A numberical string up to 12 characters long.",
					},
					map[string]any{
						"name": "usps_title",
						"title": "Usps Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "response",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/informed_delivery_campaigns",
								"segments": []any{
									map[string]any{
										"lit": "informed_delivery_campaigns",
									},
								},
								"parts": []any{
									"informed_delivery_campaigns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/informed_delivery_campaigns",
								"segments": []any{
									map[string]any{
										"lit": "informed_delivery_campaigns",
									},
								},
								"parts": []any{
									"informed_delivery_campaigns",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/informed_delivery_campaigns/{usps_campaign_id}",
								"segments": []any{
									map[string]any{
										"lit": "informed_delivery_campaigns",
									},
									map[string]any{
										"var": "usps_campaign_id",
									},
								},
								"parts": []any{
									"informed_delivery_campaigns",
									"{usps_campaign_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "usps_campaign_id",
											"orig": "usps_campaign_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1200772869",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"usps_campaign_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/informed_delivery_campaigns/{usps_campaign_id}",
								"segments": []any{
									map[string]any{
										"lit": "informed_delivery_campaigns",
									},
									map[string]any{
										"var": "usps_campaign_id",
									},
								},
								"parts": []any{
									"informed_delivery_campaigns",
									"{usps_campaign_id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "usps_campaign_id",
											"orig": "usps_campaign_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "1200772869",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"usps_campaign_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reverse_geocode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addresses",
						"title": "Addresses",
						"type": "`$ARRAY`",
						"short": "list of addresses",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `us_reverse_geocode_`.",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"req": true,
						"short": "A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location.",
						"format": "float",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"req": true,
						"short": "A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location.",
						"format": "float",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "reverse_geocode",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/us_reverse_geocode_lookups",
								"segments": []any{
									map[string]any{
										"lit": "us_reverse_geocode_lookups",
									},
								},
								"parts": []any{
									"us_reverse_geocode_lookups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 5,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"size",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"self_mailer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "campaign_id",
						"title": "Campaign Id",
						"type": "`$STRING`",
						"short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`.",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
						"short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
						"format": "date",
					},
					map[string]any{
						"name": "failure_reason",
						"title": "Failure Reason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "fsc",
						"title": "Fsc",
						"type": "`$BOOLEAN`",
						"short": "This is in beta.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `sfm_`.",
					},
					map[string]any{
						"name": "inside_template_id",
						"title": "Inside Template Id",
						"type": "`$STRING`",
						"short": "The unique ID of the HTML template used for the inside of the self mailer.",
					},
					map[string]any{
						"name": "inside_template_version_id",
						"title": "Inside Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the inside of the self mailer.",
					},
					map[string]any{
						"name": "mail_type",
						"title": "Mail Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "outside_template_id",
						"title": "Outside Template Id",
						"type": "`$STRING`",
						"short": "The unique ID of the HTML template used for the outside of the self mailer.",
					},
					map[string]any{
						"name": "outside_template_version_id",
						"title": "Outside Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the outside of the self mailer.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress.",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
						"short": "An array of certified tracking events ordered by ascending `time`.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A [signed link](#section/Asset-URLs) served over HTTPS.",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The use type for each mailpiece.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "self_mailer",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/self_mailers",
								"segments": []any{
									map[string]any{
										"lit": "self_mailers",
									},
								},
								"parts": []any{
									"self_mailers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/self_mailers",
								"segments": []any{
									map[string]any{
										"lit": "self_mailers",
									},
								},
								"parts": []any{
									"self_mailers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "scheduled",
											"orig": "scheduled",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/self_mailers/{sfm_id}",
								"segments": []any{
									map[string]any{
										"lit": "self_mailers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"self_mailers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"sfm_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "sfm_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/self_mailers/{sfm_id}",
								"segments": []any{
									map[string]any{
										"lit": "self_mailers",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"self_mailers",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"sfm_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "sfm_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"snap_pack": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "campaign_id",
						"title": "Campaign Id",
						"type": "`$STRING`",
						"short": "Denotes resources created by the provided campaign id, prefixed with `cmp_`.",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "color",
						"title": "Color",
						"type": "`$BOOLEAN`",
						"short": "Set this key to `true` if you would like to print in color.",
					},
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expected_delivery_date",
						"title": "Expected Delivery Date",
						"type": "`$STRING`",
						"short": "A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.",
						"format": "date",
					},
					map[string]any{
						"name": "failure_reason",
						"title": "Failure Reason",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "fsc",
						"title": "Fsc",
						"type": "`$BOOLEAN`",
						"short": "Contact support@lob.com or your account contact to learn more.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Unique identifier prefixed with `ord_`.",
					},
					map[string]any{
						"name": "inside_template_id",
						"title": "Inside Template Id",
						"type": "`$STRING`",
						"short": "The unique ID of the HTML template used for the inside of the snap pack.",
					},
					map[string]any{
						"name": "inside_template_version_id",
						"title": "Inside Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the inside of the snap pack.",
					},
					map[string]any{
						"name": "mail_type",
						"title": "Mail Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "outside_template_id",
						"title": "Outside Template Id",
						"type": "`$STRING`",
						"short": "The unique ID of the HTML template used for the outside of the snap pack.",
					},
					map[string]any{
						"name": "outside_template_version_id",
						"title": "Outside Template Version Id",
						"type": "`$STRING`",
						"short": "The unique ID of the specific version of the HTML template used for the outside of the snap pack.",
					},
					map[string]any{
						"name": "send_date",
						"title": "Send Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sla",
						"title": "Sla",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "A string describing the PDF render status: * `processed` - the rendering process is currently in progress.",
					},
					map[string]any{
						"name": "thumbnails",
						"title": "Thumbnails",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$OBJECT`",
							},
						},
					},
					map[string]any{
						"name": "tracking_events",
						"title": "Tracking Events",
						"type": "`$ARRAY`",
						"short": "An array of tracking events ordered by ascending `time`.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A [signed link](#section/Asset-URLs) served over HTTPS.",
					},
					map[string]any{
						"name": "use_type",
						"title": "Use Type",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The use type for each mailpiece.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "snap_pack",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/snap_packs",
								"segments": []any{
									map[string]any{
										"lit": "snap_packs",
									},
								},
								"parts": []any{
									"snap_packs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "Idempotency-Key",
											"type": "`$STRING`",
											"kind": "header",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
									"query": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "query",
											"example": "026e7634-24d7-486c-a0bb-4a17fd0eebc5",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/snap_packs",
								"segments": []any{
									map[string]any{
										"lit": "snap_packs",
									},
								},
								"parts": []any{
									"snap_packs",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "campaign_id",
											"orig": "campaign_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "mail_type",
											"orig": "mail_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "usps_first_class",
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "send_date",
											"orig": "send_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"campaign_id",
										"date_created",
										"include",
										"limit",
										"mail_type",
										"metadata",
										"send_date",
										"sort_by",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/snap_packs/{snap_pack_id}",
								"segments": []any{
									map[string]any{
										"lit": "snap_packs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"snap_packs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"snap_pack_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "snap_pack_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/snap_packs/{snap_pack_id}",
								"segments": []any{
									map[string]any{
										"lit": "snap_packs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"snap_packs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"snap_pack_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "snap_pack_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$STRING`",
						"short": "The engine used to combine HTML template with merge variables.",
					},
					map[string]any{
						"name": "html",
						"title": "Html",
						"type": "`$STRING`",
						"req": true,
						"short": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier prefixed with `tmpl_`.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"short": "Use metadata to store custom information for tagging and labeling back to your internal systems.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "published_version",
						"title": "Published Version",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
					},
					map[string]any{
						"name": "required_vars",
						"title": "Required Vars",
						"type": "`$ARRAY`",
						"short": "An array of required variables to be used in a template.",
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "template",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{tmpl_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
								},
								"parts": []any{
									"templates",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "metadata",
											"orig": "metadata",
											"type": "`$OBJECT`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"date_created",
										"include",
										"limit",
										"metadata",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{tmpl_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{tmpl_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"template_version": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date_created",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "date_modified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the resource was last modified.",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"short": "Only returned if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "An internal description that identifies this resource.",
					},
					map[string]any{
						"name": "engine",
						"title": "Engine",
						"type": "`$STRING`",
						"short": "The engine used to combine HTML template with merge variables.",
					},
					map[string]any{
						"name": "html",
						"title": "Html",
						"type": "`$STRING`",
						"req": true,
						"short": "An HTML string of less than 100,000 characters to be used as the `published_version` of this template.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier prefixed with `vrsn_`.",
					},
					map[string]any{
						"name": "merge_variables",
						"title": "Merge Variables",
						"type": "`$OBJECT`",
						"short": "Object representing the keys of every merge variable present in the template.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
							"load": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "required_vars",
						"title": "Required Vars",
						"type": "`$ARRAY`",
						"short": "An array of required variables to be used in a template.",
					},
					map[string]any{
						"name": "suggest_json_editor",
						"title": "Suggest Json Editor",
						"type": "`$BOOLEAN`",
						"short": "Used by frontend, true if the template uses advanced features.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "template_version",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"versions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "template_id",
										"vrsn_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vrsn_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "template_id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"template_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/templates/{tmpl_id}/versions",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{tmpl_id}/versions",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"templates",
									"{id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "before/after",
											"orig": "before/after",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_created",
											"orig": "date_created",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "include",
											"orig": "include",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before/after",
										"date_created",
										"id",
										"include",
										"limit",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"versions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "template_id",
										"vrsn_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "vrsn_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "template_id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"template_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
			"template_version_deletion": map[string]any{
				"fields": []any{},
				"name": "template_version_deletion",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/templates/{tmpl_id}/versions/{vrsn_id}",
								"segments": []any{
									map[string]any{
										"lit": "templates",
									},
									map[string]any{
										"var": "template_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "vrsn_id",
									},
								},
								"parts": []any{
									"templates",
									"{template_id}",
									"versions",
									"{vrsn_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tmpl_id": "template_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "template_id",
											"orig": "tmpl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "vrsn_id",
											"orig": "vrsn_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"template_id",
										"vrsn_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.template",
						},
					},
				},
			},
			"upload": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accountId",
						"title": "Account Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Account ID that made the request",
					},
					map[string]any{
						"name": "bytesProcessed",
						"title": "Bytes Processed",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of bytes processed in your CSV",
					},
					map[string]any{
						"name": "campaignId",
						"title": "Campaign Id",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "dateCreated",
						"title": "Date Created",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the export was created",
						"format": "date-time",
					},
					map[string]any{
						"name": "dateModified",
						"title": "Date Modified",
						"type": "`$STRING`",
						"req": true,
						"short": "A timestamp in ISO 8601 format of the date the export was last modified",
						"format": "date-time",
					},
					map[string]any{
						"name": "deleted",
						"title": "Deleted",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Returns as `true` if the resource has been successfully deleted.",
					},
					map[string]any{
						"name": "failedMailpieces",
						"title": "Failed Mailpieces",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of mailpieces that failed to create",
					},
					map[string]any{
						"name": "failuresUrl",
						"title": "Failures Url",
						"type": "`$STRING`",
						"short": "Url where your campaign mailpiece failures can be retrieved",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier prefixed with `ex_`.",
					},
					map[string]any{
						"name": "mergeVariableColumnMapping",
						"title": "Merge Variable Column Mapping",
						"type": "`$OBJECT`",
						"short": "test",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The list of column headers in your file as an array that you want as metadata associated with each mailpiece.",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
						"req": true,
						"short": "The environment in which the mailpieces were created.",
					},
					map[string]any{
						"name": "optionalAddressColumnMapping",
						"title": "Optional Address Column Mapping",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The mapping of column headers in your file to Lob-optional fields for the resource created.",
					},
					map[string]any{
						"name": "originalFilename",
						"title": "Original Filename",
						"type": "`$STRING`",
						"short": "Filename of the upload",
					},
					map[string]any{
						"name": "requiredAddressColumnMapping",
						"title": "Required Address Column Mapping",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The mapping of column headers in your file to Lob-required fields for the resource created.",
					},
					map[string]any{
						"name": "s3Url",
						"title": "S3 Url",
						"type": "`$STRING`",
						"req": true,
						"short": "The URL for the generated export file.",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "The state of the export file, which can be `in_progress`, `failed` or `succeeded`.",
					},
					map[string]any{
						"name": "totalMailpieces",
						"title": "Total Mailpieces",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Total number of recipients for the campaign",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The export file type, which can be `all`, `failures` or `successes`.",
					},
					map[string]any{
						"name": "uploadId",
						"title": "Upload Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier prefixed with `upl_`.",
					},
					map[string]any{
						"name": "validatedMailpieces",
						"title": "Validated Mailpieces",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of mailpieces that were successfully created",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "upload",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/uploads/{upl_id}/file",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "file",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
									"file",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "file",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/uploads",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
								},
								"parts": []any{
									"uploads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/uploads/{upl_id}/report",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "report",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
									"report",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "report",
									"exist": []any{
										"id",
										"limit",
										"offset",
										"status",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/uploads",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
								},
								"parts": []any{
									"uploads",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "campaign_id",
											"orig": "campaignId",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"campaign_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/uploads/{upl_id}/exports/{ex_id}",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "exports",
									},
									map[string]any{
										"var": "ex_id",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
									"exports",
									"{ex_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ex_id",
											"orig": "ex_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ex_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/uploads/{upl_id}",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/uploads/{upl_id}",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/uploads/{upl_id}",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"upload_create_export": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "exportId",
						"title": "Export Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "upload_create_export",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/uploads/{upl_id}/exports",
								"segments": []any{
									map[string]any{
										"lit": "uploads",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "exports",
									},
								},
								"parts": []any{
									"uploads",
									"{id}",
									"exports",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"upl_id": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "upl_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"us_autocompletion": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address_prefix",
						"title": "Address Prefix",
						"type": "`$STRING`",
						"req": true,
						"short": "Only accepts numbers and street names in an alphanumeric format.",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"short": "An optional city input used to filter suggestions.",
					},
					map[string]any{
						"name": "geo_ip_sort",
						"title": "Geo Ip Sort",
						"type": "`$BOOLEAN`",
						"short": "If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `us_auto_`.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "An optional state input used to filter suggestions.",
					},
					map[string]any{
						"name": "suggestions",
						"title": "Suggestions",
						"type": "`$ARRAY`",
						"short": "An array of objects representing suggested addresses.",
					},
					map[string]any{
						"name": "zip_code",
						"title": "Zip Code",
						"type": "`$STRING`",
						"short": "An optional ZIP Code input used to filter suggestions.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "us_autocompletion",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/us_autocompletions",
								"segments": []any{
									map[string]any{
										"lit": "us_autocompletions",
									},
								},
								"parts": []any{
									"us_autocompletions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "case",
											"orig": "case",
											"type": "`$STRING`",
											"kind": "query",
											"example": "upper",
										},
										map[string]any{
											"name": "valid_address",
											"orig": "valid_addresses",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"case",
										"valid_address",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"us_verification": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addresses",
						"title": "Addresses",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "components",
						"title": "Components",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A nested object containing a breakdown of each component of an address.",
					},
					map[string]any{
						"name": "deliverability",
						"title": "Deliverability",
						"type": "`$STRING`",
						"short": "Summarizes the deliverability of the `us_verification` object.",
					},
					map[string]any{
						"name": "deliverability_analysis",
						"title": "Deliverability Analysis",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A nested object containing a breakdown of the deliverability of an address.",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates whether any errors occurred during the verification process.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier prefixed with `us_ver_`.",
					},
					map[string]any{
						"name": "last_line",
						"title": "Last Line",
						"type": "`$STRING`",
						"short": "Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`)",
					},
					map[string]any{
						"name": "lob_confidence_score",
						"title": "Lob Confidence Score",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households.",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
						"short": "Value is resource type.",
					},
					map[string]any{
						"name": "primary_line",
						"title": "Primary Line",
						"type": "`$STRING`",
						"short": "The primary delivery line (usually the street address) of the address.",
					},
					map[string]any{
						"name": "recipient",
						"title": "Recipient",
						"type": "`$STRING`",
						"short": "The intended recipient, typically a person's or firm's name.",
					},
					map[string]any{
						"name": "secondary_line",
						"title": "Secondary Line",
						"type": "`$STRING`",
						"short": "The secondary delivery line of the address.",
					},
					map[string]any{
						"name": "urbanization",
						"title": "Urbanization",
						"type": "`$STRING`",
						"short": "Only present for addresses in Puerto Rico.",
					},
					map[string]any{
						"name": "valid_address",
						"title": "Valid Address",
						"type": "`$BOOLEAN`",
						"short": "This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "us_verification",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/bulk/us_verifications",
								"segments": []any{
									map[string]any{
										"lit": "bulk",
									},
									map[string]any{
										"lit": "us_verifications",
									},
								},
								"parts": []any{
									"bulk",
									"us_verifications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "case",
											"orig": "case",
											"type": "`$STRING`",
											"kind": "query",
											"example": "upper",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"case",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/us_verifications",
								"segments": []any{
									map[string]any{
										"lit": "us_verifications",
									},
								},
								"parts": []any{
									"us_verifications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "case",
											"orig": "case",
											"type": "`$STRING`",
											"kind": "query",
											"example": "upper",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"case",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"zip": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "zip_code",
						"title": "Zip Code",
						"type": "`$STRING`",
						"req": true,
						"short": "A 5-digit ZIP code.",
					},
				},
				"name": "zip",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/us_zip_lookups",
								"segments": []any{
									map[string]any{
										"lit": "us_zip_lookups",
									},
								},
								"parts": []any{
									"us_zip_lookups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
