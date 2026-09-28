package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/lob-sdk/go/utility/struct"
)

type LobSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewLobSDK(options map[string]any) *LobSDK {
	sdk := &LobSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *LobSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *LobSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *LobSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *LobSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *LobSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *LobSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *LobSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("LobSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *LobSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

func (sdk *LobSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("LobSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Address returns a Address entity bound to this client.
// Idiomatic usage: client.Address(nil).List(nil, nil) or
// client.Address(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Address(data map[string]any) LobEntity {
	return NewAddressEntityFunc(sdk, data)
}


// BankAccount returns a BankAccount entity bound to this client.
// Idiomatic usage: client.BankAccount(nil).List(nil, nil) or
// client.BankAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) BankAccount(data map[string]any) LobEntity {
	return NewBankAccountEntityFunc(sdk, data)
}


// BankDeletion returns a BankDeletion entity bound to this client.
// Idiomatic usage: client.BankDeletion(nil).List(nil, nil) or
// client.BankDeletion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) BankDeletion(data map[string]any) LobEntity {
	return NewBankDeletionEntityFunc(sdk, data)
}


// BillingGroup returns a BillingGroup entity bound to this client.
// Idiomatic usage: client.BillingGroup(nil).List(nil, nil) or
// client.BillingGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) BillingGroup(data map[string]any) LobEntity {
	return NewBillingGroupEntityFunc(sdk, data)
}


// Booklet returns a Booklet entity bound to this client.
// Idiomatic usage: client.Booklet(nil).List(nil, nil) or
// client.Booklet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Booklet(data map[string]any) LobEntity {
	return NewBookletEntityFunc(sdk, data)
}


// Buckslip returns a Buckslip entity bound to this client.
// Idiomatic usage: client.Buckslip(nil).List(nil, nil) or
// client.Buckslip(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Buckslip(data map[string]any) LobEntity {
	return NewBuckslipEntityFunc(sdk, data)
}


// BuckslipOrder returns a BuckslipOrder entity bound to this client.
// Idiomatic usage: client.BuckslipOrder(nil).List(nil, nil) or
// client.BuckslipOrder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) BuckslipOrder(data map[string]any) LobEntity {
	return NewBuckslipOrderEntityFunc(sdk, data)
}


// Campaign returns a Campaign entity bound to this client.
// Idiomatic usage: client.Campaign(nil).List(nil, nil) or
// client.Campaign(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Campaign(data map[string]any) LobEntity {
	return NewCampaignEntityFunc(sdk, data)
}


// Card returns a Card entity bound to this client.
// Idiomatic usage: client.Card(nil).List(nil, nil) or
// client.Card(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Card(data map[string]any) LobEntity {
	return NewCardEntityFunc(sdk, data)
}


// CardOrder returns a CardOrder entity bound to this client.
// Idiomatic usage: client.CardOrder(nil).List(nil, nil) or
// client.CardOrder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) CardOrder(data map[string]any) LobEntity {
	return NewCardOrderEntityFunc(sdk, data)
}


// Check returns a Check entity bound to this client.
// Idiomatic usage: client.Check(nil).List(nil, nil) or
// client.Check(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Check(data map[string]any) LobEntity {
	return NewCheckEntityFunc(sdk, data)
}


// Creative returns a Creative entity bound to this client.
// Idiomatic usage: client.Creative(nil).List(nil, nil) or
// client.Creative(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Creative(data map[string]any) LobEntity {
	return NewCreativeEntityFunc(sdk, data)
}


// Domain returns a Domain entity bound to this client.
// Idiomatic usage: client.Domain(nil).List(nil, nil) or
// client.Domain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Domain(data map[string]any) LobEntity {
	return NewDomainEntityFunc(sdk, data)
}


// IdentityValidation returns a IdentityValidation entity bound to this client.
// Idiomatic usage: client.IdentityValidation(nil).List(nil, nil) or
// client.IdentityValidation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) IdentityValidation(data map[string]any) LobEntity {
	return NewIdentityValidationEntityFunc(sdk, data)
}


// IntlVerification returns a IntlVerification entity bound to this client.
// Idiomatic usage: client.IntlVerification(nil).List(nil, nil) or
// client.IntlVerification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) IntlVerification(data map[string]any) LobEntity {
	return NewIntlVerificationEntityFunc(sdk, data)
}


// Letter returns a Letter entity bound to this client.
// Idiomatic usage: client.Letter(nil).List(nil, nil) or
// client.Letter(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Letter(data map[string]any) LobEntity {
	return NewLetterEntityFunc(sdk, data)
}


// Link returns a Link entity bound to this client.
// Idiomatic usage: client.Link(nil).List(nil, nil) or
// client.Link(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Link(data map[string]any) LobEntity {
	return NewLinkEntityFunc(sdk, data)
}


// LobCreditsBalance returns a LobCreditsBalance entity bound to this client.
// Idiomatic usage: client.LobCreditsBalance(nil).List(nil, nil) or
// client.LobCreditsBalance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) LobCreditsBalance(data map[string]any) LobEntity {
	return NewLobCreditsBalanceEntityFunc(sdk, data)
}


// Postcard returns a Postcard entity bound to this client.
// Idiomatic usage: client.Postcard(nil).List(nil, nil) or
// client.Postcard(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Postcard(data map[string]any) LobEntity {
	return NewPostcardEntityFunc(sdk, data)
}


// QrCode returns a QrCode entity bound to this client.
// Idiomatic usage: client.QrCode(nil).List(nil, nil) or
// client.QrCode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) QrCode(data map[string]any) LobEntity {
	return NewQrCodeEntityFunc(sdk, data)
}


// ResourceProof returns a ResourceProof entity bound to this client.
// Idiomatic usage: client.ResourceProof(nil).List(nil, nil) or
// client.ResourceProof(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) ResourceProof(data map[string]any) LobEntity {
	return NewResourceProofEntityFunc(sdk, data)
}


// Response returns a Response entity bound to this client.
// Idiomatic usage: client.Response(nil).List(nil, nil) or
// client.Response(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Response(data map[string]any) LobEntity {
	return NewResponseEntityFunc(sdk, data)
}


// ReverseGeocode returns a ReverseGeocode entity bound to this client.
// Idiomatic usage: client.ReverseGeocode(nil).List(nil, nil) or
// client.ReverseGeocode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) ReverseGeocode(data map[string]any) LobEntity {
	return NewReverseGeocodeEntityFunc(sdk, data)
}


// SelfMailer returns a SelfMailer entity bound to this client.
// Idiomatic usage: client.SelfMailer(nil).List(nil, nil) or
// client.SelfMailer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) SelfMailer(data map[string]any) LobEntity {
	return NewSelfMailerEntityFunc(sdk, data)
}


// SnapPack returns a SnapPack entity bound to this client.
// Idiomatic usage: client.SnapPack(nil).List(nil, nil) or
// client.SnapPack(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) SnapPack(data map[string]any) LobEntity {
	return NewSnapPackEntityFunc(sdk, data)
}


// Template returns a Template entity bound to this client.
// Idiomatic usage: client.Template(nil).List(nil, nil) or
// client.Template(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Template(data map[string]any) LobEntity {
	return NewTemplateEntityFunc(sdk, data)
}


// TemplateVersion returns a TemplateVersion entity bound to this client.
// Idiomatic usage: client.TemplateVersion(nil).List(nil, nil) or
// client.TemplateVersion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) TemplateVersion(data map[string]any) LobEntity {
	return NewTemplateVersionEntityFunc(sdk, data)
}


// TemplateVersionDeletion returns a TemplateVersionDeletion entity bound to this client.
// Idiomatic usage: client.TemplateVersionDeletion(nil).List(nil, nil) or
// client.TemplateVersionDeletion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) TemplateVersionDeletion(data map[string]any) LobEntity {
	return NewTemplateVersionDeletionEntityFunc(sdk, data)
}


// Upload returns a Upload entity bound to this client.
// Idiomatic usage: client.Upload(nil).List(nil, nil) or
// client.Upload(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Upload(data map[string]any) LobEntity {
	return NewUploadEntityFunc(sdk, data)
}


// UploadCreateExport returns a UploadCreateExport entity bound to this client.
// Idiomatic usage: client.UploadCreateExport(nil).List(nil, nil) or
// client.UploadCreateExport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) UploadCreateExport(data map[string]any) LobEntity {
	return NewUploadCreateExportEntityFunc(sdk, data)
}


// UsAutocompletion returns a UsAutocompletion entity bound to this client.
// Idiomatic usage: client.UsAutocompletion(nil).List(nil, nil) or
// client.UsAutocompletion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) UsAutocompletion(data map[string]any) LobEntity {
	return NewUsAutocompletionEntityFunc(sdk, data)
}


// UsVerification returns a UsVerification entity bound to this client.
// Idiomatic usage: client.UsVerification(nil).List(nil, nil) or
// client.UsVerification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) UsVerification(data map[string]any) LobEntity {
	return NewUsVerificationEntityFunc(sdk, data)
}


// Zip returns a Zip entity bound to this client.
// Idiomatic usage: client.Zip(nil).List(nil, nil) or
// client.Zip(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LobSDK) Zip(data map[string]any) LobEntity {
	return NewZipEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *LobSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewLobSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
