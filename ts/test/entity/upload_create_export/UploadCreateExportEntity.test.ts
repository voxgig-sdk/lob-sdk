

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


describe('UploadCreateExportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.UploadCreateExport()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'upload_create_export.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"exportId":{"a":true,"h":"Export Id","n":"exportId","r":true,"t":"`$STRING`","key$":"exportId","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":3}},"id":{"field":"id","name":"id"},"name":"upload_create_export","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /uploads/{upl_id}/exports","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"upl_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/uploads/{upl_id}/exports","q":{"exist":["id"]},"r":{"param":{"upl_id":"id"}},"s":[{"lit":"uploads"},{"var":"id"},{"lit":"exports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"upload_create_export","name__orig":"upload_create_export","Name":"UploadCreateExport","name_":"upload_create_export","name-":"upload-create-export","NAME":"UPLOAD_CREATE_EXPORT","index$":29}, {"active":true,"entity":"upload_create_export","key$":"BasicUploadCreateExportFlow","kind":"basic","name":"BasicUploadCreateExportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"upload_create_export_ref01"},"m":{"upl_id":"upl01"},"o":"create","s":[],"v":[],"index$":0}]}, 'UploadCreateExport', {"POST /uploads/{upl_id}/exports":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"type":{"type":"string","enum":["all","failures","successes"],"key$":"type"}},"index$":1}}}},"parameters":[{"in":"path","name":"upl_id","description":"ID of the upload","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `upl_`.","pattern":"^upl_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/upl_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const upload_create_export_ref01_ent = client.UploadCreateExport()
    let upload_create_export_ref01_data = setup.data.new.upload_create_export['upload_create_export_ref01']
    upload_create_export_ref01_data['upl_id'] = setup.idmap['upl01']

    upload_create_export_ref01_data = (await upload_create_export_ref01_ent.create(upload_create_export_ref01_data)).data()
    assert(null != upload_create_export_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/upload_create_export/UploadCreateExportTestData.json')

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
    ['upload_create_export01','upload_create_export02','upload_create_export03','upl01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_UPLOAD_CREATE_EXPORT_ENTID']
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
  
