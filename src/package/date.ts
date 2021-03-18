/* eslint-disable no-unused-vars */
import global from '../@types/index';

interface ITdate {
	toCode: (fmt: string) => string;

	/** 将指定日期按照提供的模式匹配字符串格式化
	 *
	 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
	 * @returns 已格式化的时间 / 日期 字符串（阿拉伯数字形式）
	 */
	format: (fmt: string) => string;

	/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
	 *
	 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
	 */
	formatCn: () => string;

	/** 将指定日期格式化为农历表示法
	 *
	 * @param {boolean} skipYear 是否省略年份信息
	 * @returns 已格式化的农历日期
	 */
	formatLunar: (skipYear: boolLike) => string;

	/** 将指定日期格式化为佛历表示法
	 * @returns 已格式化的佛历日期
	 */
	formatBh: () => string;

	/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
	 *
	 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
	 * @returns 已格式化的字符串
	 */
	formatWorld: (languageTag: string | null | undefined) => string;
}

interface datePattern {
	yyyy: string,
	yy: string,
	mm: string,
	dd: string,
	hh: string,
	mi: string,
	ss: string,
	ms: string,
	[propName: string]: string
}

// 默认格式化字符串
const DEFAULT_FMTSTR = 'yyyy-mm-dd';

const __keepLen__ = (val: string | number, len: number = 2): string => `${val}`.padStart(len, '0');

const __getPattern__ = (val: Date): datePattern => {
	const _y: string = `${val.getFullYear()}`;
	return {
		yyyy: _y,
		yy: __keepLen__(_y.slice(-2)),
		mm: __keepLen__(val.getMonth() + 1),
		dd: __keepLen__(val.getDate()),
		hh: __keepLen__(val.getHours()),
		mi: __keepLen__(val.getMinutes()),
		ss: __keepLen__(val.getSeconds()),
		ms: __keepLen__(val.getMilliseconds(), 3)
	};
};

/** 格式化日期/时间
 *
 * @param dateVal 要格式化的日期或时间数据，如果为空，则为当前
 * @param fmt 格式化模版字符串，若为空，则默认为 yyyy-mm-dd 格式
 * @returns 返回格式化后的字符串
 */
const __fmtVal__ = function (val: Date, fmt?: string): string {
	const _obj: datePattern = __getPattern__(val);
	return (fmt || DEFAULT_FMTSTR).replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g, (matched: string | string[]): string => {
		if (!Array.isArray(matched)) {
			return _obj[matched] || '';
		} else {
			return '';
		}
	});
};

/** 校验并确保正确的日期时间类型
 *
 * @param val 要校验的日期/时间类型数据
 * @returns 若正确，则返回原值，否则抛出异常
 */
const __checkDate__ = (val: Date): ITdate => {
	const _b = val.toString() === 'Invalid Date';
	if (!_b) {
		return new Tdate(val);
	} else {
		throw new Error('Get invalid param for fuction tdate. This parma can be null/undefind or datetime string, also can be number just < 8640000000000000');
	}
};

class Tdate implements ITdate {
	private val: Date;
	constructor(initVal: Date) {
		this.val = initVal;
	}
	toCode = (fmt: string): string => {
		return __fmtVal__.call(this, this.val, 'yyyymmddhhmissms');
	};

	/** 将指定日期按照提供的模式匹配字符串格式化
	 *
	 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
	 * @returns 已格式化的时间 / 日期 字符串（阿拉伯数字形式）
	 */
	format = (fmt: string): string => {
		return __fmtVal__.call(this, this.val, fmt || 'yyyy-mm-dd');
	};

	/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
	 *
	 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
	 */
	formatCn = (): string => {
		// TODO: 暂未实现日期中文化
		return '';
	};

	/** 将指定日期格式化为农历表示法
	 *
	 * @param {boolean} skipYear 是否省略年份信息
	 * @returns 已格式化的农历日期
	 */
	formatLunar = (skipYear: boolLike = true): string => {
		const _val: string = Intl.DateTimeFormat('zh-u-ca-chinese-nu-latn').format(this.val);
		if (!skipYear) {
			return _val;
		} else {
			const _arr: string[] = _val.split('年');
			return _arr[1] || '';
		}
	};

	/** 将指定日期格式化为佛历表示法
	 * @returns 已格式化的佛历日期
	 */
	formatBh = (): string => {
		return Intl.DateTimeFormat('zh-chinese-u-ca-buddhist').format(this.val).replace(/-/, '年').replace(/-/, '月');
	};


	/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
	 *
	 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
	 * @returns 已格式化的字符串
	 */
	formatWorld = (languageTag: string | null | undefined): string => {
		return Intl.DateTimeFormat(languageTag || 'fr-ca').format(this.val);
	};
}

function tdate(): ITdate;
function tdate(val: string): ITdate;
function tdate(val: number): ITdate;
function tdate(val: number[]): ITdate;
function tdate(val: null): ITdate;
function tdate(val?: unknown): ITdate {
	const _tp = typeof val;
	switch (_tp) {
		case 'string':
			return __checkDate__(new Date(val as string));
		case 'number':
			return __checkDate__(new Date(val as number));
		case 'undefined':
			return new Tdate(new Date());
		default:
			if (Array.isArray(val)) {
				const [a, b, ...otherVal] = val;
				return __checkDate__(new Date(a, b, ...otherVal as number[]));
			} else if (val === null) {
				return new Tdate(new Date());
			} else {
				return __checkDate__(new Date('invalid'));
			}
	}
}

export default tdate;
