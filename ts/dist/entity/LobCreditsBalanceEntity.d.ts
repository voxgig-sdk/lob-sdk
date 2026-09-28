import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { LobCreditsBalance, LobCreditsBalanceLoadMatch } from '../LobTypes';
declare class LobCreditsBalanceEntity extends LobEntityBase<LobCreditsBalance> {
    constructor(client: LobSDK, entopts: any);
    make(this: LobCreditsBalanceEntity): LobCreditsBalanceEntity;
    load(this: any, reqmatch?: LobCreditsBalanceLoadMatch, ctrl?: Control): Promise<LobCreditsBalanceEntity>;
}
export { LobCreditsBalanceEntity };
