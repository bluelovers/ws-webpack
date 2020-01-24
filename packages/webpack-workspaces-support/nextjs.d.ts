/**
 * Created by user on 2020/1/24.
 */
import type { Configuration } from 'webpack';
interface INextConfig {
    webpack?(...argv: any[]): any;
}
declare function withWorkspacesSupport<N extends INextConfig>(nextConfig?: N): N & {
    webpack(config: Configuration, ...argv: any[]): Configuration;
};
declare namespace withWorkspacesSupport {
    var default: typeof withWorkspacesSupport;
}
export = withWorkspacesSupport;
