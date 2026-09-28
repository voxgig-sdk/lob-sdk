

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


describe('TemplateVersionDeletionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.TemplateVersionDeletion()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'template_version_deletion.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"template_version_deletion","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /templates/{tmpl_id}/versions/{vrsn_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"template_id","or":"tmpl_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"vrsn_id","or":"vrsn_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/templates/{tmpl_id}/versions/{vrsn_id}","q":{"exist":["template_id","vrsn_id"]},"r":{"param":{"tmpl_id":"template_id"}},"s":[{"lit":"templates"},{"var":"template_id"},{"lit":"versions"},{"var":"vrsn_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.template"]]},"key$":"template_version_deletion","name__orig":"template_version_deletion","Name":"TemplateVersionDeletion","name_":"template_version_deletion","name-":"template-version-deletion","NAME":"TEMPLATE_VERSION_DELETION","index$":27}, {"active":true,"entity":"template_version_deletion","key$":"BasicTemplateVersionDeletionFlow","kind":"basic","name":"BasicTemplateVersionDeletionFlow","param":{},"step":[]}, 'TemplateVersionDeletion', {"DELETE /templates/{tmpl_id}/versions/{vrsn_id}":{"protocol":"http","parameters":[{"in":"path","name":"tmpl_id","description":"The ID of the template to which the version belongs.","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `tmpl_`. ID of a saved [HTML template](#section/HTML-Templates).","pattern":"^tmpl_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/tmpl_id"},"index$":0},{"in":"path","name":"vrsn_id","description":"id of the template_version","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `vrsn_`.","pattern":"^vrsn_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/vrsn_id"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let template_version_deletion_ref01_data = Object.values(setup.data.existing.template_version_deletion)[0] as any

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/template_version_deletion/TemplateVersionDeletionTestData.json')

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
    ['template_version_deletion01','template_version_deletion02','template_version_deletion03','template01','template02','template03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_TEMPLATE_VERSION_DELETION_ENTID']
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
  
