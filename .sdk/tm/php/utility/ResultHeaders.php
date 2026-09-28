<?php
declare(strict_types=1);

// Lob SDK utility: result_headers

class LobResultHeaders
{
    public static function call(LobContext $ctx): ?LobResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
