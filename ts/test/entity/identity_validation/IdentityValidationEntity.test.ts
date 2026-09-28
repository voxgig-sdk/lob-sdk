

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


describe('IdentityValidationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.IdentityValidation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'identity_validation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"confidence":{"a":true,"h":"Confidence","n":"confidence","r":false,"t":"`$STRING`","key$":"confidence","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"last_line":{"a":true,"h":"Last Line","n":"last_line","r":false,"t":"`$STRING`","key$":"last_line","index$":2},"object":{"a":true,"h":"Object","n":"object","r":false,"t":"`$STRING`","key$":"object","index$":3},"primary_line":{"a":true,"h":"Primary Line","n":"primary_line","r":false,"t":"`$STRING`","key$":"primary_line","index$":4},"recipient":{"a":true,"h":"Recipient","n":"recipient","r":false,"t":"`$STRING`","key$":"recipient","index$":5},"score":{"a":true,"h":"Score","n":"score","r":false,"t":"`$INTEGER`","key$":"score","index$":6},"secondary_line":{"a":true,"h":"Secondary Line","n":"secondary_line","r":false,"t":"`$STRING`","key$":"secondary_line","index$":7},"urbanization":{"a":true,"h":"Urbanization","n":"urbanization","r":false,"t":"`$STRING`","key$":"urbanization","index$":8}},"id":{"field":"id","name":"id"},"name":"identity_validation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /identity_validation","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/identity_validation","q":{},"r":{},"s":[{"lit":"identity_validation"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"identity_validation","name__orig":"identity_validation","Name":"IdentityValidation","name_":"identity_validation","name-":"identity-validation","NAME":"IDENTITY_VALIDATION","index$":13}, {"active":true,"entity":"identity_validation","key$":"BasicIdentityValidationFlow","kind":"basic","name":"BasicIdentityValidationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"identity_validation_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'IdentityValidation', {"POST /identity_validation":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["recipient","primary_line"],"properties":{"recipient":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/recipient_input"},{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["company","primary_line"],"properties":{"company":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/company_input"}],"x-ref":"#/components/schemas/identity_validation_writable","index$":1},"example":{"recipient":"Larry Lobster","primary_line":"210 King St.","secondary_line":"","city":"San Francisco","state":"CA","zip_code":"94107"}},"application/x-www-form-urlencoded":{"schema":{"oneOf":[{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["recipient","primary_line"],"properties":{"recipient":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/recipient_input"},{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["company","primary_line"],"properties":{"company":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/company_input"}],"x-ref":"#/components/schemas/identity_validation_writable"},"example":{"recipient":"Larry Lobster","primary_line":"210 King St.","secondary_line":"","city":"San Francisco","state":"CA","zip_code":"94107"}},"multipart/form-data":{"schema":{"oneOf":[{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["recipient","primary_line"],"properties":{"recipient":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/recipient_input"},{"allOf":[{"anyOf":[{},{}]},{"type":"object","required":["company","primary_line"],"properties":{"company":{},"primary_line":{},"secondary_line":{},"urbanization":{},"city":{},"state":{},"zip_code":{}}}],"x-ref":"#/components/schemas/company_input"}],"x-ref":"#/components/schemas/identity_validation_writable"},"example":{"recipient":"Larry Lobster","primary_line":"210 King St.","secondary_line":"","city":"San Francisco","state":"CA","zip_code":"94107"}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const identity_validation_ref01_ent = client.IdentityValidation()
    let identity_validation_ref01_data = setup.data.new.identity_validation['identity_validation_ref01']

    identity_validation_ref01_data = (await identity_validation_ref01_ent.create(identity_validation_ref01_data)).data()
    assert(null != identity_validation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/identity_validation/IdentityValidationTestData.json')

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
    ['identity_validation01','identity_validation02','identity_validation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_IDENTITY_VALIDATION_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_IDENTITY_VALIDATION_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_IDENTITY_VALIDATION_ENTID']
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
  
