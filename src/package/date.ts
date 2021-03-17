/* eslint-disable no-unused-vars */
import global from '../types/index';

interface ITdate {
	val: Date;
	toCode: (fmt: string) => string;
	format: (fmt: string) => string;
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
	val: Date;
	constructor(initVal: Date) {
		this.val = initVal;
	}
	toCode = (fmt: string): string => {
		return __fmtVal__.call(this, this.val, 'yyyymmddhhmissms');
	};
	format = (fmt: string): string => {
		return __fmtVal__.call(this, this.val, fmt || 'yyyy-mm-dd');
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
