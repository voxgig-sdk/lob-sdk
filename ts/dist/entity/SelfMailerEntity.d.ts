import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { SelfMailer, SelfMailerLoadMatch, SelfMailerListMatch, SelfMailerCreateData, SelfMailerRemoveMatch } from '../LobTypes';
declare class SelfMailerEntity extends LobEntityBase<SelfMailer> {
    constructor(client: LobSDK, entopts: any);
    make(this: SelfMailerEntity): SelfMailerEntity;
    load(this: any, reqmatch?: SelfMailerLoadMatch, ctrl?: Control): Promise<SelfMailerEntity>;
    list(this: any, reqmatch?: SelfMailerListMatch, ctrl?: Control): Promise<SelfMailerEntity[]>;
    create(this: any, reqdata?: SelfMailerCreateData, ctrl?: Control): Promise<SelfMailerEntity>;
    remove(this: any, reqmatch?: SelfMailerRemoveMatch, ctrl?: Control): Promise<SelfMailerEntity>;
}
export { SelfMailerEntity };
