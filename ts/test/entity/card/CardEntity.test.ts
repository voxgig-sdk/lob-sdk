

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


describe('CardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Card()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","r":false,"t":"`$STRING`","key$":"account_id","index$":0},"auto_reorder":{"a":true,"h":"Auto Reorder","n":"auto_reorder","op":{"create":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"True if the cards should be auto-reordered.","t":"`$BOOLEAN`","key$":"auto_reorder","index$":1},"available_quantity":{"a":true,"h":"Available Quantity","n":"available_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The available quantity of cards.","t":"`$INTEGER`","key$":"available_quantity","index$":2},"back_original_url":{"a":true,"fo":"uri","h":"Back Original Url","n":"back_original_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The original URL of the back template.","t":"`$STRING`","key$":"back_original_url","index$":3},"countries":{"a":true,"h":"Countries","n":"countries","r":false,"t":"`$STRING`","key$":"countries","index$":4},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":5},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":6},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Only returned if the resource has been successfully deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":7},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the card.","t":"`$STRING`","key$":"description","index$":8},"front_original_url":{"a":true,"fo":"uri","h":"Front Original Url","n":"front_original_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The original URL of the front template.","t":"`$STRING`","key$":"front_original_url","index$":9},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `card_`.","t":"`$STRING`","key$":"id","index$":10},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":11},"object":{"a":true,"h":"Object","n":"object","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":12},"orientation":{"a":true,"h":"Orientation","n":"orientation","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The orientation of the card.","t":"`$STRING`","key$":"orientation","index$":13},"pending_quantity":{"a":true,"h":"Pending Quantity","n":"pending_quantity","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The pending quantity of cards.","t":"`$INTEGER`","key$":"pending_quantity","index$":14},"raw_url":{"a":true,"fo":"uri","h":"Raw Url","n":"raw_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The raw URL of the card.","t":"`$STRING`","key$":"raw_url","index$":15},"reorder_quantity":{"a":true,"h":"Reorder Quantity","n":"reorder_quantity","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The number of cards to be reordered.","t":"`$INTEGER`","key$":"reorder_quantity","index$":16},"send_date":{"a":true,"h":"Send Date","n":"send_date","r":false,"t":"`$STRING`","key$":"send_date","index$":17},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"The size of the card","t":"`$STRING`","key$":"size","index$":18},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":19},"threshold_amount":{"a":true,"h":"Threshold Amount","n":"threshold_amount","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The threshold amount of the card","t":"`$INTEGER`","key$":"threshold_amount","index$":20},"thumbnails":{"a":true,"h":"Thumbnails","n":"thumbnails","op":{"create":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"thumbnails","index$":21},"url":{"a":true,"fo":"uri","h":"Url","n":"url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The signed link for the card.","t":"`$STRING`","key$":"url","index$":22}},"id":{"field":"id","name":"id"},"name":"card","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /cards/{card_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/cards/{card_id}","q":{"exist":["id"]},"r":{"param":{"card_id":"id"}},"s":[{"lit":"cards"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /cards","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/cards","q":{},"r":{},"s":[{"lit":"cards"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cards","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/cards","q":{"exist":["before/after","include","limit"]},"r":{},"s":[{"lit":"cards"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /cards/{card_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/cards/{card_id}","q":{"exist":["id"]},"r":{"param":{"card_id":"id"}},"s":[{"lit":"cards"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /cards/{card_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"card_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/cards/{card_id}","q":{"exist":["id"]},"r":{"param":{"card_id":"id"}},"s":[{"lit":"cards"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"card","name__orig":"card","Name":"Card","name_":"card","name-":"card","NAME":"CARD","index$":8}, {"active":true,"entity":"card","key$":"BasicCardFlow","kind":"basic","name":"BasicCardFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"card_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"card_ref01","srcdatavar":"card_ref01_data","suffix":"_dt0"},"m":{"id":"card01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"card_ref01","suffix":"_rm0"},"m":{"id":"card01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"card_ref01"}}],"index$":4}]}, 'Card', {"POST /cards/{card_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the card.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/card_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":10000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/card_updatable","index$":1},"example":{"description":"Test card","auto_reorder":true}},"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the card.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/card_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":10000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/card_updatable"},"example":{"description":"Test card","auto_reorder":true}},"multipart/form-data":{"schema":{"type":"object","properties":{"description":{"type":"string","description":"Description of the card.","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/card_description","key$":"description"},"auto_reorder":{"description":"Allows for auto reordering","type":"boolean","key$":"auto_reorder"},"reorder_quantity":{"description":"The quantity of items to be reordered (only required when auto_reorder is true).","type":"number","minimum":10000,"maximum":10000000,"key$":"reorder_quantity"}},"x-ref":"#/components/schemas/card_updatable"},"example":{"description":"Test card","auto_reorder":true}}}},"parameters":[{"in":"path","name":"card_id","description":"id of the card","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `card_`.","pattern":"^card_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/card_id"},"index$":0}]},"POST /cards":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the card.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/card_description"},"size":{"default":"2.125x3.375","description":"The size of the card","enum":["3.375x2.125","2.125x3.375"],"type":"string"}},"x-ref":"#/components/schemas/card_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the card","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the card","oneOf":[{},{}],"default":"https://s3.us-west-2.amazonaws.com/public.lob.com/assets/card_blank_horizontal.pdf"}}}],"x-ref":"#/components/schemas/card_editable","index$":1},"example":{"description":"Test card","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","size":"2.125x3.375"}},"application/x-www-form-urlencoded":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the card.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/card_description"},"size":{"default":"2.125x3.375","description":"The size of the card","enum":["3.375x2.125","2.125x3.375"],"type":"string"}},"x-ref":"#/components/schemas/card_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the card","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the card","oneOf":[{},{}],"default":"https://s3.us-west-2.amazonaws.com/public.lob.com/assets/card_blank_horizontal.pdf"}}}],"x-ref":"#/components/schemas/card_editable"},"example":{"description":"Test card","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","size":"2.125x3.375"}},"multipart/form-data":{"schema":{"allOf":[{"type":"object","properties":{"description":{"description":"Description of the card.","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/card_description"},"size":{"default":"2.125x3.375","description":"The size of the card","enum":["3.375x2.125","2.125x3.375"],"type":"string"}},"x-ref":"#/components/schemas/card_base"},{"type":"object","required":["front"],"properties":{"front":{"description":"A PDF template for the front of the card","oneOf":[{},{}]},"back":{"description":"A PDF template for the back of the card","oneOf":[{},{}],"default":"https://s3.us-west-2.amazonaws.com/public.lob.com/assets/card_blank_horizontal.pdf"}}}],"x-ref":"#/components/schemas/card_editable"},"example":{"description":"Test card","front":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","back":"https://s3-us-west-2.amazonaws.com/public.lob.com/assets/card_horizontal.pdf","size":"2.125x3.375"}}}},"parameters":[]},"GET /cards":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":1},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":2}]},"GET /cards/{card_id}":{"protocol":"http","parameters":[{"in":"path","name":"card_id","description":"id of the card","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `card_`.","pattern":"^card_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/card_id"},"index$":0}]},"DELETE /cards/{card_id}":{"protocol":"http","parameters":[{"in":"path","name":"card_id","description":"id of the card","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `card_`.","pattern":"^card_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/card_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const card_ref01_ent = client.Card()
    let card_ref01_data = setup.data.new.card['card_ref01']

    card_ref01_data = (await card_ref01_ent.create(card_ref01_data)).data()
    assert(null != card_ref01_data.id)


    // LIST
    const card_ref01_match: any = {}

    const card_ref01_list = (await card_ref01_ent.list(card_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(card_ref01_list, { id: card_ref01_data.id })))


    // LOAD
    const card_ref01_match_dt0: any = {}
    card_ref01_match_dt0.id = card_ref01_data.id
    const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data()
    assert(card_ref01_data_dt0.id === card_ref01_data.id)


    // REMOVE
    const card_ref01_match_rm0: any = { id: card_ref01_data.id }
    await card_ref01_ent.remove(card_ref01_match_rm0)
  

    // LIST
    const card_ref01_match_rt0: any = {}

    const card_ref01_list_rt0 = (await card_ref01_ent.list(card_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(card_ref01_list_rt0, { id: card_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/card/CardTestData.json')

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
    ['card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_CARD_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_CARD_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_CARD_ENTID']
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
  
