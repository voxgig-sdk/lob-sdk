import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { UsAutocompletion, UsAutocompletionCreateData } from '../LobTypes';
declare class UsAutocompletionEntity extends LobEntityBase<UsAutocompletion> {
    constructor(client: LobSDK, entopts: any);
    make(this: UsAutocompletionEntity): UsAutocompletionEntity;
    create(this: any, reqdata?: UsAutocompletionCreateData, ctrl?: Control): Promise<UsAutocompletionEntity>;
}
export { UsAutocompletionEntity };
