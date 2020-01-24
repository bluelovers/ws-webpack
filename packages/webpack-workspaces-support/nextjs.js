"use strict";
/**
 * Created by user on 2020/1/24.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("./index"));
function withWorkspacesSupport(nextConfig = {}) {
    let { webpack } = nextConfig;
    return {
        ...nextConfig,
        webpack(config, ...argv) {
            if (typeof webpack === 'function') {
                let _config = webpack(config, ...argv);
                if (_config != null) {
                    config = _config;
                }
            }
            index_1.default(config, ...argv);
            return config;
        },
    };
}
withWorkspacesSupport.default = withWorkspacesSupport;
module.exports = withWorkspacesSupport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV4dGpzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV4dGpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7OztBQUVILG9EQUE2QztBQVE3QyxTQUFTLHFCQUFxQixDQUF3QixhQUFnQixFQUFPO0lBRTVFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUM7SUFFN0IsT0FBTztRQUNOLEdBQUcsVUFBVTtRQUViLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEdBQUcsSUFBSTtZQUVyQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFDakM7Z0JBRUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBa0IsQ0FBQztnQkFFeEQsSUFBSSxPQUFPLElBQUksSUFBSSxFQUNuQjtvQkFDQyxNQUFNLEdBQUcsT0FBTyxDQUFDO2lCQUNqQjthQUNEO1lBRUQsZUFBc0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUV4QyxPQUFPLE1BQU0sQ0FBQztRQUNmLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELHFCQUFxQixDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztBQUV0RCxpQkFBUyxxQkFBcUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMjAvMS8yNC5cbiAqL1xuXG5pbXBvcnQgX3dpdGhXb3Jrc3BhY2VzU3VwcG9ydCBmcm9tICcuL2luZGV4JztcbmltcG9ydCB0eXBlIHsgQ29uZmlndXJhdGlvbiwgUnVsZVNldFJ1bGUgfSBmcm9tICd3ZWJwYWNrJztcblxuaW50ZXJmYWNlIElOZXh0Q29uZmlnXG57XG5cdHdlYnBhY2s/KC4uLmFyZ3YpOiBhbnlcbn1cblxuZnVuY3Rpb24gd2l0aFdvcmtzcGFjZXNTdXBwb3J0PE4gZXh0ZW5kcyBJTmV4dENvbmZpZz4obmV4dENvbmZpZzogTiA9IHt9IGFzIE4pXG57XG5cdGxldCB7IHdlYnBhY2sgfSA9IG5leHRDb25maWc7XG5cblx0cmV0dXJuIHtcblx0XHQuLi5uZXh0Q29uZmlnLFxuXG5cdFx0d2VicGFjayhjb25maWc6IENvbmZpZ3VyYXRpb24sIC4uLmFyZ3YpOiBDb25maWd1cmF0aW9uXG5cdFx0e1xuXHRcdFx0aWYgKHR5cGVvZiB3ZWJwYWNrID09PSAnZnVuY3Rpb24nKVxuXHRcdFx0e1xuXG5cdFx0XHRcdGxldCBfY29uZmlnID0gd2VicGFjayhjb25maWcsIC4uLmFyZ3YpIGFzIENvbmZpZ3VyYXRpb247XG5cblx0XHRcdFx0aWYgKF9jb25maWcgIT0gbnVsbClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbmZpZyA9IF9jb25maWc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0X3dpdGhXb3Jrc3BhY2VzU3VwcG9ydChjb25maWcsIC4uLmFyZ3YpO1xuXG5cdFx0XHRyZXR1cm4gY29uZmlnO1xuXHRcdH0sXG5cdH07XG59XG5cbndpdGhXb3Jrc3BhY2VzU3VwcG9ydC5kZWZhdWx0ID0gd2l0aFdvcmtzcGFjZXNTdXBwb3J0O1xuXG5leHBvcnQgPSB3aXRoV29ya3NwYWNlc1N1cHBvcnRcbiJdfQ==