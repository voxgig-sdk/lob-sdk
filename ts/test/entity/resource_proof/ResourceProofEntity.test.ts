

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


describe('ResourceProofEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.ResourceProof()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'resource_proof.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":0},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":1},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"Errors encountered during processing.","t":"`$ARRAY`","key$":"errors","index$":2},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique identifier prefixed with `res_prf_`.","t":"`$STRING`","key$":"id","index$":3},"object":{"a":true,"h":"Object","n":"object","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":4},"resource_type":{"a":true,"h":"Resource Type","n":"resource_type","r":false,"sh":"The type of resource to generate a proof for.","t":"`$STRING`","key$":"resource_type","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The processing status of the resource proof.","t":"`$STRING`","key$":"status","index$":6},"template_id":{"a":true,"h":"Template Id","n":"template_id","r":false,"sh":"The template ID associated with the resource proof, if any.","t":"`$STRING`","key$":"template_id","index$":7},"thumbnails":{"a":true,"h":"Thumbnails","n":"thumbnails","r":false,"sh":"Thumbnail images of the resource proof.","t":"`$ARRAY`","key$":"thumbnails","index$":8},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"A URL to the resource proof PDF.","t":"`$STRING`","key$":"url","index$":9}},"id":{"field":"id","name":"id"},"name":"resource_proof","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /resource_proofs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/resource_proofs","q":{},"r":{},"s":[{"lit":"resource_proofs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /resource_proofs/{res_prf_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"res_prf_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/resource_proofs/{res_prf_id}","q":{"exist":["id"]},"r":{"param":{"res_prf_id":"id"}},"s":[{"lit":"resource_proofs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /resource_proofs/{res_prf_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"res_prf_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/resource_proofs/{res_prf_id}","q":{"exist":["id"]},"r":{"param":{"res_prf_id":"id"}},"s":[{"lit":"resource_proofs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"resource_proof","name__orig":"resource_proof","Name":"ResourceProof","name_":"resource_proof","name-":"resource-proof","NAME":"RESOURCE_PROOF","index$":20}, {"active":true,"entity":"resource_proof","key$":"BasicResourceProofFlow","kind":"basic","name":"BasicResourceProofFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"resource_proof_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"resource_proof_ref01","srcdatavar":"resource_proof_ref01_data","suffix":"_up0","textfield":"date_created"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-resource_proof_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"resource_proof_ref01","srcdatavar":"resource_proof_ref01_data","suffix":"_dt0"},"m":{"id":"resource_proof01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-resource_proof_ref01"}}],"index$":2}]}, 'ResourceProof', {"POST /resource_proofs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"required":["resource_type","resource_parameters"],"oneOf":[{"title":"Postcard Resource Proof","type":"object","properties":{"template_id":{"type":"string","nullable":true,"description":"The template ID to associate with the resource proof."},"resource_type":{"type":"string","enum":["postcard"],"description":"The type of resource to generate a proof for."},"resource_parameters":{"allOf":[{},{},{}],"x-ref":"#/components/schemas/postcard_resource_parameters"}}},{"title":"Letter Resource Proof","type":"object","properties":{"template_id":{"type":"string","nullable":true,"description":"The template ID to associate with the resource proof."},"resource_type":{"type":"string","enum":["letter"],"description":"The type of resource to generate a proof for."},"resource_parameters":{"allOf":[{},{},{}],"x-ref":"#/components/schemas/letter_resource_parameters"}}},{"title":"Self Mailer Resource Proof","type":"object","properties":{"template_id":{"type":"string","nullable":true,"description":"The template ID to associate with the resource proof."},"resource_type":{"type":"string","enum":["self_mailer"],"description":"The type of resource to generate a proof for."},"resource_parameters":{"allOf":[{},{},{}],"x-ref":"#/components/schemas/self_mailer_resource_parameters"}}}],"discriminator":{"propertyName":"resource_type","mapping":{"postcard":"#/components/schemas/0","letter":"#/components/schemas/1","self_mailer":"#/components/schemas/2"}},"x-ref":"#/components/schemas/resource_proof_editable","index$":1},"example":{"resource_type":"postcard","resource_parameters":{"front":"tmpl_a1234dddg","back":"tmpl_a1234dddg","to":"adr_a1234dddg"}}}}},"parameters":[]},"GET /resource_proofs/{res_prf_id}":{"protocol":"http","parameters":[{"in":"path","name":"res_prf_id","description":"id of the resource proof","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `res_prf_`.","pattern":"^res_prf_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/res_prf_id"},"index$":0}]},"PATCH /resource_proofs/{res_prf_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"template_id":{"type":"string","nullable":true,"description":"The template ID to associate with the resource proof.","key$":"template_id"}},"x-ref":"#/components/schemas/resource_proof_updatable","index$":1},"example":{"template_id":"tmpl_a1234dddg"}}}},"parameters":[{"in":"path","name":"res_prf_id","description":"id of the resource proof","required":true,"schema":{"type":"string","description":"Unique identifier prefixed with `res_prf_`.","pattern":"^res_prf_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/res_prf_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const resource_proof_ref01_ent = client.ResourceProof()
    let resource_proof_ref01_data = setup.data.new.resource_proof['resource_proof_ref01']

    resource_proof_ref01_data = (await resource_proof_ref01_ent.create(resource_proof_ref01_data)).data()
    assert(null != resource_proof_ref01_data.id)


    // UPDATE
    const resource_proof_ref01_data_up0: any = {}
    resource_proof_ref01_data_up0.id = resource_proof_ref01_data.id

    const resource_proof_ref01_markdef_up0 = { name: 'date_created', value: 'Mark01-resource_proof_ref01_' + setup.now }
    ;(resource_proof_ref01_data_up0 as any)[resource_proof_ref01_markdef_up0.name] = resource_proof_ref01_markdef_up0.value

    const resource_proof_ref01_resdata_up0 = (await resource_proof_ref01_ent.update(resource_proof_ref01_data_up0)).data()
    assert(resource_proof_ref01_resdata_up0.id === resource_proof_ref01_data_up0.id)

    assert((resource_proof_ref01_resdata_up0 as any)[resource_proof_ref01_markdef_up0.name] === resource_proof_ref01_markdef_up0.value)


    // LOAD
    const resource_proof_ref01_match_dt0: any = {}
    resource_proof_ref01_match_dt0.id = resource_proof_ref01_data.id
    const resource_proof_ref01_data_dt0 = (await resource_proof_ref01_ent.load(resource_proof_ref01_match_dt0)).data()
    assert(resource_proof_ref01_data_dt0.id === resource_proof_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/resource_proof/ResourceProofTestData.json')

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
    ['resource_proof01','resource_proof02','resource_proof03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_RESOURCE_PROOF_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_RESOURCE_PROOF_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_RESOURCE_PROOF_ENTID']
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
  
