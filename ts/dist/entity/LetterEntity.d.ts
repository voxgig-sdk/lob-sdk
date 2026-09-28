import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Letter, LetterLoadMatch, LetterListMatch, LetterCreateData, LetterRemoveMatch } from '../LobTypes';
declare class LetterEntity extends LobEntityBase<Letter> {
    constructor(client: LobSDK, entopts: any);
    make(this: LetterEntity): LetterEntity;
    load(this: any, reqmatch?: LetterLoadMatch, ctrl?: Control): Promise<LetterEntity>;
    list(this: any, reqmatch?: LetterListMatch, ctrl?: Control): Promise<LetterEntity[]>;
    create(this: any, reqdata?: LetterCreateData, ctrl?: Control): Promise<LetterEntity>;
    remove(this: any, reqmatch?: LetterRemoveMatch, ctrl?: Control): Promise<LetterEntity>;
}
export { LetterEntity };
