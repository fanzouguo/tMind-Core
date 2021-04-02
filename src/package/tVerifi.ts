import tmind from '../types/index';

type rullItem = {
	title: string,
	func: (val: tmind.verifiAble, opt: tmind.IverifiOpt) => boolean
};

// 默认校验参数
// const DEFAULT_OPT: tmind.IverifiOpt = {
// 	trueVal: true,
// 	numType: '10'
// };

// 模式列表
const pattern = {
	'2': /^[01]+$/,	/* eslint-disable-line */
	'8': /^[0-7]$/,	/* eslint-disable-line */
	'10': /^-{0,1}\d*\.{0,1}\d+$/,	/* eslint-disable-line */
	'16': /^[A-Fa-f0-9]{1,4}$/,	/* eslint-disable-line */
	'26': /^[a-zA-Z]+$/,	/* eslint-disable-line */
	specialLetter: `[\`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]` // eslint-disable-line
};

const RULES: tmind.IObj<rullItem> = {
	isNum: {
		title: '为纯数字',
		func: (val: tmind.verifiAble, opt: tmind.IverifiOpt): boolean => {
			const _tp = typeof val;
			if (_tp === 'number' || _tp === 'string') {
				if (opt.numType === '2') return pattern['2'].test(`${val}`);
				if (opt.numType === '8') return pattern['8'].test(`${val}`);
				if (opt.numType === '10') return pattern['10'].test(`${val}`);
				if (opt.numType === '16') return pattern['16'].test(`${val}`);
				if (opt.numType === '26') return pattern['26'].test(`${val}`);
				return false;
			} else {
				return false;
			}
		}
	},
	hasSpace: {
		title: '是否包含空格',
		func: (val: tmind.verifiAble, opt: tmind.IverifiOpt): boolean => (typeof val === 'string') && /\s+/.test(`${val}`)
	},
	hasSpecial: {
		title: '是否包含特殊字符',
		func: (val: tmind.verifiAble, opt: tmind.IverifiOpt): boolean => (typeof val === 'string')
	}
};

// const typeAllow = (val: tmind.verifiAble, allowType: keyof typeof tmind.verifiAble): boolean => {
// 	if (typeof val in typeof tmind.verifiAble) {

// 	} else {
// 		return false;
// 	}
// };

class TVerifi implements tmind.TVerifi {
	#val: tmind.verifiAble;
	#alias: string;
	#fullCheck: boolean;
	#break: boolean;
	#reason: string[];
	#checkOk: boolean;
	#typeAllow: (allowType: keyof tmind.verifiAble) => boolean;

	constructor(val: tmind.verifiAble, alias?: string, fullCheck?: boolean) {
		this.#val = val;
		this.#alias = alias || '';
		this.#break = false;
		this.#reason = [];
		this.#fullCheck = !!(fullCheck);
		this.#checkOk = false;
		this.#typeAllow = (allowType: keyof tmind.verifiAble): boolean => {
			return (typeof val) in allowType;
		};
	}

	/** 获取当前实例校验结果
	 */
	get isOk(): boolean {
		return this.#checkOk;
	}

	/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
	 * @returns
	 */
	static getRules = (): tmind.IObj<string> => {
		const _obj: tmind.IObjKt<typeof RULES, string> = {};
		const _arr = Object.keys(RULES);
		for (const v of _arr) {
			_obj[v] = RULES[v].title;
		}
		return _obj;
	}

	isNum = (opt: tmind.IverifiOpt): tmind.TVerifi => {
		return this;
	}
}


/** 有效性校验函数
 *
 * @param val 要校验的值，支持校验的值类型为：（string | number | boolean | null | undefined）
 * @param immediately 立即返回校验结论，如果设为 true，则返回布尔类型的校验结论，
 * 										设为否则支持链式校验，但需在链尾通过 isOk 属性来判断真假（除非在链尾最后一环的规则参数中也将immediately设为true）
 * @param alias 校验规则的别名，仅当immediately参数为 false 时有效，用于校验报告中的用户友好化提示
 * @param fullCheck 是否需要全链完整校验，仅当immediately参数为 false 时有效，
 * 									若设为 true，则在链式校验时，不论中间环节是否校验成功，均完整执行各环节校验，并将各环节的校验结果记录到校验报告中
 * 									若设为 false，则链式校验中，任何一环校验失败，立即结束校验
 * @returns
 */
export default function tverifi(val?: tmind.verifiAble, alias?: string, fullCheck?: boolean): TVerifi | typeof tmind.TVerifi {
	if (typeof val === 'undefined') {
		return TVerifi;
	} else {
		return new TVerifi(val, alias, fullCheck);
	}
}
