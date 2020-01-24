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
    function webpackConfig(config) {
        let { cwd, tests } = initOptions;
        if (typeof cwd === 'function') {
            cwd = cwd();
        }
        else if (cwd == null) {
            cwd = process.cwd();
        }
        if (typeof tests === 'string') {
            tests = [tests];
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
                            bool = tests(rule);
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
        webpackConfig.default = webpackConfig;
    })();
    return webpackConfig;
}
exports.newWithWorkspaces = newWithWorkspaces;
exports.webpackConfig = newWithWorkspaces();
exports.default = webpackConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLDZDQUFxRDtBQUNyRCxxRUFBNEM7QUFDNUMsOERBQW9DO0FBQ3BDLCtCQUErQjtBQUUvQixTQUFnQixpQkFBaUIsQ0FBQyxjQUc5QjtJQUNILEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztDQUNoQjtJQUVBLFNBQVMsYUFBYSxDQUEwQixNQUFTO1FBRXhELElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBRWpDLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUM3QjtZQUNDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNaO2FBQ0ksSUFBSSxHQUFHLElBQUksSUFBSSxFQUNwQjtZQUNDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDcEI7UUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFDN0I7WUFDQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQjthQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUN0QjtZQUNDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksS0FBSyxFQUNUO1lBQ0MsSUFBSSxPQUFPLEdBQUcscUJBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBRSxDQUFZLENBQUM7WUFFM0UsTUFBTSxFQUFFLEdBQUcsbUJBQVEsQ0FBQztnQkFDbkIsR0FBRzthQUNILENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDLFlBQVksRUFDbkI7Z0JBQ0MsSUFBSSxFQUFFLEdBQUcsb0NBQXNCLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLO3FCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2YsSUFBSSxJQUFhLENBQUM7b0JBRWxCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQy9CO3dCQUNDLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUMvQjs0QkFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO3lCQUNsQjs2QkFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLFlBQVksTUFBTSxFQUNwQzs0QkFDQyxJQUFJLEdBQUksS0FBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUMsSUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3lCQUNuRTs2QkFDSSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQ3hDOzRCQUNDLElBQUksR0FBSSxLQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLElBQUksQ0FBQyxJQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7eUJBQ2hFOzZCQUVEOzRCQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7eUJBQ3JEO3dCQUVELElBQUksSUFBSSxFQUNSOzRCQUNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7eUJBQ3hCO3FCQUNEO3lCQUVEO3dCQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7cUJBQ3ZEO2dCQUNGLENBQUMsQ0FBQyxDQUNGO2FBQ0Q7aUJBRUQ7Z0JBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7YUFDMUY7U0FDRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVELENBQUMsR0FBRyxFQUFFO1FBQ0wsYUFBYTtRQUNiLGFBQWEsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTCxPQUFPLGFBQWEsQ0FBQTtBQUNyQixDQUFDO0FBM0ZELDhDQTJGQztBQUlELE9BQU8sQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUU1QyxrQkFBZSxhQUFhLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHR5cGVzPVwid2VicGFja1wiLz5cbmltcG9ydCB0eXBlIHsgQ29uZmlndXJhdGlvbiwgUnVsZVNldFJ1bGUgfSBmcm9tICd3ZWJwYWNrJztcbmltcG9ydCB7IHdvcmtzcGFjZXNQYWNrYWdlc0xpc3QgfSBmcm9tICd3cy1wa2ctbGlzdCc7XG5pbXBvcnQgZmluZFJvb3QgZnJvbSAnQHlhcm4tdG9vbC9maW5kLXJvb3QnO1xuaW1wb3J0IGdldExvZ2dlciBmcm9tICd3ZWJwYWNrLWxvZyc7XG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdXaXRoV29ya3NwYWNlcyhpbml0T3B0aW9uczoge1xuXHRjd2Q6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpLFxuXHR0ZXN0cz86IHN0cmluZyB8IHN0cmluZ1tdIHwgKChydWxlOiBSdWxlU2V0UnVsZSkgPT4gYm9vbGVhbiksXG59ID0ge1xuXHRjd2Q6IHByb2Nlc3MuY3dkLFxufSlcbntcblx0ZnVuY3Rpb24gd2VicGFja0NvbmZpZzxUIGV4dGVuZHMgQ29uZmlndXJhdGlvbj4oY29uZmlnOiBUKVxuXHR7XG5cdFx0bGV0IHsgY3dkLCB0ZXN0cyB9ID0gaW5pdE9wdGlvbnM7XG5cblx0XHRpZiAodHlwZW9mIGN3ZCA9PT0gJ2Z1bmN0aW9uJylcblx0XHR7XG5cdFx0XHRjd2QgPSBjd2QoKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoY3dkID09IG51bGwpXG5cdFx0e1xuXHRcdFx0Y3dkID0gcHJvY2Vzcy5jd2QoKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHRlc3RzID09PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHR0ZXN0cyA9IFt0ZXN0c107XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCF0ZXN0cy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGVzdHMgPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0ZXN0cylcblx0XHR7XG5cdFx0XHRsZXQgY29uc29sZSA9IGdldExvZ2dlcih7IG5hbWU6ICd3ZWJwYWNrLXdvcmtzcGFjZXMtc3VwcG9ydCcgfSkgYXMgQ29uc29sZTtcblxuXHRcdFx0Y29uc3Qgd3MgPSBmaW5kUm9vdCh7XG5cdFx0XHRcdGN3ZFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh3cy5oYXNXb3Jrc3BhY2UpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBscyA9IHdvcmtzcGFjZXNQYWNrYWdlc0xpc3Qod3Mucm9vdCwgdHJ1ZSk7XG5cblx0XHRcdFx0Y29uZmlnLm1vZHVsZS5ydWxlc1xuXHRcdFx0XHRcdC5mb3JFYWNoKHJ1bGUgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IGJvb2w6IGJvb2xlYW47XG5cblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHJ1bGUuaW5jbHVkZSkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGVzdHMgPT09ICdmdW5jdGlvbicpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gdGVzdHMocnVsZSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmIChydWxlLnRlc3QgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRib29sID0gKHRlc3RzIGFzIHN0cmluZ1tdKS5zb21lKHYgPT4gKHJ1bGUudGVzdCBhcyBSZWdFeHApLnRlc3QodikpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGUudGVzdCA9PT0gJ2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGJvb2wgPSAodGVzdHMgYXMgc3RyaW5nW10pLnNvbWUodiA9PiAocnVsZS50ZXN0IGFzIEZ1bmN0aW9uKSh2KSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYGNhbid0IGhhbmRsZSB0aGlzIHJ1bGVgLCBpbnNwZWN0KHJ1bGUpKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGJvb2wpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRydWxlLmluY2x1ZGUucHVzaCguLi5scylcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oYG5vdCBzdXBwb3J0IGN1cnJlbnQgcnVsZWAsIGluc3BlY3QocnVsZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYGN1cnJlbnQgcHJvamVjdCBub3QgYSB5YXJuIHdvcmtzcGFjZXMsIGRpZG4ndCBuZWVkIHRoaXMgcGx1Z2luLiAke3dzLnJvb3R9YClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY29uZmlnO1xuXHR9XG5cblx0KCgpID0+IHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0d2VicGFja0NvbmZpZy5kZWZhdWx0ID0gd2VicGFja0NvbmZpZztcblx0fSkoKTtcblxuXHRyZXR1cm4gd2VicGFja0NvbmZpZ1xufVxuXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiB3ZWJwYWNrQ29uZmlnPFQgZXh0ZW5kcyBDb25maWd1cmF0aW9uPihjb25maWc6IFQpOiBUO1xuXG5leHBvcnRzLndlYnBhY2tDb25maWcgPSBuZXdXaXRoV29ya3NwYWNlcygpO1xuXG5leHBvcnQgZGVmYXVsdCB3ZWJwYWNrQ29uZmlnXG4iXX0=