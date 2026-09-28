import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Link, LinkLoadMatch, LinkListMatch, LinkCreateData, LinkUpdateData, LinkRemoveMatch } from '../LobTypes';
declare class LinkEntity extends LobEntityBase<Link> {
    constructor(client: LobSDK, entopts: any);
    make(this: LinkEntity): LinkEntity;
    load(this: any, reqmatch?: LinkLoadMatch, ctrl?: Control): Promise<LinkEntity>;
    list(this: any, reqmatch?: LinkListMatch, ctrl?: Control): Promise<LinkEntity[]>;
    create(this: any, reqdata?: LinkCreateData, ctrl?: Control): Promise<LinkEntity>;
    update(this: any, reqdata?: LinkUpdateData, ctrl?: Control): Promise<LinkEntity>;
    remove(this: any, reqmatch?: LinkRemoveMatch, ctrl?: Control): Promise<LinkEntity>;
}
export { LinkEntity };
