<?php
declare(strict_types=1);

// Lob SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LobMakeContext
{
    public static function call(array $ctxmap, ?LobContext $basectx): LobContext
    {
        return new LobContext($ctxmap, $basectx);
    }
}
