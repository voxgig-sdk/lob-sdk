# Lob TypeScript SDK



The TypeScript SDK for the Lob API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Address()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lob-sdk/releases](https://github.com/voxgig-sdk/lob-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LobSDK } from '@voxgig-sdk/lob-sdk'

const client = new LobSDK({
  apikey: process.env.LOB_APIKEY,
  secret: process.env.LOB_SECRET,
})
```

### 2. List address records

`list()` resolves to an array of Address ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const addresss = await client.Address().list()

for (const address of addresss) {
  console.log(address)
}
```

### 3. Load a templateversion

TemplateVersion is nested under template, so provide the `template_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const templateversion = await client.TemplateVersion().load({
    template_id: 'example_template_id',
    id: 'example_id',
  })
  console.log(templateversion)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Address ENTITY (.data() for the record)
const created = await client.Address().create({
  address_city: 'example_address_city',
  address_country: 'example_address_country',
})

// Remove
await client.Address().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const addresss = await client.Address().list()
  console.log(addresss)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LobSDK.test()

const address = await client.Address().list()
// address is the entity, populated with mock response data
// — call address.data() for the record itself
console.log(address)
```

You can also use the instance method:

```ts
const client = new LobSDK({ apikey: '...', secret: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Address()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LobSDK({
  apikey: '...',
  secret: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LOB_TEST_LIVE=TRUE
LOB_APIKEY=<your-key>
LOB_SECRET=<your-secret>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### LobSDK

#### Constructor

```ts
new LobSDK(options?: {
  apikey?: string
  secret?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `secret` | `string` | API secret for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Address(data?)` | `AddressEntity` | Create an Address entity instance. |
| `BankAccount(data?)` | `BankAccountEntity` | Create a BankAccount entity instance. |
| `BankDeletion(data?)` | `BankDeletionEntity` | Create a BankDeletion entity instance. |
| `BillingGroup(data?)` | `BillingGroupEntity` | Create a BillingGroup entity instance. |
| `Booklet(data?)` | `BookletEntity` | Create a Booklet entity instance. |
| `Buckslip(data?)` | `BuckslipEntity` | Create a Buckslip entity instance. |
| `BuckslipOrder(data?)` | `BuckslipOrderEntity` | Create a BuckslipOrder entity instance. |
| `Campaign(data?)` | `CampaignEntity` | Create a Campaign entity instance. |
| `Card(data?)` | `CardEntity` | Create a Card entity instance. |
| `CardOrder(data?)` | `CardOrderEntity` | Create a CardOrder entity instance. |
| `Check(data?)` | `CheckEntity` | Create a Check entity instance. |
| `Creative(data?)` | `CreativeEntity` | Create a Creative entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `IdentityValidation(data?)` | `IdentityValidationEntity` | Create an IdentityValidation entity instance. |
| `IntlVerification(data?)` | `IntlVerificationEntity` | Create an IntlVerification entity instance. |
| `Letter(data?)` | `LetterEntity` | Create a Letter entity instance. |
| `Link(data?)` | `LinkEntity` | Create a Link entity instance. |
| `LobCreditsBalance(data?)` | `LobCreditsBalanceEntity` | Create a LobCreditsBalance entity instance. |
| `Postcard(data?)` | `PostcardEntity` | Create a Postcard entity instance. |
| `QrCode(data?)` | `QrCodeEntity` | Create a QrCode entity instance. |
| `ResourceProof(data?)` | `ResourceProofEntity` | Create a ResourceProof entity instance. |
| `Response(data?)` | `ResponseEntity` | Create a Response entity instance. |
| `ReverseGeocode(data?)` | `ReverseGeocodeEntity` | Create a ReverseGeocode entity instance. |
| `SelfMailer(data?)` | `SelfMailerEntity` | Create a SelfMailer entity instance. |
| `SnapPack(data?)` | `SnapPackEntity` | Create a SnapPack entity instance. |
| `Template(data?)` | `TemplateEntity` | Create a Template entity instance. |
| `TemplateVersion(data?)` | `TemplateVersionEntity` | Create a TemplateVersion entity instance. |
| `TemplateVersionDeletion(data?)` | `TemplateVersionDeletionEntity` | Create a TemplateVersionDeletion entity instance. |
| `Upload(data?)` | `UploadEntity` | Create an Upload entity instance. |
| `UploadCreateExport(data?)` | `UploadCreateExportEntity` | Create an UploadCreateExport entity instance. |
| `UsAutocompletion(data?)` | `UsAutocompletionEntity` | Create an UsAutocompletion entity instance. |
| `UsVerification(data?)` | `UsVerificationEntity` | Create an UsVerification entity instance. |
| `Zip(data?)` | `ZipEntity` | Create a Zip entity instance. |
| `tester(testopts?, sdkopts?)` | `LobSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LobSDK.test(testopts?, sdkopts?)` | `LobSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LobSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Address

| Field | Description |
| --- | --- |
| `address_city` |  |
| `address_country` |  |
| `address_line1` |  |
| `address_state` |  |
| `address_zip` |  |
| `company` |  |
| `count` | number of resources in a set |
| `data` | list of addresses |
| `date_created` |  |
| `date_modified` |  |
| `description` |  |
| `email` |  |
| `id` |  |
| `metadata` |  |
| `name` |  |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `phone` |  |
| `previous_url` | Url of previous page of items in list. |
| `total_count` | Indicates the total number of records. |

Operations: create, list, load, remove.

API path: `/addresses`

#### BankAccount

| Field | Description |
| --- | --- |
| `account_number` |  |
| `account_type` | The type of entity that holds the account. |
| `bank_name` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | The check template used for printing. |
| `city` | The city associated with your home bank account. |
| `count` | number of resources in a set |
| `data` | list of bank_accounts |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `fractional_routing_number` | The fractional routing number for your home bank account. |
| `id` |  |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | The type of microdeposit verification required for this bank account. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `routing_number` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | The signatory associated with your account. |
| `signature_url` |  |
| `state` | The state associated with your home bank account. |
| `total_count` | Indicates the total number of records. |
| `verified` | A bank account must be verified before a check can be created. |
| `zipcode` | The zipcode associated with your home bank account. |

Operations: create, list, load.

API path: `/bank_accounts/{bank_id}/verify`

#### BankDeletion

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/bank_accounts/{bank_id}`

#### BillingGroup

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | list of billing_groups |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | Description of the billing group. |
| `id` | Unique identifier prefixed with `bg_`. |
| `name` | Name of the billing group. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `total_count` | Indicates the total number of records. |

Operations: create, list, load.

API path: `/billing_groups/{bg_id}`

#### Booklet

| Field | Description |
| --- | --- |
| `carrier` |  |
| `count` | number of resources in a set |
| `data` | list of booklets |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `pages` |  |
| `previous_url` | Url of previous page of items in list. |
| `send_date` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` |  |
| `sla` |  |
| `source_material` |  |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` |  |
| `url` |  |
| `use_type` |  |

Operations: create, list, load, remove.

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
| `count` | number of resources in a set |
| `data` | list of buckslips |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | Description of the buckslip. |
| `finish` |  |
| `front_original_url` | The original URL of the front template. |
| `id` | Unique identifier prefixed with `bck_`. |
| `mode` |  |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `onhand_quantity` | The onhand quantity of buckslips. |
| `pending_quantity` | The pending quantity of buckslips. |
| `previous_url` | Url of previous page of items in list. |
| `projected_quantity` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | The raw URL of the buckslip. |
| `reorder_quantity` | The number of buckslips to be reordered. |
| `send_date` |  |
| `size` | The size of the buckslip |
| `status` |  |
| `stock` |  |
| `threshold_amount` | The threshold amount of the buckslip |
| `thumbnails` |  |
| `total_count` | Indicates the total number of records. |
| `url` | The signed link for the buckslip. |
| `weight` |  |

Operations: create, list, load, remove, update.

API path: `/buckslips`

#### BuckslipOrder

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | List of buckslip orders |
| `id` |  |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `quantity` | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | Indicates the total number of records. |

Operations: create, list.

API path: `/buckslips/{buckslip_id}/orders`

#### Campaign

| Field | Description |
| --- | --- |
| `auto_cancel_if_ncoa` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | A window, in minutes, within which the campaign can be canceled. |
| `count` | number of resources in a set |
| `creatives` | An array of creatives that have been associated with this campaign. |
| `data` | list of campaigns |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `id` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | Whether or not the campaign is still a draft. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | Name of the campaign. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `print_speed` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | How the campaign should be scheduled. |
| `send_date` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | Indicates the total number of records. |
| `uploads` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | The use type for each mailpiece. |

Operations: create, list, load, remove, update.

API path: `/campaigns/{cmp_id}/send`

#### Card

| Field | Description |
| --- | --- |
| `account_id` |  |
| `auto_reorder` | True if the cards should be auto-reordered. |
| `available_quantity` | The available quantity of cards. |
| `back_original_url` | The original URL of the back template. |
| `count` | number of resources in a set |
| `countries` |  |
| `data` | list of cards |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | Description of the card. |
| `front_original_url` | The original URL of the front template. |
| `id` | Unique identifier prefixed with `card_`. |
| `mode` |  |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `orientation` | The orientation of the card. |
| `pending_quantity` | The pending quantity of cards. |
| `previous_url` | Url of previous page of items in list. |
| `raw_url` | The raw URL of the card. |
| `reorder_quantity` | The number of cards to be reordered. |
| `send_date` |  |
| `size` | The size of the card |
| `status` |  |
| `threshold_amount` | The threshold amount of the card |
| `thumbnails` |  |
| `total_count` | Indicates the total number of records. |
| `url` | The signed link for the card. |

Operations: create, list, load, remove.

API path: `/cards/{card_id}`

#### CardOrder

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | List of card orders |
| `id` |  |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `quantity` | The quantity of cards in the order (minimum 10,000). |
| `total_count` | Indicates the total number of records. |

Operations: create, list.

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
| `count` | number of resources in a set |
| `data` | list of checks |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `send_date` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | TThe use type for each mailpiece. |

Operations: create, list, load, remove.

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

Operations: create, load, update.

API path: `/creatives`

#### Domain

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `created_at` | The date and time the domain was created. |
| `data` | List of domains. |
| `domain` | The registered domain/hostname. |
| `error_redirect_link` | URL to redirect customers if a short link is broken or inactive. |
| `id` | Unique identifier for a domain. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `status` | The configuration status of the domain. |
| `total_count` | Indicates the total number of records. |
| `updated_at` | The date and time the domain was last updated. |

Operations: create, list, load, remove.

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

Operations: create.

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

Operations: create.

API path: `/intl_verifications`

#### Letter

| Field | Description |
| --- | --- |
| `address_placement` |  |
| `cards` |  |
| `carrier` |  |
| `color` |  |
| `count` | number of resources in a set |
| `custom_envelope` |  |
| `data` | list of letters |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `perforated_page` |  |
| `previous_url` | Url of previous page of items in list. |
| `return_envelope` |  |
| `send_date` |  |
| `sla` |  |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` |  |
| `tracking_number` |  |
| `url` |  |
| `use_type` |  |

Operations: create, list, load, remove.

API path: `/letters`

#### Link

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | List of links |
| `domain` | The registered domain to be used for the short URL. |
| `id` |  |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `redirect_link` | The original target URL. |
| `slug` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | The title of the URL. |
| `total_count` | Indicates the total number of records. |

Operations: create, list, load, remove, update.

API path: `/links`

#### LobCreditsBalance

| Field | Description |
| --- | --- |
| `balance` | Account's current balance of Lob Credits. |

Operations: load.

API path: `/accounts`

#### Postcard

| Field | Description |
| --- | --- |
| `back_template_id` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `count` | number of resources in a set |
| `data` | list of postcards |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `send_date` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: create, list, load, remove.

API path: `/postcards`

#### QrCode

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | List of QR code analytics |
| `object` | Value is resource type. |
| `scanned_count` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | Indicates the total number of records. |

Operations: list.

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

Operations: create, load, update.

API path: `/resource_proofs`

#### Response

| Field | Description |
| --- | --- |
| `account_id` | Your Lob account id. |
| `brand_name` |  |
| `campaign_code` | The campaign code associated with the Informed Delivery campaign. |
| `count` | number of resources in a set |
| `data` | list of Informed Delivery campaigns |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Whether the resource has been deleted. |
| `end_date` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | The last serial number in the range of serial numbers for this campaign. |
| `id` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` |  |
| `mode` | The mode of the Informed Delivery campaign. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is the resource type. |
| `previous_url` | Url of previous page of items in list. |
| `quantity` |  |
| `representative_image_s3_link` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | A URL link to the campaigns ride along image. |
| `ride_along_url` |  |
| `service_request_number` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` |  |
| `start_serial` | The first serial number in the range of serial numbers for this campaign. |
| `status` |  |
| `total_count` | Indicates the total number of records. |
| `usps_campaign_id` | A numberical string up to 12 characters long. |
| `usps_title` |  |

Operations: create, list, load, update.

API path: `/informed_delivery_campaigns`

#### ReverseGeocode

| Field | Description |
| --- | --- |
| `addresses` | list of addresses |
| `id` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | Value is resource type. |

Operations: create.

API path: `/us_reverse_geocode_lookups`

#### SelfMailer

| Field | Description |
| --- | --- |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `count` | number of resources in a set |
| `data` | list of self_mailers |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `outside_template_id` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | Url of previous page of items in list. |
| `send_date` |  |
| `size` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` | An array of certified tracking events ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: create, list, load, remove.

API path: `/self_mailers`

#### SnapPack

| Field | Description |
| --- | --- |
| `campaign_id` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` |  |
| `color` | Set this key to `true` if you would like to print in color. |
| `count` | number of resources in a set |
| `data` | list of snap_packs |
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
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `outside_template_id` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | Url of previous page of items in list. |
| `send_date` |  |
| `size` |  |
| `sla` |  |
| `status` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` |  |
| `to` |  |
| `total_count` | Indicates the total number of records. |
| `tracking_events` | An array of tracking events ordered by ascending `time`. |
| `url` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | The use type for each mailpiece. |

Operations: create, list, load, remove.

API path: `/snap_packs`

#### Template

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | list of templates |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `engine` | The engine used to combine HTML template with merge variables. |
| `html` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `published_version` |  |
| `required_vars` | An array of required variables to be used in a template. |
| `total_count` | Indicates the total number of records. |
| `versions` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

Operations: create, list, load, remove.

API path: `/templates/{tmpl_id}`

#### TemplateVersion

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | list of template versions |
| `date_created` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | Only returned if the resource has been successfully deleted. |
| `description` | An internal description that identifies this resource. |
| `engine` | The engine used to combine HTML template with merge variables. |
| `html` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | Object representing the keys of every merge variable present in the template. |
| `next_url` | Url of next page of items in list. |
| `object` | Value is resource type. |
| `previous_url` | Url of previous page of items in list. |
| `required_vars` | An array of required variables to be used in a template. |
| `suggest_json_editor` | Used by frontend, true if the template uses advanced features. |
| `total_count` | Indicates the total number of records. |

Operations: create, list, load.

API path: `/templates/{tmpl_id}/versions/{vrsn_id}`

#### TemplateVersionDeletion

| Field | Description |
| --- | --- |

Operations: remove.

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

Operations: create, list, load, remove, update.

API path: `/uploads/{upl_id}/file`

#### UploadCreateExport

| Field | Description |
| --- | --- |
| `exportId` |  |
| `id` |  |
| `message` |  |
| `type` |  |

Operations: create.

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

Operations: create.

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

Operations: create.

API path: `/bulk/us_verifications`

#### Zip

| Field | Description |
| --- | --- |
| `zip_code` | A 5-digit ZIP code. |

Operations: create.

API path: `/us_zip_lookups`



## Entities


### Address

Create an instance: `const address = client.Address()`

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
| `address_state` | `string` |  |
| `address_zip` | `string` |  |
| `company` | `string` |  |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of addresses |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` |  |
| `name` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `phone` | `string` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: Load

```ts
const address = await client.Address().load({ id: 'address_id' })
```

#### Example: List

```ts
const addresss = await client.Address().list()
```

#### Example: Create

```ts
const address = await client.Address().create({
})
```


### BankAccount

Create an instance: `const bank_account = client.BankAccount()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of bank_accounts |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | The fractional routing number for your home bank account. |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | The type of microdeposit verification required for this bank account. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `routing_number` | `string` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | The signatory associated with your account. |
| `signature_url` | `any` |  |
| `state` | `string` | The state associated with your home bank account. |
| `total_count` | `number` | Indicates the total number of records. |
| `verified` | `boolean` | A bank account must be verified before a check can be created. |
| `zipcode` | `string` | The zipcode associated with your home bank account. |

#### Example: Load

```ts
const bank_account = await client.BankAccount().load({ id: 'bank_account_id' })
```

#### Example: List

```ts
const bank_accounts = await client.BankAccount().list()
```

#### Example: Create

```ts
const bank_account = await client.BankAccount().create({
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


### BankDeletion

Create an instance: `const bank_deletion = client.BankDeletion()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### BillingGroup

Create an instance: `const billing_group = client.BillingGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of billing_groups |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `string` | Description of the billing group. |
| `id` | `string` | Unique identifier prefixed with `bg_`. |
| `name` | `string` | Name of the billing group. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: Load

```ts
const billing_group = await client.BillingGroup().load({ id: 'billing_group_id' })
```

#### Example: List

```ts
const billing_groups = await client.BillingGroup().list()
```

#### Example: Create

```ts
const billing_group = await client.BillingGroup().create({
  id: 'example_id',
})
```


### Booklet

Create an instance: `const booklet = client.Booklet()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of booklets |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` |  |
| `from` | `Record<string, any>` |  |
| `fsc` | `boolean` |  |
| `id` | `string` |  |
| `mail_type` | `string` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `Record<string, any>` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `pages` | `number` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` |  |
| `sla` | `string` |  |
| `source_material` | `string` |  |
| `thumbnails` | `any[]` |  |
| `to` | `Record<string, any>` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```ts
const booklet = await client.Booklet().load({ id: 'booklet_id' })
```

#### Example: List

```ts
const booklets = await client.Booklet().list()
```

#### Example: Create

```ts
const booklet = await client.Booklet().create({
})
```


### Buckslip

Create an instance: `const buckslip = client.Buckslip()`

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
| `buckslip_orders` | `any[]` | An array of buckslip orders that are associated with the buckslip. |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of buckslips |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the buckslip. |
| `finish` | `string` |  |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `bck_`. |
| `mode` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `onhand_quantity` | `number` | The onhand quantity of buckslips. |
| `pending_quantity` | `number` | The pending quantity of buckslips. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `projected_quantity` | `number` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | The raw URL of the buckslip. |
| `reorder_quantity` | `number` | The number of buckslips to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the buckslip |
| `status` | `string` |  |
| `stock` | `string` |  |
| `threshold_amount` | `number` | The threshold amount of the buckslip |
| `thumbnails` | `any[]` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `url` | `string` | The signed link for the buckslip. |
| `weight` | `string` |  |

#### Example: Load

```ts
const buckslip = await client.Buckslip().load({ id: 'buckslip_id' })
```

#### Example: List

```ts
const buckslips = await client.Buckslip().list()
```

#### Example: Create

```ts
const buckslip = await client.Buckslip().create({
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


### BuckslipOrder

Create an instance: `const buckslip_order = client.BuckslipOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | List of buckslip orders |
| `id` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `number` | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: List

```ts
const buckslip_orders = await client.BuckslipOrder().list({ id: "example" })
```

#### Example: Create

```ts
const buckslip_order = await client.BuckslipOrder().create({
  id: 'example_id',
  quantity: 1,
})
```


### Campaign

Create an instance: `const campaign = client.Campaign()`

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
| `count` | `number` | number of resources in a set |
| `creatives` | `any[]` | An array of creatives that have been associated with this campaign. |
| `data` | `any[]` | list of campaigns |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `id` | `string` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `boolean` | Whether or not the campaign is still a draft. |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Name of the campaign. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `print_speed` | `string` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | How the campaign should be scheduled. |
| `send_date` | `string` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | `number` | Indicates the total number of records. |
| `uploads` | `any[]` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```ts
const campaign = await client.Campaign().load({ id: 'campaign_id' })
```

#### Example: List

```ts
const campaigns = await client.Campaign().list()
```

#### Example: Create

```ts
const campaign = await client.Campaign().create({
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


### Card

Create an instance: `const card = client.Card()`

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
| `count` | `number` | number of resources in a set |
| `countries` | `string` |  |
| `data` | `any[]` | list of cards |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | Description of the card. |
| `front_original_url` | `string` | The original URL of the front template. |
| `id` | `string` | Unique identifier prefixed with `card_`. |
| `mode` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `orientation` | `string` | The orientation of the card. |
| `pending_quantity` | `number` | The pending quantity of cards. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `raw_url` | `string` | The raw URL of the card. |
| `reorder_quantity` | `number` | The number of cards to be reordered. |
| `send_date` | `string` |  |
| `size` | `string` | The size of the card |
| `status` | `string` |  |
| `threshold_amount` | `number` | The threshold amount of the card |
| `thumbnails` | `any[]` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `url` | `string` | The signed link for the card. |

#### Example: Load

```ts
const card = await client.Card().load({ id: 'card_id' })
```

#### Example: List

```ts
const cards = await client.Card().list()
```

#### Example: Create

```ts
const card = await client.Card().create({
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


### CardOrder

Create an instance: `const card_order = client.CardOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | List of card orders |
| `id` | `string` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `number` | The quantity of cards in the order (minimum 10,000). |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: List

```ts
const card_orders = await client.CardOrder().list({ id: "example" })
```

#### Example: Create

```ts
const card_order = await client.CardOrder().create({
  id: 'example_id',
  quantity: 1,
})
```


### Check

Create an instance: `const check = client.Check()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of checks |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` |  |
| `from` | `any` |  |
| `id` | `string` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` |  |
| `memo` | `string` |  |
| `merge_variables` | `Record<string, any>` |  |
| `message` | `string` |  |
| `metadata` | `Record<string, any>` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` |  |
| `to` | `any` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | TThe use type for each mailpiece. |

#### Example: Load

```ts
const check = await client.Check().load({ id: 'check_id' })
```

#### Example: List

```ts
const checks = await client.Check().list()
```

#### Example: Create

```ts
const check = await client.Check().create({
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


### Creative

Create an instance: `const creative = client.Creative()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `any[]` | Array of campaigns associated with the creative ID |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `details` | `Record<string, any>` |  |
| `from` | `string` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Unique identifier prefixed with `crv_`. |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` |  |
| `template_preview_urls` | `Record<string, any>` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `any[]` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```ts
const creative = await client.Creative().load({ id: 'creative_id' })
```

#### Example: Create

```ts
const creative = await client.Creative().create({
  campaigns: [],
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  object: 'example_object',
  template_preview_urls: {},
  template_previews: [],
})
```


### Domain

Create an instance: `const domain = client.Domain()`

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
| `count` | `number` | number of resources in a set |
| `created_at` | `string` | The date and time the domain was created. |
| `data` | `any[]` | List of domains. |
| `domain` | `string` | The registered domain/hostname. |
| `error_redirect_link` | `string` | URL to redirect customers if a short link is broken or inactive. |
| `id` | `string` | Unique identifier for a domain. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `status` | `string` | The configuration status of the domain. |
| `total_count` | `number` | Indicates the total number of records. |
| `updated_at` | `string` | The date and time the domain was last updated. |

#### Example: Load

```ts
const domain = await client.Domain().load({ id: 'domain_id' })
```

#### Example: List

```ts
const domains = await client.Domain().list()
```

#### Example: Create

```ts
const domain = await client.Domain().create({
})
```


### IdentityValidation

Create an instance: `const identity_validation = client.IdentityValidation()`

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

```ts
const identity_validation = await client.IdentityValidation().create({
})
```


### IntlVerification

Create an instance: `const intl_verification = client.IntlVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `any[]` |  |
| `components` | `Record<string, any>` |  |
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

```ts
const intl_verification = await client.IntlVerification().create({
  addresses: [],
  errors: true,
})
```


### Letter

Create an instance: `const letter = client.Letter()`

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
| `cards` | `any[]` |  |
| `carrier` | `string` |  |
| `color` | `boolean` |  |
| `count` | `number` | number of resources in a set |
| `custom_envelope` | `string` |  |
| `data` | `any[]` | list of letters |
| `date_created` | `string` |  |
| `date_modified` | `string` |  |
| `description` | `string` |  |
| `double_sided` | `boolean` |  |
| `expected_delivery_date` | `string` |  |
| `extra_service` | `string` |  |
| `from` | `Record<string, any>` |  |
| `fsc` | `boolean` |  |
| `id` | `string` |  |
| `mail_type` | `string` |  |
| `merge_variables` | `Record<string, any>` |  |
| `metadata` | `Record<string, any>` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `perforated_page` | `string` |  |
| `previous_url` | `string` | Url of previous page of items in list. |
| `return_envelope` | `boolean` |  |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `thumbnails` | `any[]` |  |
| `to` | `Record<string, any>` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` |  |
| `tracking_number` | `string` |  |
| `url` | `string` |  |
| `use_type` | `string` |  |

#### Example: Load

```ts
const letter = await client.Letter().load({ id: 'letter_id' })
```

#### Example: List

```ts
const letters = await client.Letter().list()
```

#### Example: Create

```ts
const letter = await client.Letter().create({
})
```


### Link

Create an instance: `const link = client.Link()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | List of links |
| `domain` | `string` | The registered domain to be used for the short URL. |
| `id` | `string` |  |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `redirect_link` | `string` | The original target URL. |
| `slug` | `string` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | The title of the URL. |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: Load

```ts
const link = await client.Link().load({ id: 'link_id' })
```

#### Example: List

```ts
const links = await client.Link().list()
```

#### Example: Create

```ts
const link = await client.Link().create({
  redirect_link: 'example_redirect_link',
})
```


### LobCreditsBalance

Create an instance: `const lob_credits_balance = client.LobCreditsBalance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `number` | Account's current balance of Lob Credits. |

#### Example: Load

```ts
const lob_credits_balance = await client.LobCreditsBalance().load()
```


### Postcard

Create an instance: `const postcard = client.Postcard()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of postcards |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` |  |
| `from` | `any` |  |
| `front_template_id` | `string` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `boolean` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `psc_`. |
| `metadata` | `Record<string, any>` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` |  |
| `to` | `any` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```ts
const postcard = await client.Postcard().load({ id: 'postcard_id' })
```

#### Example: List

```ts
const postcards = await client.Postcard().list()
```

#### Example: Create

```ts
const postcard = await client.Postcard().create({
  back_template_id: 'example_back_template_id',
  carrier: 'example_carrier',
  front_template_id: 'example_front_template_id',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
})
```


### QrCode

Create an instance: `const qr_code = client.QrCode()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | List of QR code analytics |
| `object` | `string` | Value is resource type. |
| `scanned_count` | `number` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: List

```ts
const qr_codes = await client.QrCode().list()
```


### ResourceProof

Create an instance: `const resource_proof = client.ResourceProof()`

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
| `errors` | `any[]` | Errors encountered during processing. |
| `id` | `string` | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Value is resource type. |
| `resource_type` | `string` | The type of resource to generate a proof for. |
| `status` | `string` | The processing status of the resource proof. |
| `template_id` | `string` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `any[]` | Thumbnail images of the resource proof. |
| `url` | `string` | A URL to the resource proof PDF. |

#### Example: Load

```ts
const resource_proof = await client.ResourceProof().load({ id: 'resource_proof_id' })
```

#### Example: Create

```ts
const resource_proof = await client.ResourceProof().create({
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  id: 'example_id',
  object: 'example_object',
})
```


### Response

Create an instance: `const response = client.Response()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of Informed Delivery campaigns |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Whether the resource has been deleted. |
| `end_date` | `string` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `number` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `string` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `string` |  |
| `mode` | `string` | The mode of the Informed Delivery campaign. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is the resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `quantity` | `number` |  |
| `representative_image_s3_link` | `string` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `string` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `string` |  |
| `service_request_number` | `string` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `string` |  |
| `start_serial` | `number` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `string` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `usps_campaign_id` | `string` | A numberical string up to 12 characters long. |
| `usps_title` | `string` |  |

#### Example: Load

```ts
const response = await client.Response().load({ usps_campaign_id: 'usps_campaign_id' })
```

#### Example: List

```ts
const responses = await client.Response().list()
```

#### Example: Create

```ts
const response = await client.Response().create({
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


### ReverseGeocode

Create an instance: `const reverse_geocode = client.ReverseGeocode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `any[]` | list of addresses |
| `id` | `string` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `number` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `number` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | Value is resource type. |

#### Example: Create

```ts
const reverse_geocode = await client.ReverseGeocode().create({
  latitude: 1,
  longitude: 1,
})
```


### SelfMailer

Create an instance: `const self_mailer = client.SelfMailer()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of self_mailers |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` |  |
| `from` | `any` |  |
| `fsc` | `boolean` | This is in beta. |
| `id` | `string` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` |  |
| `merge_variables` | `Record<string, any>` |  |
| `metadata` | `Record<string, any>` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` |  |
| `to` | `any` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```ts
const self_mailer = await client.SelfMailer().load({ id: 'self_mailer_id' })
```

#### Example: List

```ts
const self_mailers = await client.SelfMailer().list()
```

#### Example: Create

```ts
const self_mailer = await client.SelfMailer().create({
  carrier: 'example_carrier',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
  use_type: 'example_use_type',
})
```


### SnapPack

Create an instance: `const snap_pack = client.SnapPack()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of snap_packs |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` |  |
| `expected_delivery_date` | `string` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `Record<string, any>` |  |
| `from` | `any` |  |
| `fsc` | `boolean` | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` |  |
| `merge_variables` | `Record<string, any>` |  |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `outside_template_id` | `string` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `send_date` | `string` |  |
| `size` | `string` |  |
| `sla` | `string` |  |
| `status` | `string` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `any[]` |  |
| `to` | `any` |  |
| `total_count` | `number` | Indicates the total number of records. |
| `tracking_events` | `any[]` | An array of tracking events ordered by ascending `time`. |
| `url` | `string` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `string` | The use type for each mailpiece. |

#### Example: Load

```ts
const snap_pack = await client.SnapPack().load({ id: 'snap_pack_id' })
```

#### Example: List

```ts
const snap_packs = await client.SnapPack().list()
```

#### Example: Create

```ts
const snap_pack = await client.SnapPack().create({
  carrier: 'example_carrier',
  id: 'example_id',
  to: 'example_to',
  url: 'example_url',
  use_type: 'example_use_type',
})
```


### Template

Create an instance: `const template = client.Template()`

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
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of templates |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `Record<string, any>` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `published_version` | `any` |  |
| `required_vars` | `any[]` | An array of required variables to be used in a template. |
| `total_count` | `number` | Indicates the total number of records. |
| `versions` | `any[]` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```ts
const template = await client.Template().load({ id: 'template_id' })
```

#### Example: List

```ts
const templates = await client.Template().list()
```

#### Example: Create

```ts
const template = await client.Template().create({
  id: 'example_id',
  html: 'example_html',
  published_version: 'example_published_version',
  versions: [],
})
```


### TemplateVersion

Create an instance: `const template_version = client.TemplateVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | number of resources in a set |
| `data` | `any[]` | list of template versions |
| `date_created` | `string` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `boolean` | Only returned if the resource has been successfully deleted. |
| `description` | `string` | An internal description that identifies this resource. |
| `engine` | `string` | The engine used to combine HTML template with merge variables. |
| `html` | `string` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `Record<string, any>` | Object representing the keys of every merge variable present in the template. |
| `next_url` | `string` | Url of next page of items in list. |
| `object` | `string` | Value is resource type. |
| `previous_url` | `string` | Url of previous page of items in list. |
| `required_vars` | `any[]` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `boolean` | Used by frontend, true if the template uses advanced features. |
| `total_count` | `number` | Indicates the total number of records. |

#### Example: Load

```ts
const template_version = await client.TemplateVersion().load({ id: 'template_version_id', template_id: 'template_id' })
```

#### Example: List

```ts
const template_versions = await client.TemplateVersion().list({ id: "example_id" })
```

#### Example: Create

```ts
const template_version = await client.TemplateVersion().create({
  id: 'example_id',
  date_created: 'example_date_created',
  date_modified: 'example_date_modified',
  html: 'example_html',
  object: 'example_object',
})
```


### TemplateVersionDeletion

Create an instance: `const template_version_deletion = client.TemplateVersionDeletion()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Upload

Create an instance: `const upload = client.Upload()`

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
| `mergeVariableColumnMapping` | `Record<string, any>` | test |
| `metadata` | `Record<string, any>` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `Record<string, any>` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | Filename of the upload |
| `requiredAddressColumnMapping` | `Record<string, any>` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | The URL for the generated export file. |
| `state` | `string` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `number` | Total number of recipients for the campaign |
| `type` | `string` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `number` | Number of mailpieces that were successfully created |

#### Example: Load

```ts
const upload = await client.Upload().load({ id: 'upload_id' })
```

#### Example: List

```ts
const uploads = await client.Upload().list()
```

#### Example: Create

```ts
const upload = await client.Upload().create({
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


### UploadCreateExport

Create an instance: `const upload_create_export = client.UploadCreateExport()`

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

```ts
const upload_create_export = await client.UploadCreateExport().create({
  id: 'example_id',
  exportId: 'example_exportId',
  message: 'example_message',
})
```


### UsAutocompletion

Create an instance: `const us_autocompletion = client.UsAutocompletion()`

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
| `suggestions` | `any[]` | An array of objects representing suggested addresses. |
| `zip_code` | `string` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```ts
const us_autocompletion = await client.UsAutocompletion().create({
  address_prefix: 'example_address_prefix',
})
```


### UsVerification

Create an instance: `const us_verification = client.UsVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `any[]` |  |
| `components` | `Record<string, any>` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `Record<string, any>` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `boolean` | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `Record<string, any>` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | Value is resource type. |
| `primary_line` | `string` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | The secondary delivery line of the address. |
| `urbanization` | `string` | Only present for addresses in Puerto Rico. |
| `valid_address` | `boolean` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```ts
const us_verification = await client.UsVerification().create({
  addresses: [],
  components: {},
  deliverability_analysis: {},
  errors: true,
  lob_confidence_score: {},
})
```


### Zip

Create an instance: `const zip = client.Zip()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `string` | A 5-digit ZIP code. |

#### Example: Create

```ts
const zip = await client.Zip().create({
  zip_code: 'example_zip_code',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
lob/
├── src/
│   ├── LobSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LobSDK } from '@voxgig-sdk/lob-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const address = client.Address()
await address.list()

// address.data() now returns the address data from the last `list`
// address.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
