# Lob Golang SDK



The Golang SDK for the Lob API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Address(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/lob-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/lob-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/lob-sdk/go=../lob-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/lob-sdk/go"
)

func main() {
    client := sdk.NewLobSDK(map[string]any{
        "apikey": os.Getenv("LOB_APIKEY"),
    })

    // List address records — the value is the array of records itself.
    addresss, err := client.Address(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range addresss.([]any) {
        fmt.Println(item)
    }

    // Load a single address — the value is the loaded record.
    address, err := client.Address(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(address)

    // Create a address.
    created, err := client.Address(nil).Create(map[string]any{"address_city": "example_address_city", "address_country": "example_address_country"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Remove a address.
    removed, err := client.Address(nil).Remove(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
addresss, err := client.Address(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = addresss
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

address, err := client.Address(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(address) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLobSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LOB_TEST_LIVE=TRUE
LOB_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewLobSDK

```go
func NewLobSDK(options map[string]any) *LobSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LobSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LobSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Address` | `(data map[string]any) LobEntity` | Create an Address entity instance. |
| `BankAccount` | `(data map[string]any) LobEntity` | Create a BankAccount entity instance. |
| `BankDeletion` | `(data map[string]any) LobEntity` | Create a BankDeletion entity instance. |
| `BillingGroup` | `(data map[string]any) LobEntity` | Create a BillingGroup entity instance. |
| `Booklet` | `(data map[string]any) LobEntity` | Create a Booklet entity instance. |
| `Buckslip` | `(data map[string]any) LobEntity` | Create a Buckslip entity instance. |
| `BuckslipOrder` | `(data map[string]any) LobEntity` | Create a BuckslipOrder entity instance. |
| `Campaign` | `(data map[string]any) LobEntity` | Create a Campaign entity instance. |
| `Card` | `(data map[string]any) LobEntity` | Create a Card entity instance. |
| `CardOrder` | `(data map[string]any) LobEntity` | Create a CardOrder entity instance. |
| `Check` | `(data map[string]any) LobEntity` | Create a Check entity instance. |
| `Creative` | `(data map[string]any) LobEntity` | Create a Creative entity instance. |
| `Domain` | `(data map[string]any) LobEntity` | Create a Domain entity instance. |
| `IdentityValidation` | `(data map[string]any) LobEntity` | Create an IdentityValidation entity instance. |
| `IntlVerification` | `(data map[string]any) LobEntity` | Create an IntlVerification entity instance. |
| `Letter` | `(data map[string]any) LobEntity` | Create a Letter entity instance. |
| `Link` | `(data map[string]any) LobEntity` | Create a Link entity instance. |
| `LobCreditsBalance` | `(data map[string]any) LobEntity` | Create a LobCreditsBalance entity instance. |
| `Postcard` | `(data map[string]any) LobEntity` | Create a Postcard entity instance. |
| `QrCode` | `(data map[string]any) LobEntity` | Create a QrCode entity instance. |
| `ResourceProof` | `(data map[string]any) LobEntity` | Create a ResourceProof entity instance. |
| `Response` | `(data map[string]any) LobEntity` | Create a Response entity instance. |
| `ReverseGeocode` | `(data map[string]any) LobEntity` | Create a ReverseGeocode entity instance. |
| `SelfMailer` | `(data map[string]any) LobEntity` | Create a SelfMailer entity instance. |
| `SnapPack` | `(data map[string]any) LobEntity` | Create a SnapPack entity instance. |
| `Template` | `(data map[string]any) LobEntity` | Create a Template entity instance. |
| `TemplateVersion` | `(data map[string]any) LobEntity` | Create a TemplateVersion entity instance. |
| `TemplateVersionDeletion` | `(data map[string]any) LobEntity` | Create a TemplateVersionDeletion entity instance. |
| `Upload` | `(data map[string]any) LobEntity` | Create an Upload entity instance. |
| `UploadCreateExport` | `(data map[string]any) LobEntity` | Create an UploadCreateExport entity instance. |
| `UsAutocompletion` | `(data map[string]any) LobEntity` | Create an UsAutocompletion entity instance. |
| `UsVerification` | `(data map[string]any) LobEntity` | Create an UsVerification entity instance. |
| `Zip` | `(data map[string]any) LobEntity` | Create a Zip entity instance. |

### Entity interface (LobEntity)

All entities implement the `LobEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    address, err := client.Address(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // address is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Address

| Field | Description |
| --- | --- |
| `"address_city"` |  |
| `"address_country"` |  |
| `"address_line1"` |  |
| `"address_state"` |  |
| `"address_zip"` |  |
| `"company"` |  |
| `"count"` | number of resources in a set |
| `"data"` | list of addresses |
| `"date_created"` |  |
| `"date_modified"` |  |
| `"description"` |  |
| `"email"` |  |
| `"id"` |  |
| `"metadata"` |  |
| `"name"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"phone"` |  |
| `"previous_url"` | Url of previous page of items in list. |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List, Load, Remove.

API path: `/addresses`

#### BankAccount

| Field | Description |
| --- | --- |
| `"account_number"` |  |
| `"account_type"` | The type of entity that holds the account. |
| `"bank_name"` | The name of the bank based on the provided routing number, e.g. |
| `"check_template"` | The check template used for printing. |
| `"city"` | The city associated with your home bank account. |
| `"count"` | number of resources in a set |
| `"data"` | list of bank_accounts |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | An internal description that identifies this resource. |
| `"fractional_routing_number"` | The fractional routing number for your home bank account. |
| `"id"` |  |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"microdeposit_type"` | The type of microdeposit verification required for this bank account. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"routing_number"` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `"signatory"` | The signatory associated with your account. |
| `"signature_url"` |  |
| `"state"` | The state associated with your home bank account. |
| `"total_count"` | Indicates the total number of records. |
| `"verified"` | A bank account must be verified before a check can be created. |
| `"zipcode"` | The zipcode associated with your home bank account. |

Operations: Create, List, Load.

API path: `/bank_accounts/{bank_id}/verify`

#### BankDeletion

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/bank_accounts/{bank_id}`

#### BillingGroup

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | list of billing_groups |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"description"` | Description of the billing group. |
| `"id"` | Unique identifier prefixed with `bg_`. |
| `"name"` | Name of the billing group. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List, Load.

API path: `/billing_groups/{bg_id}`

#### Booklet

| Field | Description |
| --- | --- |
| `"carrier"` |  |
| `"count"` | number of resources in a set |
| `"data"` | list of booklets |
| `"date_created"` |  |
| `"date_modified"` |  |
| `"description"` | An internal description that identifies this resource. |
| `"expected_delivery_date"` |  |
| `"from"` |  |
| `"fsc"` |  |
| `"id"` |  |
| `"mail_type"` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `"merge_variables"` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"pages"` |  |
| `"previous_url"` | Url of previous page of items in list. |
| `"send_date"` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `"size"` |  |
| `"sla"` |  |
| `"source_material"` |  |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` | An array of tracking events ordered by ascending `time`. |
| `"tracking_number"` |  |
| `"url"` |  |
| `"use_type"` |  |

Operations: Create, List, Load, Remove.

API path: `/booklets`

#### Buckslip

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"allocated_quantity"` | The allocated quantity of buckslips. |
| `"auto_reorder"` | True if the buckslips should be auto-reordered. |
| `"available_quantity"` | The available quantity of buckslips. |
| `"back_original_url"` | The original URL of the back template. |
| `"buckslip_orders"` | An array of buckslip orders that are associated with the buckslip. |
| `"count"` | number of resources in a set |
| `"data"` | list of buckslips |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | Description of the buckslip. |
| `"finish"` |  |
| `"front_original_url"` | The original URL of the front template. |
| `"id"` | Unique identifier prefixed with `bck_`. |
| `"mode"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"onhand_quantity"` | The onhand quantity of buckslips. |
| `"pending_quantity"` | The pending quantity of buckslips. |
| `"previous_url"` | Url of previous page of items in list. |
| `"projected_quantity"` | The sum of pending and onhand quantities of buckslips. |
| `"raw_url"` | The raw URL of the buckslip. |
| `"reorder_quantity"` | The number of buckslips to be reordered. |
| `"send_date"` |  |
| `"size"` | The size of the buckslip |
| `"status"` |  |
| `"stock"` |  |
| `"threshold_amount"` | The threshold amount of the buckslip |
| `"thumbnails"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"url"` | The signed link for the buckslip. |
| `"weight"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/buckslips`

#### BuckslipOrder

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | List of buckslip orders |
| `"id"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"quantity"` | The quantity of buckslips in the order (minimum 5,000). |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List.

API path: `/buckslips/{buckslip_id}/orders`

#### Campaign

| Field | Description |
| --- | --- |
| `"auto_cancel_if_ncoa"` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `"billing_group_id"` | Unique identifier prefixed with `bg_`. |
| `"cancel_window_campaign_minutes"` | A window, in minutes, within which the campaign can be canceled. |
| `"count"` | number of resources in a set |
| `"creatives"` | An array of creatives that have been associated with this campaign. |
| `"data"` | list of campaigns |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | An internal description that identifies this resource. |
| `"id"` | Unique identifier prefixed with `cmp_`. |
| `"is_draft"` | Whether or not the campaign is still a draft. |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"name"` | Name of the campaign. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"print_speed"` | A string designating the mail speed type: * `core` - 2 production business days |
| `"schedule_type"` | How the campaign should be scheduled. |
| `"send_date"` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `"target_delivery_date"` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `"total_count"` | Indicates the total number of records. |
| `"uploads"` | A single-element array containing the upload object that is assocated with this campaign. |
| `"use_type"` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove, Update.

API path: `/campaigns/{cmp_id}/send`

#### Card

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"auto_reorder"` | True if the cards should be auto-reordered. |
| `"available_quantity"` | The available quantity of cards. |
| `"back_original_url"` | The original URL of the back template. |
| `"count"` | number of resources in a set |
| `"countries"` |  |
| `"data"` | list of cards |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | Description of the card. |
| `"front_original_url"` | The original URL of the front template. |
| `"id"` | Unique identifier prefixed with `card_`. |
| `"mode"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"orientation"` | The orientation of the card. |
| `"pending_quantity"` | The pending quantity of cards. |
| `"previous_url"` | Url of previous page of items in list. |
| `"raw_url"` | The raw URL of the card. |
| `"reorder_quantity"` | The number of cards to be reordered. |
| `"send_date"` |  |
| `"size"` | The size of the card |
| `"status"` |  |
| `"threshold_amount"` | The threshold amount of the card |
| `"thumbnails"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"url"` | The signed link for the card. |

Operations: Create, List, Load, Remove.

API path: `/cards/{card_id}`

#### CardOrder

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | List of card orders |
| `"id"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"quantity"` | The quantity of cards in the order (minimum 10,000). |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List.

API path: `/cards/{card_id}/orders`

#### Check

| Field | Description |
| --- | --- |
| `"amount"` | The payment amount to be sent in US dollars. |
| `"attachment_template_id"` |  |
| `"attachment_template_version_id"` |  |
| `"bank_account"` |  |
| `"carrier"` |  |
| `"check_bottom_template_id"` |  |
| `"check_bottom_template_version_id"` |  |
| `"check_number"` |  |
| `"count"` | number of resources in a set |
| `"data"` | list of checks |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` |  |
| `"expected_delivery_date"` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `"failure_reason"` |  |
| `"from"` |  |
| `"id"` | Unique identifier prefixed with `chk_`. |
| `"mail_type"` |  |
| `"memo"` |  |
| `"merge_variables"` |  |
| `"message"` |  |
| `"metadata"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"send_date"` |  |
| `"sla"` |  |
| `"status"` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` | An array of tracking_event objects ordered by ascending `time`. |
| `"url"` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `"use_type"` | TThe use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/checks`

#### Creative

| Field | Description |
| --- | --- |
| `"campaigns"` | Array of campaigns associated with the creative ID |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | An internal description that identifies this resource. |
| `"details"` |  |
| `"from"` | Must either be an address ID or an inline object with correct address parameters. |
| `"id"` | Unique identifier prefixed with `crv_`. |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"object"` | Value is resource type. |
| `"resource_type"` |  |
| `"template_preview_urls"` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `"template_previews"` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

Operations: Create, Load, Update.

API path: `/creatives`

#### Domain

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"created_at"` | The date and time the domain was created. |
| `"data"` | List of domains. |
| `"domain"` | The registered domain/hostname. |
| `"error_redirect_link"` | URL to redirect customers if a short link is broken or inactive. |
| `"id"` | Unique identifier for a domain. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"status"` | The configuration status of the domain. |
| `"total_count"` | Indicates the total number of records. |
| `"updated_at"` | The date and time the domain was last updated. |

Operations: Create, List, Load, Remove.

API path: `/domains`

#### IdentityValidation

| Field | Description |
| --- | --- |
| `"confidence"` |  |
| `"id"` |  |
| `"last_line"` |  |
| `"object"` |  |
| `"primary_line"` |  |
| `"recipient"` |  |
| `"score"` |  |
| `"secondary_line"` |  |
| `"urbanization"` |  |

Operations: Create.

API path: `/identity_validation`

#### IntlVerification

| Field | Description |
| --- | --- |
| `"addresses"` |  |
| `"components"` |  |
| `"country"` |  |
| `"coverage"` |  |
| `"deliverability"` |  |
| `"errors"` | Indicates whether any errors occurred during the verification process. |
| `"id"` |  |
| `"last_line"` |  |
| `"object"` |  |
| `"primary_line"` |  |
| `"recipient"` |  |
| `"secondary_line"` |  |
| `"status"` |  |

Operations: Create.

API path: `/intl_verifications`

#### Letter

| Field | Description |
| --- | --- |
| `"address_placement"` |  |
| `"cards"` |  |
| `"carrier"` |  |
| `"color"` |  |
| `"count"` | number of resources in a set |
| `"custom_envelope"` |  |
| `"data"` | list of letters |
| `"date_created"` |  |
| `"date_modified"` |  |
| `"description"` |  |
| `"double_sided"` |  |
| `"expected_delivery_date"` |  |
| `"extra_service"` |  |
| `"from"` |  |
| `"fsc"` |  |
| `"id"` |  |
| `"mail_type"` |  |
| `"merge_variables"` |  |
| `"metadata"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"perforated_page"` |  |
| `"previous_url"` | Url of previous page of items in list. |
| `"return_envelope"` |  |
| `"send_date"` |  |
| `"sla"` |  |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` |  |
| `"tracking_number"` |  |
| `"url"` |  |
| `"use_type"` |  |

Operations: Create, List, Load, Remove.

API path: `/letters`

#### Link

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | List of links |
| `"domain"` | The registered domain to be used for the short URL. |
| `"id"` |  |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"redirect_link"` | The original target URL. |
| `"slug"` | The unique path for the shortened URL, if empty a unique path will be used. |
| `"title"` | The title of the URL. |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List, Load, Remove, Update.

API path: `/links`

#### LobCreditsBalance

| Field | Description |
| --- | --- |
| `"balance"` | Account's current balance of Lob Credits. |

Operations: Load.

API path: `/accounts`

#### Postcard

| Field | Description |
| --- | --- |
| `"back_template_id"` | The unique ID of the HTML template used for the back of the postcard. |
| `"back_template_version_id"` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `"campaign_id"` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `"carrier"` |  |
| `"count"` | number of resources in a set |
| `"data"` | list of postcards |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` |  |
| `"expected_delivery_date"` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `"failure_reason"` |  |
| `"from"` |  |
| `"front_template_id"` | The unique ID of the HTML template used for the front of the postcard. |
| `"front_template_version_id"` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `"fsc"` | This is in beta. |
| `"id"` | Unique identifier prefixed with `psc_`. |
| `"metadata"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"send_date"` |  |
| `"sla"` |  |
| `"status"` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` | An array of tracking_event objects ordered by ascending `time`. |
| `"url"` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `"use_type"` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/postcards`

#### QrCode

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | List of QR code analytics |
| `"object"` | Value is resource type. |
| `"scanned_count"` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `"total_count"` | Indicates the total number of records. |

Operations: List.

API path: `/qr_code_analytics`

#### ResourceProof

| Field | Description |
| --- | --- |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"errors"` | Errors encountered during processing. |
| `"id"` | Unique identifier prefixed with `res_prf_`. |
| `"object"` | Value is resource type. |
| `"resource_type"` | The type of resource to generate a proof for. |
| `"status"` | The processing status of the resource proof. |
| `"template_id"` | The template ID associated with the resource proof, if any. |
| `"thumbnails"` | Thumbnail images of the resource proof. |
| `"url"` | A URL to the resource proof PDF. |

Operations: Create, Load, Update.

API path: `/resource_proofs`

#### Response

| Field | Description |
| --- | --- |
| `"account_id"` | Your Lob account id. |
| `"brand_name"` |  |
| `"campaign_code"` | The campaign code associated with the Informed Delivery campaign. |
| `"count"` | number of resources in a set |
| `"data"` | list of Informed Delivery campaigns |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Whether the resource has been deleted. |
| `"end_date"` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `"end_serial"` | The last serial number in the range of serial numbers for this campaign. |
| `"id"` | Unique identifier prefixed with `infd_`. |
| `"lob_campaign_id"` |  |
| `"mode"` | The mode of the Informed Delivery campaign. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is the resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"quantity"` |  |
| `"representative_image_s3_link"` | A URL link to the campaigns representative image. |
| `"ride_along_image_s3_link"` | A URL link to the campaigns ride along image. |
| `"ride_along_url"` |  |
| `"service_request_number"` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `"start_date"` |  |
| `"start_serial"` | The first serial number in the range of serial numbers for this campaign. |
| `"status"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"usps_campaign_id"` | A numberical string up to 12 characters long. |
| `"usps_title"` |  |

Operations: Create, List, Load, Update.

API path: `/informed_delivery_campaigns`

#### ReverseGeocode

| Field | Description |
| --- | --- |
| `"addresses"` | list of addresses |
| `"id"` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `"latitude"` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `"longitude"` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `"object"` | Value is resource type. |

Operations: Create.

API path: `/us_reverse_geocode_lookups`

#### SelfMailer

| Field | Description |
| --- | --- |
| `"campaign_id"` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `"carrier"` |  |
| `"count"` | number of resources in a set |
| `"data"` | list of self_mailers |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` |  |
| `"expected_delivery_date"` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `"failure_reason"` |  |
| `"from"` |  |
| `"fsc"` | This is in beta. |
| `"id"` | Unique identifier prefixed with `sfm_`. |
| `"inside_template_id"` | The unique ID of the HTML template used for the inside of the self mailer. |
| `"inside_template_version_id"` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `"mail_type"` |  |
| `"merge_variables"` |  |
| `"metadata"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"outside_template_id"` | The unique ID of the HTML template used for the outside of the self mailer. |
| `"outside_template_version_id"` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `"previous_url"` | Url of previous page of items in list. |
| `"send_date"` |  |
| `"size"` |  |
| `"sla"` |  |
| `"status"` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` | An array of certified tracking events ordered by ascending `time`. |
| `"url"` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `"use_type"` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/self_mailers`

#### SnapPack

| Field | Description |
| --- | --- |
| `"campaign_id"` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `"carrier"` |  |
| `"color"` | Set this key to `true` if you would like to print in color. |
| `"count"` | number of resources in a set |
| `"data"` | list of snap_packs |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` |  |
| `"expected_delivery_date"` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `"failure_reason"` |  |
| `"from"` |  |
| `"fsc"` | Contact support@lob.com or your account contact to learn more. |
| `"id"` | Unique identifier prefixed with `ord_`. |
| `"inside_template_id"` | The unique ID of the HTML template used for the inside of the snap pack. |
| `"inside_template_version_id"` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `"mail_type"` |  |
| `"merge_variables"` |  |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"outside_template_id"` | The unique ID of the HTML template used for the outside of the snap pack. |
| `"outside_template_version_id"` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `"previous_url"` | Url of previous page of items in list. |
| `"send_date"` |  |
| `"size"` |  |
| `"sla"` |  |
| `"status"` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `"thumbnails"` |  |
| `"to"` |  |
| `"total_count"` | Indicates the total number of records. |
| `"tracking_events"` | An array of tracking events ordered by ascending `time`. |
| `"url"` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `"use_type"` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/snap_packs`

#### Template

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | list of templates |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | An internal description that identifies this resource. |
| `"engine"` | The engine used to combine HTML template with merge variables. |
| `"html"` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `"id"` | Unique identifier prefixed with `tmpl_`. |
| `"metadata"` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"published_version"` |  |
| `"required_vars"` | An array of required variables to be used in a template. |
| `"total_count"` | Indicates the total number of records. |
| `"versions"` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

Operations: Create, List, Load, Remove.

API path: `/templates/{tmpl_id}`

#### TemplateVersion

| Field | Description |
| --- | --- |
| `"count"` | number of resources in a set |
| `"data"` | list of template versions |
| `"date_created"` | A timestamp in ISO 8601 format of the date the resource was created. |
| `"date_modified"` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `"deleted"` | Only returned if the resource has been successfully deleted. |
| `"description"` | An internal description that identifies this resource. |
| `"engine"` | The engine used to combine HTML template with merge variables. |
| `"html"` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `"id"` | Unique identifier prefixed with `vrsn_`. |
| `"merge_variables"` | Object representing the keys of every merge variable present in the template. |
| `"next_url"` | Url of next page of items in list. |
| `"object"` | Value is resource type. |
| `"previous_url"` | Url of previous page of items in list. |
| `"required_vars"` | An array of required variables to be used in a template. |
| `"suggest_json_editor"` | Used by frontend, true if the template uses advanced features. |
| `"total_count"` | Indicates the total number of records. |

Operations: Create, List, Load.

API path: `/templates/{tmpl_id}/versions/{vrsn_id}`

#### TemplateVersionDeletion

| Field | Description |
| --- | --- |

Operations: Remove.

API path: `/templates/{tmpl_id}/versions/{vrsn_id}`

#### Upload

| Field | Description |
| --- | --- |
| `"accountId"` | Account ID that made the request |
| `"bytesProcessed"` | Number of bytes processed in your CSV |
| `"campaignId"` |  |
| `"dateCreated"` | A timestamp in ISO 8601 format of the date the export was created |
| `"dateModified"` | A timestamp in ISO 8601 format of the date the export was last modified |
| `"deleted"` | Returns as `true` if the resource has been successfully deleted. |
| `"failedMailpieces"` | Number of mailpieces that failed to create |
| `"failuresUrl"` | Url where your campaign mailpiece failures can be retrieved |
| `"id"` | Unique identifier prefixed with `ex_`. |
| `"mergeVariableColumnMapping"` | test |
| `"metadata"` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `"mode"` | The environment in which the mailpieces were created. |
| `"optionalAddressColumnMapping"` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `"originalFilename"` | Filename of the upload |
| `"requiredAddressColumnMapping"` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `"s3Url"` | The URL for the generated export file. |
| `"state"` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `"totalMailpieces"` | Total number of recipients for the campaign |
| `"type"` | The export file type, which can be `all`, `failures` or `successes`. |
| `"uploadId"` | Unique identifier prefixed with `upl_`. |
| `"validatedMailpieces"` | Number of mailpieces that were successfully created |

Operations: Create, List, Load, Remove, Update.

API path: `/uploads/{upl_id}/file`

#### UploadCreateExport

| Field | Description |
| --- | --- |
| `"exportId"` |  |
| `"id"` |  |
| `"message"` |  |
| `"type"` |  |

Operations: Create.

API path: `/uploads/{upl_id}/exports`

#### UsAutocompletion

| Field | Description |
| --- | --- |
| `"address_prefix"` | Only accepts numbers and street names in an alphanumeric format. |
| `"city"` | An optional city input used to filter suggestions. |
| `"geo_ip_sort"` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `"id"` | Unique identifier prefixed with `us_auto_`. |
| `"object"` | Value is resource type. |
| `"state"` | An optional state input used to filter suggestions. |
| `"suggestions"` | An array of objects representing suggested addresses. |
| `"zip_code"` | An optional ZIP Code input used to filter suggestions. |

Operations: Create.

API path: `/us_autocompletions`

#### UsVerification

| Field | Description |
| --- | --- |
| `"addresses"` |  |
| `"components"` | A nested object containing a breakdown of each component of an address. |
| `"deliverability"` | Summarizes the deliverability of the `us_verification` object. |
| `"deliverability_analysis"` | A nested object containing a breakdown of the deliverability of an address. |
| `"errors"` | Indicates whether any errors occurred during the verification process. |
| `"id"` | Unique identifier prefixed with `us_ver_`. |
| `"last_line"` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `"lob_confidence_score"` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `"object"` | Value is resource type. |
| `"primary_line"` | The primary delivery line (usually the street address) of the address. |
| `"recipient"` | The intended recipient, typically a person's or firm's name. |
| `"secondary_line"` | The secondary delivery line of the address. |
| `"urbanization"` | Only present for addresses in Puerto Rico. |
| `"valid_address"` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

Operations: Create.

API path: `/bulk/us_verifications`

#### Zip

| Field | Description |
| --- | --- |
| `"zip_code"` | A 5-digit ZIP code. |

Operations: Create.

API path: `/us_zip_lookups`



## Entities


### Address

Create an instance: `address := client.Address(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_city` | `string` |  |
| `address_country` | `string` |  |
| `address_line1` | `string` |  |
| `address_state` | `string` |  |
| `address_zip` | `string` |  |
| `company` | `string` |  |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of addresses |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `metadata` | `map[string]any` |  |
| `name` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `phone` | `string` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```go
address, err := client.Address(nil).Load(map[string]any{"id": "address_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(address) // the loaded record
```

#### Example: List

```go
addresss, err := client.Address(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(addresss) // the array of records
```

#### Example: Create

```go
result, err := client.Address(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### BankAccount

Create an instance: `bankAccount := client.BankAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` |  |
| `account_type` | `string` | The type of entity that holds the account. |
| `bank_name` | `string` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `string` | The check template used for printing. |
| `city` | `string` | The city associated with your home bank account. |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of bank_accounts |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | The fractional routing number for your home bank account. |
| `id` | `string` |  |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | The type of microdeposit verification required for this bank account. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `routing_number` | `string` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | The signatory associated with your account. |
| `signature_url` | `any` |  |
| `state` | `string` | The state associated with your home bank account. |
| `total_count` | `int` | Indicates the total number of records. |
| `verified` | `bool` | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | The zipcode associated with your home bank account. |

#### Example: Load

```go
bankAccount, err := client.BankAccount(nil).Load(map[string]any{"id": "bank_account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bankAccount) // the loaded record
```

#### Example: List

```go
bankAccounts, err := client.BankAccount(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bankAccounts) // the array of records
```

#### Example: Create

```go
result, err := client.BankAccount(nil).Create(map[string]any{
    "account_number": "example_account_number",
    "account_type": "example_account_type",
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "id": "example_id",
    "object": "example_object",
    "routing_number": "example_routing_number",
    "signatory": "example_signatory",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### BankDeletion

Create an instance: `bankDeletion := client.BankDeletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### BillingGroup

Create an instance: `billingGroup := client.BillingGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of billing_groups |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `string` | Description of the billing group. |
| `id` | `string` | Unique identifier prefixed with `bg_`. |
| `name` | `string` | Name of the billing group. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```go
billingGroup, err := client.BillingGroup(nil).Load(map[string]any{"id": "billing_group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingGroup) // the loaded record
```

#### Example: List

```go
billingGroups, err := client.BillingGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(billingGroups) // the array of records
```

#### Example: Create

```go
result, err := client.BillingGroup(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Booklet

Create an instance: `booklet := client.Booklet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `carrier` | `string` |  |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of booklets |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` |  |
| `from` | `map[string]any` |  |
| `fsc` | `bool` |  |
| `id` | `string` |  |
| `mail_type` | `string` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `map[string]any` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `pages` | `int` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` |  |
| `sla` | `string` |  |
| `source_material` | `string` |  |
| `thumbnails` | `[]any` |  |
| `to` | `map[string]any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```go
booklet, err := client.Booklet(nil).Load(map[string]any{"id": "booklet_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(booklet) // the loaded record
```

#### Example: List

```go
booklets, err := client.Booklet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(booklets) // the array of records
```

#### Example: Create

```go
result, err := client.Booklet(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Buckslip

Create an instance: `buckslip := client.Buckslip(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `allocated_quantity` | `float64` | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float64` | The available quantity of buckslips. |
| `back_original_url` | `string` | The original URL of the back template. |
| `buckslip_orders` | `[]any` | An array of buckslip orders that are associated with the buckslip. |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of buckslips |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the buckslip. |
| `finish` | `string` |  |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `bck_`. |
| `mode` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `onhand_quantity` | `float64` | The onhand quantity of buckslips. |
| `pending_quantity` | `float64` | The pending quantity of buckslips. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `projected_quantity` | `float64` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | The number of buckslips to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the buckslip |
| `status` | `string` |  |
| `stock` | `string` |  |
| `threshold_amount` | `int` | The threshold amount of the buckslip |
| `thumbnails` | `[]any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `url` | `string` | The signed link for the buckslip. |
| `weight` | `string` |  |

#### Example: Load

```go
buckslip, err := client.Buckslip(nil).Load(map[string]any{"id": "buckslip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(buckslip) // the loaded record
```

#### Example: List

```go
buckslips, err := client.Buckslip(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(buckslips) // the array of records
```

#### Example: Create

```go
result, err := client.Buckslip(nil).Create(map[string]any{
    "allocated_quantity": 1,
    "auto_reorder": true,
    "available_quantity": 1,
    "back_original_url": "example_back_original_url",
    "buckslip_orders": []any{},
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "finish": "example_finish",
    "front_original_url": "example_front_original_url",
    "id": "example_id",
    "object": "example_object",
    "onhand_quantity": 1,
    "pending_quantity": 1,
    "projected_quantity": 1,
    "raw_url": "example_raw_url",
    "reorder_quantity": 1,
    "status": "example_status",
    "stock": "example_stock",
    "threshold_amount": 1,
    "thumbnails": []any{},
    "url": "example_url",
    "weight": "example_weight",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### BuckslipOrder

Create an instance: `buckslipOrder := client.BuckslipOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | List of buckslip orders |
| `id` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `int` | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```go
buckslipOrders, err := client.BuckslipOrder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(buckslipOrders) // the array of records
```

#### Example: Create

```go
result, err := client.BuckslipOrder(nil).Create(map[string]any{
    "id": "example_id",
    "quantity": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Campaign

Create an instance: `campaign := client.Campaign(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_cancel_if_ncoa` | `bool` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | A window, in minutes, within which the campaign can be canceled. |
| `count` | `int` | number of resources in a set |
| `creatives` | `[]any` | An array of creatives that have been associated with this campaign. |
| `data` | `[]any` | list of campaigns |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `id` | `string` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Whether or not the campaign is still a draft. |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Name of the campaign. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `print_speed` | `string` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | How the campaign should be scheduled. |
| `send_date` | `string` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | `int` | Indicates the total number of records. |
| `uploads` | `[]any` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```go
campaign, err := client.Campaign(nil).Load(map[string]any{"id": "campaign_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(campaign) // the loaded record
```

#### Example: List

```go
campaigns, err := client.Campaign(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(campaigns) // the array of records
```

#### Example: Create

```go
result, err := client.Campaign(nil).Create(map[string]any{
    "creatives": []any{},
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "id": "example_id",
    "is_draft": true,
    "name": "example_name",
    "object": "example_object",
    "schedule_type": "example_schedule_type",
    "uploads": []any{},
    "use_type": "example_use_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Card

Create an instance: `card := client.Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `auto_reorder` | `bool` | True if the cards should be auto-reordered. |
| `available_quantity` | `int` | The available quantity of cards. |
| `back_original_url` | `string` | The original URL of the back template. |
| `count` | `int` | number of resources in a set |
| `countries` | `string` |  |
| `data` | `[]any` | list of cards |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the card. |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `card_`. |
| `mode` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `orientation` | `string` | The orientation of the card. |
| `pending_quantity` | `int` | The pending quantity of cards. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `raw_url` | `string` | The raw URL of the card. |
| `reorder_quantity` | `int` | The number of cards to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the card |
| `status` | `string` |  |
| `threshold_amount` | `int` | The threshold amount of the card |
| `thumbnails` | `[]any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `url` | `string` | The signed link for the card. |

#### Example: Load

```go
card, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(card) // the loaded record
```

#### Example: List

```go
cards, err := client.Card(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cards) // the array of records
```

#### Example: Create

```go
result, err := client.Card(nil).Create(map[string]any{
    "id": "example_id",
    "auto_reorder": true,
    "available_quantity": 1,
    "back_original_url": "example_back_original_url",
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "front_original_url": "example_front_original_url",
    "object": "example_object",
    "orientation": "example_orientation",
    "pending_quantity": 1,
    "raw_url": "example_raw_url",
    "reorder_quantity": 1,
    "status": "example_status",
    "threshold_amount": 1,
    "thumbnails": []any{},
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CardOrder

Create an instance: `cardOrder := client.CardOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | List of card orders |
| `id` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `int` | The quantity of cards in the order (minimum 10,000). |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```go
cardOrders, err := client.CardOrder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cardOrders) // the array of records
```

#### Example: Create

```go
result, err := client.CardOrder(nil).Create(map[string]any{
    "id": "example_id",
    "quantity": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Check

Create an instance: `check := client.Check(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` |  |
| `attachment_template_version_id` | `string` |  |
| `bank_account` | `any` |  |
| `carrier` | `string` |  |
| `check_bottom_template_id` | `string` |  |
| `check_bottom_template_version_id` | `string` |  |
| `check_number` | `int` |  |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of checks |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` |  |
| `from` | `any` |  |
| `id` | `string` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` |  |
| `memo` | `string` |  |
| `merge_variables` | `map[string]any` |  |
| `message` | `string` |  |
| `metadata` | `map[string]any` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` |  |
| `to` | `any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | TThe use type for each mailpiece. |

#### Example: Load

```go
check, err := client.Check(nil).Load(map[string]any{"id": "check_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(check) // the loaded record
```

#### Example: List

```go
checks, err := client.Check(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(checks) // the array of records
```

#### Example: Create

```go
result, err := client.Check(nil).Create(map[string]any{
    "amount": 1,
    "bank_account": "example_bank_account",
    "carrier": "example_carrier",
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "id": "example_id",
    "to": "example_to",
    "url": "example_url",
    "use_type": "example_use_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Creative

Create an instance: `creative := client.Creative(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `[]any` | Array of campaigns associated with the creative ID |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `details` | `map[string]any` |  |
| `from` | `string` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Unique identifier prefixed with `crv_`. |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` |  |
| `template_preview_urls` | `map[string]any` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `[]any` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```go
creative, err := client.Creative(nil).Load(map[string]any{"id": "creative_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(creative) // the loaded record
```

#### Example: Create

```go
result, err := client.Creative(nil).Create(map[string]any{
    "campaigns": []any{},
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "id": "example_id",
    "object": "example_object",
    "template_preview_urls": map[string]any{},
    "template_previews": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `created_at` | `string` | The date and time the domain was created. |
| `data` | `[]any` | List of domains. |
| `domain` | `string` | The registered domain/hostname. |
| `error_redirect_link` | `string` | URL to redirect customers if a short link is broken or inactive. |
| `id` | `string` | Unique identifier for a domain. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `status` | `string` | The configuration status of the domain. |
| `total_count` | `int` | Indicates the total number of records. |
| `updated_at` | `string` | The date and time the domain was last updated. |

#### Example: Load

```go
domain, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domain) // the loaded record
```

#### Example: List

```go
domains, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(domains) // the array of records
```

#### Example: Create

```go
result, err := client.Domain(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### IdentityValidation

Create an instance: `identityValidation := client.IdentityValidation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `id` | `string` |  |
| `last_line` | `string` |  |
| `object` | `string` |  |
| `primary_line` | `string` |  |
| `recipient` | `string` |  |
| `score` | `int` |  |
| `secondary_line` | `string` |  |
| `urbanization` | `string` |  |

#### Example: Create

```go
result, err := client.IdentityValidation(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### IntlVerification

Create an instance: `intlVerification := client.IntlVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `[]any` |  |
| `components` | `map[string]any` |  |
| `country` | `string` |  |
| `coverage` | `string` |  |
| `deliverability` | `string` |  |
| `errors` | `bool` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` |  |
| `last_line` | `string` |  |
| `object` | `string` |  |
| `primary_line` | `string` |  |
| `recipient` | `string` |  |
| `secondary_line` | `string` |  |
| `status` | `string` |  |

#### Example: Create

```go
result, err := client.IntlVerification(nil).Create(map[string]any{
    "addresses": []any{},
    "errors": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Letter

Create an instance: `letter := client.Letter(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_placement` | `string` |  |
| `cards` | `[]any` |  |
| `carrier` | `string` |  |
| `color` | `bool` |  |
| `count` | `int` | number of resources in a set |
| `custom_envelope` | `string` |  |
| `data` | `[]any` | list of letters |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `double_sided` | `bool` |  |
| `expected_delivery_date` | `string` |  |
| `extra_service` | `string` |  |
| `from` | `map[string]any` |  |
| `fsc` | `bool` |  |
| `id` | `string` |  |
| `mail_type` | `string` |  |
| `merge_variables` | `map[string]any` |  |
| `metadata` | `map[string]any` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `perforated_page` | `string` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `return_envelope` | `bool` |  |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `thumbnails` | `[]any` |  |
| `to` | `map[string]any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` |  |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```go
letter, err := client.Letter(nil).Load(map[string]any{"id": "letter_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(letter) // the loaded record
```

#### Example: List

```go
letters, err := client.Letter(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(letters) // the array of records
```

#### Example: Create

```go
result, err := client.Letter(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Link

Create an instance: `link := client.Link(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | List of links |
| `domain` | `string` | The registered domain to be used for the short URL. |
| `id` | `string` |  |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `redirect_link` | `string` | The original target URL. |
| `slug` | `string` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | The title of the URL. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```go
link, err := client.Link(nil).Load(map[string]any{"id": "link_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(link) // the loaded record
```

#### Example: List

```go
links, err := client.Link(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(links) // the array of records
```

#### Example: Create

```go
result, err := client.Link(nil).Create(map[string]any{
    "redirect_link": "example_redirect_link",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### LobCreditsBalance

Create an instance: `lobCreditsBalance := client.LobCreditsBalance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `float64` | Account's current balance of Lob Credits. |

#### Example: Load

```go
lobCreditsBalance, err := client.LobCreditsBalance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(lobCreditsBalance) // the loaded record
```


### Postcard

Create an instance: `postcard := client.Postcard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `back_template_id` | `string` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of postcards |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` |  |
| `from` | `any` |  |
| `front_template_id` | `string` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `psc_`. |
| `metadata` | `map[string]any` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` |  |
| `to` | `any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```go
postcard, err := client.Postcard(nil).Load(map[string]any{"id": "postcard_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(postcard) // the loaded record
```

#### Example: List

```go
postcards, err := client.Postcard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(postcards) // the array of records
```

#### Example: Create

```go
result, err := client.Postcard(nil).Create(map[string]any{
    "back_template_id": "example_back_template_id",
    "carrier": "example_carrier",
    "front_template_id": "example_front_template_id",
    "id": "example_id",
    "to": "example_to",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### QrCode

Create an instance: `qrCode := client.QrCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | List of QR code analytics |
| `object` | `string` | Value is resource type. |
| `scanned_count` | `int` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```go
qrCodes, err := client.QrCode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(qrCodes) // the array of records
```


### ResourceProof

Create an instance: `resourceProof := client.ResourceProof(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `[]any` | Errors encountered during processing. |
| `id` | `string` | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` | The type of resource to generate a proof for. |
| `status` | `string` | The processing status of the resource proof. |
| `template_id` | `string` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `[]any` | Thumbnail images of the resource proof. |
| `url` | `string` | A URL to the resource proof PDF. |

#### Example: Load

```go
resourceProof, err := client.ResourceProof(nil).Load(map[string]any{"id": "resource_proof_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(resourceProof) // the loaded record
```

#### Example: Create

```go
result, err := client.ResourceProof(nil).Create(map[string]any{
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "id": "example_id",
    "object": "example_object",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Response

Create an instance: `response := client.Response(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` | Your Lob account id. |
| `brand_name` | `string` |  |
| `campaign_code` | `string` | The campaign code associated with the Informed Delivery campaign. |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of Informed Delivery campaigns |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Whether the resource has been deleted. |
| `end_date` | `string` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `int` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` |  |
| `mode` | `string` | The mode of the Informed Delivery campaign. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is the resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `int` |  |
| `representative_image_s3_link` | `string` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` |  |
| `service_request_number` | `string` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` |  |
| `start_serial` | `int` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `usps_campaign_id` | `string` | A numberical string up to 12 characters long. |
| `usps_title` | `string` |  |

#### Example: Load

```go
response, err := client.Response(nil).Load(map[string]any{"usps_campaign_id": "usps_campaign_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(response) // the loaded record
```

#### Example: List

```go
responses, err := client.Response(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(responses) // the array of records
```

#### Example: Create

```go
result, err := client.Response(nil).Create(map[string]any{
    "account_id": "example_account_id",
    "campaign_code": "example_campaign_code",
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "deleted": true,
    "end_date": "example_end_date",
    "end_serial": 1,
    "id": "example_id",
    "mode": "example_mode",
    "object": "example_object",
    "representative_image_s3_link": "example_representative_image_s3_link",
    "ride_along_image_s3_link": "example_ride_along_image_s3_link",
    "service_request_number": "example_service_request_number",
    "start_serial": 1,
    "usps_campaign_id": "example_usps_campaign_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ReverseGeocode

Create an instance: `reverseGeocode := client.ReverseGeocode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `[]any` | list of addresses |
| `id` | `string` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float64` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float64` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | Value is resource type. |

#### Example: Create

```go
result, err := client.ReverseGeocode(nil).Create(map[string]any{
    "latitude": 1,
    "longitude": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### SelfMailer

Create an instance: `selfMailer := client.SelfMailer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of self_mailers |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` |  |
| `from` | `any` |  |
| `fsc` | `bool` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` |  |
| `merge_variables` | `map[string]any` |  |
| `metadata` | `map[string]any` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` |  |
| `to` | `any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```go
selfMailer, err := client.SelfMailer(nil).Load(map[string]any{"id": "self_mailer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(selfMailer) // the loaded record
```

#### Example: List

```go
selfMailers, err := client.SelfMailer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(selfMailers) // the array of records
```

#### Example: Create

```go
result, err := client.SelfMailer(nil).Create(map[string]any{
    "carrier": "example_carrier",
    "id": "example_id",
    "to": "example_to",
    "url": "example_url",
    "use_type": "example_use_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### SnapPack

Create an instance: `snapPack := client.SnapPack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `color` | `bool` | Set this key to `true` if you would like to print in color. |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of snap_packs |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` |  |
| `from` | `any` |  |
| `fsc` | `bool` | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` |  |
| `merge_variables` | `map[string]any` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` |  |
| `to` | `any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `[]any` | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```go
snapPack, err := client.SnapPack(nil).Load(map[string]any{"id": "snap_pack_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(snapPack) // the loaded record
```

#### Example: List

```go
snapPacks, err := client.SnapPack(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(snapPacks) // the array of records
```

#### Example: Create

```go
result, err := client.SnapPack(nil).Create(map[string]any{
    "carrier": "example_carrier",
    "id": "example_id",
    "to": "example_to",
    "url": "example_url",
    "use_type": "example_use_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Template

Create an instance: `template := client.Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of templates |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `map[string]any` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `published_version` | `any` |  |
| `required_vars` | `[]any` | An array of required variables to be used in a template. |
| `total_count` | `int` | Indicates the total number of records. |
| `versions` | `[]any` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```go
template, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(template) // the loaded record
```

#### Example: List

```go
templates, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(templates) // the array of records
```

#### Example: Create

```go
result, err := client.Template(nil).Create(map[string]any{
    "id": "example_id",
    "html": "example_html",
    "published_version": "example_published_version",
    "versions": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### TemplateVersion

Create an instance: `templateVersion := client.TemplateVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `[]any` | list of template versions |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `map[string]any` | Object representing the keys of every merge variable present in the template. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `required_vars` | `[]any` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `bool` | Used by frontend, true if the template uses advanced features. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```go
templateVersion, err := client.TemplateVersion(nil).Load(map[string]any{"id": "template_version_id", "template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(templateVersion) // the loaded record
```

#### Example: List

```go
templateVersions, err := client.TemplateVersion(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(templateVersions) // the array of records
```

#### Example: Create

```go
result, err := client.TemplateVersion(nil).Create(map[string]any{
    "id": "example_id",
    "date_created": "example_date_created",
    "date_modified": "example_date_modified",
    "html": "example_html",
    "object": "example_object",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### TemplateVersionDeletion

Create an instance: `templateVersionDeletion := client.TemplateVersionDeletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Remove(match, ctrl)` | Remove the matching entity. |


### Upload

Create an instance: `upload := client.Upload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Account ID that made the request |
| `bytesProcessed` | `int` | Number of bytes processed in your CSV |
| `campaignId` | `any` |  |
| `dateCreated` | `string` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `map[string]any` | test |
| `metadata` | `map[string]any` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `map[string]any` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | Filename of the upload |
| `requiredAddressColumnMapping` | `map[string]any` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | The URL for the generated export file. |
| `state` | `string` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Total number of recipients for the campaign |
| `type` | `string` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Number of mailpieces that were successfully created |

#### Example: Load

```go
upload, err := client.Upload(nil).Load(map[string]any{"id": "upload_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(upload) // the loaded record
```

#### Example: List

```go
uploads, err := client.Upload(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(uploads) // the array of records
```

#### Example: Create

```go
result, err := client.Upload(nil).Create(map[string]any{
    "accountId": "example_accountId",
    "bytesProcessed": 1,
    "campaignId": "example_campaignId",
    "dateCreated": "example_dateCreated",
    "dateModified": "example_dateModified",
    "deleted": true,
    "failedMailpieces": 1,
    "id": "example_id",
    "metadata": map[string]any{},
    "mode": "example_mode",
    "optionalAddressColumnMapping": map[string]any{},
    "requiredAddressColumnMapping": map[string]any{},
    "s3Url": "example_s3Url",
    "state": "example_state",
    "totalMailpieces": 1,
    "type": "example_type",
    "uploadId": "example_uploadId",
    "validatedMailpieces": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UploadCreateExport

Create an instance: `uploadCreateExport := client.UploadCreateExport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exportId` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `type` | `string` |  |

#### Example: Create

```go
result, err := client.UploadCreateExport(nil).Create(map[string]any{
    "id": "example_id",
    "exportId": "example_exportId",
    "message": "example_message",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UsAutocompletion

Create an instance: `usAutocompletion := client.UsAutocompletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_prefix` | `string` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `string` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `bool` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `string` | Unique identifier prefixed with `us_auto_`. |
| `object` | `string` | Value is resource type. |
| `state` | `string` | An optional state input used to filter suggestions. |
| `suggestions` | `[]any` | An array of objects representing suggested addresses. |
| `zip_code` | `string` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```go
result, err := client.UsAutocompletion(nil).Create(map[string]any{
    "address_prefix": "example_address_prefix",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### UsVerification

Create an instance: `usVerification := client.UsVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `[]any` |  |
| `components` | `map[string]any` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `map[string]any` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `map[string]any` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | Value is resource type. |
| `primary_line` | `string` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | The secondary delivery line of the address. |
| `urbanization` | `string` | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```go
result, err := client.UsVerification(nil).Create(map[string]any{
    "addresses": []any{},
    "components": map[string]any{},
    "deliverability_analysis": map[string]any{},
    "errors": true,
    "lob_confidence_score": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Zip

Create an instance: `zip := client.Zip(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `string` | A 5-digit ZIP code. |

#### Example: Create

```go
result, err := client.Zip(nil).Create(map[string]any{
    "zip_code": "example_zip_code",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Open types

3 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `campaign` | `creatives` | 3 | 15 levels |
| `campaign` | `data` | 3 | 20 levels |
| `letter` | `data` | 3 | 17 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/lob-sdk/go/
├── lob.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/lob-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
address := client.Address(nil)
address.List(nil, nil)

// address.Data() now returns the address data from the last list
// address.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
