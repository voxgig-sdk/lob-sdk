import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Check, CheckLoadMatch, CheckListMatch, CheckCreateData, CheckRemoveMatch } from '../LobTypes';
declare class CheckEntity extends LobEntityBase<Check> {
    constructor(client: LobSDK, entopts: any);
    make(this: CheckEntity): CheckEntity;
    load(this: any, reqmatch?: CheckLoadMatch, ctrl?: Control): Promise<CheckEntity>;
    list(this: any, reqmatch?: CheckListMatch, ctrl?: Control): Promise<CheckEntity[]>;
    create(this: any, reqdata?: CheckCreateData, ctrl?: Control): Promise<CheckEntity>;
    remove(this: any, reqmatch?: CheckRemoveMatch, ctrl?: Control): Promise<CheckEntity>;
}
export { CheckEntity };
