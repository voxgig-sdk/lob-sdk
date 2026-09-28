import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { BankAccount, BankAccountLoadMatch, BankAccountListMatch, BankAccountCreateData } from '../LobTypes';
declare class BankAccountEntity extends LobEntityBase<BankAccount> {
    constructor(client: LobSDK, entopts: any);
    make(this: BankAccountEntity): BankAccountEntity;
    load(this: any, reqmatch?: BankAccountLoadMatch, ctrl?: Control): Promise<BankAccountEntity>;
    list(this: any, reqmatch?: BankAccountListMatch, ctrl?: Control): Promise<BankAccountEntity[]>;
    create(this: any, reqdata?: BankAccountCreateData, ctrl?: Control): Promise<BankAccountEntity>;
}
export { BankAccountEntity };
