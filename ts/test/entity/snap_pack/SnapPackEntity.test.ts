

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LobSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SnapPackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.SnapPack()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'snap_pack.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"campaign_id":{"a":true,"h":"Campaign Id","n":"campaign_id","r":false,"sh":"Denotes resources created by the provided campaign id, prefixed with `cmp_`.","t":"`$STRING`","key$":"campaign_id","index$":0},"carrier":{"a":true,"h":"Carrier","n":"carrier","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"carrier","index$":1},"color":{"a":true,"h":"Color","n":"color","r":false,"sh":"Set this key to `true` if you would like to print in color.","t":"`$BOOLEAN`","key$":"color","index$":2},"count":{"a":true,"h":"Count","n":"count","r":false,"sh":"number of resources in a set","t":"`$INTEGER`","key$":"count","index$":3},"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"list of snap_packs","t":"`$ARRAY`","union":{"branches":2,"count":5,"depth":9},"key$":"data","index$":4},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","r":false,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":5},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","r":false,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":6},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Only returned if the resource has been successfully deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":7},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":8},"expected_delivery_date":{"a":true,"fo":"date","h":"Expected Delivery Date","n":"expected_delivery_date","r":false,"sh":"A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.","t":"`$STRING`","key$":"expected_delivery_date","index$":9},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"t":"`$OBJECT`","key$":"failure_reason","index$":10},"from":{"a":true,"h":"From","n":"from","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":2},"key$":"from","index$":11},"fsc":{"a":true,"h":"Fsc","n":"fsc","r":false,"sh":"Contact support@lob.com or your account contact to learn more.","t":"`$BOOLEAN`","key$":"fsc","index$":12},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `ord_`.","t":"`$STRING`","key$":"id","index$":13},"inside_template_id":{"a":true,"h":"Inside Template Id","n":"inside_template_id","r":false,"sh":"The unique ID of the HTML template used for the inside of the snap pack.","t":"`$STRING`","key$":"inside_template_id","index$":14},"inside_template_version_id":{"a":true,"h":"Inside Template Version Id","n":"inside_template_version_id","r":false,"sh":"The unique ID of the specific version of the HTML template used for the inside of the snap pack.","t":"`$STRING`","key$":"inside_template_version_id","index$":15},"mail_type":{"a":true,"h":"Mail Type","n":"mail_type","r":false,"t":"`$STRING`","key$":"mail_type","index$":16},"merge_variables":{"a":true,"h":"Merge Variables","n":"merge_variables","r":false,"t":"`$OBJECT`","key$":"merge_variables","index$":17},"next_url":{"a":true,"h":"Next Url","n":"next_url","r":false,"sh":"Url of next page of items in list.","t":"`$STRING`","key$":"next_url","index$":18},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":19},"outside_template_id":{"a":true,"h":"Outside Template Id","n":"outside_template_id","r":false,"sh":"The unique ID of the HTML template used for the outside of the snap pack.","t":"`$STRING`","key$":"outside_template_id","index$":20},"outside_template_version_id":{"a":true,"h":"Outside Template Version Id","n":"outside_template_version_id","r":false,"sh":"The unique ID of the specific version of the HTML template used for the outside of the snap pack.","t":"`$STRING`","key$":"outside_template_version_id","index$":21},"previous_url":{"a":true,"h":"Previous Url","n":"previous_url","r":false,"sh":"Url of previous page of items in list.","t":"`$STRING`","key$":"previous_url","index$":22},"send_date":{"a":true,"h":"Send Date","n":"send_date","r":false,"t":"`$STRING`","key$":"send_date","index$":23},"size":{"a":true,"h":"Size","n":"size","r":false,"t":"`$STRING`","key$":"size","index$":24},"sla":{"a":true,"h":"Sla","n":"sla","r":false,"t":"`$STRING`","key$":"sla","index$":25},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"A string describing the PDF render status: * `processed` - the rendering process is currently in progress.","t":"`$STRING`","key$":"status","index$":26},"thumbnails":{"a":true,"h":"Thumbnails","n":"thumbnails","r":false,"t":"`$ARRAY`","key$":"thumbnails","index$":27},"to":{"a":true,"h":"To","n":"to","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$ANY`","union":{"branches":2,"count":3,"depth":4},"key$":"to","index$":28},"total_count":{"a":true,"h":"Total Count","n":"total_count","r":false,"sh":"Indicates the total number of records.","t":"`$INTEGER`","key$":"total_count","index$":29},"tracking_events":{"a":true,"h":"Tracking Events","n":"tracking_events","r":false,"sh":"An array of tracking events ordered by ascending `time`.","t":"`$ARRAY`","key$":"tracking_events","index$":30},"url":{"a":true,"h":"Url","n":"url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A [signed link](#section/Asset-URLs) served over HTTPS.","t":"`$STRING`","key$":"url","index$":31},"use_type":{"a":true,"h":"Use Type","n":"use_type","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The use type for each mailpiece.","t":"`$STRING`","key$":"use_type","index$":32}},"id":{"field":"id","name":"id"},"name":"snap_pack","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /snap_packs","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"026e7634-24d7-486c-a0bb-4a17fd0eebc5","k":"header","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"026e7634-24d7-486c-a0bb-4a17fd0eebc5","k":"query","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/snap_packs","q":{"exist":["idempotency_key"]},"r":{},"s":[{"lit":"snap_packs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /snap_packs","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"campaign_id","or":"campaign_id","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"date_created","or":"date_created","r":false,"t":"`$OBJECT`","index$":2},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":"usps_first_class","k":"query","n":"mail_type","or":"mail_type","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"metadata","or":"metadata","r":false,"t":"`$OBJECT`","index$":6},{"a":true,"k":"query","n":"send_date","or":"send_date","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$ANY`","index$":8},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/snap_packs","q":{"exist":["before/after","campaign_id","date_created","include","limit","mail_type","metadata","send_date","sort_by","status"]},"r":{},"s":[{"lit":"snap_packs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /snap_packs/{snap_pack_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"snap_pack_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/snap_packs/{snap_pack_id}","q":{"exist":["id"]},"r":{"param":{"snap_pack_id":"id"}},"s":[{"lit":"snap_packs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /snap_packs/{snap_pack_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"snap_pack_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/snap_packs/{snap_pack_id}","q":{"exist":["id"]},"r":{"param":{"snap_pack_id":"id"}},"s":[{"lit":"snap_packs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"snap_pack","name__orig":"snap_pack","Name":"SnapPack","name_":"snap_pack","name-":"snap-pack","NAME":"SNAP_PACK","index$":24}, {"active":true,"entity":"snap_pack","key$":"BasicSnapPackFlow","kind":"basic","name":"BasicSnapPackFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"snap_pack_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"snap_pack_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"snap_pack_ref01","srcdatavar":"snap_pack_ref01_data","suffix":"_dt0"},"m":{"id":"snap_pack01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-snap_pack_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"snap_pack_ref01","suffix":"_rm0"},"m":{"id":"snap_pack01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"snap_pack_ref01"}}],"index$":4}]}, 'SnapPack', {"POST /snap_packs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"allOf":[{"properties":{"description":{},"mail_type":{},"merge_variables":{},"metadata":{},"print_speed":{},"send_date":{}},"type":"object","x-ref":"#/components/schemas/editable"},{"properties":{"size":{}},"type":"object"}],"x-ref":"#/components/schemas/snap_pack_base"},{"type":"object","properties":{"to":{"description":"Must either be an address ID or an inline object with correct address parameters. If an object is used, an address will be created, corrected, and standardized for free whenever possible using our US Address Verification engine (if it is a US address), and returned back with an ID. Depending on your <a href=\"https://dashboard.lob.com/#/settings/editions\" target=\"_blank\">Print & Mail Edition</a>, US addresses may also be run through <a href=\"#tag/National-Change-of-Address\">National Change of Address Linkage(NCOALink)</a>. Non-US addresses will be standardized into uppercase only. If a US address used does not meet your account’s <a href=\"https://dashboard.lob.com/#/settings/account\" target=\"_blank\">US Mail strictness setting</a>, the request will fail. <a href=\"https://help.lob.com/print-and-mail/all-about-addresses\" target=\"_blank\">Lob Guide: Verification of Mailing Addresses</a>","oneOf":[{},{}]}},"x-ref":"#/components/schemas/input_to"},{"type":"object","properties":{"from":{"description":"*Required* if `to` address is international. Must either be an address ID or an inline object with correct address parameters. Must either be an address ID or an inline object with correct address parameters. All addresses will be standardized into uppercase without being modified by verification.","oneOf":[{},{}]}},"x-ref":"#/components/schemas/input_from_us"},{"type":"object","required":["to","inside","outside","use_type"],"properties":{"inside":{"description":"The artwork to use as the inside of your snap pack.\n\nNotes:\n- HTML merge variables should not include delimiting whitespace.\n- PDF, PNG, and JPGs must be sized at 8.5\"x11\" at 300 DPI, while supplied HTML will be rendered to the specified `size`.\n- Be sure to leave room for address and postage information by following the template provided here:\n  - <a href=\"https://s3.us-west-2.amazonaws.com/public.lob.com/assets/8.5x11_Snappack_template_address.pdf\" target=\"_blank\">8.5x11 snap pack template</a>\n\n\nSee [here](#section/HTML-Examples) for HTML examples.\n","oneOf":[{},{},{},{}]},"outside":{"description":"The artwork to use as the outside of your snap pack.\n\nNotes:\n- HTML merge variables should not include delimiting whitespace.\n- PDF, PNG, and JPGs must be sized at 6\"x18\" at 300 DPI, while supplied HTML will be rendered to the specified `size`.\n\nSee [here](#section/HTML-Examples) for HTML examples.\n","oneOf":[{},{},{},{}]},"billing_group_id":{"type":"string","description":"An optional string with the billing group ID to tag your usage with. Is used for billing purposes. Requires special activation to use. See <a href=\"#tag/Billing-Groups\">Billing Group API</a> for more information.","x-ref":"#/components/schemas/billing_group_id"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","type":"string","enum":["marketing","operational",null],"nullable":true,"x-ref":"#/components/schemas/snap_pack_use_type"},"color":{"allOf":[{},{}]},"qr_code":{"type":"object","description":"Customize and place a QR code on the creative at the required position.","required":["position","redirect_url","width"],"properties":{"position":{},"top":{},"right":{},"left":{},"bottom":{},"redirect_url":{},"width":{},"pages":{},"logo":{},"style":{}},"x-ref":"#/components/schemas/qr_code"},"print_speed":{"type":"string","enum":["core"],"description":"A string designating the mail speed type:\n* `core` - 2 production business days\n","default":"core","nullable":true,"x-ref":"#/components/schemas/print_speed"}}}],"x-ref":"#/components/schemas/snap_pack_editable","index$":1},"example":{"description":"Demo Snap Pack Job","to":"adr_bae820679f3f536b","from":"adr_210a8d4b0b76d77b","inside":"https://lob.com/snappackinside.pdf","outside":"https://lob.com/snappackoutside.pdf","size":"8.5x11","metadata":{"spiffy":"true"},"mail_type":"usps_standard","merge_variables":{"name":"Harry"},"send_date":"2017-11-01T00:00:00.000Z","use_type":"marketing","print_speed":"core"}},"multipart/form-data":{"schema":{"allOf":[{"allOf":[{"properties":{"description":{},"mail_type":{},"merge_variables":{},"metadata":{},"print_speed":{},"send_date":{}},"type":"object","x-ref":"#/components/schemas/editable"},{"properties":{"size":{}},"type":"object"}],"x-ref":"#/components/schemas/snap_pack_base"},{"type":"object","properties":{"to":{"description":"Must either be an address ID or an inline object with correct address parameters. If an object is used, an address will be created, corrected, and standardized for free whenever possible using our US Address Verification engine (if it is a US address), and returned back with an ID. Depending on your <a href=\"https://dashboard.lob.com/#/settings/editions\" target=\"_blank\">Print & Mail Edition</a>, US addresses may also be run through <a href=\"#tag/National-Change-of-Address\">National Change of Address Linkage(NCOALink)</a>. Non-US addresses will be standardized into uppercase only. If a US address used does not meet your account’s <a href=\"https://dashboard.lob.com/#/settings/account\" target=\"_blank\">US Mail strictness setting</a>, the request will fail. <a href=\"https://help.lob.com/print-and-mail/all-about-addresses\" target=\"_blank\">Lob Guide: Verification of Mailing Addresses</a>","oneOf":[{},{}]}},"x-ref":"#/components/schemas/input_to"},{"type":"object","properties":{"from":{"description":"*Required* if `to` address is international. Must either be an address ID or an inline object with correct address parameters. Must either be an address ID or an inline object with correct address parameters. All addresses will be standardized into uppercase without being modified by verification.","oneOf":[{},{}]}},"x-ref":"#/components/schemas/input_from_us"},{"type":"object","required":["to","inside","outside","use_type"],"properties":{"inside":{"description":"The artwork to use as the inside of your snap pack.\n\nNotes:\n- HTML merge variables should not include delimiting whitespace.\n- PDF, PNG, and JPGs must be sized at 8.5\"x11\" at 300 DPI, while supplied HTML will be rendered to the specified `size`.\n- Be sure to leave room for address and postage information by following the template provided here:\n  - <a href=\"https://s3.us-west-2.amazonaws.com/public.lob.com/assets/8.5x11_Snappack_template_address.pdf\" target=\"_blank\">8.5x11 snap pack template</a>\n\n\nSee [here](#section/HTML-Examples) for HTML examples.\n","oneOf":[{},{},{},{}]},"outside":{"description":"The artwork to use as the outside of your snap pack.\n\nNotes:\n- HTML merge variables should not include delimiting whitespace.\n- PDF, PNG, and JPGs must be sized at 6\"x18\" at 300 DPI, while supplied HTML will be rendered to the specified `size`.\n\nSee [here](#section/HTML-Examples) for HTML examples.\n","oneOf":[{},{},{},{}]},"billing_group_id":{"type":"string","description":"An optional string with the billing group ID to tag your usage with. Is used for billing purposes. Requires special activation to use. See <a href=\"#tag/Billing-Groups\">Billing Group API</a> for more information.","x-ref":"#/components/schemas/billing_group_id"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","type":"string","enum":["marketing","operational",null],"nullable":true,"x-ref":"#/components/schemas/snap_pack_use_type"},"color":{"allOf":[{},{}]},"qr_code":{"type":"object","description":"Customize and place a QR code on the creative at the required position.","required":["position","redirect_url","width"],"properties":{"position":{},"top":{},"right":{},"left":{},"bottom":{},"redirect_url":{},"width":{},"pages":{},"logo":{},"style":{}},"x-ref":"#/components/schemas/qr_code"},"print_speed":{"type":"string","enum":["core"],"description":"A string designating the mail speed type:\n* `core` - 2 production business days\n","default":"core","nullable":true,"x-ref":"#/components/schemas/print_speed"}}}],"x-ref":"#/components/schemas/snap_pack_editable"},"example":{"description":"Demo Snap Pack job","to":"adr_bae820679f3f536b","from":"adr_210a8d4b0b76d77b","inside":"https://lob.com/snappackinside.pdf","outside":"https://lob.com/snappackoutside.pdf","size":"8.5x11","metadata":{"spiffy":"true"},"mail_type":"usps_standard","merge_variables":{"name":"Harry"},"send_date":"2017-11-01T00:00:00.000Z","use_type":"marketing","print_speed":"core"}}}},"parameters":[{"in":"header","name":"Idempotency-Key","required":false,"description":"A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings#idempotent-requests-12\" target=\"_blank\">implementation guide</a>.\n","schema":{"type":"string","maxLength":256,"example":"026e7634-24d7-486c-a0bb-4a17fd0eebc5"},"x-ref":"#/components/parameters/idem-header","index$":0},{"in":"query","name":"idempotency_key","required":false,"description":"A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings#idempotent-requests-12\" target=\"_blank\">implementation guide</a>.\n","schema":{"type":"string","maxLength":256,"example":"026e7634-24d7-486c-a0bb-4a17fd0eebc5"},"x-ref":"#/components/parameters/idem-query","index$":1}]},"GET /snap_packs":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":1},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":2},{"in":"query","name":"date_created","description":"Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","x-ref":"#/components/schemas/date_filter"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/date_created","index$":3},{"in":"query","name":"metadata","description":"Filter by metadata key-value pair`.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/metadata","index$":4},{"in":"query","name":"send_date","description":"Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.\n","schema":{"type":"string","description":"A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. Setting a send date overrides the default [cancellation window](#section/Cancellation-Windows) applied to the mailpiece. Until the `send_date` has passed, the mailpiece can be canceled. If a date in the format `2017-11-01` is passed, it will evaluate to midnight UTC of that date (`2017-11-01T00:00:00.000Z`). If a datetime is passed, that exact time will be used. A `send_date` passed with no time zone will default to UTC, while a `send_date` passed with a time zone will be converted to UTC.","anyOf":[{"format":"date-time"},{"format":"date"}],"x-ref":"#/components/schemas/send_date"},"x-ref":"#/components/parameters/send_date","index$":5},{"in":"query","name":"mail_type","description":"A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is less predictable and takes longer to deliver. `usps_standard` cannot be used with `4x6` postcards or for any postcards sent outside of the United States.\n","schema":{"type":"string","enum":["usps_first_class","usps_standard"],"description":"A string designating the mail postage type:\n* `usps_first_class` - (default)\n* `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is\nless predictable and takes longer to deliver. `usps_standard` cannot be used with `4x6`\npostcards or for any postcards sent outside of the United States.\n","default":"usps_first_class","x-ref":"#/components/schemas/mail_type"},"x-ref":"#/components/parameters/mail_type","index$":6},{"in":"query","name":"sort_by","description":"Sorts items by ascending or descending dates. Use either `date_created` or `send_date`, not both.\n","schema":{"allOf":[{"type":"object","properties":{"date_created":{"type":"string","enum":["asc","desc"]},"send_date":{"type":"string","enum":["asc","desc"]}}},{"oneOf":[{"required":["date_created"]},{"required":["send_date"]}]}]},"x-ref":"#/components/parameters/sort_by","index$":7},{"in":"query","name":"campaign_id","required":false,"description":"Filters resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.","schema":{"title":"campaign_id","description":"Denotes resources created by the provided campaign id, prefixed with `cmp_`. In the case of snap packs, booklets, and letters with size `us_legal`, however, the campaign id is prefixed with `camp_` instead of `cmp_`.","type":"string","pattern":"^(cmp|camp)_[a-zA-Z0-9]+$","nullable":true,"x-ref":"#/components/schemas/campaign_id"},"x-ref":"#/components/parameters/campaign_id","index$":8},{"in":"query","name":"status","description":"A string describing the render status:\n* `processed` - the rendering process is currently underway.\n* `rendered` - the rendering process has completed successfully.\n* `failed` - the rendering process has failed.\n","schema":{"type":"string","enum":["processed","rendered","failed"],"description":"A string describing the PDF render status:\n* `processed` - the rendering process is currently in progress.\n* `rendered` - a PDF has been successfully rendered of the mailpiece.\n* `failed` - one or more issues has caused the rendering process to fail.\n","x-ref":"#/components/schemas/status"},"x-ref":"#/components/parameters/status","index$":9}]},"GET /snap_packs/{snap_pack_id}":{"protocol":"http","parameters":[{"in":"path","name":"snap_pack_id","description":"id of the snap_pack","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `ord_`.","pattern":"^ord_[0-9a-f]{26}$","x-ref":"#/components/schemas/snap_pack_id"},"index$":0}]},"DELETE /snap_packs/{snap_pack_id}":{"protocol":"http","parameters":[{"in":"path","name":"snap_pack_id","description":"id of the snap_pack","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `ord_`.","pattern":"^ord_[0-9a-f]{26}$","x-ref":"#/components/schemas/snap_pack_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const snap_pack_ref01_ent = client.SnapPack()
    let snap_pack_ref01_data = setup.data.new.snap_pack['snap_pack_ref01']

    snap_pack_ref01_data = (await snap_pack_ref01_ent.create(snap_pack_ref01_data)).data()
    assert(null != snap_pack_ref01_data.id)


    // LIST
    const snap_pack_ref01_match: any = {}

    const snap_pack_ref01_list = (await snap_pack_ref01_ent.list(snap_pack_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(snap_pack_ref01_list, { id: snap_pack_ref01_data.id })))


    // LOAD
    const snap_pack_ref01_match_dt0: any = {}
    snap_pack_ref01_match_dt0.id = snap_pack_ref01_data.id
    const snap_pack_ref01_data_dt0 = (await snap_pack_ref01_ent.load(snap_pack_ref01_match_dt0)).data()
    assert(snap_pack_ref01_data_dt0.id === snap_pack_ref01_data.id)


    // REMOVE
    const snap_pack_ref01_match_rm0: any = { id: snap_pack_ref01_data.id }
    await snap_pack_ref01_ent.remove(snap_pack_ref01_match_rm0)
  

    // LIST
    const snap_pack_ref01_match_rt0: any = {}

    const snap_pack_ref01_list_rt0 = (await snap_pack_ref01_ent.list(snap_pack_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(snap_pack_ref01_list_rt0, { id: snap_pack_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/snap_pack/SnapPackTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LobSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['snap_pack01','snap_pack02','snap_pack03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_SNAP_PACK_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_SNAP_PACK_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_SNAP_PACK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LobSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LOB_APIKEY,
        secret: env.LOB_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LOB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
