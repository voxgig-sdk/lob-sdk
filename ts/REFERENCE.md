# Lob TypeScript SDK Reference

Complete API reference for the Lob TypeScript SDK.


## LobSDK

### Constructor

```ts
new LobSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.secret` | `string` | API secret for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LobSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LobSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LobSDK` instance in test mode.


### Instance Methods

#### `Address(data?: object)`

Create a new `Address` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AddressEntity` instance.

#### `BankAccount(data?: object)`

Create a new `BankAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BankAccountEntity` instance.

#### `BankDeletion(data?: object)`

Create a new `BankDeletion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BankDeletionEntity` instance.

#### `BillingGroup(data?: object)`

Create a new `BillingGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingGroupEntity` instance.

#### `Booklet(data?: object)`

Create a new `Booklet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BookletEntity` instance.

#### `Buckslip(data?: object)`

Create a new `Buckslip` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BuckslipEntity` instance.

#### `BuckslipOrder(data?: object)`

Create a new `BuckslipOrder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BuckslipOrderEntity` instance.

#### `Campaign(data?: object)`

Create a new `Campaign` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CampaignEntity` instance.

#### `Card(data?: object)`

Create a new `Card` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardEntity` instance.

#### `CardOrder(data?: object)`

Create a new `CardOrder` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CardOrderEntity` instance.

#### `Check(data?: object)`

Create a new `Check` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CheckEntity` instance.

#### `Creative(data?: object)`

Create a new `Creative` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreativeEntity` instance.

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `IdentityValidation(data?: object)`

Create a new `IdentityValidation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IdentityValidationEntity` instance.

#### `IntlVerification(data?: object)`

Create a new `IntlVerification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntlVerificationEntity` instance.

#### `Letter(data?: object)`

Create a new `Letter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LetterEntity` instance.

#### `Link(data?: object)`

Create a new `Link` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkEntity` instance.

#### `LobCreditsBalance(data?: object)`

Create a new `LobCreditsBalance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LobCreditsBalanceEntity` instance.

#### `Postcard(data?: object)`

Create a new `Postcard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PostcardEntity` instance.

#### `QrCode(data?: object)`

Create a new `QrCode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QrCodeEntity` instance.

#### `ResourceProof(data?: object)`

Create a new `ResourceProof` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResourceProofEntity` instance.

#### `Response(data?: object)`

Create a new `Response` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResponseEntity` instance.

#### `ReverseGeocode(data?: object)`

Create a new `ReverseGeocode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReverseGeocodeEntity` instance.

#### `SelfMailer(data?: object)`

Create a new `SelfMailer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SelfMailerEntity` instance.

#### `SnapPack(data?: object)`

Create a new `SnapPack` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SnapPackEntity` instance.

#### `Template(data?: object)`

Create a new `Template` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateEntity` instance.

#### `TemplateVersion(data?: object)`

Create a new `TemplateVersion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateVersionEntity` instance.

#### `TemplateVersionDeletion(data?: object)`

Create a new `TemplateVersionDeletion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TemplateVersionDeletionEntity` instance.

#### `Upload(data?: object)`

Create a new `Upload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UploadEntity` instance.

#### `UploadCreateExport(data?: object)`

Create a new `UploadCreateExport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UploadCreateExportEntity` instance.

#### `UsAutocompletion(data?: object)`

Create a new `UsAutocompletion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsAutocompletionEntity` instance.

#### `UsVerification(data?: object)`

Create a new `UsVerification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsVerificationEntity` instance.

#### `Zip(data?: object)`

Create a new `Zip` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ZipEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LobSDK.test()`.

**Returns:** `LobSDK` instance in test mode.


---

## AddressEntity

```ts
const address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_city` | `string` | No |  |
| `address_country` | `string` | No |  |
| `address_line1` | `string` | No |  |
| `address_line2` | `string` | No |  |
| `address_state` | `string` | No |  |
| `address_zip` | `string` | No |  |
| `company` | `string` | No |  |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `object` | `string` | No |  |
| `phone` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Address().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Address().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Address().load({ id: 'address_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Address().remove({ id: 'address_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AddressEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BankAccountEntity

```ts
const bank_account = client.BankAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `string` | Yes |  |
| `account_type` | `string` | Yes | The type of entity that holds the account. |
| `bank_name` | `string` | No | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `string` | No | The check template used for printing. |
| `city` | `string` | No | The city associated with your home bank account. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | No | The fractional routing number for your home bank account. |
| `id` | `string` | Yes |  |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | No | The type of microdeposit verification required for this bank account. |
| `object` | `string` | Yes | Value is resource type. |
| `routing_number` | `string` | Yes | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | Yes | The signatory associated with your account. |
| `signature_url` | `any` | No |  |
| `state` | `string` | No | The state associated with your home bank account. |
| `verified` | `boolean` | No | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | No | The zipcode associated with your home bank account. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `verify` | `/bank_accounts/{bank_id}/verify` | `client.BankAccount().create({ $action: 'verify', ... })` |

An action returns that action's OWN response, which is not necessarily a
BankAccount record — check the API definition for its shape.

```ts
const result = await client.BankAccount().create({
  $action: 'verify',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BankAccount().create({
  account_number: 'example_account_number',
  account_type: 'example_account_type',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  object: 'example_object',
  routing_number: 'example_routing_number',
  signatory: 'example_signatory',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BankAccount().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BankAccount().load({ id: 'bank_account_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BankAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BankDeletionEntity

```ts
const bank_deletion = client.BankDeletion()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.BankDeletion().remove({ bank_id: 'bank_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BankDeletionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingGroupEntity

```ts
const billing_group = client.BillingGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `string` | No | Description of the billing group. |
| `id` | `string` | No | Unique identifier prefixed with `bg_`. |
| `name` | `string` | No | Name of the billing group. |
| `object` | `string` | No | Value is resource type. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BillingGroup().create({
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BillingGroup().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BillingGroup().load({ id: 'billing_group_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BookletEntity

```ts
const booklet = client.Booklet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `carrier` | `string` | No |  |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` | No |  |
| `from` | `Record<string, any>` | No |  |
| `fsc` | `boolean` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `Record<string, any>` | No | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | No |  |
| `pages` | `number` | No |  |
| `send_date` | `string` | No | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `source_material` | `string` | No |  |
| `thumbnails` | `any[]` | No |  |
| `to` | `Record<string, any>` | No |  |
| `tracking_events` | `any[]` | No | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Booklet().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Booklet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Booklet().load({ id: 'booklet_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Booklet().remove({ id: 'booklet_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BookletEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BuckslipEntity

```ts
const buckslip = client.Buckslip()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `allocated_quantity` | `number` | Yes | The allocated quantity of buckslips. |
| `auto_reorder` | `boolean` | Yes | True if the buckslips should be auto-reordered. |
| `available_quantity` | `number` | Yes | The available quantity of buckslips. |
| `back_original_url` | `string` | Yes | The original URL of the back template. |
| `buckslip_orders` | `any[]` | Yes | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | Description of the buckslip. |
| `finish` | `string` | Yes |  |
| `front_original_url` | `string` | Yes | The original URL of the front template. |
| `id` | `string` | Yes | Unique identifier prefixed with `bck_`. |
| `mode` | `string` | No |  |
| `object` | `string` | Yes | Value is resource type. |
| `onhand_quantity` | `number` | Yes | The onhand quantity of buckslips. |
| `pending_quantity` | `number` | Yes | The pending quantity of buckslips. |
| `projected_quantity` | `number` | Yes | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | Yes | The raw URL of the buckslip. |
| `reorder_quantity` | `number` | Yes | The number of buckslips to be reordered. |
| `send_date` | `string` | No |  |
| `size` | `string` | No | The size of the buckslip |
| `status` | `string` | Yes |  |
| `stock` | `string` | Yes |  |
| `threshold_amount` | `number` | Yes | The threshold amount of the buckslip |
| `thumbnails` | `any[]` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Buckslip().create({
  allocated_quantity: 1,
  auto_reorder: true,
  available_quantity: 1,
  back_original_url: 'example_back_original_url',
  buckslip_orders: [],
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  finish: 'example_finish',
  front_original_url: 'example_front_original_url',
  id: 'example_id',
  object: 'example_object',
  onhand_quantity: 1,
  pending_quantity: 1,
  projected_quantity: 1,
  raw_url: 'example_raw_url',
  reorder_quantity: 1,
  status: 'example_status',
  stock: 'example_stock',
  threshold_amount: 1,
  thumbnails: [],
  url: 'example_url',
  weight: 'example_weight',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Buckslip().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Buckslip().load({ id: 'buckslip_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Buckslip().remove({ id: 'buckslip_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Buckslip().update({
  id: 'buckslip_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BuckslipEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BuckslipOrderEntity

```ts
const buckslip_order = client.BuckslipOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | `string` | No | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | `string` | No | The reason for cancellation. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | No | The fixed deadline for the buckslips to be printed. |
| `id` | `string` | No | Unique identifier prefixed with `bo_`. |
| `inventory` | `number` | No | The inventory of the buckslip order. |
| `object` | `string` | Yes | Value is resource type. |
| `quantity` | `number` | Yes | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `number` | No | The quantity of buckslips ordered. |
| `status` | `string` | No | The status of the buckslip order. |
| `unit_price` | `number` | No | The unit price for the buckslip order. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BuckslipOrder().create({
  id: 'example_id',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  object: 'example_object',
  quantity: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.BuckslipOrder().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BuckslipOrderEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CampaignEntity

```ts
const campaign = client.Campaign()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | `boolean` | No | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | No | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `number` | No | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `any[]` | Yes | An array of creatives that have been associated with this campaign. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `id` | `string` | Yes | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `boolean` | Yes | Whether or not the campaign is still a draft. |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Yes | Name of the campaign. |
| `object` | `string` | Yes | Value is resource type. |
| `print_speed` | `string` | No | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | Yes | How the campaign should be scheduled. |
| `send_date` | `string` | No | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | No | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `any[]` | Yes | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `send` | `/campaigns/{cmp_id}/send` | `client.Campaign().create({ $action: 'send', ... })` |

An action returns that action's OWN response, which is not necessarily a
Campaign record — check the API definition for its shape.

```ts
const result = await client.Campaign().create({
  $action: 'send',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Campaign().create({
  creatives: [],
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  is_draft: true,
  name: 'example_name',
  object: 'example_object',
  schedule_type: 'example_schedule_type',
  uploads: [],
  use_type: 'example_use_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Campaign().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Campaign().load({ id: 'campaign_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Campaign().remove({ id: 'campaign_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Campaign().update({
  id: 'campaign_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CampaignEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardEntity

```ts
const card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `auto_reorder` | `boolean` | Yes | True if the cards should be auto-reordered. |
| `available_quantity` | `number` | Yes | The available quantity of cards. |
| `back_original_url` | `string` | Yes | The original URL of the back template. |
| `countries` | `string` | No |  |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | Description of the card. |
| `front_original_url` | `string` | Yes | The original URL of the front template. |
| `id` | `string` | Yes | Unique identifier prefixed with `card_`. |
| `mode` | `string` | No |  |
| `object` | `string` | Yes | Value is resource type. |
| `orientation` | `string` | Yes | The orientation of the card. |
| `pending_quantity` | `number` | Yes | The pending quantity of cards. |
| `raw_url` | `string` | Yes | The raw URL of the card. |
| `reorder_quantity` | `number` | Yes | The number of cards to be reordered. |
| `send_date` | `string` | No |  |
| `size` | `string` | No | The size of the card |
| `status` | `string` | Yes |  |
| `threshold_amount` | `number` | Yes | The threshold amount of the card |
| `thumbnails` | `any[]` | Yes |  |
| `url` | `string` | Yes | The signed link for the card. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Card().create({
  id: 'example_id',
  auto_reorder: true,
  available_quantity: 1,
  back_original_url: 'example_back_original_url',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  front_original_url: 'example_front_original_url',
  object: 'example_object',
  orientation: 'example_orientation',
  pending_quantity: 1,
  raw_url: 'example_raw_url',
  reorder_quantity: 1,
  status: 'example_status',
  threshold_amount: 1,
  thumbnails: [],
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Card().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Card().load({ id: 'card_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Card().remove({ id: 'card_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CardOrderEntity

```ts
const card_order = client.CardOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | `string` | No | The reason for cancellation. |
| `card_id` | `string` | No | Unique identifier prefixed with `card_`. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `string` | No | The fixed deadline for the cards to be printed. |
| `id` | `string` | No | Unique identifier prefixed with `co_`. |
| `inventory` | `number` | No | The inventory of the card order. |
| `object` | `string` | Yes | Value is resource type. |
| `quantity` | `number` | Yes | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `number` | No | The quantity of cards ordered |
| `status` | `string` | No | The status of the card order. |
| `unit_price` | `number` | No | The unit price for the card order. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CardOrder().create({
  id: 'example_id',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  object: 'example_object',
  quantity: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CardOrder().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CheckEntity

```ts
const check = client.Check()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` | No |  |
| `attachment_template_version_id` | `string` | No |  |
| `bank_account` | `any` | Yes |  |
| `carrier` | `string` | Yes |  |
| `check_bottom_template_id` | `string` | No |  |
| `check_bottom_template_version_id` | `string` | No |  |
| `check_number` | `number` | No |  |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` | No |  |
| `from` | `any` | No |  |
| `id` | `string` | Yes | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` | No |  |
| `memo` | `string` | No |  |
| `merge_variables` | `Record<string, any>` | No |  |
| `message` | `string` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `object` | `string` | No | Value is resource type. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` | No |  |
| `to` | `any` | Yes |  |
| `tracking_events` | `any[]` | No | An array of tracking_event objects ordered by ascending `time`. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Check().create({
  amount: 1,
  bank_account: 'example_bank_account',
  carrier: 'example_carrier',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
  use_type: 'example_use_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Check().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Check().load({ id: 'check_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Check().remove({ id: 'check_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CheckEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreativeEntity

```ts
const creative = client.Creative()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaigns` | `any[]` | Yes | Array of campaigns associated with the creative ID |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `details` | `Record<string, any>` | No |  |
| `from` | `string` | No | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Yes | Unique identifier prefixed with `crv_`. |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No |  |
| `template_preview_urls` | `Record<string, any>` | Yes | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `any[]` | Yes | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Creative().create({
  campaigns: [],
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  object: 'example_object',
  template_preview_urls: {},
  template_previews: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Creative().load({ id: 'creative_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Creative().update({
  id: 'creative_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreativeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainEntity

```ts
const domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The date and time the domain was created. |
| `domain` | `string` | No | The registered domain/hostname. |
| `error_redirect_link` | `string` | No | URL to redirect customers if a short link is broken or inactive. |
| `id` | `string` | No | Unique identifier for a domain. |
| `status` | `string` | No | The configuration status of the domain. |
| `updated_at` | `string` | No | The date and time the domain was last updated. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Domain().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Domain().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Domain().load({ id: 'domain_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Domain().remove({ id: 'domain_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IdentityValidationEntity

```ts
const identity_validation = client.IdentityValidation()
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
| `score` | `number` | No |  |
| `secondary_line` | `string` | No |  |
| `urbanization` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.IdentityValidation().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IdentityValidationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntlVerificationEntity

```ts
const intl_verification = client.IntlVerification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `any[]` | Yes |  |
| `components` | `Record<string, any>` | No |  |
| `country` | `string` | No |  |
| `coverage` | `string` | No |  |
| `deliverability` | `string` | No |  |
| `errors` | `boolean` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | No |  |
| `last_line` | `string` | No |  |
| `object` | `string` | No |  |
| `primary_line` | `string` | No |  |
| `recipient` | `string` | No |  |
| `secondary_line` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.IntlVerification().create({
  addresses: [],
  errors: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntlVerificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LetterEntity

```ts
const letter = client.Letter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_placement` | `string` | No |  |
| `cards` | `any[]` | No |  |
| `carrier` | `string` | No |  |
| `color` | `boolean` | No |  |
| `custom_envelope` | `string` | No |  |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `double_sided` | `boolean` | No |  |
| `expected_delivery_date` | `string` | No |  |
| `extra_service` | `string` | No |  |
| `from` | `Record<string, any>` | No |  |
| `fsc` | `boolean` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No |  |
| `merge_variables` | `Record<string, any>` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `object` | `string` | No |  |
| `perforated_page` | `string` | No |  |
| `return_envelope` | `boolean` | No |  |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `template_id` | `string` | No |  |
| `template_version_id` | `string` | No |  |
| `thumbnails` | `any[]` | No |  |
| `to` | `Record<string, any>` | No |  |
| `tracking_events` | `any[]` | No |  |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Letter().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Letter().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Letter().load({ id: 'letter_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Letter().remove({ id: 'letter_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LetterEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkEntity

```ts
const link = client.Link()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The date and time the link was created. |
| `domain` | `string` | No | The registered domain to be used for the short URL. |
| `domain_id` | `string` | No | A unique identifier for the registered domain. |
| `id` | `string` | No | Unique identifier prefixed with `lnk_`. |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `string` | No | The original target URL. |
| `short_link` | `string` | No | The shortened URL for the associated original URL. |
| `slug` | `string` | No | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | No | The title of the URL. |
| `updated_at` | `string` | No | The date and time the link was last updated. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Link().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Link().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Link().load({ id: 'link_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Link().remove({ id: 'link_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Link().update({
  id: 'link_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LobCreditsBalanceEntity

```ts
const lob_credits_balance = client.LobCreditsBalance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `number` | Yes | Account's current balance of Lob Credits. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.LobCreditsBalance().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LobCreditsBalanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PostcardEntity

```ts
const postcard = client.Postcard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `back_template_id` | `string` | Yes | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` | No |  |
| `from` | `any` | No |  |
| `front_template_id` | `string` | Yes | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `boolean` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `psc_`. |
| `metadata` | `Record<string, any>` | No |  |
| `object` | `string` | No | Value is resource type. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` | No |  |
| `to` | `any` | Yes |  |
| `tracking_events` | `any[]` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | No | The use type for each mailpiece. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Postcard().create({
  back_template_id: 'example_back_template_id',
  carrier: 'example_carrier',
  front_template_id: 'example_front_template_id',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Postcard().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Postcard().load({ id: 'postcard_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Postcard().remove({ id: 'postcard_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PostcardEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QrCodeEntity

```ts
const qr_code = client.QrCode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `number` | No | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `string` | No | Unique identifier for each mail piece. |
| `scans` | `any[]` | No | Detailed scan information associated with each mail piece. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.QrCode().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QrCodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResourceProofEntity

```ts
const resource_proof = client.ResourceProof()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `any[]` | No | Errors encountered during processing. |
| `id` | `string` | Yes | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No | The type of resource to generate a proof for. |
| `status` | `string` | No | The processing status of the resource proof. |
| `template_id` | `string` | No | The template ID associated with the resource proof, if any. |
| `thumbnails` | `any[]` | No | Thumbnail images of the resource proof. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ResourceProof().create({
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  object: 'example_object',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ResourceProof().load({ id: 'resource_proof_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ResourceProof().update({
  id: 'resource_proof_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResourceProofEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResponseEntity

```ts
const response = client.Response()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Your Lob account id. |
| `brand_name` | `string` | No |  |
| `campaign_code` | `string` | Yes | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Yes | Whether the resource has been deleted. |
| `end_date` | `string` | Yes | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `number` | Yes | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Yes | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` | No |  |
| `mode` | `string` | Yes | The mode of the Informed Delivery campaign. |
| `object` | `string` | Yes | Value is the resource type. |
| `quantity` | `number` | No |  |
| `representative_image_s3_link` | `string` | Yes | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | Yes | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` | No |  |
| `service_request_number` | `string` | Yes | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` | No |  |
| `start_serial` | `number` | Yes | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` | No |  |
| `usps_campaign_id` | `string` | Yes | A numberical string up to 12 characters long. |
| `usps_title` | `string` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Response().create({
  account_id: 'example_account_id',
  campaign_code: 'example_campaign_code',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  deleted: true,
  end_date: 'example_end_date',
  end_serial: 1,
  id: 'example_id',
  mode: 'example_mode',
  object: 'example_object',
  representative_image_s3_link: 'example_representative_image_s3_link',
  ride_along_image_s3_link: 'example_ride_along_image_s3_link',
  service_request_number: 'example_service_request_number',
  start_serial: 1,
  usps_campaign_id: 'example_usps_campaign_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Response().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Response().load({ usps_campaign_id: 'usps_campaign_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Response().update({
  usps_campaign_id: 'usps_campaign_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResponseEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReverseGeocodeEntity

```ts
const reverse_geocode = client.ReverseGeocode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `any[]` | No | list of addresses |
| `id` | `string` | No | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `number` | Yes | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `number` | Yes | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | No | Value is resource type. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ReverseGeocode().create({
  latitude: 1,
  longitude: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReverseGeocodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SelfMailerEntity

```ts
const self_mailer = client.SelfMailer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` | No |  |
| `from` | `any` | No |  |
| `fsc` | `boolean` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `Record<string, any>` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` | No |  |
| `to` | `any` | Yes |  |
| `tracking_events` | `any[]` | No | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SelfMailer().create({
  carrier: 'example_carrier',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
  use_type: 'example_use_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SelfMailer().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SelfMailer().load({ id: 'self_mailer_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SelfMailer().remove({ id: 'self_mailer_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SelfMailerEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SnapPackEntity

```ts
const snap_pack = client.SnapPack()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `color` | `boolean` | No | Set this key to `true` if you would like to print in color. |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` | No |  |
| `from` | `any` | No |  |
| `fsc` | `boolean` | No | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Yes | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `Record<string, any>` | No |  |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` | No |  |
| `to` | `any` | Yes |  |
| `tracking_events` | `any[]` | No | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | Yes | The use type for each mailpiece. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SnapPack().create({
  carrier: 'example_carrier',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
  use_type: 'example_use_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SnapPack().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SnapPack().load({ id: 'snap_pack_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.SnapPack().remove({ id: 'snap_pack_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SnapPackEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateEntity

```ts
const template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `Record<string, any>` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | No | Value is resource type. |
| `published_version` | `any` | Yes |  |
| `required_vars` | `any[]` | No | An array of required variables to be used in a template. |
| `versions` | `any[]` | Yes | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Template().create({
  id: 'example_id',
  html: 'example_html',
  published_version: 'example_published_version',
  versions: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Template().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Template().load({ id: 'template_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Template().remove({ id: 'template_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateVersionEntity

```ts
const template_version = client.TemplateVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `Record<string, any>` | No | Object representing the keys of every merge variable present in the template. |
| `object` | `string` | Yes | Value is resource type. |
| `required_vars` | `any[]` | No | An array of required variables to be used in a template. |
| `suggest_json_editor` | `boolean` | No | Used by frontend, true if the template uses advanced features. |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.TemplateVersion().create({
  id: 'example_id',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  html: 'example_html',
  object: 'example_object',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TemplateVersion().list({ id: "example_id" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TemplateVersion().load({ id: 'template_version_id', template_id: 'template_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateVersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TemplateVersionDeletionEntity

```ts
const template_version_deletion = client.TemplateVersionDeletion()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.TemplateVersionDeletion().remove({ template_id: 'template_id', vrsn_id: 'vrsn_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TemplateVersionDeletionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UploadEntity

```ts
const upload = client.Upload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes | Account ID that made the request |
| `bytesProcessed` | `number` | Yes | Number of bytes processed in your CSV |
| `campaignId` | `any` | Yes |  |
| `dateCreated` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `boolean` | Yes | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `number` | Yes | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | No | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Yes | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `Record<string, any>` | No | test |
| `metadata` | `Record<string, any>` | Yes | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | Yes | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `Record<string, any>` | Yes | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | No | Filename of the upload |
| `requiredAddressColumnMapping` | `Record<string, any>` | Yes | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | Yes | The URL for the generated export file. |
| `state` | `string` | Yes | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `number` | Yes | Total number of recipients for the campaign |
| `type` | `string` | Yes | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Yes | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `number` | Yes | Number of mailpieces that were successfully created |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `file` | `/uploads/{upl_id}/file` | `client.Upload().create({ $action: 'file', ... })` |
| `report` | `/uploads/{upl_id}/report` | `client.Upload().list({ $action: 'report', ... })` |

An action returns that action's OWN response, which is not necessarily a
Upload record — check the API definition for its shape.

```ts
const result = await client.Upload().create({
  $action: 'file',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Upload().create({
  accountId: 'example_accountId',
  bytesProcessed: 1,
  campaignId: 'example_campaignId',
  dateCreated: 'example_dateCreated',
  dateModified: 'example_dateModified',
  deleted: true,
  failedMailpieces: 1,
  id: 'example_id',
  metadata: {},
  mode: 'example_mode',
  optionalAddressColumnMapping: {},
  requiredAddressColumnMapping: {},
  s3Url: 'example_s3Url',
  state: 'example_state',
  totalMailpieces: 1,
  type: 'example_type',
  uploadId: 'example_uploadId',
  validatedMailpieces: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Upload().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Upload().load({ id: 'upload_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Upload().remove({ id: 'upload_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Upload().update({
  id: 'upload_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UploadEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UploadCreateExportEntity

```ts
const upload_create_export = client.UploadCreateExport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exportId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UploadCreateExport().create({
  id: 'example_id',
  exportId: 'example_exportId',
  message: 'example_message',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UploadCreateExportEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsAutocompletionEntity

```ts
const us_autocompletion = client.UsAutocompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_prefix` | `string` | Yes | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `string` | No | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `boolean` | No | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `string` | No | Unique identifier prefixed with `us_auto_`. |
| `object` | `string` | No | Value is resource type. |
| `state` | `string` | No | An optional state input used to filter suggestions. |
| `suggestions` | `any[]` | No | An array of objects representing suggested addresses. |
| `zip_code` | `string` | No | An optional ZIP Code input used to filter suggestions. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UsAutocompletion().create({
  address_prefix: 'example_address_prefix',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsAutocompletionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsVerificationEntity

```ts
const us_verification = client.UsVerification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `any[]` | Yes |  |
| `components` | `Record<string, any>` | Yes | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | No | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `Record<string, any>` | Yes | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `boolean` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | No | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | No | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `Record<string, any>` | Yes | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | No | Value is resource type. |
| `primary_line` | `string` | No | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | No | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | No | The secondary delivery line of the address. |
| `urbanization` | `string` | No | Only present for addresses in Puerto Rico. |
| `valid_address` | `boolean` | No | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.UsVerification().create({
  addresses: [],
  components: {},
  deliverability_analysis: {},
  errors: true,
  lob_confidence_score: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsVerificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ZipEntity

```ts
const zip = client.Zip()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `zip_code` | `string` | Yes | A 5-digit ZIP code. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Zip().create({
  zip_code: 'example_zip_code',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ZipEntity` instance with the same client and
options.

#### `client()`

Return the parent `LobSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new LobSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

