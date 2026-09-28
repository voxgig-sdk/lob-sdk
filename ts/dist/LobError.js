"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobError = void 0;
class LobError extends Error {
    isLobError = true;
    sdk = 'Lob';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LobError = LobError;
//# sourceMappingURL=LobError.js.map