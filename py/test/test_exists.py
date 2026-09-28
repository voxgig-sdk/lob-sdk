# Lob SDK exists test

import pytest
from lob_sdk import LobSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LobSDK.test(None, None)
        assert testsdk is not None
