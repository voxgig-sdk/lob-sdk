package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/lob-sdk/go"
)

// Args is the common argument shape for both tools. `entity` selects
// the SDK entity to operate on; `query` is the optional reqmatch /
// reqdata map passed through to the SDK. For load, `query` should be
// `{"id": <value>}`. For list, omit `query` or pass an empty map.
type Args struct {
	Entity string         `json:"entity" jsonschema:"address | bank_account | bank_deletion | billing_group | booklet | buckslip | buckslip_order | campaign | card | card_order | check | creative | domain | identity_validation | intl_verification | letter | link | lob_credits_balance | postcard | qr_code | resource_proof | response | reverse_geocode | self_mailer | snap_pack | template | template_version | template_version_deletion | upload | upload_create_export | us_autocompletion | us_verification | zip"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional match map e.g. {\"id\":1} for load, omit for list"`
}

func registerTools(server *mcp.Server, client *sdk.LobSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name: "lob_list",
		Description: "List records from Lob. " +
			"Args: entity (one of the supported SDK entities), query (optional filter map). " +
			"Returns the first page of records as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "list", args)
	})

	mcp.AddTool(server, &mcp.Tool{
		Name: "lob_load",
		Description: "Load a single record from Lob. " +
			"Args: entity, query ({\"id\":N} required). Returns the record as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "load", args)
	})
}

func runOp(client *sdk.LobSDK, op string, args Args) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, args.Entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(args.Query, nil)
	case "load":
		result, err = ent.Load(args.Query, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.LobSDK, name string) (sdk.LobEntity, error) {
	switch strings.ToLower(name) {
	case "address":
		return client.Address(nil), nil
	case "bank_account":
		return client.BankAccount(nil), nil
	case "bank_deletion":
		return client.BankDeletion(nil), nil
	case "billing_group":
		return client.BillingGroup(nil), nil
	case "booklet":
		return client.Booklet(nil), nil
	case "buckslip":
		return client.Buckslip(nil), nil
	case "buckslip_order":
		return client.BuckslipOrder(nil), nil
	case "campaign":
		return client.Campaign(nil), nil
	case "card":
		return client.Card(nil), nil
	case "card_order":
		return client.CardOrder(nil), nil
	case "check":
		return client.Check(nil), nil
	case "creative":
		return client.Creative(nil), nil
	case "domain":
		return client.Domain(nil), nil
	case "identity_validation":
		return client.IdentityValidation(nil), nil
	case "intl_verification":
		return client.IntlVerification(nil), nil
	case "letter":
		return client.Letter(nil), nil
	case "link":
		return client.Link(nil), nil
	case "lob_credits_balance":
		return client.LobCreditsBalance(nil), nil
	case "postcard":
		return client.Postcard(nil), nil
	case "qr_code":
		return client.QrCode(nil), nil
	case "resource_proof":
		return client.ResourceProof(nil), nil
	case "response":
		return client.Response(nil), nil
	case "reverse_geocode":
		return client.ReverseGeocode(nil), nil
	case "self_mailer":
		return client.SelfMailer(nil), nil
	case "snap_pack":
		return client.SnapPack(nil), nil
	case "template":
		return client.Template(nil), nil
	case "template_version":
		return client.TemplateVersion(nil), nil
	case "template_version_deletion":
		return client.TemplateVersionDeletion(nil), nil
	case "upload":
		return client.Upload(nil), nil
	case "upload_create_export":
		return client.UploadCreateExport(nil), nil
	case "us_autocompletion":
		return client.UsAutocompletion(nil), nil
	case "us_verification":
		return client.UsVerification(nil), nil
	case "zip":
		return client.Zip(nil), nil

	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}
