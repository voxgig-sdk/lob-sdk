import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { UsVerification, UsVerificationCreateData } from '../LobTypes';
declare class UsVerificationEntity extends LobEntityBase<UsVerification> {
    constructor(client: LobSDK, entopts: any);
    make(this: UsVerificationEntity): UsVerificationEntity;
    create(this: any, reqdata?: UsVerificationCreateData, ctrl?: Control): Promise<UsVerificationEntity>;
}
export { UsVerificationEntity };
