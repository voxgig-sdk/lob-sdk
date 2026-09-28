import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { ReverseGeocode, ReverseGeocodeCreateData } from '../LobTypes';
declare class ReverseGeocodeEntity extends LobEntityBase<ReverseGeocode> {
    constructor(client: LobSDK, entopts: any);
    make(this: ReverseGeocodeEntity): ReverseGeocodeEntity;
    create(this: any, reqdata?: ReverseGeocodeCreateData, ctrl?: Control): Promise<ReverseGeocodeEntity>;
}
export { ReverseGeocodeEntity };
