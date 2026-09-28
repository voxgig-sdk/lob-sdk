<?php
declare(strict_types=1);

// Lob SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class LobSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new LobUtility();
        $this->_utility = $utility;

        $config = LobConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = LobHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = LobHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!LobFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, LobFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return LobUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = LobHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = LobHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = LobHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new LobSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new LobError($op . "_allow",
                "LobSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = LobHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = LobHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new LobError("graphql_error",
                "LobSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_address = null;

    // Canonical facade: $client->Address()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->address()
    // resolves here too.
    public function Address($data = null)
    {
        require_once __DIR__ . '/entity/address_entity.php';
        if ($data === null) {
            if ($this->_address === null) {
                $this->_address = new AddressEntity($this, null);
            }
            return $this->_address;
        }
        return new AddressEntity($this, $data);
    }


    private $_bank_account = null;

    // Canonical facade: $client->BankAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bank_account()
    // resolves here too.
    public function BankAccount($data = null)
    {
        require_once __DIR__ . '/entity/bank_account_entity.php';
        if ($data === null) {
            if ($this->_bank_account === null) {
                $this->_bank_account = new BankAccountEntity($this, null);
            }
            return $this->_bank_account;
        }
        return new BankAccountEntity($this, $data);
    }


    private $_bank_deletion = null;

    // Canonical facade: $client->BankDeletion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->bank_deletion()
    // resolves here too.
    public function BankDeletion($data = null)
    {
        require_once __DIR__ . '/entity/bank_deletion_entity.php';
        if ($data === null) {
            if ($this->_bank_deletion === null) {
                $this->_bank_deletion = new BankDeletionEntity($this, null);
            }
            return $this->_bank_deletion;
        }
        return new BankDeletionEntity($this, $data);
    }


    private $_billing_group = null;

    // Canonical facade: $client->BillingGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing_group()
    // resolves here too.
    public function BillingGroup($data = null)
    {
        require_once __DIR__ . '/entity/billing_group_entity.php';
        if ($data === null) {
            if ($this->_billing_group === null) {
                $this->_billing_group = new BillingGroupEntity($this, null);
            }
            return $this->_billing_group;
        }
        return new BillingGroupEntity($this, $data);
    }


    private $_booklet = null;

    // Canonical facade: $client->Booklet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->booklet()
    // resolves here too.
    public function Booklet($data = null)
    {
        require_once __DIR__ . '/entity/booklet_entity.php';
        if ($data === null) {
            if ($this->_booklet === null) {
                $this->_booklet = new BookletEntity($this, null);
            }
            return $this->_booklet;
        }
        return new BookletEntity($this, $data);
    }


    private $_buckslip = null;

    // Canonical facade: $client->Buckslip()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->buckslip()
    // resolves here too.
    public function Buckslip($data = null)
    {
        require_once __DIR__ . '/entity/buckslip_entity.php';
        if ($data === null) {
            if ($this->_buckslip === null) {
                $this->_buckslip = new BuckslipEntity($this, null);
            }
            return $this->_buckslip;
        }
        return new BuckslipEntity($this, $data);
    }


    private $_buckslip_order = null;

    // Canonical facade: $client->BuckslipOrder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->buckslip_order()
    // resolves here too.
    public function BuckslipOrder($data = null)
    {
        require_once __DIR__ . '/entity/buckslip_order_entity.php';
        if ($data === null) {
            if ($this->_buckslip_order === null) {
                $this->_buckslip_order = new BuckslipOrderEntity($this, null);
            }
            return $this->_buckslip_order;
        }
        return new BuckslipOrderEntity($this, $data);
    }


    private $_campaign = null;

    // Canonical facade: $client->Campaign()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->campaign()
    // resolves here too.
    public function Campaign($data = null)
    {
        require_once __DIR__ . '/entity/campaign_entity.php';
        if ($data === null) {
            if ($this->_campaign === null) {
                $this->_campaign = new CampaignEntity($this, null);
            }
            return $this->_campaign;
        }
        return new CampaignEntity($this, $data);
    }


    private $_card = null;

    // Canonical facade: $client->Card()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card()
    // resolves here too.
    public function Card($data = null)
    {
        require_once __DIR__ . '/entity/card_entity.php';
        if ($data === null) {
            if ($this->_card === null) {
                $this->_card = new CardEntity($this, null);
            }
            return $this->_card;
        }
        return new CardEntity($this, $data);
    }


    private $_card_order = null;

    // Canonical facade: $client->CardOrder()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->card_order()
    // resolves here too.
    public function CardOrder($data = null)
    {
        require_once __DIR__ . '/entity/card_order_entity.php';
        if ($data === null) {
            if ($this->_card_order === null) {
                $this->_card_order = new CardOrderEntity($this, null);
            }
            return $this->_card_order;
        }
        return new CardOrderEntity($this, $data);
    }


    private $_check = null;

    // Canonical facade: $client->Check()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->check()
    // resolves here too.
    public function Check($data = null)
    {
        require_once __DIR__ . '/entity/check_entity.php';
        if ($data === null) {
            if ($this->_check === null) {
                $this->_check = new CheckEntity($this, null);
            }
            return $this->_check;
        }
        return new CheckEntity($this, $data);
    }


    private $_creative = null;

    // Canonical facade: $client->Creative()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->creative()
    // resolves here too.
    public function Creative($data = null)
    {
        require_once __DIR__ . '/entity/creative_entity.php';
        if ($data === null) {
            if ($this->_creative === null) {
                $this->_creative = new CreativeEntity($this, null);
            }
            return $this->_creative;
        }
        return new CreativeEntity($this, $data);
    }


    private $_domain = null;

    // Canonical facade: $client->Domain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain()
    // resolves here too.
    public function Domain($data = null)
    {
        require_once __DIR__ . '/entity/domain_entity.php';
        if ($data === null) {
            if ($this->_domain === null) {
                $this->_domain = new DomainEntity($this, null);
            }
            return $this->_domain;
        }
        return new DomainEntity($this, $data);
    }


    private $_identity_validation = null;

    // Canonical facade: $client->IdentityValidation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->identity_validation()
    // resolves here too.
    public function IdentityValidation($data = null)
    {
        require_once __DIR__ . '/entity/identity_validation_entity.php';
        if ($data === null) {
            if ($this->_identity_validation === null) {
                $this->_identity_validation = new IdentityValidationEntity($this, null);
            }
            return $this->_identity_validation;
        }
        return new IdentityValidationEntity($this, $data);
    }


    private $_intl_verification = null;

    // Canonical facade: $client->IntlVerification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->intl_verification()
    // resolves here too.
    public function IntlVerification($data = null)
    {
        require_once __DIR__ . '/entity/intl_verification_entity.php';
        if ($data === null) {
            if ($this->_intl_verification === null) {
                $this->_intl_verification = new IntlVerificationEntity($this, null);
            }
            return $this->_intl_verification;
        }
        return new IntlVerificationEntity($this, $data);
    }


    private $_letter = null;

    // Canonical facade: $client->Letter()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->letter()
    // resolves here too.
    public function Letter($data = null)
    {
        require_once __DIR__ . '/entity/letter_entity.php';
        if ($data === null) {
            if ($this->_letter === null) {
                $this->_letter = new LetterEntity($this, null);
            }
            return $this->_letter;
        }
        return new LetterEntity($this, $data);
    }


    private $_link = null;

    // Canonical facade: $client->Link()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->link()
    // resolves here too.
    public function Link($data = null)
    {
        require_once __DIR__ . '/entity/link_entity.php';
        if ($data === null) {
            if ($this->_link === null) {
                $this->_link = new LinkEntity($this, null);
            }
            return $this->_link;
        }
        return new LinkEntity($this, $data);
    }


    private $_lob_credits_balance = null;

    // Canonical facade: $client->LobCreditsBalance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lob_credits_balance()
    // resolves here too.
    public function LobCreditsBalance($data = null)
    {
        require_once __DIR__ . '/entity/lob_credits_balance_entity.php';
        if ($data === null) {
            if ($this->_lob_credits_balance === null) {
                $this->_lob_credits_balance = new LobCreditsBalanceEntity($this, null);
            }
            return $this->_lob_credits_balance;
        }
        return new LobCreditsBalanceEntity($this, $data);
    }


    private $_postcard = null;

    // Canonical facade: $client->Postcard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->postcard()
    // resolves here too.
    public function Postcard($data = null)
    {
        require_once __DIR__ . '/entity/postcard_entity.php';
        if ($data === null) {
            if ($this->_postcard === null) {
                $this->_postcard = new PostcardEntity($this, null);
            }
            return $this->_postcard;
        }
        return new PostcardEntity($this, $data);
    }


    private $_qr_code = null;

    // Canonical facade: $client->QrCode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->qr_code()
    // resolves here too.
    public function QrCode($data = null)
    {
        require_once __DIR__ . '/entity/qr_code_entity.php';
        if ($data === null) {
            if ($this->_qr_code === null) {
                $this->_qr_code = new QrCodeEntity($this, null);
            }
            return $this->_qr_code;
        }
        return new QrCodeEntity($this, $data);
    }


    private $_resource_proof = null;

    // Canonical facade: $client->ResourceProof()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resource_proof()
    // resolves here too.
    public function ResourceProof($data = null)
    {
        require_once __DIR__ . '/entity/resource_proof_entity.php';
        if ($data === null) {
            if ($this->_resource_proof === null) {
                $this->_resource_proof = new ResourceProofEntity($this, null);
            }
            return $this->_resource_proof;
        }
        return new ResourceProofEntity($this, $data);
    }


    private $_response = null;

    // Canonical facade: $client->Response()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->response()
    // resolves here too.
    public function Response($data = null)
    {
        require_once __DIR__ . '/entity/response_entity.php';
        if ($data === null) {
            if ($this->_response === null) {
                $this->_response = new ResponseEntity($this, null);
            }
            return $this->_response;
        }
        return new ResponseEntity($this, $data);
    }


    private $_reverse_geocode = null;

    // Canonical facade: $client->ReverseGeocode()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->reverse_geocode()
    // resolves here too.
    public function ReverseGeocode($data = null)
    {
        require_once __DIR__ . '/entity/reverse_geocode_entity.php';
        if ($data === null) {
            if ($this->_reverse_geocode === null) {
                $this->_reverse_geocode = new ReverseGeocodeEntity($this, null);
            }
            return $this->_reverse_geocode;
        }
        return new ReverseGeocodeEntity($this, $data);
    }


    private $_self_mailer = null;

    // Canonical facade: $client->SelfMailer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->self_mailer()
    // resolves here too.
    public function SelfMailer($data = null)
    {
        require_once __DIR__ . '/entity/self_mailer_entity.php';
        if ($data === null) {
            if ($this->_self_mailer === null) {
                $this->_self_mailer = new SelfMailerEntity($this, null);
            }
            return $this->_self_mailer;
        }
        return new SelfMailerEntity($this, $data);
    }


    private $_snap_pack = null;

    // Canonical facade: $client->SnapPack()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->snap_pack()
    // resolves here too.
    public function SnapPack($data = null)
    {
        require_once __DIR__ . '/entity/snap_pack_entity.php';
        if ($data === null) {
            if ($this->_snap_pack === null) {
                $this->_snap_pack = new SnapPackEntity($this, null);
            }
            return $this->_snap_pack;
        }
        return new SnapPackEntity($this, $data);
    }


    private $_template = null;

    // Canonical facade: $client->Template()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template()
    // resolves here too.
    public function Template($data = null)
    {
        require_once __DIR__ . '/entity/template_entity.php';
        if ($data === null) {
            if ($this->_template === null) {
                $this->_template = new TemplateEntity($this, null);
            }
            return $this->_template;
        }
        return new TemplateEntity($this, $data);
    }


    private $_template_version = null;

    // Canonical facade: $client->TemplateVersion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template_version()
    // resolves here too.
    public function TemplateVersion($data = null)
    {
        require_once __DIR__ . '/entity/template_version_entity.php';
        if ($data === null) {
            if ($this->_template_version === null) {
                $this->_template_version = new TemplateVersionEntity($this, null);
            }
            return $this->_template_version;
        }
        return new TemplateVersionEntity($this, $data);
    }


    private $_template_version_deletion = null;

    // Canonical facade: $client->TemplateVersionDeletion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->template_version_deletion()
    // resolves here too.
    public function TemplateVersionDeletion($data = null)
    {
        require_once __DIR__ . '/entity/template_version_deletion_entity.php';
        if ($data === null) {
            if ($this->_template_version_deletion === null) {
                $this->_template_version_deletion = new TemplateVersionDeletionEntity($this, null);
            }
            return $this->_template_version_deletion;
        }
        return new TemplateVersionDeletionEntity($this, $data);
    }


    private $_upload = null;

    // Canonical facade: $client->Upload()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->upload()
    // resolves here too.
    public function Upload($data = null)
    {
        require_once __DIR__ . '/entity/upload_entity.php';
        if ($data === null) {
            if ($this->_upload === null) {
                $this->_upload = new UploadEntity($this, null);
            }
            return $this->_upload;
        }
        return new UploadEntity($this, $data);
    }


    private $_upload_create_export = null;

    // Canonical facade: $client->UploadCreateExport()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->upload_create_export()
    // resolves here too.
    public function UploadCreateExport($data = null)
    {
        require_once __DIR__ . '/entity/upload_create_export_entity.php';
        if ($data === null) {
            if ($this->_upload_create_export === null) {
                $this->_upload_create_export = new UploadCreateExportEntity($this, null);
            }
            return $this->_upload_create_export;
        }
        return new UploadCreateExportEntity($this, $data);
    }


    private $_us_autocompletion = null;

    // Canonical facade: $client->UsAutocompletion()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->us_autocompletion()
    // resolves here too.
    public function UsAutocompletion($data = null)
    {
        require_once __DIR__ . '/entity/us_autocompletion_entity.php';
        if ($data === null) {
            if ($this->_us_autocompletion === null) {
                $this->_us_autocompletion = new UsAutocompletionEntity($this, null);
            }
            return $this->_us_autocompletion;
        }
        return new UsAutocompletionEntity($this, $data);
    }


    private $_us_verification = null;

    // Canonical facade: $client->UsVerification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->us_verification()
    // resolves here too.
    public function UsVerification($data = null)
    {
        require_once __DIR__ . '/entity/us_verification_entity.php';
        if ($data === null) {
            if ($this->_us_verification === null) {
                $this->_us_verification = new UsVerificationEntity($this, null);
            }
            return $this->_us_verification;
        }
        return new UsVerificationEntity($this, $data);
    }


    private $_zip = null;

    // Canonical facade: $client->Zip()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->zip()
    // resolves here too.
    public function Zip($data = null)
    {
        require_once __DIR__ . '/entity/zip_entity.php';
        if ($data === null) {
            if ($this->_zip === null) {
                $this->_zip = new ZipEntity($this, null);
            }
            return $this->_zip;
        }
        return new ZipEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new LobSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
