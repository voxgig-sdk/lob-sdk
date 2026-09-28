// Lob Ts SDK

import { AddressEntity } from './entity/AddressEntity'
import { BankAccountEntity } from './entity/BankAccountEntity'
import { BankDeletionEntity } from './entity/BankDeletionEntity'
import { BillingGroupEntity } from './entity/BillingGroupEntity'
import { BookletEntity } from './entity/BookletEntity'
import { BuckslipEntity } from './entity/BuckslipEntity'
import { BuckslipOrderEntity } from './entity/BuckslipOrderEntity'
import { CampaignEntity } from './entity/CampaignEntity'
import { CardEntity } from './entity/CardEntity'
import { CardOrderEntity } from './entity/CardOrderEntity'
import { CheckEntity } from './entity/CheckEntity'
import { CreativeEntity } from './entity/CreativeEntity'
import { DomainEntity } from './entity/DomainEntity'
import { IdentityValidationEntity } from './entity/IdentityValidationEntity'
import { IntlVerificationEntity } from './entity/IntlVerificationEntity'
import { LetterEntity } from './entity/LetterEntity'
import { LinkEntity } from './entity/LinkEntity'
import { LobCreditsBalanceEntity } from './entity/LobCreditsBalanceEntity'
import { PostcardEntity } from './entity/PostcardEntity'
import { QrCodeEntity } from './entity/QrCodeEntity'
import { ResourceProofEntity } from './entity/ResourceProofEntity'
import { ResponseEntity } from './entity/ResponseEntity'
import { ReverseGeocodeEntity } from './entity/ReverseGeocodeEntity'
import { SelfMailerEntity } from './entity/SelfMailerEntity'
import { SnapPackEntity } from './entity/SnapPackEntity'
import { TemplateEntity } from './entity/TemplateEntity'
import { TemplateVersionEntity } from './entity/TemplateVersionEntity'
import { TemplateVersionDeletionEntity } from './entity/TemplateVersionDeletionEntity'
import { UploadEntity } from './entity/UploadEntity'
import { UploadCreateExportEntity } from './entity/UploadCreateExportEntity'
import { UsAutocompletionEntity } from './entity/UsAutocompletionEntity'
import { UsVerificationEntity } from './entity/UsVerificationEntity'
import { ZipEntity } from './entity/ZipEntity'

export type * from './LobTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { LobEntityBase } from './LobEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class LobSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('LobSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('LobSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('LobSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Address().list()` / `client.Address().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Address(entopts?: Record<string, any>) {
    const self = this
    return new AddressEntity(self, entopts)
  }


  // Entity access: `client.BankAccount().list()` / `client.BankAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BankAccount(entopts?: Record<string, any>) {
    const self = this
    return new BankAccountEntity(self, entopts)
  }


  // Entity access: `client.BankDeletion().list()` / `client.BankDeletion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BankDeletion(entopts?: Record<string, any>) {
    const self = this
    return new BankDeletionEntity(self, entopts)
  }


  // Entity access: `client.BillingGroup().list()` / `client.BillingGroup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BillingGroup(entopts?: Record<string, any>) {
    const self = this
    return new BillingGroupEntity(self, entopts)
  }


  // Entity access: `client.Booklet().list()` / `client.Booklet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Booklet(entopts?: Record<string, any>) {
    const self = this
    return new BookletEntity(self, entopts)
  }


  // Entity access: `client.Buckslip().list()` / `client.Buckslip().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Buckslip(entopts?: Record<string, any>) {
    const self = this
    return new BuckslipEntity(self, entopts)
  }


  // Entity access: `client.BuckslipOrder().list()` / `client.BuckslipOrder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BuckslipOrder(entopts?: Record<string, any>) {
    const self = this
    return new BuckslipOrderEntity(self, entopts)
  }


  // Entity access: `client.Campaign().list()` / `client.Campaign().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Campaign(entopts?: Record<string, any>) {
    const self = this
    return new CampaignEntity(self, entopts)
  }


  // Entity access: `client.Card().list()` / `client.Card().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Card(entopts?: Record<string, any>) {
    const self = this
    return new CardEntity(self, entopts)
  }


  // Entity access: `client.CardOrder().list()` / `client.CardOrder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardOrder(entopts?: Record<string, any>) {
    const self = this
    return new CardOrderEntity(self, entopts)
  }


  // Entity access: `client.Check().list()` / `client.Check().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Check(entopts?: Record<string, any>) {
    const self = this
    return new CheckEntity(self, entopts)
  }


  // Entity access: `client.Creative().list()` / `client.Creative().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Creative(entopts?: Record<string, any>) {
    const self = this
    return new CreativeEntity(self, entopts)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Domain(entopts?: Record<string, any>) {
    const self = this
    return new DomainEntity(self, entopts)
  }


  // Entity access: `client.IdentityValidation().list()` / `client.IdentityValidation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IdentityValidation(entopts?: Record<string, any>) {
    const self = this
    return new IdentityValidationEntity(self, entopts)
  }


  // Entity access: `client.IntlVerification().list()` / `client.IntlVerification().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IntlVerification(entopts?: Record<string, any>) {
    const self = this
    return new IntlVerificationEntity(self, entopts)
  }


  // Entity access: `client.Letter().list()` / `client.Letter().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Letter(entopts?: Record<string, any>) {
    const self = this
    return new LetterEntity(self, entopts)
  }


  // Entity access: `client.Link().list()` / `client.Link().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Link(entopts?: Record<string, any>) {
    const self = this
    return new LinkEntity(self, entopts)
  }


  // Entity access: `client.LobCreditsBalance().list()` / `client.LobCreditsBalance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LobCreditsBalance(entopts?: Record<string, any>) {
    const self = this
    return new LobCreditsBalanceEntity(self, entopts)
  }


  // Entity access: `client.Postcard().list()` / `client.Postcard().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Postcard(entopts?: Record<string, any>) {
    const self = this
    return new PostcardEntity(self, entopts)
  }


  // Entity access: `client.QrCode().list()` / `client.QrCode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  QrCode(entopts?: Record<string, any>) {
    const self = this
    return new QrCodeEntity(self, entopts)
  }


  // Entity access: `client.ResourceProof().list()` / `client.ResourceProof().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ResourceProof(entopts?: Record<string, any>) {
    const self = this
    return new ResourceProofEntity(self, entopts)
  }


  // Entity access: `client.Response().list()` / `client.Response().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Response(entopts?: Record<string, any>) {
    const self = this
    return new ResponseEntity(self, entopts)
  }


  // Entity access: `client.ReverseGeocode().list()` / `client.ReverseGeocode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ReverseGeocode(entopts?: Record<string, any>) {
    const self = this
    return new ReverseGeocodeEntity(self, entopts)
  }


  // Entity access: `client.SelfMailer().list()` / `client.SelfMailer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SelfMailer(entopts?: Record<string, any>) {
    const self = this
    return new SelfMailerEntity(self, entopts)
  }


  // Entity access: `client.SnapPack().list()` / `client.SnapPack().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SnapPack(entopts?: Record<string, any>) {
    const self = this
    return new SnapPackEntity(self, entopts)
  }


  // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Template(entopts?: Record<string, any>) {
    const self = this
    return new TemplateEntity(self, entopts)
  }


  // Entity access: `client.TemplateVersion().list()` / `client.TemplateVersion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TemplateVersion(entopts?: Record<string, any>) {
    const self = this
    return new TemplateVersionEntity(self, entopts)
  }


  // Entity access: `client.TemplateVersionDeletion().list()` / `client.TemplateVersionDeletion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TemplateVersionDeletion(entopts?: Record<string, any>) {
    const self = this
    return new TemplateVersionDeletionEntity(self, entopts)
  }


  // Entity access: `client.Upload().list()` / `client.Upload().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Upload(entopts?: Record<string, any>) {
    const self = this
    return new UploadEntity(self, entopts)
  }


  // Entity access: `client.UploadCreateExport().list()` / `client.UploadCreateExport().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UploadCreateExport(entopts?: Record<string, any>) {
    const self = this
    return new UploadCreateExportEntity(self, entopts)
  }


  // Entity access: `client.UsAutocompletion().list()` / `client.UsAutocompletion().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsAutocompletion(entopts?: Record<string, any>) {
    const self = this
    return new UsAutocompletionEntity(self, entopts)
  }


  // Entity access: `client.UsVerification().list()` / `client.UsVerification().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UsVerification(entopts?: Record<string, any>) {
    const self = this
    return new UsVerificationEntity(self, entopts)
  }


  // Entity access: `client.Zip().list()` / `client.Zip().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Zip(entopts?: Record<string, any>) {
    const self = this
    return new ZipEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new LobSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return LobSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Lob' }
  }

  toString() {
    return 'Lob ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = LobSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  LobEntityBase,

  LobSDK,
  SDK,
}


