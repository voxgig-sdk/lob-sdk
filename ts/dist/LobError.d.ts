import { Context } from './Context';
declare class LobError extends Error {
    isLobError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LobError };
