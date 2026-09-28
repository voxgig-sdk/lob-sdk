import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { IdentityValidation, IdentityValidationCreateData } from '../LobTypes';
declare class IdentityValidationEntity extends LobEntityBase<IdentityValidation> {
    constructor(client: LobSDK, entopts: any);
    make(this: IdentityValidationEntity): IdentityValidationEntity;
    create(this: any, reqdata?: IdentityValidationCreateData, ctrl?: Control): Promise<IdentityValidationEntity>;
}
export { IdentityValidationEntity };
