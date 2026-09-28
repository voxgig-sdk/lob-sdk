import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { BillingGroup, BillingGroupLoadMatch, BillingGroupListMatch, BillingGroupCreateData } from '../LobTypes';
declare class BillingGroupEntity extends LobEntityBase<BillingGroup> {
    constructor(client: LobSDK, entopts: any);
    make(this: BillingGroupEntity): BillingGroupEntity;
    load(this: any, reqmatch?: BillingGroupLoadMatch, ctrl?: Control): Promise<BillingGroupEntity>;
    list(this: any, reqmatch?: BillingGroupListMatch, ctrl?: Control): Promise<BillingGroupEntity[]>;
    create(this: any, reqdata?: BillingGroupCreateData, ctrl?: Control): Promise<BillingGroupEntity>;
}
export { BillingGroupEntity };
