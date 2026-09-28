import type { Context, FeatureOptions } from '../../types';
import type { LobSDK } from '../../LobSDK';
import { BaseFeature } from '../base/BaseFeature';
declare class IdempotencyFeature extends BaseFeature {
    version: string;
    name: string;
    active: boolean;
    _client?: LobSDK;
    _options: any;
    init(ctx: Context, options: FeatureOptions): void | Promise<any>;
    PreRequest(this: any, ctx: any): void;
    _mutating(this: any, ctx: any): boolean;
    _existing(this: any, headers: any, header: string): any;
    _genkey(this: any): string;
}
export { IdempotencyFeature };
