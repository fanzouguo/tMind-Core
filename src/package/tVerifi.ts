import tmind from '../types/index';

type rullItem = {
	title: string,
	func: (val: tmind.verifiAble, opt: tmind.tVerifi.Irule) => boolean
};

// 默认校验参数
// const DEFAULT_OPT: tmind.tVerifi.Irule = {
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
		func: (val: tmind.verifiAble, opt: tmind.tVerifi.Irule): boolean => {
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
		func: (val: tmind.verifiAble, opt: tmind.tVerifi.Irule): boolean => (typeof val === 'string') && /\s+/.test(`${val}`)
	},
	hasSpecial: {
		title: '是否包含特殊字符',
		func: (val: tmind.verifiAble, opt: tmind.tVerifi.Irule): boolean => (typeof val === 'string')
	}
};

class TVerifi implements tmind.TVerifi {
	#val: tmind.verifiAble;
	#isOk: boolean;
	#fullCheck: boolean;
	#reason: tmind.tVerifi.Irule[];
	#checked: boolean;

	constructor(val: tmind.verifiAble, fullCheck?: boolean, ...rules: tmind.tVerifi.Irule[]) {
		this.#val = val;
		this.#isOk = false;
		this.#fullCheck = fullCheck ?? false;
		this.#checked = false;
		this.#reason = [];
		for (const v of rules) {
			if (v.patten) {
				v.trueVal = typeof v.trueVal === 'undefined' ? true : v.trueVal;
				v.isOk = false;
				v.reason = '';
				this.#reason.push(v);
			}
		}
	}

	/** 获取当前实例校验结果
	 */
	get isOk(): boolean {
		if (!this.#checked) {
			for (const v of this.#reason) {
				const b = RULES[v.patten].func(this.#val, v);
				v.isOk = b;
				v.reason = '';
				this.#isOk = this.#isOk && b;
				if (!this.#fullCheck && !b) {
					break;
				}
			}
			this.#checked = true;
		}
		return this.#isOk;
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

	isNum = (opt: tmind.tVerifi.Irule): tmind.TVerifi => {
		return this;
	}
}


	/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
	 */
	export const getRules = TVerifi.getRules;
	/** 执行有效性校验
	 * @param val 要校验的值，支持校验的值类型为：（string | number | boolean | null | undefined）
	 * @param fullCheck 链式校验过程中，是否强制全链遍历
	 *  			若为 false，则任何一环校验失败，则立即终止校验
	 * @param rules 校验规则组
	 * @returns
	 */
	export function check(val: tmind.verifiAble, fullCheck?: boolean, ...rules: tmind.tVerifi.Irule[]): boolean {
		return (new TVerifi(val, fullCheck, ...rules)).isOk;
	}
