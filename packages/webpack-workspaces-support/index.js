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
function newWithWorkspaces(initOptions = {
    cwd: process.cwd,
}) {
    function withWorkspacesSupport(config, ...argv) {
        let console = webpack_log_1.default({ name });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZDQUFxRDtBQUNyRCxxRUFBNEM7QUFDNUMsOERBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQiwrQkFBaUM7QUFFakMsTUFBTSxJQUFJLEdBQUcsNEJBQTRCLENBQUM7QUFFMUMsU0FBZ0IsaUJBQWlCLENBQUMsY0FHOUI7SUFDSCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Q0FDaEI7SUFFQSxTQUFTLHFCQUFxQixDQUEwQixNQUFTLEVBQUUsR0FBRyxJQUFJO1FBRXpFLElBQUksT0FBTyxHQUFHLHFCQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBWSxDQUFDO1FBRTdDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHO1lBQ2xCLFVBQVU7WUFDVixXQUFXO1NBQ1gsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUVsQixJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFDN0I7WUFDQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDWjthQUNJLElBQUksR0FBRyxJQUFJLElBQUksRUFDcEI7WUFDQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQzdCO1lBQ0MsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEI7YUFDSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFDcEM7U0FFQzthQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUN0QjtZQUNDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQU8sQ0FBQztZQUMvQixHQUFHLFdBQVc7WUFDZCxHQUFHO1lBQ0gsS0FBSztTQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxLQUFLLEVBQ1Q7WUFDQyxNQUFNLEVBQUUsR0FBRyxtQkFBUSxDQUFDO2dCQUNuQixHQUFHO2FBQ0gsQ0FBQyxDQUFDO1lBRUgsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUNuQjtnQkFDQyxJQUFJLEVBQUUsR0FBRyxvQ0FBc0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDNUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN2QjtnQkFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLO3FCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2YsSUFBSSxJQUFhLENBQUM7b0JBRWxCLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUMvQjt3QkFDQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFDL0I7NEJBQ0MsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTt5QkFDM0I7NkJBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLE1BQU0sRUFDcEM7NEJBQ0MsSUFBSSxHQUFJLEtBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsSUFBSSxDQUFDLElBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDbkU7NkJBQ0ksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUN4Qzs0QkFDQyxJQUFJLEdBQUksS0FBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUMsSUFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3lCQUNoRTs2QkFFRDs0QkFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3lCQUNyRDt3QkFFRCxJQUFJLElBQUksRUFDUjs0QkFDQzs7Ozs7K0JBS0c7NEJBQ0YsSUFBSSxDQUFDLE9BQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBRXZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2xEO3FCQUNEO3lCQUVEO3dCQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7cUJBQ3ZEO2dCQUNGLENBQUMsQ0FBQyxDQUNGO2FBQ0Q7aUJBRUQ7Z0JBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7YUFDMUY7U0FDRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELENBQUMsR0FBRyxFQUFFO1FBQ0wsYUFBYTtRQUNiLHFCQUFxQixDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRUwsT0FBTyxxQkFBcUIsQ0FBQTtBQUM3QixDQUFDO0FBdEhELDhDQXNIQztBQUVZLFFBQUEscUJBQXFCLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUV6RCxrQkFBZSw2QkFBcUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrXCIvPlxuaW1wb3J0IHR5cGUgeyBDb25maWd1cmF0aW9uLCBSdWxlU2V0UnVsZSB9IGZyb20gJ3dlYnBhY2snO1xuaW1wb3J0IHsgd29ya3NwYWNlc1BhY2thZ2VzTGlzdCB9IGZyb20gJ3dzLXBrZy1saXN0JztcbmltcG9ydCBmaW5kUm9vdCBmcm9tICdAeWFybi10b29sL2ZpbmQtcm9vdCc7XG5pbXBvcnQgZ2V0TG9nZ2VyIGZyb20gJ3dlYnBhY2stbG9nJztcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCBuYW1lID0gJ3dlYnBhY2std29ya3NwYWNlcy1zdXBwb3J0JztcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1dpdGhXb3Jrc3BhY2VzKGluaXRPcHRpb25zOiB7XG5cdGN3ZDogc3RyaW5nIHwgKCgpID0+IHN0cmluZyksXG5cdHRlc3RzPzogc3RyaW5nIHwgc3RyaW5nW10gfCAoKHJ1bGU6IFJ1bGVTZXRSdWxlLCAuLi5hcmd2KSA9PiBib29sZWFuKSxcbn0gPSB7XG5cdGN3ZDogcHJvY2Vzcy5jd2QsXG59KVxue1xuXHRmdW5jdGlvbiB3aXRoV29ya3NwYWNlc1N1cHBvcnQ8VCBleHRlbmRzIENvbmZpZ3VyYXRpb24+KGNvbmZpZzogVCwgLi4uYXJndilcblx0e1xuXHRcdGxldCBjb25zb2xlID0gZ2V0TG9nZ2VyKHsgbmFtZSB9KSBhcyBDb25zb2xlO1xuXG5cdFx0bGV0IHsgY3dkLCB0ZXN0cyA9IFtcblx0XHRcdCdpbmRleC50cycsXG5cdFx0XHQnaW5kZXgudHN4Jyxcblx0XHRdIH0gPSBpbml0T3B0aW9ucztcblxuXHRcdGlmICh0eXBlb2YgY3dkID09PSAnZnVuY3Rpb24nKVxuXHRcdHtcblx0XHRcdGN3ZCA9IGN3ZCgpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChjd2QgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdGVzdHMgPT09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdHRlc3RzID0gW3Rlc3RzXTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZW9mIHRlc3RzID09PSAnZnVuY3Rpb24nKVxuXHRcdHtcblxuXHRcdH1cblx0XHRlbHNlIGlmICghdGVzdHMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRlc3RzID0gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zb2xlLmluZm8oYG9wdGlvbnNgLCBpbnNwZWN0KHtcblx0XHRcdC4uLmluaXRPcHRpb25zLFxuXHRcdFx0Y3dkLFxuXHRcdFx0dGVzdHMsXG5cdFx0fSkpO1xuXG5cdFx0aWYgKHRlc3RzKVxuXHRcdHtcblx0XHRcdGNvbnN0IHdzID0gZmluZFJvb3Qoe1xuXHRcdFx0XHRjd2Rcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAod3MuaGFzV29ya3NwYWNlKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbHMgPSB3b3Jrc3BhY2VzUGFja2FnZXNMaXN0KHdzLnJvb3QsIHRydWUpXG5cdFx0XHRcdFx0Lm1hcCh2ID0+IG5vcm1hbGl6ZSh2KSlcblx0XHRcdFx0O1xuXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyhgcGFja2FnZXMgbGlzdGAsIGluc3BlY3QobHMpKTtcblxuXHRcdFx0XHRjb25maWcubW9kdWxlLnJ1bGVzXG5cdFx0XHRcdFx0LmZvckVhY2gocnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgYm9vbDogYm9vbGVhbjtcblxuXHRcdFx0XHRcdFx0Y29uc29sZS5kZWJ1ZyhgY3VycmVudCBydWxlYCwgaW5zcGVjdChydWxlKSk7XG5cblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHJ1bGUuaW5jbHVkZSkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGVzdHMgPT09ICdmdW5jdGlvbicpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gdGVzdHMocnVsZSwgLi4uYXJndilcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmIChydWxlLnRlc3QgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gKHRlc3RzIGFzIHN0cmluZ1tdKS5zb21lKHYgPT4gKHJ1bGUudGVzdCBhcyBSZWdFeHApLnRlc3QodikpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGUudGVzdCA9PT0gJ2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvb2wgPSAodGVzdHMgYXMgc3RyaW5nW10pLnNvbWUodiA9PiAocnVsZS50ZXN0IGFzIEZ1bmN0aW9uKSh2KSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYGNhbid0IGhhbmRsZSB0aGlzIHJ1bGVgLCBpbnNwZWN0KHJ1bGUpKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGJvb2wpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdGlmIChydWxlLmluY2x1ZGUgPT0gbnVsbClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRydWxlLmluY2x1ZGUgPSBbXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0KHJ1bGUuaW5jbHVkZSBhcyBzdHJpbmdbXSkucHVzaCguLi5scyk7XG5cblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmRlYnVnKGBydWxlIGFmdGVyIGNoYW5nZWAsIGluc3BlY3QocnVsZSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybihgbm90IHN1cHBvcnQgY3VycmVudCBydWxlYCwgaW5zcGVjdChydWxlKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUud2FybihgY3VycmVudCBwcm9qZWN0IG5vdCBhIHlhcm4gd29ya3NwYWNlcywgZGlkbid0IG5lZWQgdGhpcyBwbHVnaW4uICR7d3Mucm9vdH1gKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjb25maWc7XG5cdH1cblxuXHQoKCkgPT4ge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHR3aXRoV29ya3NwYWNlc1N1cHBvcnQuZGVmYXVsdCA9IHdpdGhXb3Jrc3BhY2VzU3VwcG9ydDtcblx0fSkoKTtcblxuXHRyZXR1cm4gd2l0aFdvcmtzcGFjZXNTdXBwb3J0XG59XG5cbmV4cG9ydCBjb25zdCB3aXRoV29ya3NwYWNlc1N1cHBvcnQgPSBuZXdXaXRoV29ya3NwYWNlcygpO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoV29ya3NwYWNlc1N1cHBvcnRcbiJdfQ==