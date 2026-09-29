# Lob Ruby SDK



The Ruby SDK for the Lob API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Address` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lob-sdk/releases)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/lob-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-lob-sdk", path: "./lob-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Lob_sdk"

client = LobSDK.new({
  "apikey" => ENV["LOB_APIKEY"],
})
```

### 2. List address records

```ruby
begin
  # list returns an Array of Address records — iterate directly.
  addresss = client.Address.list
  addresss.each do |item|
    puts "#{item["id"]} #{item["address_city"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a templateversion

TemplateVersion is nested under template, so provide the `template_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the TemplateVersion record (raises on error).
  templateversion = client.TemplateVersion.load({ "template_id" => "example_template_id", "id" => "example_id" })
  puts templateversion
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Address record.
created = client.Address.create({ "address_city" => "example_address_city", "address_country" => "example_address_country" })

# Remove
client.Address.remove({ "id" => created.data_get["id"] })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  campaigns = client.Campaign.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = LobSDK.test({
  "entity" => { "campaign" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
campaign = client.Campaign.list()
puts campaign
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LobSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LobSDK

```ruby
require_relative "Lob_sdk"
client = LobSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LobSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LobSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LobError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `address = client.Address`

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
| `address_city` | `String` |  |
| `address_country` | `String` |  |
| `address_line1` | `String` |  |
| `address_line2` | `String` |  |
| `address_state` | `String` |  |
| `address_zip` | `String` |  |
| `company` | `String` |  |
| `date_created` | `String` |  |
| `date_modified` | `String` |  |
| `description` | `String` |  |
| `email` | `String` |  |
| `id` | `String` |  |
| `metadata` | `Hash` |  |
| `name` | `String` |  |
| `object` | `String` |  |
| `phone` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Address record (raises on error).
address = client.Address.load({ "id" => "address_id" })
```

#### Example: List

```ruby
# list returns an Array of Address records (raises on error).
addresss = client.Address.list
```

#### Example: Create

```ruby
address = client.Address.create({
})
```


### BankAccount

Create an instance: `bank_account = client.BankAccount`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `String` |  |
| `account_type` | `String` | The type of entity that holds the account. |
| `bank_name` | `String` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `String` | The check template used for printing. |
| `city` | `String` | The city associated with your home bank account. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | An internal description that identifies this resource. |
| `fractional_routing_number` | `String` | The fractional routing number for your home bank account. |
| `id` | `String` |  |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `String` | The type of microdeposit verification required for this bank account. |
| `object` | `String` | Value is resource type. |
| `routing_number` | `String` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `String` | The signatory associated with your account. |
| `signature_url` | `Object` |  |
| `state` | `String` | The state associated with your home bank account. |
| `verified` | `Boolean` | A bank account must be verified before a check can be created. |
| `zipcode` | `String` | The zipcode associated with your home bank account. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BankAccount record (raises on error).
bank_account = client.BankAccount.load({ "id" => "bank_account_id" })
```

#### Example: List

```ruby
# list returns an Array of BankAccount records (raises on error).
bank_accounts = client.BankAccount.list
```

#### Example: Create

```ruby
bank_account = client.BankAccount.create({
  "account_number" => "example_account_number", # String
  "account_type" => "example_account_type", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
  "routing_number" => "example_routing_number", # String
  "signatory" => "example_signatory", # String
})
```


### BankDeletion

Create an instance: `bank_deletion = client.BankDeletion`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### BillingGroup

Create an instance: `billing_group = client.BillingGroup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `String` | Description of the billing group. |
| `id` | `String` | Unique identifier prefixed with `bg_`. |
| `name` | `String` | Name of the billing group. |
| `object` | `String` | Value is resource type. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BillingGroup record (raises on error).
billing_group = client.BillingGroup.load({ "id" => "billing_group_id" })
```

#### Example: List

```ruby
# list returns an Array of BillingGroup records (raises on error).
billing_groups = client.BillingGroup.list
```

#### Example: Create

```ruby
billing_group = client.BillingGroup.create({
  "id" => "example_id", # String
})
```


### Booklet

Create an instance: `booklet = client.Booklet`

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
| `carrier` | `String` |  |
| `date_created` | `String` |  |
| `date_modified` | `String` |  |
| `description` | `String` | An internal description that identifies this resource. |
| `expected_delivery_date` | `String` |  |
| `from` | `Hash` |  |
| `fsc` | `Boolean` |  |
| `id` | `String` |  |
| `mail_type` | `String` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `Hash` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` |  |
| `pages` | `Integer` |  |
| `send_date` | `String` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `String` |  |
| `sla` | `String` |  |
| `source_material` | `String` |  |
| `thumbnails` | `Array` |  |
| `to` | `Hash` |  |
| `tracking_events` | `Array` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `String` |  |
| `url` | `String` |  |
| `use_type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Booklet record (raises on error).
booklet = client.Booklet.load({ "id" => "booklet_id" })
```

#### Example: List

```ruby
# list returns an Array of Booklet records (raises on error).
booklets = client.Booklet.list
```

#### Example: Create

```ruby
booklet = client.Booklet.create({
})
```


### Buckslip

Create an instance: `buckslip = client.Buckslip`

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
| `account_id` | `String` |  |
| `allocated_quantity` | `Float` | The allocated quantity of buckslips. |
| `auto_reorder` | `Boolean` | True if the buckslips should be auto-reordered. |
| `available_quantity` | `Float` | The available quantity of buckslips. |
| `back_original_url` | `String` | The original URL of the back template. |
| `buckslip_orders` | `Array` | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | Description of the buckslip. |
| `finish` | `String` |  |
| `front_original_url` | `String` | The original URL of the front template. |
| `id` | `String` | Unique identifier prefixed with `bck_`. |
| `mode` | `String` |  |
| `object` | `String` | Value is resource type. |
| `onhand_quantity` | `Float` | The onhand quantity of buckslips. |
| `pending_quantity` | `Float` | The pending quantity of buckslips. |
| `projected_quantity` | `Float` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `String` | The raw URL of the buckslip. |
| `reorder_quantity` | `Integer` | The number of buckslips to be reordered. |
| `send_date` | `String` |  |
| `size` | `String` | The size of the buckslip |
| `status` | `String` |  |
| `stock` | `String` |  |
| `threshold_amount` | `Integer` | The threshold amount of the buckslip |
| `thumbnails` | `Array` |  |
| `url` | `String` | The signed link for the buckslip. |
| `weight` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Buckslip record (raises on error).
buckslip = client.Buckslip.load({ "id" => "buckslip_id" })
```

#### Example: List

```ruby
# list returns an Array of Buckslip records (raises on error).
buckslips = client.Buckslip.list
```

#### Example: Create

```ruby
buckslip = client.Buckslip.create({
  "allocated_quantity" => 1, # Float
  "auto_reorder" => true, # Boolean
  "available_quantity" => 1, # Float
  "back_original_url" => "example_back_original_url", # String
  "buckslip_orders" => [], # Array
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "finish" => "example_finish", # String
  "front_original_url" => "example_front_original_url", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
  "onhand_quantity" => 1, # Float
  "pending_quantity" => 1, # Float
  "projected_quantity" => 1, # Float
  "raw_url" => "example_raw_url", # String
  "reorder_quantity" => 1, # Integer
  "status" => "example_status", # String
  "stock" => "example_stock", # String
  "threshold_amount" => 1, # Integer
  "thumbnails" => [], # Array
  "url" => "example_url", # String
  "weight" => "example_weight", # String
})
```


### BuckslipOrder

Create an instance: `buckslip_order = client.BuckslipOrder`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability_date` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | `String` | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | `String` | The reason for cancellation. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `String` | The fixed deadline for the buckslips to be printed. |
| `id` | `String` | Unique identifier prefixed with `bo_`. |
| `inventory` | `Float` | The inventory of the buckslip order. |
| `object` | `String` | Value is resource type. |
| `quantity` | `Integer` | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `Float` | The quantity of buckslips ordered. |
| `status` | `String` | The status of the buckslip order. |
| `unit_price` | `Float` | The unit price for the buckslip order. |

#### Example: List

```ruby
# list returns an Array of BuckslipOrder records (raises on error).
buckslip_orders = client.BuckslipOrder.list
```

#### Example: Create

```ruby
buckslip_order = client.BuckslipOrder.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "object" => "example_object", # String
  "quantity" => 1, # Integer
})
```


### Campaign

Create an instance: `campaign = client.Campaign`

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
| `auto_cancel_if_ncoa` | `Boolean` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `String` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `Integer` | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `Array` | An array of creatives that have been associated with this campaign. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | An internal description that identifies this resource. |
| `id` | `String` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `Boolean` | Whether or not the campaign is still a draft. |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `String` | Name of the campaign. |
| `object` | `String` | Value is resource type. |
| `print_speed` | `String` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `String` | How the campaign should be scheduled. |
| `send_date` | `String` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `String` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `Array` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `String` | The use type for each mailpiece. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Campaign record (raises on error).
campaign = client.Campaign.load({ "id" => "campaign_id" })
```

#### Example: List

```ruby
# list returns an Array of Campaign records (raises on error).
campaigns = client.Campaign.list
```

#### Example: Create

```ruby
campaign = client.Campaign.create({
  "creatives" => [], # Array
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "is_draft" => true, # Boolean
  "name" => "example_name", # String
  "object" => "example_object", # String
  "schedule_type" => "example_schedule_type", # String
  "uploads" => [], # Array
  "use_type" => "example_use_type", # String
})
```


### Card

Create an instance: `card = client.Card`

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
| `account_id` | `String` |  |
| `auto_reorder` | `Boolean` | True if the cards should be auto-reordered. |
| `available_quantity` | `Integer` | The available quantity of cards. |
| `back_original_url` | `String` | The original URL of the back template. |
| `countries` | `String` |  |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | Description of the card. |
| `front_original_url` | `String` | The original URL of the front template. |
| `id` | `String` | Unique identifier prefixed with `card_`. |
| `mode` | `String` |  |
| `object` | `String` | Value is resource type. |
| `orientation` | `String` | The orientation of the card. |
| `pending_quantity` | `Integer` | The pending quantity of cards. |
| `raw_url` | `String` | The raw URL of the card. |
| `reorder_quantity` | `Integer` | The number of cards to be reordered. |
| `send_date` | `String` |  |
| `size` | `String` | The size of the card |
| `status` | `String` |  |
| `threshold_amount` | `Integer` | The threshold amount of the card |
| `thumbnails` | `Array` |  |
| `url` | `String` | The signed link for the card. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Card record (raises on error).
card = client.Card.load({ "id" => "card_id" })
```

#### Example: List

```ruby
# list returns an Array of Card records (raises on error).
cards = client.Card.list
```

#### Example: Create

```ruby
card = client.Card.create({
  "id" => "example_id", # String
  "auto_reorder" => true, # Boolean
  "available_quantity" => 1, # Integer
  "back_original_url" => "example_back_original_url", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "front_original_url" => "example_front_original_url", # String
  "object" => "example_object", # String
  "orientation" => "example_orientation", # String
  "pending_quantity" => 1, # Integer
  "raw_url" => "example_raw_url", # String
  "reorder_quantity" => 1, # Integer
  "status" => "example_status", # String
  "threshold_amount" => 1, # Integer
  "thumbnails" => [], # Array
  "url" => "example_url", # String
})
```


### CardOrder

Create an instance: `card_order = client.CardOrder`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `availability_date` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | `String` | The reason for cancellation. |
| `card_id` | `String` | Unique identifier prefixed with `card_`. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `String` | The fixed deadline for the cards to be printed. |
| `id` | `String` | Unique identifier prefixed with `co_`. |
| `inventory` | `Float` | The inventory of the card order. |
| `object` | `String` | Value is resource type. |
| `quantity` | `Integer` | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `Float` | The quantity of cards ordered |
| `status` | `String` | The status of the card order. |
| `unit_price` | `Float` | The unit price for the card order. |

#### Example: List

```ruby
# list returns an Array of CardOrder records (raises on error).
card_orders = client.CardOrder.list
```

#### Example: Create

```ruby
card_order = client.CardOrder.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "object" => "example_object", # String
  "quantity" => 1, # Integer
})
```


### Check

Create an instance: `check = client.Check`

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
| `amount` | `Float` | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `String` |  |
| `attachment_template_version_id` | `String` |  |
| `bank_account` | `Object` |  |
| `carrier` | `String` |  |
| `check_bottom_template_id` | `String` |  |
| `check_bottom_template_version_id` | `String` |  |
| `check_number` | `Integer` |  |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` |  |
| `expected_delivery_date` | `String` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` |  |
| `from` | `Object` |  |
| `id` | `String` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `String` |  |
| `memo` | `String` |  |
| `merge_variables` | `Hash` |  |
| `message` | `String` |  |
| `metadata` | `Hash` |  |
| `object` | `String` | Value is resource type. |
| `send_date` | `String` |  |
| `sla` | `String` |  |
| `status` | `String` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` |  |
| `to` | `Object` |  |
| `tracking_events` | `Array` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `String` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | TThe use type for each mailpiece. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Check record (raises on error).
check = client.Check.load({ "id" => "check_id" })
```

#### Example: List

```ruby
# list returns an Array of Check records (raises on error).
checks = client.Check.list
```

#### Example: Create

```ruby
check = client.Check.create({
  "amount" => 1, # Float
  "bank_account" => "example_bank_account", # Object
  "carrier" => "example_carrier", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
  "use_type" => "example_use_type", # String
})
```


### Creative

Create an instance: `creative = client.Creative`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `Array` | Array of campaigns associated with the creative ID |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | An internal description that identifies this resource. |
| `details` | `Hash` |  |
| `from` | `String` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `String` | Unique identifier prefixed with `crv_`. |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` | Value is resource type. |
| `resource_type` | `String` |  |
| `template_preview_urls` | `Hash` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `Array` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Creative record (raises on error).
creative = client.Creative.load({ "id" => "creative_id" })
```

#### Example: Create

```ruby
creative = client.Creative.create({
  "campaigns" => [], # Array
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
  "template_preview_urls" => {}, # Hash
  "template_previews" => [], # Array
})
```


### Domain

Create an instance: `domain = client.Domain`

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
| `created_at` | `String` | The date and time the domain was created. |
| `domain` | `String` | The registered domain/hostname. |
| `error_redirect_link` | `String` | URL to redirect customers if a short link is broken or inactive. |
| `id` | `String` | Unique identifier for a domain. |
| `status` | `String` | The configuration status of the domain. |
| `updated_at` | `String` | The date and time the domain was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Domain record (raises on error).
domain = client.Domain.load({ "id" => "domain_id" })
```

#### Example: List

```ruby
# list returns an Array of Domain records (raises on error).
domains = client.Domain.list
```

#### Example: Create

```ruby
domain = client.Domain.create({
})
```


### IdentityValidation

Create an instance: `identity_validation = client.IdentityValidation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `String` |  |
| `id` | `String` |  |
| `last_line` | `String` |  |
| `object` | `String` |  |
| `primary_line` | `String` |  |
| `recipient` | `String` |  |
| `score` | `Integer` |  |
| `secondary_line` | `String` |  |
| `urbanization` | `String` |  |

#### Example: Create

```ruby
identity_validation = client.IdentityValidation.create({
})
```


### IntlVerification

Create an instance: `intl_verification = client.IntlVerification`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `Array` |  |
| `components` | `Hash` |  |
| `country` | `String` |  |
| `coverage` | `String` |  |
| `deliverability` | `String` |  |
| `errors` | `Boolean` | Indicates whether any errors occurred during the verification process. |
| `id` | `String` |  |
| `last_line` | `String` |  |
| `object` | `String` |  |
| `primary_line` | `String` |  |
| `recipient` | `String` |  |
| `secondary_line` | `String` |  |
| `status` | `String` |  |

#### Example: Create

```ruby
intl_verification = client.IntlVerification.create({
  "addresses" => [], # Array
  "errors" => true, # Boolean
})
```


### Letter

Create an instance: `letter = client.Letter`

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
| `address_placement` | `String` |  |
| `cards` | `Array` |  |
| `carrier` | `String` |  |
| `color` | `Boolean` |  |
| `custom_envelope` | `String` |  |
| `date_created` | `String` |  |
| `date_modified` | `String` |  |
| `description` | `String` |  |
| `double_sided` | `Boolean` |  |
| `expected_delivery_date` | `String` |  |
| `extra_service` | `String` |  |
| `from` | `Hash` |  |
| `fsc` | `Boolean` |  |
| `id` | `String` |  |
| `mail_type` | `String` |  |
| `merge_variables` | `Hash` |  |
| `metadata` | `Hash` |  |
| `object` | `String` |  |
| `perforated_page` | `String` |  |
| `return_envelope` | `Boolean` |  |
| `send_date` | `String` |  |
| `sla` | `String` |  |
| `template_id` | `String` |  |
| `template_version_id` | `String` |  |
| `thumbnails` | `Array` |  |
| `to` | `Hash` |  |
| `tracking_events` | `Array` |  |
| `tracking_number` | `String` |  |
| `url` | `String` |  |
| `use_type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Letter record (raises on error).
letter = client.Letter.load({ "id" => "letter_id" })
```

#### Example: List

```ruby
# list returns an Array of Letter records (raises on error).
letters = client.Letter.list
```

#### Example: Create

```ruby
letter = client.Letter.create({
})
```


### Link

Create an instance: `link = client.Link`

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
| `created_at` | `String` | The date and time the link was created. |
| `domain` | `String` | The registered domain to be used for the short URL. |
| `domain_id` | `String` | A unique identifier for the registered domain. |
| `id` | `String` | Unique identifier prefixed with `lnk_`. |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `String` | The original target URL. |
| `short_link` | `String` | The shortened URL for the associated original URL. |
| `slug` | `String` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `String` | The title of the URL. |
| `updated_at` | `String` | The date and time the link was last updated. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Link record (raises on error).
link = client.Link.load({ "id" => "link_id" })
```

#### Example: List

```ruby
# list returns an Array of Link records (raises on error).
links = client.Link.list
```

#### Example: Create

```ruby
link = client.Link.create({
})
```


### LobCreditsBalance

Create an instance: `lob_credits_balance = client.LobCreditsBalance`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `Float` | Account's current balance of Lob Credits. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the LobCreditsBalance record (raises on error).
lob_credits_balance = client.LobCreditsBalance.load()
```


### Postcard

Create an instance: `postcard = client.Postcard`

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
| `back_template_id` | `String` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `String` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` |  |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` |  |
| `expected_delivery_date` | `String` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` |  |
| `from` | `Object` |  |
| `front_template_id` | `String` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `Boolean` | This is in beta. |
| `id` | `String` | Unique identifier prefixed with `psc_`. |
| `metadata` | `Hash` |  |
| `object` | `String` | Value is resource type. |
| `send_date` | `String` |  |
| `sla` | `String` |  |
| `status` | `String` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` |  |
| `to` | `Object` |  |
| `tracking_events` | `Array` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `String` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | The use type for each mailpiece. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Postcard record (raises on error).
postcard = client.Postcard.load({ "id" => "postcard_id" })
```

#### Example: List

```ruby
# list returns an Array of Postcard records (raises on error).
postcards = client.Postcard.list
```

#### Example: Create

```ruby
postcard = client.Postcard.create({
  "back_template_id" => "example_back_template_id", # String
  "carrier" => "example_carrier", # String
  "front_template_id" => "example_front_template_id", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
})
```


### QrCode

Create an instance: `qr_code = client.QrCode`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `Float` | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `String` | Unique identifier for each mail piece. |
| `scans` | `Array` | Detailed scan information associated with each mail piece. |

#### Example: List

```ruby
# list returns an Array of QrCode records (raises on error).
qr_codes = client.QrCode.list
```


### ResourceProof

Create an instance: `resource_proof = client.ResourceProof`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `Array` | Errors encountered during processing. |
| `id` | `String` | Unique identifier prefixed with `res_prf_`. |
| `object` | `String` | Value is resource type. |
| `resource_type` | `String` | The type of resource to generate a proof for. |
| `status` | `String` | The processing status of the resource proof. |
| `template_id` | `String` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `Array` | Thumbnail images of the resource proof. |
| `url` | `String` | A URL to the resource proof PDF. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ResourceProof record (raises on error).
resource_proof = client.ResourceProof.load({ "id" => "resource_proof_id" })
```

#### Example: Create

```ruby
resource_proof = client.ResourceProof.create({
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
})
```


### Response

Create an instance: `response = client.Response`

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
| `account_id` | `String` | Your Lob account id. |
| `brand_name` | `String` |  |
| `campaign_code` | `String` | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Whether the resource has been deleted. |
| `end_date` | `String` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `Integer` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `String` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `String` |  |
| `mode` | `String` | The mode of the Informed Delivery campaign. |
| `object` | `String` | Value is the resource type. |
| `quantity` | `Integer` |  |
| `representative_image_s3_link` | `String` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `String` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `String` |  |
| `service_request_number` | `String` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `String` |  |
| `start_serial` | `Integer` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `String` |  |
| `usps_campaign_id` | `String` | A numberical string up to 12 characters long. |
| `usps_title` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Response record (raises on error).
response = client.Response.load({ "usps_campaign_id" => "usps_campaign_id" })
```

#### Example: List

```ruby
# list returns an Array of Response records (raises on error).
responses = client.Response.list
```

#### Example: Create

```ruby
response = client.Response.create({
  "account_id" => "example_account_id", # String
  "campaign_code" => "example_campaign_code", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "deleted" => true, # Boolean
  "end_date" => "example_end_date", # String
  "end_serial" => 1, # Integer
  "id" => "example_id", # String
  "mode" => "example_mode", # String
  "object" => "example_object", # String
  "representative_image_s3_link" => "example_representative_image_s3_link", # String
  "ride_along_image_s3_link" => "example_ride_along_image_s3_link", # String
  "service_request_number" => "example_service_request_number", # String
  "start_serial" => 1, # Integer
  "usps_campaign_id" => "example_usps_campaign_id", # String
})
```


### ReverseGeocode

Create an instance: `reverse_geocode = client.ReverseGeocode`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `Array` | list of addresses |
| `id` | `String` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `Float` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `Float` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `String` | Value is resource type. |

#### Example: Create

```ruby
reverse_geocode = client.ReverseGeocode.create({
  "latitude" => 1, # Float
  "longitude" => 1, # Float
})
```


### SelfMailer

Create an instance: `self_mailer = client.SelfMailer`

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
| `campaign_id` | `String` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` |  |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` |  |
| `expected_delivery_date` | `String` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` |  |
| `from` | `Object` |  |
| `fsc` | `Boolean` | This is in beta. |
| `id` | `String` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `String` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `String` |  |
| `merge_variables` | `Hash` |  |
| `metadata` | `Hash` |  |
| `object` | `String` | Value is resource type. |
| `outside_template_id` | `String` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `String` |  |
| `size` | `String` |  |
| `sla` | `String` |  |
| `status` | `String` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` |  |
| `to` | `Object` |  |
| `tracking_events` | `Array` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `String` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | The use type for each mailpiece. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SelfMailer record (raises on error).
self_mailer = client.SelfMailer.load({ "id" => "self_mailer_id" })
```

#### Example: List

```ruby
# list returns an Array of SelfMailer records (raises on error).
self_mailers = client.SelfMailer.list
```

#### Example: Create

```ruby
self_mailer = client.SelfMailer.create({
  "carrier" => "example_carrier", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
  "use_type" => "example_use_type", # String
})
```


### SnapPack

Create an instance: `snap_pack = client.SnapPack`

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
| `campaign_id` | `String` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` |  |
| `color` | `Boolean` | Set this key to `true` if you would like to print in color. |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` |  |
| `expected_delivery_date` | `String` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` |  |
| `from` | `Object` |  |
| `fsc` | `Boolean` | Contact support@lob.com or your account contact to learn more. |
| `id` | `String` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `String` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `String` |  |
| `merge_variables` | `Hash` |  |
| `object` | `String` | Value is resource type. |
| `outside_template_id` | `String` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `String` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `String` |  |
| `size` | `String` |  |
| `sla` | `String` |  |
| `status` | `String` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` |  |
| `to` | `Object` |  |
| `tracking_events` | `Array` | An array of tracking events ordered by ascending `time`. |
| `url` | `String` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | The use type for each mailpiece. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SnapPack record (raises on error).
snap_pack = client.SnapPack.load({ "id" => "snap_pack_id" })
```

#### Example: List

```ruby
# list returns an Array of SnapPack records (raises on error).
snap_packs = client.SnapPack.list
```

#### Example: Create

```ruby
snap_pack = client.SnapPack.create({
  "carrier" => "example_carrier", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
  "use_type" => "example_use_type", # String
})
```


### Template

Create an instance: `template = client.Template`

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
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | An internal description that identifies this resource. |
| `engine` | `String` | The engine used to combine HTML template with merge variables. |
| `html` | `String` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `String` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `Hash` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` | Value is resource type. |
| `published_version` | `Object` |  |
| `required_vars` | `Array` | An array of required variables to be used in a template. |
| `versions` | `Array` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Template record (raises on error).
template = client.Template.load({ "id" => "template_id" })
```

#### Example: List

```ruby
# list returns an Array of Template records (raises on error).
templates = client.Template.list
```

#### Example: Create

```ruby
template = client.Template.create({
  "id" => "example_id", # String
  "html" => "example_html", # String
  "published_version" => "example_published_version", # Object
  "versions" => [], # Array
})
```


### TemplateVersion

Create an instance: `template_version = client.TemplateVersion`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `String` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `String` | An internal description that identifies this resource. |
| `engine` | `String` | The engine used to combine HTML template with merge variables. |
| `html` | `String` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `String` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `Hash` | Object representing the keys of every merge variable present in the template. |
| `object` | `String` | Value is resource type. |
| `required_vars` | `Array` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `Boolean` | Used by frontend, true if the template uses advanced features. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the TemplateVersion record (raises on error).
template_version = client.TemplateVersion.load({ "id" => "template_version_id", "template_id" => "template_id" })
```

#### Example: List

```ruby
# list returns an Array of TemplateVersion records (raises on error).
template_versions = client.TemplateVersion.list
```

#### Example: Create

```ruby
template_version = client.TemplateVersion.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "html" => "example_html", # String
  "object" => "example_object", # String
})
```


### TemplateVersionDeletion

Create an instance: `template_version_deletion = client.TemplateVersionDeletion`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Upload

Create an instance: `upload = client.Upload`

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
| `accountId` | `String` | Account ID that made the request |
| `bytesProcessed` | `Integer` | Number of bytes processed in your CSV |
| `campaignId` | `Object` |  |
| `dateCreated` | `String` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `String` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `Boolean` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `Integer` | Number of mailpieces that failed to create |
| `failuresUrl` | `String` | Url where your campaign mailpiece failures can be retrieved |
| `id` | `String` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `Hash` | test |
| `metadata` | `Hash` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `String` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `Hash` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `String` | Filename of the upload |
| `requiredAddressColumnMapping` | `Hash` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `String` | The URL for the generated export file. |
| `state` | `String` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `Integer` | Total number of recipients for the campaign |
| `type` | `String` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `String` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `Integer` | Number of mailpieces that were successfully created |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Upload record (raises on error).
upload = client.Upload.load({ "id" => "upload_id" })
```

#### Example: List

```ruby
# list returns an Array of Upload records (raises on error).
uploads = client.Upload.list
```

#### Example: Create

```ruby
upload = client.Upload.create({
  "accountId" => "example_accountId", # String
  "bytesProcessed" => 1, # Integer
  "campaignId" => "example_campaignId", # Object
  "dateCreated" => "example_dateCreated", # String
  "dateModified" => "example_dateModified", # String
  "deleted" => true, # Boolean
  "failedMailpieces" => 1, # Integer
  "id" => "example_id", # String
  "metadata" => {}, # Hash
  "mode" => "example_mode", # String
  "optionalAddressColumnMapping" => {}, # Hash
  "requiredAddressColumnMapping" => {}, # Hash
  "s3Url" => "example_s3Url", # String
  "state" => "example_state", # String
  "totalMailpieces" => 1, # Integer
  "type" => "example_type", # String
  "uploadId" => "example_uploadId", # String
  "validatedMailpieces" => 1, # Integer
})
```


### UploadCreateExport

Create an instance: `upload_create_export = client.UploadCreateExport`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exportId` | `String` |  |
| `id` | `String` |  |
| `message` | `String` |  |
| `type` | `String` |  |

#### Example: Create

```ruby
upload_create_export = client.UploadCreateExport.create({
  "id" => "example_id", # String
  "exportId" => "example_exportId", # String
  "message" => "example_message", # String
})
```


### UsAutocompletion

Create an instance: `us_autocompletion = client.UsAutocompletion`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_prefix` | `String` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `String` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `Boolean` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `String` | Unique identifier prefixed with `us_auto_`. |
| `object` | `String` | Value is resource type. |
| `state` | `String` | An optional state input used to filter suggestions. |
| `suggestions` | `Array` | An array of objects representing suggested addresses. |
| `zip_code` | `String` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```ruby
us_autocompletion = client.UsAutocompletion.create({
  "address_prefix" => "example_address_prefix", # String
})
```


### UsVerification

Create an instance: `us_verification = client.UsVerification`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `Array` |  |
| `components` | `Hash` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `String` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `Hash` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `Boolean` | Indicates whether any errors occurred during the verification process. |
| `id` | `String` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `String` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `Hash` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `String` | Value is resource type. |
| `primary_line` | `String` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `String` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `String` | The secondary delivery line of the address. |
| `urbanization` | `String` | Only present for addresses in Puerto Rico. |
| `valid_address` | `Boolean` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```ruby
us_verification = client.UsVerification.create({
  "addresses" => [], # Array
  "components" => {}, # Hash
  "deliverability_analysis" => {}, # Hash
  "errors" => true, # Boolean
  "lob_confidence_score" => {}, # Hash
})
```


### Zip

Create an instance: `zip = client.Zip`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `String` | A 5-digit ZIP code. |

#### Example: Create

```ruby
zip = client.Zip.create({
  "zip_code" => "example_zip_code", # String
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

Features are the extension mechanism. A feature is a Ruby class
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

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Lob_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Lob_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
campaign = client.Campaign
campaign.list()

# campaign.data_get now returns the campaign data from the last list
# campaign.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
