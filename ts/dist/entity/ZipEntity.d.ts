import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Zip, ZipCreateData } from '../LobTypes';
declare class ZipEntity extends LobEntityBase<Zip> {
    constructor(client: LobSDK, entopts: any);
    make(this: ZipEntity): ZipEntity;
    create(this: any, reqdata?: ZipCreateData, ctrl?: Control): Promise<ZipEntity>;
}
export { ZipEntity };
