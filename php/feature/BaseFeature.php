<?php
declare(strict_types=1);

// Lob SDK base feature

class LobBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LobContext $ctx, array $options): void {}
    public function PostConstruct(LobContext $ctx): void {}
    public function PostConstructEntity(LobContext $ctx): void {}
    public function SetData(LobContext $ctx): void {}
    public function GetData(LobContext $ctx): void {}
    public function GetMatch(LobContext $ctx): void {}
    public function SetMatch(LobContext $ctx): void {}
    public function PrePoint(LobContext $ctx): void {}
    public function PreSpec(LobContext $ctx): void {}
    public function PreRequest(LobContext $ctx): void {}
    public function PreResponse(LobContext $ctx): void {}
    public function PreResult(LobContext $ctx): void {}
    public function PreDone(LobContext $ctx): void {}
    public function PreUnexpected(LobContext $ctx): void {}
}
