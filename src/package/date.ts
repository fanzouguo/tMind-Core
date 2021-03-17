/* eslint-disable no-unused-vars */
import global from '../types/index';

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

const __dateInit__ = (val: dateLike): Date => (!val && new Date()) || (val instanceof Date && val) || new Date(`${val}`);

const __getPattern__ = (val: dateLike): datePattern => {
	const _dt: Date = __dateInit__(val);
	const _y: string = `${_dt.getFullYear()}`;
	return {
		yyyy: _y,
		yy: __keepLen__(_y.slice(-2)),
		mm: __keepLen__(_dt.getMonth() + 1),
		dd: __keepLen__(_dt.getDate()),
		hh: __keepLen__(_dt.getHours()),
		mi: __keepLen__(_dt.getMinutes()),
		ss: __keepLen__(_dt.getSeconds()),
		ms: __keepLen__(_dt.getMilliseconds(), 3)
	};
};

/** 格式化日期/时间
 *
 * @param dateVal 要格式化的日期或时间数据，如果为空，则为当前
 * @param fmt 格式化模版字符串，若为空，则默认为 yyyy-mm-dd 格式
 * @returns 返回格式化后的字符串
 */
const __fmtVal__ = (dateVal?: dateLike, fmt?: string): string => {
	const _obj: datePattern = __getPattern__(dateVal);
	return (fmt || DEFAULT_FMTSTR).replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g, (matched: string | string[]): string => {
		if (!Array.isArray(matched)) {
			return _obj[matched] || '';
		} else {
			return '';
		}
	});
};

export default {
	toCode: (): string => __fmtVal__(new Date(), 'yyyymmddhhmissms'),
	format: __fmtVal__
};

// export default TDate;