

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


describe('CheckEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Check()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'check.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"fo":"float","h":"Amount","n":"amount","op":{"create":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"The payment amount to be sent in US dollars.","t":"`$NUMBER`","key$":"amount","index$":0},"attachment_template_id":{"a":true,"h":"Attachment Template Id","n":"attachment_template_id","r":false,"t":"`$STRING`","key$":"attachment_template_id","index$":1},"attachment_template_version_id":{"a":true,"h":"Attachment Template Version Id","n":"attachment_template_version_id","r":false,"t":"`$STRING`","key$":"attachment_template_version_id","index$":2},"bank_account":{"a":true,"h":"Bank Account","n":"bank_account","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$ANY`","key$":"bank_account","index$":3},"carrier":{"a":true,"h":"Carrier","n":"carrier","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"carrier","index$":4},"check_bottom_template_id":{"a":true,"h":"Check Bottom Template Id","n":"check_bottom_template_id","r":false,"t":"`$STRING`","key$":"check_bottom_template_id","index$":5},"check_bottom_template_version_id":{"a":true,"h":"Check Bottom Template Version Id","n":"check_bottom_template_version_id","r":false,"t":"`$STRING`","key$":"check_bottom_template_version_id","index$":6},"check_number":{"a":true,"h":"Check Number","n":"check_number","r":false,"t":"`$INTEGER`","key$":"check_number","index$":7},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":8},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":9},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Only returned if the resource has been successfully deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":10},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":11},"expected_delivery_date":{"a":true,"fo":"date","h":"Expected Delivery Date","n":"expected_delivery_date","r":false,"sh":"A date in YYYY-MM-DD format of the mailpiece's expected delivery date based on its `send_date`.","t":"`$STRING`","key$":"expected_delivery_date","index$":12},"failure_reason":{"a":true,"h":"Failure Reason","n":"failure_reason","r":false,"t":"`$OBJECT`","key$":"failure_reason","index$":13},"from":{"a":true,"h":"From","n":"from","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":2},"key$":"from","index$":14},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `chk_`.","t":"`$STRING`","key$":"id","index$":15},"mail_type":{"a":true,"h":"Mail Type","n":"mail_type","r":false,"t":"`$STRING`","key$":"mail_type","index$":16},"memo":{"a":true,"h":"Memo","n":"memo","r":false,"t":"`$STRING`","key$":"memo","index$":17},"merge_variables":{"a":true,"h":"Merge Variables","n":"merge_variables","r":false,"t":"`$OBJECT`","key$":"merge_variables","index$":18},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":19},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":20},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":21},"send_date":{"a":true,"h":"Send Date","n":"send_date","r":false,"t":"`$STRING`","key$":"send_date","index$":22},"sla":{"a":true,"h":"Sla","n":"sla","r":false,"t":"`$STRING`","key$":"sla","index$":23},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"A string describing the PDF render status: * `processed` - the rendering process is currently in progress.","t":"`$STRING`","key$":"status","index$":24},"thumbnails":{"a":true,"h":"Thumbnails","n":"thumbnails","r":false,"t":"`$ARRAY`","key$":"thumbnails","index$":25},"to":{"a":true,"h":"To","n":"to","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":2},"key$":"to","index$":26},"tracking_events":{"a":true,"h":"Tracking Events","n":"tracking_events","r":false,"sh":"An array of tracking_event objects ordered by ascending `time`.","t":"`$ARRAY`","key$":"tracking_events","index$":27},"url":{"a":true,"h":"Url","n":"url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A [signed link](#section/Asset-URLs) served over HTTPS.","t":"`$STRING`","key$":"url","index$":28},"use_type":{"a":true,"h":"Use Type","n":"use_type","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"TThe use type for each mailpiece.","t":"`$STRING`","key$":"use_type","index$":29}},"id":{"field":"id","name":"id"},"name":"check","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /checks","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"026e7634-24d7-486c-a0bb-4a17fd0eebc5","k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"026e7634-24d7-486c-a0bb-4a17fd0eebc5","k":"query","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/checks","q":{"exist":["idempotency_key"]},"r":{},"s":[{"lit":"checks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /checks","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"date_created","or":"date_created","r":false,"t":"`$OBJECT`","index$":1},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"usps_first_class","k":"query","n":"mail_type","or":"mail_type","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"metadata","or":"metadata","r":false,"t":"`$OBJECT`","index$":5},{"a":true,"k":"query","n":"scheduled","or":"scheduled","r":false,"t":"`$BOOLEAN`","index$":6},{"a":true,"k":"query","n":"send_date","or":"send_date","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$ANY`","index$":8},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/checks","q":{"exist":["before/after","date_created","include","limit","mail_type","metadata","scheduled","send_date","sort_by","status"]},"r":{},"s":[{"lit":"checks"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /checks/{chk_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"chk_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/checks/{chk_id}","q":{"exist":["id"]},"r":{"param":{"chk_id":"id"}},"s":[{"lit":"checks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /checks/{chk_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"chk_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/checks/{chk_id}","q":{"exist":["id"]},"r":{"param":{"chk_id":"id"}},"s":[{"lit":"checks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"check","name__orig":"check","Name":"Check","name_":"check","name-":"check","NAME":"CHECK","index$":10}, {"active":true,"entity":"check","key$":"BasicCheckFlow","kind":"basic","name":"BasicCheckFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"check_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"check_ref01","srcdatavar":"check_ref01_data","suffix":"_dt0"},"m":{"id":"check01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"check_ref01","suffix":"_rm0"},"m":{"id":"check01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"check_ref01"}}],"index$":4}]}, 'Check', {"POST /checks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"title":"words at check bottom","allOf":[{"required":["message"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]},{"title":"image at check bottom","allOf":[{"required":["check_bottom"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]}],"x-ref":"#/components/schemas/check_editable","index$":1},"example":{"description":"Demo Check","to":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"},"from":{"name":"Leore Avidar","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107-1741"},"bank_account":"bank_8cad8df5354d33f","amount":22.5,"memo":"rent","logo":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png","check_bottom":"tmpl_23668b406d5afef","merge_variables":{"name":"Harry"},"metadata":{"memo":"rafting trip"},"attachment":"./cool.pdf","send_date":"2017-11-01T00:00:00.000Z","use_type":"operational","mail_type":"usps_first_class","check_number":10001,"print_speed":"core"}},"application/x-www-form-urlencoded":{"schema":{"oneOf":[{"title":"words at check bottom","allOf":[{"required":["message"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]},{"title":"image at check bottom","allOf":[{"required":["check_bottom"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]}],"x-ref":"#/components/schemas/check_editable"},"example":{"description":"Demo Check","to":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"},"from":{"name":"Leore Avidar","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107-1741"},"bank_account":"bank_8cad8df5354d33f","amount":22.5,"memo":"rent","logo":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png","check_bottom":"tmpl_23668b406d5afef","merge_variables":{"name":"Harry"},"metadata":{"memo":"rafting trip"},"attachment":"./cool.pdf","send_date":"2017-11-01T00:00:00.000Z","mail_type":"usps_first_class","check_number":10001,"print_speed":"core"},"encoding":{"to":{"style":"deepObject","explode":true},"from":{"style":"deepObject","explode":true},"merge_variables":{"style":"deepObject","explode":true},"metadata":{"style":"deepObject","explode":true}}},"multipart/form-data":{"schema":{"oneOf":[{"title":"words at check bottom","allOf":[{"required":["message"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]},{"title":"image at check bottom","allOf":[{"required":["check_bottom"]},{"allOf":[{},{},{}],"x-ref":"#/components/schemas/check_editable_props"}]}],"x-ref":"#/components/schemas/check_editable"},"example":{"description":"Demo Check","to":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"},"from":{"name":"Leore Avidar","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107-1741"},"bank_account":"bank_8cad8df5354d33f","amount":22.5,"memo":"rent","logo":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/check_logo.png","check_bottom":"tmpl_23668b406d5afef","merge_variables":{"name":"Harry"},"metadata":{"memo":"rafting trip"},"attachment":"./cool.pdf","send_date":"2017-11-01T00:00:00.000Z","use_type":"operational","mail_type":"usps_first_class","check_number":10001,"print_speed":"core"},"encoding":{"logo":{"contentType":"image/png, image/jpeg"}}}}},"parameters":[{"in":"header","name":"Idempotency-Key","required":false,"description":"A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings#idempotent-requests-12\" target=\"_blank\">implementation guide</a>.\n","schema":{"type":"string","maxLength":256,"example":"026e7634-24d7-486c-a0bb-4a17fd0eebc5"},"x-ref":"#/components/parameters/idem-header","index$":0},{"in":"query","name":"idempotency_key","required":false,"description":"A string of no longer than 256 characters that uniquely identifies this resource. For more help integrating idempotency keys, refer to our <a href=\"https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings#idempotent-requests-12\" target=\"_blank\">implementation guide</a>.\n","schema":{"type":"string","maxLength":256,"example":"026e7634-24d7-486c-a0bb-4a17fd0eebc5"},"x-ref":"#/components/parameters/idem-query","index$":1}]},"GET /checks":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":1},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":2},{"in":"query","name":"date_created","description":"Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","x-ref":"#/components/schemas/date_filter"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/date_created","index$":3},{"in":"query","name":"metadata","description":"Filter by metadata key-value pair`.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/metadata","index$":4},{"in":"query","name":"scheduled","description":"* `true` - only return orders (past or future) where `send_date` is\ngreater than `date_created`\n* `false` - only return orders where `send_date` is equal to `date_created`\n","schema":{"type":"boolean"},"x-ref":"#/components/parameters/scheduled","index$":5},{"in":"query","name":"send_date","description":"Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.\n","schema":{"type":"string","description":"A timestamp in ISO 8601 format which specifies a date after the current time and up to 180 days in the future to send the letter off for production. Setting a send date overrides the default [cancellation window](#section/Cancellation-Windows) applied to the mailpiece. Until the `send_date` has passed, the mailpiece can be canceled. If a date in the format `2017-11-01` is passed, it will evaluate to midnight UTC of that date (`2017-11-01T00:00:00.000Z`). If a datetime is passed, that exact time will be used. A `send_date` passed with no time zone will default to UTC, while a `send_date` passed with a time zone will be converted to UTC.","anyOf":[{"format":"date-time"},{"format":"date"}],"x-ref":"#/components/schemas/send_date"},"x-ref":"#/components/parameters/send_date","index$":6},{"in":"query","name":"mail_type","description":"A string designating the mail postage type: * `usps_first_class` - (default) * `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is less predictable and takes longer to deliver. `usps_standard` cannot be used with `4x6` postcards or for any postcards sent outside of the United States.\n","schema":{"type":"string","enum":["usps_first_class","usps_standard"],"description":"A string designating the mail postage type:\n* `usps_first_class` - (default)\n* `usps_standard` - a <a href=\"https://lob.com/pricing/print-mail#compare\" target=\"_blank\">cheaper option</a> which is\nless predictable and takes longer to deliver. `usps_standard` cannot be used with `4x6`\npostcards or for any postcards sent outside of the United States.\n","default":"usps_first_class","x-ref":"#/components/schemas/mail_type"},"x-ref":"#/components/parameters/mail_type","index$":7},{"in":"query","name":"sort_by","description":"Sorts items by ascending or descending dates. Use either `date_created` or `send_date`, not both.\n","schema":{"allOf":[{"type":"object","properties":{"date_created":{"type":"string","enum":["asc","desc"]},"send_date":{"type":"string","enum":["asc","desc"]}}},{"oneOf":[{"required":["date_created"]},{"required":["send_date"]}]}]},"x-ref":"#/components/parameters/sort_by","index$":8},{"in":"query","name":"status","description":"A string describing the render status:\n* `processed` - the rendering process is currently underway.\n* `rendered` - the rendering process has completed successfully.\n* `failed` - the rendering process has failed.\n","schema":{"type":"string","enum":["processed","rendered","failed"],"description":"A string describing the PDF render status:\n* `processed` - the rendering process is currently in progress.\n* `rendered` - a PDF has been successfully rendered of the mailpiece.\n* `failed` - one or more issues has caused the rendering process to fail.\n","x-ref":"#/components/schemas/status"},"x-ref":"#/components/parameters/status","index$":9}]},"GET /checks/{chk_id}":{"protocol":"http","parameters":[{"in":"path","name":"chk_id","description":"id of the check","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `chk_`.","pattern":"^chk_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/chk_id"},"index$":0}]},"DELETE /checks/{chk_id}":{"protocol":"http","parameters":[{"in":"path","name":"chk_id","description":"id of the check","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `chk_`.","pattern":"^chk_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/chk_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const check_ref01_ent = client.Check()
    let check_ref01_data = setup.data.new.check['check_ref01']

    check_ref01_data = (await check_ref01_ent.create(check_ref01_data)).data()
    assert(null != check_ref01_data.id)


    // LIST
    const check_ref01_match: any = {}

    const check_ref01_list = (await check_ref01_ent.list(check_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(check_ref01_list, { id: check_ref01_data.id })))


    // LOAD
    const check_ref01_match_dt0: any = {}
    check_ref01_match_dt0.id = check_ref01_data.id
    const check_ref01_data_dt0 = (await check_ref01_ent.load(check_ref01_match_dt0)).data()
    assert(check_ref01_data_dt0.id === check_ref01_data.id)


    // REMOVE
    const check_ref01_match_rm0: any = { id: check_ref01_data.id }
    await check_ref01_ent.remove(check_ref01_match_rm0)
  

    // LIST
    const check_ref01_match_rt0: any = {}

    const check_ref01_list_rt0 = (await check_ref01_ent.list(check_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(check_ref01_list_rt0, { id: check_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/check/CheckTestData.json')

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
    ['check01','check02','check03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_CHECK_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_CHECK_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_CHECK_ENTID']
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
  
