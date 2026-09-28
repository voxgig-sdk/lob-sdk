import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { UploadCreateExport, UploadCreateExportCreateData } from '../LobTypes';
declare class UploadCreateExportEntity extends LobEntityBase<UploadCreateExport> {
    constructor(client: LobSDK, entopts: any);
    make(this: UploadCreateExportEntity): UploadCreateExportEntity;
    create(this: any, reqdata?: UploadCreateExportCreateData, ctrl?: Control): Promise<UploadCreateExportEntity>;
}
export { UploadCreateExportEntity };
