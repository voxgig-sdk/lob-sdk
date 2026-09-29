# Lob Lua SDK



The Lua SDK for the Lob API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Address()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lob-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("lob_sdk")

local client = sdk.new({
  apikey = os.getenv("LOB_APIKEY"),
})
```

### 2. List address records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local addresss, err = client:Address():list()
if err then error(err) end

for _, item in ipairs(addresss) do
  print(item["id"])
end
```

### 3. Load a templateversion

TemplateVersion is nested under template, so provide the `template_id`.

```lua
local templateversion, err = client:TemplateVersion():load({ template_id = "example_template_id", id = "example_id" })
if err then error(err) end
print(templateversion)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Address():create({ address_city = "example_address_city", address_country = "example_address_country" })
if err then error(err) end

-- Remove
client:Address():remove({ id = created:data_get()["id"] })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local campaigns, err = client:Campaign():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Campaign():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### LobSDK

```lua
local sdk = require("lob_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LobSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Address` | `(data) -> AddressEntity` | Create an Address entity instance. |
| `BankAccount` | `(data) -> BankAccountEntity` | Create a BankAccount entity instance. |
| `BankDeletion` | `(data) -> BankDeletionEntity` | Create a BankDeletion entity instance. |
| `BillingGroup` | `(data) -> BillingGroupEntity` | Create a BillingGroup entity instance. |
| `Booklet` | `(data) -> BookletEntity` | Create a Booklet entity instance. |
| `Buckslip` | `(data) -> BuckslipEntity` | Create a Buckslip entity instance. |
| `BuckslipOrder` | `(data) -> BuckslipOrderEntity` | Create a BuckslipOrder entity instance. |
| `Campaign` | `(data) -> CampaignEntity` | Create a Campaign entity instance. |
| `Card` | `(data) -> CardEntity` | Create a Card entity instance. |
| `CardOrder` | `(data) -> CardOrderEntity` | Create a CardOrder entity instance. |
| `Check` | `(data) -> CheckEntity` | Create a Check entity instance. |
| `Creative` | `(data) -> CreativeEntity` | Create a Creative entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `IdentityValidation` | `(data) -> IdentityValidationEntity` | Create an IdentityValidation entity instance. |
| `IntlVerification` | `(data) -> IntlVerificationEntity` | Create an IntlVerification entity instance. |
| `Letter` | `(data) -> LetterEntity` | Create a Letter entity instance. |
| `Link` | `(data) -> LinkEntity` | Create a Link entity instance. |
| `LobCreditsBalance` | `(data) -> LobCreditsBalanceEntity` | Create a LobCreditsBalance entity instance. |
| `Postcard` | `(data) -> PostcardEntity` | Create a Postcard entity instance. |
| `QrCode` | `(data) -> QrCodeEntity` | Create a QrCode entity instance. |
| `ResourceProof` | `(data) -> ResourceProofEntity` | Create a ResourceProof entity instance. |
| `Response` | `(data) -> ResponseEntity` | Create a Response entity instance. |
| `ReverseGeocode` | `(data) -> ReverseGeocodeEntity` | Create a ReverseGeocode entity instance. |
| `SelfMailer` | `(data) -> SelfMailerEntity` | Create a SelfMailer entity instance. |
| `SnapPack` | `(data) -> SnapPackEntity` | Create a SnapPack entity instance. |
| `Template` | `(data) -> TemplateEntity` | Create a Template entity instance. |
| `TemplateVersion` | `(data) -> TemplateVersionEntity` | Create a TemplateVersion entity instance. |
| `TemplateVersionDeletion` | `(data) -> TemplateVersionDeletionEntity` | Create a TemplateVersionDeletion entity instance. |
| `Upload` | `(data) -> UploadEntity` | Create an Upload entity instance. |
| `UploadCreateExport` | `(data) -> UploadCreateExportEntity` | Create an UploadCreateExport entity instance. |
| `UsAutocompletion` | `(data) -> UsAutocompletionEntity` | Create an UsAutocompletion entity instance. |
| `UsVerification` | `(data) -> UsVerificationEntity` | Create an UsVerification entity instance. |
| `Zip` | `(data) -> ZipEntity` | Create a Zip entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local address, err = client:Address():load({ id = "example_id" })
    if err then error(err) end
    -- address is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Address

| Field | Description |
| --- | --- |
| `address_city` |  |
| `address_country` |  |
| `address_line1` |  |
| `address_line2` |  |
| `address_state` |  |
| `address_zip` |  |
| `company` |  |
| `date_created` |  |
| `date_modified` |  |
| `description` |  |
| `email` |  |
| `id` |  |
| `metadata` |  |
| `name` |  |
| `object` |  |
| `phone` |  |

Operations: Create, List, Load, Remove.

API path: `/addresses`

#### BankAccount

| Field | Description |
| --- | --- |
| `account_number` |  |
| `account_type` | The type of entity that holds the account. |
| `bank_name` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | The check template used for printing. |
| `city` | The city associated with your home bank account. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `fractional_routing_number` | The fractional routing number for your home bank account. |
| `id` |  |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | The type of microdeposit verification required for this bank account. |
| `object` | Value is resource type. |
| `routing_number` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | The signatory associated with your account. |
| `signature_url` |  |
| `state` | The state associated with your home bank account. |
| `verified` | A bank account must be verified before a check can be created. |
| `zipcode` | The zipcode associated with your home bank account. |

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
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | Description of the billing group. |
| `id` | Unique identifier prefixed with `bg_`. |
| `name` | Name of the billing group. |
| `object` | Value is resource type. |

Operations: Create, List, Load.

API path: `/billing_groups/{bg_id}`

#### Booklet

| Field | Description |
| --- | --- |
| `carrier` |  |
| `date_created` |  |
| `date_modified` |  |
| `description` | An internal description that identifies this resource. |
| `expected_delivery_date` |  |
| `from` |  |
| `fsc` |  |
| `id` |  |
| `mail_type` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` |  |
| `pages` |  |
| `send_date` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` |  |
| `sla` |  |
| `source_material` |  |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` |  |
| `url` |  |
| `use_type` |  |

Operations: Create, List, Load, Remove.

API path: `/booklets`

#### Buckslip

| Field | Description |
| --- | --- |
| `account_id` |  |
| `allocated_quantity` | The allocated quantity of buckslips. |
| `auto_reorder` | True if the buckslips should be auto-reordered. |
| `available_quantity` | The available quantity of buckslips. |
| `back_original_url` | The original URL of the back template. |
| `buckslip_orders` | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | Description of the buckslip. |
| `finish` |  |
| `front_original_url` | The original URL of the front template. |
| `id` | Unique identifier prefixed with `bck_`. |
| `mode` |  |
| `object` | Value is resource type. |
| `onhand_quantity` | The onhand quantity of buckslips. |
| `pending_quantity` | The pending quantity of buckslips. |
| `projected_quantity` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | The raw URL of the buckslip. |
| `reorder_quantity` | The number of buckslips to be reordered. |
| `send_date` |  |
| `size` | The size of the buckslip |
| `status` |  |
| `stock` |  |
| `threshold_amount` | The threshold amount of the buckslip |
| `thumbnails` |  |
| `url` | The signed link for the buckslip. |
| `weight` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/buckslips`

#### BuckslipOrder

| Field | Description |
| --- | --- |
| `availability_date` | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | The reason for cancellation. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | The fixed deadline for the buckslips to be printed. |
| `id` | Unique identifier prefixed with `bo_`. |
| `inventory` | The inventory of the buckslip order. |
| `object` | Value is resource type. |
| `quantity` | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | The quantity of buckslips ordered. |
| `status` | The status of the buckslip order. |
| `unit_price` | The unit price for the buckslip order. |

Operations: Create, List.

API path: `/buckslips/{buckslip_id}/orders`

#### Campaign

| Field | Description |
| --- | --- |
| `auto_cancel_if_ncoa` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | An array of creatives that have been associated with this campaign. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `id` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | Whether or not the campaign is still a draft. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | Name of the campaign. |
| `object` | Value is resource type. |
| `print_speed` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | How the campaign should be scheduled. |
| `send_date` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove, Update.

API path: `/campaigns/{cmp_id}/send`

#### Card

| Field | Description |
| --- | --- |
| `account_id` |  |
| `auto_reorder` | True if the cards should be auto-reordered. |
| `available_quantity` | The available quantity of cards. |
| `back_original_url` | The original URL of the back template. |
| `countries` |  |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | Description of the card. |
| `front_original_url` | The original URL of the front template. |
| `id` | Unique identifier prefixed with `card_`. |
| `mode` |  |
| `object` | Value is resource type. |
| `orientation` | The orientation of the card. |
| `pending_quantity` | The pending quantity of cards. |
| `raw_url` | The raw URL of the card. |
| `reorder_quantity` | The number of cards to be reordered. |
| `send_date` |  |
| `size` | The size of the card |
| `status` |  |
| `threshold_amount` | The threshold amount of the card |
| `thumbnails` |  |
| `url` | The signed link for the card. |

Operations: Create, List, Load, Remove.

API path: `/cards/{card_id}`

#### CardOrder

| Field | Description |
| --- | --- |
| `availability_date` | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | The reason for cancellation. |
| `card_id` | Unique identifier prefixed with `card_`. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | The fixed deadline for the cards to be printed. |
| `id` | Unique identifier prefixed with `co_`. |
| `inventory` | The inventory of the card order. |
| `object` | Value is resource type. |
| `quantity` | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | The quantity of cards ordered |
| `status` | The status of the card order. |
| `unit_price` | The unit price for the card order. |

Operations: Create, List.

API path: `/cards/{card_id}/orders`

#### Check

| Field | Description |
| --- | --- |
| `amount` | The payment amount to be sent in US dollars. |
| `attachment_template_id` |  |
| `attachment_template_version_id` |  |
| `bank_account` |  |
| `carrier` |  |
| `check_bottom_template_id` |  |
| `check_bottom_template_version_id` |  |
| `check_number` |  |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` |  |
| `expected_delivery_date` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` |  |
| `from` |  |
| `id` | Unique identifier prefixed with `chk_`. |
| `mail_type` |  |
| `memo` |  |
| `merge_variables` |  |
| `message` |  |
| `metadata` |  |
| `object` | Value is resource type. |
| `send_date` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | TThe use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/checks`

#### Creative

| Field | Description |
| --- | --- |
| `campaigns` | Array of campaigns associated with the creative ID |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `details` |  |
| `from` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | Unique identifier prefixed with `crv_`. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | Value is resource type. |
| `resource_type` |  |
| `template_preview_urls` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

Operations: Create, Load, Update.

API path: `/creatives`

#### Domain

| Field | Description |
| --- | --- |
| `created_at` | The date and time the domain was created. |
| `domain` | The registered domain/hostname. |
| `error_redirect_link` | URL to redirect customers if a short link is broken or inactive. |
| `id` | Unique identifier for a domain. |
| `status` | The configuration status of the domain. |
| `updated_at` | The date and time the domain was last updated. |

Operations: Create, List, Load, Remove.

API path: `/domains`

#### IdentityValidation

| Field | Description |
| --- | --- |
| `confidence` |  |
| `id` |  |
| `last_line` |  |
| `object` |  |
| `primary_line` |  |
| `recipient` |  |
| `score` |  |
| `secondary_line` |  |
| `urbanization` |  |

Operations: Create.

API path: `/identity_validation`

#### IntlVerification

| Field | Description |
| --- | --- |
| `addresses` |  |
| `components` |  |
| `country` |  |
| `coverage` |  |
| `deliverability` |  |
| `errors` | Indicates whether any errors occurred during the verification process. |
| `id` |  |
| `last_line` |  |
| `object` |  |
| `primary_line` |  |
| `recipient` |  |
| `secondary_line` |  |
| `status` |  |

Operations: Create.

API path: `/intl_verifications`

#### Letter

| Field | Description |
| --- | --- |
| `address_placement` |  |
| `cards` |  |
| `carrier` |  |
| `color` |  |
| `custom_envelope` |  |
| `date_created` |  |
| `date_modified` |  |
| `description` |  |
| `double_sided` |  |
| `expected_delivery_date` |  |
| `extra_service` |  |
| `from` |  |
| `fsc` |  |
| `id` |  |
| `mail_type` |  |
| `merge_variables` |  |
| `metadata` |  |
| `object` |  |
| `perforated_page` |  |
| `return_envelope` |  |
| `send_date` |  |
| `sla` |  |
| `template_id` |  |
| `template_version_id` |  |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` |  |
| `tracking_number` |  |
| `url` |  |
| `use_type` |  |

Operations: Create, List, Load, Remove.

API path: `/letters`

#### Link

| Field | Description |
| --- | --- |
| `created_at` | The date and time the link was created. |
| `domain` | The registered domain to be used for the short URL. |
| `domain_id` | A unique identifier for the registered domain. |
| `id` | Unique identifier prefixed with `lnk_`. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | The original target URL. |
| `short_link` | The shortened URL for the associated original URL. |
| `slug` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | The title of the URL. |
| `updated_at` | The date and time the link was last updated. |

Operations: Create, List, Load, Remove, Update.

API path: `/links`

#### LobCreditsBalance

| Field | Description |
| --- | --- |
| `balance` | Account's current balance of Lob Credits. |

Operations: Load.

API path: `/accounts`

#### Postcard

| Field | Description |
| --- | --- |
| `back_template_id` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` |  |
| `expected_delivery_date` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` |  |
| `from` |  |
| `front_template_id` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | This is in beta. |
| `id` | Unique identifier prefixed with `psc_`. |
| `metadata` |  |
| `object` | Value is resource type. |
| `send_date` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/postcards`

#### QrCode

| Field | Description |
| --- | --- |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | Unique identifier for each mail piece. |
| `scans` | Detailed scan information associated with each mail piece. |

Operations: List.

API path: `/qr_code_analytics`

#### ResourceProof

| Field | Description |
| --- | --- |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | Errors encountered during processing. |
| `id` | Unique identifier prefixed with `res_prf_`. |
| `object` | Value is resource type. |
| `resource_type` | The type of resource to generate a proof for. |
| `status` | The processing status of the resource proof. |
| `template_id` | The template ID associated with the resource proof, if any. |
| `thumbnails` | Thumbnail images of the resource proof. |
| `url` | A URL to the resource proof PDF. |

Operations: Create, Load, Update.

API path: `/resource_proofs`

#### Response

| Field | Description |
| --- | --- |
| `account_id` | Your Lob account id. |
| `brand_name` |  |
| `campaign_code` | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Whether the resource has been deleted. |
| `end_date` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | The last serial number in the range of serial numbers for this campaign. |
| `id` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` |  |
| `mode` | The mode of the Informed Delivery campaign. |
| `object` | Value is the resource type. |
| `quantity` |  |
| `representative_image_s3_link` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | A URL link to the campaigns ride along image. |
| `ride_along_url` |  |
| `service_request_number` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` |  |
| `start_serial` | The first serial number in the range of serial numbers for this campaign. |
| `status` |  |
| `usps_campaign_id` | A numberical string up to 12 characters long. |
| `usps_title` |  |

Operations: Create, List, Load, Update.

API path: `/informed_delivery_campaigns`

#### ReverseGeocode

| Field | Description |
| --- | --- |
| `addresses` | list of addresses |
| `id` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | Value is resource type. |

Operations: Create.

API path: `/us_reverse_geocode_lookups`

#### SelfMailer

| Field | Description |
| --- | --- |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` |  |
| `expected_delivery_date` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` |  |
| `from` |  |
| `fsc` | This is in beta. |
| `id` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` |  |
| `merge_variables` |  |
| `metadata` |  |
| `object` | Value is resource type. |
| `outside_template_id` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` |  |
| `size` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` | An array of certified tracking events ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/self_mailers`

#### SnapPack

| Field | Description |
| --- | --- |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `color` | Set this key to `true` if you would like to print in color. |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` |  |
| `expected_delivery_date` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` |  |
| `from` |  |
| `fsc` | Contact support@lob.com or your account contact to learn more. |
| `id` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` |  |
| `merge_variables` |  |
| `object` | Value is resource type. |
| `outside_template_id` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` |  |
| `size` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `tracking_events` | An array of tracking events ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: Create, List, Load, Remove.

API path: `/snap_packs`

#### Template

| Field | Description |
| --- | --- |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `engine` | The engine used to combine HTML template with merge variables. |
| `html` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | Value is resource type. |
| `published_version` |  |
| `required_vars` | An array of required variables to be used in a template. |
| `versions` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

Operations: Create, List, Load, Remove.

API path: `/templates/{tmpl_id}`

#### TemplateVersion

| Field | Description |
| --- | --- |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `engine` | The engine used to combine HTML template with merge variables. |
| `html` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | Object representing the keys of every merge variable present in the template. |
| `object` | Value is resource type. |
| `required_vars` | An array of required variables to be used in a template. |
| `suggest_json_editor` | Used by frontend, true if the template uses advanced features. |

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
| `accountId` | Account ID that made the request |
| `bytesProcessed` | Number of bytes processed in your CSV |
| `campaignId` |  |
| `dateCreated` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | Number of mailpieces that failed to create |
| `failuresUrl` | Url where your campaign mailpiece failures can be retrieved |
| `id` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | test |
| `metadata` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | Filename of the upload |
| `requiredAddressColumnMapping` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | The URL for the generated export file. |
| `state` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | Total number of recipients for the campaign |
| `type` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | Number of mailpieces that were successfully created |

Operations: Create, List, Load, Remove, Update.

API path: `/uploads/{upl_id}/file`

#### UploadCreateExport

| Field | Description |
| --- | --- |
| `exportId` |  |
| `id` |  |
| `message` |  |
| `type` |  |

Operations: Create.

API path: `/uploads/{upl_id}/exports`

#### UsAutocompletion

| Field | Description |
| --- | --- |
| `address_prefix` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | Unique identifier prefixed with `us_auto_`. |
| `object` | Value is resource type. |
| `state` | An optional state input used to filter suggestions. |
| `suggestions` | An array of objects representing suggested addresses. |
| `zip_code` | An optional ZIP Code input used to filter suggestions. |

Operations: Create.

API path: `/us_autocompletions`

#### UsVerification

| Field | Description |
| --- | --- |
| `addresses` |  |
| `components` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | Indicates whether any errors occurred during the verification process. |
| `id` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | Value is resource type. |
| `primary_line` | The primary delivery line (usually the street address) of the address. |
| `recipient` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | The secondary delivery line of the address. |
| `urbanization` | Only present for addresses in Puerto Rico. |
| `valid_address` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

Operations: Create.

API path: `/bulk/us_verifications`

#### Zip

| Field | Description |
| --- | --- |
| `zip_code` | A 5-digit ZIP code. |

Operations: Create.

API path: `/us_zip_lookups`



## Entities


### Address

Create an instance: `local address = client:Address(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_city` | `string` |  |
| `address_country` | `string` |  |
| `address_line1` | `string` |  |
| `address_line2` | `string` |  |
| `address_state` | `string` |  |
| `address_zip` | `string` |  |
| `company` | `string` |  |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `metadata` | `table` |  |
| `name` | `string` |  |
| `object` | `string` |  |
| `phone` | `string` |  |

#### Example: Load

```lua
local address, err = client:Address():load({ id = "address_id" })
```

#### Example: List

```lua
local addresss, err = client:Address():list()
```

#### Example: Create

```lua
local address, err = client:Address():create({
})
```


### BankAccount

Create an instance: `local bank_account = client:BankAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `string` |  |
| `account_type` | `string` | The type of entity that holds the account. |
| `bank_name` | `string` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `string` | The check template used for printing. |
| `city` | `string` | The city associated with your home bank account. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | The fractional routing number for your home bank account. |
| `id` | `string` |  |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | The type of microdeposit verification required for this bank account. |
| `object` | `string` | Value is resource type. |
| `routing_number` | `string` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | The signatory associated with your account. |
| `signature_url` | `any` |  |
| `state` | `string` | The state associated with your home bank account. |
| `verified` | `boolean` | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | The zipcode associated with your home bank account. |

#### Example: Load

```lua
local bank_account, err = client:BankAccount():load({ id = "bank_account_id" })
```

#### Example: List

```lua
local bank_accounts, err = client:BankAccount():list()
```

#### Example: Create

```lua
local bank_account, err = client:BankAccount():create({
  account_number = "example_account_number", -- string
  account_type = "example_account_type", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  id = "example_id", -- string
  object = "example_object", -- string
  routing_number = "example_routing_number", -- string
  signatory = "example_signatory", -- string
})
```


### BankDeletion

Create an instance: `local bank_deletion = client:BankDeletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### BillingGroup

Create an instance: `local billing_group = client:BillingGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `string` | Description of the billing group. |
| `id` | `string` | Unique identifier prefixed with `bg_`. |
| `name` | `string` | Name of the billing group. |
| `object` | `string` | Value is resource type. |

#### Example: Load

```lua
local billing_group, err = client:BillingGroup():load({ id = "billing_group_id" })
```

#### Example: List

```lua
local billing_groups, err = client:BillingGroup():list()
```

#### Example: Create

```lua
local billing_group, err = client:BillingGroup():create({
  id = "example_id", -- string
})
```


### Booklet

Create an instance: `local booklet = client:Booklet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `carrier` | `string` |  |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` |  |
| `from` | `table` |  |
| `fsc` | `boolean` |  |
| `id` | `string` |  |
| `mail_type` | `string` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `table` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` |  |
| `pages` | `number` |  |
| `send_date` | `string` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` |  |
| `sla` | `string` |  |
| `source_material` | `string` |  |
| `thumbnails` | `table` |  |
| `to` | `table` |  |
| `tracking_events` | `table` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```lua
local booklet, err = client:Booklet():load({ id = "booklet_id" })
```

#### Example: List

```lua
local booklets, err = client:Booklet():list()
```

#### Example: Create

```lua
local booklet, err = client:Booklet():create({
})
```


### Buckslip

Create an instance: `local buckslip = client:Buckslip(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `allocated_quantity` | `number` | The allocated quantity of buckslips. |
| `auto_reorder` | `boolean` | True if the buckslips should be auto-reordered. |
| `available_quantity` | `number` | The available quantity of buckslips. |
| `back_original_url` | `string` | The original URL of the back template. |
| `buckslip_orders` | `table` | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the buckslip. |
| `finish` | `string` |  |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `bck_`. |
| `mode` | `string` |  |
| `object` | `string` | Value is resource type. |
| `onhand_quantity` | `number` | The onhand quantity of buckslips. |
| `pending_quantity` | `number` | The pending quantity of buckslips. |
| `projected_quantity` | `number` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | The raw URL of the buckslip. |
| `reorder_quantity` | `number` | The number of buckslips to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the buckslip |
| `status` | `string` |  |
| `stock` | `string` |  |
| `threshold_amount` | `number` | The threshold amount of the buckslip |
| `thumbnails` | `table` |  |
| `url` | `string` | The signed link for the buckslip. |
| `weight` | `string` |  |

#### Example: Load

```lua
local buckslip, err = client:Buckslip():load({ id = "buckslip_id" })
```

#### Example: List

```lua
local buckslips, err = client:Buckslip():list()
```

#### Example: Create

```lua
local buckslip, err = client:Buckslip():create({
  allocated_quantity = 1, -- number
  auto_reorder = true, -- boolean
  available_quantity = 1, -- number
  back_original_url = "example_back_original_url", -- string
  buckslip_orders = {}, -- table
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  finish = "example_finish", -- string
  front_original_url = "example_front_original_url", -- string
  id = "example_id", -- string
  object = "example_object", -- string
  onhand_quantity = 1, -- number
  pending_quantity = 1, -- number
  projected_quantity = 1, -- number
  raw_url = "example_raw_url", -- string
  reorder_quantity = 1, -- number
  status = "example_status", -- string
  stock = "example_stock", -- string
  threshold_amount = 1, -- number
  thumbnails = {}, -- table
  url = "example_url", -- string
  weight = "example_weight", -- string
})
```


### BuckslipOrder

Create an instance: `local buckslip_order = client:BuckslipOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability_date` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | `string` | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | `string` | The reason for cancellation. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | The fixed deadline for the buckslips to be printed. |
| `id` | `string` | Unique identifier prefixed with `bo_`. |
| `inventory` | `number` | The inventory of the buckslip order. |
| `object` | `string` | Value is resource type. |
| `quantity` | `number` | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `number` | The quantity of buckslips ordered. |
| `status` | `string` | The status of the buckslip order. |
| `unit_price` | `number` | The unit price for the buckslip order. |

#### Example: List

```lua
local buckslip_orders, err = client:BuckslipOrder():list()
```

#### Example: Create

```lua
local buckslip_order, err = client:BuckslipOrder():create({
  id = "example_id", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  object = "example_object", -- string
  quantity = 1, -- number
})
```


### Campaign

Create an instance: `local campaign = client:Campaign(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_cancel_if_ncoa` | `boolean` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `number` | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `table` | An array of creatives that have been associated with this campaign. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `id` | `string` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `boolean` | Whether or not the campaign is still a draft. |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Name of the campaign. |
| `object` | `string` | Value is resource type. |
| `print_speed` | `string` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | How the campaign should be scheduled. |
| `send_date` | `string` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `table` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```lua
local campaign, err = client:Campaign():load({ id = "campaign_id" })
```

#### Example: List

```lua
local campaigns, err = client:Campaign():list()
```

#### Example: Create

```lua
local campaign, err = client:Campaign():create({
  creatives = {}, -- table
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  id = "example_id", -- string
  is_draft = true, -- boolean
  name = "example_name", -- string
  object = "example_object", -- string
  schedule_type = "example_schedule_type", -- string
  uploads = {}, -- table
  use_type = "example_use_type", -- string
})
```


### Card

Create an instance: `local card = client:Card(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `auto_reorder` | `boolean` | True if the cards should be auto-reordered. |
| `available_quantity` | `number` | The available quantity of cards. |
| `back_original_url` | `string` | The original URL of the back template. |
| `countries` | `string` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the card. |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `card_`. |
| `mode` | `string` |  |
| `object` | `string` | Value is resource type. |
| `orientation` | `string` | The orientation of the card. |
| `pending_quantity` | `number` | The pending quantity of cards. |
| `raw_url` | `string` | The raw URL of the card. |
| `reorder_quantity` | `number` | The number of cards to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the card |
| `status` | `string` |  |
| `threshold_amount` | `number` | The threshold amount of the card |
| `thumbnails` | `table` |  |
| `url` | `string` | The signed link for the card. |

#### Example: Load

```lua
local card, err = client:Card():load({ id = "card_id" })
```

#### Example: List

```lua
local cards, err = client:Card():list()
```

#### Example: Create

```lua
local card, err = client:Card():create({
  id = "example_id", -- string
  auto_reorder = true, -- boolean
  available_quantity = 1, -- number
  back_original_url = "example_back_original_url", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  front_original_url = "example_front_original_url", -- string
  object = "example_object", -- string
  orientation = "example_orientation", -- string
  pending_quantity = 1, -- number
  raw_url = "example_raw_url", -- string
  reorder_quantity = 1, -- number
  status = "example_status", -- string
  threshold_amount = 1, -- number
  thumbnails = {}, -- table
  url = "example_url", -- string
})
```


### CardOrder

Create an instance: `local card_order = client:CardOrder(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability_date` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | `string` | The reason for cancellation. |
| `card_id` | `string` | Unique identifier prefixed with `card_`. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | The fixed deadline for the cards to be printed. |
| `id` | `string` | Unique identifier prefixed with `co_`. |
| `inventory` | `number` | The inventory of the card order. |
| `object` | `string` | Value is resource type. |
| `quantity` | `number` | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `number` | The quantity of cards ordered |
| `status` | `string` | The status of the card order. |
| `unit_price` | `number` | The unit price for the card order. |

#### Example: List

```lua
local card_orders, err = client:CardOrder():list()
```

#### Example: Create

```lua
local card_order, err = client:CardOrder():create({
  id = "example_id", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  object = "example_object", -- string
  quantity = 1, -- number
})
```


### Check

Create an instance: `local check = client:Check(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` |  |
| `attachment_template_version_id` | `string` |  |
| `bank_account` | `any` |  |
| `carrier` | `string` |  |
| `check_bottom_template_id` | `string` |  |
| `check_bottom_template_version_id` | `string` |  |
| `check_number` | `number` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `table` |  |
| `from` | `any` |  |
| `id` | `string` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` |  |
| `memo` | `string` |  |
| `merge_variables` | `table` |  |
| `message` | `string` |  |
| `metadata` | `table` |  |
| `object` | `string` | Value is resource type. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `table` |  |
| `to` | `any` |  |
| `tracking_events` | `table` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | TThe use type for each mailpiece. |

#### Example: Load

```lua
local check, err = client:Check():load({ id = "check_id" })
```

#### Example: List

```lua
local checks, err = client:Check():list()
```

#### Example: Create

```lua
local check, err = client:Check():create({
  amount = 1, -- number
  bank_account = "example_bank_account", -- any
  carrier = "example_carrier", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  id = "example_id", -- string
  to = "example_to", -- any
  url = "example_url", -- string
  use_type = "example_use_type", -- string
})
```


### Creative

Create an instance: `local creative = client:Creative(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `table` | Array of campaigns associated with the creative ID |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `details` | `table` |  |
| `from` | `string` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Unique identifier prefixed with `crv_`. |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` |  |
| `template_preview_urls` | `table` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `table` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```lua
local creative, err = client:Creative():load({ id = "creative_id" })
```

#### Example: Create

```lua
local creative, err = client:Creative():create({
  campaigns = {}, -- table
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  id = "example_id", -- string
  object = "example_object", -- string
  template_preview_urls = {}, -- table
  template_previews = {}, -- table
})
```


### Domain

Create an instance: `local domain = client:Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The date and time the domain was created. |
| `domain` | `string` | The registered domain/hostname. |
| `error_redirect_link` | `string` | URL to redirect customers if a short link is broken or inactive. |
| `id` | `string` | Unique identifier for a domain. |
| `status` | `string` | The configuration status of the domain. |
| `updated_at` | `string` | The date and time the domain was last updated. |

#### Example: Load

```lua
local domain, err = client:Domain():load({ id = "domain_id" })
```

#### Example: List

```lua
local domains, err = client:Domain():list()
```

#### Example: Create

```lua
local domain, err = client:Domain():create({
})
```


### IdentityValidation

Create an instance: `local identity_validation = client:IdentityValidation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `string` |  |
| `id` | `string` |  |
| `last_line` | `string` |  |
| `object` | `string` |  |
| `primary_line` | `string` |  |
| `recipient` | `string` |  |
| `score` | `number` |  |
| `secondary_line` | `string` |  |
| `urbanization` | `string` |  |

#### Example: Create

```lua
local identity_validation, err = client:IdentityValidation():create({
})
```


### IntlVerification

Create an instance: `local intl_verification = client:IntlVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `table` |  |
| `components` | `table` |  |
| `country` | `string` |  |
| `coverage` | `string` |  |
| `deliverability` | `string` |  |
| `errors` | `boolean` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` |  |
| `last_line` | `string` |  |
| `object` | `string` |  |
| `primary_line` | `string` |  |
| `recipient` | `string` |  |
| `secondary_line` | `string` |  |
| `status` | `string` |  |

#### Example: Create

```lua
local intl_verification, err = client:IntlVerification():create({
  addresses = {}, -- table
  errors = true, -- boolean
})
```


### Letter

Create an instance: `local letter = client:Letter(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_placement` | `string` |  |
| `cards` | `table` |  |
| `carrier` | `string` |  |
| `color` | `boolean` |  |
| `custom_envelope` | `string` |  |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `double_sided` | `boolean` |  |
| `expected_delivery_date` | `string` |  |
| `extra_service` | `string` |  |
| `from` | `table` |  |
| `fsc` | `boolean` |  |
| `id` | `string` |  |
| `mail_type` | `string` |  |
| `merge_variables` | `table` |  |
| `metadata` | `table` |  |
| `object` | `string` |  |
| `perforated_page` | `string` |  |
| `return_envelope` | `boolean` |  |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `template_id` | `string` |  |
| `template_version_id` | `string` |  |
| `thumbnails` | `table` |  |
| `to` | `table` |  |
| `tracking_events` | `table` |  |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```lua
local letter, err = client:Letter():load({ id = "letter_id" })
```

#### Example: List

```lua
local letters, err = client:Letter():list()
```

#### Example: Create

```lua
local letter, err = client:Letter():create({
})
```


### Link

Create an instance: `local link = client:Link(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The date and time the link was created. |
| `domain` | `string` | The registered domain to be used for the short URL. |
| `domain_id` | `string` | A unique identifier for the registered domain. |
| `id` | `string` | Unique identifier prefixed with `lnk_`. |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `string` | The original target URL. |
| `short_link` | `string` | The shortened URL for the associated original URL. |
| `slug` | `string` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | The title of the URL. |
| `updated_at` | `string` | The date and time the link was last updated. |

#### Example: Load

```lua
local link, err = client:Link():load({ id = "link_id" })
```

#### Example: List

```lua
local links, err = client:Link():list()
```

#### Example: Create

```lua
local link, err = client:Link():create({
})
```


### LobCreditsBalance

Create an instance: `local lob_credits_balance = client:LobCreditsBalance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `number` | Account's current balance of Lob Credits. |

#### Example: Load

```lua
local lob_credits_balance, err = client:LobCreditsBalance():load()
```


### Postcard

Create an instance: `local postcard = client:Postcard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `back_template_id` | `string` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `table` |  |
| `from` | `any` |  |
| `front_template_id` | `string` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `boolean` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `psc_`. |
| `metadata` | `table` |  |
| `object` | `string` | Value is resource type. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `table` |  |
| `to` | `any` |  |
| `tracking_events` | `table` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```lua
local postcard, err = client:Postcard():load({ id = "postcard_id" })
```

#### Example: List

```lua
local postcards, err = client:Postcard():list()
```

#### Example: Create

```lua
local postcard, err = client:Postcard():create({
  back_template_id = "example_back_template_id", -- string
  carrier = "example_carrier", -- string
  front_template_id = "example_front_template_id", -- string
  id = "example_id", -- string
  to = "example_to", -- any
  url = "example_url", -- string
})
```


### QrCode

Create an instance: `local qr_code = client:QrCode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `number` | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `string` | Unique identifier for each mail piece. |
| `scans` | `table` | Detailed scan information associated with each mail piece. |

#### Example: List

```lua
local qr_codes, err = client:QrCode():list()
```


### ResourceProof

Create an instance: `local resource_proof = client:ResourceProof(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `table` | Errors encountered during processing. |
| `id` | `string` | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` | The type of resource to generate a proof for. |
| `status` | `string` | The processing status of the resource proof. |
| `template_id` | `string` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `table` | Thumbnail images of the resource proof. |
| `url` | `string` | A URL to the resource proof PDF. |

#### Example: Load

```lua
local resource_proof, err = client:ResourceProof():load({ id = "resource_proof_id" })
```

#### Example: Create

```lua
local resource_proof, err = client:ResourceProof():create({
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  id = "example_id", -- string
  object = "example_object", -- string
})
```


### Response

Create an instance: `local response = client:Response(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` | Your Lob account id. |
| `brand_name` | `string` |  |
| `campaign_code` | `string` | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Whether the resource has been deleted. |
| `end_date` | `string` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `number` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` |  |
| `mode` | `string` | The mode of the Informed Delivery campaign. |
| `object` | `string` | Value is the resource type. |
| `quantity` | `number` |  |
| `representative_image_s3_link` | `string` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` |  |
| `service_request_number` | `string` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` |  |
| `start_serial` | `number` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` |  |
| `usps_campaign_id` | `string` | A numberical string up to 12 characters long. |
| `usps_title` | `string` |  |

#### Example: Load

```lua
local response, err = client:Response():load({ usps_campaign_id = "usps_campaign_id" })
```

#### Example: List

```lua
local responses, err = client:Response():list()
```

#### Example: Create

```lua
local response, err = client:Response():create({
  account_id = "example_account_id", -- string
  campaign_code = "example_campaign_code", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  deleted = true, -- boolean
  end_date = "example_end_date", -- string
  end_serial = 1, -- number
  id = "example_id", -- string
  mode = "example_mode", -- string
  object = "example_object", -- string
  representative_image_s3_link = "example_representative_image_s3_link", -- string
  ride_along_image_s3_link = "example_ride_along_image_s3_link", -- string
  service_request_number = "example_service_request_number", -- string
  start_serial = 1, -- number
  usps_campaign_id = "example_usps_campaign_id", -- string
})
```


### ReverseGeocode

Create an instance: `local reverse_geocode = client:ReverseGeocode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `table` | list of addresses |
| `id` | `string` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `number` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `number` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | Value is resource type. |

#### Example: Create

```lua
local reverse_geocode, err = client:ReverseGeocode():create({
  latitude = 1, -- number
  longitude = 1, -- number
})
```


### SelfMailer

Create an instance: `local self_mailer = client:SelfMailer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `table` |  |
| `from` | `any` |  |
| `fsc` | `boolean` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` |  |
| `merge_variables` | `table` |  |
| `metadata` | `table` |  |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `table` |  |
| `to` | `any` |  |
| `tracking_events` | `table` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```lua
local self_mailer, err = client:SelfMailer():load({ id = "self_mailer_id" })
```

#### Example: List

```lua
local self_mailers, err = client:SelfMailer():list()
```

#### Example: Create

```lua
local self_mailer, err = client:SelfMailer():create({
  carrier = "example_carrier", -- string
  id = "example_id", -- string
  to = "example_to", -- any
  url = "example_url", -- string
  use_type = "example_use_type", -- string
})
```


### SnapPack

Create an instance: `local snap_pack = client:SnapPack(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `string` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` |  |
| `color` | `boolean` | Set this key to `true` if you would like to print in color. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `table` |  |
| `from` | `any` |  |
| `fsc` | `boolean` | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` |  |
| `merge_variables` | `table` |  |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `table` |  |
| `to` | `any` |  |
| `tracking_events` | `table` | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```lua
local snap_pack, err = client:SnapPack():load({ id = "snap_pack_id" })
```

#### Example: List

```lua
local snap_packs, err = client:SnapPack():list()
```

#### Example: Create

```lua
local snap_pack, err = client:SnapPack():create({
  carrier = "example_carrier", -- string
  id = "example_id", -- string
  to = "example_to", -- any
  url = "example_url", -- string
  use_type = "example_use_type", -- string
})
```


### Template

Create an instance: `local template = client:Template(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `table` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `published_version` | `any` |  |
| `required_vars` | `table` | An array of required variables to be used in a template. |
| `versions` | `table` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```lua
local template, err = client:Template():load({ id = "template_id" })
```

#### Example: List

```lua
local templates, err = client:Template():list()
```

#### Example: Create

```lua
local template, err = client:Template():create({
  id = "example_id", -- string
  html = "example_html", -- string
  published_version = "example_published_version", -- any
  versions = {}, -- table
})
```


### TemplateVersion

Create an instance: `local template_version = client:TemplateVersion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `table` | Object representing the keys of every merge variable present in the template. |
| `object` | `string` | Value is resource type. |
| `required_vars` | `table` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `boolean` | Used by frontend, true if the template uses advanced features. |

#### Example: Load

```lua
local template_version, err = client:TemplateVersion():load({ id = "template_version_id", template_id = "template_id" })
```

#### Example: List

```lua
local template_versions, err = client:TemplateVersion():list()
```

#### Example: Create

```lua
local template_version, err = client:TemplateVersion():create({
  id = "example_id", -- string
  date_created = "example_date_created", -- string
  date_modified = "example_date_modified", -- string
  html = "example_html", -- string
  object = "example_object", -- string
})
```


### TemplateVersionDeletion

Create an instance: `local template_version_deletion = client:TemplateVersionDeletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Upload

Create an instance: `local upload = client:Upload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `string` | Account ID that made the request |
| `bytesProcessed` | `number` | Number of bytes processed in your CSV |
| `campaignId` | `any` |  |
| `dateCreated` | `string` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `boolean` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `number` | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `table` | test |
| `metadata` | `table` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `table` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | Filename of the upload |
| `requiredAddressColumnMapping` | `table` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | The URL for the generated export file. |
| `state` | `string` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `number` | Total number of recipients for the campaign |
| `type` | `string` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `number` | Number of mailpieces that were successfully created |

#### Example: Load

```lua
local upload, err = client:Upload():load({ id = "upload_id" })
```

#### Example: List

```lua
local uploads, err = client:Upload():list()
```

#### Example: Create

```lua
local upload, err = client:Upload():create({
  accountId = "example_accountId", -- string
  bytesProcessed = 1, -- number
  campaignId = "example_campaignId", -- any
  dateCreated = "example_dateCreated", -- string
  dateModified = "example_dateModified", -- string
  deleted = true, -- boolean
  failedMailpieces = 1, -- number
  id = "example_id", -- string
  metadata = {}, -- table
  mode = "example_mode", -- string
  optionalAddressColumnMapping = {}, -- table
  requiredAddressColumnMapping = {}, -- table
  s3Url = "example_s3Url", -- string
  state = "example_state", -- string
  totalMailpieces = 1, -- number
  type = "example_type", -- string
  uploadId = "example_uploadId", -- string
  validatedMailpieces = 1, -- number
})
```


### UploadCreateExport

Create an instance: `local upload_create_export = client:UploadCreateExport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exportId` | `string` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `type` | `string` |  |

#### Example: Create

```lua
local upload_create_export, err = client:UploadCreateExport():create({
  id = "example_id", -- string
  exportId = "example_exportId", -- string
  message = "example_message", -- string
})
```


### UsAutocompletion

Create an instance: `local us_autocompletion = client:UsAutocompletion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_prefix` | `string` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `string` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `boolean` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `string` | Unique identifier prefixed with `us_auto_`. |
| `object` | `string` | Value is resource type. |
| `state` | `string` | An optional state input used to filter suggestions. |
| `suggestions` | `table` | An array of objects representing suggested addresses. |
| `zip_code` | `string` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```lua
local us_autocompletion, err = client:UsAutocompletion():create({
  address_prefix = "example_address_prefix", -- string
})
```


### UsVerification

Create an instance: `local us_verification = client:UsVerification(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `table` |  |
| `components` | `table` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `table` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `boolean` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `table` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | Value is resource type. |
| `primary_line` | `string` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | The secondary delivery line of the address. |
| `urbanization` | `string` | Only present for addresses in Puerto Rico. |
| `valid_address` | `boolean` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```lua
local us_verification, err = client:UsVerification():create({
  addresses = {}, -- table
  components = {}, -- table
  deliverability_analysis = {}, -- table
  errors = true, -- boolean
  lob_confidence_score = {}, -- table
})
```


### Zip

Create an instance: `local zip = client:Zip(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `string` | A 5-digit ZIP code. |

#### Example: Create

```lua
local zip, err = client:Zip():create({
  zip_code = "example_zip_code", -- string
})
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

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `campaign` | `creatives` | 3 | 15 levels |

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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── lob_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`lob_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local campaign = client:Campaign()
campaign:list()

-- campaign:data_get() now returns the campaign data from the last list
-- campaign:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
