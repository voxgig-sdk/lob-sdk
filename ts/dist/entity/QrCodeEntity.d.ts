import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { QrCode, QrCodeListMatch } from '../LobTypes';
declare class QrCodeEntity extends LobEntityBase<QrCode> {
    constructor(client: LobSDK, entopts: any);
    make(this: QrCodeEntity): QrCodeEntity;
    list(this: any, reqmatch?: QrCodeListMatch, ctrl?: Control): Promise<QrCodeEntity[]>;
}
export { QrCodeEntity };
