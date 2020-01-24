import type { Configuration, RuleSetRule } from 'webpack';
import { ITSValueOrArray } from 'ts-type';
export declare function testRule(tests: ITSValueOrArray<string | ((rule: RuleSetRule, ...argv: any[]) => boolean)>, rule: RuleSetRule, ...argv: any[]): any;
export declare function newWithWorkspaces(initOptions?: {
    cwd: string | (() => string);
    tests?: string | string[] | ((rule: RuleSetRule, ...argv: any[]) => boolean);
}): <T extends Configuration>(config: T, ...argv: any[]) => T;
export declare const withWorkspacesSupport: <T extends Configuration>(config: T, ...argv: any[]) => T;
export default withWorkspacesSupport;
