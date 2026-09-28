# Lob

The Lob API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and uses HTTP response codes to indicate any API errors.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 33 entities and 105 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Address](docs/api/address.html)

Results: Echos the writable fields of a newly created address object.; A dictionary with a data property that contains an array of up to `limit` addresses. Each entry in the array is a separate address object. The previous and next page of address entries can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more addresses are available beyond the current set of returned results, the `next_url` field will be empty.; Returns an address object if a valid identifier was provided.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `address_country`: Full name of country
- `address_line1`: The primary number, street name, and directional information.
- `address_state`: 2 letter state short-name code
- `address_zip`: Must follow the ZIP format of `12345` or ZIP+4 format of `12345-1234`.
- `company`: Either `name` or `company` is required, you may also add both. Must be no longer than 40 characters. If both `name` and `company` are provided, they will be printed on two separate lines above the rest of the address. This field can be used for any secondary recipient information which is not part of the actual mailing address (Company Name, Department, Attention Line, etc).

### [BankAccount](docs/api/bank_account.html)

Results: Returns a bank_account object; A dictionary with a data property that contains an array of up to `limit` bank_accounts. Each entry in the array is a separate bank_account. The previous and next page of bank_accounts can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more bank_accounts are available beyond the current set of returned results, the `next_url` field will be empty.; Returns a bank account object.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `account_type`: The type of entity that holds the account.
- `bank_name`: The name of the bank based on the provided routing number, for example `JPMORGAN CHASE BANK`.
- `check_template`: The check template used for printing. The defualt value is `common`. If you bank with JP Morgan Chase and wish to use Positive Pay use the `jpm` template. `jpm` requires additional information to be provided.
- `city`: The city associated with your home bank account. Required for the `jpm` check template only. Please contact a bank representative if you do not know the city associated with your home bank institution.
- `count`: number of resources in a set

### [BankDeletion](docs/api/bank_deletion.html)

Results: Deleted.

SDK operations: `remove`.

### [BillingGroup](docs/api/billing_group.html)

Results: Returns a billing group object; Returns a list of billing_groups.; Returns a billing_group object.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: list of billing_groups
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `description`: Description of the billing group.

### [Booklet](docs/api/booklet.html)

Results: Returns a booklet object; A dictionary with a data property that contains an array of up to `limit` booklets. Each entry in the array is a separate booklet. The previous and next page of booklets can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more booklets are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: list of booklets
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.

### [Buckslip](docs/api/buckslip.html)

Results: Buckslip created successfully; Returns a list of buckslip objects; Returns a buckslip object; Deleted the buckslip.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `allocated_quantity`: The allocated quantity of buckslips.
- `auto_reorder`: True if the buckslips should be auto-reordered.
- `available_quantity`: The available quantity of buckslips.
- `back_original_url`: The original URL of the back template.
- `buckslip_orders`: An array of buckslip orders that are associated with the buckslip.

### [BuckslipOrder](docs/api/buckslip_order.html)

Results: Buckslip order created successfully; Returns the buckslip orders associated with the given buckslip id.

SDK operations: `create`, `list`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: List of buckslip orders
- `id`: Unique identifier prefixed with `bo_`.
- `next_url`: Url of next page of items in list.
- `object`: Value is resource type.

### [Campaign](docs/api/campaign.html)

Results: Returns a campaign object; Campaign created successfully; A dictionary with a data property that contains an array of up to `limit` campaigns. Each entry in the array is a separate campaign. The previous and next page of campaigns can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more campaigns are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted the campaign.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `auto_cancel_if_ncoa`: Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.
- `billing_group_id`: Unique identifier prefixed with `bg_`.
- `cancel_window_campaign_minutes`: A window, in minutes, within which the campaign can be canceled.
- `count`: number of resources in a set
- `creatives`: An array of creatives that have been associated with this campaign.

### [Card](docs/api/card.html)

Results: Returns a card object; Card created successfully; Returns a list of card objects; Deleted the card.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `auto_reorder`: True if the cards should be auto-reordered.
- `available_quantity`: The available quantity of cards.
- `back_original_url`: The original URL of the back template.
- `count`: number of resources in a set
- `data`: list of cards

### [CardOrder](docs/api/card_order.html)

Results: Card order created successfully; Returns the card orders associated with the given card id.

SDK operations: `create`, `list`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: List of card orders
- `id`: Unique identifier prefixed with `co_`.
- `next_url`: Url of next page of items in list.
- `object`: Value is resource type.

### [Check](docs/api/check.html)

Results: Returns a check object; A dictionary with a data property that contains an array of up to `limit` checks. Each entry in the array is a separate check. The previous and next page of checks can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more checks are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `amount`: The payment amount to be sent in US dollars.
- `check_number`: An integer that designates the check number. If `check_number` is not provided, checks created from a new `bank_account` will start at `10000` and increment with each check created with the `bank_account`. A provided `check_number` overrides the defaults. Subsequent checks created with the same `bank_account` will increment from the provided check number.
- `count`: number of resources in a set
- `data`: list of checks
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.

### [Creative](docs/api/creative.html)

Results: Creative created successfully; Returns a creative object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `campaigns`: Array of campaigns associated with the creative ID
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.
- `description`: An internal description that identifies this resource. Must be no longer than 255 characters.

### [Domain](docs/api/domain.html)

Results: Returns a domain object with details.; Returns a list of all domains.; Returns domain related details.; Returns the deleted link object.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `count`: number of resources in a set
- `created_at`: The date and time the domain was created.
- `data`: List of domains.
- `domain`: The registered domain/hostname.
- `error_redirect_link`: URL to redirect customers if a short link is broken or inactive.

### [IdentityValidation](docs/api/identity_validation.html)

Results: Returns the likelihood a given name is associated with an address.

SDK operations: `create`.

Key fields to recognise:

- `confidence`: Indicates the likelihood the recipient name and address match based on our custom internal calculation. Possible values are: - `high`, Has a Lob confidence score greater than 70. - `medium`, Has a Lob confidence score between 40 and 70. - `low`, Has a Lob confidence score less than 40. - `&quot;&quot;`, No tracking data exists for this address.
- `id`: Unique identifier prefixed with `id_validation_`.
- `last_line`: Combination of the following applicable `components`: * City (`city`) * State (`state`) * ZIP code (`zip_code`) * ZIP+4 (`zip_code_plus_4`)
- `object`: Value is resource type.
- `primary_line`: The primary delivery line (usually the street address) of the address. Combination of the following applicable `components`: * `primary_number` * `street_predirection` * `street_name` * `street_suffix` * `street_postdirection` * `secondary_designator` * `secondary_number` * `pmb_designator` * `pmb_number`

### [IntlVerification](docs/api/intl_verification.html)

Results: Returns an international verification object.; Returns an array of international verification objects.

SDK operations: `create`.

Key fields to recognise:

- `components`: A nested object containing a breakdown of each component of an address.
- `country`: The country of the address. Will be returned as a 2 letter country short-name code (ISO 3166).
- `coverage`: The coverage level for the country. This represents the maximum level of accuracy an input address can be verified to. * `SUBBUILDING` - Coverage down to unit numbers. For example, in an apartment or a large building * `HOUSENUMBER/BUILDING` - Coverage down to house number. For example, the address where a house or building may be located * `STREET` - Coverage down to street. This means that we can verify that an street exists in a city, state, country * `LOCALITY` - Coverage down to city, state, or village or province. This means that we can verify that a city, village, province, or state exists in a country. Countries differ in how they define what is a province, state, city, village, etc. This attempts to group eveyrthing together. * `SPARSE` - Some addresses for this country exist in our databases
- `deliverability`: Summarizes the deliverability of the `intl_verification` object. Possible values are: * `deliverable`, The address is deliverable. * `deliverable_missing_info`, The address is missing some information, but is most likely deliverable. * `undeliverable`, The address is most likely not deliverable. Some components of the address (such as city or postal code) may have been found. * `no_match`, This address is not deliverable. No matching street could be found within the city or postal code.
- `errors`: Indicates whether any errors occurred during the verification process.

### [Letter](docs/api/letter.html)

Results: Returns a letter object; A dictionary with a data property that contains an array of up to `limit` letters. Each entry in the array is a separate letter. The previous and next page of letters can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more letters are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `address_placement`: Specifies the location of the address information that will show through the double-window envelope. To see how this will impact your letter design, view our letter template. Some values are exclusive to certain customers. Upgrade to the appropriate &lt;a href=&quot;https://dashboard.lob.com/#/settings/editions&quot; target=&quot;_blank&quot;&gt;Print &amp; Mail Edition&lt;/a&gt; to gain access. * `top_first_page` - (default) print address information at the top of your provided first page * `insert_blank_page` - insert a blank address page at the beginning of your file (you will be charged for the extra page) * `bottom_first_page_center` - **(exclusive, deprecation planned within a few months)** print address information at the bottom center of your provided first page * `bottom_first_page` - **(exclusive)** print address information at the bottom of your provided first page
- `cards`: An array of cards associated with a specific letter
- `color`: Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
- `count`: number of resources in a set
- `custom_envelope`: A nested custom envelope object containing more information about the custom envelope used or `null` if a custom envelope was not used.

### [Link](docs/api/link.html)

Results: Returns a successfully created link.; Returns the deleted link object.; Returns a single link.; Returns the deleted short link object; Returns the updated link.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: List of links
- `domain`: The registered domain to be used for the short URL.
- `id`: Unique identifier prefixed with `lnk_`.
- `metadata`: Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `&quot;` and `\`. that is &#39;&#123;&quot;customer_id&quot; : &quot;NEWYORK2015&quot;&#125;&#39; Nested objects are not supported. See [Metadata](#section/Metadata) for more information.

### [LobCreditsBalance](docs/api/lob_credits_balance.html)

Results: Returns a lob_credits_balance object.

SDK operations: `load`.

Key fields to recognise:

- `balance`: Account&#39;s current balance of Lob Credits. Can be positive, negative, or zero.

### [Postcard](docs/api/postcard.html)

Results: Returns a postcard object; A dictionary with a data property that contains an array of up to `limit` postcards. Each entry in the array is a separate postcard. The previous and next page of postcards can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more postcards are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `back_template_id`: The unique ID of the HTML template used for the back of the postcard. Only filled out when the request contains a valid postcard template ID.
- `back_template_version_id`: The unique ID of the specific version of the HTML template used for the back of the postcard. Only filled out when the request contains a valid postcard template ID.
- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `count`: number of resources in a set
- `data`: list of postcards

### [QrCode](docs/api/qr_code.html)

Results: Returns a list of QR Codes and their analytics.

SDK operations: `list`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: List of QR code analytics
- `object`: Value is resource type.
- `scanned_count`: Indicates the number of QR Codes out of `count` that were scanned atleast once.
- `total_count`: Indicates the total number of records. Provided when the request specifies an &quot;include&quot; query parameter

### [ResourceProof](docs/api/resource_proof.html)

Results: Returns a resource proof object; Returns an updated resource proof object.

SDK operations: `create`, `load`, `update`.

Key fields to recognise:

- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `errors`: Errors encountered during processing.
- `id`: Unique identifier prefixed with `res_prf_`.
- `object`: Value is resource type.

### [Response](docs/api/response.html)

Results: Creative created successfully; A dictionary with a data property that contains an array of up to `limit` Informed Delivery campaigns. Each entry in the array is a separate campaign. The previous and next page of campaigns can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more campaigns are available beyond the current set of returned results, the `next_url` field will be empty.; Returns a informed delivery campaign object; Returns an Informed Delivery campaign object.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `account_id`: Your Lob account id.
- `brand_name`: The brand name you would like included in the informed delivery email. Will default to the “company” on the users account.
- `campaign_code`: The campaign code associated with the Informed Delivery campaign.
- `count`: number of resources in a set
- `data`: list of Informed Delivery campaigns

### [ReverseGeocode](docs/api/reverse_geocode.html)

Results: Returns a zip lookup object if a valid zip was provided.

SDK operations: `create`.

Key fields to recognise:

- `addresses`: list of addresses
- `id`: Unique identifier prefixed with `us_reverse_geocode_`.
- `latitude`: A positive or negative decimal indicating the geographic latitude of the address, specifying the north-to-south position of a location. This should be used with `longitude` to pinpoint locations on a map. Will not be returned for undeliverable addresses or military addresses (state is `AA`, `AE`, or `AP`).
- `longitude`: A positive or negative decimal indicating the geographic longitude of the address, specifying the north-to-south position of a location. This should be used with `latitude` to pinpoint locations on a map. Will not be returned for undeliverable addresses or military addresses (state is `AA`, `AE`, or `AP`).
- `object`: Value is resource type.

### [SelfMailer](docs/api/self_mailer.html)

Results: Returns a self_mailer object; A dictionary with a data property that contains an array of up to `limit` self_mailers. Each entry in the array is a separate self_mailer. The previous and next page of self_mailers can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more self_mailers are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `count`: number of resources in a set
- `data`: list of self_mailers
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.

### [SnapPack](docs/api/snap_pack.html)

Results: Returns a snap_pack object; A dictionary with a data property that contains an array of up to `limit` snap_packs. Each entry in the array is a separate self_mailer. The previous and next page of snap_packs can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more snap_packs are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `campaign_id`: Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.
- `color`: Set this key to `true` if you would like to print in color. Set to `false` if you would like to print in black and white.
- `count`: number of resources in a set
- `data`: list of snap_packs
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.

### [Template](docs/api/template.html)

Results: Returns the updated template object; Returns a template object; A dictionary with a data property that contains an array of up to `limit` templates. Each entry in the array is a separate template. The previous and next page of templates can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more templates are available beyond the current set of returned results, the `next_url` field will be empty.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: list of templates
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.

### [TemplateVersion](docs/api/template_version.html)

Results: Returns the template version with the given template and version ids.; A dictionary with a data property that contains an array of up to `limit` template versions. Each entry in the array is a separate template version object. The previous and next page of template versions can be retrieved by calling the endpoint contained in the `previous_url` and `next_url` fields in the API response respectively. If no more template versions are available beyond the current set of returned results, the `next_url` field will be empty.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `count`: number of resources in a set
- `data`: list of template versions
- `date_created`: A timestamp in ISO 8601 format of the date the resource was created.
- `date_modified`: A timestamp in ISO 8601 format of the date the resource was last modified.
- `deleted`: Only returned if the resource has been successfully deleted.

### [TemplateVersionDeletion](docs/api/template_version_deletion.html)

Results: Deleted.

SDK operations: `remove`.

### [Upload](docs/api/upload.html)

Results: Successful Response; Upload created successfully; Returns an report object; An array of matching uploads. Each entry in the array is a separate upload.; Returns an export object; Returns an upload object.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `accountId`: Account ID that made the request
- `bytesProcessed`: Number of bytes processed in your CSV
- `dateCreated`: A timestamp in ISO 8601 format of the date the upload was created
- `dateModified`: A timestamp in ISO 8601 format of the date the upload was last modified
- `deleted`: Returns as `true` if the resource has been successfully deleted.

### [UploadCreateExport](docs/api/upload_create_export.html)

Results: Successful Response.

SDK operations: `create`.

Key fields to recognise:

- `message`: A human-readable message with more details about the error

### [UsAutocompletion](docs/api/us_autocompletion.html)

Results: Returns a US autocompletion object.

SDK operations: `create`.

Key fields to recognise:

- `address_prefix`: Only accepts numbers and street names in an alphanumeric format.
- `city`: An optional city input used to filter suggestions.
- `geo_ip_sort`: If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.
- `id`: Unique identifier prefixed with `us_auto_`.
- `object`: Value is resource type.

### [UsVerification](docs/api/us_verification.html)

Results: Returns a list of US verification objects.; Returns a US verification object.

SDK operations: `create`.

Key fields to recognise:

- `components`: A nested object containing a breakdown of each component of an address.
- `deliverability`: Summarizes the deliverability of the `us_verification` object. For full details, see the `deliverability_analysis` field. Possible values are: * `deliverable` – The address is deliverable by the USPS. * `deliverable_unnecessary_unit` – The address is deliverable, but the secondary unit information is unnecessary. * `deliverable_incorrect_unit` – The address is deliverable to the building&#39;s default address but the secondary unit provided may not exist. There is a chance the mail will not reach the intended recipient. * `deliverable_missing_unit` – The address is deliverable to the building&#39;s default address but is missing secondary unit information. There is a chance the mail will not reach the intended recipient. * `undeliverable` – The address is not deliverable according to the USPS.
- `deliverability_analysis`: A nested object containing a breakdown of the deliverability of an address.
- `errors`: Indicates whether any errors occurred during the verification process.
- `id`: Unique identifier prefixed with `us_ver_`.

### [Zip](docs/api/zip.html)

Results: Returns a zip lookup object if a valid zip was provided.

SDK operations: `create`.

Key fields to recognise:

- `zip_code`: A 5-digit ZIP code.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Address](docs/api/address.html) | `create` | `POST /addresses` | Required |
| [Address](docs/api/address.html) | `list` | `GET /addresses` | Required |
| [Address](docs/api/address.html) | `load` | `GET /addresses/{adr_id}` | Required |
| [Address](docs/api/address.html) | `remove` | `DELETE /addresses/{adr_id}` | Required |
| [BankAccount](docs/api/bank_account.html) | `create` | `POST /bank_accounts/{bank_id}/verify` | Required |
| [BankAccount](docs/api/bank_account.html) | `create` | `POST /bank_accounts` | Required |
| [BankAccount](docs/api/bank_account.html) | `list` | `GET /bank_accounts` | Required |
| [BankAccount](docs/api/bank_account.html) | `load` | `GET /bank_accounts/{bank_id}` | Required |
| [BankDeletion](docs/api/bank_deletion.html) | `remove` | `DELETE /bank_accounts/{bank_id}` | Required |
| [BillingGroup](docs/api/billing_group.html) | `create` | `POST /billing_groups/{bg_id}` | Required |
| [BillingGroup](docs/api/billing_group.html) | `create` | `POST /billing_groups` | Required |
| [BillingGroup](docs/api/billing_group.html) | `list` | `GET /billing_groups` | Required |
| [BillingGroup](docs/api/billing_group.html) | `load` | `GET /billing_groups/{bg_id}` | Required |
| [Booklet](docs/api/booklet.html) | `create` | `POST /booklets` | Required |
| [Booklet](docs/api/booklet.html) | `list` | `GET /booklets` | Required |
| [Booklet](docs/api/booklet.html) | `load` | `GET /booklets/{booklet_id}` | Required |
| [Booklet](docs/api/booklet.html) | `remove` | `DELETE /booklets/{booklet_id}` | Required |
| [Buckslip](docs/api/buckslip.html) | `create` | `POST /buckslips` | Required |
| [Buckslip](docs/api/buckslip.html) | `list` | `GET /buckslips` | Required |
| [Buckslip](docs/api/buckslip.html) | `load` | `GET /buckslips/{buckslip_id}` | Required |
| [Buckslip](docs/api/buckslip.html) | `remove` | `DELETE /buckslips/{buckslip_id}` | Required |
| [Buckslip](docs/api/buckslip.html) | `update` | `PATCH /buckslips/{buckslip_id}` | Required |
| [BuckslipOrder](docs/api/buckslip_order.html) | `create` | `POST /buckslips/{buckslip_id}/orders` | Required |
| [BuckslipOrder](docs/api/buckslip_order.html) | `list` | `GET /buckslips/{buckslip_id}/orders` | Required |
| [Campaign](docs/api/campaign.html) | `create` | `POST /campaigns/{cmp_id}/send` | Required |
| [Campaign](docs/api/campaign.html) | `create` | `POST /campaigns` | Required |
| [Campaign](docs/api/campaign.html) | `list` | `GET /campaigns` | Required |
| [Campaign](docs/api/campaign.html) | `load` | `GET /campaigns/{cmp_id}` | Required |
| [Campaign](docs/api/campaign.html) | `remove` | `DELETE /campaigns/{cmp_id}` | Required |
| [Campaign](docs/api/campaign.html) | `update` | `PATCH /campaigns/{cmp_id}` | Required |
| [Card](docs/api/card.html) | `create` | `POST /cards/{card_id}` | Required |
| [Card](docs/api/card.html) | `create` | `POST /cards` | Required |
| [Card](docs/api/card.html) | `list` | `GET /cards` | Required |
| [Card](docs/api/card.html) | `load` | `GET /cards/{card_id}` | Required |
| [Card](docs/api/card.html) | `remove` | `DELETE /cards/{card_id}` | Required |
| [CardOrder](docs/api/card_order.html) | `create` | `POST /cards/{card_id}/orders` | Required |
| [CardOrder](docs/api/card_order.html) | `list` | `GET /cards/{card_id}/orders` | Required |
| [Check](docs/api/check.html) | `create` | `POST /checks` | Required |
| [Check](docs/api/check.html) | `list` | `GET /checks` | Required |
| [Check](docs/api/check.html) | `load` | `GET /checks/{chk_id}` | Required |
| [Check](docs/api/check.html) | `remove` | `DELETE /checks/{chk_id}` | Required |
| [Creative](docs/api/creative.html) | `create` | `POST /creatives` | Required |
| [Creative](docs/api/creative.html) | `load` | `GET /creatives/{crv_id}` | Required |
| [Creative](docs/api/creative.html) | `update` | `PATCH /creatives/{crv_id}` | Required |
| [Domain](docs/api/domain.html) | `create` | `POST /domains` | Required |
| [Domain](docs/api/domain.html) | `list` | `GET /domains` | Required |
| [Domain](docs/api/domain.html) | `load` | `GET /domains/{domain_id}` | Required |
| [Domain](docs/api/domain.html) | `remove` | `DELETE /domains/{domain_id}` | Required |
| [IdentityValidation](docs/api/identity_validation.html) | `create` | `POST /identity_validation` | Required |
| [IntlVerification](docs/api/intl_verification.html) | `create` | `POST /intl_verifications` | Required |
| [IntlVerification](docs/api/intl_verification.html) | `create` | `POST /bulk/intl_verifications` | Required |
| [Letter](docs/api/letter.html) | `create` | `POST /letters` | Required |
| [Letter](docs/api/letter.html) | `list` | `GET /letters` | Required |
| [Letter](docs/api/letter.html) | `load` | `GET /letters/{ltr_id}` | Required |
| [Letter](docs/api/letter.html) | `remove` | `DELETE /letters/{ltr_id}` | Required |
| [Link](docs/api/link.html) | `create` | `POST /links` | Required |
| [Link](docs/api/link.html) | `list` | `GET /links` | Required |
| [Link](docs/api/link.html) | `load` | `GET /links/{link_id}` | Required |
| [Link](docs/api/link.html) | `remove` | `DELETE /links/{link_id}` | Required |
| [Link](docs/api/link.html) | `update` | `PATCH /links/{link_id}` | Required |
| [LobCreditsBalance](docs/api/lob_credits_balance.html) | `load` | `GET /accounts` | Required |
| [Postcard](docs/api/postcard.html) | `create` | `POST /postcards` | Required |
| [Postcard](docs/api/postcard.html) | `list` | `GET /postcards` | Required |
| [Postcard](docs/api/postcard.html) | `load` | `GET /postcards/{psc_id}` | Required |
| [Postcard](docs/api/postcard.html) | `remove` | `DELETE /postcards/{psc_id}` | Required |
| [QrCode](docs/api/qr_code.html) | `list` | `GET /qr_code_analytics` | Required |
| [ResourceProof](docs/api/resource_proof.html) | `create` | `POST /resource_proofs` | Required |
| [ResourceProof](docs/api/resource_proof.html) | `load` | `GET /resource_proofs/{res_prf_id}` | Required |
| [ResourceProof](docs/api/resource_proof.html) | `update` | `PATCH /resource_proofs/{res_prf_id}` | Required |
| [Response](docs/api/response.html) | `create` | `POST /informed_delivery_campaigns` | Required |
| [Response](docs/api/response.html) | `list` | `GET /informed_delivery_campaigns` | Required |
| [Response](docs/api/response.html) | `load` | `GET /informed_delivery_campaigns/{usps_campaign_id}` | Required |
| [Response](docs/api/response.html) | `update` | `PATCH /informed_delivery_campaigns/{usps_campaign_id}` | Required |
| [ReverseGeocode](docs/api/reverse_geocode.html) | `create` | `POST /us_reverse_geocode_lookups` | Required |
| [SelfMailer](docs/api/self_mailer.html) | `create` | `POST /self_mailers` | Required |
| [SelfMailer](docs/api/self_mailer.html) | `list` | `GET /self_mailers` | Required |
| [SelfMailer](docs/api/self_mailer.html) | `load` | `GET /self_mailers/{sfm_id}` | Required |
| [SelfMailer](docs/api/self_mailer.html) | `remove` | `DELETE /self_mailers/{sfm_id}` | Required |
| [SnapPack](docs/api/snap_pack.html) | `create` | `POST /snap_packs` | Required |
| [SnapPack](docs/api/snap_pack.html) | `list` | `GET /snap_packs` | Required |
| [SnapPack](docs/api/snap_pack.html) | `load` | `GET /snap_packs/{snap_pack_id}` | Required |
| [SnapPack](docs/api/snap_pack.html) | `remove` | `DELETE /snap_packs/{snap_pack_id}` | Required |
| [Template](docs/api/template.html) | `create` | `POST /templates/{tmpl_id}` | Required |
| [Template](docs/api/template.html) | `create` | `POST /templates` | Required |
| [Template](docs/api/template.html) | `list` | `GET /templates` | Required |
| [Template](docs/api/template.html) | `load` | `GET /templates/{tmpl_id}` | Required |
| [Template](docs/api/template.html) | `remove` | `DELETE /templates/{tmpl_id}` | Required |
| [TemplateVersion](docs/api/template_version.html) | `create` | `POST /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| [TemplateVersion](docs/api/template_version.html) | `create` | `POST /templates/{tmpl_id}/versions` | Required |
| [TemplateVersion](docs/api/template_version.html) | `list` | `GET /templates/{tmpl_id}/versions` | Required |
| [TemplateVersion](docs/api/template_version.html) | `load` | `GET /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| [TemplateVersionDeletion](docs/api/template_version_deletion.html) | `remove` | `DELETE /templates/{tmpl_id}/versions/{vrsn_id}` | Required |
| [Upload](docs/api/upload.html) | `create` | `POST /uploads/{upl_id}/file` | Required |
| [Upload](docs/api/upload.html) | `create` | `POST /uploads` | Required |
| [Upload](docs/api/upload.html) | `list` | `GET /uploads/{upl_id}/report` | Required |
| [Upload](docs/api/upload.html) | `list` | `GET /uploads` | Required |
| [Upload](docs/api/upload.html) | `load` | `GET /uploads/{upl_id}/exports/{ex_id}` | Required |
| [Upload](docs/api/upload.html) | `load` | `GET /uploads/{upl_id}` | Required |
| [Upload](docs/api/upload.html) | `remove` | `DELETE /uploads/{upl_id}` | Required |
| [Upload](docs/api/upload.html) | `update` | `PATCH /uploads/{upl_id}` | Required |
| [UploadCreateExport](docs/api/upload_create_export.html) | `create` | `POST /uploads/{upl_id}/exports` | Required |
| [UsAutocompletion](docs/api/us_autocompletion.html) | `create` | `POST /us_autocompletions` | Required |
| [UsVerification](docs/api/us_verification.html) | `create` | `POST /bulk/us_verifications` | Required |
| [UsVerification](docs/api/us_verification.html) | `create` | `POST /us_verifications` | Required |
| [Zip](docs/api/zip.html) | `create` | `POST /us_zip_lookups` | Required |

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
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lob_list`: List records for an entity. Supported entities: `address`, `bank_account`, `billing_group`, `booklet`, `buckslip`, `buckslip_order`, `campaign`, `card`, `card_order`, `check`, `domain`, `letter`, `link`, `postcard`, `qr_code`, `response`, `self_mailer`, `snap_pack`, `template`, `template_version`, `upload`.
- `lob_load`: Load one record for an entity. Supported entities: `address`, `bank_account`, `billing_group`, `booklet`, `buckslip`, `campaign`, `card`, `check`, `creative`, `domain`, `letter`, `link`, `lob_credits_balance`, `postcard`, `resource_proof`, `response`, `self_mailer`, `snap_pack`, `template`, `template_version`, `upload`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

