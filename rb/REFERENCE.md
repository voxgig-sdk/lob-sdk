# Lob Ruby SDK Reference

Complete API reference for the Lob Ruby SDK.


## LobSDK

### Constructor

```ruby
require_relative 'Lob_sdk'

client = LobSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LobSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LobSDK.test
```


### Instance Methods

#### `Address(data = nil)`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `BankAccount(data = nil)`

Create a new `BankAccount` entity instance. Pass `nil` for no initial data.

#### `BankDeletion(data = nil)`

Create a new `BankDeletion` entity instance. Pass `nil` for no initial data.

#### `BillingGroup(data = nil)`

Create a new `BillingGroup` entity instance. Pass `nil` for no initial data.

#### `Booklet(data = nil)`

Create a new `Booklet` entity instance. Pass `nil` for no initial data.

#### `Buckslip(data = nil)`

Create a new `Buckslip` entity instance. Pass `nil` for no initial data.

#### `BuckslipOrder(data = nil)`

Create a new `BuckslipOrder` entity instance. Pass `nil` for no initial data.

#### `Campaign(data = nil)`

Create a new `Campaign` entity instance. Pass `nil` for no initial data.

#### `Card(data = nil)`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardOrder(data = nil)`

Create a new `CardOrder` entity instance. Pass `nil` for no initial data.

#### `Check(data = nil)`

Create a new `Check` entity instance. Pass `nil` for no initial data.

#### `Creative(data = nil)`

Create a new `Creative` entity instance. Pass `nil` for no initial data.

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `IdentityValidation(data = nil)`

Create a new `IdentityValidation` entity instance. Pass `nil` for no initial data.

#### `IntlVerification(data = nil)`

Create a new `IntlVerification` entity instance. Pass `nil` for no initial data.

#### `Letter(data = nil)`

Create a new `Letter` entity instance. Pass `nil` for no initial data.

#### `Link(data = nil)`

Create a new `Link` entity instance. Pass `nil` for no initial data.

#### `LobCreditsBalance(data = nil)`

Create a new `LobCreditsBalance` entity instance. Pass `nil` for no initial data.

#### `Postcard(data = nil)`

Create a new `Postcard` entity instance. Pass `nil` for no initial data.

#### `QrCode(data = nil)`

Create a new `QrCode` entity instance. Pass `nil` for no initial data.

#### `ResourceProof(data = nil)`

Create a new `ResourceProof` entity instance. Pass `nil` for no initial data.

#### `Response(data = nil)`

Create a new `Response` entity instance. Pass `nil` for no initial data.

#### `ReverseGeocode(data = nil)`

Create a new `ReverseGeocode` entity instance. Pass `nil` for no initial data.

#### `SelfMailer(data = nil)`

Create a new `SelfMailer` entity instance. Pass `nil` for no initial data.

#### `SnapPack(data = nil)`

Create a new `SnapPack` entity instance. Pass `nil` for no initial data.

#### `Template(data = nil)`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TemplateVersion(data = nil)`

Create a new `TemplateVersion` entity instance. Pass `nil` for no initial data.

#### `TemplateVersionDeletion(data = nil)`

Create a new `TemplateVersionDeletion` entity instance. Pass `nil` for no initial data.

#### `Upload(data = nil)`

Create a new `Upload` entity instance. Pass `nil` for no initial data.

#### `UploadCreateExport(data = nil)`

Create a new `UploadCreateExport` entity instance. Pass `nil` for no initial data.

#### `UsAutocompletion(data = nil)`

Create a new `UsAutocompletion` entity instance. Pass `nil` for no initial data.

#### `UsVerification(data = nil)`

Create a new `UsVerification` entity instance. Pass `nil` for no initial data.

#### `Zip(data = nil)`

Create a new `Zip` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AddressEntity

```ruby
address = client.Address
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_city` | `String` | No |  |
| `address_country` | `String` | No |  |
| `address_line1` | `String` | No |  |
| `address_line2` | `String` | No |  |
| `address_state` | `String` | No |  |
| `address_zip` | `String` | No |  |
| `company` | `String` | No |  |
| `date_created` | `String` | No |  |
| `date_modified` | `String` | No |  |
| `description` | `String` | No |  |
| `email` | `String` | No |  |
| `id` | `String` | No |  |
| `metadata` | `Hash` | No |  |
| `name` | `String` | No |  |
| `object` | `String` | No |  |
| `phone` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Address.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Address.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Address.load({ "id" => "address_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Address.remove({ "id" => "address_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BankAccountEntity

```ruby
bank_account = client.BankAccount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `String` | Yes |  |
| `account_type` | `String` | Yes | The type of entity that holds the account. |
| `bank_name` | `String` | No | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `String` | No | The check template used for printing. |
| `city` | `String` | No | The city associated with your home bank account. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | An internal description that identifies this resource. |
| `fractional_routing_number` | `String` | No | The fractional routing number for your home bank account. |
| `id` | `String` | Yes |  |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `String` | No | The type of microdeposit verification required for this bank account. |
| `object` | `String` | Yes | Value is resource type. |
| `routing_number` | `String` | Yes | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `String` | Yes | The signatory associated with your account. |
| `signature_url` | `Object` | No |  |
| `state` | `String` | No | The state associated with your home bank account. |
| `verified` | `Boolean` | No | A bank account must be verified before a check can be created. |
| `zipcode` | `String` | No | The zipcode associated with your home bank account. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `account_number` | - | - | - |
| `account_type` | - | - | - |
| `bank_name` | - | - | - |
| `check_template` | - | - | - |
| `city` | - | - | - |
| `date_created` | - | - | - |
| `date_modified` | - | - | - |
| `deleted` | - | - | - |
| `description` | - | - | - |
| `fractional_routing_number` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `microdeposit_type` | - | - | - |
| `object` | Yes | Yes | Yes |
| `routing_number` | - | - | - |
| `signatory` | - | - | - |
| `signature_url` | - | - | - |
| `state` | - | - | - |
| `verified` | - | - | - |
| `zipcode` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BankAccount.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BankAccount.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BankAccount.load({ "id" => "bank_account_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BankAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BankDeletionEntity

```ruby
bank_deletion = client.BankDeletion
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.BankDeletion.remove({ "bank_id" => "bank_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BankDeletionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BillingGroupEntity

```ruby
billing_group = client.BillingGroup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `String` | No | Description of the billing group. |
| `id` | `String` | No | Unique identifier prefixed with `bg_`. |
| `name` | `String` | No | Name of the billing group. |
| `object` | `String` | No | Value is resource type. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BillingGroup.create({
  "id" => "example_id", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BillingGroup.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BillingGroup.load({ "id" => "billing_group_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BillingGroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BookletEntity

```ruby
booklet = client.Booklet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `carrier` | `String` | No |  |
| `date_created` | `String` | No |  |
| `date_modified` | `String` | No |  |
| `description` | `String` | No | An internal description that identifies this resource. |
| `expected_delivery_date` | `String` | No |  |
| `from` | `Hash` | No |  |
| `fsc` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `mail_type` | `String` | No | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `Hash` | No | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` | No |  |
| `pages` | `Integer` | No |  |
| `send_date` | `String` | No | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `String` | No |  |
| `sla` | `String` | No |  |
| `source_material` | `String` | No |  |
| `thumbnails` | `Array` | No |  |
| `to` | `Hash` | No |  |
| `tracking_events` | `Array` | No | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `String` | No |  |
| `url` | `String` | No |  |
| `use_type` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Booklet.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Booklet.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Booklet.load({ "id" => "booklet_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Booklet.remove({ "id" => "booklet_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BookletEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BuckslipEntity

```ruby
buckslip = client.Buckslip
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `String` | No |  |
| `allocated_quantity` | `Float` | Yes | The allocated quantity of buckslips. |
| `auto_reorder` | `Boolean` | Yes | True if the buckslips should be auto-reordered. |
| `available_quantity` | `Float` | Yes | The available quantity of buckslips. |
| `back_original_url` | `String` | Yes | The original URL of the back template. |
| `buckslip_orders` | `Array` | Yes | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | Description of the buckslip. |
| `finish` | `String` | Yes |  |
| `front_original_url` | `String` | Yes | The original URL of the front template. |
| `id` | `String` | Yes | Unique identifier prefixed with `bck_`. |
| `mode` | `String` | No |  |
| `object` | `String` | Yes | Value is resource type. |
| `onhand_quantity` | `Float` | Yes | The onhand quantity of buckslips. |
| `pending_quantity` | `Float` | Yes | The pending quantity of buckslips. |
| `projected_quantity` | `Float` | Yes | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `String` | Yes | The raw URL of the buckslip. |
| `reorder_quantity` | `Integer` | Yes | The number of buckslips to be reordered. |
| `send_date` | `String` | No |  |
| `size` | `String` | No | The size of the buckslip |
| `status` | `String` | Yes |  |
| `stock` | `String` | Yes |  |
| `threshold_amount` | `Integer` | Yes | The threshold amount of the buckslip |
| `thumbnails` | `Array` | Yes |  |
| `url` | `String` | Yes | The signed link for the buckslip. |
| `weight` | `String` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `account_id` | - | - | - | - | - |
| `allocated_quantity` | - | - | Yes | - | - |
| `auto_reorder` | - | - | Yes | Yes | - |
| `available_quantity` | - | - | Yes | - | - |
| `back_original_url` | - | - | Yes | - | - |
| `buckslip_orders` | - | - | Yes | - | - |
| `date_created` | - | - | Yes | - | - |
| `date_modified` | - | - | Yes | - | - |
| `deleted` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `finish` | - | - | Yes | - | - |
| `front_original_url` | - | - | Yes | - | - |
| `id` | - | - | Yes | - | - |
| `mode` | - | - | - | - | - |
| `object` | - | - | Yes | - | - |
| `onhand_quantity` | - | - | Yes | - | - |
| `pending_quantity` | - | - | Yes | - | - |
| `projected_quantity` | - | - | Yes | - | - |
| `raw_url` | - | - | Yes | - | - |
| `reorder_quantity` | - | - | Yes | Yes | - |
| `send_date` | - | - | - | - | - |
| `size` | - | - | - | - | - |
| `status` | - | - | Yes | - | - |
| `stock` | - | - | Yes | - | - |
| `threshold_amount` | - | - | Yes | - | - |
| `thumbnails` | - | - | Yes | - | - |
| `url` | - | - | Yes | - | - |
| `weight` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Buckslip.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Buckslip.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Buckslip.load({ "id" => "buckslip_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Buckslip.remove({ "id" => "buckslip_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Buckslip.update({
  "id" => "buckslip_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BuckslipEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BuckslipOrderEntity

```ruby
buckslip_order = client.BuckslipOrder
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | `String` | No | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | `String` | No | The reason for cancellation. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `String` | No | The fixed deadline for the buckslips to be printed. |
| `id` | `String` | No | Unique identifier prefixed with `bo_`. |
| `inventory` | `Float` | No | The inventory of the buckslip order. |
| `object` | `String` | Yes | Value is resource type. |
| `quantity` | `Integer` | Yes | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `Float` | No | The quantity of buckslips ordered. |
| `status` | `String` | No | The status of the buckslip order. |
| `unit_price` | `Float` | No | The unit price for the buckslip order. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BuckslipOrder.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "object" => "example_object", # String
  "quantity" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.BuckslipOrder.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BuckslipOrderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CampaignEntity

```ruby
campaign = client.Campaign
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | `Boolean` | No | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `String` | No | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `Integer` | No | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `Array` | Yes | An array of creatives that have been associated with this campaign. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | An internal description that identifies this resource. |
| `id` | `String` | Yes | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `Boolean` | Yes | Whether or not the campaign is still a draft. |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `String` | Yes | Name of the campaign. |
| `object` | `String` | Yes | Value is resource type. |
| `print_speed` | `String` | No | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `String` | Yes | How the campaign should be scheduled. |
| `send_date` | `String` | No | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `String` | No | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `Array` | Yes | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `String` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | - | - | - | - | - |
| `billing_group_id` | - | - | - | - | - |
| `cancel_window_campaign_minutes` | - | - | - | - | - |
| `creatives` | - | - | - | - | - |
| `date_created` | - | - | - | - | - |
| `date_modified` | - | - | - | - | - |
| `deleted` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_draft` | - | - | - | Yes | - |
| `metadata` | - | - | - | - | - |
| `name` | - | - | - | Yes | - |
| `object` | - | - | - | - | - |
| `print_speed` | - | - | - | - | - |
| `schedule_type` | - | - | - | Yes | - |
| `send_date` | - | - | - | - | - |
| `target_delivery_date` | - | - | - | - | - |
| `uploads` | - | - | - | - | - |
| `use_type` | - | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Campaign.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Campaign.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Campaign.load({ "id" => "campaign_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Campaign.remove({ "id" => "campaign_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Campaign.update({
  "id" => "campaign_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardEntity

```ruby
card = client.Card
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `String` | No |  |
| `auto_reorder` | `Boolean` | Yes | True if the cards should be auto-reordered. |
| `available_quantity` | `Integer` | Yes | The available quantity of cards. |
| `back_original_url` | `String` | Yes | The original URL of the back template. |
| `countries` | `String` | No |  |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | Description of the card. |
| `front_original_url` | `String` | Yes | The original URL of the front template. |
| `id` | `String` | Yes | Unique identifier prefixed with `card_`. |
| `mode` | `String` | No |  |
| `object` | `String` | Yes | Value is resource type. |
| `orientation` | `String` | Yes | The orientation of the card. |
| `pending_quantity` | `Integer` | Yes | The pending quantity of cards. |
| `raw_url` | `String` | Yes | The raw URL of the card. |
| `reorder_quantity` | `Integer` | Yes | The number of cards to be reordered. |
| `send_date` | `String` | No |  |
| `size` | `String` | No | The size of the card |
| `status` | `String` | Yes |  |
| `threshold_amount` | `Integer` | Yes | The threshold amount of the card |
| `thumbnails` | `Array` | Yes |  |
| `url` | `String` | Yes | The signed link for the card. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `account_id` | - | - | - | - |
| `auto_reorder` | - | - | Yes | - |
| `available_quantity` | - | - | Yes | - |
| `back_original_url` | - | - | Yes | - |
| `countries` | - | - | - | - |
| `date_created` | - | - | Yes | - |
| `date_modified` | - | - | Yes | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `front_original_url` | - | - | Yes | - |
| `id` | - | - | Yes | - |
| `mode` | - | - | - | - |
| `object` | - | - | Yes | - |
| `orientation` | - | - | Yes | - |
| `pending_quantity` | - | - | Yes | - |
| `raw_url` | - | - | Yes | - |
| `reorder_quantity` | - | - | Yes | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `status` | - | - | Yes | - |
| `threshold_amount` | - | - | Yes | - |
| `thumbnails` | - | - | Yes | - |
| `url` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Card.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Card.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Card.load({ "id" => "card_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Card.remove({ "id" => "card_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CardOrderEntity

```ruby
card_order = client.CardOrder
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | `String` | No | The reason for cancellation. |
| `card_id` | `String` | No | Unique identifier prefixed with `card_`. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `String` | No | The fixed deadline for the cards to be printed. |
| `id` | `String` | No | Unique identifier prefixed with `co_`. |
| `inventory` | `Float` | No | The inventory of the card order. |
| `object` | `String` | Yes | Value is resource type. |
| `quantity` | `Integer` | Yes | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `Float` | No | The quantity of cards ordered |
| `status` | `String` | No | The status of the card order. |
| `unit_price` | `Float` | No | The unit price for the card order. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CardOrder.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "object" => "example_object", # String
  "quantity" => 1, # Integer
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CardOrder.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CheckEntity

```ruby
check = client.Check
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | Yes | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `String` | No |  |
| `attachment_template_version_id` | `String` | No |  |
| `bank_account` | `Object` | Yes |  |
| `carrier` | `String` | Yes |  |
| `check_bottom_template_id` | `String` | No |  |
| `check_bottom_template_version_id` | `String` | No |  |
| `check_number` | `Integer` | No |  |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No |  |
| `expected_delivery_date` | `String` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` | No |  |
| `from` | `Object` | No |  |
| `id` | `String` | Yes | Unique identifier prefixed with `chk_`. |
| `mail_type` | `String` | No |  |
| `memo` | `String` | No |  |
| `merge_variables` | `Hash` | No |  |
| `message` | `String` | No |  |
| `metadata` | `Hash` | No |  |
| `object` | `String` | No | Value is resource type. |
| `send_date` | `String` | No |  |
| `sla` | `String` | No |  |
| `status` | `String` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` | No |  |
| `to` | `Object` | Yes |  |
| `tracking_events` | `Array` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `String` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | Yes | TThe use type for each mailpiece. |

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
| `object` | - | - | - | - |
| `send_date` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Check.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Check.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Check.load({ "id" => "check_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Check.remove({ "id" => "check_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CheckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CreativeEntity

```ruby
creative = client.Creative
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaigns` | `Array` | Yes | Array of campaigns associated with the creative ID |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | An internal description that identifies this resource. |
| `details` | `Hash` | No |  |
| `from` | `String` | No | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `String` | Yes | Unique identifier prefixed with `crv_`. |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` | Yes | Value is resource type. |
| `resource_type` | `String` | No |  |
| `template_preview_urls` | `Hash` | Yes | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `Array` | Yes | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Creative.create({
  "campaigns" => [], # Array
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
  "template_preview_urls" => {}, # Hash
  "template_previews" => [], # Array
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Creative.load({ "id" => "creative_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Creative.update({
  "id" => "creative_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreativeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | The date and time the domain was created. |
| `domain` | `String` | No | The registered domain/hostname. |
| `error_redirect_link` | `String` | No | URL to redirect customers if a short link is broken or inactive. |
| `id` | `String` | No | Unique identifier for a domain. |
| `status` | `String` | No | The configuration status of the domain. |
| `updated_at` | `String` | No | The date and time the domain was last updated. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - |
| `domain` | - | - | Yes | - |
| `error_redirect_link` | - | - | - | - |
| `id` | - | - | - | - |
| `status` | - | - | - | - |
| `updated_at` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Domain.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Domain.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Domain.load({ "id" => "domain_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Domain.remove({ "id" => "domain_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IdentityValidationEntity

```ruby
identity_validation = client.IdentityValidation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `String` | No |  |
| `id` | `String` | No |  |
| `last_line` | `String` | No |  |
| `object` | `String` | No |  |
| `primary_line` | `String` | No |  |
| `recipient` | `String` | No |  |
| `score` | `Integer` | No |  |
| `secondary_line` | `String` | No |  |
| `urbanization` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.IdentityValidation.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IdentityValidationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IntlVerificationEntity

```ruby
intl_verification = client.IntlVerification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `Array` | Yes |  |
| `components` | `Hash` | No |  |
| `country` | `String` | No |  |
| `coverage` | `String` | No |  |
| `deliverability` | `String` | No |  |
| `errors` | `Boolean` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `String` | No |  |
| `last_line` | `String` | No |  |
| `object` | `String` | No |  |
| `primary_line` | `String` | No |  |
| `recipient` | `String` | No |  |
| `secondary_line` | `String` | No |  |
| `status` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.IntlVerification.create({
  "addresses" => [], # Array
  "errors" => true, # Boolean
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IntlVerificationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LetterEntity

```ruby
letter = client.Letter
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_placement` | `String` | No |  |
| `cards` | `Array` | No |  |
| `carrier` | `String` | No |  |
| `color` | `Boolean` | No |  |
| `custom_envelope` | `String` | No |  |
| `date_created` | `String` | No |  |
| `date_modified` | `String` | No |  |
| `description` | `String` | No |  |
| `double_sided` | `Boolean` | No |  |
| `expected_delivery_date` | `String` | No |  |
| `extra_service` | `String` | No |  |
| `from` | `Hash` | No |  |
| `fsc` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `mail_type` | `String` | No |  |
| `merge_variables` | `Hash` | No |  |
| `metadata` | `Hash` | No |  |
| `object` | `String` | No |  |
| `perforated_page` | `String` | No |  |
| `return_envelope` | `Boolean` | No |  |
| `send_date` | `String` | No |  |
| `sla` | `String` | No |  |
| `template_id` | `String` | No |  |
| `template_version_id` | `String` | No |  |
| `thumbnails` | `Array` | No |  |
| `to` | `Hash` | No |  |
| `tracking_events` | `Array` | No |  |
| `tracking_number` | `String` | No |  |
| `url` | `String` | No |  |
| `use_type` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Letter.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Letter.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Letter.load({ "id" => "letter_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Letter.remove({ "id" => "letter_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LetterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LinkEntity

```ruby
link = client.Link
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No | The date and time the link was created. |
| `domain` | `String` | No | The registered domain to be used for the short URL. |
| `domain_id` | `String` | No | A unique identifier for the registered domain. |
| `id` | `String` | No | Unique identifier prefixed with `lnk_`. |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `String` | No | The original target URL. |
| `short_link` | `String` | No | The shortened URL for the associated original URL. |
| `slug` | `String` | No | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `String` | No | The title of the URL. |
| `updated_at` | `String` | No | The date and time the link was last updated. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `domain` | - | - | - | - | - |
| `domain_id` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `redirect_link` | - | - | Yes | Yes | - |
| `short_link` | - | - | - | - | - |
| `slug` | - | - | - | - | - |
| `title` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Link.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Link.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Link.load({ "id" => "link_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Link.remove({ "id" => "link_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Link.update({
  "id" => "link_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LinkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LobCreditsBalanceEntity

```ruby
lob_credits_balance = client.LobCreditsBalance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `Float` | Yes | Account's current balance of Lob Credits. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.LobCreditsBalance.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LobCreditsBalanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostcardEntity

```ruby
postcard = client.Postcard
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `back_template_id` | `String` | Yes | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `String` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` | Yes |  |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No |  |
| `expected_delivery_date` | `String` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` | No |  |
| `from` | `Object` | No |  |
| `front_template_id` | `String` | Yes | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `Boolean` | No | This is in beta. |
| `id` | `String` | Yes | Unique identifier prefixed with `psc_`. |
| `metadata` | `Hash` | No |  |
| `object` | `String` | No | Value is resource type. |
| `send_date` | `String` | No |  |
| `sla` | `String` | No |  |
| `status` | `String` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` | No |  |
| `to` | `Object` | Yes |  |
| `tracking_events` | `Array` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `String` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | No | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `back_template_id` | - | - | Yes | - |
| `back_template_version_id` | - | - | - | - |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
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
| `object` | - | - | - | - |
| `send_date` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Postcard.create({
  "back_template_id" => "example_back_template_id", # String
  "carrier" => "example_carrier", # String
  "front_template_id" => "example_front_template_id", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Postcard.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Postcard.load({ "id" => "postcard_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Postcard.remove({ "id" => "postcard_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostcardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## QrCodeEntity

```ruby
qr_code = client.QrCode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `Float` | No | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `String` | No | Unique identifier for each mail piece. |
| `scans` | `Array` | No | Detailed scan information associated with each mail piece. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.QrCode.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `QrCodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResourceProofEntity

```ruby
resource_proof = client.ResourceProof
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `Array` | No | Errors encountered during processing. |
| `id` | `String` | Yes | Unique identifier prefixed with `res_prf_`. |
| `object` | `String` | Yes | Value is resource type. |
| `resource_type` | `String` | No | The type of resource to generate a proof for. |
| `status` | `String` | No | The processing status of the resource proof. |
| `template_id` | `String` | No | The template ID associated with the resource proof, if any. |
| `thumbnails` | `Array` | No | Thumbnail images of the resource proof. |
| `url` | `String` | No | A URL to the resource proof PDF. |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ResourceProof.create({
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "id" => "example_id", # String
  "object" => "example_object", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ResourceProof.load({ "id" => "resource_proof_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.ResourceProof.update({
  "id" => "resource_proof_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResourceProofEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResponseEntity

```ruby
response = client.Response
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `String` | Yes | Your Lob account id. |
| `brand_name` | `String` | No |  |
| `campaign_code` | `String` | Yes | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | Yes | Whether the resource has been deleted. |
| `end_date` | `String` | Yes | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `Integer` | Yes | The last serial number in the range of serial numbers for this campaign. |
| `id` | `String` | Yes | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `String` | No |  |
| `mode` | `String` | Yes | The mode of the Informed Delivery campaign. |
| `object` | `String` | Yes | Value is the resource type. |
| `quantity` | `Integer` | No |  |
| `representative_image_s3_link` | `String` | Yes | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `String` | Yes | A URL link to the campaigns ride along image. |
| `ride_along_url` | `String` | No |  |
| `service_request_number` | `String` | Yes | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `String` | No |  |
| `start_serial` | `Integer` | Yes | The first serial number in the range of serial numbers for this campaign. |
| `status` | `String` | No |  |
| `usps_campaign_id` | `String` | Yes | A numberical string up to 12 characters long. |
| `usps_title` | `String` | No |  |

### Field Usage by Operation

| Field | load | list | create | update |
| --- | --- | --- | --- | --- |
| `account_id` | - | - | Yes | Yes |
| `brand_name` | - | - | - | - |
| `campaign_code` | - | - | Yes | Yes |
| `date_created` | - | - | Yes | Yes |
| `date_modified` | - | - | Yes | Yes |
| `deleted` | - | - | Yes | Yes |
| `end_date` | - | - | Yes | Yes |
| `end_serial` | - | - | Yes | Yes |
| `id` | - | - | Yes | Yes |
| `lob_campaign_id` | - | - | - | - |
| `mode` | - | - | Yes | Yes |
| `object` | - | - | Yes | Yes |
| `quantity` | - | - | - | - |
| `representative_image_s3_link` | - | - | Yes | Yes |
| `ride_along_image_s3_link` | - | - | Yes | Yes |
| `ride_along_url` | - | - | - | - |
| `service_request_number` | - | - | Yes | Yes |
| `start_date` | - | - | - | - |
| `start_serial` | - | - | Yes | Yes |
| `status` | - | - | - | - |
| `usps_campaign_id` | - | - | Yes | Yes |
| `usps_title` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Response.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Response.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Response.load({ "usps_campaign_id" => "usps_campaign_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Response.update({
  "usps_campaign_id" => "usps_campaign_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReverseGeocodeEntity

```ruby
reverse_geocode = client.ReverseGeocode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `Array` | No | list of addresses |
| `id` | `String` | No | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `Float` | Yes | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `Float` | Yes | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `String` | No | Value is resource type. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ReverseGeocode.create({
  "latitude" => 1, # Float
  "longitude" => 1, # Float
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReverseGeocodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SelfMailerEntity

```ruby
self_mailer = client.SelfMailer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `String` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` | Yes |  |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No |  |
| `expected_delivery_date` | `String` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` | No |  |
| `from` | `Object` | No |  |
| `fsc` | `Boolean` | No | This is in beta. |
| `id` | `String` | Yes | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `String` | No | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `String` | No |  |
| `merge_variables` | `Hash` | No |  |
| `metadata` | `Hash` | No |  |
| `object` | `String` | No | Value is resource type. |
| `outside_template_id` | `String` | No | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `String` | No |  |
| `size` | `String` | No |  |
| `sla` | `String` | No |  |
| `status` | `String` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` | No |  |
| `to` | `Object` | Yes |  |
| `tracking_events` | `Array` | No | An array of certified tracking events ordered by ascending `time`. |
| `url` | `String` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
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
| `object` | - | - | - | - |
| `outside_template_id` | - | - | - | - |
| `outside_template_version_id` | - | - | - | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.SelfMailer.create({
  "carrier" => "example_carrier", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
  "use_type" => "example_use_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SelfMailer.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SelfMailer.load({ "id" => "self_mailer_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.SelfMailer.remove({ "id" => "self_mailer_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SelfMailerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SnapPackEntity

```ruby
snap_pack = client.SnapPack
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `String` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `String` | Yes |  |
| `color` | `Boolean` | No | Set this key to `true` if you would like to print in color. |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No |  |
| `expected_delivery_date` | `String` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Hash` | No |  |
| `from` | `Object` | No |  |
| `fsc` | `Boolean` | No | Contact support@lob.com or your account contact to learn more. |
| `id` | `String` | Yes | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `String` | No | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `String` | No |  |
| `merge_variables` | `Hash` | No |  |
| `object` | `String` | No | Value is resource type. |
| `outside_template_id` | `String` | No | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `String` | No | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `String` | No |  |
| `size` | `String` | No |  |
| `sla` | `String` | No |  |
| `status` | `String` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `Array` | No |  |
| `to` | `Object` | Yes |  |
| `tracking_events` | `Array` | No | An array of tracking events ordered by ascending `time`. |
| `url` | `String` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `String` | Yes | The use type for each mailpiece. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `campaign_id` | - | - | - | - |
| `carrier` | - | - | Yes | - |
| `color` | - | - | - | - |
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
| `object` | - | - | - | - |
| `outside_template_id` | - | - | - | - |
| `outside_template_version_id` | - | - | - | - |
| `send_date` | - | - | - | - |
| `size` | - | - | - | - |
| `sla` | - | - | - | - |
| `status` | - | - | - | - |
| `thumbnails` | - | - | - | - |
| `to` | - | - | Yes | - |
| `tracking_events` | - | - | - | - |
| `url` | - | - | Yes | - |
| `use_type` | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.SnapPack.create({
  "carrier" => "example_carrier", # String
  "id" => "example_id", # String
  "to" => "example_to", # Object
  "url" => "example_url", # String
  "use_type" => "example_use_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SnapPack.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SnapPack.load({ "id" => "snap_pack_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.SnapPack.remove({ "id" => "snap_pack_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SnapPackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateEntity

```ruby
template = client.Template
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `String` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | An internal description that identifies this resource. |
| `engine` | `String` | No | The engine used to combine HTML template with merge variables. |
| `html` | `String` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `String` | Yes | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `Hash` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `String` | No | Value is resource type. |
| `published_version` | `Object` | Yes |  |
| `required_vars` | `Array` | No | An array of required variables to be used in a template. |
| `versions` | `Array` | Yes | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `date_created` | - | - | - | - |
| `date_modified` | - | - | - | - |
| `deleted` | - | - | - | - |
| `description` | - | - | - | - |
| `engine` | - | - | - | - |
| `html` | - | - | - | - |
| `id` | - | - | - | - |
| `metadata` | - | - | - | - |
| `object` | - | - | - | - |
| `published_version` | - | - | Yes | - |
| `required_vars` | - | - | - | - |
| `versions` | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Template.create({
  "id" => "example_id", # String
  "html" => "example_html", # String
  "published_version" => "example_published_version", # Object
  "versions" => [], # Array
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Template.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Template.load({ "id" => "template_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Template.remove({ "id" => "template_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateVersionEntity

```ruby
template_version = client.TemplateVersion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `String` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `Boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `String` | No | An internal description that identifies this resource. |
| `engine` | `String` | No | The engine used to combine HTML template with merge variables. |
| `html` | `String` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `String` | Yes | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `Hash` | No | Object representing the keys of every merge variable present in the template. |
| `object` | `String` | Yes | Value is resource type. |
| `required_vars` | `Array` | No | An array of required variables to be used in a template. |
| `suggest_json_editor` | `Boolean` | No | Used by frontend, true if the template uses advanced features. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `date_created` | - | - | - |
| `date_modified` | - | - | - |
| `deleted` | - | - | - |
| `description` | - | - | - |
| `engine` | - | - | - |
| `html` | - | - | - |
| `id` | - | - | - |
| `merge_variables` | - | - | - |
| `object` | Yes | Yes | - |
| `required_vars` | - | - | - |
| `suggest_json_editor` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.TemplateVersion.create({
  "id" => "example_id", # String
  "date_created" => "example_date_created", # String
  "date_modified" => "example_date_modified", # String
  "html" => "example_html", # String
  "object" => "example_object", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TemplateVersion.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TemplateVersion.load({ "id" => "template_version_id", "template_id" => "template_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateVersionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TemplateVersionDeletionEntity

```ruby
template_version_deletion = client.TemplateVersionDeletion
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.TemplateVersionDeletion.remove({ "template_id" => "template_id", "vrsn_id" => "vrsn_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TemplateVersionDeletionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UploadEntity

```ruby
upload = client.Upload
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `String` | Yes | Account ID that made the request |
| `bytesProcessed` | `Integer` | Yes | Number of bytes processed in your CSV |
| `campaignId` | `Object` | Yes |  |
| `dateCreated` | `String` | Yes | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `String` | Yes | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `Boolean` | Yes | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `Integer` | Yes | Number of mailpieces that failed to create |
| `failuresUrl` | `String` | No | Url where your campaign mailpiece failures can be retrieved |
| `id` | `String` | Yes | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `Hash` | No | test |
| `metadata` | `Hash` | Yes | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `String` | Yes | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `Hash` | Yes | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `String` | No | Filename of the upload |
| `requiredAddressColumnMapping` | `Hash` | Yes | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `String` | Yes | The URL for the generated export file. |
| `state` | `String` | Yes | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `Integer` | Yes | Total number of recipients for the campaign |
| `type` | `String` | Yes | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `String` | Yes | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `Integer` | Yes | Number of mailpieces that were successfully created |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Upload.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Upload.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Upload.load({ "id" => "upload_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Upload.remove({ "id" => "upload_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Upload.update({
  "id" => "upload_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UploadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UploadCreateExportEntity

```ruby
upload_create_export = client.UploadCreateExport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exportId` | `String` | Yes |  |
| `id` | `String` | No |  |
| `message` | `String` | Yes |  |
| `type` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.UploadCreateExport.create({
  "id" => "example_id", # String
  "exportId" => "example_exportId", # String
  "message" => "example_message", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UploadCreateExportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UsAutocompletionEntity

```ruby
us_autocompletion = client.UsAutocompletion
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_prefix` | `String` | Yes | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `String` | No | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `Boolean` | No | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `String` | No | Unique identifier prefixed with `us_auto_`. |
| `object` | `String` | No | Value is resource type. |
| `state` | `String` | No | An optional state input used to filter suggestions. |
| `suggestions` | `Array` | No | An array of objects representing suggested addresses. |
| `zip_code` | `String` | No | An optional ZIP Code input used to filter suggestions. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.UsAutocompletion.create({
  "address_prefix" => "example_address_prefix", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UsAutocompletionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UsVerificationEntity

```ruby
us_verification = client.UsVerification
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `Array` | Yes |  |
| `components` | `Hash` | Yes | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `String` | No | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `Hash` | Yes | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `Boolean` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `String` | No | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `String` | No | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `Hash` | Yes | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `String` | No | Value is resource type. |
| `primary_line` | `String` | No | The primary delivery line (usually the street address) of the address. |
| `recipient` | `String` | No | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `String` | No | The secondary delivery line of the address. |
| `urbanization` | `String` | No | Only present for addresses in Puerto Rico. |
| `valid_address` | `Boolean` | No | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.UsVerification.create({
  "addresses" => [], # Array
  "components" => {}, # Hash
  "deliverability_analysis" => {}, # Hash
  "errors" => true, # Boolean
  "lob_confidence_score" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UsVerificationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ZipEntity

```ruby
zip = client.Zip
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `zip_code` | `String` | Yes | A 5-digit ZIP code. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Zip.create({
  "zip_code" => "example_zip_code", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ZipEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = LobSDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
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

