

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


describe('ResponseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Response()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'response.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Your Lob account id.","t":"`$STRING`","key$":"account_id","index$":0},"brand_name":{"a":true,"h":"Brand Name","n":"brand_name","r":false,"t":"`$STRING`","key$":"brand_name","index$":1},"campaign_code":{"a":true,"h":"Campaign Code","n":"campaign_code","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The campaign code associated with the Informed Delivery campaign.","t":"`$STRING`","key$":"campaign_code","index$":2},"count":{"a":true,"h":"Count","n":"count","r":false,"sh":"number of resources in a set","t":"`$INTEGER`","key$":"count","index$":3},"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"list of Informed Delivery campaigns","t":"`$ARRAY`","key$":"data","index$":4},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":5},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":6},"deleted":{"a":true,"h":"Deleted","n":"deleted","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether the resource has been deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":7},"end_date":{"a":true,"fo":"date-time","h":"End Date","n":"end_date","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the campaign ends.","t":"`$STRING`","key$":"end_date","index$":8},"end_serial":{"a":true,"h":"End Serial","n":"end_serial","op":{"create":{"req":false,"type":"`$INTEGER`"},"update":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The last serial number in the range of serial numbers for this campaign.","t":"`$INTEGER`","key$":"end_serial","index$":9},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `infd_`.","t":"`$STRING`","key$":"id","index$":10},"lob_campaign_id":{"a":true,"h":"Lob Campaign Id","n":"lob_campaign_id","r":false,"t":"`$STRING`","key$":"lob_campaign_id","index$":11},"mode":{"a":true,"h":"Mode","n":"mode","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The mode of the Informed Delivery campaign.","t":"`$STRING`","key$":"mode","index$":12},"next_url":{"a":true,"h":"Next Url","n":"next_url","r":false,"sh":"Url of next page of items in list.","t":"`$STRING`","key$":"next_url","index$":13},"object":{"a":true,"h":"Object","n":"object","op":{"create":{"req":false,"type":"`$STRING`"},"list":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Value is the resource type.","t":"`$STRING`","key$":"object","index$":14},"previous_url":{"a":true,"h":"Previous Url","n":"previous_url","r":false,"sh":"Url of previous page of items in list.","t":"`$STRING`","key$":"previous_url","index$":15},"quantity":{"a":true,"h":"Quantity","n":"quantity","r":false,"t":"`$INTEGER`","key$":"quantity","index$":16},"representative_image_s3_link":{"a":true,"h":"Representative Image S3 Link","n":"representative_image_s3_link","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A URL link to the campaigns representative image.","t":"`$STRING`","key$":"representative_image_s3_link","index$":17},"ride_along_image_s3_link":{"a":true,"h":"Ride Along Image S3 Link","n":"ride_along_image_s3_link","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A URL link to the campaigns ride along image.","t":"`$STRING`","key$":"ride_along_image_s3_link","index$":18},"ride_along_url":{"a":true,"h":"Ride Along Url","n":"ride_along_url","r":false,"t":"`$STRING`","key$":"ride_along_url","index$":19},"service_request_number":{"a":true,"h":"Service Request Number","n":"service_request_number","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The USPS promotion service request number used to create this campaign (if there was one used).","t":"`$STRING`","key$":"service_request_number","index$":20},"start_date":{"a":true,"h":"Start Date","n":"start_date","r":false,"t":"`$STRING`","key$":"start_date","index$":21},"start_serial":{"a":true,"h":"Start Serial","n":"start_serial","op":{"create":{"req":false,"type":"`$INTEGER`"},"update":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"The first serial number in the range of serial numbers for this campaign.","t":"`$INTEGER`","key$":"start_serial","index$":22},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":23},"total_count":{"a":true,"h":"Total Count","n":"total_count","r":false,"sh":"Indicates the total number of records.","t":"`$INTEGER`","key$":"total_count","index$":24},"usps_campaign_id":{"a":true,"h":"Usps Campaign Id","n":"usps_campaign_id","op":{"create":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A numberical string up to 12 characters long.","t":"`$STRING`","key$":"usps_campaign_id","index$":25},"usps_title":{"a":true,"h":"Usps Title","n":"usps_title","r":false,"t":"`$STRING`","key$":"usps_title","index$":26}},"id":{"field":"id","name":"id"},"name":"response","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /informed_delivery_campaigns","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/informed_delivery_campaigns","q":{},"r":{},"s":[{"lit":"informed_delivery_campaigns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /informed_delivery_campaigns","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/informed_delivery_campaigns","q":{},"r":{},"s":[{"lit":"informed_delivery_campaigns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /informed_delivery_campaigns/{usps_campaign_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1200772869","k":"param","n":"usps_campaign_id","or":"usps_campaign_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/informed_delivery_campaigns/{usps_campaign_id}","q":{"exist":["usps_campaign_id"]},"r":{},"s":[{"lit":"informed_delivery_campaigns"},{"var":"usps_campaign_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /informed_delivery_campaigns/{usps_campaign_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1200772869","k":"param","n":"usps_campaign_id","or":"usps_campaign_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/informed_delivery_campaigns/{usps_campaign_id}","q":{"exist":["usps_campaign_id"]},"r":{},"s":[{"lit":"informed_delivery_campaigns"},{"var":"usps_campaign_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"response","name__orig":"response","Name":"Response","name_":"response","name-":"response","NAME":"RESPONSE","index$":21}, {"active":true,"entity":"response","key$":"BasicResponseFlow","kind":"basic","name":"BasicResponseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"response_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"response_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"response_ref01","srcdatavar":"response_ref01_data","suffix":"_up0","textfield":"account_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-response_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"response_ref01","srcdatavar":"response_ref01_data","suffix":"_dt0"},"m":{"id":"response01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-response_ref01"}}],"index$":3}]}, 'Response', {"POST /informed_delivery_campaigns":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"allOf":[{"allOf":[{"allOf":[{}],"x-ref":"#/components/schemas/common"},{"type":"object","properties":{"ride_along_image":{},"representative_image":{}}}],"x-ref":"#/components/schemas/writable_base"},{"type":"object","required":["quantity","ride_along_image","ride_along_url","start_date"],"properties":{"status":{"type":"string","enum":["pending_approval"],"description":"If setting a campaign to `pending_approval` the Informed Delivery campaign will not be active, and you can not send mail using it.\nIt will be editable in this status however, and changes can be made until `approved`.\n**NOTE** that the default status is `approved` which makes the campaign active, but un-editable.\n"}}}],"x-ref":"#/components/schemas/create"}}}},"parameters":[]},"GET /informed_delivery_campaigns":{"protocol":"http","parameters":[]},"GET /informed_delivery_campaigns/{usps_campaign_id}":{"protocol":"http","parameters":[{"in":"path","name":"usps_campaign_id","description":"usps_campaign_id of the Informed Delivery campaign","required":true,"schema":{"type":"string","description":"A numberical string up to 12 characters long.","pattern":"^[0-9]+$","example":"1200772869","x-ref":"#/components/schemas/usps_campaign_id"},"index$":0}]},"PATCH /informed_delivery_campaigns/{usps_campaign_id}":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"allOf":[{"allOf":[{"allOf":[{}],"x-ref":"#/components/schemas/common"},{"type":"object","properties":{"ride_along_image":{},"representative_image":{}}}],"x-ref":"#/components/schemas/writable_base"},{"type":"object","properties":{"status":{"type":"string","enum":["approved"],"description":"After setting an Informed Delivery campaign to “approved” said campaign will activate, and you can start sending mail using it.\nYou will no longer be able to edit an Informed Delivery campaign in this status.\n"}}}],"x-ref":"#/components/schemas/update"}}}},"parameters":[{"in":"path","name":"usps_campaign_id","description":"usps_campaign_id of the Informed Delivery campaign","required":true,"schema":{"type":"string","description":"A numberical string up to 12 characters long.","pattern":"^[0-9]+$","example":"1200772869","x-ref":"#/components/schemas/usps_campaign_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const response_ref01_ent = client.Response()
    let response_ref01_data = setup.data.new.response['response_ref01']

    response_ref01_data = (await response_ref01_ent.create(response_ref01_data)).data()
    assert(null != response_ref01_data.id)


    // LIST
    const response_ref01_match: any = {}

    const response_ref01_list = (await response_ref01_ent.list(response_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(response_ref01_list, { id: response_ref01_data.id })))


    // UPDATE
    const response_ref01_data_up0: any = {}
    response_ref01_data_up0.id = response_ref01_data.id

    const response_ref01_markdef_up0 = { name: 'account_id', value: 'Mark01-response_ref01_' + setup.now }
    ;(response_ref01_data_up0 as any)[response_ref01_markdef_up0.name] = response_ref01_markdef_up0.value

    const response_ref01_resdata_up0 = (await response_ref01_ent.update(response_ref01_data_up0)).data()
    assert(response_ref01_resdata_up0.id === response_ref01_data_up0.id)

    assert((response_ref01_resdata_up0 as any)[response_ref01_markdef_up0.name] === response_ref01_markdef_up0.value)


    // LOAD
    const response_ref01_match_dt0: any = {}
    response_ref01_match_dt0.id = response_ref01_data.id
    const response_ref01_data_dt0 = (await response_ref01_ent.load(response_ref01_match_dt0)).data()
    assert(response_ref01_data_dt0.id === response_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/response/ResponseTestData.json')

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
    ['response01','response02','response03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_RESPONSE_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_RESPONSE_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_RESPONSE_ENTID']
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
  
