

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


describe('BuckslipEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Buckslip()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'buckslip.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","r":false,"t":"`$STRING`","key$":"account_id","index$":0},"allocated_quantity":{"a":true,"h":"Allocated Quantity","n":"allocated_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The allocated quantity of buckslips.","t":"`$NUMBER`","key$":"allocated_quantity","index$":1},"auto_reorder":{"a":true,"h":"Auto Reorder","n":"auto_reorder","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"True if the buckslips should be auto-reordered.","t":"`$BOOLEAN`","key$":"auto_reorder","index$":2},"available_quantity":{"a":true,"h":"Available Quantity","n":"available_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The available quantity of buckslips.","t":"`$NUMBER`","key$":"available_quantity","index$":3},"back_original_url":{"a":true,"fo":"uri","h":"Back Original Url","n":"back_original_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The original URL of the back template.","t":"`$STRING`","key$":"back_original_url","index$":4},"buckslip_orders":{"a":true,"h":"Buckslip Orders","n":"buckslip_orders","op":{"create":{"req":false,"type":"`$ARRAY`"}},"r":true,"sh":"An array of buckslip orders that are associated with the buckslip.","t":"`$ARRAY`","key$":"buckslip_orders","index$":5},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":6},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":7},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Only returned if the resource has been successfully deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":8},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the buckslip.","t":"`$STRING`","key$":"description","index$":9},"finish":{"a":true,"h":"Finish","n":"finish","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"finish","index$":10},"front_original_url":{"a":true,"fo":"uri","h":"Front Original Url","n":"front_original_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The original URL of the front template.","t":"`$STRING`","key$":"front_original_url","index$":11},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `bck_`.","t":"`$STRING`","key$":"id","index$":12},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":13},"object":{"a":true,"h":"Object","n":"object","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":14},"onhand_quantity":{"a":true,"h":"Onhand Quantity","n":"onhand_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The onhand quantity of buckslips.","t":"`$NUMBER`","key$":"onhand_quantity","index$":15},"pending_quantity":{"a":true,"h":"Pending Quantity","n":"pending_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The pending quantity of buckslips.","t":"`$NUMBER`","key$":"pending_quantity","index$":16},"projected_quantity":{"a":true,"h":"Projected Quantity","n":"projected_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The sum of pending and onhand quantities of buckslips.","t":"`$NUMBER`","key$":"projected_quantity","index$":17},"raw_url":{"a":true,"fo":"uri","h":"Raw Url","n":"raw_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The raw URL of the buckslip.","t":"`$STRING`","key$":"raw_url","index$":18},"reorder_quantity":{"a":true,"h":"Reorder Quantity","n":"reorder_quantity","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$NUMBER`"}},"r":true,"sh":"The number of buckslips to be reordered.","t":"`$INTEGER`","key$":"reorder_quantity","index$":19},"send_date":{"a":true,"h":"Send Date","n":"send_date","r":false,"t":"`$STRING`","key$":"send_date","index$":20},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"The size of the buckslip","t":"`$STRING`","key$":"size","index$":21},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":22},"stock":{"a":true,"h":"Stock","n":"stock","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"stock","index$":23},"threshold_amount":{"a":true,"h":"Threshold Amount","n":"threshold_amount","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The threshold amount of the buckslip","t":"`$INTEGER`","key$":"threshold_amount","index$":24},"thumbnails":{"a":true,"h":"Thumbnails","n":"thumbnails","op":{"create":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"thumbnails","index$":25},"url":{"a":true,"fo":"uri","h":"Url","n":"url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The signed link for the buckslip.","t":"`$STRING`","key$":"url","index$":26},"weight":{"a":true,"h":"Weight","n":"weight","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"weight","index$":27}},"id":{"field":"id","name":"id"},"name":"buckslip","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /buckslips","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/buckslips","q":{},"r":{},"s":[{"lit":"buckslips"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /buckslips","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/buckslips","q":{"exist":["before/after","include","limit"]},"r":{},"s":[{"lit":"buckslips"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /buckslips/{buckslip_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"buckslip_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/buckslips/{buckslip_id}","q":{"exist":["id"]},"r":{"param":{"buckslip_id":"id"}},"s":[{"lit":"buckslips"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /buckslips/{buckslip_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"buckslip_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/buckslips/{buckslip_id}","q":{"exist":["id"]},"r":{"param":{"buckslip_id":"id"}},"s":[{"lit":"buckslips"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /buckslips/{buckslip_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"buckslip_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/buckslips/{buckslip_id}","q":{"exist":["id"]},"r":{"param":{"buckslip_id":"id"}},"s":[{"lit":"buckslips"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"buckslip","name__orig":"buckslip","Name":"Buckslip","name_":"buckslip","name-":"buckslip","NAME":"BUCKSLIP","index$":5}, {"active":true,"entity":"buckslip","key$":"BasicBuckslipFlow","kind":"basic","name":"BasicBuckslipFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"buckslip_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"buckslip_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"buckslip_ref01","srcdatavar":"buckslip_ref01_data","suffix":"_up0","textfield":"account_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-buckslip_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"buckslip_ref01","srcdatavar":"buckslip_ref01_data","suffix":"_dt0"},"m":{"id":"buckslip01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-buckslip_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"buckslip_ref01","suffix":"_rm0"},"m":{"id":"buckslip01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"buckslip_ref01"}}],"index$":5}]}, 'Buckslip', {"POST /buckslips":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the buckslip.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/buckslip_description"},"size":{"default":"8.75x3.75","description":"The size of the buckslip","enum":["8.75x3.75"],"type":"string"}},"x-ref":"#/components/schemas/buckslip_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the buckslip","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the buckslip","oneOf":[{},{}]}}}],"x-ref":"#/components/schemas/buckslip_editable","index$":1},"example":{"description":"Test buckslip","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf"}},"application/x-www-form-urlencoded":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the buckslip.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/buckslip_description"},"size":{"default":"8.75x3.75","description":"The size of the buckslip","enum":["8.75x3.75"],"type":"string"}},"x-ref":"#/components/schemas/buckslip_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the buckslip","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the buckslip","oneOf":[{},{}]}}}],"x-ref":"#/components/schemas/buckslip_editable"},"example":{"description":"Test buckslip","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf"}},"multipart/form-data":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the buckslip.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/buckslip_description"},"size":{"default":"8.75x3.75","description":"The size of the buckslip","enum":["8.75x3.75"],"type":"string"}},"x-ref":"#/components/schemas/buckslip_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the buckslip","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the buckslip","oneOf":[{},{}]}}}],"x-ref":"#/components/schemas/buckslip_editable"},"example":{"description":"Test buckslip","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/buckslip.pdf"}}}},"parameters":[]},"GET /buckslips":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":1},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":2}]},"GET /buckslips/{buckslip_id}":{"protocol":"http","parameters":[{"in":"path","name":"buckslip_id","description":"id of the buckslip","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `bck_`.","pattern":"^bck_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/buckslip_id"},"index$":0}]},"DELETE /buckslips/{buckslip_id}":{"protocol":"http","parameters":[{"in":"path","name":"buckslip_id","description":"id of the buckslip","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `bck_`.","pattern":"^bck_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/buckslip_id"},"index$":0}]},"PATCH /buckslips/{buckslip_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the buckslip.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/buckslip_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":5000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/buckslip_updatable","index$":1},"example":{"description":"Test buckslip","auto_reorder":true}},"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the buckslip.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/buckslip_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":5000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/buckslip_updatable"},"example":{"description":"Test buckslip","auto_reorder":true}},"multipart/form-data":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the buckslip.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/buckslip_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":5000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/buckslip_updatable"},"example":{"description":"Test buckslip","auto_reorder":true}}}},"parameters":[{"in":"path","name":"buckslip_id","description":"id of the buckslip","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `bck_`.","pattern":"^bck_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/buckslip_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const buckslip_ref01_ent = client.Buckslip()
    let buckslip_ref01_data = setup.data.new.buckslip['buckslip_ref01']

    buckslip_ref01_data = (await buckslip_ref01_ent.create(buckslip_ref01_data)).data()
    assert(null != buckslip_ref01_data.id)


    // LIST
    const buckslip_ref01_match: any = {}

    const buckslip_ref01_list = (await buckslip_ref01_ent.list(buckslip_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(buckslip_ref01_list, { id: buckslip_ref01_data.id })))


    // UPDATE
    const buckslip_ref01_data_up0: any = {}
    buckslip_ref01_data_up0.id = buckslip_ref01_data.id

    const buckslip_ref01_markdef_up0 = { name: 'account_id', value: 'Mark01-buckslip_ref01_' + setup.now }
    ;(buckslip_ref01_data_up0 as any)[buckslip_ref01_markdef_up0.name] = buckslip_ref01_markdef_up0.value

    const buckslip_ref01_resdata_up0 = (await buckslip_ref01_ent.update(buckslip_ref01_data_up0)).data()
    assert(buckslip_ref01_resdata_up0.id === buckslip_ref01_data_up0.id)

    assert((buckslip_ref01_resdata_up0 as any)[buckslip_ref01_markdef_up0.name] === buckslip_ref01_markdef_up0.value)


    // LOAD
    const buckslip_ref01_match_dt0: any = {}
    buckslip_ref01_match_dt0.id = buckslip_ref01_data.id
    const buckslip_ref01_data_dt0 = (await buckslip_ref01_ent.load(buckslip_ref01_match_dt0)).data()
    assert(buckslip_ref01_data_dt0.id === buckslip_ref01_data.id)


    // REMOVE
    const buckslip_ref01_match_rm0: any = { id: buckslip_ref01_data.id }
    await buckslip_ref01_ent.remove(buckslip_ref01_match_rm0)
  

    // LIST
    const buckslip_ref01_match_rt0: any = {}

    const buckslip_ref01_list_rt0 = (await buckslip_ref01_ent.list(buckslip_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(buckslip_ref01_list_rt0, { id: buckslip_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/buckslip/BuckslipTestData.json')

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
    ['buckslip01','buckslip02','buckslip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_BUCKSLIP_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_BUCKSLIP_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_BUCKSLIP_ENTID']
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
  
