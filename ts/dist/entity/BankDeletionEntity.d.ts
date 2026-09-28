import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { BankDeletion, BankDeletionRemoveMatch } from '../LobTypes';
declare class BankDeletionEntity extends LobEntityBase<BankDeletion> {
    constructor(client: LobSDK, entopts: any);
    make(this: BankDeletionEntity): BankDeletionEntity;
    remove(this: any, reqmatch?: BankDeletionRemoveMatch, ctrl?: Control): Promise<BankDeletionEntity>;
}
export { BankDeletionEntity };
