import type { Configuration, RuleSetRule } from 'webpack';
export declare function newWithWorkspaces(initOptions?: {
    cwd: string | (() => string);
    tests?: string | string[] | ((rule: RuleSetRule) => boolean);
}): <T extends Configuration>(config: T) => T;
export declare function webpackConfig<T extends Configuration>(config: T): T;
export default webpackConfig;
