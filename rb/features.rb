# Lob SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LobFeatures
  def self.make_feature(name)
    case name
    when "base"
      LobBaseFeature.new
    when "debug"
      LobDebugFeature.new
    when "idempotency"
      LobIdempotencyFeature.new
    when "metrics"
      LobMetricsFeature.new
    when "paging"
      LobPagingFeature.new
    when "ratelimit"
      LobRatelimitFeature.new
    when "retry"
      LobRetryFeature.new
    when "test"
      LobTestFeature.new
    when "timeout"
      LobTimeoutFeature.new
    else
      LobBaseFeature.new
    end
  end
end
