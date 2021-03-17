// @ts-nocheck
/* eslint-disable */
const resolve = require('rollup-plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const dts = require('rollup-plugin-dts').default;
// const ts = require('rollup-plugin-typescript2').default;
// const commonjs = require('rollup-plugin-commonjs');
// const jsonPlugin = require('@rollup/plugin-json');
const pkg = require('./package.json');
const isProd = (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production');

const { getPathSpec } = require('./.debug/getPath');
const getDate = require('./.debug/getDate');
const basePath = process.cwd();

const banner = `/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: ${getDate()}
*/`;

const TsConf = {
	// 入口文件
	// input: getPathSpec(basePath, 'src/index.ts'),
	input: getPathSpec(basePath, '.debug/dist/index.js'),
	// 出口文件
	output: {
		// file: getPathSpec(basePath, 'lib', 'index.js'),
		file: getPathSpec(basePath, pkg.main),
		format: 'umd',
		name: 'Tmind'
	},
	// // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
	external: []
};

const DtsConf = {
	// input: getPathSpec(basePath, 'src/index.ts'),
	input: getPathSpec(basePath, '.debug/dist/index.d.ts'),
	output: {
		file: getPathSpec(basePath, pkg.typings),
		// format: 'es'
		format: 'umd',
		name: 'Tmind'
	},
	plugins: [dts()]
};

if (isProd) {
	TsConf.output.banner = banner;
	TsConf.plugins = [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		// commonjs(),
		resolve({
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		}),
		// jsonPlugin(),
		terser()
	]
	DtsConf.output.banner = banner;
} else {
	TsConf.plugins = [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		// commonjs(),
		resolve({
			customResolveOptions: {
				moduleDirectory: 'node_modules'
			}
		})
	]
}

export default [TsConf, DtsConf];