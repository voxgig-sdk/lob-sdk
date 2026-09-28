import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Postcard, PostcardLoadMatch, PostcardListMatch, PostcardCreateData, PostcardRemoveMatch } from '../LobTypes';
declare class PostcardEntity extends LobEntityBase<Postcard> {
    constructor(client: LobSDK, entopts: any);
    make(this: PostcardEntity): PostcardEntity;
    load(this: any, reqmatch?: PostcardLoadMatch, ctrl?: Control): Promise<PostcardEntity>;
    list(this: any, reqmatch?: PostcardListMatch, ctrl?: Control): Promise<PostcardEntity[]>;
    create(this: any, reqdata?: PostcardCreateData, ctrl?: Control): Promise<PostcardEntity>;
    remove(this: any, reqmatch?: PostcardRemoveMatch, ctrl?: Control): Promise<PostcardEntity>;
}
export { PostcardEntity };
