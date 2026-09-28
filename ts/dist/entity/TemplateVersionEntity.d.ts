import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { TemplateVersion, TemplateVersionLoadMatch, TemplateVersionListMatch, TemplateVersionCreateData } from '../LobTypes';
declare class TemplateVersionEntity extends LobEntityBase<TemplateVersion> {
    constructor(client: LobSDK, entopts: any);
    make(this: TemplateVersionEntity): TemplateVersionEntity;
    load(this: any, reqmatch?: TemplateVersionLoadMatch, ctrl?: Control): Promise<TemplateVersionEntity>;
    list(this: any, reqmatch?: TemplateVersionListMatch, ctrl?: Control): Promise<TemplateVersionEntity[]>;
    create(this: any, reqdata?: TemplateVersionCreateData, ctrl?: Control): Promise<TemplateVersionEntity>;
}
export { TemplateVersionEntity };
