package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAddressEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBankAccountEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBankDeletionEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBillingGroupEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBookletEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBuckslipEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewBuckslipOrderEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewCampaignEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewCardEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewCardOrderEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewCheckEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewCreativeEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewDomainEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewIdentityValidationEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewIntlVerificationEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewLetterEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewLinkEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewLobCreditsBalanceEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewPostcardEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewQrCodeEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewResourceProofEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewResponseEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewReverseGeocodeEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewSelfMailerEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewSnapPackEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewTemplateEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewTemplateVersionEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewTemplateVersionDeletionEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewUploadEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewUploadCreateExportEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewUsAutocompletionEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewUsVerificationEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

var NewZipEntityFunc func(client *LobSDK, entopts map[string]any) LobEntity

