import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { TemplateVersionDeletion, TemplateVersionDeletionRemoveMatch } from '../LobTypes';
declare class TemplateVersionDeletionEntity extends LobEntityBase<TemplateVersionDeletion> {
    constructor(client: LobSDK, entopts: any);
    make(this: TemplateVersionDeletionEntity): TemplateVersionDeletionEntity;
    remove(this: any, reqmatch?: TemplateVersionDeletionRemoveMatch, ctrl?: Control): Promise<TemplateVersionDeletionEntity>;
}
export { TemplateVersionDeletionEntity };
