# Lob Python SDK



The Python SDK for the Lob API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Address()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/lob-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from lob_sdk import LobSDK

client = LobSDK({
    "apikey": os.environ.get("LOB_APIKEY"),
})
```

### 2. List address records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    addresss = client.Address().list()
    for address in addresss:
        print(address)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a templateversion

TemplateVersion is nested under template, so provide the `template_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    templateversion = client.TemplateVersion().load({"template_id": "example_template_id", "id": "example_id"})
    print(templateversion)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Address().create({"address_city": "example_address_city", "address_country": "example_address_country"})

# Remove
client.Address().remove({"id": created.data_get()["id"]})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    addresss = client.Address().list()
    print(addresss)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LobSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
address = client.Address().list()
# address contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LobSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### LobSDK

```python
from lob_sdk import LobSDK

client = LobSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LobSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LobSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Operations: Create, List, Load.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List.

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

Operations: Create, List, Load, Remove, Update.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove.

API path: `/postcards`

#### QrCode

| Field | Description |
| --- | --- |
| `count` | number of resources in a set |
| `data` | List of QR code analytics |
| `object` | Value is resource type. |
| `scanned_count` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | Indicates the total number of records. |

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove.

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

Operations: Create, List, Load, Remove.

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

Create an instance: `address = client.Address()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_city` | `str` |  |
| `address_country` | `str` |  |
| `address_line1` | `str` |  |
| `address_state` | `str` |  |
| `address_zip` | `str` |  |
| `company` | `str` |  |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of addresses |
| `date_created` | `str` |  |
| `date_modified` | `str` |  |
| `description` | `str` |  |
| `email` | `str` |  |
| `id` | `str` |  |
| `metadata` | `dict` |  |
| `name` | `str` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `phone` | `str` |  |
| `previous_url` | `str` | Url of previous page of items in list. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```python
address = client.Address().load({"id": "address_id"})
```

#### Example: List

```python
addresss = client.Address().list()
```

#### Example: Create

```python
address = client.Address().create({
})
```


### BankAccount

Create an instance: `bank_account = client.BankAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_number` | `str` |  |
| `account_type` | `str` | The type of entity that holds the account. |
| `bank_name` | `str` | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `str` | The check template used for printing. |
| `city` | `str` | The city associated with your home bank account. |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of bank_accounts |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | An internal description that identifies this resource. |
| `fractional_routing_number` | `str` | The fractional routing number for your home bank account. |
| `id` | `str` |  |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `str` | The type of microdeposit verification required for this bank account. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `routing_number` | `str` | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `str` | The signatory associated with your account. |
| `signature_url` | `Any` |  |
| `state` | `str` | The state associated with your home bank account. |
| `total_count` | `int` | Indicates the total number of records. |
| `verified` | `bool` | A bank account must be verified before a check can be created. |
| `zipcode` | `str` | The zipcode associated with your home bank account. |

#### Example: Load

```python
bank_account = client.BankAccount().load({"id": "bank_account_id"})
```

#### Example: List

```python
bank_accounts = client.BankAccount().list()
```

#### Example: Create

```python
bank_account = client.BankAccount().create({
    "account_number": "example_account_number",  # str
    "account_type": "example_account_type",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
    "routing_number": "example_routing_number",  # str
    "signatory": "example_signatory",  # str
})
```


### BankDeletion

Create an instance: `bank_deletion = client.BankDeletion()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### BillingGroup

Create an instance: `billing_group = client.BillingGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of billing_groups |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `str` | Description of the billing group. |
| `id` | `str` | Unique identifier prefixed with `bg_`. |
| `name` | `str` | Name of the billing group. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```python
billing_group = client.BillingGroup().load({"id": "billing_group_id"})
```

#### Example: List

```python
billing_groups = client.BillingGroup().list()
```

#### Example: Create

```python
billing_group = client.BillingGroup().create({
    "id": "example_id",  # str
})
```


### Booklet

Create an instance: `booklet = client.Booklet()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `carrier` | `str` |  |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of booklets |
| `date_created` | `str` |  |
| `date_modified` | `str` |  |
| `description` | `str` | An internal description that identifies this resource. |
| `expected_delivery_date` | `str` |  |
| `from` | `dict` |  |
| `fsc` | `bool` |  |
| `id` | `str` |  |
| `mail_type` | `str` | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `dict` | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `pages` | `int` |  |
| `previous_url` | `str` | Url of previous page of items in list. |
| `send_date` | `str` | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `str` |  |
| `sla` | `str` |  |
| `source_material` | `str` |  |
| `thumbnails` | `list` |  |
| `to` | `dict` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `str` |  |
| `url` | `str` |  |
| `use_type` | `str` |  |

#### Example: Load

```python
booklet = client.Booklet().load({"id": "booklet_id"})
```

#### Example: List

```python
booklets = client.Booklet().list()
```

#### Example: Create

```python
booklet = client.Booklet().create({
})
```


### Buckslip

Create an instance: `buckslip = client.Buckslip()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` |  |
| `allocated_quantity` | `float` | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float` | The available quantity of buckslips. |
| `back_original_url` | `str` | The original URL of the back template. |
| `buckslip_orders` | `list` | An array of buckslip orders that are associated with the buckslip. |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of buckslips |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | Description of the buckslip. |
| `finish` | `str` |  |
| `front_original_url` | `str` | The original URL of the front template. |
| `id` | `str` | Unique identifier prefixed with `bck_`. |
| `mode` | `str` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `onhand_quantity` | `float` | The onhand quantity of buckslips. |
| `pending_quantity` | `float` | The pending quantity of buckslips. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `projected_quantity` | `float` | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `str` | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | The number of buckslips to be reordered. |
| `send_date` | `str` |  |
| `size` | `str` | The size of the buckslip |
| `status` | `str` |  |
| `stock` | `str` |  |
| `threshold_amount` | `int` | The threshold amount of the buckslip |
| `thumbnails` | `list` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `url` | `str` | The signed link for the buckslip. |
| `weight` | `str` |  |

#### Example: Load

```python
buckslip = client.Buckslip().load({"id": "buckslip_id"})
```

#### Example: List

```python
buckslips = client.Buckslip().list()
```

#### Example: Create

```python
buckslip = client.Buckslip().create({
    "allocated_quantity": 1,  # float
    "auto_reorder": True,  # bool
    "available_quantity": 1,  # float
    "back_original_url": "example_back_original_url",  # str
    "buckslip_orders": [],  # list
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "finish": "example_finish",  # str
    "front_original_url": "example_front_original_url",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
    "onhand_quantity": 1,  # float
    "pending_quantity": 1,  # float
    "projected_quantity": 1,  # float
    "raw_url": "example_raw_url",  # str
    "reorder_quantity": 1,  # int
    "status": "example_status",  # str
    "stock": "example_stock",  # str
    "threshold_amount": 1,  # int
    "thumbnails": [],  # list
    "url": "example_url",  # str
    "weight": "example_weight",  # str
})
```


### BuckslipOrder

Create an instance: `buckslip_order = client.BuckslipOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | List of buckslip orders |
| `id` | `str` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `quantity` | `int` | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```python
buckslip_orders = client.BuckslipOrder().list({"id": "example"})
```

#### Example: Create

```python
buckslip_order = client.BuckslipOrder().create({
    "id": "example_id",  # str
    "quantity": 1,  # int
})
```


### Campaign

Create an instance: `campaign = client.Campaign()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_cancel_if_ncoa` | `bool` | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `str` | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | A window, in minutes, within which the campaign can be canceled. |
| `count` | `int` | number of resources in a set |
| `creatives` | `list` | An array of creatives that have been associated with this campaign. |
| `data` | `list` | list of campaigns |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | An internal description that identifies this resource. |
| `id` | `str` | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Whether or not the campaign is still a draft. |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `str` | Name of the campaign. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `print_speed` | `str` | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `str` | How the campaign should be scheduled. |
| `send_date` | `str` | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `str` | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | `int` | Indicates the total number of records. |
| `uploads` | `list` | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `str` | The use type for each mailpiece. |

#### Example: Load

```python
campaign = client.Campaign().load({"id": "campaign_id"})
```

#### Example: List

```python
campaigns = client.Campaign().list()
```

#### Example: Create

```python
campaign = client.Campaign().create({
    "creatives": [],  # list
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "is_draft": True,  # bool
    "name": "example_name",  # str
    "object": "example_object",  # str
    "schedule_type": "example_schedule_type",  # str
    "uploads": [],  # list
    "use_type": "example_use_type",  # str
})
```


### Card

Create an instance: `card = client.Card()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` |  |
| `auto_reorder` | `bool` | True if the cards should be auto-reordered. |
| `available_quantity` | `int` | The available quantity of cards. |
| `back_original_url` | `str` | The original URL of the back template. |
| `count` | `int` | number of resources in a set |
| `countries` | `str` |  |
| `data` | `list` | list of cards |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | Description of the card. |
| `front_original_url` | `str` | The original URL of the front template. |
| `id` | `str` | Unique identifier prefixed with `card_`. |
| `mode` | `str` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `orientation` | `str` | The orientation of the card. |
| `pending_quantity` | `int` | The pending quantity of cards. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `raw_url` | `str` | The raw URL of the card. |
| `reorder_quantity` | `int` | The number of cards to be reordered. |
| `send_date` | `str` |  |
| `size` | `str` | The size of the card |
| `status` | `str` |  |
| `threshold_amount` | `int` | The threshold amount of the card |
| `thumbnails` | `list` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `url` | `str` | The signed link for the card. |

#### Example: Load

```python
card = client.Card().load({"id": "card_id"})
```

#### Example: List

```python
cards = client.Card().list()
```

#### Example: Create

```python
card = client.Card().create({
    "id": "example_id",  # str
    "auto_reorder": True,  # bool
    "available_quantity": 1,  # int
    "back_original_url": "example_back_original_url",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "front_original_url": "example_front_original_url",  # str
    "object": "example_object",  # str
    "orientation": "example_orientation",  # str
    "pending_quantity": 1,  # int
    "raw_url": "example_raw_url",  # str
    "reorder_quantity": 1,  # int
    "status": "example_status",  # str
    "threshold_amount": 1,  # int
    "thumbnails": [],  # list
    "url": "example_url",  # str
})
```


### CardOrder

Create an instance: `card_order = client.CardOrder()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | List of card orders |
| `id` | `str` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `quantity` | `int` | The quantity of cards in the order (minimum 10,000). |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```python
card_orders = client.CardOrder().list({"id": "example"})
```

#### Example: Create

```python
card_order = client.CardOrder().create({
    "id": "example_id",  # str
    "quantity": 1,  # int
})
```


### Check

Create an instance: `check = client.Check()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `str` |  |
| `attachment_template_version_id` | `str` |  |
| `bank_account` | `Any` |  |
| `carrier` | `str` |  |
| `check_bottom_template_id` | `str` |  |
| `check_bottom_template_version_id` | `str` |  |
| `check_number` | `int` |  |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of checks |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` |  |
| `expected_delivery_date` | `str` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` |  |
| `from` | `Any` |  |
| `id` | `str` | Unique identifier prefixed with `chk_`. |
| `mail_type` | `str` |  |
| `memo` | `str` |  |
| `merge_variables` | `dict` |  |
| `message` | `str` |  |
| `metadata` | `dict` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `send_date` | `str` |  |
| `sla` | `str` |  |
| `status` | `str` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` |  |
| `to` | `Any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `str` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | TThe use type for each mailpiece. |

#### Example: Load

```python
check = client.Check().load({"id": "check_id"})
```

#### Example: List

```python
checks = client.Check().list()
```

#### Example: Create

```python
check = client.Check().create({
    "amount": 1,  # float
    "bank_account": "example_bank_account",  # Any
    "carrier": "example_carrier",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
    "use_type": "example_use_type",  # str
})
```


### Creative

Create an instance: `creative = client.Creative()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaigns` | `list` | Array of campaigns associated with the creative ID |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | An internal description that identifies this resource. |
| `details` | `dict` |  |
| `from` | `str` | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `str` | Unique identifier prefixed with `crv_`. |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `str` | Value is resource type. |
| `resource_type` | `str` |  |
| `template_preview_urls` | `dict` | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `list` | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

#### Example: Load

```python
creative = client.Creative().load({"id": "creative_id"})
```

#### Example: Create

```python
creative = client.Creative().create({
    "campaigns": [],  # list
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
    "template_preview_urls": {},  # dict
    "template_previews": [],  # list
})
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `created_at` | `str` | The date and time the domain was created. |
| `data` | `list` | List of domains. |
| `domain` | `str` | The registered domain/hostname. |
| `error_redirect_link` | `str` | URL to redirect customers if a short link is broken or inactive. |
| `id` | `str` | Unique identifier for a domain. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `status` | `str` | The configuration status of the domain. |
| `total_count` | `int` | Indicates the total number of records. |
| `updated_at` | `str` | The date and time the domain was last updated. |

#### Example: Load

```python
domain = client.Domain().load({"id": "domain_id"})
```

#### Example: List

```python
domains = client.Domain().list()
```

#### Example: Create

```python
domain = client.Domain().create({
})
```


### IdentityValidation

Create an instance: `identity_validation = client.IdentityValidation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confidence` | `str` |  |
| `id` | `str` |  |
| `last_line` | `str` |  |
| `object` | `str` |  |
| `primary_line` | `str` |  |
| `recipient` | `str` |  |
| `score` | `int` |  |
| `secondary_line` | `str` |  |
| `urbanization` | `str` |  |

#### Example: Create

```python
identity_validation = client.IdentityValidation().create({
})
```


### IntlVerification

Create an instance: `intl_verification = client.IntlVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `list` |  |
| `components` | `dict` |  |
| `country` | `str` |  |
| `coverage` | `str` |  |
| `deliverability` | `str` |  |
| `errors` | `bool` | Indicates whether any errors occurred during the verification process. |
| `id` | `str` |  |
| `last_line` | `str` |  |
| `object` | `str` |  |
| `primary_line` | `str` |  |
| `recipient` | `str` |  |
| `secondary_line` | `str` |  |
| `status` | `str` |  |

#### Example: Create

```python
intl_verification = client.IntlVerification().create({
    "addresses": [],  # list
    "errors": True,  # bool
})
```


### Letter

Create an instance: `letter = client.Letter()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_placement` | `str` |  |
| `cards` | `list` |  |
| `carrier` | `str` |  |
| `color` | `bool` |  |
| `count` | `int` | number of resources in a set |
| `custom_envelope` | `str` |  |
| `data` | `list` | list of letters |
| `date_created` | `str` |  |
| `date_modified` | `str` |  |
| `description` | `str` |  |
| `double_sided` | `bool` |  |
| `expected_delivery_date` | `str` |  |
| `extra_service` | `str` |  |
| `from` | `dict` |  |
| `fsc` | `bool` |  |
| `id` | `str` |  |
| `mail_type` | `str` |  |
| `merge_variables` | `dict` |  |
| `metadata` | `dict` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `perforated_page` | `str` |  |
| `previous_url` | `str` | Url of previous page of items in list. |
| `return_envelope` | `bool` |  |
| `send_date` | `str` |  |
| `sla` | `str` |  |
| `thumbnails` | `list` |  |
| `to` | `dict` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` |  |
| `tracking_number` | `str` |  |
| `url` | `str` |  |
| `use_type` | `str` |  |

#### Example: Load

```python
letter = client.Letter().load({"id": "letter_id"})
```

#### Example: List

```python
letters = client.Letter().list()
```

#### Example: Create

```python
letter = client.Letter().create({
})
```


### Link

Create an instance: `link = client.Link()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | List of links |
| `domain` | `str` | The registered domain to be used for the short URL. |
| `id` | `str` |  |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `redirect_link` | `str` | The original target URL. |
| `slug` | `str` | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `str` | The title of the URL. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```python
link = client.Link().load({"id": "link_id"})
```

#### Example: List

```python
links = client.Link().list()
```

#### Example: Create

```python
link = client.Link().create({
    "redirect_link": "example_redirect_link",  # str
})
```


### LobCreditsBalance

Create an instance: `lob_credits_balance = client.LobCreditsBalance()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `balance` | `float` | Account's current balance of Lob Credits. |

#### Example: Load

```python
lob_credits_balance = client.LobCreditsBalance().load()
```


### Postcard

Create an instance: `postcard = client.Postcard()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `back_template_id` | `str` | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `str` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` |  |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of postcards |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` |  |
| `expected_delivery_date` | `str` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` |  |
| `from` | `Any` |  |
| `front_template_id` | `str` | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | This is in beta. |
| `id` | `str` | Unique identifier prefixed with `psc_`. |
| `metadata` | `dict` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `send_date` | `str` |  |
| `sla` | `str` |  |
| `status` | `str` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` |  |
| `to` | `Any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `str` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | The use type for each mailpiece. |

#### Example: Load

```python
postcard = client.Postcard().load({"id": "postcard_id"})
```

#### Example: List

```python
postcards = client.Postcard().list()
```

#### Example: Create

```python
postcard = client.Postcard().create({
    "back_template_id": "example_back_template_id",  # str
    "carrier": "example_carrier",  # str
    "front_template_id": "example_front_template_id",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
})
```


### QrCode

Create an instance: `qr_code = client.QrCode()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | List of QR code analytics |
| `object` | `str` | Value is resource type. |
| `scanned_count` | `int` | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: List

```python
qr_codes = client.QrCode().list()
```


### ResourceProof

Create an instance: `resource_proof = client.ResourceProof()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `list` | Errors encountered during processing. |
| `id` | `str` | Unique identifier prefixed with `res_prf_`. |
| `object` | `str` | Value is resource type. |
| `resource_type` | `str` | The type of resource to generate a proof for. |
| `status` | `str` | The processing status of the resource proof. |
| `template_id` | `str` | The template ID associated with the resource proof, if any. |
| `thumbnails` | `list` | Thumbnail images of the resource proof. |
| `url` | `str` | A URL to the resource proof PDF. |

#### Example: Load

```python
resource_proof = client.ResourceProof().load({"id": "resource_proof_id"})
```

#### Example: Create

```python
resource_proof = client.ResourceProof().create({
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
})
```


### Response

Create an instance: `response = client.Response()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` | Your Lob account id. |
| `brand_name` | `str` |  |
| `campaign_code` | `str` | The campaign code associated with the Informed Delivery campaign. |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of Informed Delivery campaigns |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Whether the resource has been deleted. |
| `end_date` | `str` | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `int` | The last serial number in the range of serial numbers for this campaign. |
| `id` | `str` | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `str` |  |
| `mode` | `str` | The mode of the Informed Delivery campaign. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is the resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `quantity` | `int` |  |
| `representative_image_s3_link` | `str` | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `str` | A URL link to the campaigns ride along image. |
| `ride_along_url` | `str` |  |
| `service_request_number` | `str` | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `str` |  |
| `start_serial` | `int` | The first serial number in the range of serial numbers for this campaign. |
| `status` | `str` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `usps_campaign_id` | `str` | A numberical string up to 12 characters long. |
| `usps_title` | `str` |  |

#### Example: Load

```python
response = client.Response().load({"usps_campaign_id": "usps_campaign_id"})
```

#### Example: List

```python
responses = client.Response().list()
```

#### Example: Create

```python
response = client.Response().create({
    "account_id": "example_account_id",  # str
    "campaign_code": "example_campaign_code",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "deleted": True,  # bool
    "end_date": "example_end_date",  # str
    "end_serial": 1,  # int
    "id": "example_id",  # str
    "mode": "example_mode",  # str
    "object": "example_object",  # str
    "representative_image_s3_link": "example_representative_image_s3_link",  # str
    "ride_along_image_s3_link": "example_ride_along_image_s3_link",  # str
    "service_request_number": "example_service_request_number",  # str
    "start_serial": 1,  # int
    "usps_campaign_id": "example_usps_campaign_id",  # str
})
```


### ReverseGeocode

Create an instance: `reverse_geocode = client.ReverseGeocode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `list` | list of addresses |
| `id` | `str` | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float` | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float` | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `str` | Value is resource type. |

#### Example: Create

```python
reverse_geocode = client.ReverseGeocode().create({
    "latitude": 1,  # float
    "longitude": 1,  # float
})
```


### SelfMailer

Create an instance: `self_mailer = client.SelfMailer()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `str` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` |  |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of self_mailers |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` |  |
| `expected_delivery_date` | `str` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` |  |
| `from` | `Any` |  |
| `fsc` | `bool` | This is in beta. |
| `id` | `str` | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `str` | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `str` |  |
| `merge_variables` | `dict` |  |
| `metadata` | `dict` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `outside_template_id` | `str` | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `send_date` | `str` |  |
| `size` | `str` |  |
| `sla` | `str` |  |
| `status` | `str` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` |  |
| `to` | `Any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` | An array of certified tracking events ordered by ascending `time`. |
| `url` | `str` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | The use type for each mailpiece. |

#### Example: Load

```python
self_mailer = client.SelfMailer().load({"id": "self_mailer_id"})
```

#### Example: List

```python
self_mailers = client.SelfMailer().list()
```

#### Example: Create

```python
self_mailer = client.SelfMailer().create({
    "carrier": "example_carrier",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
    "use_type": "example_use_type",  # str
})
```


### SnapPack

Create an instance: `snap_pack = client.SnapPack()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `campaign_id` | `str` | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` |  |
| `color` | `bool` | Set this key to `true` if you would like to print in color. |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of snap_packs |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` |  |
| `expected_delivery_date` | `str` | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` |  |
| `from` | `Any` |  |
| `fsc` | `bool` | Contact support@lob.com or your account contact to learn more. |
| `id` | `str` | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `str` | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `str` |  |
| `merge_variables` | `dict` |  |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `outside_template_id` | `str` | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `str` | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `send_date` | `str` |  |
| `size` | `str` |  |
| `sla` | `str` |  |
| `status` | `str` | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` |  |
| `to` | `Any` |  |
| `total_count` | `int` | Indicates the total number of records. |
| `tracking_events` | `list` | An array of tracking events ordered by ascending `time`. |
| `url` | `str` | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | The use type for each mailpiece. |

#### Example: Load

```python
snap_pack = client.SnapPack().load({"id": "snap_pack_id"})
```

#### Example: List

```python
snap_packs = client.SnapPack().list()
```

#### Example: Create

```python
snap_pack = client.SnapPack().create({
    "carrier": "example_carrier",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
    "use_type": "example_use_type",  # str
})
```


### Template

Create an instance: `template = client.Template()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of templates |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | An internal description that identifies this resource. |
| `engine` | `str` | The engine used to combine HTML template with merge variables. |
| `html` | `str` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `str` | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `dict` | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `published_version` | `Any` |  |
| `required_vars` | `list` | An array of required variables to be used in a template. |
| `total_count` | `int` | Indicates the total number of records. |
| `versions` | `list` | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

#### Example: Load

```python
template = client.Template().load({"id": "template_id"})
```

#### Example: List

```python
templates = client.Template().list()
```

#### Example: Create

```python
template = client.Template().create({
    "id": "example_id",  # str
    "html": "example_html",  # str
    "published_version": "example_published_version",  # Any
    "versions": [],  # list
})
```


### TemplateVersion

Create an instance: `template_version = client.TemplateVersion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | number of resources in a set |
| `data` | `list` | list of template versions |
| `date_created` | `str` | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Only returned if the resource has been successfully deleted. |
| `description` | `str` | An internal description that identifies this resource. |
| `engine` | `str` | The engine used to combine HTML template with merge variables. |
| `html` | `str` | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `str` | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `dict` | Object representing the keys of every merge variable present in the template. |
| `next_url` | `str` | Url of next page of items in list. |
| `object` | `str` | Value is resource type. |
| `previous_url` | `str` | Url of previous page of items in list. |
| `required_vars` | `list` | An array of required variables to be used in a template. |
| `suggest_json_editor` | `bool` | Used by frontend, true if the template uses advanced features. |
| `total_count` | `int` | Indicates the total number of records. |

#### Example: Load

```python
template_version = client.TemplateVersion().load({"id": "template_version_id", "template_id": "template_id"})
```

#### Example: List

```python
template_versions = client.TemplateVersion().list({"id": "example_id"})
```

#### Example: Create

```python
template_version = client.TemplateVersion().create({
    "id": "example_id",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "html": "example_html",  # str
    "object": "example_object",  # str
})
```


### TemplateVersionDeletion

Create an instance: `template_version_deletion = client.TemplateVersionDeletion()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### Upload

Create an instance: `upload = client.Upload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accountId` | `str` | Account ID that made the request |
| `bytesProcessed` | `int` | Number of bytes processed in your CSV |
| `campaignId` | `Any` |  |
| `dateCreated` | `str` | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `str` | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Number of mailpieces that failed to create |
| `failuresUrl` | `str` | Url where your campaign mailpiece failures can be retrieved |
| `id` | `str` | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `dict` | test |
| `metadata` | `dict` | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `str` | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `dict` | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `str` | Filename of the upload |
| `requiredAddressColumnMapping` | `dict` | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `str` | The URL for the generated export file. |
| `state` | `str` | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Total number of recipients for the campaign |
| `type` | `str` | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `str` | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Number of mailpieces that were successfully created |

#### Example: Load

```python
upload = client.Upload().load({"id": "upload_id"})
```

#### Example: List

```python
uploads = client.Upload().list()
```

#### Example: Create

```python
upload = client.Upload().create({
    "accountId": "example_accountId",  # str
    "bytesProcessed": 1,  # int
    "campaignId": "example_campaignId",  # Any
    "dateCreated": "example_dateCreated",  # str
    "dateModified": "example_dateModified",  # str
    "deleted": True,  # bool
    "failedMailpieces": 1,  # int
    "id": "example_id",  # str
    "metadata": {},  # dict
    "mode": "example_mode",  # str
    "optionalAddressColumnMapping": {},  # dict
    "requiredAddressColumnMapping": {},  # dict
    "s3Url": "example_s3Url",  # str
    "state": "example_state",  # str
    "totalMailpieces": 1,  # int
    "type": "example_type",  # str
    "uploadId": "example_uploadId",  # str
    "validatedMailpieces": 1,  # int
})
```


### UploadCreateExport

Create an instance: `upload_create_export = client.UploadCreateExport()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exportId` | `str` |  |
| `id` | `str` |  |
| `message` | `str` |  |
| `type` | `str` |  |

#### Example: Create

```python
upload_create_export = client.UploadCreateExport().create({
    "id": "example_id",  # str
    "exportId": "example_exportId",  # str
    "message": "example_message",  # str
})
```


### UsAutocompletion

Create an instance: `us_autocompletion = client.UsAutocompletion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address_prefix` | `str` | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `str` | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `bool` | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `str` | Unique identifier prefixed with `us_auto_`. |
| `object` | `str` | Value is resource type. |
| `state` | `str` | An optional state input used to filter suggestions. |
| `suggestions` | `list` | An array of objects representing suggested addresses. |
| `zip_code` | `str` | An optional ZIP Code input used to filter suggestions. |

#### Example: Create

```python
us_autocompletion = client.UsAutocompletion().create({
    "address_prefix": "example_address_prefix",  # str
})
```


### UsVerification

Create an instance: `us_verification = client.UsVerification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addresses` | `list` |  |
| `components` | `dict` | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `str` | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `dict` | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Indicates whether any errors occurred during the verification process. |
| `id` | `str` | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `str` | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `dict` | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `str` | Value is resource type. |
| `primary_line` | `str` | The primary delivery line (usually the street address) of the address. |
| `recipient` | `str` | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `str` | The secondary delivery line of the address. |
| `urbanization` | `str` | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

#### Example: Create

```python
us_verification = client.UsVerification().create({
    "addresses": [],  # list
    "components": {},  # dict
    "deliverability_analysis": {},  # dict
    "errors": True,  # bool
    "lob_confidence_score": {},  # dict
})
```


### Zip

Create an instance: `zip = client.Zip()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `zip_code` | `str` | A 5-digit ZIP code. |

#### Example: Create

```python
zip = client.Zip().create({
    "zip_code": "example_zip_code",  # str
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── lob_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`lob_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
address = client.Address()
address.list()

# address.data_get() now returns the address data from the last list
# address.match_get() returns the last match criteria
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
