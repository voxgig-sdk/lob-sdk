# Lob SDK exists test

require "minitest/autorun"
require_relative "../Lob_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LobSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
