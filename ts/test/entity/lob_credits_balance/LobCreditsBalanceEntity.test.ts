

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


describe('LobCreditsBalanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.LobCreditsBalance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lob_credits_balance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"balance":{"a":true,"h":"Balance","n":"balance","r":true,"sh":"Account's current balance of Lob Credits.","t":"`$NUMBER`","key$":"balance","index$":0}},"name":"lob_credits_balance","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /accounts","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/accounts","q":{},"r":{},"s":[{"lit":"accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lob_credits_balance","name__orig":"lob_credits_balance","Name":"LobCreditsBalance","name_":"lob_credits_balance","name-":"lob-credits-balance","NAME":"LOB_CREDITS_BALANCE","index$":17}, {"active":true,"entity":"lob_credits_balance","key$":"BasicLobCreditsBalanceFlow","kind":"basic","name":"BasicLobCreditsBalanceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lob_credits_balance_ref01","srcdatavar":"lob_credits_balance_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lob_credits_balance_ref01"}}],"index$":0}]}, 'LobCreditsBalance', {"GET /accounts":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lob_credits_balance_ref01_data = Object.values(setup.data.existing.lob_credits_balance)[0] as any

    // LOAD
    const lob_credits_balance_ref01_ent = client.LobCreditsBalance()
    const lob_credits_balance_ref01_match_dt0: any = {}
    const lob_credits_balance_ref01_data_dt0 = (await lob_credits_balance_ref01_ent.load(lob_credits_balance_ref01_match_dt0)).data()
    assert(null != lob_credits_balance_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/lob_credits_balance/LobCreditsBalanceTestData.json')

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
    ['lob_credits_balance01','lob_credits_balance02','lob_credits_balance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_LOB_CREDITS_BALANCE_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_LOB_CREDITS_BALANCE_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_LOB_CREDITS_BALANCE_ENTID']
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
  
