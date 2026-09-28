"use strict";
// Lob Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.LobSDK = exports.LobEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AddressEntity_1 = require("./entity/AddressEntity");
const BankAccountEntity_1 = require("./entity/BankAccountEntity");
const BankDeletionEntity_1 = require("./entity/BankDeletionEntity");
const BillingGroupEntity_1 = require("./entity/BillingGroupEntity");
const BookletEntity_1 = require("./entity/BookletEntity");
const BuckslipEntity_1 = require("./entity/BuckslipEntity");
const BuckslipOrderEntity_1 = require("./entity/BuckslipOrderEntity");
const CampaignEntity_1 = require("./entity/CampaignEntity");
const CardEntity_1 = require("./entity/CardEntity");
const CardOrderEntity_1 = require("./entity/CardOrderEntity");
const CheckEntity_1 = require("./entity/CheckEntity");
const CreativeEntity_1 = require("./entity/CreativeEntity");
const DomainEntity_1 = require("./entity/DomainEntity");
const IdentityValidationEntity_1 = require("./entity/IdentityValidationEntity");
const IntlVerificationEntity_1 = require("./entity/IntlVerificationEntity");
const LetterEntity_1 = require("./entity/LetterEntity");
const LinkEntity_1 = require("./entity/LinkEntity");
const LobCreditsBalanceEntity_1 = require("./entity/LobCreditsBalanceEntity");
const PostcardEntity_1 = require("./entity/PostcardEntity");
const QrCodeEntity_1 = require("./entity/QrCodeEntity");
const ResourceProofEntity_1 = require("./entity/ResourceProofEntity");
const ResponseEntity_1 = require("./entity/ResponseEntity");
const ReverseGeocodeEntity_1 = require("./entity/ReverseGeocodeEntity");
const SelfMailerEntity_1 = require("./entity/SelfMailerEntity");
const SnapPackEntity_1 = require("./entity/SnapPackEntity");
const TemplateEntity_1 = require("./entity/TemplateEntity");
const TemplateVersionEntity_1 = require("./entity/TemplateVersionEntity");
const TemplateVersionDeletionEntity_1 = require("./entity/TemplateVersionDeletionEntity");
const UploadEntity_1 = require("./entity/UploadEntity");
const UploadCreateExportEntity_1 = require("./entity/UploadCreateExportEntity");
const UsAutocompletionEntity_1 = require("./entity/UsAutocompletionEntity");
const UsVerificationEntity_1 = require("./entity/UsVerificationEntity");
const ZipEntity_1 = require("./entity/ZipEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const LobEntityBase_1 = require("./LobEntityBase");
Object.defineProperty(exports, "LobEntityBase", { enumerable: true, get: function () { return LobEntityBase_1.LobEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class LobSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
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
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('LobSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('LobSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('LobSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Address().list()` / `client.Address().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Address(entopts) {
        const self = this;
        return new AddressEntity_1.AddressEntity(self, entopts);
    }
    // Entity access: `client.BankAccount().list()` / `client.BankAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BankAccount(entopts) {
        const self = this;
        return new BankAccountEntity_1.BankAccountEntity(self, entopts);
    }
    // Entity access: `client.BankDeletion().list()` / `client.BankDeletion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BankDeletion(entopts) {
        const self = this;
        return new BankDeletionEntity_1.BankDeletionEntity(self, entopts);
    }
    // Entity access: `client.BillingGroup().list()` / `client.BillingGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BillingGroup(entopts) {
        const self = this;
        return new BillingGroupEntity_1.BillingGroupEntity(self, entopts);
    }
    // Entity access: `client.Booklet().list()` / `client.Booklet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Booklet(entopts) {
        const self = this;
        return new BookletEntity_1.BookletEntity(self, entopts);
    }
    // Entity access: `client.Buckslip().list()` / `client.Buckslip().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Buckslip(entopts) {
        const self = this;
        return new BuckslipEntity_1.BuckslipEntity(self, entopts);
    }
    // Entity access: `client.BuckslipOrder().list()` / `client.BuckslipOrder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BuckslipOrder(entopts) {
        const self = this;
        return new BuckslipOrderEntity_1.BuckslipOrderEntity(self, entopts);
    }
    // Entity access: `client.Campaign().list()` / `client.Campaign().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Campaign(entopts) {
        const self = this;
        return new CampaignEntity_1.CampaignEntity(self, entopts);
    }
    // Entity access: `client.Card().list()` / `client.Card().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Card(entopts) {
        const self = this;
        return new CardEntity_1.CardEntity(self, entopts);
    }
    // Entity access: `client.CardOrder().list()` / `client.CardOrder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardOrder(entopts) {
        const self = this;
        return new CardOrderEntity_1.CardOrderEntity(self, entopts);
    }
    // Entity access: `client.Check().list()` / `client.Check().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Check(entopts) {
        const self = this;
        return new CheckEntity_1.CheckEntity(self, entopts);
    }
    // Entity access: `client.Creative().list()` / `client.Creative().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Creative(entopts) {
        const self = this;
        return new CreativeEntity_1.CreativeEntity(self, entopts);
    }
    // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Domain(entopts) {
        const self = this;
        return new DomainEntity_1.DomainEntity(self, entopts);
    }
    // Entity access: `client.IdentityValidation().list()` / `client.IdentityValidation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IdentityValidation(entopts) {
        const self = this;
        return new IdentityValidationEntity_1.IdentityValidationEntity(self, entopts);
    }
    // Entity access: `client.IntlVerification().list()` / `client.IntlVerification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IntlVerification(entopts) {
        const self = this;
        return new IntlVerificationEntity_1.IntlVerificationEntity(self, entopts);
    }
    // Entity access: `client.Letter().list()` / `client.Letter().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Letter(entopts) {
        const self = this;
        return new LetterEntity_1.LetterEntity(self, entopts);
    }
    // Entity access: `client.Link().list()` / `client.Link().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Link(entopts) {
        const self = this;
        return new LinkEntity_1.LinkEntity(self, entopts);
    }
    // Entity access: `client.LobCreditsBalance().list()` / `client.LobCreditsBalance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LobCreditsBalance(entopts) {
        const self = this;
        return new LobCreditsBalanceEntity_1.LobCreditsBalanceEntity(self, entopts);
    }
    // Entity access: `client.Postcard().list()` / `client.Postcard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Postcard(entopts) {
        const self = this;
        return new PostcardEntity_1.PostcardEntity(self, entopts);
    }
    // Entity access: `client.QrCode().list()` / `client.QrCode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    QrCode(entopts) {
        const self = this;
        return new QrCodeEntity_1.QrCodeEntity(self, entopts);
    }
    // Entity access: `client.ResourceProof().list()` / `client.ResourceProof().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResourceProof(entopts) {
        const self = this;
        return new ResourceProofEntity_1.ResourceProofEntity(self, entopts);
    }
    // Entity access: `client.Response().list()` / `client.Response().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Response(entopts) {
        const self = this;
        return new ResponseEntity_1.ResponseEntity(self, entopts);
    }
    // Entity access: `client.ReverseGeocode().list()` / `client.ReverseGeocode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReverseGeocode(entopts) {
        const self = this;
        return new ReverseGeocodeEntity_1.ReverseGeocodeEntity(self, entopts);
    }
    // Entity access: `client.SelfMailer().list()` / `client.SelfMailer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SelfMailer(entopts) {
        const self = this;
        return new SelfMailerEntity_1.SelfMailerEntity(self, entopts);
    }
    // Entity access: `client.SnapPack().list()` / `client.SnapPack().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SnapPack(entopts) {
        const self = this;
        return new SnapPackEntity_1.SnapPackEntity(self, entopts);
    }
    // Entity access: `client.Template().list()` / `client.Template().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Template(entopts) {
        const self = this;
        return new TemplateEntity_1.TemplateEntity(self, entopts);
    }
    // Entity access: `client.TemplateVersion().list()` / `client.TemplateVersion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TemplateVersion(entopts) {
        const self = this;
        return new TemplateVersionEntity_1.TemplateVersionEntity(self, entopts);
    }
    // Entity access: `client.TemplateVersionDeletion().list()` / `client.TemplateVersionDeletion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TemplateVersionDeletion(entopts) {
        const self = this;
        return new TemplateVersionDeletionEntity_1.TemplateVersionDeletionEntity(self, entopts);
    }
    // Entity access: `client.Upload().list()` / `client.Upload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Upload(entopts) {
        const self = this;
        return new UploadEntity_1.UploadEntity(self, entopts);
    }
    // Entity access: `client.UploadCreateExport().list()` / `client.UploadCreateExport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UploadCreateExport(entopts) {
        const self = this;
        return new UploadCreateExportEntity_1.UploadCreateExportEntity(self, entopts);
    }
    // Entity access: `client.UsAutocompletion().list()` / `client.UsAutocompletion().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UsAutocompletion(entopts) {
        const self = this;
        return new UsAutocompletionEntity_1.UsAutocompletionEntity(self, entopts);
    }
    // Entity access: `client.UsVerification().list()` / `client.UsVerification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UsVerification(entopts) {
        const self = this;
        return new UsVerificationEntity_1.UsVerificationEntity(self, entopts);
    }
    // Entity access: `client.Zip().list()` / `client.Zip().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Zip(entopts) {
        const self = this;
        return new ZipEntity_1.ZipEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new LobSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return LobSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Lob' };
    }
    toString() {
        return 'Lob ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.LobSDK = LobSDK;
const SDK = LobSDK;
exports.SDK = SDK;
//# sourceMappingURL=LobSDK.js.map