<?php
declare(strict_types=1);

// Lob SDK exists test

require_once __DIR__ . '/../lob_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = LobSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
