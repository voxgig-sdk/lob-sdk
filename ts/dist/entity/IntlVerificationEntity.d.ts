import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { IntlVerification, IntlVerificationCreateData } from '../LobTypes';
declare class IntlVerificationEntity extends LobEntityBase<IntlVerification> {
    constructor(client: LobSDK, entopts: any);
    make(this: IntlVerificationEntity): IntlVerificationEntity;
    create(this: any, reqdata?: IntlVerificationCreateData, ctrl?: Control): Promise<IntlVerificationEntity>;
}
export { IntlVerificationEntity };
