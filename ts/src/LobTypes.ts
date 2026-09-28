// Typed models for the Lob SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Address {
  address_city?: string
  address_country?: string
  address_line1?: string
  address_state?: string
  address_zip?: string
  company?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  email?: string
  id?: string
  metadata?: Record<string, any>
  name?: string
  next_url?: string
  object?: string
  phone?: string
  previous_url?: string
  total_count?: number
}

export interface AddressLoadMatch {
  id: string
}

export interface AddressListMatch {
  "before/after"?: any
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  metadata?: Record<string, any>
}

export interface AddressCreateData {
  address_city?: string
  address_country?: string
  address_line1?: string
  address_state?: string
  address_zip?: string
  company?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  email?: string
  id?: string
  metadata?: Record<string, any>
  name?: string
  next_url?: string
  object?: string
  phone?: string
  previous_url?: string
  total_count?: number
}

export interface AddressRemoveMatch {
  id: string
}

export interface BankAccount {
  account_number: string
  account_type: string
  bank_name?: string
  check_template?: string
  city?: string
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  fractional_routing_number?: string
  id: string
  metadata?: Record<string, any>
  microdeposit_type?: string
  next_url?: string
  object: string
  previous_url?: string
  routing_number: string
  signatory: string
  signature_url?: any
  state?: string
  total_count?: number
  verified?: boolean
  zipcode?: string
}

export interface BankAccountLoadMatch {
  id: string
}

export interface BankAccountListMatch {
  "before/after"?: any
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  metadata?: Record<string, any>
}

export interface BankAccountCreateData {
  account_number: string
  account_type: string
  bank_name?: string
  check_template?: string
  city?: string
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  fractional_routing_number?: string
  id: string
  metadata?: Record<string, any>
  microdeposit_type?: string
  next_url?: string
  object: string
  previous_url?: string
  routing_number: string
  signatory: string
  signature_url?: any
  state?: string
  total_count?: number
  verified?: boolean
  zipcode?: string

  // Selects a custom action instead of the plain create:
  //   'verify'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BankDeletion {
}

export interface BankDeletionRemoveMatch {
  bank_id: string
}

export interface BillingGroup {
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  id?: string
  name?: string
  next_url?: string
  object?: string
  previous_url?: string
  total_count?: number
}

export interface BillingGroupLoadMatch {
  id: string
}

export interface BillingGroupListMatch {
  date_created?: Record<string, any>
  date_modified?: Record<string, any>
  include?: any[]
  limit?: number
  offset?: number
  sort_by?: any
}

export interface BillingGroupCreateData {
  id: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  name?: string
  next_url?: string
  object?: string
  previous_url?: string
  total_count?: number
}

export interface Booklet {
  carrier?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  expected_delivery_date?: string
  from?: Record<string, any>
  fsc?: boolean
  id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  pages?: number
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  source_material?: string
  thumbnails?: any[]
  to?: Record<string, any>
  total_count?: number
  tracking_events?: any[]
  tracking_number?: string
  url?: string
  use_type?: string
}

export interface BookletLoadMatch {
  id: string
}

export interface BookletListMatch {
  "before/after"?: any
  campaign_id?: string
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  send_date?: string
  sort_by?: any
  status?: string
}

export interface BookletCreateData {
  idempotency_key?: string
  carrier?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  expected_delivery_date?: string
  from?: Record<string, any>
  fsc?: boolean
  id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  pages?: number
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  source_material?: string
  thumbnails?: any[]
  to?: Record<string, any>
  total_count?: number
  tracking_events?: any[]
  tracking_number?: string
  url?: string
  use_type?: string
}

export interface BookletRemoveMatch {
  id: string
}

export interface Buckslip {
  account_id?: string
  allocated_quantity: number
  auto_reorder: boolean
  available_quantity: number
  back_original_url: string
  buckslip_orders: any[]
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  finish: string
  front_original_url: string
  id: string
  mode?: string
  next_url?: string
  object: string
  onhand_quantity: number
  pending_quantity: number
  previous_url?: string
  projected_quantity: number
  raw_url: string
  reorder_quantity: number
  send_date?: string
  size?: string
  status: string
  stock: string
  threshold_amount: number
  thumbnails: any[]
  total_count?: number
  url: string
  weight: string
}

export interface BuckslipLoadMatch {
  id: string
}

export interface BuckslipListMatch {
  "before/after"?: any
  include?: any[]
  limit?: number
}

export interface BuckslipCreateData {
  account_id?: string
  allocated_quantity: number
  auto_reorder: boolean
  available_quantity: number
  back_original_url: string
  buckslip_orders: any[]
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  finish: string
  front_original_url: string
  id: string
  mode?: string
  next_url?: string
  object: string
  onhand_quantity: number
  pending_quantity: number
  previous_url?: string
  projected_quantity: number
  raw_url: string
  reorder_quantity: number
  send_date?: string
  size?: string
  status: string
  stock: string
  threshold_amount: number
  thumbnails: any[]
  total_count?: number
  url: string
  weight: string
}

export interface BuckslipUpdateData {
  id: string
  account_id?: string
  allocated_quantity?: number
  auto_reorder?: boolean
  available_quantity?: number
  back_original_url?: string
  buckslip_orders?: any[]
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  finish?: string
  front_original_url?: string
  mode?: string
  next_url?: string
  object?: string
  onhand_quantity?: number
  pending_quantity?: number
  previous_url?: string
  projected_quantity?: number
  raw_url?: string
  reorder_quantity?: number
  send_date?: string
  size?: string
  status?: string
  stock?: string
  threshold_amount?: number
  thumbnails?: any[]
  total_count?: number
  url?: string
  weight?: string
}

export interface BuckslipRemoveMatch {
  id: string
}

export interface BuckslipOrder {
  count?: number
  data?: any[]
  id?: string
  next_url?: string
  object?: string
  previous_url?: string
  quantity: number
  total_count?: number
}

export interface BuckslipOrderListMatch {
  id: string
  limit?: number
  offset?: number
}

export interface BuckslipOrderCreateData {
  id: string
  count?: number
  data?: any[]
  next_url?: string
  object?: string
  previous_url?: string
  quantity: number
  total_count?: number
}

export interface Campaign {
  auto_cancel_if_ncoa?: boolean
  billing_group_id?: string
  cancel_window_campaign_minutes?: number
  count?: number
  creatives: any[]
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  id: string
  is_draft: boolean
  metadata?: Record<string, any>
  name: string
  next_url?: string
  object: string
  previous_url?: string
  print_speed?: string
  schedule_type: string
  send_date?: string
  target_delivery_date?: string
  total_count?: number
  uploads: any[]
  use_type: string
}

export interface CampaignLoadMatch {
  id: string
}

export interface CampaignListMatch {
  "before/after"?: any
  include?: any[]
  limit?: number
}

export interface CampaignCreateData {
  auto_cancel_if_ncoa?: boolean
  billing_group_id?: string
  cancel_window_campaign_minutes?: number
  count?: number
  creatives: any[]
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  id: string
  is_draft: boolean
  metadata?: Record<string, any>
  name: string
  next_url?: string
  object: string
  previous_url?: string
  print_speed?: string
  schedule_type: string
  send_date?: string
  target_delivery_date?: string
  total_count?: number
  uploads: any[]
  use_type: string

  // Selects a custom action instead of the plain create:
  //   'send'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CampaignUpdateData {
  id: string
  auto_cancel_if_ncoa?: boolean
  billing_group_id?: string
  cancel_window_campaign_minutes?: number
  count?: number
  creatives?: any[]
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  is_draft?: boolean
  metadata?: Record<string, any>
  name?: string
  next_url?: string
  object?: string
  previous_url?: string
  print_speed?: string
  schedule_type?: string
  send_date?: string
  target_delivery_date?: string
  total_count?: number
  uploads?: any[]
  use_type?: string
}

export interface CampaignRemoveMatch {
  id: string
}

export interface Card {
  account_id?: string
  auto_reorder: boolean
  available_quantity: number
  back_original_url: string
  count?: number
  countries?: string
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  front_original_url: string
  id: string
  mode?: string
  next_url?: string
  object: string
  orientation: string
  pending_quantity: number
  previous_url?: string
  raw_url: string
  reorder_quantity: number
  send_date?: string
  size?: string
  status: string
  threshold_amount: number
  thumbnails: any[]
  total_count?: number
  url: string
}

export interface CardLoadMatch {
  id: string
}

export interface CardListMatch {
  "before/after"?: any
  include?: any[]
  limit?: number
}

export interface CardCreateData {
  id: string
  account_id?: string
  auto_reorder: boolean
  available_quantity: number
  back_original_url: string
  count?: number
  countries?: string
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  front_original_url: string
  mode?: string
  next_url?: string
  object: string
  orientation: string
  pending_quantity: number
  previous_url?: string
  raw_url: string
  reorder_quantity: number
  send_date?: string
  size?: string
  status: string
  threshold_amount: number
  thumbnails: any[]
  total_count?: number
  url: string
}

export interface CardRemoveMatch {
  id: string
}

export interface CardOrder {
  count?: number
  data?: any[]
  id?: string
  next_url?: string
  object?: string
  previous_url?: string
  quantity: number
  total_count?: number
}

export interface CardOrderListMatch {
  id: string
  limit?: number
  offset?: number
}

export interface CardOrderCreateData {
  id: string
  count?: number
  data?: any[]
  next_url?: string
  object?: string
  previous_url?: string
  quantity: number
  total_count?: number
}

export interface Check {
  amount: number
  attachment_template_id?: string
  attachment_template_version_id?: string
  bank_account: any
  carrier: string
  check_bottom_template_id?: string
  check_bottom_template_version_id?: string
  check_number?: number
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  id: string
  mail_type?: string
  memo?: string
  merge_variables?: Record<string, any>
  message?: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  send_date?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface CheckLoadMatch {
  id: string
}

export interface CheckListMatch {
  "before/after"?: any
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  scheduled?: boolean
  send_date?: string
  sort_by?: any
  status?: string
}

export interface CheckCreateData {
  idempotency_key?: string
  amount: number
  attachment_template_id?: string
  attachment_template_version_id?: string
  bank_account: any
  carrier: string
  check_bottom_template_id?: string
  check_bottom_template_version_id?: string
  check_number?: number
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  id: string
  mail_type?: string
  memo?: string
  merge_variables?: Record<string, any>
  message?: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  send_date?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface CheckRemoveMatch {
  id: string
}

export interface Creative {
  campaigns: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  details?: Record<string, any>
  from?: string
  id: string
  metadata?: Record<string, any>
  object: string
  resource_type?: string
  template_preview_urls: Record<string, any>
  template_previews: any[]
}

export interface CreativeLoadMatch {
  id: string
}

export interface CreativeCreateData {
  campaigns: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  details?: Record<string, any>
  from?: string
  id: string
  metadata?: Record<string, any>
  object: string
  resource_type?: string
  template_preview_urls: Record<string, any>
  template_previews: any[]
}

export interface CreativeUpdateData {
  id: string
  campaigns?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  details?: Record<string, any>
  from?: string
  metadata?: Record<string, any>
  object?: string
  resource_type?: string
  template_preview_urls?: Record<string, any>
  template_previews?: any[]
}

export interface Domain {
  count?: number
  created_at?: string
  data?: any[]
  domain?: string
  error_redirect_link?: string
  id?: string
  next_url?: string
  object?: string
  previous_url?: string
  status?: string
  total_count?: number
  updated_at?: string
}

export interface DomainLoadMatch {
  id: string
}

export interface DomainListMatch {
  "before/after"?: any
  limit?: number
  status?: string
}

export interface DomainCreateData {
  count?: number
  created_at?: string
  data?: any[]
  domain?: string
  error_redirect_link?: string
  id?: string
  next_url?: string
  object?: string
  previous_url?: string
  status?: string
  total_count?: number
  updated_at?: string
}

export interface DomainRemoveMatch {
  id: string
}

export interface IdentityValidation {
  confidence?: string
  id?: string
  last_line?: string
  object?: string
  primary_line?: string
  recipient?: string
  score?: number
  secondary_line?: string
  urbanization?: string
}

export interface IdentityValidationCreateData {
  confidence?: string
  id?: string
  last_line?: string
  object?: string
  primary_line?: string
  recipient?: string
  score?: number
  secondary_line?: string
  urbanization?: string
}

export interface IntlVerification {
  addresses: any[]
  components?: Record<string, any>
  country?: string
  coverage?: string
  deliverability?: string
  errors: boolean
  id?: string
  last_line?: string
  object?: string
  primary_line?: string
  recipient?: string
  secondary_line?: string
  status?: string
}

export interface IntlVerificationCreateData {
  addresses: any[]
  components?: Record<string, any>
  country?: string
  coverage?: string
  deliverability?: string
  errors: boolean
  id?: string
  last_line?: string
  object?: string
  primary_line?: string
  recipient?: string
  secondary_line?: string
  status?: string
}

export interface Letter {
  address_placement?: string
  cards?: any[]
  carrier?: string
  color?: boolean
  count?: number
  custom_envelope?: string
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  double_sided?: boolean
  expected_delivery_date?: string
  extra_service?: string
  from?: Record<string, any>
  fsc?: boolean
  id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  perforated_page?: string
  previous_url?: string
  return_envelope?: boolean
  send_date?: string
  sla?: string
  thumbnails?: any[]
  to?: Record<string, any>
  total_count?: number
  tracking_events?: any[]
  tracking_number?: string
  url?: string
  use_type?: string
}

export interface LetterLoadMatch {
  id: string
}

export interface LetterListMatch {
  "before/after"?: any
  campaign_id?: string
  color?: boolean
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  scheduled?: boolean
  send_date?: string
  sort_by?: any
  status?: string
}

export interface LetterCreateData {
  idempotency_key?: string
  address_placement?: string
  cards?: any[]
  carrier?: string
  color?: boolean
  count?: number
  custom_envelope?: string
  data?: any[]
  date_created?: string
  date_modified?: string
  description?: string
  double_sided?: boolean
  expected_delivery_date?: string
  extra_service?: string
  from?: Record<string, any>
  fsc?: boolean
  id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  perforated_page?: string
  previous_url?: string
  return_envelope?: boolean
  send_date?: string
  sla?: string
  thumbnails?: any[]
  to?: Record<string, any>
  total_count?: number
  tracking_events?: any[]
  tracking_number?: string
  url?: string
  use_type?: string
}

export interface LetterRemoveMatch {
  id: string
}

export interface Link {
  count?: number
  data?: any[]
  domain?: string
  id?: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  redirect_link: string
  slug?: string
  title?: string
  total_count?: number
}

export interface LinkLoadMatch {
  id: string
}

export interface LinkListMatch {
  "before/after"?: any
  campaign_id?: string
  domain_id?: string
  limit?: number
}

export interface LinkCreateData {
  count?: number
  data?: any[]
  domain?: string
  id?: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  redirect_link: string
  slug?: string
  title?: string
  total_count?: number
}

export interface LinkUpdateData {
  id: string
  count?: number
  data?: any[]
  domain?: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  redirect_link?: string
  slug?: string
  title?: string
  total_count?: number
}

export interface LinkRemoveMatch {
  id: string
}

export interface LobCreditsBalance {
  balance: number
}

export interface LobCreditsBalanceLoadMatch {
  balance?: number
}

export interface Postcard {
  back_template_id: string
  back_template_version_id?: string
  campaign_id?: string
  carrier: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  front_template_id: string
  front_template_version_id?: string
  fsc?: boolean
  id: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  send_date?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type?: string
}

export interface PostcardLoadMatch {
  id: string
}

export interface PostcardListMatch {
  "before/after"?: any
  campaign_id?: string
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  scheduled?: boolean
  send_date?: string
  size?: any[]
  sort_by?: any
  status?: string
}

export interface PostcardCreateData {
  idempotency_key?: string
  back_template_id: string
  back_template_version_id?: string
  campaign_id?: string
  carrier: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  front_template_id: string
  front_template_version_id?: string
  fsc?: boolean
  id: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  send_date?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type?: string
}

export interface PostcardRemoveMatch {
  id: string
}

export interface QrCode {
  count?: number
  data?: any[]
  object?: string
  scanned_count?: number
  total_count?: number
}

export interface QrCodeListMatch {
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  offset?: number
  resource_id?: any[]
  scanned?: boolean
}

export interface ResourceProof {
  date_created: string
  date_modified: string
  errors?: any[]
  id: string
  object: string
  resource_type?: string
  status?: string
  template_id?: string
  thumbnails?: any[]
  url?: string
}

export interface ResourceProofLoadMatch {
  id: string
}

export interface ResourceProofCreateData {
  date_created: string
  date_modified: string
  errors?: any[]
  id: string
  object: string
  resource_type?: string
  status?: string
  template_id?: string
  thumbnails?: any[]
  url?: string
}

export interface ResourceProofUpdateData {
  id: string
  date_created?: string
  date_modified?: string
  errors?: any[]
  object?: string
  resource_type?: string
  status?: string
  template_id?: string
  thumbnails?: any[]
  url?: string
}

export interface Response {
  account_id: string
  brand_name?: string
  campaign_code: string
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted: boolean
  end_date: string
  end_serial: number
  id: string
  lob_campaign_id?: string
  mode: string
  next_url?: string
  object: string
  previous_url?: string
  quantity?: number
  representative_image_s3_link: string
  ride_along_image_s3_link: string
  ride_along_url?: string
  service_request_number: string
  start_date?: string
  start_serial: number
  status?: string
  total_count?: number
  usps_campaign_id: string
  usps_title?: string
}

export interface ResponseLoadMatch {
  usps_campaign_id: string
}

export interface ResponseListMatch {
  account_id?: string
  brand_name?: string
  campaign_code?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  end_date?: string
  end_serial?: number
  id?: string
  lob_campaign_id?: string
  mode?: string
  next_url?: string
  object?: string
  previous_url?: string
  quantity?: number
  representative_image_s3_link?: string
  ride_along_image_s3_link?: string
  ride_along_url?: string
  service_request_number?: string
  start_date?: string
  start_serial?: number
  status?: string
  total_count?: number
  usps_campaign_id?: string
  usps_title?: string
}

export interface ResponseCreateData {
  account_id: string
  brand_name?: string
  campaign_code: string
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted: boolean
  end_date: string
  end_serial: number
  id: string
  lob_campaign_id?: string
  mode: string
  next_url?: string
  object: string
  previous_url?: string
  quantity?: number
  representative_image_s3_link: string
  ride_along_image_s3_link: string
  ride_along_url?: string
  service_request_number: string
  start_date?: string
  start_serial: number
  status?: string
  total_count?: number
  usps_campaign_id: string
  usps_title?: string
}

export interface ResponseUpdateData {
  usps_campaign_id: string
  account_id?: string
  brand_name?: string
  campaign_code?: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  end_date?: string
  end_serial?: number
  id?: string
  lob_campaign_id?: string
  mode?: string
  next_url?: string
  object?: string
  previous_url?: string
  quantity?: number
  representative_image_s3_link?: string
  ride_along_image_s3_link?: string
  ride_along_url?: string
  service_request_number?: string
  start_date?: string
  start_serial?: number
  status?: string
  total_count?: number
  usps_title?: string
}

export interface ReverseGeocode {
  addresses?: any[]
  id?: string
  latitude: number
  longitude: number
  object?: string
}

export interface ReverseGeocodeCreateData {
  size?: number
  addresses?: any[]
  id?: string
  latitude: number
  longitude: number
  object?: string
}

export interface SelfMailer {
  campaign_id?: string
  carrier: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  fsc?: boolean
  id: string
  inside_template_id?: string
  inside_template_version_id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  outside_template_id?: string
  outside_template_version_id?: string
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface SelfMailerLoadMatch {
  id: string
}

export interface SelfMailerListMatch {
  "before/after"?: any
  campaign_id?: string
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  scheduled?: boolean
  send_date?: string
  size?: any[]
  sort_by?: any
  status?: string
}

export interface SelfMailerCreateData {
  idempotency_key?: string
  campaign_id?: string
  carrier: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  fsc?: boolean
  id: string
  inside_template_id?: string
  inside_template_version_id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  outside_template_id?: string
  outside_template_version_id?: string
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface SelfMailerRemoveMatch {
  id: string
}

export interface SnapPack {
  campaign_id?: string
  carrier: string
  color?: boolean
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  fsc?: boolean
  id: string
  inside_template_id?: string
  inside_template_version_id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  next_url?: string
  object?: string
  outside_template_id?: string
  outside_template_version_id?: string
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface SnapPackLoadMatch {
  id: string
}

export interface SnapPackListMatch {
  "before/after"?: any
  campaign_id?: string
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  mail_type?: string
  metadata?: Record<string, any>
  send_date?: string
  sort_by?: any
  status?: string
}

export interface SnapPackCreateData {
  idempotency_key?: string
  campaign_id?: string
  carrier: string
  color?: boolean
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  expected_delivery_date?: string
  failure_reason?: Record<string, any>
  from?: any
  fsc?: boolean
  id: string
  inside_template_id?: string
  inside_template_version_id?: string
  mail_type?: string
  merge_variables?: Record<string, any>
  next_url?: string
  object?: string
  outside_template_id?: string
  outside_template_version_id?: string
  previous_url?: string
  send_date?: string
  size?: string
  sla?: string
  status?: string
  thumbnails?: any[]
  to: any
  total_count?: number
  tracking_events?: any[]
  url: string
  use_type: string
}

export interface SnapPackRemoveMatch {
  id: string
}

export interface Template {
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  engine?: string
  html: string
  id: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  published_version: any
  required_vars?: any[]
  total_count?: number
  versions: any[]
}

export interface TemplateLoadMatch {
  id: string
}

export interface TemplateListMatch {
  "before/after"?: any
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
  metadata?: Record<string, any>
}

export interface TemplateCreateData {
  id: string
  count?: number
  data?: any[]
  date_created?: string
  date_modified?: string
  deleted?: boolean
  description?: string
  engine?: string
  html: string
  metadata?: Record<string, any>
  next_url?: string
  object?: string
  previous_url?: string
  published_version: any
  required_vars?: any[]
  total_count?: number
  versions: any[]
}

export interface TemplateRemoveMatch {
  id: string
}

export interface TemplateVersion {
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  engine?: string
  html: string
  id: string
  merge_variables?: Record<string, any>
  next_url?: string
  object: string
  previous_url?: string
  required_vars?: any[]
  suggest_json_editor?: boolean
  total_count?: number
}

export interface TemplateVersionLoadMatch {
  id: string
  template_id: string
}

export interface TemplateVersionListMatch {
  id: string
  "before/after"?: any
  date_created?: Record<string, any>
  include?: any[]
  limit?: number
}

export interface TemplateVersionCreateData {
  id: string
  template_id?: string
  count?: number
  data?: any[]
  date_created: string
  date_modified: string
  deleted?: boolean
  description?: string
  engine?: string
  html: string
  merge_variables?: Record<string, any>
  next_url?: string
  object: string
  previous_url?: string
  required_vars?: any[]
  suggest_json_editor?: boolean
  total_count?: number
}

export interface TemplateVersionDeletion {
}

export interface TemplateVersionDeletionRemoveMatch {
  template_id: string
  vrsn_id: string
}

export interface Upload {
  accountId: string
  bytesProcessed: number
  campaignId: any
  dateCreated: string
  dateModified: string
  deleted: boolean
  failedMailpieces: number
  failuresUrl?: string
  id: string
  mergeVariableColumnMapping?: Record<string, any>
  metadata: Record<string, any>
  mode: string
  optionalAddressColumnMapping: Record<string, any>
  originalFilename?: string
  requiredAddressColumnMapping: Record<string, any>
  s3Url: string
  state: string
  totalMailpieces: number
  type: string
  uploadId: string
  validatedMailpieces: number
}

export interface UploadLoadMatch {
  ex_id?: string
  id: string
}

export interface UploadListMatch {
  campaign_id?: string

  // Selects a custom action instead of the plain list:
  //   'report'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UploadCreateData {
  accountId: string
  bytesProcessed: number
  campaignId: any
  dateCreated: string
  dateModified: string
  deleted: boolean
  failedMailpieces: number
  failuresUrl?: string
  id: string
  mergeVariableColumnMapping?: Record<string, any>
  metadata: Record<string, any>
  mode: string
  optionalAddressColumnMapping: Record<string, any>
  originalFilename?: string
  requiredAddressColumnMapping: Record<string, any>
  s3Url: string
  state: string
  totalMailpieces: number
  type: string
  uploadId: string
  validatedMailpieces: number

  // Selects a custom action instead of the plain create:
  //   'file'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UploadUpdateData {
  id: string
  accountId?: string
  bytesProcessed?: number
  campaignId?: any
  dateCreated?: string
  dateModified?: string
  deleted?: boolean
  failedMailpieces?: number
  failuresUrl?: string
  mergeVariableColumnMapping?: Record<string, any>
  metadata?: Record<string, any>
  mode?: string
  optionalAddressColumnMapping?: Record<string, any>
  originalFilename?: string
  requiredAddressColumnMapping?: Record<string, any>
  s3Url?: string
  state?: string
  totalMailpieces?: number
  type?: string
  uploadId?: string
  validatedMailpieces?: number
}

export interface UploadRemoveMatch {
  id: string
}

export interface UploadCreateExport {
  exportId: string
  id?: string
  message: string
  type?: string
}

export interface UploadCreateExportCreateData {
  id: string
  exportId: string
  message: string
  type?: string
}

export interface UsAutocompletion {
  address_prefix: string
  city?: string
  geo_ip_sort?: boolean
  id?: string
  object?: string
  state?: string
  suggestions?: any[]
  zip_code?: string
}

export interface UsAutocompletionCreateData {
  case?: string
  valid_address?: boolean
  address_prefix: string
  city?: string
  geo_ip_sort?: boolean
  id?: string
  object?: string
  state?: string
  suggestions?: any[]
  zip_code?: string
}

export interface UsVerification {
  addresses: any[]
  components: Record<string, any>
  deliverability?: string
  deliverability_analysis: Record<string, any>
  errors: boolean
  id?: string
  last_line?: string
  lob_confidence_score: Record<string, any>
  object?: string
  primary_line?: string
  recipient?: string
  secondary_line?: string
  urbanization?: string
  valid_address?: boolean
}

export interface UsVerificationCreateData {
  case?: string
  addresses: any[]
  components: Record<string, any>
  deliverability?: string
  deliverability_analysis: Record<string, any>
  errors: boolean
  id?: string
  last_line?: string
  lob_confidence_score: Record<string, any>
  object?: string
  primary_line?: string
  recipient?: string
  secondary_line?: string
  urbanization?: string
  valid_address?: boolean
}

export interface Zip {
  zip_code: string
}

export interface ZipCreateData {
  zip_code: string
}

