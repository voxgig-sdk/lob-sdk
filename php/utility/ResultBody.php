<?php
declare(strict_types=1);

// Lob SDK utility: result_body

class LobResultBody
{
    public static function call(LobContext $ctx): ?LobResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
