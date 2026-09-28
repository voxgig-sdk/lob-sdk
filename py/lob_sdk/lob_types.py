# Typed models for the Lob SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Address(TypedDict, total=False):
    address_city: str
    address_country: str
    address_line1: str
    address_state: str
    address_zip: str
    company: str
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    email: str
    id: str
    metadata: dict
    name: str
    next_url: str
    object: str
    phone: str
    previous_url: str
    total_count: int


class AddressLoadMatch(TypedDict):
    id: str


class AddressListMatch(TypedDict, total=False):
    date_created: dict
    include: list
    limit: int
    metadata: dict


class AddressCreateData(TypedDict, total=False):
    address_city: str
    address_country: str
    address_line1: str
    address_state: str
    address_zip: str
    company: str
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    email: str
    id: str
    metadata: dict
    name: str
    next_url: str
    object: str
    phone: str
    previous_url: str
    total_count: int


class AddressRemoveMatch(TypedDict):
    id: str


class BankAccountRequired(TypedDict):
    account_number: str
    account_type: str
    date_created: str
    date_modified: str
    id: str
    object: str
    routing_number: str
    signatory: str


class BankAccount(BankAccountRequired, total=False):
    bank_name: str
    check_template: str
    city: str
    count: int
    data: list
    deleted: bool
    description: str
    fractional_routing_number: str
    metadata: dict
    microdeposit_type: str
    next_url: str
    previous_url: str
    signature_url: Any
    state: str
    total_count: int
    verified: bool
    zipcode: str


class BankAccountLoadMatch(TypedDict):
    id: str


class BankAccountListMatch(TypedDict, total=False):
    date_created: dict
    include: list
    limit: int
    metadata: dict


class BankAccountCreateDataRequired(TypedDict):
    account_number: str
    account_type: str
    date_created: str
    date_modified: str
    id: str
    object: str
    routing_number: str
    signatory: str


class BankAccountCreateData(BankAccountCreateDataRequired, total=False):
    bank_name: str
    check_template: str
    city: str
    count: int
    data: list
    deleted: bool
    description: str
    fractional_routing_number: str
    metadata: dict
    microdeposit_type: str
    next_url: str
    previous_url: str
    signature_url: Any
    state: str
    total_count: int
    verified: bool
    zipcode: str


class BankDeletion(TypedDict):
    pass


class BankDeletionRemoveMatch(TypedDict):
    bank_id: str


class BillingGroup(TypedDict, total=False):
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    id: str
    name: str
    next_url: str
    object: str
    previous_url: str
    total_count: int


class BillingGroupLoadMatch(TypedDict):
    id: str


class BillingGroupListMatch(TypedDict, total=False):
    date_created: dict
    date_modified: dict
    include: list
    limit: int
    offset: int
    sort_by: Any


class BillingGroupCreateDataRequired(TypedDict):
    id: str


class BillingGroupCreateData(BillingGroupCreateDataRequired, total=False):
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    name: str
    next_url: str
    object: str
    previous_url: str
    total_count: int


class Booklet(TypedDict, total=False):
    carrier: str
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    expected_delivery_date: str
    fsc: bool
    id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    pages: int
    previous_url: str
    send_date: str
    size: str
    sla: str
    source_material: str
    thumbnails: list
    to: dict
    total_count: int
    tracking_events: list
    tracking_number: str
    url: str
    use_type: str


class BookletLoadMatch(TypedDict):
    id: str


class BookletListMatch(TypedDict, total=False):
    campaign_id: str
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    send_date: str
    sort_by: Any
    status: str


class BookletCreateData(TypedDict, total=False):
    idempotency_key: str
    carrier: str
    count: int
    data: list
    date_created: str
    date_modified: str
    description: str
    expected_delivery_date: str
    fsc: bool
    id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    pages: int
    previous_url: str
    send_date: str
    size: str
    sla: str
    source_material: str
    thumbnails: list
    to: dict
    total_count: int
    tracking_events: list
    tracking_number: str
    url: str
    use_type: str


class BookletRemoveMatch(TypedDict):
    id: str


class BuckslipRequired(TypedDict):
    allocated_quantity: float
    auto_reorder: bool
    available_quantity: float
    back_original_url: str
    buckslip_orders: list
    date_created: str
    date_modified: str
    finish: str
    front_original_url: str
    id: str
    object: str
    onhand_quantity: float
    pending_quantity: float
    projected_quantity: float
    raw_url: str
    reorder_quantity: int
    status: str
    stock: str
    threshold_amount: int
    thumbnails: list
    url: str
    weight: str


class Buckslip(BuckslipRequired, total=False):
    account_id: str
    count: int
    data: list
    deleted: bool
    description: str
    mode: str
    next_url: str
    previous_url: str
    send_date: str
    size: str
    total_count: int


class BuckslipLoadMatch(TypedDict):
    id: str


class BuckslipListMatch(TypedDict, total=False):
    include: list
    limit: int


class BuckslipCreateDataRequired(TypedDict):
    allocated_quantity: float
    auto_reorder: bool
    available_quantity: float
    back_original_url: str
    buckslip_orders: list
    date_created: str
    date_modified: str
    finish: str
    front_original_url: str
    id: str
    object: str
    onhand_quantity: float
    pending_quantity: float
    projected_quantity: float
    raw_url: str
    reorder_quantity: int
    status: str
    stock: str
    threshold_amount: int
    thumbnails: list
    url: str
    weight: str


class BuckslipCreateData(BuckslipCreateDataRequired, total=False):
    account_id: str
    count: int
    data: list
    deleted: bool
    description: str
    mode: str
    next_url: str
    previous_url: str
    send_date: str
    size: str
    total_count: int


class BuckslipUpdateDataRequired(TypedDict):
    id: str


class BuckslipUpdateData(BuckslipUpdateDataRequired, total=False):
    account_id: str
    allocated_quantity: float
    auto_reorder: bool
    available_quantity: float
    back_original_url: str
    buckslip_orders: list
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    finish: str
    front_original_url: str
    mode: str
    next_url: str
    object: str
    onhand_quantity: float
    pending_quantity: float
    previous_url: str
    projected_quantity: float
    raw_url: str
    reorder_quantity: int
    send_date: str
    size: str
    status: str
    stock: str
    threshold_amount: int
    thumbnails: list
    total_count: int
    url: str
    weight: str


class BuckslipRemoveMatch(TypedDict):
    id: str


class BuckslipOrderRequired(TypedDict):
    quantity: int


class BuckslipOrder(BuckslipOrderRequired, total=False):
    count: int
    data: list
    id: str
    next_url: str
    object: str
    previous_url: str
    total_count: int


class BuckslipOrderListMatchRequired(TypedDict):
    id: str


class BuckslipOrderListMatch(BuckslipOrderListMatchRequired, total=False):
    limit: int
    offset: int


class BuckslipOrderCreateDataRequired(TypedDict):
    id: str
    quantity: int


class BuckslipOrderCreateData(BuckslipOrderCreateDataRequired, total=False):
    count: int
    data: list
    next_url: str
    object: str
    previous_url: str
    total_count: int


class CampaignRequired(TypedDict):
    creatives: list
    date_created: str
    date_modified: str
    id: str
    is_draft: bool
    name: str
    object: str
    schedule_type: str
    uploads: list
    use_type: str


class Campaign(CampaignRequired, total=False):
    auto_cancel_if_ncoa: bool
    billing_group_id: str
    cancel_window_campaign_minutes: int
    count: int
    data: list
    deleted: bool
    description: str
    metadata: dict
    next_url: str
    previous_url: str
    print_speed: str
    send_date: str
    target_delivery_date: str
    total_count: int


class CampaignLoadMatch(TypedDict):
    id: str


class CampaignListMatch(TypedDict, total=False):
    include: list
    limit: int


class CampaignCreateDataRequired(TypedDict):
    creatives: list
    date_created: str
    date_modified: str
    id: str
    is_draft: bool
    name: str
    object: str
    schedule_type: str
    uploads: list
    use_type: str


class CampaignCreateData(CampaignCreateDataRequired, total=False):
    auto_cancel_if_ncoa: bool
    billing_group_id: str
    cancel_window_campaign_minutes: int
    count: int
    data: list
    deleted: bool
    description: str
    metadata: dict
    next_url: str
    previous_url: str
    print_speed: str
    send_date: str
    target_delivery_date: str
    total_count: int


class CampaignUpdateDataRequired(TypedDict):
    id: str


class CampaignUpdateData(CampaignUpdateDataRequired, total=False):
    auto_cancel_if_ncoa: bool
    billing_group_id: str
    cancel_window_campaign_minutes: int
    count: int
    creatives: list
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    is_draft: bool
    metadata: dict
    name: str
    next_url: str
    object: str
    previous_url: str
    print_speed: str
    schedule_type: str
    send_date: str
    target_delivery_date: str
    total_count: int
    uploads: list
    use_type: str


class CampaignRemoveMatch(TypedDict):
    id: str


class CardRequired(TypedDict):
    auto_reorder: bool
    available_quantity: int
    back_original_url: str
    date_created: str
    date_modified: str
    front_original_url: str
    id: str
    object: str
    orientation: str
    pending_quantity: int
    raw_url: str
    reorder_quantity: int
    status: str
    threshold_amount: int
    thumbnails: list
    url: str


class Card(CardRequired, total=False):
    account_id: str
    count: int
    countries: str
    data: list
    deleted: bool
    description: str
    mode: str
    next_url: str
    previous_url: str
    send_date: str
    size: str
    total_count: int


class CardLoadMatch(TypedDict):
    id: str


class CardListMatch(TypedDict, total=False):
    include: list
    limit: int


class CardCreateDataRequired(TypedDict):
    id: str
    auto_reorder: bool
    available_quantity: int
    back_original_url: str
    date_created: str
    date_modified: str
    front_original_url: str
    object: str
    orientation: str
    pending_quantity: int
    raw_url: str
    reorder_quantity: int
    status: str
    threshold_amount: int
    thumbnails: list
    url: str


class CardCreateData(CardCreateDataRequired, total=False):
    account_id: str
    count: int
    countries: str
    data: list
    deleted: bool
    description: str
    mode: str
    next_url: str
    previous_url: str
    send_date: str
    size: str
    total_count: int


class CardRemoveMatch(TypedDict):
    id: str


class CardOrderRequired(TypedDict):
    quantity: int


class CardOrder(CardOrderRequired, total=False):
    count: int
    data: list
    id: str
    next_url: str
    object: str
    previous_url: str
    total_count: int


class CardOrderListMatchRequired(TypedDict):
    id: str


class CardOrderListMatch(CardOrderListMatchRequired, total=False):
    limit: int
    offset: int


class CardOrderCreateDataRequired(TypedDict):
    id: str
    quantity: int


class CardOrderCreateData(CardOrderCreateDataRequired, total=False):
    count: int
    data: list
    next_url: str
    object: str
    previous_url: str
    total_count: int


class CheckRequired(TypedDict):
    amount: float
    bank_account: Any
    carrier: str
    date_created: str
    date_modified: str
    id: str
    to: Any
    url: str
    use_type: str


class Check(CheckRequired, total=False):
    attachment_template_id: str
    attachment_template_version_id: str
    check_bottom_template_id: str
    check_bottom_template_version_id: str
    check_number: int
    count: int
    data: list
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    mail_type: str
    memo: str
    merge_variables: dict
    message: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    send_date: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class CheckLoadMatch(TypedDict):
    id: str


class CheckListMatch(TypedDict, total=False):
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    scheduled: bool
    send_date: str
    sort_by: Any
    status: str


class CheckCreateDataRequired(TypedDict):
    amount: float
    bank_account: Any
    carrier: str
    date_created: str
    date_modified: str
    id: str
    to: Any
    url: str
    use_type: str


class CheckCreateData(CheckCreateDataRequired, total=False):
    idempotency_key: str
    attachment_template_id: str
    attachment_template_version_id: str
    check_bottom_template_id: str
    check_bottom_template_version_id: str
    check_number: int
    count: int
    data: list
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    mail_type: str
    memo: str
    merge_variables: dict
    message: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    send_date: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class CheckRemoveMatch(TypedDict):
    id: str


class CreativeRequired(TypedDict):
    campaigns: list
    date_created: str
    date_modified: str
    id: str
    object: str
    template_preview_urls: dict
    template_previews: list


class Creative(CreativeRequired, total=False):
    deleted: bool
    description: str
    details: dict
    metadata: dict
    resource_type: str


class CreativeLoadMatch(TypedDict):
    id: str


class CreativeCreateDataRequired(TypedDict):
    campaigns: list
    date_created: str
    date_modified: str
    id: str
    object: str
    template_preview_urls: dict
    template_previews: list


class CreativeCreateData(CreativeCreateDataRequired, total=False):
    deleted: bool
    description: str
    details: dict
    metadata: dict
    resource_type: str


class CreativeUpdateDataRequired(TypedDict):
    id: str


class CreativeUpdateData(CreativeUpdateDataRequired, total=False):
    campaigns: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    details: dict
    metadata: dict
    object: str
    resource_type: str
    template_preview_urls: dict
    template_previews: list


class Domain(TypedDict, total=False):
    count: int
    created_at: str
    data: list
    domain: str
    error_redirect_link: str
    id: str
    next_url: str
    object: str
    previous_url: str
    status: str
    total_count: int
    updated_at: str


class DomainLoadMatch(TypedDict):
    id: str


class DomainListMatch(TypedDict, total=False):
    limit: int
    status: str


class DomainCreateData(TypedDict, total=False):
    count: int
    created_at: str
    data: list
    domain: str
    error_redirect_link: str
    id: str
    next_url: str
    object: str
    previous_url: str
    status: str
    total_count: int
    updated_at: str


class DomainRemoveMatch(TypedDict):
    id: str


class IdentityValidation(TypedDict, total=False):
    confidence: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    score: int
    secondary_line: str
    urbanization: str


class IdentityValidationCreateData(TypedDict, total=False):
    confidence: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    score: int
    secondary_line: str
    urbanization: str


class IntlVerificationRequired(TypedDict):
    addresses: list
    errors: bool


class IntlVerification(IntlVerificationRequired, total=False):
    components: dict
    country: str
    coverage: str
    deliverability: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    secondary_line: str
    status: str


class IntlVerificationCreateDataRequired(TypedDict):
    addresses: list
    errors: bool


class IntlVerificationCreateData(IntlVerificationCreateDataRequired, total=False):
    components: dict
    country: str
    coverage: str
    deliverability: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    secondary_line: str
    status: str


class Letter(TypedDict, total=False):
    address_placement: str
    cards: list
    carrier: str
    color: bool
    count: int
    custom_envelope: str
    data: list
    date_created: str
    date_modified: str
    description: str
    double_sided: bool
    expected_delivery_date: str
    extra_service: str
    fsc: bool
    id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    perforated_page: str
    previous_url: str
    return_envelope: bool
    send_date: str
    sla: str
    thumbnails: list
    to: dict
    total_count: int
    tracking_events: list
    tracking_number: str
    url: str
    use_type: str


class LetterLoadMatch(TypedDict):
    id: str


class LetterListMatch(TypedDict, total=False):
    campaign_id: str
    color: bool
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    scheduled: bool
    send_date: str
    sort_by: Any
    status: str


class LetterCreateData(TypedDict, total=False):
    idempotency_key: str
    address_placement: str
    cards: list
    carrier: str
    color: bool
    count: int
    custom_envelope: str
    data: list
    date_created: str
    date_modified: str
    description: str
    double_sided: bool
    expected_delivery_date: str
    extra_service: str
    fsc: bool
    id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    perforated_page: str
    previous_url: str
    return_envelope: bool
    send_date: str
    sla: str
    thumbnails: list
    to: dict
    total_count: int
    tracking_events: list
    tracking_number: str
    url: str
    use_type: str


class LetterRemoveMatch(TypedDict):
    id: str


class LinkRequired(TypedDict):
    redirect_link: str


class Link(LinkRequired, total=False):
    count: int
    data: list
    domain: str
    id: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    slug: str
    title: str
    total_count: int


class LinkLoadMatch(TypedDict):
    id: str


class LinkListMatch(TypedDict, total=False):
    campaign_id: str
    domain_id: str
    limit: int


class LinkCreateDataRequired(TypedDict):
    redirect_link: str


class LinkCreateData(LinkCreateDataRequired, total=False):
    count: int
    data: list
    domain: str
    id: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    slug: str
    title: str
    total_count: int


class LinkUpdateDataRequired(TypedDict):
    id: str


class LinkUpdateData(LinkUpdateDataRequired, total=False):
    count: int
    data: list
    domain: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    redirect_link: str
    slug: str
    title: str
    total_count: int


class LinkRemoveMatch(TypedDict):
    id: str


class LobCreditsBalance(TypedDict):
    balance: float


class LobCreditsBalanceLoadMatch(TypedDict, total=False):
    balance: float


class PostcardRequired(TypedDict):
    back_template_id: str
    carrier: str
    front_template_id: str
    id: str
    to: Any
    url: str


class Postcard(PostcardRequired, total=False):
    back_template_version_id: str
    campaign_id: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    front_template_version_id: str
    fsc: bool
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    send_date: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list
    use_type: str


class PostcardLoadMatch(TypedDict):
    id: str


class PostcardListMatch(TypedDict, total=False):
    campaign_id: str
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    scheduled: bool
    send_date: str
    size: list
    sort_by: Any
    status: str


class PostcardCreateDataRequired(TypedDict):
    back_template_id: str
    carrier: str
    front_template_id: str
    id: str
    to: Any
    url: str


class PostcardCreateData(PostcardCreateDataRequired, total=False):
    idempotency_key: str
    back_template_version_id: str
    campaign_id: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    front_template_version_id: str
    fsc: bool
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    send_date: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list
    use_type: str


class PostcardRemoveMatch(TypedDict):
    id: str


class QrCode(TypedDict, total=False):
    count: int
    data: list
    object: str
    scanned_count: int
    total_count: int


class QrCodeListMatch(TypedDict, total=False):
    date_created: dict
    include: list
    limit: int
    offset: int
    resource_id: list
    scanned: bool


class ResourceProofRequired(TypedDict):
    date_created: str
    date_modified: str
    id: str
    object: str


class ResourceProof(ResourceProofRequired, total=False):
    errors: list
    resource_type: str
    status: str
    template_id: str
    thumbnails: list
    url: str


class ResourceProofLoadMatch(TypedDict):
    id: str


class ResourceProofCreateDataRequired(TypedDict):
    date_created: str
    date_modified: str
    id: str
    object: str


class ResourceProofCreateData(ResourceProofCreateDataRequired, total=False):
    errors: list
    resource_type: str
    status: str
    template_id: str
    thumbnails: list
    url: str


class ResourceProofUpdateDataRequired(TypedDict):
    id: str


class ResourceProofUpdateData(ResourceProofUpdateDataRequired, total=False):
    date_created: str
    date_modified: str
    errors: list
    object: str
    resource_type: str
    status: str
    template_id: str
    thumbnails: list
    url: str


class ResponseRequired(TypedDict):
    account_id: str
    campaign_code: str
    date_created: str
    date_modified: str
    deleted: bool
    end_date: str
    end_serial: int
    id: str
    mode: str
    object: str
    representative_image_s3_link: str
    ride_along_image_s3_link: str
    service_request_number: str
    start_serial: int
    usps_campaign_id: str


class Response(ResponseRequired, total=False):
    brand_name: str
    count: int
    data: list
    lob_campaign_id: str
    next_url: str
    previous_url: str
    quantity: int
    ride_along_url: str
    start_date: str
    status: str
    total_count: int
    usps_title: str


class ResponseLoadMatch(TypedDict):
    usps_campaign_id: str


class ResponseListMatch(TypedDict, total=False):
    account_id: str
    brand_name: str
    campaign_code: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    end_date: str
    end_serial: int
    id: str
    lob_campaign_id: str
    mode: str
    next_url: str
    object: str
    previous_url: str
    quantity: int
    representative_image_s3_link: str
    ride_along_image_s3_link: str
    ride_along_url: str
    service_request_number: str
    start_date: str
    start_serial: int
    status: str
    total_count: int
    usps_campaign_id: str
    usps_title: str


class ResponseCreateDataRequired(TypedDict):
    account_id: str
    campaign_code: str
    date_created: str
    date_modified: str
    deleted: bool
    end_date: str
    end_serial: int
    id: str
    mode: str
    object: str
    representative_image_s3_link: str
    ride_along_image_s3_link: str
    service_request_number: str
    start_serial: int
    usps_campaign_id: str


class ResponseCreateData(ResponseCreateDataRequired, total=False):
    brand_name: str
    count: int
    data: list
    lob_campaign_id: str
    next_url: str
    previous_url: str
    quantity: int
    ride_along_url: str
    start_date: str
    status: str
    total_count: int
    usps_title: str


class ResponseUpdateDataRequired(TypedDict):
    usps_campaign_id: str


class ResponseUpdateData(ResponseUpdateDataRequired, total=False):
    account_id: str
    brand_name: str
    campaign_code: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    end_date: str
    end_serial: int
    id: str
    lob_campaign_id: str
    mode: str
    next_url: str
    object: str
    previous_url: str
    quantity: int
    representative_image_s3_link: str
    ride_along_image_s3_link: str
    ride_along_url: str
    service_request_number: str
    start_date: str
    start_serial: int
    status: str
    total_count: int
    usps_title: str


class ReverseGeocodeRequired(TypedDict):
    latitude: float
    longitude: float


class ReverseGeocode(ReverseGeocodeRequired, total=False):
    addresses: list
    id: str
    object: str


class ReverseGeocodeCreateDataRequired(TypedDict):
    latitude: float
    longitude: float


class ReverseGeocodeCreateData(ReverseGeocodeCreateDataRequired, total=False):
    size: int
    addresses: list
    id: str
    object: str


class SelfMailerRequired(TypedDict):
    carrier: str
    id: str
    to: Any
    url: str
    use_type: str


class SelfMailer(SelfMailerRequired, total=False):
    campaign_id: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    fsc: bool
    inside_template_id: str
    inside_template_version_id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    outside_template_id: str
    outside_template_version_id: str
    previous_url: str
    send_date: str
    size: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class SelfMailerLoadMatch(TypedDict):
    id: str


class SelfMailerListMatch(TypedDict, total=False):
    campaign_id: str
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    scheduled: bool
    send_date: str
    size: list
    sort_by: Any
    status: str


class SelfMailerCreateDataRequired(TypedDict):
    carrier: str
    id: str
    to: Any
    url: str
    use_type: str


class SelfMailerCreateData(SelfMailerCreateDataRequired, total=False):
    idempotency_key: str
    campaign_id: str
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    fsc: bool
    inside_template_id: str
    inside_template_version_id: str
    mail_type: str
    merge_variables: dict
    metadata: dict
    next_url: str
    object: str
    outside_template_id: str
    outside_template_version_id: str
    previous_url: str
    send_date: str
    size: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class SelfMailerRemoveMatch(TypedDict):
    id: str


class SnapPackRequired(TypedDict):
    carrier: str
    id: str
    to: Any
    url: str
    use_type: str


class SnapPack(SnapPackRequired, total=False):
    campaign_id: str
    color: bool
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    fsc: bool
    inside_template_id: str
    inside_template_version_id: str
    mail_type: str
    merge_variables: dict
    next_url: str
    object: str
    outside_template_id: str
    outside_template_version_id: str
    previous_url: str
    send_date: str
    size: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class SnapPackLoadMatch(TypedDict):
    id: str


class SnapPackListMatch(TypedDict, total=False):
    campaign_id: str
    date_created: dict
    include: list
    limit: int
    mail_type: str
    metadata: dict
    send_date: str
    sort_by: Any
    status: str


class SnapPackCreateDataRequired(TypedDict):
    carrier: str
    id: str
    to: Any
    url: str
    use_type: str


class SnapPackCreateData(SnapPackCreateDataRequired, total=False):
    idempotency_key: str
    campaign_id: str
    color: bool
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    expected_delivery_date: str
    failure_reason: dict
    fsc: bool
    inside_template_id: str
    inside_template_version_id: str
    mail_type: str
    merge_variables: dict
    next_url: str
    object: str
    outside_template_id: str
    outside_template_version_id: str
    previous_url: str
    send_date: str
    size: str
    sla: str
    status: str
    thumbnails: list
    total_count: int
    tracking_events: list


class SnapPackRemoveMatch(TypedDict):
    id: str


class TemplateRequired(TypedDict):
    html: str
    id: str
    published_version: Any
    versions: list


class Template(TemplateRequired, total=False):
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    engine: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    required_vars: list
    total_count: int


class TemplateLoadMatch(TypedDict):
    id: str


class TemplateListMatch(TypedDict, total=False):
    date_created: dict
    include: list
    limit: int
    metadata: dict


class TemplateCreateDataRequired(TypedDict):
    id: str
    html: str
    published_version: Any
    versions: list


class TemplateCreateData(TemplateCreateDataRequired, total=False):
    count: int
    data: list
    date_created: str
    date_modified: str
    deleted: bool
    description: str
    engine: str
    metadata: dict
    next_url: str
    object: str
    previous_url: str
    required_vars: list
    total_count: int


class TemplateRemoveMatch(TypedDict):
    id: str


class TemplateVersionRequired(TypedDict):
    date_created: str
    date_modified: str
    html: str
    id: str
    object: str


class TemplateVersion(TemplateVersionRequired, total=False):
    count: int
    data: list
    deleted: bool
    description: str
    engine: str
    merge_variables: dict
    next_url: str
    previous_url: str
    required_vars: list
    suggest_json_editor: bool
    total_count: int


class TemplateVersionLoadMatch(TypedDict):
    id: str
    template_id: str


class TemplateVersionListMatchRequired(TypedDict):
    id: str


class TemplateVersionListMatch(TemplateVersionListMatchRequired, total=False):
    date_created: dict
    include: list
    limit: int


class TemplateVersionCreateDataRequired(TypedDict):
    id: str
    date_created: str
    date_modified: str
    html: str
    object: str


class TemplateVersionCreateData(TemplateVersionCreateDataRequired, total=False):
    template_id: str
    count: int
    data: list
    deleted: bool
    description: str
    engine: str
    merge_variables: dict
    next_url: str
    previous_url: str
    required_vars: list
    suggest_json_editor: bool
    total_count: int


class TemplateVersionDeletion(TypedDict):
    pass


class TemplateVersionDeletionRemoveMatch(TypedDict):
    template_id: str
    vrsn_id: str


class UploadRequired(TypedDict):
    accountId: str
    bytesProcessed: int
    campaignId: Any
    dateCreated: str
    dateModified: str
    deleted: bool
    failedMailpieces: int
    id: str
    metadata: dict
    mode: str
    optionalAddressColumnMapping: dict
    requiredAddressColumnMapping: dict
    s3Url: str
    state: str
    totalMailpieces: int
    type: str
    uploadId: str
    validatedMailpieces: int


class Upload(UploadRequired, total=False):
    failuresUrl: str
    mergeVariableColumnMapping: dict
    originalFilename: str


class UploadLoadMatchRequired(TypedDict):
    id: str


class UploadLoadMatch(UploadLoadMatchRequired, total=False):
    ex_id: str


class UploadListMatch(TypedDict, total=False):
    campaign_id: str


class UploadCreateDataRequired(TypedDict):
    accountId: str
    bytesProcessed: int
    campaignId: Any
    dateCreated: str
    dateModified: str
    deleted: bool
    failedMailpieces: int
    id: str
    metadata: dict
    mode: str
    optionalAddressColumnMapping: dict
    requiredAddressColumnMapping: dict
    s3Url: str
    state: str
    totalMailpieces: int
    type: str
    uploadId: str
    validatedMailpieces: int


class UploadCreateData(UploadCreateDataRequired, total=False):
    failuresUrl: str
    mergeVariableColumnMapping: dict
    originalFilename: str


class UploadUpdateDataRequired(TypedDict):
    id: str


class UploadUpdateData(UploadUpdateDataRequired, total=False):
    accountId: str
    bytesProcessed: int
    campaignId: Any
    dateCreated: str
    dateModified: str
    deleted: bool
    failedMailpieces: int
    failuresUrl: str
    mergeVariableColumnMapping: dict
    metadata: dict
    mode: str
    optionalAddressColumnMapping: dict
    originalFilename: str
    requiredAddressColumnMapping: dict
    s3Url: str
    state: str
    totalMailpieces: int
    type: str
    uploadId: str
    validatedMailpieces: int


class UploadRemoveMatch(TypedDict):
    id: str


class UploadCreateExportRequired(TypedDict):
    exportId: str
    message: str


class UploadCreateExport(UploadCreateExportRequired, total=False):
    id: str
    type: str


class UploadCreateExportCreateDataRequired(TypedDict):
    id: str
    exportId: str
    message: str


class UploadCreateExportCreateData(UploadCreateExportCreateDataRequired, total=False):
    type: str


class UsAutocompletionRequired(TypedDict):
    address_prefix: str


class UsAutocompletion(UsAutocompletionRequired, total=False):
    city: str
    geo_ip_sort: bool
    id: str
    object: str
    state: str
    suggestions: list
    zip_code: str


class UsAutocompletionCreateDataRequired(TypedDict):
    address_prefix: str


class UsAutocompletionCreateData(UsAutocompletionCreateDataRequired, total=False):
    case: str
    valid_address: bool
    city: str
    geo_ip_sort: bool
    id: str
    object: str
    state: str
    suggestions: list
    zip_code: str


class UsVerificationRequired(TypedDict):
    addresses: list
    components: dict
    deliverability_analysis: dict
    errors: bool
    lob_confidence_score: dict


class UsVerification(UsVerificationRequired, total=False):
    deliverability: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    secondary_line: str
    urbanization: str
    valid_address: bool


class UsVerificationCreateDataRequired(TypedDict):
    addresses: list
    components: dict
    deliverability_analysis: dict
    errors: bool
    lob_confidence_score: dict


class UsVerificationCreateData(UsVerificationCreateDataRequired, total=False):
    case: str
    deliverability: str
    id: str
    last_line: str
    object: str
    primary_line: str
    recipient: str
    secondary_line: str
    urbanization: str
    valid_address: bool


class Zip(TypedDict):
    zip_code: str


class ZipCreateData(TypedDict):
    zip_code: str
