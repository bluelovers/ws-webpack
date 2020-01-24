import type { Configuration, RuleSetRule } from 'webpack';
export declare function newWithWorkspaces(initOptions?: {
    cwd: string | (() => string);
    tests?: string | string[] | ((rule: RuleSetRule, ...argv: any[]) => boolean);
}): <T extends Configuration>(config: T, ...argv: any[]) => T;
export declare const withWorkspacesSupport: <T extends Configuration>(config: T, ...argv: any[]) => T;
export default withWorkspacesSupport;
