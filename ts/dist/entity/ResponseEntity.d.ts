import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Response, ResponseLoadMatch, ResponseListMatch, ResponseCreateData, ResponseUpdateData } from '../LobTypes';
declare class ResponseEntity extends LobEntityBase<Response> {
    constructor(client: LobSDK, entopts: any);
    make(this: ResponseEntity): ResponseEntity;
    load(this: any, reqmatch?: ResponseLoadMatch, ctrl?: Control): Promise<ResponseEntity>;
    list(this: any, reqmatch?: ResponseListMatch, ctrl?: Control): Promise<ResponseEntity[]>;
    create(this: any, reqdata?: ResponseCreateData, ctrl?: Control): Promise<ResponseEntity>;
    update(this: any, reqdata?: ResponseUpdateData, ctrl?: Control): Promise<ResponseEntity>;
}
export { ResponseEntity };
