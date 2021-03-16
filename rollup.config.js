// @ts-nocheck
/* eslint-disable */
const resolve = require('rollup-plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const jsonPlugin = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');

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

export default {
	// 入口文件
	input: getPathSpec(basePath, '.debug', 'lib', 'index.js'),
	// 出口文件
	output: {
		file: getPathSpec(basePath, 'lib', 'index.js'),
		format: 'umd',
		name: 'tmind',
		banner
	},
	// // 作用：指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
	external: [],
	plugins: [
		babel({
			babelHelpers: 'bundled'
		})
		// commonjs(),
		// resolve({
		// 	customResolveOptions: {
		// 		moduleDirectory: 'node_modules'
		// 	}
		// }),
		// jsonPlugin(),
		// terser()
	]
};
