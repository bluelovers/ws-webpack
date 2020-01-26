"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZDQUFxRDtBQUNyRCxxRUFBNEM7QUFDNUMsOERBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQiwrQkFBaUM7QUFHakMsTUFBTSxJQUFJLEdBQUcsNEJBQTRCLENBQUM7QUFFMUMsU0FBZ0IsUUFBUSxDQUFDLEtBQTBFLEVBQUUsSUFBaUIsRUFBRSxHQUFHLElBQUk7SUFFOUgsSUFBSSxJQUFhLENBQUM7SUFFbEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUN4QjtRQUNDLE9BQU8sS0FBSzthQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FDdEM7S0FDRDtTQUNJLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUNwQztRQUNDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7S0FDM0I7U0FDSSxJQUFJLElBQUksQ0FBQyxJQUFJLFlBQVksTUFBTSxFQUNwQztRQUNDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUM1QjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQXBCRCw0QkFvQkM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxjQUc5QjtJQUNILEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztDQUNoQjtJQUVBLFNBQVMscUJBQXFCLENBQTBCLE1BQVMsRUFBRSxHQUFHLElBQUk7UUFFekUsSUFBSSxPQUFPLEdBQUcscUJBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFZLENBQUM7UUFFN0MsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUc7WUFDbEIsVUFBVTtZQUNWLFdBQVc7WUFD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ZmVyZW5jZSB0eXBlcz1cIndlYnBhY2tcIi8+XG5pbXBvcnQgdHlwZSB7IENvbmZpZ3VyYXRpb24sIFJ1bGVTZXRSdWxlIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyB3b3Jrc3BhY2VzUGFja2FnZXNMaXN0IH0gZnJvbSAnd3MtcGtnLWxpc3QnO1xuaW1wb3J0IGZpbmRSb290IGZyb20gJ0B5YXJuLXRvb2wvZmluZC1yb290JztcbmltcG9ydCBnZXRMb2dnZXIgZnJvbSAnd2VicGFjay1sb2cnO1xuaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgbm9ybWFsaXplIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBJVFNWYWx1ZU9yQXJyYXkgfSBmcm9tICd0cy10eXBlJztcblxuY29uc3QgbmFtZSA9ICd3ZWJwYWNrLXdvcmtzcGFjZXMtc3VwcG9ydCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0UnVsZSh0ZXN0czogSVRTVmFsdWVPckFycmF5PHN0cmluZyB8ICgocnVsZTogUnVsZVNldFJ1bGUsIC4uLmFyZ3YpID0+IGJvb2xlYW4pPiwgcnVsZTogUnVsZVNldFJ1bGUsIC4uLmFyZ3YpXG57XG5cdGxldCBib29sOiBib29sZWFuO1xuXG5cdGlmIChBcnJheS5pc0FycmF5KHRlc3RzKSlcblx0e1xuXHRcdHJldHVybiB0ZXN0c1xuXHRcdFx0LnNvbWUodiA9PiB0ZXN0UnVsZSh2LCBydWxlLCAuLi5hcmd2KSlcblx0XHQ7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIHRlc3RzID09PSAnZnVuY3Rpb24nKVxuXHR7XG5cdFx0Ym9vbCA9IHRlc3RzKHJ1bGUsIC4uLmFyZ3YpXG5cdH1cblx0ZWxzZSBpZiAocnVsZS50ZXN0IGluc3RhbmNlb2YgUmVnRXhwKVxuXHR7XG5cdFx0Ym9vbCA9IHJ1bGUudGVzdC50ZXN0KHRlc3RzKVxuXHR9XG5cblx0cmV0dXJuIGJvb2w7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdXaXRoV29ya3NwYWNlcyhpbml0T3B0aW9uczoge1xuXHRjd2Q6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpLFxuXHR0ZXN0cz86IHN0cmluZyB8IHN0cmluZ1tdIHwgKChydWxlOiBSdWxlU2V0UnVsZSwgLi4uYXJndikgPT4gYm9vbGVhbiksXG59ID0ge1xuXHRjd2Q6IHByb2Nlc3MuY3dkLFxufSlcbntcblx0ZnVuY3Rpb24gd2l0aFdvcmtzcGFjZXNTdXBwb3J0PFQgZXh0ZW5kcyBDb25maWd1cmF0aW9uPihjb25maWc6IFQsIC4uLmFyZ3YpXG5cdHtcblx0XHRsZXQgY29uc29sZSA9IGdldExvZ2dlcih7IG5hbWUgfSkgYXMgQ29uc29sZTtcblxuXHRcdGxldCB7IGN3ZCwgdGVzdHMgPSBbXG5cdFx0XHQnaW5kZXgudHMnLFxuXHRcdFx0J2luZGV4LnRzeCcsXG5cdFx0XHQnaW5kZXguanMnLFxuXHRcdFx0J2luZGV4LmpzeCcsXG5cdFx0XHQnaW5kZXgubWpzJyxcblx0XHRdIH0gPSBpbml0T3B0aW9ucztcblxuXHRcdGlmICh0eXBlb2YgY3dkID09PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdGN3ZCA9IGN3ZCgpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChjd2QgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdGVzdHMgPT09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdHRlc3RzID0gW3Rlc3RzXTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZW9mIHRlc3RzID09PSAnZnVuY3Rpb24nKVxuXHRcdHtcblxuXHRcdH1cblx0XHRlbHNlIGlmICghdGVzdHMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRlc3RzID0gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zb2xlLmluZm8oYG9wdGlvbnNgLCBpbnNwZWN0KHtcblx0XHRcdC4uLmluaXRPcHRpb25zLFxuXHRcdFx0Y3dkLFxuXHRcdFx0dGVzdHMsXG5cdFx0fSkpO1xuXG5cdFx0aWYgKHRlc3RzKVxuXHRcdHtcblx0XHRcdGNvbnN0IHdzID0gZmluZFJvb3Qoe1xuXHRcdFx0XHRjd2Rcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAod3MuaGFzV29ya3NwYWNlKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbHMgPSB3b3Jrc3BhY2VzUGFja2FnZXNMaXN0KHdzLnJvb3QsIHRydWUpXG5cdFx0XHRcdFx0Lm1hcCh2ID0+IG5vcm1hbGl6ZSh2KSlcblx0XHRcdFx0O1xuXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyhgcGFja2FnZXMgbGlzdGAsIGluc3BlY3QobHMpKTtcblxuXHRcdFx0XHRjb25maWcubW9kdWxlLnJ1bGVzXG5cdFx0XHRcdFx0LmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgYm9vbDogYm9vbGVhbjtcblxuXHRcdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhgY3VycmVudCBydWxlYCwgaW5zcGVjdChydWxlKSk7XG5cblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHJ1bGUuaW5jbHVkZSkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGJvb2wgPSB0ZXN0UnVsZSh0ZXN0cywgcnVsZSwgLi4uYXJndik7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGJvb2wgPT0gbnVsbClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihgY2FuJ3QgaGFuZGxlIHRoaXMgcnVsZWAsIGluc3BlY3QocnVsZSkpXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoYm9vbClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHJ1bGUuaW5jbHVkZSA9PSBudWxsKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHJ1bGUuaW5jbHVkZSA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHQocnVsZS5pbmNsdWRlIGFzIHN0cmluZ1tdKS5wdXNoKC4uLmxzKTtcblxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZGVidWcoYHJ1bGUgYWZ0ZXIgY2hhbmdlYCwgaW5zcGVjdChydWxlKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGBub3Qgc3VwcG9ydCBjdXJyZW50IHJ1bGVgLCBpbnNwZWN0KHJ1bGUpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Y29uc29sZS53YXJuKGBjdXJyZW50IHByb2plY3Qgbm90IGEgeWFybiB3b3Jrc3BhY2VzLCBkaWRuJ3QgbmVlZCB0aGlzIHBsdWdpbi4gJHt3cy5yb290fWApXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbmZpZztcblx0fVxuXG5cdCgoKSA9PiB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHdpdGhXb3Jrc3BhY2VzU3VwcG9ydC5kZWZhdWx0ID0gd2l0aFdvcmtzcGFjZXNTdXBwb3J0O1xuXHR9KSgpO1xuXG5cdHJldHVybiB3aXRoV29ya3NwYWNlc1N1cHBvcnRcbn1cblxuZXhwb3J0IGNvbnN0IHdpdGhXb3Jrc3BhY2VzU3VwcG9ydCA9IG5ld1dpdGhXb3Jrc3BhY2VzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhXb3Jrc3BhY2VzU3VwcG9ydFxuIl19