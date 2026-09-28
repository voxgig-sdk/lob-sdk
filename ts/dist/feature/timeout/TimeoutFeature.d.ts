import type { Context, FeatureOptions } from '../../types';
import type { LobSDK } from '../../LobSDK';
import { BaseFeature } from '../base/BaseFeature';
declare class TimeoutFeature extends BaseFeature {
    version: string;
    name: string;
    active: boolean;
    _client?: LobSDK;
    _options: any;
    init(ctx: Context, options: FeatureOptions): void | Promise<any>;
    _withTimeout(this: any, ctx: any, url: string, fetchdef: any, inner: any): Promise<any>;
    _track(this: any, ctx: any, ms: number): void;
}
export { TimeoutFeature };
