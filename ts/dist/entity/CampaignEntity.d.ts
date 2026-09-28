import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Campaign, CampaignLoadMatch, CampaignListMatch, CampaignCreateData, CampaignUpdateData, CampaignRemoveMatch } from '../LobTypes';
declare class CampaignEntity extends LobEntityBase<Campaign> {
    constructor(client: LobSDK, entopts: any);
    make(this: CampaignEntity): CampaignEntity;
    load(this: any, reqmatch?: CampaignLoadMatch, ctrl?: Control): Promise<CampaignEntity>;
    list(this: any, reqmatch?: CampaignListMatch, ctrl?: Control): Promise<CampaignEntity[]>;
    create(this: any, reqdata?: CampaignCreateData, ctrl?: Control): Promise<CampaignEntity>;
    update(this: any, reqdata?: CampaignUpdateData, ctrl?: Control): Promise<CampaignEntity>;
    remove(this: any, reqmatch?: CampaignRemoveMatch, ctrl?: Control): Promise<CampaignEntity>;
}
export { CampaignEntity };
