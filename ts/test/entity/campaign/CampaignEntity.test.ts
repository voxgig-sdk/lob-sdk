

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


describe('CampaignEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOB_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LobSDK.test()
    const ent = testsdk.Campaign()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOB_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'campaign.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auto_cancel_if_ncoa":{"a":true,"h":"Auto Cancel If Ncoa","n":"auto_cancel_if_ncoa","r":false,"sh":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","t":"`$BOOLEAN`","key$":"auto_cancel_if_ncoa","index$":0},"billing_group_id":{"a":true,"h":"Billing Group Id","n":"billing_group_id","r":false,"sh":"Unique identifier prefixed with `bg_`.","t":"`$STRING`","key$":"billing_group_id","index$":1},"cancel_window_campaign_minutes":{"a":true,"h":"Cancel Window Campaign Minutes","n":"cancel_window_campaign_minutes","r":false,"sh":"A window, in minutes, within which the campaign can be canceled.","t":"`$INTEGER`","key$":"cancel_window_campaign_minutes","index$":2},"count":{"a":true,"h":"Count","n":"count","r":false,"sh":"number of resources in a set","t":"`$INTEGER`","key$":"count","index$":3},"creatives":{"a":true,"h":"Creatives","n":"creatives","r":true,"sh":"An array of creatives that have been associated with this campaign.","t":"`$ARRAY`","union":{"branches":3,"count":6,"depth":15},"key$":"creatives","index$":4},"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"list of campaigns","t":"`$ARRAY`","union":{"branches":3,"count":6,"depth":20},"key$":"data","index$":5},"date_created":{"a":true,"fo":"date-time","h":"Date Created","n":"date_created","r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was created.","t":"`$STRING`","key$":"date_created","index$":6},"date_modified":{"a":true,"fo":"date-time","h":"Date Modified","n":"date_modified","r":true,"sh":"A timestamp in ISO 8601 format of the date the resource was last modified.","t":"`$STRING`","key$":"date_modified","index$":7},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Only returned if the resource has been successfully deleted.","t":"`$BOOLEAN`","key$":"deleted","index$":8},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"An internal description that identifies this resource.","t":"`$STRING`","key$":"description","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier prefixed with `cmp_`.","t":"`$STRING`","key$":"id","index$":10},"is_draft":{"a":true,"h":"Is Draft","n":"is_draft","op":{"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"sh":"Whether or not the campaign is still a draft.","t":"`$BOOLEAN`","key$":"is_draft","index$":11},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"sh":"Use metadata to store custom information for tagging and labeling back to your internal systems.","t":"`$OBJECT`","key$":"metadata","index$":12},"name":{"a":true,"h":"Name","n":"name","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Name of the campaign.","t":"`$STRING`","key$":"name","index$":13},"next_url":{"a":true,"h":"Next Url","n":"next_url","r":false,"sh":"Url of next page of items in list.","t":"`$STRING`","key$":"next_url","index$":14},"object":{"a":true,"h":"Object","n":"object","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Value is resource type.","t":"`$STRING`","key$":"object","index$":15},"previous_url":{"a":true,"h":"Previous Url","n":"previous_url","r":false,"sh":"Url of previous page of items in list.","t":"`$STRING`","key$":"previous_url","index$":16},"print_speed":{"a":true,"h":"Print Speed","n":"print_speed","r":false,"sh":"A string designating the mail speed type: * `core` - 2 production business days","t":"`$STRING`","key$":"print_speed","index$":17},"schedule_type":{"a":true,"h":"Schedule Type","n":"schedule_type","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"How the campaign should be scheduled.","t":"`$STRING`","key$":"schedule_type","index$":18},"send_date":{"a":true,"fo":"date-time","h":"Send Date","n":"send_date","r":false,"sh":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","t":"`$STRING`","key$":"send_date","index$":19},"target_delivery_date":{"a":true,"fo":"date-time","h":"Target Delivery Date","n":"target_delivery_date","r":false,"sh":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","t":"`$STRING`","key$":"target_delivery_date","index$":20},"total_count":{"a":true,"h":"Total Count","n":"total_count","r":false,"sh":"Indicates the total number of records.","t":"`$INTEGER`","key$":"total_count","index$":21},"uploads":{"a":true,"h":"Uploads","n":"uploads","r":true,"sh":"A single-element array containing the upload object that is assocated with this campaign.","t":"`$ARRAY`","key$":"uploads","index$":22},"use_type":{"a":true,"h":"Use Type","n":"use_type","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The use type for each mailpiece.","t":"`$STRING`","key$":"use_type","index$":23}},"id":{"field":"id","name":"id"},"name":"campaign","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /campaigns/{cmp_id}/send","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"cmp_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/campaigns/{cmp_id}/send","q":{"$action":"send","exist":["id"]},"r":{"param":{"cmp_id":"id"}},"s":[{"lit":"campaigns"},{"var":"id"},{"lit":"send"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /campaigns","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_lang_output","or":"x_lang_output","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/campaigns","q":{"exist":["x_lang_output"]},"r":{},"s":[{"lit":"campaigns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /campaigns","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before/after","or":"before/after","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"include","or":"include","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/campaigns","q":{"exist":["before/after","include","limit"]},"r":{},"s":[{"lit":"campaigns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /campaigns/{cmp_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"cmp_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/campaigns/{cmp_id}","q":{"exist":["id"]},"r":{"param":{"cmp_id":"id"}},"s":[{"lit":"campaigns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /campaigns/{cmp_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"cmp_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/campaigns/{cmp_id}","q":{"exist":["id"]},"r":{"param":{"cmp_id":"id"}},"s":[{"lit":"campaigns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /campaigns/{cmp_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"cmp_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/campaigns/{cmp_id}","q":{"exist":["id"]},"r":{"param":{"cmp_id":"id"}},"s":[{"lit":"campaigns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"campaign","name__orig":"campaign","Name":"Campaign","name_":"campaign","name-":"campaign","NAME":"CAMPAIGN","index$":7}, {"active":true,"entity":"campaign","key$":"BasicCampaignFlow","kind":"basic","name":"BasicCampaignFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"campaign_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"campaign_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"campaign_ref01","srcdatavar":"campaign_ref01_data","suffix":"_up0","textfield":"billing_group_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-campaign_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"campaign_ref01","srcdatavar":"campaign_ref01_data","suffix":"_dt0"},"m":{"id":"campaign01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-campaign_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"campaign_ref01","suffix":"_rm0"},"m":{"id":"campaign01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"campaign_ref01"}}],"index$":5}]}, 'Campaign', {"POST /campaigns/{cmp_id}/send":{"protocol":"http","parameters":[{"in":"path","name":"cmp_id","description":"id of the campaign","required":true,"schema":{"type":"string","title":"Campaign id","description":"Unique identifier prefixed with `cmp_`.","pattern":"^cmp_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/cmp_id"},"index$":0}]},"POST /campaigns":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","schedule_type","use_type"],"properties":{"billing_group_id":{"description":"Unique identifier prefixed with `bg_`.","nullable":true,"pattern":"^bg_[a-zA-Z0-9]+$","type":"string","key$":"billing_group_id"},"name":{"description":"Name of the campaign.","type":"string","key$":"name"},"description":{"description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","enum":["immediate"],"type":"string","x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","format":"date-time","nullable":true,"type":"string","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","format":"date-time","nullable":true,"type":"string","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","nullable":true,"type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","type":"object","x-ref":"#/components/schemas/metadata","key$":"metadata"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","enum":["marketing","operational",null],"nullable":true,"type":"string","x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"},"print_speed":{"default":"core","description":"A string designating the mail speed type:\n* `core` - 2 production business days\n","enum":["core"],"nullable":true,"type":"string","x-ref":"#/components/schemas/print_speed","key$":"print_speed"}},"x-ref":"#/components/schemas/campaign_writable","index$":1},"example":{"name":"My Demo Campaign","description":"My Campaign's description","schedule_type":"immediate","print_speed":"core"}},"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["name","schedule_type","use_type"],"properties":{"billing_group_id":{"description":"Unique identifier prefixed with `bg_`.","nullable":true,"pattern":"^bg_[a-zA-Z0-9]+$","type":"string","key$":"billing_group_id"},"name":{"description":"Name of the campaign.","type":"string","key$":"name"},"description":{"description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","enum":["immediate"],"type":"string","x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","format":"date-time","nullable":true,"type":"string","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","format":"date-time","nullable":true,"type":"string","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","nullable":true,"type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","type":"object","x-ref":"#/components/schemas/metadata","key$":"metadata"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","enum":["marketing","operational",null],"nullable":true,"type":"string","x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"},"print_speed":{"default":"core","description":"A string designating the mail speed type:\n* `core` - 2 production business days\n","enum":["core"],"nullable":true,"type":"string","x-ref":"#/components/schemas/print_speed","key$":"print_speed"}},"x-ref":"#/components/schemas/campaign_writable"},"encoding":{"example-prop":{"style":"deepObject","explode":true}},"example":{"name":"My Demo Campaign","description":"My Campaign's description","schedule_type":"immediate","print_speed":"core"}},"multipart/form-data":{"schema":{"type":"object","required":["name","schedule_type","use_type"],"properties":{"billing_group_id":{"description":"Unique identifier prefixed with `bg_`.","nullable":true,"pattern":"^bg_[a-zA-Z0-9]+$","type":"string","key$":"billing_group_id"},"name":{"description":"Name of the campaign.","type":"string","key$":"name"},"description":{"description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"type":"string","x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","enum":["immediate"],"type":"string","x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","format":"date-time","nullable":true,"type":"string","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","format":"date-time","nullable":true,"type":"string","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","nullable":true,"type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","type":"object","x-ref":"#/components/schemas/metadata","key$":"metadata"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","enum":["marketing","operational",null],"nullable":true,"type":"string","x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"},"print_speed":{"default":"core","description":"A string designating the mail speed type:\n* `core` - 2 production business days\n","enum":["core"],"nullable":true,"type":"string","x-ref":"#/components/schemas/print_speed","key$":"print_speed"}},"x-ref":"#/components/schemas/campaign_writable"},"example":{"name":"My Demo Campaign","description":"My Campaign's description","schedule_type":"immediate","print_speed":"core"}}}},"parameters":[{"in":"header","name":"x-lang-output","required":false,"description":"* `native` - Translate response to the native language of the country in the request\n* `match` - match the response to the language in the request\n\nDefault response is in English.\n","schema":{"type":"string","enum":["native","match"]},"x-ref":"#/components/parameters/lang_spec","index$":0}]},"GET /campaigns":{"protocol":"http","parameters":[{"in":"query","name":"limit","required":false,"description":"How many results to return.","schema":{"type":"integer","minimum":1,"default":10,"maximum":100,"example":10},"x-ref":"#/components/parameters/limit","index$":0},{"in":"query","name":"include","description":"Request that the response include the total count by specifying `include=[\"total_count\"]`.\n","schema":{"type":"array","items":{"type":"string"}},"explode":true,"x-ref":"#/components/parameters/include","index$":1},{"in":"query","name":"before/after","required":false,"description":"`before` and `after` are both optional but only one of them can be in the query at a time.\n","schema":{"allOf":[{"type":"object","properties":{"before":{"type":"string","description":"A reference to a list entry used for paginating to the previous set of entries. This field is pre-populated in the `previous_url` field in the return response.\n"},"after":{"type":"string","description":"A reference to a list entry used for paginating to the next set of entries. This field is pre-populated in the `next_url` field in the return response.\n"}}},{"oneOf":[{"required":["before"]},{"required":["after"]}]}]},"x-ref":"#/components/parameters/before_after","index$":2}]},"GET /campaigns/{cmp_id}":{"protocol":"http","parameters":[{"in":"path","name":"cmp_id","description":"id of the campaign","required":true,"schema":{"type":"string","title":"Campaign id","description":"Unique identifier prefixed with `cmp_`.","pattern":"^cmp_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/cmp_id"},"index$":0}]},"DELETE /campaigns/{cmp_id}":{"protocol":"http","parameters":[{"in":"path","name":"cmp_id","description":"id of the campaign","required":true,"schema":{"type":"string","title":"Campaign id","description":"Unique identifier prefixed with `cmp_`.","pattern":"^cmp_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/cmp_id"},"index$":0}]},"PATCH /campaigns/{cmp_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"title":"Name","type":"string","key$":"name"},"description":{"type":"string","description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","type":"string","enum":["immediate"],"x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","type":"string","format":"date-time","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","type":"string","format":"date-time","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata","key$":"metadata"},"is_draft":{"description":"Whether or not the campaign is still a draft. Can either be excluded or `false`.","type":"boolean","key$":"is_draft"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","type":"string","enum":["marketing","operational",null],"nullable":true,"x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"}},"x-ref":"#/components/schemas/campaign_updatable","index$":1},"example":{"description":"Test campaign"}},"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"name":{"title":"Name","type":"string","key$":"name"},"description":{"type":"string","description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","type":"string","enum":["immediate"],"x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","type":"string","format":"date-time","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","type":"string","format":"date-time","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata","key$":"metadata"},"is_draft":{"description":"Whether or not the campaign is still a draft. Can either be excluded or `false`.","type":"boolean","key$":"is_draft"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","type":"string","enum":["marketing","operational",null],"nullable":true,"x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"}},"x-ref":"#/components/schemas/campaign_updatable"},"example":{"description":"Test campaign"}},"multipart/form-data":{"schema":{"type":"object","properties":{"name":{"title":"Name","type":"string","key$":"name"},"description":{"type":"string","description":"An internal description that identifies this resource. Must be no longer than 255 characters.\n","maxLength":255,"nullable":true,"x-ref":"#/components/schemas/resource_description","key$":"description"},"schedule_type":{"description":"How the campaign should be scheduled. Only value available today is `immediate`.","type":"string","enum":["immediate"],"x-ref":"#/components/schemas/cmp_schedule_type","key$":"schedule_type"},"target_delivery_date":{"description":"If `schedule_type` is `target_delivery_date`, provide a targeted delivery date for mail pieces in this campaign.","type":"string","format":"date-time","key$":"target_delivery_date"},"send_date":{"description":"If `schedule_type` is `scheduled_send_date`, provide a date to send this campaign.","type":"string","format":"date-time","key$":"send_date"},"cancel_window_campaign_minutes":{"description":"A window, in minutes, within which the campaign can be canceled.","type":"integer","key$":"cancel_window_campaign_minutes"},"metadata":{"type":"object","additionalProperties":{"type":"string"},"description":"Use metadata to store custom information for tagging and labeling back to your internal systems. Must be an object with up to 20 key-value pairs. Keys must be at most 40 characters and values must be at most 500 characters. Neither can contain the characters `\"` and `\\`. i.e. '{\"customer_id\" : \"NEWYORK2015\"}' Nested objects are not supported.  See [Metadata](#section/Metadata) for more information.","maxLength":500,"pattern":"[^\"\\\\]{0,500}","x-ref":"#/components/schemas/metadata","key$":"metadata"},"is_draft":{"description":"Whether or not the campaign is still a draft. Can either be excluded or `false`.","type":"boolean","key$":"is_draft"},"use_type":{"description":"The use type for each mailpiece. Can be one of marketing, operational, or null. Null use_type is only allowed if an account default use_type is selected in Account Settings. For more information on use_type, see our  [Help Center article](https://help.lob.com/print-and-mail/building-a-mail-strategy/managing-mail-settings/declaring-mail-use-type).","type":"string","enum":["marketing","operational",null],"nullable":true,"x-ref":"#/components/schemas/cmp_use_type","key$":"use_type"},"auto_cancel_if_ncoa":{"description":"Whether or not a mail piece should be automatically canceled and not sent if the address is updated via NCOA.","type":"boolean","key$":"auto_cancel_if_ncoa"}},"x-ref":"#/components/schemas/campaign_updatable"},"example":{"description":"Test campaign"}}}},"parameters":[{"in":"path","name":"cmp_id","description":"id of the campaign","required":true,"schema":{"type":"string","title":"Campaign id","description":"Unique identifier prefixed with `cmp_`.","pattern":"^cmp_[a-zA-Z0-9]+$","x-ref":"#/components/schemas/cmp_id"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const campaign_ref01_ent = client.Campaign()
    let campaign_ref01_data = setup.data.new.campaign['campaign_ref01']

    campaign_ref01_data = (await campaign_ref01_ent.create(campaign_ref01_data)).data()
    assert(null != campaign_ref01_data.id)


    // LIST
    const campaign_ref01_match: any = {}

    const campaign_ref01_list = (await campaign_ref01_ent.list(campaign_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(campaign_ref01_list, { id: campaign_ref01_data.id })))


    // UPDATE
    const campaign_ref01_data_up0: any = {}
    campaign_ref01_data_up0.id = campaign_ref01_data.id

    const campaign_ref01_markdef_up0 = { name: 'billing_group_id', value: 'Mark01-campaign_ref01_' + setup.now }
    ;(campaign_ref01_data_up0 as any)[campaign_ref01_markdef_up0.name] = campaign_ref01_markdef_up0.value

    const campaign_ref01_resdata_up0 = (await campaign_ref01_ent.update(campaign_ref01_data_up0)).data()
    assert(campaign_ref01_resdata_up0.id === campaign_ref01_data_up0.id)

    assert((campaign_ref01_resdata_up0 as any)[campaign_ref01_markdef_up0.name] === campaign_ref01_markdef_up0.value)


    // LOAD
    const campaign_ref01_match_dt0: any = {}
    campaign_ref01_match_dt0.id = campaign_ref01_data.id
    const campaign_ref01_data_dt0 = (await campaign_ref01_ent.load(campaign_ref01_match_dt0)).data()
    assert(campaign_ref01_data_dt0.id === campaign_ref01_data.id)


    // REMOVE
    const campaign_ref01_match_rm0: any = { id: campaign_ref01_data.id }
    await campaign_ref01_ent.remove(campaign_ref01_match_rm0)
  

    // LIST
    const campaign_ref01_match_rt0: any = {}

    const campaign_ref01_list_rt0 = (await campaign_ref01_ent.list(campaign_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(campaign_ref01_list_rt0, { id: campaign_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/campaign/CampaignTestData.json')

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
    ['campaign01','campaign02','campaign03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOB_TEST_CAMPAIGN_ENTID': idmap,
    'LOB_TEST_LIVE': 'FALSE',
    'LOB_TEST_EXPLAIN': 'FALSE',
    'LOB_APIKEY': '',
    'LOB_SECRET': '',
  })

  idmap = env['LOB_TEST_CAMPAIGN_ENTID']

  const live = 'TRUE' === env.LOB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOB_TEST_CAMPAIGN_ENTID']
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
  
