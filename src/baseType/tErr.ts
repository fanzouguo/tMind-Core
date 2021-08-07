import type { Terr as TerrClass } from '../types';
import { ERR_TYPE } from '../enum';
const techo = require('../package/tEcho');

class Terr extends Error implements TerrClass {
	public code: ERR_TYPE;

	constructor(a: string | Error, b?: ERR_TYPE | boolean, c?: boolean) {
		super(typeof a === 'string' ? a : (a as Error).message);
		const isBoolB = typeof b === 'boolean';
		if (b) {
			this.code = !isBoolB ? (b as ERR_TYPE) : ERR_TYPE.unkownErr;
		} else {
			this.code = ERR_TYPE.unkownErr;
		}
		if (isBoolB || c) {
			techo(typeof a === 'string' ? a : (a as Error).message, '异常', 'ERR');
		}
	}
}

export default Terr;
