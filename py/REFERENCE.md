# Lob Python SDK Reference

Complete API reference for the Lob Python SDK.


## LobSDK

### Constructor

```python
from lob_sdk import LobSDK

client = LobSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LobSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LobSDK.test()
```


### Instance Methods

#### `Address(data=None)`

Create a new `AddressEntity` instance. Pass `None` for no initial data.

#### `BankAccount(data=None)`

Create a new `BankAccountEntity` instance. Pass `None` for no initial data.

#### `BankDeletion(data=None)`

Create a new `BankDeletionEntity` instance. Pass `None` for no initial data.

#### `BillingGroup(data=None)`

Create a new `BillingGroupEntity` instance. Pass `None` for no initial data.

#### `Booklet(data=None)`

Create a new `BookletEntity` instance. Pass `None` for no initial data.

#### `Buckslip(data=None)`

Create a new `BuckslipEntity` instance. Pass `None` for no initial data.

#### `BuckslipOrder(data=None)`

Create a new `BuckslipOrderEntity` instance. Pass `None` for no initial data.

#### `Campaign(data=None)`

Create a new `CampaignEntity` instance. Pass `None` for no initial data.

#### `Card(data=None)`

Create a new `CardEntity` instance. Pass `None` for no initial data.

#### `CardOrder(data=None)`

Create a new `CardOrderEntity` instance. Pass `None` for no initial data.

#### `Check(data=None)`

Create a new `CheckEntity` instance. Pass `None` for no initial data.

#### `Creative(data=None)`

Create a new `CreativeEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `IdentityValidation(data=None)`

Create a new `IdentityValidationEntity` instance. Pass `None` for no initial data.

#### `IntlVerification(data=None)`

Create a new `IntlVerificationEntity` instance. Pass `None` for no initial data.

#### `Letter(data=None)`

Create a new `LetterEntity` instance. Pass `None` for no initial data.

#### `Link(data=None)`

Create a new `LinkEntity` instance. Pass `None` for no initial data.

#### `LobCreditsBalance(data=None)`

Create a new `LobCreditsBalanceEntity` instance. Pass `None` for no initial data.

#### `Postcard(data=None)`

Create a new `PostcardEntity` instance. Pass `None` for no initial data.

#### `QrCode(data=None)`

Create a new `QrCodeEntity` instance. Pass `None` for no initial data.

#### `ResourceProof(data=None)`

Create a new `ResourceProofEntity` instance. Pass `None` for no initial data.

#### `Response(data=None)`

Create a new `ResponseEntity` instance. Pass `None` for no initial data.

#### `ReverseGeocode(data=None)`

Create a new `ReverseGeocodeEntity` instance. Pass `None` for no initial data.

#### `SelfMailer(data=None)`

Create a new `SelfMailerEntity` instance. Pass `None` for no initial data.

#### `SnapPack(data=None)`

Create a new `SnapPackEntity` instance. Pass `None` for no initial data.

#### `Template(data=None)`

Create a new `TemplateEntity` instance. Pass `None` for no initial data.

#### `TemplateVersion(data=None)`

Create a new `TemplateVersionEntity` instance. Pass `None` for no initial data.

#### `TemplateVersionDeletion(data=None)`

Create a new `TemplateVersionDeletionEntity` instance. Pass `None` for no initial data.

#### `Upload(data=None)`

Create a new `UploadEntity` instance. Pass `None` for no initial data.

#### `UploadCreateExport(data=None)`

Create a new `UploadCreateExportEntity` instance. Pass `None` for no initial data.

#### `UsAutocompletion(data=None)`

Create a new `UsAutocompletionEntity` instance. Pass `None` for no initial data.

#### `UsVerification(data=None)`

Create a new `UsVerificationEntity` instance. Pass `None` for no initial data.

#### `Zip(data=None)`

Create a new `ZipEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AddressEntity

```python
address = client.Address()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_city` | `str` | No |  |
| `address_country` | `str` | No |  |
| `address_line1` | `str` | No |  |
| `address_line2` | `str` | No |  |
| `address_state` | `str` | No |  |
| `address_zip` | `str` | No |  |
| `company` | `str` | No |  |
| `date_created` | `str` | No |  |
| `date_modified` | `str` | No |  |
| `description` | `str` | No |  |
| `email` | `str` | No |  |
| `id` | `str` | No |  |
| `metadata` | `dict` | No |  |
| `name` | `str` | No |  |
| `object` | `str` | No |  |
| `phone` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Address().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Address().list()
for address in results:
    print(address)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Address().load({"id": "address_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Address().remove({"id": "address_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AddressEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BankAccountEntity

```python
bank_account = client.BankAccount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_number` | `str` | Yes |  |
| `account_type` | `str` | Yes | The type of entity that holds the account. |
| `bank_name` | `str` | No | The name of the bank based on the provided routing number, e.g. |
| `check_template` | `str` | No | The check template used for printing. |
| `city` | `str` | No | The city associated with your home bank account. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | An internal description that identifies this resource. |
| `fractional_routing_number` | `str` | No | The fractional routing number for your home bank account. |
| `id` | `str` | Yes |  |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `str` | No | The type of microdeposit verification required for this bank account. |
| `object` | `str` | Yes | Value is resource type. |
| `routing_number` | `str` | Yes | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `str` | Yes | The signatory associated with your account. |
| `signature_url` | `Any` | No |  |
| `state` | `str` | No | The state associated with your home bank account. |
| `verified` | `bool` | No | A bank account must be verified before a check can be created. |
| `zipcode` | `str` | No | The zipcode associated with your home bank account. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BankAccount().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BankAccount().list()
for bank_account in results:
    print(bank_account)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BankAccount().load({"id": "bank_account_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BankDeletionEntity

```python
bank_deletion = client.BankDeletion()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.BankDeletion().remove({"bank_id": "bank_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankDeletionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingGroupEntity

```python
billing_group = client.BillingGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `description` | `str` | No | Description of the billing group. |
| `id` | `str` | No | Unique identifier prefixed with `bg_`. |
| `name` | `str` | No | Name of the billing group. |
| `object` | `str` | No | Value is resource type. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BillingGroup().create({
    "id": "example_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BillingGroup().list()
for billing_group in results:
    print(billing_group)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BillingGroup().load({"id": "billing_group_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BookletEntity

```python
booklet = client.Booklet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `carrier` | `str` | No |  |
| `date_created` | `str` | No |  |
| `date_modified` | `str` | No |  |
| `description` | `str` | No | An internal description that identifies this resource. |
| `expected_delivery_date` | `str` | No |  |
| `from` | `dict` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `str` | No |  |
| `mail_type` | `str` | No | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `dict` | No | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `str` | No |  |
| `pages` | `int` | No |  |
| `send_date` | `str` | No | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `str` | No |  |
| `sla` | `str` | No |  |
| `source_material` | `str` | No |  |
| `thumbnails` | `list` | No |  |
| `to` | `dict` | No |  |
| `tracking_events` | `list` | No | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `str` | No |  |
| `url` | `str` | No |  |
| `use_type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Booklet().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Booklet().list()
for booklet in results:
    print(booklet)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Booklet().load({"id": "booklet_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Booklet().remove({"id": "booklet_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BookletEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BuckslipEntity

```python
buckslip = client.Buckslip()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | No |  |
| `allocated_quantity` | `float` | Yes | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | Yes | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float` | Yes | The available quantity of buckslips. |
| `back_original_url` | `str` | Yes | The original URL of the back template. |
| `buckslip_orders` | `list` | Yes | An array of buckslip orders that are associated with the buckslip. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | Description of the buckslip. |
| `finish` | `str` | Yes |  |
| `front_original_url` | `str` | Yes | The original URL of the front template. |
| `id` | `str` | Yes | Unique identifier prefixed with `bck_`. |
| `mode` | `str` | No |  |
| `object` | `str` | Yes | Value is resource type. |
| `onhand_quantity` | `float` | Yes | The onhand quantity of buckslips. |
| `pending_quantity` | `float` | Yes | The pending quantity of buckslips. |
| `projected_quantity` | `float` | Yes | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `str` | Yes | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | Yes | The number of buckslips to be reordered. |
| `send_date` | `str` | No |  |
| `size` | `str` | No | The size of the buckslip |
| `status` | `str` | Yes |  |
| `stock` | `str` | Yes |  |
| `threshold_amount` | `int` | Yes | The threshold amount of the buckslip |
| `thumbnails` | `list` | Yes |  |
| `url` | `str` | Yes | The signed link for the buckslip. |
| `weight` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Buckslip().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Buckslip().list()
for buckslip in results:
    print(buckslip)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Buckslip().load({"id": "buckslip_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Buckslip().remove({"id": "buckslip_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Buckslip().update({
    "id": "buckslip_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BuckslipEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BuckslipOrderEntity

```python
buckslip_order = client.BuckslipOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `buckslip_id` | `str` | No | Unique identifier prefixed with `bck_`. |
| `cancelled_reason` | `str` | No | The reason for cancellation. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `str` | No | The fixed deadline for the buckslips to be printed. |
| `id` | `str` | No | Unique identifier prefixed with `bo_`. |
| `inventory` | `float` | No | The inventory of the buckslip order. |
| `object` | `str` | Yes | Value is resource type. |
| `quantity` | `int` | Yes | The quantity of buckslips in the order (minimum 5,000). |
| `quantity_ordered` | `float` | No | The quantity of buckslips ordered. |
| `status` | `str` | No | The status of the buckslip order. |
| `unit_price` | `float` | No | The unit price for the buckslip order. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BuckslipOrder().create({
    "id": "example_id",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "object": "example_object",  # str
    "quantity": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.BuckslipOrder().list({"id": "example"})
for buckslip_order in results:
    print(buckslip_order)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BuckslipOrderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CampaignEntity

```python
campaign = client.Campaign()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | `bool` | No | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `str` | No | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | No | A window, in minutes, within which the campaign can be canceled. |
| `creatives` | `list` | Yes | An array of creatives that have been associated with this campaign. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | An internal description that identifies this resource. |
| `id` | `str` | Yes | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Yes | Whether or not the campaign is still a draft. |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `str` | Yes | Name of the campaign. |
| `object` | `str` | Yes | Value is resource type. |
| `print_speed` | `str` | No | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `str` | Yes | How the campaign should be scheduled. |
| `send_date` | `str` | No | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `str` | No | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `uploads` | `list` | Yes | A single-element array containing the upload object that is assocated with this campaign. |
| `use_type` | `str` | Yes | The use type for each mailpiece. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Campaign().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Campaign().list()
for campaign in results:
    print(campaign)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Campaign().load({"id": "campaign_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Campaign().remove({"id": "campaign_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Campaign().update({
    "id": "campaign_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CampaignEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardEntity

```python
card = client.Card()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | No |  |
| `auto_reorder` | `bool` | Yes | True if the cards should be auto-reordered. |
| `available_quantity` | `int` | Yes | The available quantity of cards. |
| `back_original_url` | `str` | Yes | The original URL of the back template. |
| `countries` | `str` | No |  |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | Description of the card. |
| `front_original_url` | `str` | Yes | The original URL of the front template. |
| `id` | `str` | Yes | Unique identifier prefixed with `card_`. |
| `mode` | `str` | No |  |
| `object` | `str` | Yes | Value is resource type. |
| `orientation` | `str` | Yes | The orientation of the card. |
| `pending_quantity` | `int` | Yes | The pending quantity of cards. |
| `raw_url` | `str` | Yes | The raw URL of the card. |
| `reorder_quantity` | `int` | Yes | The number of cards to be reordered. |
| `send_date` | `str` | No |  |
| `size` | `str` | No | The size of the card |
| `status` | `str` | Yes |  |
| `threshold_amount` | `int` | Yes | The threshold amount of the card |
| `thumbnails` | `list` | Yes |  |
| `url` | `str` | Yes | The signed link for the card. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Card().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Card().list()
for card in results:
    print(card)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Card().load({"id": "card_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Card().remove({"id": "card_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CardOrderEntity

```python
card_order = client.CardOrder()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `availability_date` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `cancelled_reason` | `str` | No | The reason for cancellation. |
| `card_id` | `str` | No | Unique identifier prefixed with `card_`. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `expected_availability_date` | `str` | No | The fixed deadline for the cards to be printed. |
| `id` | `str` | No | Unique identifier prefixed with `co_`. |
| `inventory` | `float` | No | The inventory of the card order. |
| `object` | `str` | Yes | Value is resource type. |
| `quantity` | `int` | Yes | The quantity of cards in the order (minimum 10,000). |
| `quantity_ordered` | `float` | No | The quantity of cards ordered |
| `status` | `str` | No | The status of the card order. |
| `unit_price` | `float` | No | The unit price for the card order. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CardOrder().create({
    "id": "example_id",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "object": "example_object",  # str
    "quantity": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CardOrder().list({"id": "example"})
for card_order in results:
    print(card_order)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CardOrderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CheckEntity

```python
check = client.Check()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `str` | No |  |
| `attachment_template_version_id` | `str` | No |  |
| `bank_account` | `Any` | Yes |  |
| `carrier` | `str` | Yes |  |
| `check_bottom_template_id` | `str` | No |  |
| `check_bottom_template_version_id` | `str` | No |  |
| `check_number` | `int` | No |  |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No |  |
| `expected_delivery_date` | `str` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` | No |  |
| `from` | `Any` | No |  |
| `id` | `str` | Yes | Unique identifier prefixed with `chk_`. |
| `mail_type` | `str` | No |  |
| `memo` | `str` | No |  |
| `merge_variables` | `dict` | No |  |
| `message` | `str` | No |  |
| `metadata` | `dict` | No |  |
| `object` | `str` | No | Value is resource type. |
| `send_date` | `str` | No |  |
| `sla` | `str` | No |  |
| `status` | `str` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` | No |  |
| `to` | `Any` | Yes |  |
| `tracking_events` | `list` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `str` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | Yes | TThe use type for each mailpiece. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Check().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Check().list()
for check in results:
    print(check)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Check().load({"id": "check_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Check().remove({"id": "check_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CheckEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreativeEntity

```python
creative = client.Creative()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaigns` | `list` | Yes | Array of campaigns associated with the creative ID |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | An internal description that identifies this resource. |
| `details` | `dict` | No |  |
| `from` | `str` | No | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `str` | Yes | Unique identifier prefixed with `crv_`. |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `str` | Yes | Value is resource type. |
| `resource_type` | `str` | No |  |
| `template_preview_urls` | `dict` | Yes | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `list` | Yes | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Creative().create({
    "campaigns": [],  # list
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
    "template_preview_urls": {},  # dict
    "template_previews": [],  # list
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Creative().load({"id": "creative_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Creative().update({
    "id": "creative_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreativeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The date and time the domain was created. |
| `domain` | `str` | No | The registered domain/hostname. |
| `error_redirect_link` | `str` | No | URL to redirect customers if a short link is broken or inactive. |
| `id` | `str` | No | Unique identifier for a domain. |
| `status` | `str` | No | The configuration status of the domain. |
| `updated_at` | `str` | No | The date and time the domain was last updated. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Domain().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Domain().list()
for domain in results:
    print(domain)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Domain().load({"id": "domain_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Domain().remove({"id": "domain_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IdentityValidationEntity

```python
identity_validation = client.IdentityValidation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confidence` | `str` | No |  |
| `id` | `str` | No |  |
| `last_line` | `str` | No |  |
| `object` | `str` | No |  |
| `primary_line` | `str` | No |  |
| `recipient` | `str` | No |  |
| `score` | `int` | No |  |
| `secondary_line` | `str` | No |  |
| `urbanization` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.IdentityValidation().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IdentityValidationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntlVerificationEntity

```python
intl_verification = client.IntlVerification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `list` | Yes |  |
| `components` | `dict` | No |  |
| `country` | `str` | No |  |
| `coverage` | `str` | No |  |
| `deliverability` | `str` | No |  |
| `errors` | `bool` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `str` | No |  |
| `last_line` | `str` | No |  |
| `object` | `str` | No |  |
| `primary_line` | `str` | No |  |
| `recipient` | `str` | No |  |
| `secondary_line` | `str` | No |  |
| `status` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.IntlVerification().create({
    "addresses": [],  # list
    "errors": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntlVerificationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LetterEntity

```python
letter = client.Letter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_placement` | `str` | No |  |
| `cards` | `list` | No |  |
| `carrier` | `str` | No |  |
| `color` | `bool` | No |  |
| `custom_envelope` | `str` | No |  |
| `date_created` | `str` | No |  |
| `date_modified` | `str` | No |  |
| `description` | `str` | No |  |
| `double_sided` | `bool` | No |  |
| `expected_delivery_date` | `str` | No |  |
| `extra_service` | `str` | No |  |
| `from` | `dict` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `str` | No |  |
| `mail_type` | `str` | No |  |
| `merge_variables` | `dict` | No |  |
| `metadata` | `dict` | No |  |
| `object` | `str` | No |  |
| `perforated_page` | `str` | No |  |
| `return_envelope` | `bool` | No |  |
| `send_date` | `str` | No |  |
| `sla` | `str` | No |  |
| `template_id` | `str` | No |  |
| `template_version_id` | `str` | No |  |
| `thumbnails` | `list` | No |  |
| `to` | `dict` | No |  |
| `tracking_events` | `list` | No |  |
| `tracking_number` | `str` | No |  |
| `url` | `str` | No |  |
| `use_type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Letter().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Letter().list()
for letter in results:
    print(letter)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Letter().load({"id": "letter_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Letter().remove({"id": "letter_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LetterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkEntity

```python
link = client.Link()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | The date and time the link was created. |
| `domain` | `str` | No | The registered domain to be used for the short URL. |
| `domain_id` | `str` | No | A unique identifier for the registered domain. |
| `id` | `str` | No | Unique identifier prefixed with `lnk_`. |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `redirect_link` | `str` | No | The original target URL. |
| `short_link` | `str` | No | The shortened URL for the associated original URL. |
| `slug` | `str` | No | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `str` | No | The title of the URL. |
| `updated_at` | `str` | No | The date and time the link was last updated. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Link().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Link().list()
for link in results:
    print(link)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Link().load({"id": "link_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Link().remove({"id": "link_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Link().update({
    "id": "link_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LobCreditsBalanceEntity

```python
lob_credits_balance = client.LobCreditsBalance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `float` | Yes | Account's current balance of Lob Credits. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.LobCreditsBalance().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LobCreditsBalanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostcardEntity

```python
postcard = client.Postcard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `back_template_id` | `str` | Yes | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `str` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` | Yes |  |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No |  |
| `expected_delivery_date` | `str` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` | No |  |
| `from` | `Any` | No |  |
| `front_template_id` | `str` | Yes | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `str` | Yes | Unique identifier prefixed with `psc_`. |
| `metadata` | `dict` | No |  |
| `object` | `str` | No | Value is resource type. |
| `send_date` | `str` | No |  |
| `sla` | `str` | No |  |
| `status` | `str` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` | No |  |
| `to` | `Any` | Yes |  |
| `tracking_events` | `list` | No | An array of tracking_event objects ordered by ascending `time`. |
| `url` | `str` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | No | The use type for each mailpiece. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Postcard().create({
    "back_template_id": "example_back_template_id",  # str
    "carrier": "example_carrier",  # str
    "front_template_id": "example_front_template_id",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Postcard().list()
for postcard in results:
    print(postcard)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Postcard().load({"id": "postcard_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Postcard().remove({"id": "postcard_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostcardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QrCodeEntity

```python
qr_code = client.QrCode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `number_of_scans` | `float` | No | Number of times the QR Code associated with this mail piece was scanned. |
| `resource_id` | `str` | No | Unique identifier for each mail piece. |
| `scans` | `list` | No | Detailed scan information associated with each mail piece. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.QrCode().list()
for qr_code in results:
    print(qr_code)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QrCodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResourceProofEntity

```python
resource_proof = client.ResourceProof()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `list` | No | Errors encountered during processing. |
| `id` | `str` | Yes | Unique identifier prefixed with `res_prf_`. |
| `object` | `str` | Yes | Value is resource type. |
| `resource_type` | `str` | No | The type of resource to generate a proof for. |
| `status` | `str` | No | The processing status of the resource proof. |
| `template_id` | `str` | No | The template ID associated with the resource proof, if any. |
| `thumbnails` | `list` | No | Thumbnail images of the resource proof. |
| `url` | `str` | No | A URL to the resource proof PDF. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ResourceProof().create({
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "id": "example_id",  # str
    "object": "example_object",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ResourceProof().load({"id": "resource_proof_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ResourceProof().update({
    "id": "resource_proof_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResourceProofEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResponseEntity

```python
response = client.Response()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | Yes | Your Lob account id. |
| `brand_name` | `str` | No |  |
| `campaign_code` | `str` | Yes | The campaign code associated with the Informed Delivery campaign. |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | Yes | Whether the resource has been deleted. |
| `end_date` | `str` | Yes | A timestamp in ISO 8601 format of the date the campaign ends. |
| `end_serial` | `int` | Yes | The last serial number in the range of serial numbers for this campaign. |
| `id` | `str` | Yes | Unique identifier prefixed with `infd_`. |
| `lob_campaign_id` | `str` | No |  |
| `mode` | `str` | Yes | The mode of the Informed Delivery campaign. |
| `object` | `str` | Yes | Value is the resource type. |
| `quantity` | `int` | No |  |
| `representative_image_s3_link` | `str` | Yes | A URL link to the campaigns representative image. |
| `ride_along_image_s3_link` | `str` | Yes | A URL link to the campaigns ride along image. |
| `ride_along_url` | `str` | No |  |
| `service_request_number` | `str` | Yes | The USPS promotion service request number used to create this campaign (if there was one used). |
| `start_date` | `str` | No |  |
| `start_serial` | `int` | Yes | The first serial number in the range of serial numbers for this campaign. |
| `status` | `str` | No |  |
| `usps_campaign_id` | `str` | Yes | A numberical string up to 12 characters long. |
| `usps_title` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Response().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Response().list()
for response in results:
    print(response)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Response().load({"usps_campaign_id": "usps_campaign_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Response().update({
    "usps_campaign_id": "usps_campaign_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResponseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReverseGeocodeEntity

```python
reverse_geocode = client.ReverseGeocode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `list` | No | list of addresses |
| `id` | `str` | No | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float` | Yes | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float` | Yes | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `str` | No | Value is resource type. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ReverseGeocode().create({
    "latitude": 1,  # float
    "longitude": 1,  # float
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReverseGeocodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SelfMailerEntity

```python
self_mailer = client.SelfMailer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `str` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` | Yes |  |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No |  |
| `expected_delivery_date` | `str` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` | No |  |
| `from` | `Any` | No |  |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `str` | Yes | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `str` | No | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `str` | No |  |
| `merge_variables` | `dict` | No |  |
| `metadata` | `dict` | No |  |
| `object` | `str` | No | Value is resource type. |
| `outside_template_id` | `str` | No | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `send_date` | `str` | No |  |
| `size` | `str` | No |  |
| `sla` | `str` | No |  |
| `status` | `str` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` | No |  |
| `to` | `Any` | Yes |  |
| `tracking_events` | `list` | No | An array of certified tracking events ordered by ascending `time`. |
| `url` | `str` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | Yes | The use type for each mailpiece. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SelfMailer().create({
    "carrier": "example_carrier",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
    "use_type": "example_use_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SelfMailer().list()
for self_mailer in results:
    print(self_mailer)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SelfMailer().load({"id": "self_mailer_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.SelfMailer().remove({"id": "self_mailer_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SelfMailerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SnapPackEntity

```python
snap_pack = client.SnapPack()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `str` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `str` | Yes |  |
| `color` | `bool` | No | Set this key to `true` if you would like to print in color. |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No |  |
| `expected_delivery_date` | `str` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `dict` | No |  |
| `from` | `Any` | No |  |
| `fsc` | `bool` | No | Contact support@lob.com or your account contact to learn more. |
| `id` | `str` | Yes | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `str` | No | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `str` | No |  |
| `merge_variables` | `dict` | No |  |
| `object` | `str` | No | Value is resource type. |
| `outside_template_id` | `str` | No | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `str` | No | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `send_date` | `str` | No |  |
| `size` | `str` | No |  |
| `sla` | `str` | No |  |
| `status` | `str` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `list` | No |  |
| `to` | `Any` | Yes |  |
| `tracking_events` | `list` | No | An array of tracking events ordered by ascending `time`. |
| `url` | `str` | Yes | A [signed link](#section/Asset-URLs) served over HTTPS. |
| `use_type` | `str` | Yes | The use type for each mailpiece. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SnapPack().create({
    "carrier": "example_carrier",  # str
    "id": "example_id",  # str
    "to": "example_to",  # Any
    "url": "example_url",  # str
    "use_type": "example_use_type",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SnapPack().list()
for snap_pack in results:
    print(snap_pack)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SnapPack().load({"id": "snap_pack_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.SnapPack().remove({"id": "snap_pack_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SnapPackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateEntity

```python
template = client.Template()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `str` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | An internal description that identifies this resource. |
| `engine` | `str` | No | The engine used to combine HTML template with merge variables. |
| `html` | `str` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `str` | Yes | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `dict` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `str` | No | Value is resource type. |
| `published_version` | `Any` | Yes |  |
| `required_vars` | `list` | No | An array of required variables to be used in a template. |
| `versions` | `list` | Yes | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Template().create({
    "id": "example_id",  # str
    "html": "example_html",  # str
    "published_version": "example_published_version",  # Any
    "versions": [],  # list
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Template().list()
for template in results:
    print(template)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Template().load({"id": "template_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Template().remove({"id": "template_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateVersionEntity

```python
template_version = client.TemplateVersion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `str` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `str` | No | An internal description that identifies this resource. |
| `engine` | `str` | No | The engine used to combine HTML template with merge variables. |
| `html` | `str` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `str` | Yes | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `dict` | No | Object representing the keys of every merge variable present in the template. |
| `object` | `str` | Yes | Value is resource type. |
| `required_vars` | `list` | No | An array of required variables to be used in a template. |
| `suggest_json_editor` | `bool` | No | Used by frontend, true if the template uses advanced features. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.TemplateVersion().create({
    "id": "example_id",  # str
    "date_created": "example_date_created",  # str
    "date_modified": "example_date_modified",  # str
    "html": "example_html",  # str
    "object": "example_object",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.TemplateVersion().list({"id": "example_id"})
for template_version in results:
    print(template_version)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TemplateVersion().load({"id": "template_version_id", "template_id": "template_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateVersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TemplateVersionDeletionEntity

```python
template_version_deletion = client.TemplateVersionDeletion()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.TemplateVersionDeletion().remove({"template_id": "template_id", "vrsn_id": "vrsn_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TemplateVersionDeletionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UploadEntity

```python
upload = client.Upload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `str` | Yes | Account ID that made the request |
| `bytesProcessed` | `int` | Yes | Number of bytes processed in your CSV |
| `campaignId` | `Any` | Yes |  |
| `dateCreated` | `str` | Yes | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `str` | Yes | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Yes | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Yes | Number of mailpieces that failed to create |
| `failuresUrl` | `str` | No | Url where your campaign mailpiece failures can be retrieved |
| `id` | `str` | Yes | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `dict` | No | test |
| `metadata` | `dict` | Yes | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `str` | Yes | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `dict` | Yes | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `str` | No | Filename of the upload |
| `requiredAddressColumnMapping` | `dict` | Yes | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `str` | Yes | The URL for the generated export file. |
| `state` | `str` | Yes | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Yes | Total number of recipients for the campaign |
| `type` | `str` | Yes | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `str` | Yes | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Yes | Number of mailpieces that were successfully created |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Upload().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Upload().list()
for upload in results:
    print(upload)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Upload().load({"id": "upload_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Upload().remove({"id": "upload_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Upload().update({
    "id": "upload_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UploadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UploadCreateExportEntity

```python
upload_create_export = client.UploadCreateExport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exportId` | `str` | Yes |  |
| `id` | `str` | No |  |
| `message` | `str` | Yes |  |
| `type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UploadCreateExport().create({
    "id": "example_id",  # str
    "exportId": "example_exportId",  # str
    "message": "example_message",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UploadCreateExportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsAutocompletionEntity

```python
us_autocompletion = client.UsAutocompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_prefix` | `str` | Yes | Only accepts numbers and street names in an alphanumeric format. |
| `city` | `str` | No | An optional city input used to filter suggestions. |
| `geo_ip_sort` | `bool` | No | If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header. |
| `id` | `str` | No | Unique identifier prefixed with `us_auto_`. |
| `object` | `str` | No | Value is resource type. |
| `state` | `str` | No | An optional state input used to filter suggestions. |
| `suggestions` | `list` | No | An array of objects representing suggested addresses. |
| `zip_code` | `str` | No | An optional ZIP Code input used to filter suggestions. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UsAutocompletion().create({
    "address_prefix": "example_address_prefix",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsAutocompletionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsVerificationEntity

```python
us_verification = client.UsVerification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `list` | Yes |  |
| `components` | `dict` | Yes | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `str` | No | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `dict` | Yes | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `str` | No | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `str` | No | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `dict` | Yes | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `str` | No | Value is resource type. |
| `primary_line` | `str` | No | The primary delivery line (usually the street address) of the address. |
| `recipient` | `str` | No | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `str` | No | The secondary delivery line of the address. |
| `urbanization` | `str` | No | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | No | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.UsVerification().create({
    "addresses": [],  # list
    "components": {},  # dict
    "deliverability_analysis": {},  # dict
    "errors": True,  # bool
    "lob_confidence_score": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsVerificationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ZipEntity

```python
zip = client.Zip()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `zip_code` | `str` | Yes | A 5-digit ZIP code. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Zip().create({
    "zip_code": "example_zip_code",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZipEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = LobSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

