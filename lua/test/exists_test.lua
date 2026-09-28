-- Lob SDK exists test

local sdk = require("lob_sdk")

describe("LobSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
