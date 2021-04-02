import tmind from '../types/index';

const __specialLetter__ = `[\`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]`; // eslint-disable-line

// const DEFAULT_OPT: tmind.IverifiOpt = {
// 	trueVal: true,
// 	numType: '10'
// };

type verifiAble = string | number | boolean | null | undefined;

class TVerifi implements tmind.ItVerifi {
	#val: verifiAble;
	#alias: string;
	#fullCheck: boolean;
	#break: boolean;
	#reason: string[];
	#checkOk: boolean;

	constructor(val: verifiAble, alias?: string, fullCheck?: boolean) {
		this.#val = val;
		this.#alias = alias || '';
		this.#break = false;
		this.#reason = [];
		this.#fullCheck = !!(fullCheck);
		this.#checkOk = false;
	}

	get isOk(): boolean {
		return this.#checkOk;
	}
}

export default function tverifi(val: verifiAble, alias?: string, fullCheck?: boolean): tmind.ItVerifi {
	return new TVerifi(val, alias, fullCheck);
}
