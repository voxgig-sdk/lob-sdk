# Lob PHP SDK



The PHP SDK for the Lob API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Address()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lob-sdk/releases)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/lob-sdk
composer config repositories.lob-sdk path ./lob-sdk/php
composer require voxgig-sdk/lob-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'lob_sdk.php';

$client = new LobSDK([
    "apikey" => getenv("LOB_APIKEY"),
]);
```

### 2. List address records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $addresss = $client->Address()->list();
    foreach ($addresss as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["address_city"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a templateversion

TemplateVersion is nested under template, so provide the `template_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the TemplateVersion record (throws on error).
    $templateversion = $client->TemplateVersion()->load(["template_id" => "example_template_id", "id" => "example_id"]);
    print_r($templateversion->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Address record.
$created = $client->Address()->create(["address_city" => "example_address_city", "address_country" => "example_address_country"]);

// Remove
$client->Address()->remove(["id" => $created->data_get()["id"]]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $campaigns = $client->Campaign()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = LobSDK::test([
    "entity" => ["campaign" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$campaign = $client->Campaign()->list();
print_r(array_map(fn($item) => $item->data_get(), $campaign));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LobSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LOB_TEST_LIVE=TRUE
LOB_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LobSDK

```php
require_once 'lob_sdk.php';
$client = new LobSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LobSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LobSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Address` | `($data): AddressEntity` | Create an Address entity instance. |
| `BankAccount` | `($data): BankAccountEntity` | Create a BankAccount entity instance. |
| `BankDeletion` | `($data): BankDeletionEntity` | Create a BankDeletion entity instance. |
| `BillingGroup` | `($data): BillingGroupEntity` | Create a BillingGroup entity instance. |
| `Booklet` | `($data): BookletEntity` | Create a Booklet entity instance. |
| `Buckslip` | `($data): BuckslipEntity` | Create a Buckslip entity instance. |
| `BuckslipOrder` | `($data): BuckslipOrderEntity` | Create a BuckslipOrder entity instance. |
| `Campaign` | `($data): CampaignEntity` | Create a Campaign entity instance. |
| `Card` | `($data): CardEntity` | Create a Card entity instance. |
| `CardOrder` | `($data): CardOrderEntity` | Create a CardOrder entity instance. |
| `Check` | `($data): CheckEntity` | Create a Check entity instance. |
| `Creative` | `($data): CreativeEntity` | Create a Creative entity instance. |
| `Domain` | `($data): DomainEntity` | Create a Domain entity instance. |
| `IdentityValidation` | `($data): IdentityValidationEntity` | Create an IdentityValidation entity instance. |
| `IntlVerification` | `($data): IntlVerificationEntity` | Create an IntlVerification entity instance. |
| `Letter` | `($data): LetterEntity` | Create a Letter entity instance. |
| `Link` | `($data): LinkEntity` | Create a Link entity instance. |
| `LobCreditsBalance` | `($data): LobCreditsBalanceEntity` | Create a LobCreditsBalance entity instance. |
| `Postcard` | `($data): PostcardEntity` | Create a Postcard entity instance. |
| `QrCode` | `($data): QrCodeEntity` | Create a QrCode entity instance. |
| `ResourceProof` | `($data): ResourceProofEntity` | Create a ResourceProof entity instance. |
| `Response` | `($data): ResponseEntity` | Create a Response entity instance. |
| `ReverseGeocode` | `($data): ReverseGeocodeEntity` | Create a ReverseGeocode entity instance. |
| `SelfMailer` | `($data): SelfMailerEntity` | Create a SelfMailer entity instance. |
| `SnapPack` | `($data): SnapPackEntity` | Create a SnapPack entity instance. |
| `Template` | `($data): TemplateEntity` | Create a Template entity instance. |
| `TemplateVersion` | `($data): TemplateVersionEntity` | Create a TemplateVersion entity instance. |
| `TemplateVersionDeletion` | `($data): TemplateVersionDeletionEntity` | Create a TemplateVersionDeletion entity instance. |
| `Upload` | `($data): UploadEntity` | Create an Upload entity instance. |
| `UploadCreateExport` | `($data): UploadCreateExportEntity` | Create an UploadCreateExport entity instance. |
| `UsAutocompletion` | `($data): UsAutocompletionEntity` | Create an UsAutocompletion entity instance. |
| `UsVerification` | `($data): UsVerificationEntity` | Create an UsVerification entity instance. |
| `Zip` | `($data): ZipEntity` | Create a Zip entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$address = $client->Address();`

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
| `metadata` | `array` |  |
| `name` | `string` |  |
| `object` | `string` |  |
| `phone` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Address record (throws on error).
$address = $client->Address()->load(["id" => "address_id"]);
```

#### Example: List

```php
// list() returns an array of Address records (throws on error).
$addresss = $client->Address()->list();
```

#### Example: Create

```php
$address = $client->Address()->create([
]);
```


### BankAccount

Create an instance: `$bank_account = $client->BankAccount();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | The fractional routing number for your home bank account. |
| `id` | `string` |  |
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | The type of microdeposit verification required for this bank account. |
| `object` | `string` | Value is resource type. |
| `routing_number` | `string` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | The signatory associated with your account. |
| `signature_url` | `mixed` |  |
| `state` | `string` | The state associated with your home bank account. |
| `verified` | `bool` | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | The zipcode associated with your home bank account. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BankAccount record (throws on error).
$bank_account = $client->BankAccount()->load(["id" => "bank_account_id"]);
```

#### Example: List

```php
// list() returns an array of BankAccount records (throws on error).
$bank_accounts = $client->BankAccount()->list();
```

#### Example: Create

```php
$bank_account = $client->BankAccount()->create([
    "account_number" => null, // string
    "account_type" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "id" => null, // string
    "object" => null, // string
    "routing_number" => null, // string
    "signatory" => null, // string
]);
```


### BankDeletion

Create an instance: `$bank_deletion = $client->BankDeletion();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### BillingGroup

Create an instance: `$billing_group = $client->BillingGroup();`

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

```php
// load() returns the ENTITY — call data_get() for the BillingGroup record (throws on error).
$billing_group = $client->BillingGroup()->load(["id" => "billing_group_id"]);
```

#### Example: List

```php
// list() returns an array of BillingGroup records (throws on error).
$billing_groups = $client->BillingGroup()->list();
```

#### Example: Create

```php
$billing_group = $client->BillingGroup()->create([
    "id" => null, // string
]);
```


### Booklet

Create an instance: `$booklet = $client->Booklet();`

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
| `from` | `array` |  |
| `fsc` | `bool` |  |
| `id` | `string` |  |
| `mail_type` | `string` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `array` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` |  |
| `pages` | `int` |  |
| `send_date` | `string` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` |  |
| `sla` | `string` |  |
| `source_material` | `string` |  |
| `thumbnails` | `array` |  |
| `to` | `array` |  |
| `tracking_events` | `array` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Booklet record (throws on error).
$booklet = $client->Booklet()->load(["id" => "booklet_id"]);
```

#### Example: List

```php
// list() returns an array of Booklet records (throws on error).
$booklets = $client->Booklet()->list();
```

#### Example: Create

```php
$booklet = $client->Booklet()->create([
]);
```


### Buckslip

Create an instance: `$buckslip = $client->Buckslip();`

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
| `allocated_quantity` | `float` | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float` | The available quantity of buckslips. |
| `back_original_url` | `string` | The original URL of the back template. |
| `buckslip_orders` | `array` | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the buckslip. |
| `finish` | `string` |  |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `bck_`. |
| `mode` | `string` |  |
| `object` | `string` | Value is resource type. |
| `onhand_quantity` | `float` | The onhand quantity of buckslips. |
| `pending_quantity` | `float` | The pending quantity of buckslips. |
| `projected_quantity` | `float` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | The number of buckslips to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the buckslip |
| `status` | `string` |  |
| `stock` | `string` |  |
| `threshold_amount` | `int` | The threshold amount of the buckslip |
| `thumbnails` | `array` |  |
| `url` | `string` | The signed link for the buckslip. |
| `weight` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Buckslip record (throws on error).
$buckslip = $client->Buckslip()->load(["id" => "buckslip_id"]);
```

#### Example: List

```php
// list() returns an array of Buckslip records (throws on error).
$buckslips = $client->Buckslip()->list();
```

#### Example: Create

```php
$buckslip = $client->Buckslip()->create([
    "allocated_quantity" => null, // float
    "auto_reorder" => null, // bool
    "available_quantity" => null, // float
    "back_original_url" => null, // string
    "buckslip_orders" => null, // array
    "date_created" => null, // string
    "date_modified" => null, // string
    "finish" => null, // string
    "front_original_url" => null, // string
    "id" => null, // string
    "object" => null, // string
    "onhand_quantity" => null, // float
    "pending_quantity" => null, // float
    "projected_quantity" => null, // float
    "raw_url" => null, // string
    "reorder_quantity" => null, // int
    "status" => null, // string
    "stock" => null, // string
    "threshold_amount" => null, // int
    "thumbnails" => null, // array
    "url" => null, // string
    "weight" => null, // string
]);
```


### BuckslipOrder

Create an instance: `$buckslip_order = $client->BuckslipOrder();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | The fixed deadline for the buckslips to be printed. |
| `id` | `string` | Unique identifier prefixed with `bo_`. |
| `inventory` | `float` | The inventory of the buckslip order. |
| `object` | `string` | Value is resource type. |
| `quantity` | `int` | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `float` | The quantity of buckslips ordered. |
| `status` | `string` | The status of the buckslip order. |
| `unit_price` | `float` | The unit price for the buckslip order. |

#### Example: List

```php
// list() returns an array of BuckslipOrder records (throws on error).
$buckslip_orders = $client->BuckslipOrder()->list();
```

#### Example: Create

```php
$buckslip_order = $client->BuckslipOrder()->create([
    "id" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "object" => null, // string
    "quantity" => null, // int
]);
```


### Campaign

Create an instance: `$campaign = $client->Campaign();`

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
| `auto_cancel_if_ncoa` | `bool` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `array` | An array of creatives that have been associated with this campaign. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `id` | `string` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Whether or not the campaign is still a draft. |
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Name of the campaign. |
| `object` | `string` | Value is resource type. |
| `print_speed` | `string` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | How the campaign should be scheduled. |
| `send_date` | `string` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `array` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Campaign record (throws on error).
$campaign = $client->Campaign()->load(["id" => "campaign_id"]);
```

#### Example: List

```php
// list() returns an array of Campaign records (throws on error).
$campaigns = $client->Campaign()->list();
```

#### Example: Create

```php
$campaign = $client->Campaign()->create([
    "creatives" => null, // array
    "date_created" => null, // string
    "date_modified" => null, // string
    "id" => null, // string
    "is_draft" => null, // bool
    "name" => null, // string
    "object" => null, // string
    "schedule_type" => null, // string
    "uploads" => null, // array
    "use_type" => null, // string
]);
```


### Card

Create an instance: `$card = $client->Card();`

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
| `auto_reorder` | `bool` | True if the cards should be auto-reordered. |
| `available_quantity` | `int` | The available quantity of cards. |
| `back_original_url` | `string` | The original URL of the back template. |
| `countries` | `string` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the card. |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `card_`. |
| `mode` | `string` |  |
| `object` | `string` | Value is resource type. |
| `orientation` | `string` | The orientation of the card. |
| `pending_quantity` | `int` | The pending quantity of cards. |
| `raw_url` | `string` | The raw URL of the card. |
| `reorder_quantity` | `int` | The number of cards to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the card |
| `status` | `string` |  |
| `threshold_amount` | `int` | The threshold amount of the card |
| `thumbnails` | `array` |  |
| `url` | `string` | The signed link for the card. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Card record (throws on error).
$card = $client->Card()->load(["id" => "card_id"]);
```

#### Example: List

```php
// list() returns an array of Card records (throws on error).
$cards = $client->Card()->list();
```

#### Example: Create

```php
$card = $client->Card()->create([
    "id" => null, // string
    "auto_reorder" => null, // bool
    "available_quantity" => null, // int
    "back_original_url" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "front_original_url" => null, // string
    "object" => null, // string
    "orientation" => null, // string
    "pending_quantity" => null, // int
    "raw_url" => null, // string
    "reorder_quantity" => null, // int
    "status" => null, // string
    "threshold_amount" => null, // int
    "thumbnails" => null, // array
    "url" => null, // string
]);
```


### CardOrder

Create an instance: `$card_order = $client->CardOrder();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | The fixed deadline for the cards to be printed. |
| `id` | `string` | Unique identifier prefixed with `co_`. |
| `inventory` | `float` | The inventory of the card order. |
| `object` | `string` | Value is resource type. |
| `quantity` | `int` | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `float` | The quantity of cards ordered |
| `status` | `string` | The status of the card order. |
| `unit_price` | `float` | The unit price for the card order. |

#### Example: List

```php
// list() returns an array of CardOrder records (throws on error).
$card_orders = $client->CardOrder()->list();
```

#### Example: Create

```php
$card_order = $client->CardOrder()->create([
    "id" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "object" => null, // string
    "quantity" => null, // int
]);
```


### Check

Create an instance: `$check = $client->Check();`

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
| `amount` | `float` | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` |  |
| `attachment_template_version_id` | `string` |  |
| `bank_account` | `mixed` |  |
| `carrier` | `string` |  |
| `check_bottom_template_id` | `string` |  |
| `check_bottom_template_version_id` | `string` |  |
| `check_number` | `int` |  |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` |  |
| `from` | `mixed` |  |
| `id` | `string` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` |  |
| `memo` | `string` |  |
| `merge_variables` | `array` |  |
| `message` | `string` |  |
| `metadata` | `array` |  |
| `object` | `string` | Value is resource type. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` |  |
| `to` | `mixed` |  |
| `tracking_events` | `array` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | TThe use type for each mailpiece. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Check record (throws on error).
$check = $client->Check()->load(["id" => "check_id"]);
```

#### Example: List

```php
// list() returns an array of Check records (throws on error).
$checks = $client->Check()->list();
```

#### Example: Create

```php
$check = $client->Check()->create([
    "amount" => null, // float
    "bank_account" => null, // mixed
    "carrier" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "id" => null, // string
    "to" => null, // mixed
    "url" => null, // string
    "use_type" => null, // string
]);
```


### Creative

Create an instance: `$creative = $client->Creative();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `array` | Array of campaigns associated with the creative ID |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `details` | `array` |  |
| `from` | `string` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Unique identifier prefixed with `crv_`. |
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` |  |
| `template_preview_urls` | `array` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `array` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Creative record (throws on error).
$creative = $client->Creative()->load(["id" => "creative_id"]);
```

#### Example: Create

```php
$creative = $client->Creative()->create([
    "campaigns" => null, // array
    "date_created" => null, // string
    "date_modified" => null, // string
    "id" => null, // string
    "object" => null, // string
    "template_preview_urls" => null, // array
    "template_previews" => null, // array
]);
```


### Domain

Create an instance: `$domain = $client->Domain();`

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

```php
// load() returns the ENTITY — call data_get() for the Domain record (throws on error).
$domain = $client->Domain()->load(["id" => "domain_id"]);
```

#### Example: List

```php
// list() returns an array of Domain records (throws on error).
$domains = $client->Domain()->list();
```

#### Example: Create

```php
$domain = $client->Domain()->create([
]);
```


### IdentityValidation

Create an instance: `$identity_validation = $client->IdentityValidation();`

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
| `score` | `int` |  |
| `secondary_line` | `string` |  |
| `urbanization` | `string` |  |

#### Example: Create

```php
$identity_validation = $client->IdentityValidation()->create([
]);
```


### IntlVerification

Create an instance: `$intl_verification = $client->IntlVerification();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `array` |  |
| `components` | `array` |  |
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

```php
$intl_verification = $client->IntlVerification()->create([
    "addresses" => null, // array
    "errors" => null, // bool
]);
```


### Letter

Create an instance: `$letter = $client->Letter();`

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
| `cards` | `array` |  |
| `carrier` | `string` |  |
| `color` | `bool` |  |
| `custom_envelope` | `string` |  |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `double_sided` | `bool` |  |
| `expected_delivery_date` | `string` |  |
| `extra_service` | `string` |  |
| `from` | `array` |  |
| `fsc` | `bool` |  |
| `id` | `string` |  |
| `mail_type` | `string` |  |
| `merge_variables` | `array` |  |
| `metadata` | `array` |  |
| `object` | `string` |  |
| `perforated_page` | `string` |  |
| `return_envelope` | `bool` |  |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `template_id` | `string` |  |
| `template_version_id` | `string` |  |
| `thumbnails` | `array` |  |
| `to` | `array` |  |
| `tracking_events` | `array` |  |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Letter record (throws on error).
$letter = $client->Letter()->load(["id" => "letter_id"]);
```

#### Example: List

```php
// list() returns an array of Letter records (throws on error).
$letters = $client->Letter()->list();
```

#### Example: Create

```php
$letter = $client->Letter()->create([
]);
```


### Link

Create an instance: `$link = $client->Link();`

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
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `string` | The original target URL. |
| `short_link` | `string` | The shortened URL for the associated original URL. |
| `slug` | `string` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | The title of the URL. |
| `updated_at` | `string` | The date and time the link was last updated. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Link record (throws on error).
$link = $client->Link()->load(["id" => "link_id"]);
```

#### Example: List

```php
// list() returns an array of Link records (throws on error).
$links = $client->Link()->list();
```

#### Example: Create

```php
$link = $client->Link()->create([
]);
```


### LobCreditsBalance

Create an instance: `$lob_credits_balance = $client->LobCreditsBalance();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `float` | Account's current balance of Lob Credits. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the LobCreditsBalance record (throws on error).
$lob_credits_balance = $client->LobCreditsBalance()->load();
```


### Postcard

Create an instance: `$postcard = $client->Postcard();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` |  |
| `from` | `mixed` |  |
| `front_template_id` | `string` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `psc_`. |
| `metadata` | `array` |  |
| `object` | `string` | Value is resource type. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` |  |
| `to` | `mixed` |  |
| `tracking_events` | `array` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Postcard record (throws on error).
$postcard = $client->Postcard()->load(["id" => "postcard_id"]);
```

#### Example: List

```php
// list() returns an array of Postcard records (throws on error).
$postcards = $client->Postcard()->list();
```

#### Example: Create

```php
$postcard = $client->Postcard()->create([
    "back_template_id" => null, // string
    "carrier" => null, // string
    "front_template_id" => null, // string
    "id" => null, // string
    "to" => null, // mixed
    "url" => null, // string
]);
```


### QrCode

Create an instance: `$qr_code = $client->QrCode();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `float` | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `string` | Unique identifier for each mail piece. |
| `scans` | `array` | Detailed scan information associated with each mail piece. |

#### Example: List

```php
// list() returns an array of QrCode records (throws on error).
$qr_codes = $client->QrCode()->list();
```


### ResourceProof

Create an instance: `$resource_proof = $client->ResourceProof();`

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
| `errors` | `array` | Errors encountered during processing. |
| `id` | `string` | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` | The type of resource to generate a proof for. |
| `status` | `string` | The processing status of the resource proof. |
| `template_id` | `string` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `array` | Thumbnail images of the resource proof. |
| `url` | `string` | A URL to the resource proof PDF. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ResourceProof record (throws on error).
$resource_proof = $client->ResourceProof()->load(["id" => "resource_proof_id"]);
```

#### Example: Create

```php
$resource_proof = $client->ResourceProof()->create([
    "date_created" => null, // string
    "date_modified" => null, // string
    "id" => null, // string
    "object" => null, // string
]);
```


### Response

Create an instance: `$response = $client->Response();`

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
| `deleted` | `bool` | Whether the resource has been deleted. |
| `end_date` | `string` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `int` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` |  |
| `mode` | `string` | The mode of the Informed Delivery campaign. |
| `object` | `string` | Value is the resource type. |
| `quantity` | `int` |  |
| `representative_image_s3_link` | `string` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` |  |
| `service_request_number` | `string` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` |  |
| `start_serial` | `int` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` |  |
| `usps_campaign_id` | `string` | A numberical string up to 12 characters long. |
| `usps_title` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Response record (throws on error).
$response = $client->Response()->load(["usps_campaign_id" => "usps_campaign_id"]);
```

#### Example: List

```php
// list() returns an array of Response records (throws on error).
$responses = $client->Response()->list();
```

#### Example: Create

```php
$response = $client->Response()->create([
    "account_id" => null, // string
    "campaign_code" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "deleted" => null, // bool
    "end_date" => null, // string
    "end_serial" => null, // int
    "id" => null, // string
    "mode" => null, // string
    "object" => null, // string
    "representative_image_s3_link" => null, // string
    "ride_along_image_s3_link" => null, // string
    "service_request_number" => null, // string
    "start_serial" => null, // int
    "usps_campaign_id" => null, // string
]);
```


### ReverseGeocode

Create an instance: `$reverse_geocode = $client->ReverseGeocode();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `array` | list of addresses |
| `id` | `string` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | Value is resource type. |

#### Example: Create

```php
$reverse_geocode = $client->ReverseGeocode()->create([
    "latitude" => null, // float
    "longitude" => null, // float
]);
```


### SelfMailer

Create an instance: `$self_mailer = $client->SelfMailer();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` |  |
| `from` | `mixed` |  |
| `fsc` | `bool` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` |  |
| `merge_variables` | `array` |  |
| `metadata` | `array` |  |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` |  |
| `to` | `mixed` |  |
| `tracking_events` | `array` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SelfMailer record (throws on error).
$self_mailer = $client->SelfMailer()->load(["id" => "self_mailer_id"]);
```

#### Example: List

```php
// list() returns an array of SelfMailer records (throws on error).
$self_mailers = $client->SelfMailer()->list();
```

#### Example: Create

```php
$self_mailer = $client->SelfMailer()->create([
    "carrier" => null, // string
    "id" => null, // string
    "to" => null, // mixed
    "url" => null, // string
    "use_type" => null, // string
]);
```


### SnapPack

Create an instance: `$snap_pack = $client->SnapPack();`

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
| `color` | `bool` | Set this key to `true` if you would like to print in color. |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` |  |
| `from` | `mixed` |  |
| `fsc` | `bool` | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` |  |
| `merge_variables` | `array` |  |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` |  |
| `to` | `mixed` |  |
| `tracking_events` | `array` | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SnapPack record (throws on error).
$snap_pack = $client->SnapPack()->load(["id" => "snap_pack_id"]);
```

#### Example: List

```php
// list() returns an array of SnapPack records (throws on error).
$snap_packs = $client->SnapPack()->list();
```

#### Example: Create

```php
$snap_pack = $client->SnapPack()->create([
    "carrier" => null, // string
    "id" => null, // string
    "to" => null, // mixed
    "url" => null, // string
    "use_type" => null, // string
]);
```


### Template

Create an instance: `$template = $client->Template();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `array` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `published_version` | `mixed` |  |
| `required_vars` | `array` | An array of required variables to be used in a template. |
| `versions` | `array` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Template record (throws on error).
$template = $client->Template()->load(["id" => "template_id"]);
```

#### Example: List

```php
// list() returns an array of Template records (throws on error).
$templates = $client->Template()->list();
```

#### Example: Create

```php
$template = $client->Template()->create([
    "id" => null, // string
    "html" => null, // string
    "published_version" => null, // mixed
    "versions" => null, // array
]);
```


### TemplateVersion

Create an instance: `$template_version = $client->TemplateVersion();`

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
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `array` | Object representing the keys of every merge variable present in the template. |
| `object` | `string` | Value is resource type. |
| `required_vars` | `array` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `bool` | Used by frontend, true if the template uses advanced features. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TemplateVersion record (throws on error).
$template_version = $client->TemplateVersion()->load(["id" => "template_version_id", "template_id" => "template_id"]);
```

#### Example: List

```php
// list() returns an array of TemplateVersion records (throws on error).
$template_versions = $client->TemplateVersion()->list();
```

#### Example: Create

```php
$template_version = $client->TemplateVersion()->create([
    "id" => null, // string
    "date_created" => null, // string
    "date_modified" => null, // string
    "html" => null, // string
    "object" => null, // string
]);
```


### TemplateVersionDeletion

Create an instance: `$template_version_deletion = $client->TemplateVersionDeletion();`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Upload

Create an instance: `$upload = $client->Upload();`

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
| `bytesProcessed` | `int` | Number of bytes processed in your CSV |
| `campaignId` | `mixed` |  |
| `dateCreated` | `string` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `array` | test |
| `metadata` | `array` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `array` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | Filename of the upload |
| `requiredAddressColumnMapping` | `array` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | The URL for the generated export file. |
| `state` | `string` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Total number of recipients for the campaign |
| `type` | `string` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Number of mailpieces that were successfully created |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Upload record (throws on error).
$upload = $client->Upload()->load(["id" => "upload_id"]);
```

#### Example: List

```php
// list() returns an array of Upload records (throws on error).
$uploads = $client->Upload()->list();
```

#### Example: Create

```php
$upload = $client->Upload()->create([
    "accountId" => null, // string
    "bytesProcessed" => null, // int
    "campaignId" => null, // mixed
    "dateCreated" => null, // string
    "dateModified" => null, // string
    "deleted" => null, // bool
    "failedMailpieces" => null, // int
    "id" => null, // string
    "metadata" => null, // array
    "mode" => null, // string
    "optionalAddressColumnMapping" => null, // array
    "requiredAddressColumnMapping" => null, // array
    "s3Url" => null, // string
    "state" => null, // string
    "totalMailpieces" => null, // int
    "type" => null, // string
    "uploadId" => null, // string
    "validatedMailpieces" => null, // int
]);
```


### UploadCreateExport

Create an instance: `$upload_create_export = $client->UploadCreateExport();`

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

```php
$upload_create_export = $client->UploadCreateExport()->create([
    "id" => null, // string
    "exportId" => null, // string
    "message" => null, // string
]);
```


### UsAutocompletion

Create an instance: `$us_autocompletion = $client->UsAutocompletion();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_prefix` | `string` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `string` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `bool` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `string` | Unique identifier prefixed with `us_auto_`. |
| `object` | `string` | Value is resource type. |
| `state` | `string` | An optional state input used to filter suggestions. |
| `suggestions` | `array` | An array of objects representing suggested addresses. |
| `zip_code` | `string` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```php
$us_autocompletion = $client->UsAutocompletion()->create([
    "address_prefix" => null, // string
]);
```


### UsVerification

Create an instance: `$us_verification = $client->UsVerification();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `array` |  |
| `components` | `array` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `array` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `array` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | Value is resource type. |
| `primary_line` | `string` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | The secondary delivery line of the address. |
| `urbanization` | `string` | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```php
$us_verification = $client->UsVerification()->create([
    "addresses" => null, // array
    "components" => null, // array
    "deliverability_analysis" => null, // array
    "errors" => null, // bool
    "lob_confidence_score" => null, // array
]);
```


### Zip

Create an instance: `$zip = $client->Zip();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `string` | A 5-digit ZIP code. |

#### Example: Create

```php
$zip = $client->Zip()->create([
    "zip_code" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── lob_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`lob_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$campaign = $client->Campaign();
$campaign->list();

// $campaign->data_get() now returns the campaign data from the last list
// $campaign->match_get() returns the last match criteria
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
