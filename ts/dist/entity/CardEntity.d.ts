import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Card, CardLoadMatch, CardListMatch, CardCreateData, CardRemoveMatch } from '../LobTypes';
declare class CardEntity extends LobEntityBase<Card> {
    constructor(client: LobSDK, entopts: any);
    make(this: CardEntity): CardEntity;
    load(this: any, reqmatch?: CardLoadMatch, ctrl?: Control): Promise<CardEntity>;
    list(this: any, reqmatch?: CardListMatch, ctrl?: Control): Promise<CardEntity[]>;
    create(this: any, reqdata?: CardCreateData, ctrl?: Control): Promise<CardEntity>;
    remove(this: any, reqmatch?: CardRemoveMatch, ctrl?: Control): Promise<CardEntity>;
}
export { CardEntity };
