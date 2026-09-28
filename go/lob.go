package voxgiglobsdk

import (
	"github.com/voxgig-sdk/lob-sdk/go/core"
	"github.com/voxgig-sdk/lob-sdk/go/entity"
	"github.com/voxgig-sdk/lob-sdk/go/feature"
	_ "github.com/voxgig-sdk/lob-sdk/go/utility"
)

// Type aliases preserve external API.
type LobSDK = core.LobSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LobEntity = core.LobEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LobError = core.LobError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAddressEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewAddressEntity(client, entopts)
	}
	core.NewBankAccountEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBankAccountEntity(client, entopts)
	}
	core.NewBankDeletionEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBankDeletionEntity(client, entopts)
	}
	core.NewBillingGroupEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBillingGroupEntity(client, entopts)
	}
	core.NewBookletEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBookletEntity(client, entopts)
	}
	core.NewBuckslipEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBuckslipEntity(client, entopts)
	}
	core.NewBuckslipOrderEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewBuckslipOrderEntity(client, entopts)
	}
	core.NewCampaignEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewCampaignEntity(client, entopts)
	}
	core.NewCardEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewCardEntity(client, entopts)
	}
	core.NewCardOrderEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewCardOrderEntity(client, entopts)
	}
	core.NewCheckEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewCheckEntity(client, entopts)
	}
	core.NewCreativeEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewCreativeEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewIdentityValidationEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewIdentityValidationEntity(client, entopts)
	}
	core.NewIntlVerificationEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewIntlVerificationEntity(client, entopts)
	}
	core.NewLetterEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewLetterEntity(client, entopts)
	}
	core.NewLinkEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewLinkEntity(client, entopts)
	}
	core.NewLobCreditsBalanceEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewLobCreditsBalanceEntity(client, entopts)
	}
	core.NewPostcardEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewPostcardEntity(client, entopts)
	}
	core.NewQrCodeEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewQrCodeEntity(client, entopts)
	}
	core.NewResourceProofEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewResourceProofEntity(client, entopts)
	}
	core.NewResponseEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewResponseEntity(client, entopts)
	}
	core.NewReverseGeocodeEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewReverseGeocodeEntity(client, entopts)
	}
	core.NewSelfMailerEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewSelfMailerEntity(client, entopts)
	}
	core.NewSnapPackEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewSnapPackEntity(client, entopts)
	}
	core.NewTemplateEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewTemplateEntity(client, entopts)
	}
	core.NewTemplateVersionEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewTemplateVersionEntity(client, entopts)
	}
	core.NewTemplateVersionDeletionEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewTemplateVersionDeletionEntity(client, entopts)
	}
	core.NewUploadEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewUploadEntity(client, entopts)
	}
	core.NewUploadCreateExportEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewUploadCreateExportEntity(client, entopts)
	}
	core.NewUsAutocompletionEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewUsAutocompletionEntity(client, entopts)
	}
	core.NewUsVerificationEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewUsVerificationEntity(client, entopts)
	}
	core.NewZipEntityFunc = func(client *core.LobSDK, entopts map[string]any) core.LobEntity {
		return entity.NewZipEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLobSDK = core.NewLobSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLobSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LobSDK  { return NewLobSDK(nil) }
func Test() *LobSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
