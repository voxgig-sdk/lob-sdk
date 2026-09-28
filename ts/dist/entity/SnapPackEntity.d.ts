import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { SnapPack, SnapPackLoadMatch, SnapPackListMatch, SnapPackCreateData, SnapPackRemoveMatch } from '../LobTypes';
declare class SnapPackEntity extends LobEntityBase<SnapPack> {
    constructor(client: LobSDK, entopts: any);
    make(this: SnapPackEntity): SnapPackEntity;
    load(this: any, reqmatch?: SnapPackLoadMatch, ctrl?: Control): Promise<SnapPackEntity>;
    list(this: any, reqmatch?: SnapPackListMatch, ctrl?: Control): Promise<SnapPackEntity[]>;
    create(this: any, reqdata?: SnapPackCreateData, ctrl?: Control): Promise<SnapPackEntity>;
    remove(this: any, reqmatch?: SnapPackRemoveMatch, ctrl?: Control): Promise<SnapPackEntity>;
}
export { SnapPackEntity };
