# Lob

The Lob API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and uses HTTP response codes to indicate any API errors.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 33 entities and 105 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Address

Results: Echos the writable fields of a newly created address object.; A dictionary with a data property that contains an array of up to `limit` addresses. Each entry in the array is a separate address object. The previous and next page of address entries can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more addresses are available beyond the current set of returned results, the `next_url` field will be empty.; Returns an address object if a valid identifier was provided.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `address_country`: Full name of country
- `address_line1`: The primary number, street name, and directional information.
- `address_line2`: An optional field containing any information which can&#39;t fit into line 1.
- `address_state`: 2 letter state short-name code
- `address_zip`: Must follow the ZIP format of `12345` or ZIP+4 format of `12345-1234`.

### BankAccount

Results: Returns a bank_account object; A dictionary with a data property that contains an array of up to `limit` bank_accounts. Each entry in the array is a separate bank_account. The previous and next page of bank_accounts can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more bank_accounts are available beyond the current set of returned results, the `next_url` field will be empty.; Returns a bank account object.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `account_type`: The type of entity that holds the account.
- `bank_name`: The name of the bank based on the provided routing number, for example `JPMORGAN CHASE BANK`.
- `check_template`: The check template used for printing. The defualt value is `common`. If you bank with JP Morgan Chase and wish to use Positive Pay use the `jpm` template. `jpm` requires additional information to be provided.
- `city`: The city associated with your home bank account. Required for the `jpm` check template only. Please contact a bank representative if you do not know the city associated with your home bank institution.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.

### BankDeletion

Results: Deleted.

SDK operations: `remove`.

### BillingGroup

Results: Returns a billing group object; Returns a list of billing_groups.; Returns a billing_group object.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `description`: Description of the billing group.
- `id`: Unique identifier prefixed with `bg_`.
- `name`: Name of the billing group.

### Booklet

Results: Returns a booklet object; A dictionary with a data property that contains an array of up to `limit` booklets. Each entry in the array is a separate booklet. The previous and next page of booklets can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more booklets are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.
- `expected_delivery_date`: A date in YYYY-MM-DD format of the mailpiece&#39;s expected delivery date based on its `send_date`.
- `fsc`: This is in beta. Contact support@lob.com or your account contact to learn more.

### Buckslip

Results: Buckslip created successfully; Returns a list of buckslip objects; Returns a buckslip object; Deleted the buckslip.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `allocated_quantity`: The allocated quantity of buckslips.
- `auto_reorder`: True if the buckslips should be auto-reordered.
- `available_quantity`: The available quantity of buckslips.
- `back_original_url`: The original URL of the back template.
- `buckslip_orders`: An array of buckslip orders that are associated with the buckslip.

### BuckslipOrder

Results: Buckslip order created successfully; Returns the buckslip orders associated with the given buckslip id.

SDK operations: `create`, `list`.

Key fields to recognise:

- `availability_date`: A timestamp in ISO 8601 format of the date the resource was created.
- `buckslip_id`: Unique identifier prefixed with `bck_`.
- `cancelled_reason`: The reason for cancellation.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### Campaign

Results: Returns a campaign object; Campaign created successfully; A dictionary with a data property that contains an array of up to `limit` campaigns. Each entry in the array is a separate campaign. The previous and next page of campaigns can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more campaigns are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted the campaign.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `auto_cancel_if_ncoa`: Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.
- `billing_group_id`: Unique identifier prefixed with `bg_`.
- `cancel_window_campaign_minutes`: A window, in minutes, within which the campaign can be canceled.
- `creatives`: An array of creatives that have been associated with this campaign.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.

### Card

Results: Returns a card object; Card created successfully; Returns a list of card objects; Deleted the card.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `auto_reorder`: True if the cards should be auto-reordered.
- `available_quantity`: The available quantity of cards.
- `back_original_url`: The original URL of the back template.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### CardOrder

Results: Card order created successfully; Returns the card orders associated with the given card id.

SDK operations: `create`, `list`.

Key fields to recognise:

- `availability_date`: A timestamp in ISO 8601 format of the date the resource was created.
- `cancelled_reason`: The reason for cancellation.
- `card_id`: Unique identifier prefixed with `card_`.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### Check

Results: Returns a check object; A dictionary with a data property that contains an array of up to `limit` checks. Each entry in the array is a separate check. The previous and next page of checks can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more checks are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `amount`: The payment amount to be sent in US dollars.
- `check_number`: An integer that designates the check number. If `check_number` is not provided, checks created from a new `bank_account` will start at `10000` and increment with each check created with the `bank_account`. A provided `check_number` overrides the defaults. Subsequent checks created with the same `bank_account` will increment from the provided check number.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.

### Creative

Results: Creative created successfully; Returns a creative object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `campaigns`: Array of campaigns associated with the creative ID
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.

### Domain

Results: Returns a domain object with details.; Returns a list of all domains.; Returns domain related details.; Returns the deleted link object.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `created_at`: The date and time the domain was created.
- `domain`: The registered domain/hostname.
- `error_redirect_link`: URL to redirect customers if a short link is broken or inactive.
- `id`: Unique identifier for a domain.
- `status`: The configuration status of the domain.

### IdentityValidation

Results: Returns the likelihood a given name is associated with an address.

SDK operations: `create`.

Key fields to recognise:

- `confidence`: Indicates the likelihood the recipient name and address match based on our custom internal calculation. Possible values are: - `high`, Has a Lob confidence score greater than 70. - `medium`, Has a Lob confidence score between 40 and 70. - `low`, Has a Lob confidence score less than 40. - `&quot;&quot;`, No tracking data exists for this address.
- `id`: Unique identifier prefixed with `id_validation_`.
- `last_line`: Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`)
- `object`: Value is resource type.
- `primary_line`: The primary delivery line (usually the street address) of the address. Combination of the following applicable `components`: * `primary_number` * `street_predirection` * `street_name` * `street_suffix` * `street_postdirection` * `secondary_designator` * `secondary_number` * `pmb_designator` * `pmb_number`

### IntlVerification

Results: Returns an international verification object.; Returns an array of international verification objects.

SDK operations: `create`.

Key fields to recognise:

- `components`: A nested object containing a breakdown of each component of an address.
- `country`: The country of the address. Will be returned as a 2 letter country short-name code (ISO 3166).
- `coverage`: The coverage level for the country. This represents the maximum level of accuracy an input address can be verified to. * `SUBBUILDING` - Coverage down to unit numbers. For example, in an apartment or a large building * `HOUSENUMBER/BUILDING` - Coverage down to house number. For example, the address where a house or building may be located * `STREET` - Coverage down to street. This means that we can verify that an street exists in a city, state, country * `LOCALITY` - Coverage down to city, state, or village or province. This means that we can verify that a city, village, province, or state exists in a country. Countries differ in how they define what is a province, state, city, village, etc. This attempts to group eveyrthing together. * `SPARSE` - Some addresses for this country exist in our databases
- `deliverability`: Summarizes the deliverability of the `intl_verification` object. Possible values are: * `deliverable`, The address is deliverable. * `deliverable_missing_info`, The address is missing some information, but is most likely deliverable. * `undeliverable`, The address is most likely not deliverable. Some components of the address (such as city or postal code) may have been found. * `no_match`, This address is not deliverable. No matching street could be found within the city or postal code.
- `errors`: Indicates whether any errors occurred during the verification process.

### Letter

Results: Returns a letter object; A dictionary with a data property that contains an array of up to `limit` letters. Each entry in the array is a separate letter. The previous and next page of letters can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more letters are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `address_placement`: Specifies the location of the address information that will show through the double-window envelope. To see how this will impact your letter design, view our letter template. Some values are exclusive to certain customers. Upgrade to the appropriate &lt;a href=&quot;https://dashboard.lob.com/#/settings/editions&quot; target=&quot;_blank&quot;&gt;Print &amp; Mail Edition&lt;/a&gt; to gain access. * `top_first_page` - (default) print address information at the top of your provided first page * `insert_blank_page` - insert a blank address page at the beginning of your file (you will be charged for the extra page) * `bottom_first_page_center` - **(exclusive, deprecation planned within a few months)** print address information at the bottom center of your provided first page * `bottom_first_page` - **(exclusive)** print address information at the bottom of your provided first page
- `cards`: An array of cards associated with a specific letter
- `color`: Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
- `custom_envelope`: A nested custom envelope object containing more information about the custom envelope used or `null` if a custom envelope was not used.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.

### Link

Results: Returns a successfully created link.; Returns the deleted link object.; Returns a single link.; Returns the deleted short link object; Returns the updated link.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: The date and time the link was created.
- `domain`: The registered domain to be used for the short URL.
- `domain_id`: A unique identifier for the registered domain.
- `id`: Unique identifier prefixed with `lnk_`.
- `metadata`: Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `&quot;` and `\`. that is &#39;&#123;&quot;customer_id&quot; : &quot;NEWYORK2015&quot;&#125;&#39; Nested objects are not supported. See [Metadata](#section/Metadata) for more information.

### LobCreditsBalance

Results: Returns a lob_credits_balance object.

SDK operations: `load`.

Key fields to recognise:

- `balance`: Account&#39;s current balance of Lob Credits. Can be positive, negative, or zero.

### Postcard

Results: Returns a postcard object; A dictionary with a data property that contains an array of up to `limit` postcards. Each entry in the array is a separate postcard. The previous and next page of postcards can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more postcards are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `back_template_id`: The unique ID of the HTML template used for the back of the postcard. Only filled out when the request contains a valid postcard template ID.
- `back_template_version_id`: The unique ID of the specific version of the HTML template used for the back of the postcard. Only filled out when the request contains a valid postcard template ID.
- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### QrCode

Results: Returns a list of QR Codes and their analytics.

SDK operations: `list`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `number_of_scans`: Number of times the QR Code associated with this mail piece was scanned.
- `resource_id`: Unique identifier for each mail piece.
- `scans`: Detailed scan information associated with each mail piece.

### ResourceProof

Results: Returns a resource proof object; Returns an updated resource proof object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `errors`: Errors encountered during processing.
- `id`: Unique identifier prefixed with `res_prf_`.
- `object`: Value is resource type.

### Response

Results: Creative created successfully; A dictionary with a data property that contains an array of up to `limit` Informed Delivery campaigns. Each entry in the array is a separate campaign. The previous and next page of campaigns can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more campaigns are available beyond the current set of returned results, the `next_url` field will be empty.; Returns a informed delivery campaign object; Returns an Informed Delivery campaign object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `account_id`: Your Lob account id.
- `brand_name`: The brand name you would like included in the informed delivery email. Will default to the “company” on the users account.
- `campaign_code`: The campaign code associated with the Informed Delivery campaign.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### ReverseGeocode

Results: Returns a zip lookup object if a valid zip was provided.

SDK operations: `create`.

Key fields to recognise:

- `addresses`: list of addresses
- `id`: Unique identifier prefixed with `us_reverse_geocode_`.
- `latitude`: A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. This should be used with `longitude` to pinpoint locations on a map. Will not be returned for undeliverable addresses or military addresses (state is `AA`, `AE`, or `AP`).
- `longitude`: A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. This should be used with `latitude` to pinpoint locations on a map. Will not be returned for undeliverable addresses or military addresses (state is `AA`, `AE`, or `AP`).
- `object`: Value is resource type.

### SelfMailer

Results: Returns a self_mailer object; A dictionary with a data property that contains an array of up to `limit` self_mailers. Each entry in the array is a separate self_mailer. The previous and next page of self_mailers can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more self_mailers are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.

### SnapPack

Results: Returns a snap_pack object; A dictionary with a data property that contains an array of up to `limit` snap_packs. Each entry in the array is a separate self_mailer. The previous and next page of snap_packs can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more snap_packs are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `color`: Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.

### Template

Results: Returns the updated template object; Returns a template object; A dictionary with a data property that contains an array of up to `limit` templates. Each entry in the array is a separate template. The previous and next page of templates can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more templates are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.
- `engine`: The engine used to combine HTML template with merge variables. * `legacy` - Lob&#39;s original engine * `handlebars`

### TemplateVersion

Results: Returns the template version with the given template and version ids.; A dictionary with a data property that contains an array of up to `limit` template versions. Each entry in the array is a separate template version object. The previous and next page of template versions can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more template versions are available beyond the current set of returned results, the `next_url` field will be empty.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.
- `engine`: The engine used to combine HTML template with merge variables. * `legacy` - Lob&#39;s original engine * `handlebars`

### TemplateVersionDeletion

Results: Deleted.

SDK operations: `remove`.

### Upload

Results: Successful Response; Upload created successfully; Returns an report object; An array of matching uploads. Each entry in the array is a separate upload.; Returns an export object; Returns an upload object.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `accountId`: Account ID that made the request
- `bytesProcessed`: Number of bytes processed in your CSV
- `dateCreated`: A timestamp in ISO 8601 format of the date the upload was created
- `dateModified`: A timestamp in ISO 8601 format of the date the upload was last modified
- `deleted`: Returns as `true` if the resource has been successfully deleted.

### UploadCreateExport

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `message`: A human-readable message with more details about the error

### UsAutocompletion

Results: Returns a US autocompletion object.

SDK operations: `create`.

Key fields to recognise:

- `address_prefix`: Only accepts numbers and street names in an alphanumeric format.
- `city`: An optional city input used to filter suggestions.
- `geo_ip_sort`: If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.
- `id`: Unique identifier prefixed with `us_auto_`.
- `object`: Value is resource type.

### UsVerification

Results: Returns a list of US verification objects.; Returns a US verification object.

SDK operations: `create`.

Key fields to recognise:

- `components`: A nested object containing a breakdown of each component of an address.
- `deliverability`: Summarizes the deliverability of the `us_verification` object. For full details, see the `deliverability_analysis` field. Possible values are: * `deliverable` – The address is deliverable by the USPS. * `deliverable_unnecessary_unit` – The address is deliverable, but the secondary unit information is unnecessary. * `deliverable_incorrect_unit` – The address is deliverable to the building&#39;s default address but the secondary unit provided may not exist. There is a chance the mail will not reach the intended recipient. * `deliverable_missing_unit` – The address is deliverable to the building&#39;s default address but is missing secondary unit information. There is a chance the mail will not reach the intended recipient. * `undeliverable` – The address is not deliverable according to the USPS.
- `deliverability_analysis`: A nested object containing a breakdown of the deliverability of an address.
- `errors`: Indicates whether any errors occurred during the verification process.
- `id`: Unique identifier prefixed with `us_ver_`.

### Zip

Results: Returns a zip lookup object if a valid zip was provided.

SDK operations: `create`.

Key fields to recognise:

- `zip_code`: A 5-digit ZIP code.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Address | `create` | `POST /addresses` | Required |
| Address | `list` | `GET /addresses` | Required |
| Address | `load` | `GET /addresses/{adr_id}` | Required |
| Address | `remove` | `DELETE /addresses/{adr_id}` | Required |
| BankAccount | `create` | `POST /bank_accounts/{bank_id}/verify` | Required |
| BankAccount | `create` | `POST /bank_accounts` | Required |
| BankAccount | `list` | `GET /bank_accounts` | Required |
| BankAccount | `load` | `GET /bank_accounts/{bank_id}` | Required |
| BankDeletion | `remove` | `DELETE /bank_accounts/{bank_id}` | Required |
| BillingGroup | `create` | `POST /billing_groups/{bg_id}` | Required |
| BillingGroup | `create` | `POST /billing_groups` | Required |
| BillingGroup | `list` | `GET /billing_groups` | Required |
| BillingGroup | `load` | `GET /billing_groups/{bg_id}` | Required |
| Booklet | `create` | `POST /booklets` | Required |
| Booklet | `list` | `GET /booklets` | Required |
| Booklet | `load` | `GET /booklets/{booklet_id}` | Required |
| Booklet | `remove` | `DELETE /booklets/{booklet_id}` | Required |
| Buckslip | `create` | `POST /buckslips` | Required |
| Buckslip | `list` | `GET /buckslips` | Required |
| Buckslip | `load` | `GET /buckslips/{buckslip_id}` | Required |
| Buckslip | `remove` | `DELETE /buckslips/{buckslip_id}` | Required |
| Buckslip | `update` | `PATCH /buckslips/{buckslip_id}` | Required |
| BuckslipOrder | `create` | `POST /buckslips/{buckslip_id}/orders` | Required |
| BuckslipOrder | `list` | `GET /buckslips/{buckslip_id}/orders` | Required |
| Campaign | `create` | `POST /campaigns/{cmp_id}/send` | Required |
| Campaign | `create` | `POST /campaigns` | Required |
| Campaign | `list` | `GET /campaigns` | Required |
| Campaign | `load` | `GET /campaigns/{cmp_id}` | Required |
| Campaign | `remove` | `DELETE /campaigns/{cmp_id}` | Required |
| Campaign | `update` | `PATCH /campaigns/{cmp_id}` | Required |
| Card | `create` | `POST /cards/{card_id}` | Required |
| Card | `create` | `POST /cards` | Required |
| Card | `list` | `GET /cards` | Required |
| Card | `load` | `GET /cards/{card_id}` | Required |
| Card | `remove` | `DELETE /cards/{card_id}` | Required |
| CardOrder | `create` | `POST /cards/{card_id}/orders` | Required |
| CardOrder | `list` | `GET /cards/{card_id}/orders` | Required |
| Check | `create` | `POST /checks` | Required |
| Check | `list` | `GET /checks` | Required |
| Check | `load` | `GET /checks/{chk_id}` | Required |
| Check | `remove` | `DELETE /checks/{chk_id}` | Required |
| Creative | `create` | `POST /creatives` | Required |
| Creative | `load` | `GET /creatives/{crv_id}` | Required |
| Creative | `update` | `PATCH /creatives/{crv_id}` | Required |
| Domain | `create` | `POST /domains` | Required |
| Domain | `list` | `GET /domains` | Required |
| Domain | `load` | `GET /domains/{domain_id}` | Required |
| Domain | `remove` | `DELETE /domains/{domain_id}` | Required |
| IdentityValidation | `create` | `POST /identity_validation` | Required |
| IntlVerification | `create` | `POST /intl_verifications` | Required |
| IntlVerification | `create` | `POST /bulk/intl_verifications` | Required |
| Letter | `create` | `POST /letters` | Required |
| Letter | `list` | `GET /letters` | Required |
| Letter | `load` | `GET /letters/{ltr_id}` | Required |
| Letter | `remove` | `DELETE /letters/{ltr_id}` | Required |
| Link | `create` | `POST /links` | Required |
| Link | `list` | `GET /links` | Required |
| Link | `load` | `GET /links/{link_id}` | Required |
| Link | `remove` | `DELETE /links/{link_id}` | Required |
| Link | `update` | `PATCH /links/{link_id}` | Required |
| LobCreditsBalance | `load` | `GET /accounts` | Required |
| Postcard | `create` | `POST /postcards` | Required |
| Postcard | `list` | `GET /postcards` | Required |
| Postcard | `load` | `GET /postcards/{psc_id}` | Required |
| Postcard | `remove` | `DELETE /postcards/{psc_id}` | Required |
| QrCode | `list` | `GET /qr_code_analytics` | Required |
| ResourceProof | `create` | `POST /resource_proofs` | Required |
| ResourceProof | `load` | `GET /resource_proofs/{res_prf_id}` | Required |
| ResourceProof | `update` | `PATCH /resource_proofs/{res_prf_id}` | Required |
| Response | `create` | `POST /informed_delivery_campaigns` | Required |
| Response | `list` | `GET /informed_delivery_campaigns` | Required |
| Response | `load` | `GET /informed_delivery_campaigns/{usps_campaign_id}` | Required |
| Response | `update` | `PATCH /informed_delivery_campaigns/{usps_campaign_id}` | Required |
| ReverseGeocode | `create` | `POST /us_reverse_geocode_lookups` | Required |
| SelfMailer | `create` | `POST /self_mailers` | Required |
| SelfMailer | `list` | `GET /self_mailers` | Required |
| SelfMailer | `load` | `GET /self_mailers/{sfm_id}` | Required |
| SelfMailer | `remove` | `DELETE /self_mailers/{sfm_id}` | Required |
| SnapPack | `create` | `POST /snap_packs` | Required |
| SnapPack | `list` | `GET /snap_packs` | Required |
| SnapPack | `load` | `GET /snap_packs/{snap_pack_id}` | Required |
| SnapPack | `remove` | `DELETE /snap_packs/{snap_pack_id}` | Required |
| Template | `create` | `POST /templates/{tmpl_id}` | Required |
| Template | `create` | `POST /templates` | Required |
| Template | `list` | `GET /templates` | Required |
| Template | `load` | `GET /templates/{tmpl_id}` | Required |
| Template | `remove` | `DELETE /templates/{tmpl_id}` | Required |
| TemplateVersion | `create` | `POST /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| TemplateVersion | `create` | `POST /templates/{tmpl_id}/versions` | Required |
| TemplateVersion | `list` | `GET /templates/{tmpl_id}/versions` | Required |
| TemplateVersion | `load` | `GET /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| TemplateVersionDeletion | `remove` | `DELETE /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| Upload | `create` | `POST /uploads/{upl_id}/file` | Required |
| Upload | `create` | `POST /uploads` | Required |
| Upload | `list` | `GET /uploads/{upl_id}/report` | Required |
| Upload | `list` | `GET /uploads` | Required |
| Upload | `load` | `GET /uploads/{upl_id}/exports/{ex_id}` | Required |
| Upload | `load` | `GET /uploads/{upl_id}` | Required |
| Upload | `remove` | `DELETE /uploads/{upl_id}` | Required |
| Upload | `update` | `PATCH /uploads/{upl_id}` | Required |
| UploadCreateExport | `create` | `POST /uploads/{upl_id}/exports` | Required |
| UsAutocompletion | `create` | `POST /us_autocompletions` | Required |
| UsVerification | `create` | `POST /bulk/us_verifications` | Required |
| UsVerification | `create` | `POST /us_verifications` | Required |
| Zip | `create` | `POST /us_zip_lookups` | Required |

## Connect to the API

- production: `https://api.lob.com/v1`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lob_list`: List records for an entity. Supported entities: `address`, `bank_account`, `billing_group`, `booklet`, `buckslip`, `buckslip_order`, `campaign`, `card`, `card_order`, `check`, `domain`, `letter`, `link`, `postcard`, `qr_code`, `response`, `self_mailer`, `snap_pack`, `template`, `template_version`, `upload`.
- `lob_load`: Load one record for an entity. Supported entities: `address`, `bank_account`, `billing_group`, `booklet`, `buckslip`, `campaign`, `card`, `check`, `creative`, `domain`, `letter`, `link`, `lob_credits_balance`, `postcard`, `resource_proof`, `response`, `self_mailer`, `snap_pack`, `template`, `template_version`, `upload`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

