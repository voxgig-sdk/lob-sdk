import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Creative, CreativeLoadMatch, CreativeCreateData, CreativeUpdateData } from '../LobTypes';
declare class CreativeEntity extends LobEntityBase<Creative> {
    constructor(client: LobSDK, entopts: any);
    make(this: CreativeEntity): CreativeEntity;
    load(this: any, reqmatch?: CreativeLoadMatch, ctrl?: Control): Promise<CreativeEntity>;
    create(this: any, reqdata?: CreativeCreateData, ctrl?: Control): Promise<CreativeEntity>;
    update(this: any, reqdata?: CreativeUpdateData, ctrl?: Control): Promise<CreativeEntity>;
}
export { CreativeEntity };
