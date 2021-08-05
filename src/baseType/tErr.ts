import type { ERR_TYPE } from '../enum';
const techo = require('../package/tEcho');

class Terr extends Error {
	public code: ERR_TYPE;
	constructor(msg: string)
	constructor(err: Error)
	constructor(msg: string, errCode: ERR_TYPE)
	constructor(err: Error, errCode: ERR_TYPE)
	constructor(msg: string, errCode: ERR_TYPE, toConsole: boolean)
	constructor(err: Error, errCode: ERR_TYPE, toConsole: boolean)
	constructor(a: string | Error, b?: ERR_TYPE | boolean, c?: boolean) {
		super(typeof a === 'string' ? a : (a as Error).message);
		const isBoolB = typeof b === 'boolean';
		if (b) {
			if (!isBoolB) {
				this.code = (b as ERR_TYPE);
			}
		}
		if (isBoolB || c) {
			techo(typeof a === 'string' ? a : (a as Error).message, '异常', 'ERR');
		}
	}
}

module.exports = Terr;
