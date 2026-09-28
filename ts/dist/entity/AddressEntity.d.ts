import { LobEntityBase } from '../LobEntityBase';
import type { LobSDK } from '../LobSDK';
import type { Control } from '../types';
import type { Address, AddressLoadMatch, AddressListMatch, AddressCreateData, AddressRemoveMatch } from '../LobTypes';
declare class AddressEntity extends LobEntityBase<Address> {
    constructor(client: LobSDK, entopts: any);
    make(this: AddressEntity): AddressEntity;
    load(this: any, reqmatch?: AddressLoadMatch, ctrl?: Control): Promise<AddressEntity>;
    list(this: any, reqmatch?: AddressListMatch, ctrl?: Control): Promise<AddressEntity[]>;
    create(this: any, reqdata?: AddressCreateData, ctrl?: Control): Promise<AddressEntity>;
    remove(this: any, reqmatch?: AddressRemoveMatch, ctrl?: Control): Promise<AddressEntity>;
}
export { AddressEntity };
