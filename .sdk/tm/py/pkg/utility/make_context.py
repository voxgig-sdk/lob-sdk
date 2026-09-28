# Lob SDK utility: make_context

from projectname_sdk.core.context import LobContext


def make_context_util(ctxmap, basectx):
    return LobContext(ctxmap, basectx)
