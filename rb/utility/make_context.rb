# Lob SDK utility: make_context
require_relative '../core/context'
module LobUtilities
  MakeContext = ->(ctxmap, basectx) {
    LobContext.new(ctxmap, basectx)
  }
end
