///<reference types="webpack"/>
import type { Configuration, RuleSetRule } from 'webpack';
import { workspacesPackagesList } from 'ws-pkg-list';
import findRoot from '@yarn-tool/find-root';
import getLogger from 'webpack-log';
import { inspect } from 'util';

export function newWithWorkspaces(initOptions: {
	cwd: string | (() => string),
	tests?: string | string[] | ((rule: RuleSetRule) => boolean),
} = {
	cwd: process.cwd,
})
{
	function webpackConfig<T extends Configuration>(config: T)
	{
		let { cwd, tests } = initOptions;

		if (typeof cwd === 'function')
		{
			cwd = cwd();
		}
		else if (cwd == null)
		{
			cwd = process.cwd();
		}

		if (typeof tests === 'string')
		{
			tests = [tests];
		}
		else if (!tests.length)
		{
			tests = null;
		}

		if (tests)
		{
			let console = getLogger({ name: 'webpack-workspaces-support' }) as Console;

			const ws = findRoot({
				cwd
			});

			if (ws.hasWorkspace)
			{
				let ls = workspacesPackagesList(ws.root, true);

				config.module.rules
					.forEach(rule => {
						let bool: boolean;

						if (Array.isArray(rule.include))
						{
							if (typeof tests === 'function')
							{
								bool = tests(rule)
							}
							else if (rule.test instanceof RegExp)
							{
								bool = (tests as string[]).some(v => (rule.test as RegExp).test(v))
							}
							else if (typeof rule.test === 'function')
							{
								bool = (tests as string[]).some(v => (rule.test as Function)(v))
							}
							else
							{
								console.warn(`can't handle this rule`, inspect(rule))
							}

							if (bool)
							{
								rule.include.push(...ls)
							}
						}
						else
						{
							console.warn(`not support current rule`, inspect(rule))
						}
					})
				;
			}
			else
			{
				console.warn(`current project not a yarn workspaces, didn't need this plugin. ${ws.root}`)
			}
		}

		return config;
	}

	(() => {
		// @ts-ignore
		webpackConfig.default = webpackConfig;
	})();

	return webpackConfig
}

export declare function webpackConfig<T extends Configuration>(config: T): T;

exports.webpackConfig = newWithWorkspaces();

export default webpackConfig
