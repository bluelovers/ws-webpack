/**
 * Created by user on 2020/1/24.
 */

import withWorkspacesSupport from '../index';
import type { Configuration } from 'webpack';
import assert from 'assert';

let config: Configuration = {
	module: {
		rules: [
			{
				test: /.tsx?/,
				include: [],
			},
			{

			},
		]
	}
};

withWorkspacesSupport(config);

console.dir(config.module.rules);

assert((config.module.rules[0].include as string[]).length)


