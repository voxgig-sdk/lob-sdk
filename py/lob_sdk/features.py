# Lob SDK feature factory

from lob_sdk.feature.base_feature import LobBaseFeature
from lob_sdk.feature.debug_feature import LobDebugFeature
from lob_sdk.feature.idempotency_feature import LobIdempotencyFeature
from lob_sdk.feature.metrics_feature import LobMetricsFeature
from lob_sdk.feature.paging_feature import LobPagingFeature
from lob_sdk.feature.ratelimit_feature import LobRatelimitFeature
from lob_sdk.feature.retry_feature import LobRetryFeature
from lob_sdk.feature.test_feature import LobTestFeature
from lob_sdk.feature.timeout_feature import LobTimeoutFeature


_FEATURES = {
    "base": lambda: LobBaseFeature(),
    "debug": lambda: LobDebugFeature(),
    "idempotency": lambda: LobIdempotencyFeature(),
    "metrics": lambda: LobMetricsFeature(),
    "paging": lambda: LobPagingFeature(),
    "ratelimit": lambda: LobRatelimitFeature(),
    "retry": lambda: LobRetryFeature(),
    "test": lambda: LobTestFeature(),
    "timeout": lambda: LobTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
