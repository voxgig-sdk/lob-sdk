# frozen_string_literal: true

# Typed models for the Lob SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Address entity data model.
#
# @!attribute [rw] address_city
#   @return [String, nil]
#
# @!attribute [rw] address_country
#   @return [String, nil]
#
# @!attribute [rw] address_line1
#   @return [String, nil]
#
# @!attribute [rw] address_state
#   @return [String, nil]
#
# @!attribute [rw] address_zip
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
Address = Struct.new(
  :address_city,
  :address_country,
  :address_line1,
  :address_state,
  :address_zip,
  :company,
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :email,
  :id,
  :metadata,
  :name,
  :next_url,
  :object,
  :phone,
  :previous_url,
  :total_count,
  keyword_init: true
)

# Request payload for Address#load.
#
# @!attribute [rw] id
#   @return [String]
AddressLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Address#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
AddressListMatch = Struct.new(
  :"before/after",
  :date_created,
  :include,
  :limit,
  :metadata,
  keyword_init: true
)

# Request payload for Address#create.
#
# @!attribute [rw] address_city
#   @return [String, nil]
#
# @!attribute [rw] address_country
#   @return [String, nil]
#
# @!attribute [rw] address_line1
#   @return [String, nil]
#
# @!attribute [rw] address_state
#   @return [String, nil]
#
# @!attribute [rw] address_zip
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
AddressCreateData = Struct.new(
  :address_city,
  :address_country,
  :address_line1,
  :address_state,
  :address_zip,
  :company,
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :email,
  :id,
  :metadata,
  :name,
  :next_url,
  :object,
  :phone,
  :previous_url,
  :total_count,
  keyword_init: true
)

# Request payload for Address#remove.
#
# @!attribute [rw] id
#   @return [String]
AddressRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# BankAccount entity data model.
#
# @!attribute [rw] account_number
#   @return [String]
#
# @!attribute [rw] account_type
#   @return [String]
#
# @!attribute [rw] bank_name
#   @return [String, nil]
#
# @!attribute [rw] check_template
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fractional_routing_number
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] microdeposit_type
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] routing_number
#   @return [String]
#
# @!attribute [rw] signatory
#   @return [String]
#
# @!attribute [rw] signature_url
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] zipcode
#   @return [String, nil]
BankAccount = Struct.new(
  :account_number,
  :account_type,
  :bank_name,
  :check_template,
  :city,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :fractional_routing_number,
  :id,
  :metadata,
  :microdeposit_type,
  :next_url,
  :object,
  :previous_url,
  :routing_number,
  :signatory,
  :signature_url,
  :state,
  :total_count,
  :verified,
  :zipcode,
  keyword_init: true
)

# Request payload for BankAccount#load.
#
# @!attribute [rw] id
#   @return [String]
BankAccountLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BankAccount#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
BankAccountListMatch = Struct.new(
  :"before/after",
  :date_created,
  :include,
  :limit,
  :metadata,
  keyword_init: true
)

# Request payload for BankAccount#create.
#
# @!attribute [rw] account_number
#   @return [String]
#
# @!attribute [rw] account_type
#   @return [String]
#
# @!attribute [rw] bank_name
#   @return [String, nil]
#
# @!attribute [rw] check_template
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fractional_routing_number
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] microdeposit_type
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] routing_number
#   @return [String]
#
# @!attribute [rw] signatory
#   @return [String]
#
# @!attribute [rw] signature_url
#   @return [Object, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
#
# @!attribute [rw] zipcode
#   @return [String, nil]
BankAccountCreateData = Struct.new(
  :account_number,
  :account_type,
  :bank_name,
  :check_template,
  :city,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :fractional_routing_number,
  :id,
  :metadata,
  :microdeposit_type,
  :next_url,
  :object,
  :previous_url,
  :routing_number,
  :signatory,
  :signature_url,
  :state,
  :total_count,
  :verified,
  :zipcode,
  keyword_init: true
)

# BankDeletion entity data model.
class BankDeletion
end

# Request payload for BankDeletion#remove.
#
# @!attribute [rw] bank_id
#   @return [String]
BankDeletionRemoveMatch = Struct.new(
  :bank_id,
  keyword_init: true
)

# BillingGroup entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
BillingGroup = Struct.new(
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :id,
  :name,
  :next_url,
  :object,
  :previous_url,
  :total_count,
  keyword_init: true
)

# Request payload for BillingGroup#load.
#
# @!attribute [rw] id
#   @return [String]
BillingGroupLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for BillingGroup#list.
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] date_modified
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
BillingGroupListMatch = Struct.new(
  :date_created,
  :date_modified,
  :include,
  :limit,
  :offset,
  :sort_by,
  keyword_init: true
)

# Request payload for BillingGroup#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
BillingGroupCreateData = Struct.new(
  :id,
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :name,
  :next_url,
  :object,
  :previous_url,
  :total_count,
  keyword_init: true
)

# Booklet entity data model.
#
# @!attribute [rw] carrier
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [Hash, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] pages
#   @return [Integer, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] source_material
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Hash, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] tracking_number
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] use_type
#   @return [String, nil]
Booklet = Struct.new(
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :expected_delivery_date,
  :from,
  :fsc,
  :id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :pages,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :source_material,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :tracking_number,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Booklet#load.
#
# @!attribute [rw] id
#   @return [String]
BookletLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Booklet#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
BookletListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :send_date,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for Booklet#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [Hash, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] pages
#   @return [Integer, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] source_material
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Hash, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] tracking_number
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] use_type
#   @return [String, nil]
BookletCreateData = Struct.new(
  :idempotency_key,
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :description,
  :expected_delivery_date,
  :from,
  :fsc,
  :id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :pages,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :source_material,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :tracking_number,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Booklet#remove.
#
# @!attribute [rw] id
#   @return [String]
BookletRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Buckslip entity data model.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] allocated_quantity
#   @return [Float]
#
# @!attribute [rw] auto_reorder
#   @return [Boolean]
#
# @!attribute [rw] available_quantity
#   @return [Float]
#
# @!attribute [rw] back_original_url
#   @return [String]
#
# @!attribute [rw] buckslip_orders
#   @return [Array]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] finish
#   @return [String]
#
# @!attribute [rw] front_original_url
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] onhand_quantity
#   @return [Float]
#
# @!attribute [rw] pending_quantity
#   @return [Float]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] projected_quantity
#   @return [Float]
#
# @!attribute [rw] raw_url
#   @return [String]
#
# @!attribute [rw] reorder_quantity
#   @return [Integer]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] stock
#   @return [String]
#
# @!attribute [rw] threshold_amount
#   @return [Integer]
#
# @!attribute [rw] thumbnails
#   @return [Array]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] weight
#   @return [String]
Buckslip = Struct.new(
  :account_id,
  :allocated_quantity,
  :auto_reorder,
  :available_quantity,
  :back_original_url,
  :buckslip_orders,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :finish,
  :front_original_url,
  :id,
  :mode,
  :next_url,
  :object,
  :onhand_quantity,
  :pending_quantity,
  :previous_url,
  :projected_quantity,
  :raw_url,
  :reorder_quantity,
  :send_date,
  :size,
  :status,
  :stock,
  :threshold_amount,
  :thumbnails,
  :total_count,
  :url,
  :weight,
  keyword_init: true
)

# Request payload for Buckslip#load.
#
# @!attribute [rw] id
#   @return [String]
BuckslipLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Buckslip#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
BuckslipListMatch = Struct.new(
  :"before/after",
  :include,
  :limit,
  keyword_init: true
)

# Request payload for Buckslip#create.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] allocated_quantity
#   @return [Float]
#
# @!attribute [rw] auto_reorder
#   @return [Boolean]
#
# @!attribute [rw] available_quantity
#   @return [Float]
#
# @!attribute [rw] back_original_url
#   @return [String]
#
# @!attribute [rw] buckslip_orders
#   @return [Array]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] finish
#   @return [String]
#
# @!attribute [rw] front_original_url
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] onhand_quantity
#   @return [Float]
#
# @!attribute [rw] pending_quantity
#   @return [Float]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] projected_quantity
#   @return [Float]
#
# @!attribute [rw] raw_url
#   @return [String]
#
# @!attribute [rw] reorder_quantity
#   @return [Integer]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] stock
#   @return [String]
#
# @!attribute [rw] threshold_amount
#   @return [Integer]
#
# @!attribute [rw] thumbnails
#   @return [Array]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] weight
#   @return [String]
BuckslipCreateData = Struct.new(
  :account_id,
  :allocated_quantity,
  :auto_reorder,
  :available_quantity,
  :back_original_url,
  :buckslip_orders,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :finish,
  :front_original_url,
  :id,
  :mode,
  :next_url,
  :object,
  :onhand_quantity,
  :pending_quantity,
  :previous_url,
  :projected_quantity,
  :raw_url,
  :reorder_quantity,
  :send_date,
  :size,
  :status,
  :stock,
  :threshold_amount,
  :thumbnails,
  :total_count,
  :url,
  :weight,
  keyword_init: true
)

# Request payload for Buckslip#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] allocated_quantity
#   @return [Float, nil]
#
# @!attribute [rw] auto_reorder
#   @return [Boolean, nil]
#
# @!attribute [rw] available_quantity
#   @return [Float, nil]
#
# @!attribute [rw] back_original_url
#   @return [String, nil]
#
# @!attribute [rw] buckslip_orders
#   @return [Array, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] finish
#   @return [String, nil]
#
# @!attribute [rw] front_original_url
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] onhand_quantity
#   @return [Float, nil]
#
# @!attribute [rw] pending_quantity
#   @return [Float, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] projected_quantity
#   @return [Float, nil]
#
# @!attribute [rw] raw_url
#   @return [String, nil]
#
# @!attribute [rw] reorder_quantity
#   @return [Integer, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] stock
#   @return [String, nil]
#
# @!attribute [rw] threshold_amount
#   @return [Integer, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] weight
#   @return [String, nil]
BuckslipUpdateData = Struct.new(
  :id,
  :account_id,
  :allocated_quantity,
  :auto_reorder,
  :available_quantity,
  :back_original_url,
  :buckslip_orders,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :finish,
  :front_original_url,
  :mode,
  :next_url,
  :object,
  :onhand_quantity,
  :pending_quantity,
  :previous_url,
  :projected_quantity,
  :raw_url,
  :reorder_quantity,
  :send_date,
  :size,
  :status,
  :stock,
  :threshold_amount,
  :thumbnails,
  :total_count,
  :url,
  :weight,
  keyword_init: true
)

# Request payload for Buckslip#remove.
#
# @!attribute [rw] id
#   @return [String]
BuckslipRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# BuckslipOrder entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
BuckslipOrder = Struct.new(
  :count,
  :data,
  :id,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :total_count,
  keyword_init: true
)

# Request payload for BuckslipOrder#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
BuckslipOrderListMatch = Struct.new(
  :id,
  :limit,
  :offset,
  keyword_init: true
)

# Request payload for BuckslipOrder#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
BuckslipOrderCreateData = Struct.new(
  :id,
  :count,
  :data,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :total_count,
  keyword_init: true
)

# Campaign entity data model.
#
# @!attribute [rw] auto_cancel_if_ncoa
#   @return [Boolean, nil]
#
# @!attribute [rw] billing_group_id
#   @return [String, nil]
#
# @!attribute [rw] cancel_window_campaign_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] creatives
#   @return [Array]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_draft
#   @return [Boolean]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] print_speed
#   @return [String, nil]
#
# @!attribute [rw] schedule_type
#   @return [String]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] target_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] uploads
#   @return [Array]
#
# @!attribute [rw] use_type
#   @return [String]
Campaign = Struct.new(
  :auto_cancel_if_ncoa,
  :billing_group_id,
  :cancel_window_campaign_minutes,
  :count,
  :creatives,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :id,
  :is_draft,
  :metadata,
  :name,
  :next_url,
  :object,
  :previous_url,
  :print_speed,
  :schedule_type,
  :send_date,
  :target_delivery_date,
  :total_count,
  :uploads,
  :use_type,
  keyword_init: true
)

# Request payload for Campaign#load.
#
# @!attribute [rw] id
#   @return [String]
CampaignLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Campaign#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
CampaignListMatch = Struct.new(
  :"before/after",
  :include,
  :limit,
  keyword_init: true
)

# Request payload for Campaign#create.
#
# @!attribute [rw] auto_cancel_if_ncoa
#   @return [Boolean, nil]
#
# @!attribute [rw] billing_group_id
#   @return [String, nil]
#
# @!attribute [rw] cancel_window_campaign_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] creatives
#   @return [Array]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_draft
#   @return [Boolean]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] print_speed
#   @return [String, nil]
#
# @!attribute [rw] schedule_type
#   @return [String]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] target_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] uploads
#   @return [Array]
#
# @!attribute [rw] use_type
#   @return [String]
CampaignCreateData = Struct.new(
  :auto_cancel_if_ncoa,
  :billing_group_id,
  :cancel_window_campaign_minutes,
  :count,
  :creatives,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :id,
  :is_draft,
  :metadata,
  :name,
  :next_url,
  :object,
  :previous_url,
  :print_speed,
  :schedule_type,
  :send_date,
  :target_delivery_date,
  :total_count,
  :uploads,
  :use_type,
  keyword_init: true
)

# Request payload for Campaign#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] auto_cancel_if_ncoa
#   @return [Boolean, nil]
#
# @!attribute [rw] billing_group_id
#   @return [String, nil]
#
# @!attribute [rw] cancel_window_campaign_minutes
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] creatives
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] is_draft
#   @return [Boolean, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] print_speed
#   @return [String, nil]
#
# @!attribute [rw] schedule_type
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] target_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] uploads
#   @return [Array, nil]
#
# @!attribute [rw] use_type
#   @return [String, nil]
CampaignUpdateData = Struct.new(
  :id,
  :auto_cancel_if_ncoa,
  :billing_group_id,
  :cancel_window_campaign_minutes,
  :count,
  :creatives,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :is_draft,
  :metadata,
  :name,
  :next_url,
  :object,
  :previous_url,
  :print_speed,
  :schedule_type,
  :send_date,
  :target_delivery_date,
  :total_count,
  :uploads,
  :use_type,
  keyword_init: true
)

# Request payload for Campaign#remove.
#
# @!attribute [rw] id
#   @return [String]
CampaignRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Card entity data model.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] auto_reorder
#   @return [Boolean]
#
# @!attribute [rw] available_quantity
#   @return [Integer]
#
# @!attribute [rw] back_original_url
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] countries
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] front_original_url
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] orientation
#   @return [String]
#
# @!attribute [rw] pending_quantity
#   @return [Integer]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] raw_url
#   @return [String]
#
# @!attribute [rw] reorder_quantity
#   @return [Integer]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] threshold_amount
#   @return [Integer]
#
# @!attribute [rw] thumbnails
#   @return [Array]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String]
Card = Struct.new(
  :account_id,
  :auto_reorder,
  :available_quantity,
  :back_original_url,
  :count,
  :countries,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :front_original_url,
  :id,
  :mode,
  :next_url,
  :object,
  :orientation,
  :pending_quantity,
  :previous_url,
  :raw_url,
  :reorder_quantity,
  :send_date,
  :size,
  :status,
  :threshold_amount,
  :thumbnails,
  :total_count,
  :url,
  keyword_init: true
)

# Request payload for Card#load.
#
# @!attribute [rw] id
#   @return [String]
CardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Card#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
CardListMatch = Struct.new(
  :"before/after",
  :include,
  :limit,
  keyword_init: true
)

# Request payload for Card#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] auto_reorder
#   @return [Boolean]
#
# @!attribute [rw] available_quantity
#   @return [Integer]
#
# @!attribute [rw] back_original_url
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] countries
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] front_original_url
#   @return [String]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] orientation
#   @return [String]
#
# @!attribute [rw] pending_quantity
#   @return [Integer]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] raw_url
#   @return [String]
#
# @!attribute [rw] reorder_quantity
#   @return [Integer]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] threshold_amount
#   @return [Integer]
#
# @!attribute [rw] thumbnails
#   @return [Array]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String]
CardCreateData = Struct.new(
  :id,
  :account_id,
  :auto_reorder,
  :available_quantity,
  :back_original_url,
  :count,
  :countries,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :front_original_url,
  :mode,
  :next_url,
  :object,
  :orientation,
  :pending_quantity,
  :previous_url,
  :raw_url,
  :reorder_quantity,
  :send_date,
  :size,
  :status,
  :threshold_amount,
  :thumbnails,
  :total_count,
  :url,
  keyword_init: true
)

# Request payload for Card#remove.
#
# @!attribute [rw] id
#   @return [String]
CardRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# CardOrder entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
CardOrder = Struct.new(
  :count,
  :data,
  :id,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :total_count,
  keyword_init: true
)

# Request payload for CardOrder#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
CardOrderListMatch = Struct.new(
  :id,
  :limit,
  :offset,
  keyword_init: true
)

# Request payload for CardOrder#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
CardOrderCreateData = Struct.new(
  :id,
  :count,
  :data,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :total_count,
  keyword_init: true
)

# Check entity data model.
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] attachment_template_id
#   @return [String, nil]
#
# @!attribute [rw] attachment_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] bank_account
#   @return [Object]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] check_bottom_template_id
#   @return [String, nil]
#
# @!attribute [rw] check_bottom_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] check_number
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] memo
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
Check = Struct.new(
  :amount,
  :attachment_template_id,
  :attachment_template_version_id,
  :bank_account,
  :carrier,
  :check_bottom_template_id,
  :check_bottom_template_version_id,
  :check_number,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :id,
  :mail_type,
  :memo,
  :merge_variables,
  :message,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :send_date,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Check#load.
#
# @!attribute [rw] id
#   @return [String]
CheckLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Check#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] scheduled
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
CheckListMatch = Struct.new(
  :"before/after",
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :scheduled,
  :send_date,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for Check#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] attachment_template_id
#   @return [String, nil]
#
# @!attribute [rw] attachment_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] bank_account
#   @return [Object]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] check_bottom_template_id
#   @return [String, nil]
#
# @!attribute [rw] check_bottom_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] check_number
#   @return [Integer, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] memo
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
CheckCreateData = Struct.new(
  :idempotency_key,
  :amount,
  :attachment_template_id,
  :attachment_template_version_id,
  :bank_account,
  :carrier,
  :check_bottom_template_id,
  :check_bottom_template_version_id,
  :check_number,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :id,
  :mail_type,
  :memo,
  :merge_variables,
  :message,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :send_date,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Check#remove.
#
# @!attribute [rw] id
#   @return [String]
CheckRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Creative entity data model.
#
# @!attribute [rw] campaigns
#   @return [Array]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] template_preview_urls
#   @return [Hash]
#
# @!attribute [rw] template_previews
#   @return [Array]
Creative = Struct.new(
  :campaigns,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :details,
  :from,
  :id,
  :metadata,
  :object,
  :resource_type,
  :template_preview_urls,
  :template_previews,
  keyword_init: true
)

# Request payload for Creative#load.
#
# @!attribute [rw] id
#   @return [String]
CreativeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Creative#create.
#
# @!attribute [rw] campaigns
#   @return [Array]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] template_preview_urls
#   @return [Hash]
#
# @!attribute [rw] template_previews
#   @return [Array]
CreativeCreateData = Struct.new(
  :campaigns,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :details,
  :from,
  :id,
  :metadata,
  :object,
  :resource_type,
  :template_preview_urls,
  :template_previews,
  keyword_init: true
)

# Request payload for Creative#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] campaigns
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] template_preview_urls
#   @return [Hash, nil]
#
# @!attribute [rw] template_previews
#   @return [Array, nil]
CreativeUpdateData = Struct.new(
  :id,
  :campaigns,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :details,
  :from,
  :metadata,
  :object,
  :resource_type,
  :template_preview_urls,
  :template_previews,
  keyword_init: true
)

# Domain entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] error_redirect_link
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Domain = Struct.new(
  :count,
  :created_at,
  :data,
  :domain,
  :error_redirect_link,
  :id,
  :next_url,
  :object,
  :previous_url,
  :status,
  :total_count,
  :updated_at,
  keyword_init: true
)

# Request payload for Domain#load.
#
# @!attribute [rw] id
#   @return [String]
DomainLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Domain#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
DomainListMatch = Struct.new(
  :"before/after",
  :limit,
  :status,
  keyword_init: true
)

# Request payload for Domain#create.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] error_redirect_link
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
DomainCreateData = Struct.new(
  :count,
  :created_at,
  :data,
  :domain,
  :error_redirect_link,
  :id,
  :next_url,
  :object,
  :previous_url,
  :status,
  :total_count,
  :updated_at,
  keyword_init: true
)

# Request payload for Domain#remove.
#
# @!attribute [rw] id
#   @return [String]
DomainRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# IdentityValidation entity data model.
#
# @!attribute [rw] confidence
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] urbanization
#   @return [String, nil]
IdentityValidation = Struct.new(
  :confidence,
  :id,
  :last_line,
  :object,
  :primary_line,
  :recipient,
  :score,
  :secondary_line,
  :urbanization,
  keyword_init: true
)

# Request payload for IdentityValidation#create.
#
# @!attribute [rw] confidence
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] urbanization
#   @return [String, nil]
IdentityValidationCreateData = Struct.new(
  :confidence,
  :id,
  :last_line,
  :object,
  :primary_line,
  :recipient,
  :score,
  :secondary_line,
  :urbanization,
  keyword_init: true
)

# IntlVerification entity data model.
#
# @!attribute [rw] addresses
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] coverage
#   @return [String, nil]
#
# @!attribute [rw] deliverability
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
IntlVerification = Struct.new(
  :addresses,
  :components,
  :country,
  :coverage,
  :deliverability,
  :errors,
  :id,
  :last_line,
  :object,
  :primary_line,
  :recipient,
  :secondary_line,
  :status,
  keyword_init: true
)

# Request payload for IntlVerification#create.
#
# @!attribute [rw] addresses
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] coverage
#   @return [String, nil]
#
# @!attribute [rw] deliverability
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
IntlVerificationCreateData = Struct.new(
  :addresses,
  :components,
  :country,
  :coverage,
  :deliverability,
  :errors,
  :id,
  :last_line,
  :object,
  :primary_line,
  :recipient,
  :secondary_line,
  :status,
  keyword_init: true
)

# Letter entity data model.
#
# @!attribute [rw] address_placement
#   @return [String, nil]
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] carrier
#   @return [String, nil]
#
# @!attribute [rw] color
#   @return [Boolean, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_envelope
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] double_sided
#   @return [Boolean, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] extra_service
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [Hash, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] perforated_page
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] return_envelope
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Hash, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] tracking_number
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] use_type
#   @return [String, nil]
Letter = Struct.new(
  :address_placement,
  :cards,
  :carrier,
  :color,
  :count,
  :custom_envelope,
  :data,
  :date_created,
  :date_modified,
  :description,
  :double_sided,
  :expected_delivery_date,
  :extra_service,
  :from,
  :fsc,
  :id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :perforated_page,
  :previous_url,
  :return_envelope,
  :send_date,
  :sla,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :tracking_number,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Letter#load.
#
# @!attribute [rw] id
#   @return [String]
LetterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Letter#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] color
#   @return [Boolean, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] scheduled
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
LetterListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :color,
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :scheduled,
  :send_date,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for Letter#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] address_placement
#   @return [String, nil]
#
# @!attribute [rw] cards
#   @return [Array, nil]
#
# @!attribute [rw] carrier
#   @return [String, nil]
#
# @!attribute [rw] color
#   @return [Boolean, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_envelope
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] double_sided
#   @return [Boolean, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] extra_service
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [Hash, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] perforated_page
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] return_envelope
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Hash, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] tracking_number
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] use_type
#   @return [String, nil]
LetterCreateData = Struct.new(
  :idempotency_key,
  :address_placement,
  :cards,
  :carrier,
  :color,
  :count,
  :custom_envelope,
  :data,
  :date_created,
  :date_modified,
  :description,
  :double_sided,
  :expected_delivery_date,
  :extra_service,
  :from,
  :fsc,
  :id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :perforated_page,
  :previous_url,
  :return_envelope,
  :send_date,
  :sla,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :tracking_number,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Letter#remove.
#
# @!attribute [rw] id
#   @return [String]
LetterRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Link entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] redirect_link
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
Link = Struct.new(
  :count,
  :data,
  :domain,
  :id,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :redirect_link,
  :slug,
  :title,
  :total_count,
  keyword_init: true
)

# Request payload for Link#load.
#
# @!attribute [rw] id
#   @return [String]
LinkLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Link#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] domain_id
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
LinkListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :domain_id,
  :limit,
  keyword_init: true
)

# Request payload for Link#create.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] redirect_link
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
LinkCreateData = Struct.new(
  :count,
  :data,
  :domain,
  :id,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :redirect_link,
  :slug,
  :title,
  :total_count,
  keyword_init: true
)

# Request payload for Link#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] redirect_link
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
LinkUpdateData = Struct.new(
  :id,
  :count,
  :data,
  :domain,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :redirect_link,
  :slug,
  :title,
  :total_count,
  keyword_init: true
)

# Request payload for Link#remove.
#
# @!attribute [rw] id
#   @return [String]
LinkRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# LobCreditsBalance entity data model.
#
# @!attribute [rw] balance
#   @return [Float]
LobCreditsBalance = Struct.new(
  :balance,
  keyword_init: true
)

# Request payload for LobCreditsBalance#load.
#
# @!attribute [rw] balance
#   @return [Float, nil]
LobCreditsBalanceLoadMatch = Struct.new(
  :balance,
  keyword_init: true
)

# Postcard entity data model.
#
# @!attribute [rw] back_template_id
#   @return [String]
#
# @!attribute [rw] back_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] front_template_id
#   @return [String]
#
# @!attribute [rw] front_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String, nil]
Postcard = Struct.new(
  :back_template_id,
  :back_template_version_id,
  :campaign_id,
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :front_template_id,
  :front_template_version_id,
  :fsc,
  :id,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :send_date,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Postcard#load.
#
# @!attribute [rw] id
#   @return [String]
PostcardLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Postcard#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] scheduled
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Array, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
PostcardListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :scheduled,
  :send_date,
  :size,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for Postcard#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] back_template_id
#   @return [String]
#
# @!attribute [rw] back_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] front_template_id
#   @return [String]
#
# @!attribute [rw] front_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String, nil]
PostcardCreateData = Struct.new(
  :idempotency_key,
  :back_template_id,
  :back_template_version_id,
  :campaign_id,
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :front_template_id,
  :front_template_version_id,
  :fsc,
  :id,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :send_date,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for Postcard#remove.
#
# @!attribute [rw] id
#   @return [String]
PostcardRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# QrCode entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] scanned_count
#   @return [Integer, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
QrCode = Struct.new(
  :count,
  :data,
  :object,
  :scanned_count,
  :total_count,
  keyword_init: true
)

# Request payload for QrCode#list.
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
#
# @!attribute [rw] resource_id
#   @return [Array, nil]
#
# @!attribute [rw] scanned
#   @return [Boolean, nil]
QrCodeListMatch = Struct.new(
  :date_created,
  :include,
  :limit,
  :offset,
  :resource_id,
  :scanned,
  keyword_init: true
)

# ResourceProof entity data model.
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ResourceProof = Struct.new(
  :date_created,
  :date_modified,
  :errors,
  :id,
  :object,
  :resource_type,
  :status,
  :template_id,
  :thumbnails,
  :url,
  keyword_init: true
)

# Request payload for ResourceProof#load.
#
# @!attribute [rw] id
#   @return [String]
ResourceProofLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ResourceProof#create.
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ResourceProofCreateData = Struct.new(
  :date_created,
  :date_modified,
  :errors,
  :id,
  :object,
  :resource_type,
  :status,
  :template_id,
  :thumbnails,
  :url,
  keyword_init: true
)

# Request payload for ResourceProof#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] resource_type
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ResourceProofUpdateData = Struct.new(
  :id,
  :date_created,
  :date_modified,
  :errors,
  :object,
  :resource_type,
  :status,
  :template_id,
  :thumbnails,
  :url,
  keyword_init: true
)

# Response entity data model.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] brand_name
#   @return [String, nil]
#
# @!attribute [rw] campaign_code
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean]
#
# @!attribute [rw] end_date
#   @return [String]
#
# @!attribute [rw] end_serial
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lob_campaign_id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] representative_image_s3_link
#   @return [String]
#
# @!attribute [rw] ride_along_image_s3_link
#   @return [String]
#
# @!attribute [rw] ride_along_url
#   @return [String, nil]
#
# @!attribute [rw] service_request_number
#   @return [String]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] start_serial
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] usps_campaign_id
#   @return [String]
#
# @!attribute [rw] usps_title
#   @return [String, nil]
Response = Struct.new(
  :account_id,
  :brand_name,
  :campaign_code,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :end_date,
  :end_serial,
  :id,
  :lob_campaign_id,
  :mode,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :representative_image_s3_link,
  :ride_along_image_s3_link,
  :ride_along_url,
  :service_request_number,
  :start_date,
  :start_serial,
  :status,
  :total_count,
  :usps_campaign_id,
  :usps_title,
  keyword_init: true
)

# Request payload for Response#load.
#
# @!attribute [rw] usps_campaign_id
#   @return [String]
ResponseLoadMatch = Struct.new(
  :usps_campaign_id,
  keyword_init: true
)

# Request payload for Response#list.
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] brand_name
#   @return [String, nil]
#
# @!attribute [rw] campaign_code
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] end_serial
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lob_campaign_id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] representative_image_s3_link
#   @return [String, nil]
#
# @!attribute [rw] ride_along_image_s3_link
#   @return [String, nil]
#
# @!attribute [rw] ride_along_url
#   @return [String, nil]
#
# @!attribute [rw] service_request_number
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] start_serial
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] usps_campaign_id
#   @return [String, nil]
#
# @!attribute [rw] usps_title
#   @return [String, nil]
ResponseListMatch = Struct.new(
  :account_id,
  :brand_name,
  :campaign_code,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :end_date,
  :end_serial,
  :id,
  :lob_campaign_id,
  :mode,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :representative_image_s3_link,
  :ride_along_image_s3_link,
  :ride_along_url,
  :service_request_number,
  :start_date,
  :start_serial,
  :status,
  :total_count,
  :usps_campaign_id,
  :usps_title,
  keyword_init: true
)

# Request payload for Response#create.
#
# @!attribute [rw] account_id
#   @return [String]
#
# @!attribute [rw] brand_name
#   @return [String, nil]
#
# @!attribute [rw] campaign_code
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean]
#
# @!attribute [rw] end_date
#   @return [String]
#
# @!attribute [rw] end_serial
#   @return [Integer]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lob_campaign_id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] representative_image_s3_link
#   @return [String]
#
# @!attribute [rw] ride_along_image_s3_link
#   @return [String]
#
# @!attribute [rw] ride_along_url
#   @return [String, nil]
#
# @!attribute [rw] service_request_number
#   @return [String]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] start_serial
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] usps_campaign_id
#   @return [String]
#
# @!attribute [rw] usps_title
#   @return [String, nil]
ResponseCreateData = Struct.new(
  :account_id,
  :brand_name,
  :campaign_code,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :end_date,
  :end_serial,
  :id,
  :lob_campaign_id,
  :mode,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :representative_image_s3_link,
  :ride_along_image_s3_link,
  :ride_along_url,
  :service_request_number,
  :start_date,
  :start_serial,
  :status,
  :total_count,
  :usps_campaign_id,
  :usps_title,
  keyword_init: true
)

# Request payload for Response#update.
#
# @!attribute [rw] usps_campaign_id
#   @return [String]
#
# @!attribute [rw] account_id
#   @return [String, nil]
#
# @!attribute [rw] brand_name
#   @return [String, nil]
#
# @!attribute [rw] campaign_code
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] end_serial
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lob_campaign_id
#   @return [String, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] representative_image_s3_link
#   @return [String, nil]
#
# @!attribute [rw] ride_along_image_s3_link
#   @return [String, nil]
#
# @!attribute [rw] ride_along_url
#   @return [String, nil]
#
# @!attribute [rw] service_request_number
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] start_serial
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] usps_title
#   @return [String, nil]
ResponseUpdateData = Struct.new(
  :usps_campaign_id,
  :account_id,
  :brand_name,
  :campaign_code,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :end_date,
  :end_serial,
  :id,
  :lob_campaign_id,
  :mode,
  :next_url,
  :object,
  :previous_url,
  :quantity,
  :representative_image_s3_link,
  :ride_along_image_s3_link,
  :ride_along_url,
  :service_request_number,
  :start_date,
  :start_serial,
  :status,
  :total_count,
  :usps_title,
  keyword_init: true
)

# ReverseGeocode entity data model.
#
# @!attribute [rw] addresses
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] object
#   @return [String, nil]
ReverseGeocode = Struct.new(
  :addresses,
  :id,
  :latitude,
  :longitude,
  :object,
  keyword_init: true
)

# Request payload for ReverseGeocode#create.
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] addresses
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] object
#   @return [String, nil]
ReverseGeocodeCreateData = Struct.new(
  :size,
  :addresses,
  :id,
  :latitude,
  :longitude,
  :object,
  keyword_init: true
)

# SelfMailer entity data model.
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inside_template_id
#   @return [String, nil]
#
# @!attribute [rw] inside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] outside_template_id
#   @return [String, nil]
#
# @!attribute [rw] outside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
SelfMailer = Struct.new(
  :campaign_id,
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :fsc,
  :id,
  :inside_template_id,
  :inside_template_version_id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :outside_template_id,
  :outside_template_version_id,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for SelfMailer#load.
#
# @!attribute [rw] id
#   @return [String]
SelfMailerLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SelfMailer#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] scheduled
#   @return [Boolean, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Array, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
SelfMailerListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :scheduled,
  :send_date,
  :size,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for SelfMailer#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inside_template_id
#   @return [String, nil]
#
# @!attribute [rw] inside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] outside_template_id
#   @return [String, nil]
#
# @!attribute [rw] outside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
SelfMailerCreateData = Struct.new(
  :idempotency_key,
  :campaign_id,
  :carrier,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :fsc,
  :id,
  :inside_template_id,
  :inside_template_version_id,
  :mail_type,
  :merge_variables,
  :metadata,
  :next_url,
  :object,
  :outside_template_id,
  :outside_template_version_id,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for SelfMailer#remove.
#
# @!attribute [rw] id
#   @return [String]
SelfMailerRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# SnapPack entity data model.
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] color
#   @return [Boolean, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inside_template_id
#   @return [String, nil]
#
# @!attribute [rw] inside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] outside_template_id
#   @return [String, nil]
#
# @!attribute [rw] outside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
SnapPack = Struct.new(
  :campaign_id,
  :carrier,
  :color,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :fsc,
  :id,
  :inside_template_id,
  :inside_template_version_id,
  :mail_type,
  :merge_variables,
  :next_url,
  :object,
  :outside_template_id,
  :outside_template_version_id,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for SnapPack#load.
#
# @!attribute [rw] id
#   @return [String]
SnapPackLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SnapPack#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [Object, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
SnapPackListMatch = Struct.new(
  :"before/after",
  :campaign_id,
  :date_created,
  :include,
  :limit,
  :mail_type,
  :metadata,
  :send_date,
  :sort_by,
  :status,
  keyword_init: true
)

# Request payload for SnapPack#create.
#
# @!attribute [rw] idempotency_key
#   @return [String, nil]
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
#
# @!attribute [rw] carrier
#   @return [String]
#
# @!attribute [rw] color
#   @return [Boolean, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] expected_delivery_date
#   @return [String, nil]
#
# @!attribute [rw] failure_reason
#   @return [Hash, nil]
#
# @!attribute [rw] from
#   @return [Object, nil]
#
# @!attribute [rw] fsc
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inside_template_id
#   @return [String, nil]
#
# @!attribute [rw] inside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] mail_type
#   @return [String, nil]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] outside_template_id
#   @return [String, nil]
#
# @!attribute [rw] outside_template_version_id
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] send_date
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] sla
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] thumbnails
#   @return [Array, nil]
#
# @!attribute [rw] to
#   @return [Object]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] tracking_events
#   @return [Array, nil]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use_type
#   @return [String]
SnapPackCreateData = Struct.new(
  :idempotency_key,
  :campaign_id,
  :carrier,
  :color,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :expected_delivery_date,
  :failure_reason,
  :from,
  :fsc,
  :id,
  :inside_template_id,
  :inside_template_version_id,
  :mail_type,
  :merge_variables,
  :next_url,
  :object,
  :outside_template_id,
  :outside_template_version_id,
  :previous_url,
  :send_date,
  :size,
  :sla,
  :status,
  :thumbnails,
  :to,
  :total_count,
  :tracking_events,
  :url,
  :use_type,
  keyword_init: true
)

# Request payload for SnapPack#remove.
#
# @!attribute [rw] id
#   @return [String]
SnapPackRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Template entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] engine
#   @return [String, nil]
#
# @!attribute [rw] html
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] published_version
#   @return [Object]
#
# @!attribute [rw] required_vars
#   @return [Array, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] versions
#   @return [Array]
Template = Struct.new(
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :engine,
  :html,
  :id,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :published_version,
  :required_vars,
  :total_count,
  :versions,
  keyword_init: true
)

# Request payload for Template#load.
#
# @!attribute [rw] id
#   @return [String]
TemplateLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Template#list.
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
TemplateListMatch = Struct.new(
  :"before/after",
  :date_created,
  :include,
  :limit,
  :metadata,
  keyword_init: true
)

# Request payload for Template#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String, nil]
#
# @!attribute [rw] date_modified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] engine
#   @return [String, nil]
#
# @!attribute [rw] html
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] published_version
#   @return [Object]
#
# @!attribute [rw] required_vars
#   @return [Array, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
#
# @!attribute [rw] versions
#   @return [Array]
TemplateCreateData = Struct.new(
  :id,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :engine,
  :html,
  :metadata,
  :next_url,
  :object,
  :previous_url,
  :published_version,
  :required_vars,
  :total_count,
  :versions,
  keyword_init: true
)

# Request payload for Template#remove.
#
# @!attribute [rw] id
#   @return [String]
TemplateRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# TemplateVersion entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] engine
#   @return [String, nil]
#
# @!attribute [rw] html
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] required_vars
#   @return [Array, nil]
#
# @!attribute [rw] suggest_json_editor
#   @return [Boolean, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
TemplateVersion = Struct.new(
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :engine,
  :html,
  :id,
  :merge_variables,
  :next_url,
  :object,
  :previous_url,
  :required_vars,
  :suggest_json_editor,
  :total_count,
  keyword_init: true
)

# Request payload for TemplateVersion#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String]
TemplateVersionLoadMatch = Struct.new(
  :id,
  :template_id,
  keyword_init: true
)

# Request payload for TemplateVersion#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] before/after
#   @return [Object, nil]
#
# @!attribute [rw] date_created
#   @return [Hash, nil]
#
# @!attribute [rw] include
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
TemplateVersionListMatch = Struct.new(
  :id,
  :"before/after",
  :date_created,
  :include,
  :limit,
  keyword_init: true
)

# Request payload for TemplateVersion#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] template_id
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date_created
#   @return [String]
#
# @!attribute [rw] date_modified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] engine
#   @return [String, nil]
#
# @!attribute [rw] html
#   @return [String]
#
# @!attribute [rw] merge_variables
#   @return [Hash, nil]
#
# @!attribute [rw] next_url
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String]
#
# @!attribute [rw] previous_url
#   @return [String, nil]
#
# @!attribute [rw] required_vars
#   @return [Array, nil]
#
# @!attribute [rw] suggest_json_editor
#   @return [Boolean, nil]
#
# @!attribute [rw] total_count
#   @return [Integer, nil]
TemplateVersionCreateData = Struct.new(
  :id,
  :template_id,
  :count,
  :data,
  :date_created,
  :date_modified,
  :deleted,
  :description,
  :engine,
  :html,
  :merge_variables,
  :next_url,
  :object,
  :previous_url,
  :required_vars,
  :suggest_json_editor,
  :total_count,
  keyword_init: true
)

# TemplateVersionDeletion entity data model.
class TemplateVersionDeletion
end

# Request payload for TemplateVersionDeletion#remove.
#
# @!attribute [rw] template_id
#   @return [String]
#
# @!attribute [rw] vrsn_id
#   @return [String]
TemplateVersionDeletionRemoveMatch = Struct.new(
  :template_id,
  :vrsn_id,
  keyword_init: true
)

# Upload entity data model.
#
# @!attribute [rw] accountId
#   @return [String]
#
# @!attribute [rw] bytesProcessed
#   @return [Integer]
#
# @!attribute [rw] campaignId
#   @return [Object]
#
# @!attribute [rw] dateCreated
#   @return [String]
#
# @!attribute [rw] dateModified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean]
#
# @!attribute [rw] failedMailpieces
#   @return [Integer]
#
# @!attribute [rw] failuresUrl
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mergeVariableColumnMapping
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] optionalAddressColumnMapping
#   @return [Hash]
#
# @!attribute [rw] originalFilename
#   @return [String, nil]
#
# @!attribute [rw] requiredAddressColumnMapping
#   @return [Hash]
#
# @!attribute [rw] s3Url
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] totalMailpieces
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] uploadId
#   @return [String]
#
# @!attribute [rw] validatedMailpieces
#   @return [Integer]
Upload = Struct.new(
  :accountId,
  :bytesProcessed,
  :campaignId,
  :dateCreated,
  :dateModified,
  :deleted,
  :failedMailpieces,
  :failuresUrl,
  :id,
  :mergeVariableColumnMapping,
  :metadata,
  :mode,
  :optionalAddressColumnMapping,
  :originalFilename,
  :requiredAddressColumnMapping,
  :s3Url,
  :state,
  :totalMailpieces,
  :type,
  :uploadId,
  :validatedMailpieces,
  keyword_init: true
)

# Request payload for Upload#load.
#
# @!attribute [rw] ex_id
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
UploadLoadMatch = Struct.new(
  :ex_id,
  :id,
  keyword_init: true
)

# Request payload for Upload#list.
#
# @!attribute [rw] campaign_id
#   @return [String, nil]
UploadListMatch = Struct.new(
  :campaign_id,
  keyword_init: true
)

# Request payload for Upload#create.
#
# @!attribute [rw] accountId
#   @return [String]
#
# @!attribute [rw] bytesProcessed
#   @return [Integer]
#
# @!attribute [rw] campaignId
#   @return [Object]
#
# @!attribute [rw] dateCreated
#   @return [String]
#
# @!attribute [rw] dateModified
#   @return [String]
#
# @!attribute [rw] deleted
#   @return [Boolean]
#
# @!attribute [rw] failedMailpieces
#   @return [Integer]
#
# @!attribute [rw] failuresUrl
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] mergeVariableColumnMapping
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] mode
#   @return [String]
#
# @!attribute [rw] optionalAddressColumnMapping
#   @return [Hash]
#
# @!attribute [rw] originalFilename
#   @return [String, nil]
#
# @!attribute [rw] requiredAddressColumnMapping
#   @return [Hash]
#
# @!attribute [rw] s3Url
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] totalMailpieces
#   @return [Integer]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] uploadId
#   @return [String]
#
# @!attribute [rw] validatedMailpieces
#   @return [Integer]
UploadCreateData = Struct.new(
  :accountId,
  :bytesProcessed,
  :campaignId,
  :dateCreated,
  :dateModified,
  :deleted,
  :failedMailpieces,
  :failuresUrl,
  :id,
  :mergeVariableColumnMapping,
  :metadata,
  :mode,
  :optionalAddressColumnMapping,
  :originalFilename,
  :requiredAddressColumnMapping,
  :s3Url,
  :state,
  :totalMailpieces,
  :type,
  :uploadId,
  :validatedMailpieces,
  keyword_init: true
)

# Request payload for Upload#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] accountId
#   @return [String, nil]
#
# @!attribute [rw] bytesProcessed
#   @return [Integer, nil]
#
# @!attribute [rw] campaignId
#   @return [Object, nil]
#
# @!attribute [rw] dateCreated
#   @return [String, nil]
#
# @!attribute [rw] dateModified
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] failedMailpieces
#   @return [Integer, nil]
#
# @!attribute [rw] failuresUrl
#   @return [String, nil]
#
# @!attribute [rw] mergeVariableColumnMapping
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] mode
#   @return [String, nil]
#
# @!attribute [rw] optionalAddressColumnMapping
#   @return [Hash, nil]
#
# @!attribute [rw] originalFilename
#   @return [String, nil]
#
# @!attribute [rw] requiredAddressColumnMapping
#   @return [Hash, nil]
#
# @!attribute [rw] s3Url
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] totalMailpieces
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] uploadId
#   @return [String, nil]
#
# @!attribute [rw] validatedMailpieces
#   @return [Integer, nil]
UploadUpdateData = Struct.new(
  :id,
  :accountId,
  :bytesProcessed,
  :campaignId,
  :dateCreated,
  :dateModified,
  :deleted,
  :failedMailpieces,
  :failuresUrl,
  :mergeVariableColumnMapping,
  :metadata,
  :mode,
  :optionalAddressColumnMapping,
  :originalFilename,
  :requiredAddressColumnMapping,
  :s3Url,
  :state,
  :totalMailpieces,
  :type,
  :uploadId,
  :validatedMailpieces,
  keyword_init: true
)

# Request payload for Upload#remove.
#
# @!attribute [rw] id
#   @return [String]
UploadRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# UploadCreateExport entity data model.
#
# @!attribute [rw] exportId
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
UploadCreateExport = Struct.new(
  :exportId,
  :id,
  :message,
  :type,
  keyword_init: true
)

# Request payload for UploadCreateExport#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] exportId
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] type
#   @return [String, nil]
UploadCreateExportCreateData = Struct.new(
  :id,
  :exportId,
  :message,
  :type,
  keyword_init: true
)

# UsAutocompletion entity data model.
#
# @!attribute [rw] address_prefix
#   @return [String]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] geo_ip_sort
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
#
# @!attribute [rw] zip_code
#   @return [String, nil]
UsAutocompletion = Struct.new(
  :address_prefix,
  :city,
  :geo_ip_sort,
  :id,
  :object,
  :state,
  :suggestions,
  :zip_code,
  keyword_init: true
)

# Request payload for UsAutocompletion#create.
#
# @!attribute [rw] case
#   @return [String, nil]
#
# @!attribute [rw] valid_address
#   @return [Boolean, nil]
#
# @!attribute [rw] address_prefix
#   @return [String]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] geo_ip_sort
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] suggestions
#   @return [Array, nil]
#
# @!attribute [rw] zip_code
#   @return [String, nil]
UsAutocompletionCreateData = Struct.new(
  :case,
  :valid_address,
  :address_prefix,
  :city,
  :geo_ip_sort,
  :id,
  :object,
  :state,
  :suggestions,
  :zip_code,
  keyword_init: true
)

# UsVerification entity data model.
#
# @!attribute [rw] addresses
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Hash]
#
# @!attribute [rw] deliverability
#   @return [String, nil]
#
# @!attribute [rw] deliverability_analysis
#   @return [Hash]
#
# @!attribute [rw] errors
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] lob_confidence_score
#   @return [Hash]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] urbanization
#   @return [String, nil]
#
# @!attribute [rw] valid_address
#   @return [Boolean, nil]
UsVerification = Struct.new(
  :addresses,
  :components,
  :deliverability,
  :deliverability_analysis,
  :errors,
  :id,
  :last_line,
  :lob_confidence_score,
  :object,
  :primary_line,
  :recipient,
  :secondary_line,
  :urbanization,
  :valid_address,
  keyword_init: true
)

# Request payload for UsVerification#create.
#
# @!attribute [rw] case
#   @return [String, nil]
#
# @!attribute [rw] addresses
#   @return [Array]
#
# @!attribute [rw] components
#   @return [Hash]
#
# @!attribute [rw] deliverability
#   @return [String, nil]
#
# @!attribute [rw] deliverability_analysis
#   @return [Hash]
#
# @!attribute [rw] errors
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_line
#   @return [String, nil]
#
# @!attribute [rw] lob_confidence_score
#   @return [Hash]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] primary_line
#   @return [String, nil]
#
# @!attribute [rw] recipient
#   @return [String, nil]
#
# @!attribute [rw] secondary_line
#   @return [String, nil]
#
# @!attribute [rw] urbanization
#   @return [String, nil]
#
# @!attribute [rw] valid_address
#   @return [Boolean, nil]
UsVerificationCreateData = Struct.new(
  :case,
  :addresses,
  :components,
  :deliverability,
  :deliverability_analysis,
  :errors,
  :id,
  :last_line,
  :lob_confidence_score,
  :object,
  :primary_line,
  :recipient,
  :secondary_line,
  :urbanization,
  :valid_address,
  keyword_init: true
)

# Zip entity data model.
#
# @!attribute [rw] zip_code
#   @return [String]
Zip = Struct.new(
  :zip_code,
  keyword_init: true
)

# Request payload for Zip#create.
#
# @!attribute [rw] zip_code
#   @return [String]
ZipCreateData = Struct.new(
  :zip_code,
  keyword_init: true
)

