import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Booklet, BookletLoadMatch, BookletListMatch, BookletCreateData, BookletRemoveMatch } from '../LobTypes';
declare class BookletEntity extends LobEntityBase<Booklet> {
    constructor(client: LobSDK, entopts: any);
    make(this: BookletEntity): BookletEntity;
    load(this: any, reqmatch?: BookletLoadMatch, ctrl?: Control): Promise<BookletEntity>;
    list(this: any, reqmatch?: BookletListMatch, ctrl?: Control): Promise<BookletEntity[]>;
    create(this: any, reqdata?: BookletCreateData, ctrl?: Control): Promise<BookletEntity>;
    remove(this: any, reqmatch?: BookletRemoveMatch, ctrl?: Control): Promise<BookletEntity>;
}
export { BookletEntity };
