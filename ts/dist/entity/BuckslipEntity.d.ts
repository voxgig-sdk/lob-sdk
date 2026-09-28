import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Buckslip, BuckslipLoadMatch, BuckslipListMatch, BuckslipCreateData, BuckslipUpdateData, BuckslipRemoveMatch } from '../LobTypes';
declare class BuckslipEntity extends LobEntityBase<Buckslip> {
    constructor(client: LobSDK, entopts: any);
    make(this: BuckslipEntity): BuckslipEntity;
    load(this: any, reqmatch?: BuckslipLoadMatch, ctrl?: Control): Promise<BuckslipEntity>;
    list(this: any, reqmatch?: BuckslipListMatch, ctrl?: Control): Promise<BuckslipEntity[]>;
    create(this: any, reqdata?: BuckslipCreateData, ctrl?: Control): Promise<BuckslipEntity>;
    update(this: any, reqdata?: BuckslipUpdateData, ctrl?: Control): Promise<BuckslipEntity>;
    remove(this: any, reqmatch?: BuckslipRemoveMatch, ctrl?: Control): Promise<BuckslipEntity>;
}
export { BuckslipEntity };
