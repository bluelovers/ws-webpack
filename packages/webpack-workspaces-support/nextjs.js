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
//# sourceMappingURL=nextjs.js.map