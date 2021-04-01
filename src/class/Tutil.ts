import tmind from '../types/index';
import { sortASC, sortDESC } from '../package/tSort';
import { encode, decode } from '../package/tParse';

class Tutil {
	static inBrowser: boolean = !!(globalThis.window); // eslint-disable-line
	static inSvr: boolean = !!(globalThis.process); // eslint-disable-line
	static NUM_TO_STR: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	static sort: tmind.Isort = {
		sortASC: sortASC,
		sortDESC: sortDESC
	};
	static encode: tmind.Iencode = encode;
	static decode: tmind.Idecode = decode;
}

export default Tutil;
