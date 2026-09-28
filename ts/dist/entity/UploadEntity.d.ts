import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Upload, UploadLoadMatch, UploadListMatch, UploadCreateData, UploadUpdateData, UploadRemoveMatch } from '../LobTypes';
declare class UploadEntity extends LobEntityBase<Upload> {
    constructor(client: LobSDK, entopts: any);
    make(this: UploadEntity): UploadEntity;
    load(this: any, reqmatch?: UploadLoadMatch, ctrl?: Control): Promise<UploadEntity>;
    list(this: any, reqmatch?: UploadListMatch, ctrl?: Control): Promise<UploadEntity[]>;
    create(this: any, reqdata?: UploadCreateData, ctrl?: Control): Promise<UploadEntity>;
    update(this: any, reqdata?: UploadUpdateData, ctrl?: Control): Promise<UploadEntity>;
    remove(this: any, reqmatch?: UploadRemoveMatch, ctrl?: Control): Promise<UploadEntity>;
}
export { UploadEntity };
