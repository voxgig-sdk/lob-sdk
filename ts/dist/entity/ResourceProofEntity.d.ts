import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { ResourceProof, ResourceProofLoadMatch, ResourceProofCreateData, ResourceProofUpdateData } from '../LobTypes';
declare class ResourceProofEntity extends LobEntityBase<ResourceProof> {
    constructor(client: LobSDK, entopts: any);
    make(this: ResourceProofEntity): ResourceProofEntity;
    load(this: any, reqmatch?: ResourceProofLoadMatch, ctrl?: Control): Promise<ResourceProofEntity>;
    create(this: any, reqdata?: ResourceProofCreateData, ctrl?: Control): Promise<ResourceProofEntity>;
    update(this: any, reqdata?: ResourceProofUpdateData, ctrl?: Control): Promise<ResourceProofEntity>;
}
export { ResourceProofEntity };
