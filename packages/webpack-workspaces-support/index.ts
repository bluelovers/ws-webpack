///<reference types="webpack"/>
import type { Configuration, RuleSetRule } from 'webpack';
import { workspacesPackagesList } from 'ws-pkg-list';
import findRoot from '@yarn-tool/find-root';
import getLogger from 'webpack-log';
import { inspect } from 'util';
import { normalize } from 'path';
import { ITSValueOrArray } from 'ts-type';

const name = 'webpack-workspaces-support';

export function testRule(tests: ITSValueOrArray<string | ((rule: RuleSetRule, ...argv) => boolean)>, rule: RuleSetRule, ...argv)
{
	let bool: boolean;

	if (Array.isArray(tests))
	{
		return tests
			.some(v => testRule(v, rule, ...argv))
		;
	}
	else if (typeof tests === 'function')
	{
		bool = tests(rule, ...argv)
	}
	else if (rule.test instanceof RegExp)
	{
		bool = rule.test.test(tests)
	}

	return bool;
}

export function newWithWorkspaces(initOptions: {
	cwd: string | (() => string),
	tests?: string | string[] | ((rule: RuleSetRule, ...argv) => boolean),
} = {
	cwd: process.cwd,
})
{
	function withWorkspacesSupport<T extends Configuration>(config: T, ...argv)
	{
		let console = getLogger({ name }) as Console;

		let { cwd, tests = [
			'index.ts',
			'index.tsx',
			'index.js',
			'index.jsx',
			'index.mjs',
		] } = initOptions;

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
		else if (typeof tests === 'function')
		{

		}
		else if (!tests.length)
		{
			tests = null;
		}

		console.info(`options`, inspect({
			...initOptions,
			cwd,
			tests,
		}));

		if (tests)
		{
			const ws = findRoot({
				cwd
			});

			if (ws.hasWorkspace)
			{
				let ls = workspacesPackagesList(ws.root, true)
					.map(v => normalize(v))
				;

				console.info(`packages list`, inspect(ls));

				config.module.rules
					.forEach(rule => {
						let bool: boolean;

						console.debug(`current rule`, inspect(rule));

						if (Array.isArray(rule.include))
						{
							bool = testRule(tests, rule, ...argv);

							if (bool == null)
							{
								console.warn(`can't handle this rule`, inspect(rule))
							}

							if (bool)
							{
								/*
								if (rule.include == null)
								{
									rule.include = [];
								}
								 */
								(rule.include as string[]).push(...ls);

								console.debug(`rule after change`, inspect(rule));
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
		withWorkspacesSupport.default = withWorkspacesSupport;
	})();

	return withWorkspacesSupport
}

export const withWorkspacesSupport = newWithWorkspaces();

export default withWorkspacesSupport
