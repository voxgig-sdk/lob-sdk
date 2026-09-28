

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


describe('ZipEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Zip()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'zip.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"zip_code":{"a":true,"h":"Zip Code","n":"zip_code","r":true,"sh":"A 5-digit ZIP code.","t":"`$STRING`","key$":"zip_code","index$":0}},"name":"zip","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /us_zip_lookups","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/us_zip_lookups","q":{},"r":{},"s":[{"lit":"us_zip_lookups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"zip","name__orig":"zip","Name":"Zip","name_":"zip","name-":"zip","NAME":"ZIP","index$":32}, {"active":true,"entity":"zip","key$":"BasicZipFlow","kind":"basic","name":"BasicZipFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"zip_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Zip', {"POST /us_zip_lookups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["zip_code"],"properties":{"zip_code":{"type":"string","description":"A 5-digit ZIP code.","pattern":"^\\d{5}$","example":"94107","key$":"zip_code"}},"x-ref":"#/components/schemas/zip5","index$":1},"example":{"zip_code":"94107"}},"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["zip_code"],"properties":{"zip_code":{"type":"string","description":"A 5-digit ZIP code.","pattern":"^\\d{5}$","example":"94107","key$":"zip_code"}},"x-ref":"#/components/schemas/zip5"},"example":{"zip_code":"94107"}},"multipart/form-data":{"schema":{"type":"object","required":["zip_code"],"properties":{"zip_code":{"type":"string","description":"A 5-digit ZIP code.","pattern":"^\\d{5}$","example":"94107","key$":"zip_code"}},"x-ref":"#/components/schemas/zip5"},"example":{"zip_code":"94107"}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const zip_ref01_ent = client.Zip()
    let zip_ref01_data = setup.data.new.zip['zip_ref01']

    zip_ref01_data = (await zip_ref01_ent.create(zip_ref01_data)).data()
    assert(null != zip_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/zip/ZipTestData.json')

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
    ['zip01','zip02','zip03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_ZIP_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_ZIP_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_ZIP_ENTID']
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
  
