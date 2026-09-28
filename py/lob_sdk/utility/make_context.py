# Lob SDK utility: make_context

from lob_sdk.core.context import LobContext


def make_context_util(ctxmap, basectx):
    return LobContext(ctxmap, basectx)
