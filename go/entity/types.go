// Typed models for the Lob SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/lob-sdk/go/core"
)

// Address is the typed data model for the address entity.
type Address struct {
}

// AddressLoadMatch is the typed request payload for Address.LoadTyped.
type AddressLoadMatch struct {
	Id string `json:"id"`
}

// AddressListMatch is the typed request payload for Address.ListTyped.
type AddressListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
}

// AddressCreateData is the typed request payload for Address.CreateTyped.
type AddressCreateData struct {
	AddressCity *string `json:"address_city,omitempty"`
	AddressCountry *string `json:"address_country,omitempty"`
	AddressLine1 *string `json:"address_line1,omitempty"`
	AddressLine2 *string `json:"address_line2,omitempty"`
	AddressState *string `json:"address_state,omitempty"`
	AddressZip *string `json:"address_zip,omitempty"`
	Company *string `json:"company,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Description *string `json:"description,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name *string `json:"name,omitempty"`
	Object *string `json:"object,omitempty"`
	Phone *string `json:"phone,omitempty"`
}

// AddressRemoveMatch is the typed request payload for Address.RemoveTyped.
type AddressRemoveMatch struct {
	Id string `json:"id"`
}

// BankAccount is the typed data model for the bank_account entity.
type BankAccount struct {
}

// BankAccountLoadMatch is the typed request payload for BankAccount.LoadTyped.
type BankAccountLoadMatch struct {
	Id string `json:"id"`
}

// BankAccountListMatch is the typed request payload for BankAccount.ListTyped.
type BankAccountListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
}

// BankAccountCreateData is the typed request payload for BankAccount.CreateTyped.
type BankAccountCreateData struct {
	AccountNumber string `json:"account_number"`
	AccountType string `json:"account_type"`
	BankName *string `json:"bank_name,omitempty"`
	CheckTemplate *string `json:"check_template,omitempty"`
	City *string `json:"city,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	FractionalRoutingNumber *string `json:"fractional_routing_number,omitempty"`
	Id string `json:"id"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	MicrodepositType *string `json:"microdeposit_type,omitempty"`
	Object string `json:"object"`
	RoutingNumber string `json:"routing_number"`
	Signatory string `json:"signatory"`
	SignatureUrl *any `json:"signature_url,omitempty"`
	State *string `json:"state,omitempty"`
	Verified *bool `json:"verified,omitempty"`
	Zipcode *string `json:"zipcode,omitempty"`
}

// BankDeletion is the typed data model for the bank_deletion entity.
type BankDeletion struct {
}

// BankDeletionRemoveMatch is the typed request payload for BankDeletion.RemoveTyped.
type BankDeletionRemoveMatch struct {
	BankId string `json:"bank_id"`
}

// BillingGroup is the typed data model for the billing_group entity.
type BillingGroup struct {
}

// BillingGroupLoadMatch is the typed request payload for BillingGroup.LoadTyped.
type BillingGroupLoadMatch struct {
	Id string `json:"id"`
}

// BillingGroupListMatch is the typed request payload for BillingGroup.ListTyped.
type BillingGroupListMatch struct {
	DateCreated *map[string]any `json:"date_created,omitempty"`
	DateModified *map[string]any `json:"date_modified,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
}

// BillingGroupCreateData is the typed request payload for BillingGroup.CreateTyped.
type BillingGroupCreateData struct {
	Id string `json:"id"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
	Object *string `json:"object,omitempty"`
}

// Booklet is the typed data model for the booklet entity.
type Booklet struct {
}

// BookletLoadMatch is the typed request payload for Booklet.LoadTyped.
type BookletLoadMatch struct {
	Id string `json:"id"`
}

// BookletListMatch is the typed request payload for Booklet.ListTyped.
type BookletListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// BookletCreateData is the typed request payload for Booklet.CreateTyped.
type BookletCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Carrier *string `json:"carrier,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	From *map[string]any `json:"from,omitempty"`
	Fsc *bool `json:"fsc,omitempty"`
	Id *string `json:"id,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	Pages *int `json:"pages,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Sla *string `json:"sla,omitempty"`
	SourceMaterial *string `json:"source_material,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To *map[string]any `json:"to,omitempty"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	TrackingNumber *string `json:"tracking_number,omitempty"`
	Url *string `json:"url,omitempty"`
	UseType *string `json:"use_type,omitempty"`
}

// BookletRemoveMatch is the typed request payload for Booklet.RemoveTyped.
type BookletRemoveMatch struct {
	Id string `json:"id"`
}

// Buckslip is the typed data model for the buckslip entity.
type Buckslip struct {
}

// BuckslipLoadMatch is the typed request payload for Buckslip.LoadTyped.
type BuckslipLoadMatch struct {
	Id string `json:"id"`
}

// BuckslipListMatch is the typed request payload for Buckslip.ListTyped.
type BuckslipListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// BuckslipCreateData is the typed request payload for Buckslip.CreateTyped.
type BuckslipCreateData struct {
	AccountId *string `json:"account_id,omitempty"`
	AllocatedQuantity float64 `json:"allocated_quantity"`
	AutoReorder bool `json:"auto_reorder"`
	AvailableQuantity float64 `json:"available_quantity"`
	BackOriginalUrl string `json:"back_original_url"`
	BuckslipOrders []any `json:"buckslip_orders"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Finish string `json:"finish"`
	FrontOriginalUrl string `json:"front_original_url"`
	Id string `json:"id"`
	Mode *string `json:"mode,omitempty"`
	Object string `json:"object"`
	OnhandQuantity float64 `json:"onhand_quantity"`
	PendingQuantity float64 `json:"pending_quantity"`
	ProjectedQuantity float64 `json:"projected_quantity"`
	RawUrl string `json:"raw_url"`
	ReorderQuantity int `json:"reorder_quantity"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Status string `json:"status"`
	Stock string `json:"stock"`
	ThresholdAmount int `json:"threshold_amount"`
	Thumbnails []any `json:"thumbnails"`
	Url string `json:"url"`
	Weight string `json:"weight"`
}

// BuckslipUpdateData is the typed request payload for Buckslip.UpdateTyped.
type BuckslipUpdateData struct {
	Id string `json:"id"`
	AccountId *string `json:"account_id,omitempty"`
	AllocatedQuantity *float64 `json:"allocated_quantity,omitempty"`
	AutoReorder *bool `json:"auto_reorder,omitempty"`
	AvailableQuantity *float64 `json:"available_quantity,omitempty"`
	BackOriginalUrl *string `json:"back_original_url,omitempty"`
	BuckslipOrders *[]any `json:"buckslip_orders,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Finish *string `json:"finish,omitempty"`
	FrontOriginalUrl *string `json:"front_original_url,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Object *string `json:"object,omitempty"`
	OnhandQuantity *float64 `json:"onhand_quantity,omitempty"`
	PendingQuantity *float64 `json:"pending_quantity,omitempty"`
	ProjectedQuantity *float64 `json:"projected_quantity,omitempty"`
	RawUrl *string `json:"raw_url,omitempty"`
	ReorderQuantity *int `json:"reorder_quantity,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Stock *string `json:"stock,omitempty"`
	ThresholdAmount *int `json:"threshold_amount,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	Url *string `json:"url,omitempty"`
	Weight *string `json:"weight,omitempty"`
}

// BuckslipRemoveMatch is the typed request payload for Buckslip.RemoveTyped.
type BuckslipRemoveMatch struct {
	Id string `json:"id"`
}

// BuckslipOrder is the typed data model for the buckslip_order entity.
type BuckslipOrder struct {
}

// BuckslipOrderListMatch is the typed request payload for BuckslipOrder.ListTyped.
type BuckslipOrderListMatch struct {
	Id string `json:"id"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// BuckslipOrderCreateData is the typed request payload for BuckslipOrder.CreateTyped.
type BuckslipOrderCreateData struct {
	Id string `json:"id"`
	AvailabilityDate *string `json:"availability_date,omitempty"`
	BuckslipId *string `json:"buckslip_id,omitempty"`
	CancelledReason *string `json:"cancelled_reason,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	ExpectedAvailabilityDate *string `json:"expected_availability_date,omitempty"`
	Inventory *float64 `json:"inventory,omitempty"`
	Object string `json:"object"`
	Quantity int `json:"quantity"`
	QuantityOrdered *float64 `json:"quantity_ordered,omitempty"`
	Status *string `json:"status,omitempty"`
	UnitPrice *float64 `json:"unit_price,omitempty"`
}

// Campaign is the typed data model for the campaign entity.
type Campaign struct {
}

// CampaignLoadMatch is the typed request payload for Campaign.LoadTyped.
type CampaignLoadMatch struct {
	Id string `json:"id"`
}

// CampaignListMatch is the typed request payload for Campaign.ListTyped.
type CampaignListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// CampaignCreateData is the typed request payload for Campaign.CreateTyped.
type CampaignCreateData struct {
	AutoCancelIfNcoa *bool `json:"auto_cancel_if_ncoa,omitempty"`
	BillingGroupId *string `json:"billing_group_id,omitempty"`
	CancelWindowCampaignMinutes *int `json:"cancel_window_campaign_minutes,omitempty"`
	Creatives []any `json:"creatives"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Id string `json:"id"`
	IsDraft bool `json:"is_draft"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name string `json:"name"`
	Object string `json:"object"`
	PrintSpeed *string `json:"print_speed,omitempty"`
	ScheduleType string `json:"schedule_type"`
	SendDate *string `json:"send_date,omitempty"`
	TargetDeliveryDate *string `json:"target_delivery_date,omitempty"`
	Uploads []any `json:"uploads"`
	UseType string `json:"use_type"`
}

// CampaignUpdateData is the typed request payload for Campaign.UpdateTyped.
type CampaignUpdateData struct {
	Id string `json:"id"`
	AutoCancelIfNcoa *bool `json:"auto_cancel_if_ncoa,omitempty"`
	BillingGroupId *string `json:"billing_group_id,omitempty"`
	CancelWindowCampaignMinutes *int `json:"cancel_window_campaign_minutes,omitempty"`
	Creatives *[]any `json:"creatives,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	IsDraft *bool `json:"is_draft,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Name *string `json:"name,omitempty"`
	Object *string `json:"object,omitempty"`
	PrintSpeed *string `json:"print_speed,omitempty"`
	ScheduleType *string `json:"schedule_type,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	TargetDeliveryDate *string `json:"target_delivery_date,omitempty"`
	Uploads *[]any `json:"uploads,omitempty"`
	UseType *string `json:"use_type,omitempty"`
}

// CampaignRemoveMatch is the typed request payload for Campaign.RemoveTyped.
type CampaignRemoveMatch struct {
	Id string `json:"id"`
}

// Card is the typed data model for the card entity.
type Card struct {
}

// CardLoadMatch is the typed request payload for Card.LoadTyped.
type CardLoadMatch struct {
	Id string `json:"id"`
}

// CardListMatch is the typed request payload for Card.ListTyped.
type CardListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// CardCreateData is the typed request payload for Card.CreateTyped.
type CardCreateData struct {
	Id string `json:"id"`
	AccountId *string `json:"account_id,omitempty"`
	AutoReorder bool `json:"auto_reorder"`
	AvailableQuantity int `json:"available_quantity"`
	BackOriginalUrl string `json:"back_original_url"`
	Countries *string `json:"countries,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	FrontOriginalUrl string `json:"front_original_url"`
	Mode *string `json:"mode,omitempty"`
	Object string `json:"object"`
	Orientation string `json:"orientation"`
	PendingQuantity int `json:"pending_quantity"`
	RawUrl string `json:"raw_url"`
	ReorderQuantity int `json:"reorder_quantity"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Status string `json:"status"`
	ThresholdAmount int `json:"threshold_amount"`
	Thumbnails []any `json:"thumbnails"`
	Url string `json:"url"`
}

// CardRemoveMatch is the typed request payload for Card.RemoveTyped.
type CardRemoveMatch struct {
	Id string `json:"id"`
}

// CardOrder is the typed data model for the card_order entity.
type CardOrder struct {
}

// CardOrderListMatch is the typed request payload for CardOrder.ListTyped.
type CardOrderListMatch struct {
	Id string `json:"id"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// CardOrderCreateData is the typed request payload for CardOrder.CreateTyped.
type CardOrderCreateData struct {
	Id string `json:"id"`
	AvailabilityDate *string `json:"availability_date,omitempty"`
	CancelledReason *string `json:"cancelled_reason,omitempty"`
	CardId *string `json:"card_id,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	ExpectedAvailabilityDate *string `json:"expected_availability_date,omitempty"`
	Inventory *float64 `json:"inventory,omitempty"`
	Object string `json:"object"`
	Quantity int `json:"quantity"`
	QuantityOrdered *float64 `json:"quantity_ordered,omitempty"`
	Status *string `json:"status,omitempty"`
	UnitPrice *float64 `json:"unit_price,omitempty"`
}

// Check is the typed data model for the check entity.
type Check struct {
}

// CheckLoadMatch is the typed request payload for Check.LoadTyped.
type CheckLoadMatch struct {
	Id string `json:"id"`
}

// CheckListMatch is the typed request payload for Check.ListTyped.
type CheckListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Scheduled *bool `json:"scheduled,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// CheckCreateData is the typed request payload for Check.CreateTyped.
type CheckCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	Amount float64 `json:"amount"`
	AttachmentTemplateId *string `json:"attachment_template_id,omitempty"`
	AttachmentTemplateVersionId *string `json:"attachment_template_version_id,omitempty"`
	BankAccount any `json:"bank_account"`
	Carrier string `json:"carrier"`
	CheckBottomTemplateId *string `json:"check_bottom_template_id,omitempty"`
	CheckBottomTemplateVersionId *string `json:"check_bottom_template_version_id,omitempty"`
	CheckNumber *int `json:"check_number,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	FailureReason *map[string]any `json:"failure_reason,omitempty"`
	From *any `json:"from,omitempty"`
	Id string `json:"id"`
	MailType *string `json:"mail_type,omitempty"`
	Memo *string `json:"memo,omitempty"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Message *string `json:"message,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Sla *string `json:"sla,omitempty"`
	Status *string `json:"status,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To any `json:"to"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	Url string `json:"url"`
	UseType string `json:"use_type"`
}

// CheckRemoveMatch is the typed request payload for Check.RemoveTyped.
type CheckRemoveMatch struct {
	Id string `json:"id"`
}

// Creative is the typed data model for the creative entity.
type Creative struct {
}

// CreativeLoadMatch is the typed request payload for Creative.LoadTyped.
type CreativeLoadMatch struct {
	Id string `json:"id"`
}

// CreativeCreateData is the typed request payload for Creative.CreateTyped.
type CreativeCreateData struct {
	Campaigns []any `json:"campaigns"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	From *string `json:"from,omitempty"`
	Id string `json:"id"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object string `json:"object"`
	ResourceType *string `json:"resource_type,omitempty"`
	TemplatePreviewUrls map[string]any `json:"template_preview_urls"`
	TemplatePreviews []any `json:"template_previews"`
}

// CreativeUpdateData is the typed request payload for Creative.UpdateTyped.
type CreativeUpdateData struct {
	Id string `json:"id"`
	Campaigns *[]any `json:"campaigns,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Details *map[string]any `json:"details,omitempty"`
	From *string `json:"from,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	ResourceType *string `json:"resource_type,omitempty"`
	TemplatePreviewUrls *map[string]any `json:"template_preview_urls,omitempty"`
	TemplatePreviews *[]any `json:"template_previews,omitempty"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Id string `json:"id"`
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Status *string `json:"status,omitempty"`
}

// DomainCreateData is the typed request payload for Domain.CreateTyped.
type DomainCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Domain *string `json:"domain,omitempty"`
	ErrorRedirectLink *string `json:"error_redirect_link,omitempty"`
	Id *string `json:"id,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// DomainRemoveMatch is the typed request payload for Domain.RemoveTyped.
type DomainRemoveMatch struct {
	Id string `json:"id"`
}

// IdentityValidation is the typed data model for the identity_validation entity.
type IdentityValidation struct {
}

// IdentityValidationCreateData is the typed request payload for IdentityValidation.CreateTyped.
type IdentityValidationCreateData struct {
	Confidence *string `json:"confidence,omitempty"`
	Id *string `json:"id,omitempty"`
	LastLine *string `json:"last_line,omitempty"`
	Object *string `json:"object,omitempty"`
	PrimaryLine *string `json:"primary_line,omitempty"`
	Recipient *string `json:"recipient,omitempty"`
	Score *int `json:"score,omitempty"`
	SecondaryLine *string `json:"secondary_line,omitempty"`
	Urbanization *string `json:"urbanization,omitempty"`
}

// IntlVerification is the typed data model for the intl_verification entity.
type IntlVerification struct {
}

// IntlVerificationCreateData is the typed request payload for IntlVerification.CreateTyped.
type IntlVerificationCreateData struct {
	Addresses []any `json:"addresses"`
	Components *map[string]any `json:"components,omitempty"`
	Country *string `json:"country,omitempty"`
	Coverage *string `json:"coverage,omitempty"`
	Deliverability *string `json:"deliverability,omitempty"`
	Errors bool `json:"errors"`
	Id *string `json:"id,omitempty"`
	LastLine *string `json:"last_line,omitempty"`
	Object *string `json:"object,omitempty"`
	PrimaryLine *string `json:"primary_line,omitempty"`
	Recipient *string `json:"recipient,omitempty"`
	SecondaryLine *string `json:"secondary_line,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Letter is the typed data model for the letter entity.
type Letter struct {
}

// LetterLoadMatch is the typed request payload for Letter.LoadTyped.
type LetterLoadMatch struct {
	Id string `json:"id"`
}

// LetterListMatch is the typed request payload for Letter.ListTyped.
type LetterListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	Color *bool `json:"color,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Scheduled *bool `json:"scheduled,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// LetterCreateData is the typed request payload for Letter.CreateTyped.
type LetterCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	AddressPlacement *string `json:"address_placement,omitempty"`
	Cards *[]any `json:"cards,omitempty"`
	Carrier *string `json:"carrier,omitempty"`
	Color *bool `json:"color,omitempty"`
	CustomEnvelope *string `json:"custom_envelope,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Description *string `json:"description,omitempty"`
	DoubleSided *bool `json:"double_sided,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	ExtraService *string `json:"extra_service,omitempty"`
	From *map[string]any `json:"from,omitempty"`
	Fsc *bool `json:"fsc,omitempty"`
	Id *string `json:"id,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	PerforatedPage *string `json:"perforated_page,omitempty"`
	ReturnEnvelope *bool `json:"return_envelope,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Sla *string `json:"sla,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	TemplateVersionId *string `json:"template_version_id,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To *map[string]any `json:"to,omitempty"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	TrackingNumber *string `json:"tracking_number,omitempty"`
	Url *string `json:"url,omitempty"`
	UseType *string `json:"use_type,omitempty"`
}

// LetterRemoveMatch is the typed request payload for Letter.RemoveTyped.
type LetterRemoveMatch struct {
	Id string `json:"id"`
}

// Link is the typed data model for the link entity.
type Link struct {
}

// LinkLoadMatch is the typed request payload for Link.LoadTyped.
type LinkLoadMatch struct {
	Id string `json:"id"`
}

// LinkListMatch is the typed request payload for Link.ListTyped.
type LinkListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	DomainId *string `json:"domain_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// LinkCreateData is the typed request payload for Link.CreateTyped.
type LinkCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Domain *string `json:"domain,omitempty"`
	DomainId *string `json:"domain_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	RedirectLink *string `json:"redirect_link,omitempty"`
	ShortLink *string `json:"short_link,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// LinkUpdateData is the typed request payload for Link.UpdateTyped.
type LinkUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"created_at,omitempty"`
	Domain *string `json:"domain,omitempty"`
	DomainId *string `json:"domain_id,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	RedirectLink *string `json:"redirect_link,omitempty"`
	ShortLink *string `json:"short_link,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Title *string `json:"title,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// LinkRemoveMatch is the typed request payload for Link.RemoveTyped.
type LinkRemoveMatch struct {
	Id string `json:"id"`
}

// LobCreditsBalance is the typed data model for the lob_credits_balance entity.
type LobCreditsBalance struct {
}

// LobCreditsBalanceLoadMatch is the typed request payload for LobCreditsBalance.LoadTyped.
type LobCreditsBalanceLoadMatch struct {
	Balance *float64 `json:"balance,omitempty"`
}

// Postcard is the typed data model for the postcard entity.
type Postcard struct {
}

// PostcardLoadMatch is the typed request payload for Postcard.LoadTyped.
type PostcardLoadMatch struct {
	Id string `json:"id"`
}

// PostcardListMatch is the typed request payload for Postcard.ListTyped.
type PostcardListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Scheduled *bool `json:"scheduled,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *[]any `json:"size,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// PostcardCreateData is the typed request payload for Postcard.CreateTyped.
type PostcardCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	BackTemplateId string `json:"back_template_id"`
	BackTemplateVersionId *string `json:"back_template_version_id,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	Carrier string `json:"carrier"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	FailureReason *map[string]any `json:"failure_reason,omitempty"`
	From *any `json:"from,omitempty"`
	FrontTemplateId string `json:"front_template_id"`
	FrontTemplateVersionId *string `json:"front_template_version_id,omitempty"`
	Fsc *bool `json:"fsc,omitempty"`
	Id string `json:"id"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Sla *string `json:"sla,omitempty"`
	Status *string `json:"status,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To any `json:"to"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	Url string `json:"url"`
	UseType *string `json:"use_type,omitempty"`
}

// PostcardRemoveMatch is the typed request payload for Postcard.RemoveTyped.
type PostcardRemoveMatch struct {
	Id string `json:"id"`
}

// QrCode is the typed data model for the qr_code entity.
type QrCode struct {
}

// QrCodeListMatch is the typed request payload for QrCode.ListTyped.
type QrCodeListMatch struct {
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	ResourceId *[]any `json:"resource_id,omitempty"`
	Scanned *bool `json:"scanned,omitempty"`
}

// ResourceProof is the typed data model for the resource_proof entity.
type ResourceProof struct {
}

// ResourceProofLoadMatch is the typed request payload for ResourceProof.LoadTyped.
type ResourceProofLoadMatch struct {
	Id string `json:"id"`
}

// ResourceProofCreateData is the typed request payload for ResourceProof.CreateTyped.
type ResourceProofCreateData struct {
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Errors *[]any `json:"errors,omitempty"`
	Id string `json:"id"`
	Object string `json:"object"`
	ResourceType *string `json:"resource_type,omitempty"`
	Status *string `json:"status,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ResourceProofUpdateData is the typed request payload for ResourceProof.UpdateTyped.
type ResourceProofUpdateData struct {
	Id string `json:"id"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	Object *string `json:"object,omitempty"`
	ResourceType *string `json:"resource_type,omitempty"`
	Status *string `json:"status,omitempty"`
	TemplateId *string `json:"template_id,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Response is the typed data model for the response entity.
type Response struct {
}

// ResponseLoadMatch is the typed request payload for Response.LoadTyped.
type ResponseLoadMatch struct {
	UspsCampaignId string `json:"usps_campaign_id"`
}

// ResponseListMatch is the typed request payload for Response.ListTyped.
type ResponseListMatch struct {
	AccountId *string `json:"account_id,omitempty"`
	BrandName *string `json:"brand_name,omitempty"`
	CampaignCode *string `json:"campaign_code,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	EndSerial *int `json:"end_serial,omitempty"`
	Id *string `json:"id,omitempty"`
	LobCampaignId *string `json:"lob_campaign_id,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Object *string `json:"object,omitempty"`
	Quantity *int `json:"quantity,omitempty"`
	RepresentativeImageS3Link *string `json:"representative_image_s3_link,omitempty"`
	RideAlongImageS3Link *string `json:"ride_along_image_s3_link,omitempty"`
	RideAlongUrl *string `json:"ride_along_url,omitempty"`
	ServiceRequestNumber *string `json:"service_request_number,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	StartSerial *int `json:"start_serial,omitempty"`
	Status *string `json:"status,omitempty"`
	UspsCampaignId *string `json:"usps_campaign_id,omitempty"`
	UspsTitle *string `json:"usps_title,omitempty"`
}

// ResponseCreateData is the typed request payload for Response.CreateTyped.
type ResponseCreateData struct {
	AccountId string `json:"account_id"`
	BrandName *string `json:"brand_name,omitempty"`
	CampaignCode string `json:"campaign_code"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted bool `json:"deleted"`
	EndDate string `json:"end_date"`
	EndSerial int `json:"end_serial"`
	Id string `json:"id"`
	LobCampaignId *string `json:"lob_campaign_id,omitempty"`
	Mode string `json:"mode"`
	Object string `json:"object"`
	Quantity *int `json:"quantity,omitempty"`
	RepresentativeImageS3Link string `json:"representative_image_s3_link"`
	RideAlongImageS3Link string `json:"ride_along_image_s3_link"`
	RideAlongUrl *string `json:"ride_along_url,omitempty"`
	ServiceRequestNumber string `json:"service_request_number"`
	StartDate *string `json:"start_date,omitempty"`
	StartSerial int `json:"start_serial"`
	Status *string `json:"status,omitempty"`
	UspsCampaignId string `json:"usps_campaign_id"`
	UspsTitle *string `json:"usps_title,omitempty"`
}

// ResponseUpdateData is the typed request payload for Response.UpdateTyped.
type ResponseUpdateData struct {
	UspsCampaignId string `json:"usps_campaign_id"`
	AccountId *string `json:"account_id,omitempty"`
	BrandName *string `json:"brand_name,omitempty"`
	CampaignCode *string `json:"campaign_code,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	EndSerial *int `json:"end_serial,omitempty"`
	Id *string `json:"id,omitempty"`
	LobCampaignId *string `json:"lob_campaign_id,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Object *string `json:"object,omitempty"`
	Quantity *int `json:"quantity,omitempty"`
	RepresentativeImageS3Link *string `json:"representative_image_s3_link,omitempty"`
	RideAlongImageS3Link *string `json:"ride_along_image_s3_link,omitempty"`
	RideAlongUrl *string `json:"ride_along_url,omitempty"`
	ServiceRequestNumber *string `json:"service_request_number,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	StartSerial *int `json:"start_serial,omitempty"`
	Status *string `json:"status,omitempty"`
	UspsTitle *string `json:"usps_title,omitempty"`
}

// ReverseGeocode is the typed data model for the reverse_geocode entity.
type ReverseGeocode struct {
}

// ReverseGeocodeCreateData is the typed request payload for ReverseGeocode.CreateTyped.
type ReverseGeocodeCreateData struct {
	Size *int `json:"size,omitempty"`
	Addresses *[]any `json:"addresses,omitempty"`
	Id *string `json:"id,omitempty"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Object *string `json:"object,omitempty"`
}

// SelfMailer is the typed data model for the self_mailer entity.
type SelfMailer struct {
}

// SelfMailerLoadMatch is the typed request payload for SelfMailer.LoadTyped.
type SelfMailerLoadMatch struct {
	Id string `json:"id"`
}

// SelfMailerListMatch is the typed request payload for SelfMailer.ListTyped.
type SelfMailerListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Scheduled *bool `json:"scheduled,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *[]any `json:"size,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// SelfMailerCreateData is the typed request payload for SelfMailer.CreateTyped.
type SelfMailerCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	Carrier string `json:"carrier"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	FailureReason *map[string]any `json:"failure_reason,omitempty"`
	From *any `json:"from,omitempty"`
	Fsc *bool `json:"fsc,omitempty"`
	Id string `json:"id"`
	InsideTemplateId *string `json:"inside_template_id,omitempty"`
	InsideTemplateVersionId *string `json:"inside_template_version_id,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	OutsideTemplateId *string `json:"outside_template_id,omitempty"`
	OutsideTemplateVersionId *string `json:"outside_template_version_id,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Sla *string `json:"sla,omitempty"`
	Status *string `json:"status,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To any `json:"to"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	Url string `json:"url"`
	UseType string `json:"use_type"`
}

// SelfMailerRemoveMatch is the typed request payload for SelfMailer.RemoveTyped.
type SelfMailerRemoveMatch struct {
	Id string `json:"id"`
}

// SnapPack is the typed data model for the snap_pack entity.
type SnapPack struct {
}

// SnapPackLoadMatch is the typed request payload for SnapPack.LoadTyped.
type SnapPackLoadMatch struct {
	Id string `json:"id"`
}

// SnapPackListMatch is the typed request payload for SnapPack.ListTyped.
type SnapPackListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	SortBy *any `json:"sort_by,omitempty"`
	Status *string `json:"status,omitempty"`
}

// SnapPackCreateData is the typed request payload for SnapPack.CreateTyped.
type SnapPackCreateData struct {
	IdempotencyKey *string `json:"idempotency_key,omitempty"`
	CampaignId *string `json:"campaign_id,omitempty"`
	Carrier string `json:"carrier"`
	Color *bool `json:"color,omitempty"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	ExpectedDeliveryDate *string `json:"expected_delivery_date,omitempty"`
	FailureReason *map[string]any `json:"failure_reason,omitempty"`
	From *any `json:"from,omitempty"`
	Fsc *bool `json:"fsc,omitempty"`
	Id string `json:"id"`
	InsideTemplateId *string `json:"inside_template_id,omitempty"`
	InsideTemplateVersionId *string `json:"inside_template_version_id,omitempty"`
	MailType *string `json:"mail_type,omitempty"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Object *string `json:"object,omitempty"`
	OutsideTemplateId *string `json:"outside_template_id,omitempty"`
	OutsideTemplateVersionId *string `json:"outside_template_version_id,omitempty"`
	SendDate *string `json:"send_date,omitempty"`
	Size *string `json:"size,omitempty"`
	Sla *string `json:"sla,omitempty"`
	Status *string `json:"status,omitempty"`
	Thumbnails *[]any `json:"thumbnails,omitempty"`
	To any `json:"to"`
	TrackingEvents *[]any `json:"tracking_events,omitempty"`
	Url string `json:"url"`
	UseType string `json:"use_type"`
}

// SnapPackRemoveMatch is the typed request payload for SnapPack.RemoveTyped.
type SnapPackRemoveMatch struct {
	Id string `json:"id"`
}

// Template is the typed data model for the template entity.
type Template struct {
}

// TemplateLoadMatch is the typed request payload for Template.LoadTyped.
type TemplateLoadMatch struct {
	Id string `json:"id"`
}

// TemplateListMatch is the typed request payload for Template.ListTyped.
type TemplateListMatch struct {
	BeforeAfter *any `json:"before/after,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
}

// TemplateCreateData is the typed request payload for Template.CreateTyped.
type TemplateCreateData struct {
	Id string `json:"id"`
	DateCreated *string `json:"date_created,omitempty"`
	DateModified *string `json:"date_modified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Engine *string `json:"engine,omitempty"`
	Html string `json:"html"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Object *string `json:"object,omitempty"`
	PublishedVersion any `json:"published_version"`
	RequiredVars *[]any `json:"required_vars,omitempty"`
	Versions []any `json:"versions"`
}

// TemplateRemoveMatch is the typed request payload for Template.RemoveTyped.
type TemplateRemoveMatch struct {
	Id string `json:"id"`
}

// TemplateVersion is the typed data model for the template_version entity.
type TemplateVersion struct {
}

// TemplateVersionLoadMatch is the typed request payload for TemplateVersion.LoadTyped.
type TemplateVersionLoadMatch struct {
	Id string `json:"id"`
	TemplateId string `json:"template_id"`
}

// TemplateVersionListMatch is the typed request payload for TemplateVersion.ListTyped.
type TemplateVersionListMatch struct {
	Id string `json:"id"`
	BeforeAfter *any `json:"before/after,omitempty"`
	DateCreated *map[string]any `json:"date_created,omitempty"`
	Include *[]any `json:"include,omitempty"`
	Limit *int `json:"limit,omitempty"`
}

// TemplateVersionCreateData is the typed request payload for TemplateVersion.CreateTyped.
type TemplateVersionCreateData struct {
	Id string `json:"id"`
	TemplateId *string `json:"template_id,omitempty"`
	DateCreated string `json:"date_created"`
	DateModified string `json:"date_modified"`
	Deleted *bool `json:"deleted,omitempty"`
	Description *string `json:"description,omitempty"`
	Engine *string `json:"engine,omitempty"`
	Html string `json:"html"`
	MergeVariables *map[string]any `json:"merge_variables,omitempty"`
	Object string `json:"object"`
	RequiredVars *[]any `json:"required_vars,omitempty"`
	SuggestJsonEditor *bool `json:"suggest_json_editor,omitempty"`
}

// TemplateVersionDeletion is the typed data model for the template_version_deletion entity.
type TemplateVersionDeletion struct {
}

// TemplateVersionDeletionRemoveMatch is the typed request payload for TemplateVersionDeletion.RemoveTyped.
type TemplateVersionDeletionRemoveMatch struct {
	TemplateId string `json:"template_id"`
	VrsnId string `json:"vrsn_id"`
}

// Upload is the typed data model for the upload entity.
type Upload struct {
}

// UploadLoadMatch is the typed request payload for Upload.LoadTyped.
type UploadLoadMatch struct {
	ExId *string `json:"ex_id,omitempty"`
	Id string `json:"id"`
}

// UploadListMatch is the typed request payload for Upload.ListTyped.
type UploadListMatch struct {
	CampaignId *string `json:"campaign_id,omitempty"`
}

// UploadCreateData is the typed request payload for Upload.CreateTyped.
type UploadCreateData struct {
	AccountId string `json:"accountId"`
	BytesProcessed int `json:"bytesProcessed"`
	CampaignId any `json:"campaignId"`
	DateCreated string `json:"dateCreated"`
	DateModified string `json:"dateModified"`
	Deleted bool `json:"deleted"`
	FailedMailpieces int `json:"failedMailpieces"`
	FailuresUrl *string `json:"failuresUrl,omitempty"`
	Id string `json:"id"`
	MergeVariableColumnMapping *map[string]any `json:"mergeVariableColumnMapping,omitempty"`
	Metadata map[string]any `json:"metadata"`
	Mode string `json:"mode"`
	OptionalAddressColumnMapping map[string]any `json:"optionalAddressColumnMapping"`
	OriginalFilename *string `json:"originalFilename,omitempty"`
	RequiredAddressColumnMapping map[string]any `json:"requiredAddressColumnMapping"`
	S3Url string `json:"s3Url"`
	State string `json:"state"`
	TotalMailpieces int `json:"totalMailpieces"`
	Type string `json:"type"`
	UploadId string `json:"uploadId"`
	ValidatedMailpieces int `json:"validatedMailpieces"`
}

// UploadUpdateData is the typed request payload for Upload.UpdateTyped.
type UploadUpdateData struct {
	Id string `json:"id"`
	AccountId *string `json:"accountId,omitempty"`
	BytesProcessed *int `json:"bytesProcessed,omitempty"`
	CampaignId *any `json:"campaignId,omitempty"`
	DateCreated *string `json:"dateCreated,omitempty"`
	DateModified *string `json:"dateModified,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	FailedMailpieces *int `json:"failedMailpieces,omitempty"`
	FailuresUrl *string `json:"failuresUrl,omitempty"`
	MergeVariableColumnMapping *map[string]any `json:"mergeVariableColumnMapping,omitempty"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Mode *string `json:"mode,omitempty"`
	OptionalAddressColumnMapping *map[string]any `json:"optionalAddressColumnMapping,omitempty"`
	OriginalFilename *string `json:"originalFilename,omitempty"`
	RequiredAddressColumnMapping *map[string]any `json:"requiredAddressColumnMapping,omitempty"`
	S3Url *string `json:"s3Url,omitempty"`
	State *string `json:"state,omitempty"`
	TotalMailpieces *int `json:"totalMailpieces,omitempty"`
	Type *string `json:"type,omitempty"`
	UploadId *string `json:"uploadId,omitempty"`
	ValidatedMailpieces *int `json:"validatedMailpieces,omitempty"`
}

// UploadRemoveMatch is the typed request payload for Upload.RemoveTyped.
type UploadRemoveMatch struct {
	Id string `json:"id"`
}

// UploadCreateExport is the typed data model for the upload_create_export entity.
type UploadCreateExport struct {
}

// UploadCreateExportCreateData is the typed request payload for UploadCreateExport.CreateTyped.
type UploadCreateExportCreateData struct {
	Id string `json:"id"`
	ExportId string `json:"exportId"`
	Message string `json:"message"`
	Type *string `json:"type,omitempty"`
}

// UsAutocompletion is the typed data model for the us_autocompletion entity.
type UsAutocompletion struct {
}

// UsAutocompletionCreateData is the typed request payload for UsAutocompletion.CreateTyped.
type UsAutocompletionCreateData struct {
	Case *string `json:"case,omitempty"`
	ValidAddress *bool `json:"valid_address,omitempty"`
	AddressPrefix string `json:"address_prefix"`
	City *string `json:"city,omitempty"`
	GeoIpSort *bool `json:"geo_ip_sort,omitempty"`
	Id *string `json:"id,omitempty"`
	Object *string `json:"object,omitempty"`
	State *string `json:"state,omitempty"`
	Suggestions *[]any `json:"suggestions,omitempty"`
	ZipCode *string `json:"zip_code,omitempty"`
}

// UsVerification is the typed data model for the us_verification entity.
type UsVerification struct {
}

// UsVerificationCreateData is the typed request payload for UsVerification.CreateTyped.
type UsVerificationCreateData struct {
	Case *string `json:"case,omitempty"`
	Addresses []any `json:"addresses"`
	Components map[string]any `json:"components"`
	Deliverability *string `json:"deliverability,omitempty"`
	DeliverabilityAnalysis map[string]any `json:"deliverability_analysis"`
	Errors bool `json:"errors"`
	Id *string `json:"id,omitempty"`
	LastLine *string `json:"last_line,omitempty"`
	LobConfidenceScore map[string]any `json:"lob_confidence_score"`
	Object *string `json:"object,omitempty"`
	PrimaryLine *string `json:"primary_line,omitempty"`
	Recipient *string `json:"recipient,omitempty"`
	SecondaryLine *string `json:"secondary_line,omitempty"`
	Urbanization *string `json:"urbanization,omitempty"`
	ValidAddress *bool `json:"valid_address,omitempty"`
}

// Zip is the typed data model for the zip entity.
type Zip struct {
}

// ZipCreateData is the typed request payload for Zip.CreateTyped.
type ZipCreateData struct {
	ZipCode string `json:"zip_code"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
