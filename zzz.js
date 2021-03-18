/* eslint-disable no-console */
const aaaa = require('rollup-plugin-dts').default;
// const { getPathSpec } = require('./.debug/getPath');
// import * as aaaa from 'rollup-plugin-dts';

// const basePath = process.cwd();
// const DtsConf = {
// 	input: getPathSpec(basePath, 'src/@types/index.d.ts'),
// 	output: [{ file: 'lib/index.d.ts', format: 'es' }]
// };

const x = aaaa.toString();
console.log(x);
