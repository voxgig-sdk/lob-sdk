# Lob PHP SDK Reference

Complete API reference for the Lob PHP SDK.


## LobSDK

### Constructor

```php
require_once __DIR__ . '/lob_sdk.php';

$client = new LobSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LobSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LobSDK::test();
```


### Instance Methods

#### `Address($data = null)`

Create a new `AddressEntity` instance. Pass `null` for no initial data.

#### `BankAccount($data = null)`

Create a new `BankAccountEntity` instance. Pass `null` for no initial data.

#### `BankDeletion($data = null)`

Create a new `BankDeletionEntity` instance. Pass `null` for no initial data.

#### `BillingGroup($data = null)`

Create a new `BillingGroupEntity` instance. Pass `null` for no initial data.

#### `Booklet($data = null)`

Create a new `BookletEntity` instance. Pass `null` for no initial data.

#### `Buckslip($data = null)`

Create a new `BuckslipEntity` instance. Pass `null` for no initial data.

#### `BuckslipOrder($data = null)`

Create a new `BuckslipOrderEntity` instance. Pass `null` for no initial data.

#### `Campaign($data = null)`

Create a new `CampaignEntity` instance. Pass `null` for no initial data.

#### `Card($data = null)`

Create a new `CardEntity` instance. Pass `null` for no initial data.

#### `CardOrder($data = null)`

Create a new `CardOrderEntity` instance. Pass `null` for no initial data.

#### `Check($data = null)`

Create a new `CheckEntity` instance. Pass `null` for no initial data.

#### `Creative($data = null)`

Create a new `CreativeEntity` instance. Pass `null` for no initial data.

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `IdentityValidation($data = null)`

Create a new `IdentityValidationEntity` instance. Pass `null` for no initial data.

#### `IntlVerification($data = null)`

Create a new `IntlVerificationEntity` instance. Pass `null` for no initial data.

#### `Letter($data = null)`

Create a new `LetterEntity` instance. Pass `null` for no initial data.

#### `Link($data = null)`

Create a new `LinkEntity` instance. Pass `null` for no initial data.

#### `LobCreditsBalance($data = null)`

Create a new `LobCreditsBalanceEntity` instance. Pass `null` for no initial data.

#### `Postcard($data = null)`

Create a new `PostcardEntity` instance. Pass `null` for no initial data.

#### `QrCode($data = null)`

Create a new `QrCodeEntity` instance. Pass `null` for no initial data.

#### `ResourceProof($data = null)`

Create a new `ResourceProofEntity` instance. Pass `null` for no initial data.

#### `Response($data = null)`

Create a new `ResponseEntity` instance. Pass `null` for no initial data.

#### `ReverseGeocode($data = null)`

Create a new `ReverseGeocodeEntity` instance. Pass `null` for no initial data.

#### `SelfMailer($data = null)`

Create a new `SelfMailerEntity` instance. Pass `null` for no initial data.

#### `SnapPack($data = null)`

Create a new `SnapPackEntity` instance. Pass `null` for no initial data.

#### `Template($data = null)`

Create a new `TemplateEntity` instance. Pass `null` for no initial data.

#### `TemplateVersion($data = null)`

Create a new `TemplateVersionEntity` instance. Pass `null` for no initial data.

#### `TemplateVersionDeletion($data = null)`

Create a new `TemplateVersionDeletionEntity` instance. Pass `null` for no initial data.

#### `Upload($data = null)`

Create a new `UploadEntity` instance. Pass `null` for no initial data.

#### `UploadCreateExport($data = null)`

Create a new `UploadCreateExportEntity` instance. Pass `null` for no initial data.

#### `UsAutocompletion($data = null)`

Create a new `UsAutocompletionEntity` instance. Pass `null` for no initial data.

#### `UsVerification($data = null)`

Create a new `UsVerificationEntity` instance. Pass `null` for no initial data.

#### `Zip($data = null)`

Create a new `ZipEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LobUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AddressEntity

```php
$address = $client->Address();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_city` | `string` | No |  |
| `address_country` | `string` | No |  |
| `address_line1` | `string` | No |  |
| `address_state` | `string` | No |  |
| `address_zip` | `string` | No |  |
| `company` | `string` | No |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of addresses |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `array` | No |  |
| `name` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `phone` | `string` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Address()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Address()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Address()->load(["id" => "address_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Address()->remove(["id" => "address_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AddressEntity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BankAccountEntity

```php
$bank_account = $client->BankAccount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes |  |
| `account_type` | `string` | Yes | The type of entity that holds the account. |
| `bank_name` | `string` | No | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `string` | No | The check template used for printing. |
| `city` | `string` | No | The city associated with your home bank account. |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of bank_accounts |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | No | The fractional routing number for your home bank account. |
| `id` | `string` | Yes |  |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | No | The type of microdeposit verification required for this bank account. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `routing_number` | `string` | Yes | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | Yes | The signatory associated with your account. |
| `signature_url` | `mixed` | No |  |
| `state` | `string` | No | The state associated with your home bank account. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `verified` | `bool` | No | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | No | The zipcode associated with your home bank account. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `account_number` | - | - | - |
| `account_type` | - | - | - |
| `bank_name` | - | - | - |
| `check_template` | - | - | - |
| `city` | - | - | - |
| `count` | - | - | - |
| `data` | - | - | - |
| `date_created` | - | - | - |
| `date_modified` | - | - | - |
| `deleted` | - | - | - |
| `description` | - | - | - |
| `fractional_routing_number` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `microdeposit_type` | - | - | - |
| `next_url` | - | - | - |
| `object` | Yes | Yes | Yes |
| `previous_url` | - | - | - |
| `routing_number` | - | - | - |
| `signatory` | - | - | - |
| `signature_url` | - | - | - |
| `state` | - | - | - |
| `total_count` | - | - | - |
| `verified` | - | - | - |
| `zipcode` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BankAccount()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BankAccount()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BankAccount()->load(["id" => "bank_account_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BankAccountEntity`

Create a new `BankAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BankDeletionEntity

```php
$bank_deletion = $client->BankDeletion();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->BankDeletion()->remove(["bank_id" => "bank_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BankDeletionEntity`

Create a new `BankDeletionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BillingGroupEntity

```php
$billing_group = $client->BillingGroup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of billing_groups |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `string` | No | Description of the billing group. |
| `id` | `string` | No | Unique identifier prefixed with `bg_`. |
| `name` | `string` | No | Name of the billing group. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BillingGroup()->create([
  "id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BillingGroup()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BillingGroup()->load(["id" => "billing_group_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BillingGroupEntity`

Create a new `BillingGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BookletEntity

```php
$booklet = $client->Booklet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `carrier` | `string` | No |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of booklets |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` | No |  |
| `from` | `array` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `array` | No | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `pages` | `int` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `source_material` | `string` | No |  |
| `thumbnails` | `array` | No |  |
| `to` | `array` | No |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Booklet()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Booklet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Booklet()->load(["id" => "booklet_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Booklet()->remove(["id" => "booklet_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BookletEntity`

Create a new `BookletEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BuckslipEntity

```php
$buckslip = $client->Buckslip();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `allocated_quantity` | `float` | Yes | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | Yes | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float` | Yes | The available quantity of buckslips. |
| `back_original_url` | `string` | Yes | The original URL of the back template. |
| `buckslip_orders` | `array` | Yes | An array of buckslip orders that are associated with the buckslip. |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of buckslips |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | Description of the buckslip. |
| `finish` | `string` | Yes |  |
| `front_original_url` | `string` | Yes | The original URL of the front template. |
| `id` | `string` | Yes | Unique identifier prefixed with `bck_`. |
| `mode` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `onhand_quantity` | `float` | Yes | The onhand quantity of buckslips. |
| `pending_quantity` | `float` | Yes | The pending quantity of buckslips. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `projected_quantity` | `float` | Yes | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | Yes | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | Yes | The number of buckslips to be reordered. |
| `send_date` | `string` | No |  |
| `size` | `string` | No | The size of the buckslip |
| `status` | `string` | Yes |  |
| `stock` | `string` | Yes |  |
| `threshold_amount` | `int` | Yes | The threshold amount of the buckslip |
| `thumbnails` | `array` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `url` | `string` | Yes | The signed link for the buckslip. |
| `weight` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `account_id` | - | - | - | - | - |
| `allocated_quantity` | - | - | Yes | - | - |
| `auto_reorder` | - | - | Yes | Yes | - |
| `available_quantity` | - | - | Yes | - | - |
| `back_original_url` | - | - | Yes | - | - |
| `buckslip_orders` | - | - | Yes | - | - |
| `count` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `date_created` | - | - | Yes | - | - |
| `date_modified` | - | - | Yes | - | - |
| `deleted` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `finish` | - | - | Yes | - | - |
| `front_original_url` | - | - | Yes | - | - |
| `id` | - | - | Yes | - | - |
| `mode` | - | - | - | - | - |
| `next_url` | - | - | - | - | - |
| `object` | - | Yes | Yes | - | - |
| `onhand_quantity` | - | - | Yes | - | - |
| `pending_quantity` | - | - | Yes | - | - |
| `previous_url` | - | - | - | - | - |
| `projected_quantity` | - | - | Yes | - | - |
| `raw_url` | - | - | Yes | - | - |
| `reorder_quantity` | - | - | Yes | Yes | - |
| `send_date` | - | - | - | - | - |
| `size` | - | - | - | - | - |
| `status` | - | - | Yes | - | - |
| `stock` | - | - | Yes | - | - |
| `threshold_amount` | - | - | Yes | - | - |
| `thumbnails` | - | - | Yes | - | - |
| `total_count` | - | - | - | - | - |
| `url` | - | - | Yes | - | - |
| `weight` | - | - | Yes | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Buckslip()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Buckslip()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Buckslip()->load(["id" => "buckslip_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Buckslip()->remove(["id" => "buckslip_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Buckslip()->update([
  "id" => "buckslip_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BuckslipEntity`

Create a new `BuckslipEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BuckslipOrderEntity

```php
$buckslip_order = $client->BuckslipOrder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | List of buckslip orders |
| `id` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `quantity` | `int` | Yes | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BuckslipOrder()->create([
  "id" => null, // string
  "quantity" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->BuckslipOrder()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BuckslipOrderEntity`

Create a new `BuckslipOrderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CampaignEntity

```php
$campaign = $client->Campaign();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | `bool` | No | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | No | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | No | A window, in minutes, within which the campaign can be canceled. |
| `count` | `int` | No | number of resources in a set |
| `creatives` | `array` | Yes | An array of creatives that have been associated with this campaign. |
| `data` | `array` | No | list of campaigns |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `id` | `string` | Yes | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Yes | Whether or not the campaign is still a draft. |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Yes | Name of the campaign. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `print_speed` | `string` | No | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | Yes | How the campaign should be scheduled. |
| `send_date` | `string` | No | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | No | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `uploads` | `array` | Yes | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | - | - | - | - | - |
| `billing_group_id` | - | - | - | - | - |
| `cancel_window_campaign_minutes` | - | - | - | - | - |
| `count` | - | - | - | - | - |
| `creatives` | - | - | - | - | - |
| `data` | - | - | - | - | - |
| `date_created` | - | - | - | - | - |
| `date_modified` | - | - | - | - | - |
| `deleted` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_draft` | - | - | - | Yes | - |
| `metadata` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `next_url` | - | - | - | - | - |
| `object` | - | Yes | - | - | - |
| `previous_url` | - | - | - | - | - |
| `print_speed` | - | - | - | - | - |
| `schedule_type` | - | - | - | Yes | - |
| `send_date` | - | - | - | - | - |
| `target_delivery_date` | - | - | - | - | - |
| `total_count` | - | - | - | - | - |
| `uploads` | - | - | - | - | - |
| `use_type` | - | - | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Campaign()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Campaign()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Campaign()->load(["id" => "campaign_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Campaign()->remove(["id" => "campaign_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Campaign()->update([
  "id" => "campaign_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CampaignEntity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardEntity

```php
$card = $client->Card();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `auto_reorder` | `bool` | Yes | True if the cards should be auto-reordered. |
| `available_quantity` | `int` | Yes | The available quantity of cards. |
| `back_original_url` | `string` | Yes | The original URL of the back template. |
| `count` | `int` | No | number of resources in a set |
| `countries` | `string` | No |  |
| `data` | `array` | No | list of cards |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | Description of the card. |
| `front_original_url` | `string` | Yes | The original URL of the front template. |
| `id` | `string` | Yes | Unique identifier prefixed with `card_`. |
| `mode` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `orientation` | `string` | Yes | The orientation of the card. |
| `pending_quantity` | `int` | Yes | The pending quantity of cards. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `raw_url` | `string` | Yes | The raw URL of the card. |
| `reorder_quantity` | `int` | Yes | The number of cards to be reordered. |
| `send_date` | `string` | No |  |
| `size` | `string` | No | The size of the card |
| `status` | `string` | Yes |  |
| `threshold_amount` | `int` | Yes | The threshold amount of the card |
| `thumbnails` | `array` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `url` | `string` | Yes | The signed link for the card. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `account_id` | - | - | - | - |
| `auto_reorder` | - | - | Yes | - |
| `available_quantity` | - | - | Yes | - |
| `back_original_url` | - | - | Yes | - |
| `count` | - | - | - | - |
| `countries` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | Yes | - |
| `date_modified` | - | - | Yes | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `front_original_url` | - | - | Yes | - |
| `id` | - | - | Yes | - |
| `mode` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | Yes | Yes | - |
| `orientation` | - | - | Yes | - |
| `pending_quantity` | - | - | Yes | - |
| `previous_url` | - | - | - | - |
| `raw_url` | - | - | Yes | - |
| `reorder_quantity` | - | - | Yes | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `status` | - | - | Yes | - |
| `threshold_amount` | - | - | Yes | - |
| `thumbnails` | - | - | Yes | - |
| `total_count` | - | - | - | - |
| `url` | - | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Card()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Card()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Card()->load(["id" => "card_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Card()->remove(["id" => "card_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardEntity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CardOrderEntity

```php
$card_order = $client->CardOrder();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | List of card orders |
| `id` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `quantity` | `int` | Yes | The quantity of cards in the order (minimum 10,000). |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CardOrder()->create([
  "id" => null, // string
  "quantity" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CardOrder()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CardOrderEntity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CheckEntity

```php
$check = $client->Check();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` | No |  |
| `attachment_template_version_id` | `string` | No |  |
| `bank_account` | `mixed` | Yes |  |
| `carrier` | `string` | Yes |  |
| `check_bottom_template_id` | `string` | No |  |
| `check_bottom_template_version_id` | `string` | No |  |
| `check_number` | `int` | No |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of checks |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` | No |  |
| `from` | `mixed` | No |  |
| `id` | `string` | Yes | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` | No |  |
| `memo` | `string` | No |  |
| `merge_variables` | `array` | No |  |
| `message` | `string` | No |  |
| `metadata` | `array` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` | No |  |
| `to` | `mixed` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | Yes | TThe use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `amount` | - | - | Yes | - |
| `attachment_template_id` | - | - | - | - |
| `attachment_template_version_id` | - | - | - | - |
| `bank_account` | - | - | Yes | - |
| `carrier` | - | - | Yes | - |
| `check_bottom_template_id` | - | - | - | - |
| `check_bottom_template_version_id` | - | - | - | - |
| `check_number` | - | - | - | - |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | Yes | - |
| `date_modified` | - | - | Yes | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `expected_delivery_date` | - | - | - | - |
| `failure_reason` | - | - | - | - |
| `from` | - | - | - | - |
| `id` | - | - | Yes | - |
| `mail_type` | - | - | - | - |
| `memo` | - | - | - | - |
| `merge_variables` | - | - | - | - |
| `message` | - | - | - | - |
| `metadata` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `send_date` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `total_count` | - | - | - | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Check()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Check()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Check()->load(["id" => "check_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Check()->remove(["id" => "check_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CheckEntity`

Create a new `CheckEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CreativeEntity

```php
$creative = $client->Creative();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaigns` | `array` | Yes | Array of campaigns associated with the creative ID |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `details` | `array` | No |  |
| `from` | `string` | No | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Yes | Unique identifier prefixed with `crv_`. |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No |  |
| `template_preview_urls` | `array` | Yes | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `array` | Yes | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `campaigns` | - | Yes | - |
| `date_created` | - | Yes | - |
| `date_modified` | - | Yes | - |
| `deleted` | Yes | - | - |
| `description` | - | - | - |
| `details` | - | - | - |
| `from` | - | - | - |
| `id` | - | Yes | - |
| `metadata` | - | - | - |
| `object` | - | Yes | - |
| `resource_type` | - | - | - |
| `template_preview_urls` | - | Yes | - |
| `template_previews` | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Creative()->create([
  "campaigns" => null, // array
  "date_created" => null, // string
  "date_modified" => null, // string
  "id" => null, // string
  "object" => null, // string
  "template_preview_urls" => null, // array
  "template_previews" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Creative()->load(["id" => "creative_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Creative()->update([
  "id" => "creative_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreativeEntity`

Create a new `CreativeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `created_at` | `string` | No | The date and time the domain was created. |
| `data` | `array` | No | List of domains. |
| `domain` | `string` | No | The registered domain/hostname. |
| `error_redirect_link` | `string` | No | URL to redirect customers if a short link is broken or inactive. |
| `id` | `string` | No | Unique identifier for a domain. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `status` | `string` | No | The configuration status of the domain. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `updated_at` | `string` | No | The date and time the domain was last updated. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `count` | - | - | - | - |
| `created_at` | - | - | - | - |
| `data` | - | - | - | - |
| `domain` | - | - | Yes | - |
| `error_redirect_link` | - | - | - | - |
| `id` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `status` | - | - | - | - |
| `total_count` | - | - | - | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Domain()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Domain()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Domain()->load(["id" => "domain_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Domain()->remove(["id" => "domain_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IdentityValidationEntity

```php
$identity_validation = $client->IdentityValidation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `string` | No |  |
| `id` | `string` | No |  |
| `last_line` | `string` | No |  |
| `object` | `string` | No |  |
| `primary_line` | `string` | No |  |
| `recipient` | `string` | No |  |
| `score` | `int` | No |  |
| `secondary_line` | `string` | No |  |
| `urbanization` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->IdentityValidation()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IdentityValidationEntity`

Create a new `IdentityValidationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IntlVerificationEntity

```php
$intl_verification = $client->IntlVerification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `array` | Yes |  |
| `components` | `array` | No |  |
| `country` | `string` | No |  |
| `coverage` | `string` | No |  |
| `deliverability` | `string` | No |  |
| `errors` | `bool` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | No |  |
| `last_line` | `string` | No |  |
| `object` | `string` | No |  |
| `primary_line` | `string` | No |  |
| `recipient` | `string` | No |  |
| `secondary_line` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->IntlVerification()->create([
  "addresses" => null, // array
  "errors" => null, // bool
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IntlVerificationEntity`

Create a new `IntlVerificationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LetterEntity

```php
$letter = $client->Letter();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_placement` | `string` | No |  |
| `cards` | `array` | No |  |
| `carrier` | `string` | No |  |
| `color` | `bool` | No |  |
| `count` | `int` | No | number of resources in a set |
| `custom_envelope` | `string` | No |  |
| `data` | `array` | No | list of letters |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `double_sided` | `bool` | No |  |
| `expected_delivery_date` | `string` | No |  |
| `extra_service` | `string` | No |  |
| `from` | `array` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No |  |
| `merge_variables` | `array` | No |  |
| `metadata` | `array` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `perforated_page` | `string` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `return_envelope` | `bool` | No |  |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `thumbnails` | `array` | No |  |
| `to` | `array` | No |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No |  |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Letter()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Letter()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Letter()->load(["id" => "letter_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Letter()->remove(["id" => "letter_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LetterEntity`

Create a new `LetterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LinkEntity

```php
$link = $client->Link();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | List of links |
| `domain` | `string` | No | The registered domain to be used for the short URL. |
| `id` | `string` | No |  |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `redirect_link` | `string` | Yes | The original target URL. |
| `slug` | `string` | No | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | No | The title of the URL. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Link()->create([
  "redirect_link" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Link()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Link()->load(["id" => "link_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Link()->remove(["id" => "link_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Link()->update([
  "id" => "link_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LinkEntity`

Create a new `LinkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LobCreditsBalanceEntity

```php
$lob_credits_balance = $client->LobCreditsBalance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `float` | Yes | Account's current balance of Lob Credits. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->LobCreditsBalance()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LobCreditsBalanceEntity`

Create a new `LobCreditsBalanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PostcardEntity

```php
$postcard = $client->Postcard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `back_template_id` | `string` | Yes | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of postcards |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` | No |  |
| `from` | `mixed` | No |  |
| `front_template_id` | `string` | Yes | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `psc_`. |
| `metadata` | `array` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` | No |  |
| `to` | `mixed` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | No | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `back_template_id` | - | - | Yes | - |
| `back_template_version_id` | - | - | - | - |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | - | - |
| `date_modified` | - | - | - | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `expected_delivery_date` | - | - | - | - |
| `failure_reason` | - | - | - | - |
| `from` | - | - | - | - |
| `front_template_id` | - | - | Yes | - |
| `front_template_version_id` | - | - | - | - |
| `fsc` | - | - | - | - |
| `id` | - | - | Yes | - |
| `metadata` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `send_date` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `total_count` | - | - | - | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Postcard()->create([
  "back_template_id" => null, // string
  "carrier" => null, // string
  "front_template_id" => null, // string
  "id" => null, // string
  "to" => null, // mixed
  "url" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Postcard()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Postcard()->load(["id" => "postcard_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Postcard()->remove(["id" => "postcard_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PostcardEntity`

Create a new `PostcardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QrCodeEntity

```php
$qr_code = $client->QrCode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | List of QR code analytics |
| `object` | `string` | No | Value is resource type. |
| `scanned_count` | `int` | No | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->QrCode()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QrCodeEntity`

Create a new `QrCodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResourceProofEntity

```php
$resource_proof = $client->ResourceProof();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `array` | No | Errors encountered during processing. |
| `id` | `string` | Yes | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No | The type of resource to generate a proof for. |
| `status` | `string` | No | The processing status of the resource proof. |
| `template_id` | `string` | No | The template ID associated with the resource proof, if any. |
| `thumbnails` | `array` | No | Thumbnail images of the resource proof. |
| `url` | `string` | No | A URL to the resource proof PDF. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `date_created` | - | Yes | - |
| `date_modified` | - | Yes | - |
| `errors` | - | - | - |
| `id` | - | Yes | - |
| `object` | - | Yes | - |
| `resource_type` | - | - | - |
| `status` | - | - | - |
| `template_id` | - | - | - |
| `thumbnails` | - | - | - |
| `url` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ResourceProof()->create([
  "date_created" => null, // string
  "date_modified" => null, // string
  "id" => null, // string
  "object" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ResourceProof()->load(["id" => "resource_proof_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ResourceProof()->update([
  "id" => "resource_proof_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResourceProofEntity`

Create a new `ResourceProofEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResponseEntity

```php
$response = $client->Response();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Your Lob account id. |
| `brand_name` | `string` | No |  |
| `campaign_code` | `string` | Yes | The campaign code associated with the Informed Delivery campaign. |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of Informed Delivery campaigns |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Yes | Whether the resource has been deleted. |
| `end_date` | `string` | Yes | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `int` | Yes | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Yes | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` | No |  |
| `mode` | `string` | Yes | The mode of the Informed Delivery campaign. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is the resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `quantity` | `int` | No |  |
| `representative_image_s3_link` | `string` | Yes | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | Yes | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` | No |  |
| `service_request_number` | `string` | Yes | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` | No |  |
| `start_serial` | `int` | Yes | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` | No |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `usps_campaign_id` | `string` | Yes | A numberical string up to 12 characters long. |
| `usps_title` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `account_id` | - | - | Yes | Yes |
| `brand_name` | - | - | - | - |
| `campaign_code` | - | - | Yes | Yes |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | Yes | Yes |
| `date_modified` | - | - | Yes | Yes |
| `deleted` | - | - | Yes | Yes |
| `end_date` | - | - | Yes | Yes |
| `end_serial` | - | - | Yes | Yes |
| `id` | - | - | Yes | Yes |
| `lob_campaign_id` | - | - | - | - |
| `mode` | - | - | Yes | Yes |
| `next_url` | - | - | - | - |
| `object` | - | Yes | Yes | Yes |
| `previous_url` | - | - | - | - |
| `quantity` | - | - | - | - |
| `representative_image_s3_link` | - | - | Yes | Yes |
| `ride_along_image_s3_link` | - | - | Yes | Yes |
| `ride_along_url` | - | - | - | - |
| `service_request_number` | - | - | Yes | Yes |
| `start_date` | - | - | - | - |
| `start_serial` | - | - | Yes | Yes |
| `status` | - | - | - | - |
| `total_count` | - | - | - | - |
| `usps_campaign_id` | - | - | Yes | Yes |
| `usps_title` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Response()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Response()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Response()->load(["usps_campaign_id" => "usps_campaign_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Response()->update([
  "usps_campaign_id" => "usps_campaign_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResponseEntity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReverseGeocodeEntity

```php
$reverse_geocode = $client->ReverseGeocode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `array` | No | list of addresses |
| `id` | `string` | No | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float` | Yes | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float` | Yes | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | No | Value is resource type. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ReverseGeocode()->create([
  "latitude" => null, // float
  "longitude" => null, // float
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReverseGeocodeEntity`

Create a new `ReverseGeocodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SelfMailerEntity

```php
$self_mailer = $client->SelfMailer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of self_mailers |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` | No |  |
| `from` | `mixed` | No |  |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `array` | No |  |
| `metadata` | `array` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` | No |  |
| `to` | `mixed` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | - | - |
| `date_modified` | - | - | - | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `expected_delivery_date` | - | - | - | - |
| `failure_reason` | - | - | - | - |
| `from` | - | - | - | - |
| `fsc` | - | - | - | - |
| `id` | - | - | Yes | - |
| `inside_template_id` | - | - | - | - |
| `inside_template_version_id` | - | - | - | - |
| `mail_type` | - | - | - | - |
| `merge_variables` | - | - | - | - |
| `metadata` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `outside_template_id` | - | - | - | - |
| `outside_template_version_id` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `total_count` | - | - | - | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->SelfMailer()->create([
  "carrier" => null, // string
  "id" => null, // string
  "to" => null, // mixed
  "url" => null, // string
  "use_type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SelfMailer()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SelfMailer()->load(["id" => "self_mailer_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->SelfMailer()->remove(["id" => "self_mailer_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SelfMailerEntity`

Create a new `SelfMailerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SnapPackEntity

```php
$snap_pack = $client->SnapPack();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `color` | `bool` | No | Set this key to `true` if you would like to print in color. |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of snap_packs |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `array` | No |  |
| `from` | `mixed` | No |  |
| `fsc` | `bool` | No | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Yes | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `array` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `array` | No |  |
| `to` | `mixed` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `array` | No | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
| `color` | - | - | - | - |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | - | - |
| `date_modified` | - | - | - | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `expected_delivery_date` | - | - | - | - |
| `failure_reason` | - | - | - | - |
| `from` | - | - | - | - |
| `fsc` | - | - | - | - |
| `id` | - | - | Yes | - |
| `inside_template_id` | - | - | - | - |
| `inside_template_version_id` | - | - | - | - |
| `mail_type` | - | - | - | - |
| `merge_variables` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `outside_template_id` | - | - | - | - |
| `outside_template_version_id` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `total_count` | - | - | - | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->SnapPack()->create([
  "carrier" => null, // string
  "id" => null, // string
  "to" => null, // mixed
  "url" => null, // string
  "use_type" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SnapPack()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SnapPack()->load(["id" => "snap_pack_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->SnapPack()->remove(["id" => "snap_pack_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SnapPackEntity`

Create a new `SnapPackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateEntity

```php
$template = $client->Template();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of templates |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `array` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `published_version` | `mixed` | Yes |  |
| `required_vars` | `array` | No | An array of required variables to be used in a template. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `versions` | `array` | Yes | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `count` | - | - | - | - |
| `data` | - | - | - | - |
| `date_created` | - | - | - | - |
| `date_modified` | - | - | - | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `engine` | - | - | - | - |
| `html` | - | - | - | - |
| `id` | - | - | - | - |
| `metadata` | - | - | - | - |
| `next_url` | - | - | - | - |
| `object` | - | - | - | - |
| `previous_url` | - | - | - | - |
| `published_version` | - | - | Yes | - |
| `required_vars` | - | - | - | - |
| `total_count` | - | - | - | - |
| `versions` | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Template()->create([
  "id" => null, // string
  "html" => null, // string
  "published_version" => null, // mixed
  "versions" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Template()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Template()->load(["id" => "template_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Template()->remove(["id" => "template_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateEntity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateVersionEntity

```php
$template_version = $client->TemplateVersion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `array` | No | list of template versions |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `array` | No | Object representing the keys of every merge variable present in the template. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `required_vars` | `array` | No | An array of required variables to be used in a template. |
| `suggest_json_editor` | `bool` | No | Used by frontend, true if the template uses advanced features. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `count` | - | - | - |
| `data` | - | - | - |
| `date_created` | - | - | - |
| `date_modified` | - | - | - |
| `deleted` | - | - | - |
| `description` | - | - | - |
| `engine` | - | - | - |
| `html` | - | - | - |
| `id` | - | - | - |
| `merge_variables` | - | - | - |
| `next_url` | - | - | - |
| `object` | Yes | Yes | - |
| `previous_url` | - | - | - |
| `required_vars` | - | - | - |
| `suggest_json_editor` | - | - | - |
| `total_count` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->TemplateVersion()->create([
  "id" => null, // string
  "date_created" => null, // string
  "date_modified" => null, // string
  "html" => null, // string
  "object" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->TemplateVersion()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TemplateVersion()->load(["id" => "template_version_id", "template_id" => "template_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateVersionEntity`

Create a new `TemplateVersionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TemplateVersionDeletionEntity

```php
$template_version_deletion = $client->TemplateVersionDeletion();
```

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->TemplateVersionDeletion()->remove(["template_id" => "template_id", "vrsn_id" => "vrsn_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TemplateVersionDeletionEntity`

Create a new `TemplateVersionDeletionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UploadEntity

```php
$upload = $client->Upload();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes | Account ID that made the request |
| `bytesProcessed` | `int` | Yes | Number of bytes processed in your CSV |
| `campaignId` | `mixed` | Yes |  |
| `dateCreated` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Yes | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Yes | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | No | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Yes | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `array` | No | test |
| `metadata` | `array` | Yes | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | Yes | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `array` | Yes | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | No | Filename of the upload |
| `requiredAddressColumnMapping` | `array` | Yes | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | Yes | The URL for the generated export file. |
| `state` | `string` | Yes | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Yes | Total number of recipients for the campaign |
| `type` | `string` | Yes | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Yes | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Yes | Number of mailpieces that were successfully created |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Upload()->create([
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Upload()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Upload()->load(["id" => "upload_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Upload()->remove(["id" => "upload_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Upload()->update([
  "id" => "upload_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UploadEntity`

Create a new `UploadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UploadCreateExportEntity

```php
$upload_create_export = $client->UploadCreateExport();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exportId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `type` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UploadCreateExport()->create([
  "id" => null, // string
  "exportId" => null, // string
  "message" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UploadCreateExportEntity`

Create a new `UploadCreateExportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UsAutocompletionEntity

```php
$us_autocompletion = $client->UsAutocompletion();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_prefix` | `string` | Yes | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `string` | No | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `bool` | No | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `string` | No | Unique identifier prefixed with `us_auto_`. |
| `object` | `string` | No | Value is resource type. |
| `state` | `string` | No | An optional state input used to filter suggestions. |
| `suggestions` | `array` | No | An array of objects representing suggested addresses. |
| `zip_code` | `string` | No | An optional ZIP Code input used to filter suggestions. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UsAutocompletion()->create([
  "address_prefix" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UsAutocompletionEntity`

Create a new `UsAutocompletionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UsVerificationEntity

```php
$us_verification = $client->UsVerification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `array` | Yes |  |
| `components` | `array` | Yes | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | No | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `array` | Yes | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | No | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | No | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `array` | Yes | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | No | Value is resource type. |
| `primary_line` | `string` | No | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | No | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | No | The secondary delivery line of the address. |
| `urbanization` | `string` | No | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | No | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->UsVerification()->create([
  "addresses" => null, // array
  "components" => null, // array
  "deliverability_analysis" => null, // array
  "errors" => null, // bool
  "lob_confidence_score" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UsVerificationEntity`

Create a new `UsVerificationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ZipEntity

```php
$zip = $client->Zip();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `zip_code` | `string` | Yes | A 5-digit ZIP code. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Zip()->create([
  "zip_code" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ZipEntity`

Create a new `ZipEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new LobSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

