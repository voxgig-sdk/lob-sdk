# Lob SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LobUtility.registrar = ->(u) {
  u.clean = LobUtilities::Clean
  u.done = LobUtilities::Done
  u.make_error = LobUtilities::MakeError
  u.feature_add = LobUtilities::FeatureAdd
  u.feature_hook = LobUtilities::FeatureHook
  u.feature_init = LobUtilities::FeatureInit
  u.fetcher = LobUtilities::Fetcher
  u.make_fetch_def = LobUtilities::MakeFetchDef
  u.make_context = LobUtilities::MakeContext
  u.make_options = LobUtilities::MakeOptions
  u.make_request = LobUtilities::MakeRequest
  u.make_response = LobUtilities::MakeResponse
  u.make_result = LobUtilities::MakeResult
  u.make_point = LobUtilities::MakePoint
  u.make_spec = LobUtilities::MakeSpec
  u.make_url = LobUtilities::MakeUrl
  u.param = LobUtilities::Param
  u.prepare_auth = LobUtilities::PrepareAuth
  u.prepare_body = LobUtilities::PrepareBody
  u.prepare_headers = LobUtilities::PrepareHeaders
  u.prepare_method = LobUtilities::PrepareMethod
  u.prepare_params = LobUtilities::PrepareParams
  u.prepare_path = LobUtilities::PreparePath
  u.prepare_query = LobUtilities::PrepareQuery
  u.graphql_body = LobUtilities::GraphqlBody
  u.graphql_errors = LobUtilities::GraphqlErrors
  u.result_basic = LobUtilities::ResultBasic
  u.result_body = LobUtilities::ResultBody
  u.result_headers = LobUtilities::ResultHeaders
  u.transform_request = LobUtilities::TransformRequest
  u.transform_response = LobUtilities::TransformResponse
}
