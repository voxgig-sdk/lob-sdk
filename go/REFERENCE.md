# Lob Golang SDK Reference

Complete API reference for the Lob Golang SDK.


## LobSDK

### Constructor

```go
func NewLobSDK(options map[string]any) *LobSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LobSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LobSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Address(data map[string]any) LobEntity`

Create a new `Address` entity instance. Pass `nil` for no initial data.

#### `BankAccount(data map[string]any) LobEntity`

Create a new `BankAccount` entity instance. Pass `nil` for no initial data.

#### `BankDeletion(data map[string]any) LobEntity`

Create a new `BankDeletion` entity instance. Pass `nil` for no initial data.

#### `BillingGroup(data map[string]any) LobEntity`

Create a new `BillingGroup` entity instance. Pass `nil` for no initial data.

#### `Booklet(data map[string]any) LobEntity`

Create a new `Booklet` entity instance. Pass `nil` for no initial data.

#### `Buckslip(data map[string]any) LobEntity`

Create a new `Buckslip` entity instance. Pass `nil` for no initial data.

#### `BuckslipOrder(data map[string]any) LobEntity`

Create a new `BuckslipOrder` entity instance. Pass `nil` for no initial data.

#### `Campaign(data map[string]any) LobEntity`

Create a new `Campaign` entity instance. Pass `nil` for no initial data.

#### `Card(data map[string]any) LobEntity`

Create a new `Card` entity instance. Pass `nil` for no initial data.

#### `CardOrder(data map[string]any) LobEntity`

Create a new `CardOrder` entity instance. Pass `nil` for no initial data.

#### `Check(data map[string]any) LobEntity`

Create a new `Check` entity instance. Pass `nil` for no initial data.

#### `Creative(data map[string]any) LobEntity`

Create a new `Creative` entity instance. Pass `nil` for no initial data.

#### `Domain(data map[string]any) LobEntity`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `IdentityValidation(data map[string]any) LobEntity`

Create a new `IdentityValidation` entity instance. Pass `nil` for no initial data.

#### `IntlVerification(data map[string]any) LobEntity`

Create a new `IntlVerification` entity instance. Pass `nil` for no initial data.

#### `Letter(data map[string]any) LobEntity`

Create a new `Letter` entity instance. Pass `nil` for no initial data.

#### `Link(data map[string]any) LobEntity`

Create a new `Link` entity instance. Pass `nil` for no initial data.

#### `LobCreditsBalance(data map[string]any) LobEntity`

Create a new `LobCreditsBalance` entity instance. Pass `nil` for no initial data.

#### `Postcard(data map[string]any) LobEntity`

Create a new `Postcard` entity instance. Pass `nil` for no initial data.

#### `QrCode(data map[string]any) LobEntity`

Create a new `QrCode` entity instance. Pass `nil` for no initial data.

#### `ResourceProof(data map[string]any) LobEntity`

Create a new `ResourceProof` entity instance. Pass `nil` for no initial data.

#### `Response(data map[string]any) LobEntity`

Create a new `Response` entity instance. Pass `nil` for no initial data.

#### `ReverseGeocode(data map[string]any) LobEntity`

Create a new `ReverseGeocode` entity instance. Pass `nil` for no initial data.

#### `SelfMailer(data map[string]any) LobEntity`

Create a new `SelfMailer` entity instance. Pass `nil` for no initial data.

#### `SnapPack(data map[string]any) LobEntity`

Create a new `SnapPack` entity instance. Pass `nil` for no initial data.

#### `Template(data map[string]any) LobEntity`

Create a new `Template` entity instance. Pass `nil` for no initial data.

#### `TemplateVersion(data map[string]any) LobEntity`

Create a new `TemplateVersion` entity instance. Pass `nil` for no initial data.

#### `TemplateVersionDeletion(data map[string]any) LobEntity`

Create a new `TemplateVersionDeletion` entity instance. Pass `nil` for no initial data.

#### `Upload(data map[string]any) LobEntity`

Create a new `Upload` entity instance. Pass `nil` for no initial data.

#### `UploadCreateExport(data map[string]any) LobEntity`

Create a new `UploadCreateExport` entity instance. Pass `nil` for no initial data.

#### `UsAutocompletion(data map[string]any) LobEntity`

Create a new `UsAutocompletion` entity instance. Pass `nil` for no initial data.

#### `UsVerification(data map[string]any) LobEntity`

Create a new `UsVerification` entity instance. Pass `nil` for no initial data.

#### `Zip(data map[string]any) LobEntity`

Create a new `Zip` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AddressEntity

```go
address := client.Address(nil)
fmt.Println(address.GetName()) // "address"
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
| `data` | `[]any` | No | list of addresses |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `metadata` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `phone` | `string` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Address(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Address(nil).Load(map[string]any{"id": "address_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Address(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Address(nil).Remove(map[string]any{"id": "address_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AddressEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BankAccountEntity

```go
bankAccount := client.BankAccount(nil)
fmt.Println(bankAccount.GetName()) // "bank_account"
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
| `data` | `[]any` | No | list of bank_accounts |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `fractional_routing_number` | `string` | No | The fractional routing number for your home bank account. |
| `id` | `string` | Yes |  |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `microdeposit_type` | `string` | No | The type of microdeposit verification required for this bank account. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `routing_number` | `string` | Yes | Must be a <a href="https://www.frbservices.org/index.html" target="_blank">valid US routing number</a>. |
| `signatory` | `string` | Yes | The signatory associated with your account. |
| `signature_url` | `any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BankAccount(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BankAccount(nil).Load(map[string]any{"id": "bank_account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BankAccountEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BankDeletionEntity

```go
bankDeletion := client.BankDeletion(nil)
fmt.Println(bankDeletion.GetName()) // "bank_deletion"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.BankDeletion(nil).Remove(map[string]any{"bank_id": "bank_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BankDeletionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BillingGroupEntity

```go
billingGroup := client.BillingGroup(nil)
fmt.Println(billingGroup.GetName()) // "billing_group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of billing_groups |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BillingGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BillingGroup(nil).Load(map[string]any{"id": "billing_group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.BillingGroup(nil).Create(map[string]any{
    "id": "example_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingGroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BookletEntity

```go
booklet := client.Booklet(nil)
fmt.Println(booklet.GetName()) // "booklet"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `carrier` | `string` | No |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of booklets |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No | An internal description that identifies this resource. |
| `expected_delivery_date` | `string` | No |  |
| `from` | `map[string]any` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No | A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href="https://lob.com/pricing/print-mail#compare" target="_blank">cheaper option</a> which is less predictable and takes longer to delive… |
| `merge_variables` | `map[string]any` | No | You can input a merge variable payload object to your template or QR code redirect URLs to render dynamic content. |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `pages` | `int` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No | A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `source_material` | `string` | No |  |
| `thumbnails` | `[]any` | No |  |
| `to` | `map[string]any` | No |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No | An array of tracking events ordered by ascending `time`. |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Booklet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Booklet(nil).Load(map[string]any{"id": "booklet_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Booklet(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Booklet(nil).Remove(map[string]any{"id": "booklet_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BookletEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BuckslipEntity

```go
buckslip := client.Buckslip(nil)
fmt.Println(buckslip.GetName()) // "buckslip"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `allocated_quantity` | `float64` | Yes | The allocated quantity of buckslips. |
| `auto_reorder` | `bool` | Yes | True if the buckslips should be auto-reordered. |
| `available_quantity` | `float64` | Yes | The available quantity of buckslips. |
| `back_original_url` | `string` | Yes | The original URL of the back template. |
| `buckslip_orders` | `[]any` | Yes | An array of buckslip orders that are associated with the buckslip. |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of buckslips |
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
| `onhand_quantity` | `float64` | Yes | The onhand quantity of buckslips. |
| `pending_quantity` | `float64` | Yes | The pending quantity of buckslips. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `projected_quantity` | `float64` | Yes | The sum of pending and onhand quantities of buckslips. |
| `raw_url` | `string` | Yes | The raw URL of the buckslip. |
| `reorder_quantity` | `int` | Yes | The number of buckslips to be reordered. |
| `send_date` | `string` | No |  |
| `size` | `string` | No | The size of the buckslip |
| `status` | `string` | Yes |  |
| `stock` | `string` | Yes |  |
| `threshold_amount` | `int` | Yes | The threshold amount of the buckslip |
| `thumbnails` | `[]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Buckslip(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Buckslip(nil).Load(map[string]any{"id": "buckslip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Buckslip(nil).Update(map[string]any{
    "id": "buckslip_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Buckslip(nil).Remove(map[string]any{"id": "buckslip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BuckslipEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BuckslipOrderEntity

```go
buckslipOrder := client.BuckslipOrder(nil)
fmt.Println(buckslipOrder.GetName()) // "buckslip_order"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | List of buckslip orders |
| `id` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `quantity` | `int` | Yes | The quantity of buckslips in the order (minimum 5,000). |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.BuckslipOrder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BuckslipOrderEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CampaignEntity

```go
campaign := client.Campaign(nil)
fmt.Println(campaign.GetName()) // "campaign"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_cancel_if_ncoa` | `bool` | No | Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA. |
| `billing_group_id` | `string` | No | Unique identifier prefixed with `bg_`. |
| `cancel_window_campaign_minutes` | `int` | No | A window, in minutes, within which the campaign can be canceled. |
| `count` | `int` | No | number of resources in a set |
| `creatives` | `[]any` | Yes | An array of creatives that have been associated with this campaign. |
| `data` | `[]any` | No | list of campaigns |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `id` | `string` | Yes | Unique identifier prefixed with `cmp_`. |
| `is_draft` | `bool` | Yes | Whether or not the campaign is still a draft. |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `name` | `string` | Yes | Name of the campaign. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `print_speed` | `string` | No | A string designating the mail speed type: * `core` - 2 production business days |
| `schedule_type` | `string` | Yes | How the campaign should be scheduled. |
| `send_date` | `string` | No | If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign. |
| `target_delivery_date` | `string` | No | If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `uploads` | `[]any` | Yes | A single-element array containing the upload object that is assocated with this campaign. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Campaign(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Campaign(nil).Load(map[string]any{"id": "campaign_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Campaign(nil).Update(map[string]any{
    "id": "campaign_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Campaign(nil).Remove(map[string]any{"id": "campaign_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CampaignEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardEntity

```go
card := client.Card(nil)
fmt.Println(card.GetName()) // "card"
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
| `data` | `[]any` | No | list of cards |
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
| `thumbnails` | `[]any` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Card(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Card(nil).Load(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Card(nil).Remove(map[string]any{"id": "card_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CardOrderEntity

```go
cardOrder := client.CardOrder(nil)
fmt.Println(cardOrder.GetName()) // "card_order"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | List of card orders |
| `id` | `string` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `quantity` | `int` | Yes | The quantity of cards in the order (minimum 10,000). |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CardOrder(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CardOrderEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CheckEntity

```go
check := client.Check(nil)
fmt.Println(check.GetName()) // "check"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float64` | Yes | The payment amount to be sent in US dollars. |
| `attachment_template_id` | `string` | No |  |
| `attachment_template_version_id` | `string` | No |  |
| `bank_account` | `any` | Yes |  |
| `carrier` | `string` | Yes |  |
| `check_bottom_template_id` | `string` | No |  |
| `check_bottom_template_version_id` | `string` | No |  |
| `check_number` | `int` | No |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of checks |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` | No |  |
| `from` | `any` | No |  |
| `id` | `string` | Yes | Unique identifier prefixed with `chk_`. |
| `mail_type` | `string` | No |  |
| `memo` | `string` | No |  |
| `merge_variables` | `map[string]any` | No |  |
| `message` | `string` | No |  |
| `metadata` | `map[string]any` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` | No |  |
| `to` | `any` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No | An array of tracking_event objects ordered by ascending `time`. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Check(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Check(nil).Load(map[string]any{"id": "check_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Check(nil).Remove(map[string]any{"id": "check_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CheckEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CreativeEntity

```go
creative := client.Creative(nil)
fmt.Println(creative.GetName()) // "creative"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaigns` | `[]any` | Yes | Array of campaigns associated with the creative ID |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `details` | `map[string]any` | No |  |
| `from` | `string` | No | Must either be an address ID or an inline object with correct address parameters. |
| `id` | `string` | Yes | Unique identifier prefixed with `crv_`. |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No |  |
| `template_preview_urls` | `map[string]any` | Yes | Preview URLs associated with a creative's artwork asset(s) if the creative uses HTML templates as assets. |
| `template_previews` | `[]any` | Yes | A list of template preview objects if the creative uses HTML template(s) as artwork asset(s). |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Creative(nil).Load(map[string]any{"id": "creative_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Creative(nil).Update(map[string]any{
    "id": "creative_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreativeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainEntity

```go
domain := client.Domain(nil)
fmt.Println(domain.GetName()) // "domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `created_at` | `string` | No | The date and time the domain was created. |
| `data` | `[]any` | No | List of domains. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Domain(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Domain(nil).Remove(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IdentityValidationEntity

```go
identityValidation := client.IdentityValidation(nil)
fmt.Println(identityValidation.GetName()) // "identity_validation"
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.IdentityValidation(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IdentityValidationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntlVerificationEntity

```go
intlVerification := client.IntlVerification(nil)
fmt.Println(intlVerification.GetName()) // "intl_verification"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `[]any` | Yes |  |
| `components` | `map[string]any` | No |  |
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntlVerificationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LetterEntity

```go
letter := client.Letter(nil)
fmt.Println(letter.GetName()) // "letter"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_placement` | `string` | No |  |
| `cards` | `[]any` | No |  |
| `carrier` | `string` | No |  |
| `color` | `bool` | No |  |
| `count` | `int` | No | number of resources in a set |
| `custom_envelope` | `string` | No |  |
| `data` | `[]any` | No | list of letters |
| `date_created` | `string` | No |  |
| `date_modified` | `string` | No |  |
| `description` | `string` | No |  |
| `double_sided` | `bool` | No |  |
| `expected_delivery_date` | `string` | No |  |
| `extra_service` | `string` | No |  |
| `from` | `map[string]any` | No |  |
| `fsc` | `bool` | No |  |
| `id` | `string` | No |  |
| `mail_type` | `string` | No |  |
| `merge_variables` | `map[string]any` | No |  |
| `metadata` | `map[string]any` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `perforated_page` | `string` | No |  |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `return_envelope` | `bool` | No |  |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `thumbnails` | `[]any` | No |  |
| `to` | `map[string]any` | No |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No |  |
| `tracking_number` | `string` | No |  |
| `url` | `string` | No |  |
| `use_type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Letter(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Letter(nil).Load(map[string]any{"id": "letter_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Letter(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Letter(nil).Remove(map[string]any{"id": "letter_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LetterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LinkEntity

```go
link := client.Link(nil)
fmt.Println(link.GetName()) // "link"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | List of links |
| `domain` | `string` | No | The registered domain to be used for the short URL. |
| `id` | `string` | No |  |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `redirect_link` | `string` | Yes | The original target URL. |
| `slug` | `string` | No | The unique path for the shortened URL, if empty a unique path will be used. |
| `title` | `string` | No | The title of the URL. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Link(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Link(nil).Load(map[string]any{"id": "link_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Link(nil).Create(map[string]any{
    "redirect_link": "example_redirect_link",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Link(nil).Update(map[string]any{
    "id": "link_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Link(nil).Remove(map[string]any{"id": "link_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LobCreditsBalanceEntity

```go
lobCreditsBalance := client.LobCreditsBalance(nil)
fmt.Println(lobCreditsBalance.GetName()) // "lob_credits_balance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `float64` | Yes | Account's current balance of Lob Credits. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.LobCreditsBalance(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LobCreditsBalanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PostcardEntity

```go
postcard := client.Postcard(nil)
fmt.Println(postcard.GetName()) // "postcard"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `back_template_id` | `string` | Yes | The unique ID of the HTML template used for the back of the postcard. |
| `back_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the back of the postcard. |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of postcards |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` | No |  |
| `from` | `any` | No |  |
| `front_template_id` | `string` | Yes | The unique ID of the HTML template used for the front of the postcard. |
| `front_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the front of the postcard. |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `psc_`. |
| `metadata` | `map[string]any` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` | No |  |
| `to` | `any` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No | An array of tracking_event objects ordered by ascending `time`. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Postcard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Postcard(nil).Load(map[string]any{"id": "postcard_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Postcard(nil).Remove(map[string]any{"id": "postcard_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PostcardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QrCodeEntity

```go
qrCode := client.QrCode(nil)
fmt.Println(qrCode.GetName()) // "qr_code"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | List of QR code analytics |
| `object` | `string` | No | Value is resource type. |
| `scanned_count` | `int` | No | Indicates the number of QR Codes out of `count` that were scanned atleast once. |
| `total_count` | `int` | No | Indicates the total number of records. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.QrCode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QrCodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResourceProofEntity

```go
resourceProof := client.ResourceProof(nil)
fmt.Println(resourceProof.GetName()) // "resource_proof"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `errors` | `[]any` | No | Errors encountered during processing. |
| `id` | `string` | Yes | Unique identifier prefixed with `res_prf_`. |
| `object` | `string` | Yes | Value is resource type. |
| `resource_type` | `string` | No | The type of resource to generate a proof for. |
| `status` | `string` | No | The processing status of the resource proof. |
| `template_id` | `string` | No | The template ID associated with the resource proof, if any. |
| `thumbnails` | `[]any` | No | Thumbnail images of the resource proof. |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ResourceProof(nil).Load(map[string]any{"id": "resource_proof_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ResourceProof(nil).Update(map[string]any{
    "id": "resource_proof_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResourceProofEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResponseEntity

```go
response := client.Response(nil)
fmt.Println(response.GetName()) // "response"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | Yes | Your Lob account id. |
| `brand_name` | `string` | No |  |
| `campaign_code` | `string` | Yes | The campaign code associated with the Informed Delivery campaign. |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of Informed Delivery campaigns |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Response(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Response(nil).Load(map[string]any{"usps_campaign_id": "usps_campaign_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Response(nil).Update(map[string]any{
    "usps_campaign_id": "usps_campaign_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResponseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReverseGeocodeEntity

```go
reverseGeocode := client.ReverseGeocode(nil)
fmt.Println(reverseGeocode.GetName()) // "reverse_geocode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `[]any` | No | list of addresses |
| `id` | `string` | No | Unique identifier prefixed with `us_reverse_geocode_`. |
| `latitude` | `float64` | Yes | A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. |
| `longitude` | `float64` | Yes | A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. |
| `object` | `string` | No | Value is resource type. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReverseGeocodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SelfMailerEntity

```go
selfMailer := client.SelfMailer(nil)
fmt.Println(selfMailer.GetName()) // "self_mailer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of self_mailers |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` | No |  |
| `from` | `any` | No |  |
| `fsc` | `bool` | No | This is in beta. |
| `id` | `string` | Yes | Unique identifier prefixed with `sfm_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the self mailer. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the self mailer. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `map[string]any` | No |  |
| `metadata` | `map[string]any` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the self mailer. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the self mailer. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` | No |  |
| `to` | `any` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No | An array of certified tracking events ordered by ascending `time`. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SelfMailer(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SelfMailer(nil).Load(map[string]any{"id": "self_mailer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.SelfMailer(nil).Remove(map[string]any{"id": "self_mailer_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SelfMailerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SnapPackEntity

```go
snapPack := client.SnapPack(nil)
fmt.Println(snapPack.GetName()) // "snap_pack"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `campaign_id` | `string` | No | Denotes resources created by the provided campaign id, prefixed with `cmp_`. |
| `carrier` | `string` | Yes |  |
| `color` | `bool` | No | Set this key to `true` if you would like to print in color. |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of snap_packs |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No |  |
| `expected_delivery_date` | `string` | No | A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`. |
| `failure_reason` | `map[string]any` | No |  |
| `from` | `any` | No |  |
| `fsc` | `bool` | No | Contact support@lob.com or your account contact to learn more. |
| `id` | `string` | Yes | Unique identifier prefixed with `ord_`. |
| `inside_template_id` | `string` | No | The unique ID of the HTML template used for the inside of the snap pack. |
| `inside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the inside of the snap pack. |
| `mail_type` | `string` | No |  |
| `merge_variables` | `map[string]any` | No |  |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `outside_template_id` | `string` | No | The unique ID of the HTML template used for the outside of the snap pack. |
| `outside_template_version_id` | `string` | No | The unique ID of the specific version of the HTML template used for the outside of the snap pack. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `send_date` | `string` | No |  |
| `size` | `string` | No |  |
| `sla` | `string` | No |  |
| `status` | `string` | No | A string describing the PDF render status: * `processed` - the rendering process is currently in progress. |
| `thumbnails` | `[]any` | No |  |
| `to` | `any` | Yes |  |
| `total_count` | `int` | No | Indicates the total number of records. |
| `tracking_events` | `[]any` | No | An array of tracking events ordered by ascending `time`. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SnapPack(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SnapPack(nil).Load(map[string]any{"id": "snap_pack_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.SnapPack(nil).Remove(map[string]any{"id": "snap_pack_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SnapPackEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TemplateEntity

```go
template := client.Template(nil)
fmt.Println(template.GetName()) // "template"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of templates |
| `date_created` | `string` | No | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | No | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `tmpl_`. |
| `metadata` | `map[string]any` | No | Use metadata to store custom information for tagging and labeling back to your internal systems. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | No | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `published_version` | `any` | Yes |  |
| `required_vars` | `[]any` | No | An array of required variables to be used in a template. |
| `total_count` | `int` | No | Indicates the total number of records. |
| `versions` | `[]any` | Yes | An array of all non-deleted [version objects](#tag/Template-Versions) associated with the template. |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Template(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Template(nil).Load(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Template(nil).Remove(map[string]any{"id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TemplateVersionEntity

```go
templateVersion := client.TemplateVersion(nil)
fmt.Println(templateVersion.GetName()) // "template_version"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | number of resources in a set |
| `data` | `[]any` | No | list of template versions |
| `date_created` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was created. |
| `date_modified` | `string` | Yes | A timestamp in ISO 8601 format of the date the resource was last modified. |
| `deleted` | `bool` | No | Only returned if the resource has been successfully deleted. |
| `description` | `string` | No | An internal description that identifies this resource. |
| `engine` | `string` | No | The engine used to combine HTML template with merge variables. |
| `html` | `string` | Yes | An HTML string of less than 100,000 characters to be used as the `published_version` of this template. |
| `id` | `string` | Yes | Unique identifier prefixed with `vrsn_`. |
| `merge_variables` | `map[string]any` | No | Object representing the keys of every merge variable present in the template. |
| `next_url` | `string` | No | Url of next page of items in list. |
| `object` | `string` | Yes | Value is resource type. |
| `previous_url` | `string` | No | Url of previous page of items in list. |
| `required_vars` | `[]any` | No | An array of required variables to be used in a template. |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TemplateVersion(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TemplateVersion(nil).Load(map[string]any{"id": "template_version_id", "template_id": "template_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateVersionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TemplateVersionDeletionEntity

```go
templateVersionDeletion := client.TemplateVersionDeletion(nil)
fmt.Println(templateVersionDeletion.GetName()) // "template_version_deletion"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.TemplateVersionDeletion(nil).Remove(map[string]any{"template_id": "template_id", "vrsn_id": "vrsn_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TemplateVersionDeletionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UploadEntity

```go
upload := client.Upload(nil)
fmt.Println(upload.GetName()) // "upload"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | `string` | Yes | Account ID that made the request |
| `bytesProcessed` | `int` | Yes | Number of bytes processed in your CSV |
| `campaignId` | `any` | Yes |  |
| `dateCreated` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was created |
| `dateModified` | `string` | Yes | A timestamp in ISO 8601 format of the date the export was last modified |
| `deleted` | `bool` | Yes | Returns as `true` if the resource has been successfully deleted. |
| `failedMailpieces` | `int` | Yes | Number of mailpieces that failed to create |
| `failuresUrl` | `string` | No | Url where your campaign mailpiece failures can be retrieved |
| `id` | `string` | Yes | Unique identifier prefixed with `ex_`. |
| `mergeVariableColumnMapping` | `map[string]any` | No | test |
| `metadata` | `map[string]any` | Yes | The list of column headers in your file as an array that you want as metadata associated with each mailpiece. |
| `mode` | `string` | Yes | The environment in which the mailpieces were created. |
| `optionalAddressColumnMapping` | `map[string]any` | Yes | The mapping of column headers in your file to Lob-optional fields for the resource created. |
| `originalFilename` | `string` | No | Filename of the upload |
| `requiredAddressColumnMapping` | `map[string]any` | Yes | The mapping of column headers in your file to Lob-required fields for the resource created. |
| `s3Url` | `string` | Yes | The URL for the generated export file. |
| `state` | `string` | Yes | The state of the export file, which can be `in_progress`, `failed` or `succeeded`. |
| `totalMailpieces` | `int` | Yes | Total number of recipients for the campaign |
| `type` | `string` | Yes | The export file type, which can be `all`, `failures` or `successes`. |
| `uploadId` | `string` | Yes | Unique identifier prefixed with `upl_`. |
| `validatedMailpieces` | `int` | Yes | Number of mailpieces that were successfully created |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Upload(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Upload(nil).Load(map[string]any{"id": "upload_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Upload(nil).Update(map[string]any{
    "id": "upload_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Upload(nil).Remove(map[string]any{"id": "upload_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UploadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UploadCreateExportEntity

```go
uploadCreateExport := client.UploadCreateExport(nil)
fmt.Println(uploadCreateExport.GetName()) // "upload_create_export"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exportId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `message` | `string` | Yes |  |
| `type` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UploadCreateExportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UsAutocompletionEntity

```go
usAutocompletion := client.UsAutocompletion(nil)
fmt.Println(usAutocompletion.GetName()) // "us_autocompletion"
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
| `suggestions` | `[]any` | No | An array of objects representing suggested addresses. |
| `zip_code` | `string` | No | An optional ZIP Code input used to filter suggestions. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.UsAutocompletion(nil).Create(map[string]any{
    "address_prefix": "example_address_prefix",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UsAutocompletionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UsVerificationEntity

```go
usVerification := client.UsVerification(nil)
fmt.Println(usVerification.GetName()) // "us_verification"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addresses` | `[]any` | Yes |  |
| `components` | `map[string]any` | Yes | A nested object containing a breakdown of each component of an address. |
| `deliverability` | `string` | No | Summarizes the deliverability of the `us_verification` object. |
| `deliverability_analysis` | `map[string]any` | Yes | A nested object containing a breakdown of the deliverability of an address. |
| `errors` | `bool` | Yes | Indicates whether any errors occurred during the verification process. |
| `id` | `string` | No | Unique identifier prefixed with `us_ver_`. |
| `last_line` | `string` | No | Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`) |
| `lob_confidence_score` | `map[string]any` | Yes | Lob Confidence Score is a nested object that provides a numerical value between 0-100 of the likelihood that an address is deliverable based on Lob’s mail delivery data to over half of US households. |
| `object` | `string` | No | Value is resource type. |
| `primary_line` | `string` | No | The primary delivery line (usually the street address) of the address. |
| `recipient` | `string` | No | The intended recipient, typically a person's or firm's name. |
| `secondary_line` | `string` | No | The secondary delivery line of the address. |
| `urbanization` | `string` | No | Only present for addresses in Puerto Rico. |
| `valid_address` | `bool` | No | This field indicates whether an address was found in a more comprehensive address dataset that includes sources from the USPS, open source mapping data, and our proprietary mail delivery data. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UsVerificationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ZipEntity

```go
zip := client.Zip(nil)
fmt.Println(zip.GetName()) // "zip"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `zip_code` | `string` | Yes | A 5-digit ZIP code. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Zip(nil).Create(map[string]any{
    "zip_code": "example_zip_code",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ZipEntity` instance with the same client and
options.

#### `GetName() string`

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

```go
client := sdk.NewLobSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

