import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { BuckslipOrder, BuckslipOrderListMatch, BuckslipOrderCreateData } from '../LobTypes';
declare class BuckslipOrderEntity extends LobEntityBase<BuckslipOrder> {
    constructor(client: LobSDK, entopts: any);
    make(this: BuckslipOrderEntity): BuckslipOrderEntity;
    list(this: any, reqmatch?: BuckslipOrderListMatch, ctrl?: Control): Promise<BuckslipOrderEntity[]>;
    create(this: any, reqdata?: BuckslipOrderCreateData, ctrl?: Control): Promise<BuckslipOrderEntity>;
}
export { BuckslipOrderEntity };
