

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


describe('UsAutocompletionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.UsAutocompletion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'us_autocompletion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address_prefix":{"a":true,"h":"Address Prefix","n":"address_prefix","r":true,"sh":"Only accepts numbers and street names in an alphanumeric format.","t":"`$STRING`","key$":"address_prefix","index$":0},"city":{"a":true,"h":"City","n":"city","r":false,"sh":"An optional city input used to filter suggestions.","t":"`$STRING`","key$":"city","index$":1},"geo_ip_sort":{"a":true,"h":"Geo Ip Sort","n":"geo_ip_sort","r":false,"sh":"If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.","t":"`$BOOLEAN`","key$":"geo_ip_sort","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier prefixed with `us_auto_`.","t":"`$STRING`","key$":"id","index$":3},"object":{"a":true,"h":"Object","n":"object","r":false,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":4},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"An optional state input used to filter suggestions.","t":"`$STRING`","key$":"state","index$":5},"suggestions":{"a":true,"h":"Suggestions","n":"suggestions","r":false,"sh":"An array of objects representing suggested addresses.","t":"`$ARRAY`","key$":"suggestions","index$":6},"zip_code":{"a":true,"h":"Zip Code","n":"zip_code","r":false,"sh":"An optional ZIP Code input used to filter suggestions.","t":"`$STRING`","key$":"zip_code","index$":7}},"id":{"field":"id","name":"id"},"name":"us_autocompletion","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /us_autocompletions","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"upper","k":"query","n":"case","or":"case","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":false,"k":"query","n":"valid_address","or":"valid_addresses","r":false,"t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"POST","o":"/us_autocompletions","q":{"exist":["case","valid_address"]},"r":{},"s":[{"lit":"us_autocompletions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"us_autocompletion","name__orig":"us_autocompletion","Name":"UsAutocompletion","name_":"us_autocompletion","name-":"us-autocompletion","NAME":"US_AUTOCOMPLETION","index$":30}, {"active":true,"entity":"us_autocompletion","key$":"BasicUsAutocompletionFlow","kind":"basic","name":"BasicUsAutocompletionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"us_autocompletion_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'UsAutocompletion', {"POST /us_autocompletions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["address_prefix"],"properties":{"address_prefix":{"type":"string","description":"Only accepts numbers and street names in an alphanumeric format.\n","key$":"address_prefix"},"city":{"type":"string","description":"An optional city input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"city"},"state":{"type":"string","description":"An optional state input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"state"},"zip_code":{"type":"string","description":"An optional ZIP Code input used to filter suggestions. Matches partial entries.\n","key$":"zip_code"},"geo_ip_sort":{"type":"boolean","description":"If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.\n","key$":"geo_ip_sort"}},"x-ref":"#/components/schemas/us_autocompletions_writable","index$":1},"examples":{"basic":{"value":{"address_prefix":"185 B","city":"San Francisco","state":"CA","zip_code":"94107","geo_ip_sort":false}},"test":{"value":{"address_prefix":"1 sugg"}}}},"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["address_prefix"],"properties":{"address_prefix":{"type":"string","description":"Only accepts numbers and street names in an alphanumeric format.\n","key$":"address_prefix"},"city":{"type":"string","description":"An optional city input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"city"},"state":{"type":"string","description":"An optional state input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"state"},"zip_code":{"type":"string","description":"An optional ZIP Code input used to filter suggestions. Matches partial entries.\n","key$":"zip_code"},"geo_ip_sort":{"type":"boolean","description":"If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.\n","key$":"geo_ip_sort"}},"x-ref":"#/components/schemas/us_autocompletions_writable"},"examples":{"basic":{"value":{"address_prefix":"185 B","city":"San Francisco","state":"CA","zip_code":"94107","geo_ip_sort":false}},"test":{"value":{"address_prefix":"1 sugg"}}}},"multipart/form-data":{"schema":{"type":"object","required":["address_prefix"],"properties":{"address_prefix":{"type":"string","description":"Only accepts numbers and street names in an alphanumeric format.\n","key$":"address_prefix"},"city":{"type":"string","description":"An optional city input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"city"},"state":{"type":"string","description":"An optional state input used to filter suggestions. Case insensitive and does not match partial abbreviations.\n","key$":"state"},"zip_code":{"type":"string","description":"An optional ZIP Code input used to filter suggestions. Matches partial entries.\n","key$":"zip_code"},"geo_ip_sort":{"type":"boolean","description":"If `true`, sort suggestions by proximity to the IP set in the `X-Forwarded-For` header.\n","key$":"geo_ip_sort"}},"x-ref":"#/components/schemas/us_autocompletions_writable"},"examples":{"basic":{"value":{"address_prefix":"185 B","city":"San Francisco","state":"CA","zip_code":"94107","geo_ip_sort":false}},"test":{"value":{"address_prefix":"1 sugg"}}}}}},"parameters":[{"in":"query","name":"case","schema":{"type":"string","enum":["upper","proper"],"default":"upper"},"description":"Casing of the verified address. Possible values are `upper` and `proper` for uppercased (e.g. \"PO BOX\") and proper-cased (e.g. \"PO Box\"), respectively. Only affects `primary_line`, `city`, and `state`. Default casing is `upper`.","required":false,"index$":0},{"in":"query","name":"valid_addresses","schema":{"type":"boolean","enum":[true,false],"default":false},"description":"Possible values are `true` and `false`. If false, not all of the suggestions in the response will be valid addresses; they'll need to be verified in order to determine the deliverability. The valid_addresses flag will greatly reduce the number of keystrokes needed before reaching an intended address.","required":false,"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const us_autocompletion_ref01_ent = client.UsAutocompletion()
    let us_autocompletion_ref01_data = setup.data.new.us_autocompletion['us_autocompletion_ref01']

    us_autocompletion_ref01_data = (await us_autocompletion_ref01_ent.create(us_autocompletion_ref01_data)).data()
    assert(null != us_autocompletion_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/us_autocompletion/UsAutocompletionTestData.json')

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
    ['us_autocompletion01','us_autocompletion02','us_autocompletion03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_US_AUTOCOMPLETION_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_US_AUTOCOMPLETION_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_US_AUTOCOMPLETION_ENTID']
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
  
