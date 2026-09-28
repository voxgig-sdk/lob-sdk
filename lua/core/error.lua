-- Lob SDK error

local LobError = {}
LobError.__index = LobError


function LobError.new(code, msg, ctx)
  local self = setmetatable({}, LobError)
  self.is_sdk_error = true
  self.sdk = "Lob"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LobError:error()
  return self.msg
end


function LobError:__tostring()
  return self.msg
end


return LobError
