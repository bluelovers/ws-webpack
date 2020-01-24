/**
 * Created by user on 2020/1/24.
 */

import _withWorkspacesSupport from './index';
import type { Configuration, RuleSetRule } from 'webpack';

interface INextConfig
{
	webpack?(...argv): any
}

function withWorkspacesSupport<N extends INextConfig>(nextConfig: N = {} as N)
{
	let { webpack } = nextConfig;

	return {
		...nextConfig,

		webpack(config: Configuration, ...argv): Configuration
		{
			if (typeof webpack === 'function')
			{

				let _config = webpack(config, ...argv) as Configuration;

				if (_config != null)
				{
					config = _config;
				}
			}

			_withWorkspacesSupport(config, ...argv);

			return config;
		},
	};
}

withWorkspacesSupport.default = withWorkspacesSupport;

export = withWorkspacesSupport
