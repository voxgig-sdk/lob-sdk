import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { CardOrder, CardOrderListMatch, CardOrderCreateData } from '../LobTypes';
declare class CardOrderEntity extends LobEntityBase<CardOrder> {
    constructor(client: LobSDK, entopts: any);
    make(this: CardOrderEntity): CardOrderEntity;
    list(this: any, reqmatch?: CardOrderListMatch, ctrl?: Control): Promise<CardOrderEntity[]>;
    create(this: any, reqdata?: CardOrderCreateData, ctrl?: Control): Promise<CardOrderEntity>;
}
export { CardOrderEntity };
