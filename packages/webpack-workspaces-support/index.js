"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_pkg_list_1 = require("ws-pkg-list");
const find_root_1 = __importDefault(require("@yarn-tool/find-root"));
const webpack_log_1 = __importDefault(require("webpack-log"));
const util_1 = require("util");
function newWithWorkspaces(initOptions = {
    cwd: process.cwd,
}) {
    function withWorkspacesSupport(config, ...argv) {
        let { cwd, tests = [
            'index.ts',
            'index.tsx',
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
        if (tests) {
            let console = webpack_log_1.default({ name: 'webpack-workspaces-support' });
            const ws = find_root_1.default({
                cwd
            });
            if (ws.hasWorkspace) {
                let ls = ws_pkg_list_1.workspacesPackagesList(ws.root, true);
                config.module.rules
                    .forEach(rule => {
                    let bool;
                    if (Array.isArray(rule.include)) {
                        if (typeof tests === 'function') {
                            bool = tests(rule, ...argv);
                        }
                        else if (rule.test instanceof RegExp) {
                            bool = tests.some(v => rule.test.test(v));
                        }
                        else if (typeof rule.test === 'function') {
                            bool = tests.some(v => rule.test(v));
                        }
                        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZDQUFxRDtBQUNyRCxxRUFBNEM7QUFDNUMsOERBQW9DO0FBQ3BDLCtCQUErQjtBQUUvQixTQUFnQixpQkFBaUIsQ0FBQyxjQUc5QjtJQUNILEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztDQUNoQjtJQUVBLFNBQVMscUJBQXFCLENBQTBCLE1BQVMsRUFBRSxHQUFHLElBQUk7UUFFekUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUc7WUFDbEIsVUFBVTtZQUNWLFdBQVc7U0FDWCxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBRWxCLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUM3QjtZQUNDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNaO2FBQ0ksSUFBSSxHQUFHLElBQUksSUFBSSxFQUNwQjtZQUNDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDcEI7UUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFDN0I7WUFDQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQjthQUNJLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUNwQztTQUVDO2FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3RCO1lBQ0MsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxLQUFLLEVBQ1Q7WUFDQyxJQUFJLE9BQU8sR0FBRyxxQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFLENBQVksQ0FBQztZQUUzRSxNQUFNLEVBQUUsR0FBRyxtQkFBUSxDQUFDO2dCQUNuQixHQUFHO2FBQ0gsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUNuQjtnQkFDQyxJQUFJLEVBQUUsR0FBRyxvQ0FBc0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUs7cUJBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDZixJQUFJLElBQWEsQ0FBQztvQkFFbEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFDL0I7d0JBQ0MsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQy9COzRCQUNDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7eUJBQzNCOzZCQUNJLElBQUksSUFBSSxDQUFDLElBQUksWUFBWSxNQUFNLEVBQ3BDOzRCQUNDLElBQUksR0FBSSxLQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLElBQUksQ0FBQyxJQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7eUJBQ25FOzZCQUNJLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFDeEM7NEJBQ0MsSUFBSSxHQUFJLEtBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsSUFBSSxDQUFDLElBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDaEU7NkJBRUQ7NEJBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTt5QkFDckQ7d0JBRUQsSUFBSSxJQUFJLEVBQ1I7NEJBQ0M7Ozs7OytCQUtHOzRCQUNGLElBQUksQ0FBQyxPQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO3lCQUN0QztxQkFDRDt5QkFFRDt3QkFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3FCQUN2RDtnQkFDRixDQUFDLENBQUMsQ0FDRjthQUNEO2lCQUVEO2dCQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUVBQW1FLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQzFGO1NBQ0Q7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFFRCxDQUFDLEdBQUcsRUFBRTtRQUNMLGFBQWE7UUFDYixxQkFBcUIsQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7SUFDdkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVMLE9BQU8scUJBQXFCLENBQUE7QUFDN0IsQ0FBQztBQXhHRCw4Q0F3R0M7QUFFWSxRQUFBLHFCQUFxQixHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFekQsa0JBQWUsNkJBQXFCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHR5cGVzPVwid2VicGFja1wiLz5cbmltcG9ydCB0eXBlIHsgQ29uZmlndXJhdGlvbiwgUnVsZVNldFJ1bGUgfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IHdvcmtzcGFjZXNQYWNrYWdlc0xpc3QgfSBmcm9tICd3cy1wa2ctbGlzdCc7XG5pbXBvcnQgZmluZFJvb3QgZnJvbSAnQHlhcm4tdG9vbC9maW5kLXJvb3QnO1xuaW1wb3J0IGdldExvZ2dlciBmcm9tICd3ZWJwYWNrLWxvZyc7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdXaXRoV29ya3NwYWNlcyhpbml0T3B0aW9uczoge1xuXHRjd2Q6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpLFxuXHR0ZXN0cz86IHN0cmluZyB8IHN0cmluZ1tdIHwgKChydWxlOiBSdWxlU2V0UnVsZSwgLi4uYXJndikgPT4gYm9vbGVhbiksXG59ID0ge1xuXHRjd2Q6IHByb2Nlc3MuY3dkLFxufSlcbntcblx0ZnVuY3Rpb24gd2l0aFdvcmtzcGFjZXNTdXBwb3J0PFQgZXh0ZW5kcyBDb25maWd1cmF0aW9uPihjb25maWc6IFQsIC4uLmFyZ3YpXG5cdHtcblx0XHRsZXQgeyBjd2QsIHRlc3RzID0gW1xuXHRcdFx0J2luZGV4LnRzJyxcblx0XHRcdCdpbmRleC50c3gnLFxuXHRcdF0gfSA9IGluaXRPcHRpb25zO1xuXG5cdFx0aWYgKHR5cGVvZiBjd2QgPT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXHRcdFx0Y3dkID0gY3dkKCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGN3ZCA9PSBudWxsKVxuXHRcdHtcblx0XHRcdGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB0ZXN0cyA9PT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0dGVzdHMgPSBbdGVzdHNdO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0eXBlb2YgdGVzdHMgPT09ICdmdW5jdGlvbicpXG5cdFx0e1xuXG5cdFx0fVxuXHRcdGVsc2UgaWYgKCF0ZXN0cy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGVzdHMgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0ZXN0cylcblx0XHR7XG5cdFx0XHRsZXQgY29uc29sZSA9IGdldExvZ2dlcih7IG5hbWU6ICd3ZWJwYWNrLXdvcmtzcGFjZXMtc3VwcG9ydCcgfSkgYXMgQ29uc29sZTtcblxuXHRcdFx0Y29uc3Qgd3MgPSBmaW5kUm9vdCh7XG5cdFx0XHRcdGN3ZFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3cy5oYXNXb3Jrc3BhY2UpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBscyA9IHdvcmtzcGFjZXNQYWNrYWdlc0xpc3Qod3Mucm9vdCwgdHJ1ZSk7XG5cblx0XHRcdFx0Y29uZmlnLm1vZHVsZS5ydWxlc1xuXHRcdFx0XHRcdC5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGJvb2w6IGJvb2xlYW47XG5cblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHJ1bGUuaW5jbHVkZSkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGVzdHMgPT09ICdmdW5jdGlvbicpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gdGVzdHMocnVsZSwgLi4uYXJndilcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmIChydWxlLnRlc3QgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gKHRlc3RzIGFzIHN0cmluZ1tdKS5zb21lKHYgPT4gKHJ1bGUudGVzdCBhcyBSZWdFeHApLnRlc3QodikpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGUudGVzdCA9PT0gJ2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvb2wgPSAodGVzdHMgYXMgc3RyaW5nW10pLnNvbWUodiA9PiAocnVsZS50ZXN0IGFzIEZ1bmN0aW9uKSh2KSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYGNhbid0IGhhbmRsZSB0aGlzIHJ1bGVgLCBpbnNwZWN0KHJ1bGUpKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGJvb2wpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdGlmIChydWxlLmluY2x1ZGUgPT0gbnVsbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRydWxlLmluY2x1ZGUgPSBbXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0KHJ1bGUuaW5jbHVkZSBhcyBzdHJpbmdbXSkucHVzaCguLi5scylcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYG5vdCBzdXBwb3J0IGN1cnJlbnQgcnVsZWAsIGluc3BlY3QocnVsZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYGN1cnJlbnQgcHJvamVjdCBub3QgYSB5YXJuIHdvcmtzcGFjZXMsIGRpZG4ndCBuZWVkIHRoaXMgcGx1Z2luLiAke3dzLnJvb3R9YClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY29uZmlnO1xuXHR9XG5cblx0KCgpID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0d2l0aFdvcmtzcGFjZXNTdXBwb3J0LmRlZmF1bHQgPSB3aXRoV29ya3NwYWNlc1N1cHBvcnQ7XG5cdH0pKCk7XG5cblx0cmV0dXJuIHdpdGhXb3Jrc3BhY2VzU3VwcG9ydFxufVxuXG5leHBvcnQgY29uc3Qgd2l0aFdvcmtzcGFjZXNTdXBwb3J0ID0gbmV3V2l0aFdvcmtzcGFjZXMoKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFdvcmtzcGFjZXNTdXBwb3J0XG4iXX0=