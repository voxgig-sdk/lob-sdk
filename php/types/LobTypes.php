<?php
declare(strict_types=1);

// Typed models for the Lob SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Address entity data model. */
class Address
{
    public ?string $address_city = null;
    public ?string $address_country = null;
    public ?string $address_line1 = null;
    public ?string $address_line2 = null;
    public ?string $address_state = null;
    public ?string $address_zip = null;
    public ?string $company = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $name = null;
    public ?string $object = null;
    public ?string $phone = null;
}

/** Request payload for Address#load. */
class AddressLoadMatch
{
    public string $id;
}

/** Request payload for Address#list. */
class AddressListMatch
{
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?array $metadata = null;
}

/** Request payload for Address#create. */
class AddressCreateData
{
    public ?string $address_city = null;
    public ?string $address_country = null;
    public ?string $address_line1 = null;
    public ?string $address_line2 = null;
    public ?string $address_state = null;
    public ?string $address_zip = null;
    public ?string $company = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $name = null;
    public ?string $object = null;
    public ?string $phone = null;
}

/** Request payload for Address#remove. */
class AddressRemoveMatch
{
    public string $id;
}

/** BankAccount entity data model. */
class BankAccount
{
    public string $account_number;
    public string $account_type;
    public ?string $bank_name = null;
    public ?string $check_template = null;
    public ?string $city = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $fractional_routing_number = null;
    public string $id;
    public ?array $metadata = null;
    public ?string $microdeposit_type = null;
    public string $object;
    public string $routing_number;
    public string $signatory;
    public mixed $signature_url = null;
    public ?string $state = null;
    public ?bool $verified = null;
    public ?string $zipcode = null;
}

/** Request payload for BankAccount#load. */
class BankAccountLoadMatch
{
    public string $id;
}

/** Request payload for BankAccount#list. */
class BankAccountListMatch
{
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?array $metadata = null;
}

/** Request payload for BankAccount#create. */
class BankAccountCreateData
{
    public string $account_number;
    public string $account_type;
    public ?string $bank_name = null;
    public ?string $check_template = null;
    public ?string $city = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $fractional_routing_number = null;
    public string $id;
    public ?array $metadata = null;
    public ?string $microdeposit_type = null;
    public string $object;
    public string $routing_number;
    public string $signatory;
    public mixed $signature_url = null;
    public ?string $state = null;
    public ?bool $verified = null;
    public ?string $zipcode = null;
}

/** BankDeletion entity data model. */
class BankDeletion
{
}

/** Request payload for BankDeletion#remove. */
class BankDeletionRemoveMatch
{
    public string $bank_id;
}

/** BillingGroup entity data model. */
class BillingGroup
{
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $object = null;
}

/** Request payload for BillingGroup#load. */
class BillingGroupLoadMatch
{
    public string $id;
}

/** Request payload for BillingGroup#list. */
class BillingGroupListMatch
{
    public ?array $date_created = null;
    public ?array $date_modified = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public mixed $sort_by = null;
}

/** Request payload for BillingGroup#create. */
class BillingGroupCreateData
{
    public string $id;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $name = null;
    public ?string $object = null;
}

/** Booklet entity data model. */
class Booklet
{
    public ?string $carrier = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $from = null;
    public ?bool $fsc = null;
    public ?string $id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?int $pages = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $source_material = null;
    public ?array $thumbnails = null;
    public ?array $to = null;
    public ?array $tracking_events = null;
    public ?string $tracking_number = null;
    public ?string $url = null;
    public ?string $use_type = null;
}

/** Request payload for Booklet#load. */
class BookletLoadMatch
{
    public string $id;
}

/** Request payload for Booklet#list. */
class BookletListMatch
{
    public ?string $campaign_id = null;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?string $send_date = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for Booklet#create. */
class BookletCreateData
{
    public ?string $idempotency_key = null;
    public ?string $carrier = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $from = null;
    public ?bool $fsc = null;
    public ?string $id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?int $pages = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $source_material = null;
    public ?array $thumbnails = null;
    public ?array $to = null;
    public ?array $tracking_events = null;
    public ?string $tracking_number = null;
    public ?string $url = null;
    public ?string $use_type = null;
}

/** Request payload for Booklet#remove. */
class BookletRemoveMatch
{
    public string $id;
}

/** Buckslip entity data model. */
class Buckslip
{
    public ?string $account_id = null;
    public float $allocated_quantity;
    public bool $auto_reorder;
    public float $available_quantity;
    public string $back_original_url;
    public array $buckslip_orders;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $finish;
    public string $front_original_url;
    public string $id;
    public ?string $mode = null;
    public string $object;
    public float $onhand_quantity;
    public float $pending_quantity;
    public float $projected_quantity;
    public string $raw_url;
    public int $reorder_quantity;
    public ?string $send_date = null;
    public ?string $size = null;
    public string $status;
    public string $stock;
    public int $threshold_amount;
    public array $thumbnails;
    public string $url;
    public string $weight;
}

/** Request payload for Buckslip#load. */
class BuckslipLoadMatch
{
    public string $id;
}

/** Request payload for Buckslip#list. */
class BuckslipListMatch
{
    public ?array $include = null;
    public ?int $limit = null;
}

/** Request payload for Buckslip#create. */
class BuckslipCreateData
{
    public ?string $account_id = null;
    public float $allocated_quantity;
    public bool $auto_reorder;
    public float $available_quantity;
    public string $back_original_url;
    public array $buckslip_orders;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $finish;
    public string $front_original_url;
    public string $id;
    public ?string $mode = null;
    public string $object;
    public float $onhand_quantity;
    public float $pending_quantity;
    public float $projected_quantity;
    public string $raw_url;
    public int $reorder_quantity;
    public ?string $send_date = null;
    public ?string $size = null;
    public string $status;
    public string $stock;
    public int $threshold_amount;
    public array $thumbnails;
    public string $url;
    public string $weight;
}

/** Request payload for Buckslip#update. */
class BuckslipUpdateData
{
    public string $id;
    public ?string $account_id = null;
    public ?float $allocated_quantity = null;
    public ?bool $auto_reorder = null;
    public ?float $available_quantity = null;
    public ?string $back_original_url = null;
    public ?array $buckslip_orders = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $finish = null;
    public ?string $front_original_url = null;
    public ?string $mode = null;
    public ?string $object = null;
    public ?float $onhand_quantity = null;
    public ?float $pending_quantity = null;
    public ?float $projected_quantity = null;
    public ?string $raw_url = null;
    public ?int $reorder_quantity = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $status = null;
    public ?string $stock = null;
    public ?int $threshold_amount = null;
    public ?array $thumbnails = null;
    public ?string $url = null;
    public ?string $weight = null;
}

/** Request payload for Buckslip#remove. */
class BuckslipRemoveMatch
{
    public string $id;
}

/** BuckslipOrder entity data model. */
class BuckslipOrder
{
    public ?string $availability_date = null;
    public ?string $buckslip_id = null;
    public ?string $cancelled_reason = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $expected_availability_date = null;
    public ?string $id = null;
    public ?float $inventory = null;
    public string $object;
    public int $quantity;
    public ?float $quantity_ordered = null;
    public ?string $status = null;
    public ?float $unit_price = null;
}

/** Request payload for BuckslipOrder#list. */
class BuckslipOrderListMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for BuckslipOrder#create. */
class BuckslipOrderCreateData
{
    public string $id;
    public ?string $availability_date = null;
    public ?string $buckslip_id = null;
    public ?string $cancelled_reason = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $expected_availability_date = null;
    public ?float $inventory = null;
    public string $object;
    public int $quantity;
    public ?float $quantity_ordered = null;
    public ?string $status = null;
    public ?float $unit_price = null;
}

/** Campaign entity data model. */
class Campaign
{
    public ?bool $auto_cancel_if_ncoa = null;
    public ?string $billing_group_id = null;
    public ?int $cancel_window_campaign_minutes = null;
    public array $creatives;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $id;
    public bool $is_draft;
    public ?array $metadata = null;
    public string $name;
    public string $object;
    public ?string $print_speed = null;
    public string $schedule_type;
    public ?string $send_date = null;
    public ?string $target_delivery_date = null;
    public array $uploads;
    public string $use_type;
}

/** Request payload for Campaign#load. */
class CampaignLoadMatch
{
    public string $id;
}

/** Request payload for Campaign#list. */
class CampaignListMatch
{
    public ?array $include = null;
    public ?int $limit = null;
}

/** Request payload for Campaign#create. */
class CampaignCreateData
{
    public ?bool $auto_cancel_if_ncoa = null;
    public ?string $billing_group_id = null;
    public ?int $cancel_window_campaign_minutes = null;
    public array $creatives;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $id;
    public bool $is_draft;
    public ?array $metadata = null;
    public string $name;
    public string $object;
    public ?string $print_speed = null;
    public string $schedule_type;
    public ?string $send_date = null;
    public ?string $target_delivery_date = null;
    public array $uploads;
    public string $use_type;
}

/** Request payload for Campaign#update. */
class CampaignUpdateData
{
    public string $id;
    public ?bool $auto_cancel_if_ncoa = null;
    public ?string $billing_group_id = null;
    public ?int $cancel_window_campaign_minutes = null;
    public ?array $creatives = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?bool $is_draft = null;
    public ?array $metadata = null;
    public ?string $name = null;
    public ?string $object = null;
    public ?string $print_speed = null;
    public ?string $schedule_type = null;
    public ?string $send_date = null;
    public ?string $target_delivery_date = null;
    public ?array $uploads = null;
    public ?string $use_type = null;
}

/** Request payload for Campaign#remove. */
class CampaignRemoveMatch
{
    public string $id;
}

/** Card entity data model. */
class Card
{
    public ?string $account_id = null;
    public bool $auto_reorder;
    public int $available_quantity;
    public string $back_original_url;
    public ?string $countries = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $front_original_url;
    public string $id;
    public ?string $mode = null;
    public string $object;
    public string $orientation;
    public int $pending_quantity;
    public string $raw_url;
    public int $reorder_quantity;
    public ?string $send_date = null;
    public ?string $size = null;
    public string $status;
    public int $threshold_amount;
    public array $thumbnails;
    public string $url;
}

/** Request payload for Card#load. */
class CardLoadMatch
{
    public string $id;
}

/** Request payload for Card#list. */
class CardListMatch
{
    public ?array $include = null;
    public ?int $limit = null;
}

/** Request payload for Card#create. */
class CardCreateData
{
    public string $id;
    public ?string $account_id = null;
    public bool $auto_reorder;
    public int $available_quantity;
    public string $back_original_url;
    public ?string $countries = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public string $front_original_url;
    public ?string $mode = null;
    public string $object;
    public string $orientation;
    public int $pending_quantity;
    public string $raw_url;
    public int $reorder_quantity;
    public ?string $send_date = null;
    public ?string $size = null;
    public string $status;
    public int $threshold_amount;
    public array $thumbnails;
    public string $url;
}

/** Request payload for Card#remove. */
class CardRemoveMatch
{
    public string $id;
}

/** CardOrder entity data model. */
class CardOrder
{
    public ?string $availability_date = null;
    public ?string $cancelled_reason = null;
    public ?string $card_id = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $expected_availability_date = null;
    public ?string $id = null;
    public ?float $inventory = null;
    public string $object;
    public int $quantity;
    public ?float $quantity_ordered = null;
    public ?string $status = null;
    public ?float $unit_price = null;
}

/** Request payload for CardOrder#list. */
class CardOrderListMatch
{
    public string $id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Request payload for CardOrder#create. */
class CardOrderCreateData
{
    public string $id;
    public ?string $availability_date = null;
    public ?string $cancelled_reason = null;
    public ?string $card_id = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $expected_availability_date = null;
    public ?float $inventory = null;
    public string $object;
    public int $quantity;
    public ?float $quantity_ordered = null;
    public ?string $status = null;
    public ?float $unit_price = null;
}

/** Check entity data model. */
class Check
{
    public float $amount;
    public ?string $attachment_template_id = null;
    public ?string $attachment_template_version_id = null;
    public mixed $bank_account;
    public string $carrier;
    public ?string $check_bottom_template_id = null;
    public ?string $check_bottom_template_version_id = null;
    public ?int $check_number = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public string $id;
    public ?string $mail_type = null;
    public ?string $memo = null;
    public ?array $merge_variables = null;
    public ?string $message = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for Check#load. */
class CheckLoadMatch
{
    public string $id;
}

/** Request payload for Check#list. */
class CheckListMatch
{
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?bool $scheduled = null;
    public ?string $send_date = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for Check#create. */
class CheckCreateData
{
    public ?string $idempotency_key = null;
    public float $amount;
    public ?string $attachment_template_id = null;
    public ?string $attachment_template_version_id = null;
    public mixed $bank_account;
    public string $carrier;
    public ?string $check_bottom_template_id = null;
    public ?string $check_bottom_template_version_id = null;
    public ?int $check_number = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public string $id;
    public ?string $mail_type = null;
    public ?string $memo = null;
    public ?array $merge_variables = null;
    public ?string $message = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for Check#remove. */
class CheckRemoveMatch
{
    public string $id;
}

/** Creative entity data model. */
class Creative
{
    public array $campaigns;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?array $details = null;
    public ?string $from = null;
    public string $id;
    public ?array $metadata = null;
    public string $object;
    public ?string $resource_type = null;
    public array $template_preview_urls;
    public array $template_previews;
}

/** Request payload for Creative#load. */
class CreativeLoadMatch
{
    public string $id;
}

/** Request payload for Creative#create. */
class CreativeCreateData
{
    public array $campaigns;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?array $details = null;
    public ?string $from = null;
    public string $id;
    public ?array $metadata = null;
    public string $object;
    public ?string $resource_type = null;
    public array $template_preview_urls;
    public array $template_previews;
}

/** Request payload for Creative#update. */
class CreativeUpdateData
{
    public string $id;
    public ?array $campaigns = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?array $details = null;
    public ?string $from = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $resource_type = null;
    public ?array $template_preview_urls = null;
    public ?array $template_previews = null;
}

/** Domain entity data model. */
class Domain
{
    public ?string $created_at = null;
    public ?string $domain = null;
    public ?string $error_redirect_link = null;
    public ?string $id = null;
    public ?string $status = null;
    public ?string $updated_at = null;
}

/** Request payload for Domain#load. */
class DomainLoadMatch
{
    public string $id;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?int $limit = null;
    public ?string $status = null;
}

/** Request payload for Domain#create. */
class DomainCreateData
{
    public ?string $created_at = null;
    public ?string $domain = null;
    public ?string $error_redirect_link = null;
    public ?string $id = null;
    public ?string $status = null;
    public ?string $updated_at = null;
}

/** Request payload for Domain#remove. */
class DomainRemoveMatch
{
    public string $id;
}

/** IdentityValidation entity data model. */
class IdentityValidation
{
    public ?string $confidence = null;
    public ?string $id = null;
    public ?string $last_line = null;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?int $score = null;
    public ?string $secondary_line = null;
    public ?string $urbanization = null;
}

/** Request payload for IdentityValidation#create. */
class IdentityValidationCreateData
{
    public ?string $confidence = null;
    public ?string $id = null;
    public ?string $last_line = null;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?int $score = null;
    public ?string $secondary_line = null;
    public ?string $urbanization = null;
}

/** IntlVerification entity data model. */
class IntlVerification
{
    public array $addresses;
    public ?array $components = null;
    public ?string $country = null;
    public ?string $coverage = null;
    public ?string $deliverability = null;
    public bool $errors;
    public ?string $id = null;
    public ?string $last_line = null;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?string $secondary_line = null;
    public ?string $status = null;
}

/** Request payload for IntlVerification#create. */
class IntlVerificationCreateData
{
    public array $addresses;
    public ?array $components = null;
    public ?string $country = null;
    public ?string $coverage = null;
    public ?string $deliverability = null;
    public bool $errors;
    public ?string $id = null;
    public ?string $last_line = null;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?string $secondary_line = null;
    public ?string $status = null;
}

/** Letter entity data model. */
class Letter
{
    public ?string $address_placement = null;
    public ?array $cards = null;
    public ?string $carrier = null;
    public ?bool $color = null;
    public ?string $custom_envelope = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?bool $double_sided = null;
    public ?string $expected_delivery_date = null;
    public ?string $extra_service = null;
    public ?array $from = null;
    public ?bool $fsc = null;
    public ?string $id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $perforated_page = null;
    public ?bool $return_envelope = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $template_id = null;
    public ?string $template_version_id = null;
    public ?array $thumbnails = null;
    public ?array $to = null;
    public ?array $tracking_events = null;
    public ?string $tracking_number = null;
    public ?string $url = null;
    public ?string $use_type = null;
}

/** Request payload for Letter#load. */
class LetterLoadMatch
{
    public string $id;
}

/** Request payload for Letter#list. */
class LetterListMatch
{
    public ?string $campaign_id = null;
    public ?bool $color = null;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?bool $scheduled = null;
    public ?string $send_date = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for Letter#create. */
class LetterCreateData
{
    public ?string $idempotency_key = null;
    public ?string $address_placement = null;
    public ?array $cards = null;
    public ?string $carrier = null;
    public ?bool $color = null;
    public ?string $custom_envelope = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?string $description = null;
    public ?bool $double_sided = null;
    public ?string $expected_delivery_date = null;
    public ?string $extra_service = null;
    public ?array $from = null;
    public ?bool $fsc = null;
    public ?string $id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $perforated_page = null;
    public ?bool $return_envelope = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $template_id = null;
    public ?string $template_version_id = null;
    public ?array $thumbnails = null;
    public ?array $to = null;
    public ?array $tracking_events = null;
    public ?string $tracking_number = null;
    public ?string $url = null;
    public ?string $use_type = null;
}

/** Request payload for Letter#remove. */
class LetterRemoveMatch
{
    public string $id;
}

/** Link entity data model. */
class Link
{
    public ?string $created_at = null;
    public ?string $domain = null;
    public ?string $domain_id = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $redirect_link = null;
    public ?string $short_link = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
}

/** Request payload for Link#load. */
class LinkLoadMatch
{
    public string $id;
}

/** Request payload for Link#list. */
class LinkListMatch
{
    public ?string $campaign_id = null;
    public ?string $domain_id = null;
    public ?int $limit = null;
}

/** Request payload for Link#create. */
class LinkCreateData
{
    public ?string $created_at = null;
    public ?string $domain = null;
    public ?string $domain_id = null;
    public ?string $id = null;
    public ?array $metadata = null;
    public ?string $redirect_link = null;
    public ?string $short_link = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
}

/** Request payload for Link#update. */
class LinkUpdateData
{
    public string $id;
    public ?string $created_at = null;
    public ?string $domain = null;
    public ?string $domain_id = null;
    public ?array $metadata = null;
    public ?string $redirect_link = null;
    public ?string $short_link = null;
    public ?string $slug = null;
    public ?string $title = null;
    public ?string $updated_at = null;
}

/** Request payload for Link#remove. */
class LinkRemoveMatch
{
    public string $id;
}

/** LobCreditsBalance entity data model. */
class LobCreditsBalance
{
    public float $balance;
}

/** Request payload for LobCreditsBalance#load. */
class LobCreditsBalanceLoadMatch
{
    public ?float $balance = null;
}

/** Postcard entity data model. */
class Postcard
{
    public string $back_template_id;
    public ?string $back_template_version_id = null;
    public ?string $campaign_id = null;
    public string $carrier;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public string $front_template_id;
    public ?string $front_template_version_id = null;
    public ?bool $fsc = null;
    public string $id;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public ?string $use_type = null;
}

/** Request payload for Postcard#load. */
class PostcardLoadMatch
{
    public string $id;
}

/** Request payload for Postcard#list. */
class PostcardListMatch
{
    public ?string $campaign_id = null;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?bool $scheduled = null;
    public ?string $send_date = null;
    public ?array $size = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for Postcard#create. */
class PostcardCreateData
{
    public ?string $idempotency_key = null;
    public string $back_template_id;
    public ?string $back_template_version_id = null;
    public ?string $campaign_id = null;
    public string $carrier;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public string $front_template_id;
    public ?string $front_template_version_id = null;
    public ?bool $fsc = null;
    public string $id;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $send_date = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public ?string $use_type = null;
}

/** Request payload for Postcard#remove. */
class PostcardRemoveMatch
{
    public string $id;
}

/** QrCode entity data model. */
class QrCode
{
    public ?string $date_created = null;
    public ?float $number_of_scans = null;
    public ?string $resource_id = null;
    public ?array $scans = null;
}

/** Request payload for QrCode#list. */
class QrCodeListMatch
{
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?array $resource_id = null;
    public ?bool $scanned = null;
}

/** ResourceProof entity data model. */
class ResourceProof
{
    public string $date_created;
    public string $date_modified;
    public ?array $errors = null;
    public string $id;
    public string $object;
    public ?string $resource_type = null;
    public ?string $status = null;
    public ?string $template_id = null;
    public ?array $thumbnails = null;
    public ?string $url = null;
}

/** Request payload for ResourceProof#load. */
class ResourceProofLoadMatch
{
    public string $id;
}

/** Request payload for ResourceProof#create. */
class ResourceProofCreateData
{
    public string $date_created;
    public string $date_modified;
    public ?array $errors = null;
    public string $id;
    public string $object;
    public ?string $resource_type = null;
    public ?string $status = null;
    public ?string $template_id = null;
    public ?array $thumbnails = null;
    public ?string $url = null;
}

/** Request payload for ResourceProof#update. */
class ResourceProofUpdateData
{
    public string $id;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?array $errors = null;
    public ?string $object = null;
    public ?string $resource_type = null;
    public ?string $status = null;
    public ?string $template_id = null;
    public ?array $thumbnails = null;
    public ?string $url = null;
}

/** Response entity data model. */
class Response
{
    public string $account_id;
    public ?string $brand_name = null;
    public string $campaign_code;
    public string $date_created;
    public string $date_modified;
    public bool $deleted;
    public string $end_date;
    public int $end_serial;
    public string $id;
    public ?string $lob_campaign_id = null;
    public string $mode;
    public string $object;
    public ?int $quantity = null;
    public string $representative_image_s3_link;
    public string $ride_along_image_s3_link;
    public ?string $ride_along_url = null;
    public string $service_request_number;
    public ?string $start_date = null;
    public int $start_serial;
    public ?string $status = null;
    public string $usps_campaign_id;
    public ?string $usps_title = null;
}

/** Request payload for Response#load. */
class ResponseLoadMatch
{
    public string $usps_campaign_id;
}

/** Request payload for Response#list. */
class ResponseListMatch
{
    public ?string $account_id = null;
    public ?string $brand_name = null;
    public ?string $campaign_code = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $end_date = null;
    public ?int $end_serial = null;
    public ?string $id = null;
    public ?string $lob_campaign_id = null;
    public ?string $mode = null;
    public ?string $object = null;
    public ?int $quantity = null;
    public ?string $representative_image_s3_link = null;
    public ?string $ride_along_image_s3_link = null;
    public ?string $ride_along_url = null;
    public ?string $service_request_number = null;
    public ?string $start_date = null;
    public ?int $start_serial = null;
    public ?string $status = null;
    public ?string $usps_campaign_id = null;
    public ?string $usps_title = null;
}

/** Request payload for Response#create. */
class ResponseCreateData
{
    public string $account_id;
    public ?string $brand_name = null;
    public string $campaign_code;
    public string $date_created;
    public string $date_modified;
    public bool $deleted;
    public string $end_date;
    public int $end_serial;
    public string $id;
    public ?string $lob_campaign_id = null;
    public string $mode;
    public string $object;
    public ?int $quantity = null;
    public string $representative_image_s3_link;
    public string $ride_along_image_s3_link;
    public ?string $ride_along_url = null;
    public string $service_request_number;
    public ?string $start_date = null;
    public int $start_serial;
    public ?string $status = null;
    public string $usps_campaign_id;
    public ?string $usps_title = null;
}

/** Request payload for Response#update. */
class ResponseUpdateData
{
    public string $usps_campaign_id;
    public ?string $account_id = null;
    public ?string $brand_name = null;
    public ?string $campaign_code = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $end_date = null;
    public ?int $end_serial = null;
    public ?string $id = null;
    public ?string $lob_campaign_id = null;
    public ?string $mode = null;
    public ?string $object = null;
    public ?int $quantity = null;
    public ?string $representative_image_s3_link = null;
    public ?string $ride_along_image_s3_link = null;
    public ?string $ride_along_url = null;
    public ?string $service_request_number = null;
    public ?string $start_date = null;
    public ?int $start_serial = null;
    public ?string $status = null;
    public ?string $usps_title = null;
}

/** ReverseGeocode entity data model. */
class ReverseGeocode
{
    public ?array $addresses = null;
    public ?string $id = null;
    public float $latitude;
    public float $longitude;
    public ?string $object = null;
}

/** Request payload for ReverseGeocode#create. */
class ReverseGeocodeCreateData
{
    public ?int $size = null;
    public ?array $addresses = null;
    public ?string $id = null;
    public float $latitude;
    public float $longitude;
    public ?string $object = null;
}

/** SelfMailer entity data model. */
class SelfMailer
{
    public ?string $campaign_id = null;
    public string $carrier;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public ?bool $fsc = null;
    public string $id;
    public ?string $inside_template_id = null;
    public ?string $inside_template_version_id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $outside_template_id = null;
    public ?string $outside_template_version_id = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for SelfMailer#load. */
class SelfMailerLoadMatch
{
    public string $id;
}

/** Request payload for SelfMailer#list. */
class SelfMailerListMatch
{
    public ?string $campaign_id = null;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?bool $scheduled = null;
    public ?string $send_date = null;
    public ?array $size = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for SelfMailer#create. */
class SelfMailerCreateData
{
    public ?string $idempotency_key = null;
    public ?string $campaign_id = null;
    public string $carrier;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public ?bool $fsc = null;
    public string $id;
    public ?string $inside_template_id = null;
    public ?string $inside_template_version_id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?array $metadata = null;
    public ?string $object = null;
    public ?string $outside_template_id = null;
    public ?string $outside_template_version_id = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for SelfMailer#remove. */
class SelfMailerRemoveMatch
{
    public string $id;
}

/** SnapPack entity data model. */
class SnapPack
{
    public ?string $campaign_id = null;
    public string $carrier;
    public ?bool $color = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public ?bool $fsc = null;
    public string $id;
    public ?string $inside_template_id = null;
    public ?string $inside_template_version_id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?string $object = null;
    public ?string $outside_template_id = null;
    public ?string $outside_template_version_id = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for SnapPack#load. */
class SnapPackLoadMatch
{
    public string $id;
}

/** Request payload for SnapPack#list. */
class SnapPackListMatch
{
    public ?string $campaign_id = null;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?string $mail_type = null;
    public ?array $metadata = null;
    public ?string $send_date = null;
    public mixed $sort_by = null;
    public ?string $status = null;
}

/** Request payload for SnapPack#create. */
class SnapPackCreateData
{
    public ?string $idempotency_key = null;
    public ?string $campaign_id = null;
    public string $carrier;
    public ?bool $color = null;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $expected_delivery_date = null;
    public ?array $failure_reason = null;
    public mixed $from = null;
    public ?bool $fsc = null;
    public string $id;
    public ?string $inside_template_id = null;
    public ?string $inside_template_version_id = null;
    public ?string $mail_type = null;
    public ?array $merge_variables = null;
    public ?string $object = null;
    public ?string $outside_template_id = null;
    public ?string $outside_template_version_id = null;
    public ?string $send_date = null;
    public ?string $size = null;
    public ?string $sla = null;
    public ?string $status = null;
    public ?array $thumbnails = null;
    public mixed $to;
    public ?array $tracking_events = null;
    public string $url;
    public string $use_type;
}

/** Request payload for SnapPack#remove. */
class SnapPackRemoveMatch
{
    public string $id;
}

/** Template entity data model. */
class Template
{
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $engine = null;
    public string $html;
    public string $id;
    public ?array $metadata = null;
    public ?string $object = null;
    public mixed $published_version;
    public ?array $required_vars = null;
    public array $versions;
}

/** Request payload for Template#load. */
class TemplateLoadMatch
{
    public string $id;
}

/** Request payload for Template#list. */
class TemplateListMatch
{
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
    public ?array $metadata = null;
}

/** Request payload for Template#create. */
class TemplateCreateData
{
    public string $id;
    public ?string $date_created = null;
    public ?string $date_modified = null;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $engine = null;
    public string $html;
    public ?array $metadata = null;
    public ?string $object = null;
    public mixed $published_version;
    public ?array $required_vars = null;
    public array $versions;
}

/** Request payload for Template#remove. */
class TemplateRemoveMatch
{
    public string $id;
}

/** TemplateVersion entity data model. */
class TemplateVersion
{
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $engine = null;
    public string $html;
    public string $id;
    public ?array $merge_variables = null;
    public string $object;
    public ?array $required_vars = null;
    public ?bool $suggest_json_editor = null;
}

/** Request payload for TemplateVersion#load. */
class TemplateVersionLoadMatch
{
    public string $id;
    public string $template_id;
}

/** Request payload for TemplateVersion#list. */
class TemplateVersionListMatch
{
    public string $id;
    public ?array $date_created = null;
    public ?array $include = null;
    public ?int $limit = null;
}

/** Request payload for TemplateVersion#create. */
class TemplateVersionCreateData
{
    public string $id;
    public ?string $template_id = null;
    public string $date_created;
    public string $date_modified;
    public ?bool $deleted = null;
    public ?string $description = null;
    public ?string $engine = null;
    public string $html;
    public ?array $merge_variables = null;
    public string $object;
    public ?array $required_vars = null;
    public ?bool $suggest_json_editor = null;
}

/** TemplateVersionDeletion entity data model. */
class TemplateVersionDeletion
{
}

/** Request payload for TemplateVersionDeletion#remove. */
class TemplateVersionDeletionRemoveMatch
{
    public string $template_id;
    public string $vrsn_id;
}

/** Upload entity data model. */
class Upload
{
    public string $accountId;
    public int $bytesProcessed;
    public mixed $campaignId;
    public string $dateCreated;
    public string $dateModified;
    public bool $deleted;
    public int $failedMailpieces;
    public ?string $failuresUrl = null;
    public string $id;
    public ?array $mergeVariableColumnMapping = null;
    public array $metadata;
    public string $mode;
    public array $optionalAddressColumnMapping;
    public ?string $originalFilename = null;
    public array $requiredAddressColumnMapping;
    public string $s3Url;
    public string $state;
    public int $totalMailpieces;
    public string $type;
    public string $uploadId;
    public int $validatedMailpieces;
}

/** Request payload for Upload#load. */
class UploadLoadMatch
{
    public ?string $ex_id = null;
    public string $id;
}

/** Request payload for Upload#list. */
class UploadListMatch
{
    public ?string $campaign_id = null;
}

/** Request payload for Upload#create. */
class UploadCreateData
{
    public string $accountId;
    public int $bytesProcessed;
    public mixed $campaignId;
    public string $dateCreated;
    public string $dateModified;
    public bool $deleted;
    public int $failedMailpieces;
    public ?string $failuresUrl = null;
    public string $id;
    public ?array $mergeVariableColumnMapping = null;
    public array $metadata;
    public string $mode;
    public array $optionalAddressColumnMapping;
    public ?string $originalFilename = null;
    public array $requiredAddressColumnMapping;
    public string $s3Url;
    public string $state;
    public int $totalMailpieces;
    public string $type;
    public string $uploadId;
    public int $validatedMailpieces;
}

/** Request payload for Upload#update. */
class UploadUpdateData
{
    public string $id;
    public ?string $accountId = null;
    public ?int $bytesProcessed = null;
    public mixed $campaignId = null;
    public ?string $dateCreated = null;
    public ?string $dateModified = null;
    public ?bool $deleted = null;
    public ?int $failedMailpieces = null;
    public ?string $failuresUrl = null;
    public ?array $mergeVariableColumnMapping = null;
    public ?array $metadata = null;
    public ?string $mode = null;
    public ?array $optionalAddressColumnMapping = null;
    public ?string $originalFilename = null;
    public ?array $requiredAddressColumnMapping = null;
    public ?string $s3Url = null;
    public ?string $state = null;
    public ?int $totalMailpieces = null;
    public ?string $type = null;
    public ?string $uploadId = null;
    public ?int $validatedMailpieces = null;
}

/** Request payload for Upload#remove. */
class UploadRemoveMatch
{
    public string $id;
}

/** UploadCreateExport entity data model. */
class UploadCreateExport
{
    public string $exportId;
    public ?string $id = null;
    public string $message;
    public ?string $type = null;
}

/** Request payload for UploadCreateExport#create. */
class UploadCreateExportCreateData
{
    public string $id;
    public string $exportId;
    public string $message;
    public ?string $type = null;
}

/** UsAutocompletion entity data model. */
class UsAutocompletion
{
    public string $address_prefix;
    public ?string $city = null;
    public ?bool $geo_ip_sort = null;
    public ?string $id = null;
    public ?string $object = null;
    public ?string $state = null;
    public ?array $suggestions = null;
    public ?string $zip_code = null;
}

/** Request payload for UsAutocompletion#create. */
class UsAutocompletionCreateData
{
    public ?string $case = null;
    public ?bool $valid_address = null;
    public string $address_prefix;
    public ?string $city = null;
    public ?bool $geo_ip_sort = null;
    public ?string $id = null;
    public ?string $object = null;
    public ?string $state = null;
    public ?array $suggestions = null;
    public ?string $zip_code = null;
}

/** UsVerification entity data model. */
class UsVerification
{
    public array $addresses;
    public array $components;
    public ?string $deliverability = null;
    public array $deliverability_analysis;
    public bool $errors;
    public ?string $id = null;
    public ?string $last_line = null;
    public array $lob_confidence_score;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?string $secondary_line = null;
    public ?string $urbanization = null;
    public ?bool $valid_address = null;
}

/** Request payload for UsVerification#create. */
class UsVerificationCreateData
{
    public ?string $case = null;
    public array $addresses;
    public array $components;
    public ?string $deliverability = null;
    public array $deliverability_analysis;
    public bool $errors;
    public ?string $id = null;
    public ?string $last_line = null;
    public array $lob_confidence_score;
    public ?string $object = null;
    public ?string $primary_line = null;
    public ?string $recipient = null;
    public ?string $secondary_line = null;
    public ?string $urbanization = null;
    public ?bool $valid_address = null;
}

/** Zip entity data model. */
class Zip
{
    public string $zip_code;
}

/** Request payload for Zip#create. */
class ZipCreateData
{
    public string $zip_code;
}

