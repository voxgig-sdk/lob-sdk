# Lob SDK

from lob_sdk.utility.voxgig_struct import voxgig_struct as vs
from lob_sdk.core.utility_type import LobUtility
from lob_sdk.core.spec import LobSpec
from lob_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from lob_sdk.utility import register

# Load features
from lob_sdk.feature.base_feature import LobBaseFeature
from lob_sdk.features import _has_feature, _make_feature


class LobSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = LobUtility()
        self._utility = utility

        from lob_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return LobUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = LobSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "LobSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("LobSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Address(self, data=None) -> "AddressEntity":
        """Entity factory: client.Address().list() / client.Address().load({"id": ...})."""
        from lob_sdk.entity.address_entity import AddressEntity
        return AddressEntity(self, data)


    def BankAccount(self, data=None) -> "BankAccountEntity":
        """Entity factory: client.BankAccount().list() / client.BankAccount().load({"id": ...})."""
        from lob_sdk.entity.bank_account_entity import BankAccountEntity
        return BankAccountEntity(self, data)


    def BankDeletion(self, data=None) -> "BankDeletionEntity":
        """Entity factory: client.BankDeletion().list() / client.BankDeletion().load({"id": ...})."""
        from lob_sdk.entity.bank_deletion_entity import BankDeletionEntity
        return BankDeletionEntity(self, data)


    def BillingGroup(self, data=None) -> "BillingGroupEntity":
        """Entity factory: client.BillingGroup().list() / client.BillingGroup().load({"id": ...})."""
        from lob_sdk.entity.billing_group_entity import BillingGroupEntity
        return BillingGroupEntity(self, data)


    def Booklet(self, data=None) -> "BookletEntity":
        """Entity factory: client.Booklet().list() / client.Booklet().load({"id": ...})."""
        from lob_sdk.entity.booklet_entity import BookletEntity
        return BookletEntity(self, data)


    def Buckslip(self, data=None) -> "BuckslipEntity":
        """Entity factory: client.Buckslip().list() / client.Buckslip().load({"id": ...})."""
        from lob_sdk.entity.buckslip_entity import BuckslipEntity
        return BuckslipEntity(self, data)


    def BuckslipOrder(self, data=None) -> "BuckslipOrderEntity":
        """Entity factory: client.BuckslipOrder().list() / client.BuckslipOrder().load({"id": ...})."""
        from lob_sdk.entity.buckslip_order_entity import BuckslipOrderEntity
        return BuckslipOrderEntity(self, data)


    def Campaign(self, data=None) -> "CampaignEntity":
        """Entity factory: client.Campaign().list() / client.Campaign().load({"id": ...})."""
        from lob_sdk.entity.campaign_entity import CampaignEntity
        return CampaignEntity(self, data)


    def Card(self, data=None) -> "CardEntity":
        """Entity factory: client.Card().list() / client.Card().load({"id": ...})."""
        from lob_sdk.entity.card_entity import CardEntity
        return CardEntity(self, data)


    def CardOrder(self, data=None) -> "CardOrderEntity":
        """Entity factory: client.CardOrder().list() / client.CardOrder().load({"id": ...})."""
        from lob_sdk.entity.card_order_entity import CardOrderEntity
        return CardOrderEntity(self, data)


    def Check(self, data=None) -> "CheckEntity":
        """Entity factory: client.Check().list() / client.Check().load({"id": ...})."""
        from lob_sdk.entity.check_entity import CheckEntity
        return CheckEntity(self, data)


    def Creative(self, data=None) -> "CreativeEntity":
        """Entity factory: client.Creative().list() / client.Creative().load({"id": ...})."""
        from lob_sdk.entity.creative_entity import CreativeEntity
        return CreativeEntity(self, data)


    def Domain(self, data=None) -> "DomainEntity":
        """Entity factory: client.Domain().list() / client.Domain().load({"id": ...})."""
        from lob_sdk.entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    def IdentityValidation(self, data=None) -> "IdentityValidationEntity":
        """Entity factory: client.IdentityValidation().list() / client.IdentityValidation().load({"id": ...})."""
        from lob_sdk.entity.identity_validation_entity import IdentityValidationEntity
        return IdentityValidationEntity(self, data)


    def IntlVerification(self, data=None) -> "IntlVerificationEntity":
        """Entity factory: client.IntlVerification().list() / client.IntlVerification().load({"id": ...})."""
        from lob_sdk.entity.intl_verification_entity import IntlVerificationEntity
        return IntlVerificationEntity(self, data)


    def Letter(self, data=None) -> "LetterEntity":
        """Entity factory: client.Letter().list() / client.Letter().load({"id": ...})."""
        from lob_sdk.entity.letter_entity import LetterEntity
        return LetterEntity(self, data)


    def Link(self, data=None) -> "LinkEntity":
        """Entity factory: client.Link().list() / client.Link().load({"id": ...})."""
        from lob_sdk.entity.link_entity import LinkEntity
        return LinkEntity(self, data)


    def LobCreditsBalance(self, data=None) -> "LobCreditsBalanceEntity":
        """Entity factory: client.LobCreditsBalance().list() / client.LobCreditsBalance().load({"id": ...})."""
        from lob_sdk.entity.lob_credits_balance_entity import LobCreditsBalanceEntity
        return LobCreditsBalanceEntity(self, data)


    def Postcard(self, data=None) -> "PostcardEntity":
        """Entity factory: client.Postcard().list() / client.Postcard().load({"id": ...})."""
        from lob_sdk.entity.postcard_entity import PostcardEntity
        return PostcardEntity(self, data)


    def QrCode(self, data=None) -> "QrCodeEntity":
        """Entity factory: client.QrCode().list() / client.QrCode().load({"id": ...})."""
        from lob_sdk.entity.qr_code_entity import QrCodeEntity
        return QrCodeEntity(self, data)


    def ResourceProof(self, data=None) -> "ResourceProofEntity":
        """Entity factory: client.ResourceProof().list() / client.ResourceProof().load({"id": ...})."""
        from lob_sdk.entity.resource_proof_entity import ResourceProofEntity
        return ResourceProofEntity(self, data)


    def Response(self, data=None) -> "ResponseEntity":
        """Entity factory: client.Response().list() / client.Response().load({"id": ...})."""
        from lob_sdk.entity.response_entity import ResponseEntity
        return ResponseEntity(self, data)


    def ReverseGeocode(self, data=None) -> "ReverseGeocodeEntity":
        """Entity factory: client.ReverseGeocode().list() / client.ReverseGeocode().load({"id": ...})."""
        from lob_sdk.entity.reverse_geocode_entity import ReverseGeocodeEntity
        return ReverseGeocodeEntity(self, data)


    def SelfMailer(self, data=None) -> "SelfMailerEntity":
        """Entity factory: client.SelfMailer().list() / client.SelfMailer().load({"id": ...})."""
        from lob_sdk.entity.self_mailer_entity import SelfMailerEntity
        return SelfMailerEntity(self, data)


    def SnapPack(self, data=None) -> "SnapPackEntity":
        """Entity factory: client.SnapPack().list() / client.SnapPack().load({"id": ...})."""
        from lob_sdk.entity.snap_pack_entity import SnapPackEntity
        return SnapPackEntity(self, data)


    def Template(self, data=None) -> "TemplateEntity":
        """Entity factory: client.Template().list() / client.Template().load({"id": ...})."""
        from lob_sdk.entity.template_entity import TemplateEntity
        return TemplateEntity(self, data)


    def TemplateVersion(self, data=None) -> "TemplateVersionEntity":
        """Entity factory: client.TemplateVersion().list() / client.TemplateVersion().load({"id": ...})."""
        from lob_sdk.entity.template_version_entity import TemplateVersionEntity
        return TemplateVersionEntity(self, data)


    def TemplateVersionDeletion(self, data=None) -> "TemplateVersionDeletionEntity":
        """Entity factory: client.TemplateVersionDeletion().list() / client.TemplateVersionDeletion().load({"id": ...})."""
        from lob_sdk.entity.template_version_deletion_entity import TemplateVersionDeletionEntity
        return TemplateVersionDeletionEntity(self, data)


    def Upload(self, data=None) -> "UploadEntity":
        """Entity factory: client.Upload().list() / client.Upload().load({"id": ...})."""
        from lob_sdk.entity.upload_entity import UploadEntity
        return UploadEntity(self, data)


    def UploadCreateExport(self, data=None) -> "UploadCreateExportEntity":
        """Entity factory: client.UploadCreateExport().list() / client.UploadCreateExport().load({"id": ...})."""
        from lob_sdk.entity.upload_create_export_entity import UploadCreateExportEntity
        return UploadCreateExportEntity(self, data)


    def UsAutocompletion(self, data=None) -> "UsAutocompletionEntity":
        """Entity factory: client.UsAutocompletion().list() / client.UsAutocompletion().load({"id": ...})."""
        from lob_sdk.entity.us_autocompletion_entity import UsAutocompletionEntity
        return UsAutocompletionEntity(self, data)


    def UsVerification(self, data=None) -> "UsVerificationEntity":
        """Entity factory: client.UsVerification().list() / client.UsVerification().load({"id": ...})."""
        from lob_sdk.entity.us_verification_entity import UsVerificationEntity
        return UsVerificationEntity(self, data)


    def Zip(self, data=None) -> "ZipEntity":
        """Entity factory: client.Zip().list() / client.Zip().load({"id": ...})."""
        from lob_sdk.entity.zip_entity import ZipEntity
        return ZipEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "LobSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from lob_sdk.entity.address_entity import AddressEntity
    from lob_sdk.entity.bank_account_entity import BankAccountEntity
    from lob_sdk.entity.bank_deletion_entity import BankDeletionEntity
    from lob_sdk.entity.billing_group_entity import BillingGroupEntity
    from lob_sdk.entity.booklet_entity import BookletEntity
    from lob_sdk.entity.buckslip_entity import BuckslipEntity
    from lob_sdk.entity.buckslip_order_entity import BuckslipOrderEntity
    from lob_sdk.entity.campaign_entity import CampaignEntity
    from lob_sdk.entity.card_entity import CardEntity
    from lob_sdk.entity.card_order_entity import CardOrderEntity
    from lob_sdk.entity.check_entity import CheckEntity
    from lob_sdk.entity.creative_entity import CreativeEntity
    from lob_sdk.entity.domain_entity import DomainEntity
    from lob_sdk.entity.identity_validation_entity import IdentityValidationEntity
    from lob_sdk.entity.intl_verification_entity import IntlVerificationEntity
    from lob_sdk.entity.letter_entity import LetterEntity
    from lob_sdk.entity.link_entity import LinkEntity
    from lob_sdk.entity.lob_credits_balance_entity import LobCreditsBalanceEntity
    from lob_sdk.entity.postcard_entity import PostcardEntity
    from lob_sdk.entity.qr_code_entity import QrCodeEntity
    from lob_sdk.entity.resource_proof_entity import ResourceProofEntity
    from lob_sdk.entity.response_entity import ResponseEntity
    from lob_sdk.entity.reverse_geocode_entity import ReverseGeocodeEntity
    from lob_sdk.entity.self_mailer_entity import SelfMailerEntity
    from lob_sdk.entity.snap_pack_entity import SnapPackEntity
    from lob_sdk.entity.template_entity import TemplateEntity
    from lob_sdk.entity.template_version_entity import TemplateVersionEntity
    from lob_sdk.entity.template_version_deletion_entity import TemplateVersionDeletionEntity
    from lob_sdk.entity.upload_entity import UploadEntity
    from lob_sdk.entity.upload_create_export_entity import UploadCreateExportEntity
    from lob_sdk.entity.us_autocompletion_entity import UsAutocompletionEntity
    from lob_sdk.entity.us_verification_entity import UsVerificationEntity
    from lob_sdk.entity.zip_entity import ZipEntity
