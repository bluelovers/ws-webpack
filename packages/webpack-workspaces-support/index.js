"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withWorkspacesSupport = exports.newWithWorkspaces = exports.testRule = void 0;
const ws_pkg_list_1 = require("ws-pkg-list");
const find_root_1 = __importDefault(require("@yarn-tool/find-root"));
const webpack_log_1 = __importDefault(require("webpack-log"));
const util_1 = require("util");
const path_1 = require("path");
const name = 'webpack-workspaces-support';
function testRule(tests, rule, ...argv) {
    let bool;
    if (Array.isArray(tests)) {
        return tests
            .some(v => testRule(v, rule, ...argv));
    }
    else if (typeof tests === 'function') {
        bool = tests(rule, ...argv);
    }
    else if (rule.test instanceof RegExp) {
        bool = rule.test.test(tests);
    }
    return bool;
}
exports.testRule = testRule;
function newWithWorkspaces(initOptions = {
    cwd: process.cwd,
}) {
    function withWorkspacesSupport(config, ...argv) {
        let console = webpack_log_1.default({ name });
        let { cwd, tests = [
            'index.ts',
            'index.tsx',
            'index.js',
            'index.jsx',
            'index.mjs',
        ] } = initOptions;
        if (typeof cwd === 'function') {
            cwd = cwd();
        }
        else if (cwd == null) {
            cwd = process.cwd();
        }
        if (typeof tests === 'string') {
            tests = [tests];
        }
        else if (typeof tests === 'function') {
        }
        else if (!tests.length) {
            tests = null;
        }
        console.info(`options`, util_1.inspect({
            ...initOptions,
            cwd,
            tests,
        }));
        if (tests) {
            const ws = find_root_1.default({
                cwd
            });
            if (ws.hasWorkspace) {
                let ls = ws_pkg_list_1.workspacesPackagesList(ws.root, true)
                    .map(v => path_1.normalize(v));
                console.info(`packages list`, util_1.inspect(ls));
                config.module.rules
                    .forEach(rule => {
                    let bool;
                    console.debug(`current rule`, util_1.inspect(rule));
                    if (Array.isArray(rule.include)) {
                        bool = testRule(tests, rule, ...argv);
                        if (bool == null) {
                            console.warn(`can't handle this rule`, util_1.inspect(rule));
                        }
                        if (bool) {
                            /*
                            if (rule.include == null)
                            {
                                rule.include = [];
                            }
                             */
                            rule.include.push(...ls);
                            console.debug(`rule after change`, util_1.inspect(rule));
                        }
                    }
                    else {
                        console.warn(`not support current rule`, util_1.inspect(rule));
                    }
                });
            }
            else {
                console.warn(`current project not a yarn workspaces, didn't need this plugin. ${ws.root}`);
            }
        }
        return config;
    }
    (() => {
        // @ts-ignore
        withWorkspacesSupport.default = withWorkspacesSupport;
    })();
    return withWorkspacesSupport;
}
exports.newWithWorkspaces = newWithWorkspaces;
exports.withWorkspacesSupport = newWithWorkspaces();
exports.default = exports.withWorkspacesSupport;
//# sourceMappingURL=index.js.map