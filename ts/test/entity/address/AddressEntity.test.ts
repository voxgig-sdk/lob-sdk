

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


describe('AddressEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Address()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'address.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address_city":{"a":true,"h":"Address City","n":"address_city","r":false,"t":"`$STRING`","key$":"address_city","index$":0},"address_country":{"a":true,"h":"Address Country","n":"address_country","r":false,"t":"`$STRING`","key$":"address_country","index$":1},"address_line1":{"a":true,"h":"Address Line1","n":"address_line1","r":false,"t":"`$STRING`","key$":"address_line1","index$":2},"address_line2":{"a":true,"h":"Address Line2","n":"address_line2","r":false,"t":"`$STRING`","key$":"address_line2","index$":3},"address_state":{"a":true,"h":"Address State","n":"address_state","r":false,"t":"`$STRING`","key$":"address_state","index$":4},"address_zip":{"a":true,"h":"Address Zip","n":"address_zip","r":false,"t":"`$STRING`","key$":"address_zip","index$":5},"company":{"a":true,"h":"Company","n":"company","r":false,"t":"`$STRING`","key$":"company","index$":6},"date_created":{"a":true,"h":"Date Created","n":"date_created","r":false,"t":"`$STRING`","key$":"date_created","index$":7},"date_modified":{"a":true,"h":"Date Modified","n":"date_modified","r":false,"t":"`$STRING`","key$":"date_modified","index$":8},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":9},"email":{"a":true,"h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":10},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":11},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":12},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":13},"object":{"a":true,"h":"Object","n":"object","r":false,"t":"`$STRING`","key$":"object","index$":14},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":15}},"id":{"field":"id","name":"id"},"name":"address","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /addresses","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/addresses","q":{},"r":{},"s":[{"lit":"addresses"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /addresses","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"date_created","or":"date_created","r":false,"t":"`$OBJECT`","index$":1},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"metadata","or":"metadata","r":false,"t":"`$OBJECT`","index$":4}]},"k":"http","m":"GET","o":"/addresses","q":{"exist":["before/after","date_created","include","limit","metadata"]},"r":{},"s":[{"lit":"addresses"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /addresses/{adr_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"adr_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/addresses/{adr_id}","q":{"exist":["id"]},"r":{"param":{"adr_id":"id"}},"s":[{"lit":"addresses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /addresses/{adr_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"adr_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/addresses/{adr_id}","q":{"exist":["id"]},"r":{"param":{"adr_id":"id"}},"s":[{"lit":"addresses"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"address","name__orig":"address","Name":"Address","name_":"address","name-":"address","NAME":"ADDRESS","index$":0}, {"active":true,"entity":"address","key$":"BasicAddressFlow","kind":"basic","name":"BasicAddressFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"address_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"address_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"address_ref01","srcdatavar":"address_ref01_data","suffix":"_dt0"},"m":{"id":"address01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-address_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"address_ref01","suffix":"_rm0"},"m":{"id":"address01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"address_ref01"}}],"index$":4}]}, 'Address', {"POST /addresses":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_city","address_state","address_zip"],"type":"object","x-ref":"#/components/schemas/address_fields_us"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_us"},{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_country"],"type":"object","x-ref":"#/components/schemas/address_fields_intl"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_intl"}],"x-ref":"#/components/schemas/address_editable","index$":1},"examples":{"full_us":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"ncoa_us_test":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"NCOA","address_line2":"#6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"full_intl":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"370 WATER ST","address_line2":"","address_city":"SUMMERSIDE","address_state":"PRINCE EDWARD ISLAND","address_zip":"C1N 1C4","address_country":"CA"}}}},"application/x-www-form-urlencoded":{"schema":{"oneOf":[{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_city","address_state","address_zip"],"type":"object","x-ref":"#/components/schemas/address_fields_us"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_us"},{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_country"],"type":"object","x-ref":"#/components/schemas/address_fields_intl"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_intl"}],"x-ref":"#/components/schemas/address_editable"},"examples":{"full_us":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"ncoa_us_test":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"NCOA","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"full_intl":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"370 WATER ST","address_line2":"","address_city":"SUMMERSIDE","address_state":"PRINCE EDWARD ISLAND","address_zip":"C1N 1C4","address_country":"CA"}}},"encoding":{"metadata":{"style":"deepObject","explode":true}}},"multipart/form-data":{"schema":{"oneOf":[{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_city","address_state","address_zip"],"type":"object","x-ref":"#/components/schemas/address_fields_us"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_us"},{"allOf":[{"properties":{"address_city":{},"address_line1":{},"address_line2":{},"address_state":{},"address_zip":{}},"required":["address_line1","address_country"],"type":"object","x-ref":"#/components/schemas/address_fields_intl"},{"anyOf":[{},{}],"properties":{"address_country":{},"company":{},"description":{},"email":{},"metadata":{},"name":{},"phone":{}},"type":"object"}],"x-ref":"#/components/schemas/address_editable_intl"}],"x-ref":"#/components/schemas/address_editable"},"examples":{"full_us":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"210 King St","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"ncoa_us_test":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"NCOA","address_line2":"# 6100","address_city":"San Francisco","address_state":"CA","address_zip":"94107","address_country":"US"}},"full_intl":{"value":{"description":"Harry - Office","name":"Harry Zhang","company":"Lob","email":"harry@lob.com","phone":"5555555555","address_line1":"370 WATER ST","address_line2":"","address_city":"SUMMERSIDE","address_state":"PRINCE EDWARD ISLAND","address_zip":"C1N 1C4","address_country":"CA"}}}}}},"parameters":[]},"GET /addresses":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":1},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":2},{"in":"query","name":"date_created","description":"Filter by date created. Accepted formats are ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Filter by ISO-8601 date or datetime, e.g. `{ \"gt\": \"2012-01-01\", \"lt\": \"2012-01-31T12:34:56Z\" }` where `gt` is >, `lt` is <, `gte` is ≥, and `lte` is ≤.","x-ref":"#/components/schemas/date_filter"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/date_created","index$":3},{"in":"query","name":"metadata","description":"Filter by metadata key-value pair`.","schema":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata"},"style":"deepObject","explode":true,"x-ref":"#/components/parameters/metadata","index$":4}]},"GET /addresses/{adr_id}":{"protocol":"http","parameters":[{"in":"path","name":"adr_id","description":"id of the address","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `adr_`.","pattern":"^adr_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/adr_id"},"index$":0}]},"DELETE /addresses/{adr_id}":{"protocol":"http","parameters":[{"in":"path","name":"adr_id","description":"id of the address","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `adr_`.","pattern":"^adr_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/adr_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const address_ref01_ent = client.Address()
    let address_ref01_data = setup.data.new.address['address_ref01']

    address_ref01_data = (await address_ref01_ent.create(address_ref01_data)).data()
    assert(null != address_ref01_data.id)


    // LIST
    const address_ref01_match: any = {}

    const address_ref01_list = (await address_ref01_ent.list(address_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(address_ref01_list, { id: address_ref01_data.id })))


    // LOAD
    const address_ref01_match_dt0: any = {}
    address_ref01_match_dt0.id = address_ref01_data.id
    const address_ref01_data_dt0 = (await address_ref01_ent.load(address_ref01_match_dt0)).data()
    assert(address_ref01_data_dt0.id === address_ref01_data.id)


    // REMOVE
    const address_ref01_match_rm0: any = { id: address_ref01_data.id }
    await address_ref01_ent.remove(address_ref01_match_rm0)
  

    // LIST
    const address_ref01_match_rt0: any = {}

    const address_ref01_list_rt0 = (await address_ref01_ent.list(address_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(address_ref01_list_rt0, { id: address_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/address/AddressTestData.json')

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
    ['address01','address02','address03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_ADDRESS_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_ADDRESS_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_ADDRESS_ENTID']
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
  
