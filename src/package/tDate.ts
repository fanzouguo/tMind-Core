import global from '../@types/index'; /* eslint-disable-line */
import { Tutil } from '../class/Tutil';
import { numToRound } from './tNum';

const DICT_ANIMAL = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
const DICT_SIGN = '摩羯宝瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手';
const DICT_GZ = ['甲乙丙丁戊己庚辛壬癸', '子丑寅卯辰巳午未申酉戌亥'];
// 代表时间戳的最大绝对值
const MIN_MAX = 8640000000000000;
// 默认格式化字符串
const DEFAULT_FMTSTR = 'yyyy-mm-dd';
// 周内名称缓存
const WEEK_STR: IObj<string[]> = {
	zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
// 缓存年内各月天数（2月份为0，需要实时计算）
const DAYS_MONTH = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 缓存一天中的毫秒数
const MS_DAY = 24 * 60 * 60 * 1000;

const NUM_TO_STR = Tutil.NUM_TO_STR;

/** 格式化日期/时间
 *
 * @param dateVal 要格式化的日期或时间数据，如果为空，则为当前
 * @param fmt 格式化模版字符串，若为空，则默认为 yyyy-mm-dd 格式
 * @returns 返回格式化后的字符串
 */
const __fmtVal__ = function (val: Date, fmt?: string): string {
	const __keepLen__ = (val: string | number, len: number = 2): string => `${val}`.padStart(len, '0');
	const _y: string = `${val.getFullYear()}`;
	const _patternObj: IObj<string> = {
		yyyy: _y,
		yy: __keepLen__(_y.slice(-2)),
		mm: __keepLen__(val.getMonth() + 1),
		dd: __keepLen__(val.getDate()),
		hh: __keepLen__(val.getHours()),
		mi: __keepLen__(val.getMinutes()),
		ss: __keepLen__(val.getSeconds()),
		ms: __keepLen__(val.getMilliseconds(), 3)
	};

	return (fmt?.toLowerCase() || DEFAULT_FMTSTR).replace(/yyyy|ms|dd|hh|mi|ss|mm/g, (a: string | undefined): string => {
		return _patternObj[a || ''] || '';
	});
};

/** 校验并确保正确的日期时间类型
 *
 * @param val 要校验的日期/时间类型数据
 * @returns 若正确，则返回原值，否则抛出异常
 */
const __checkDate__ = (val: Date): Tdate => {
	if (!(val.toString() === 'Invalid Date')) {
		return new Tdate(val);
	} else {
		throw new Error(`Get invalid param for fuction tdate. \nThis parma can be null/undefind or datetime string, \nalso can be number between -${MIN_MAX} AND < ${MIN_MAX}.\nThis function already return now as default.`);
	}
};

export class Tdate {
	private val: Date;
	constructor(initVal: Date) {
		this.val = initVal;
	}

	/** 判断当前实例所代表的日期是否为闰年
	 * @returns 输入布尔值，Ture代表是，False代表否
	 */
	 get isLeap(): boolean {
		const y: number = this.val.getFullYear();
		return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
	}

	/** 获取时间戳的最大绝对值。
	 *  时间戳的有效范围应该是正负（绝对值）区间
	 * @returns 代表区间范围的绝对值（正负绝对值相同）
	 */
	get abs(): number {
		return MIN_MAX;
	}

	/** 获取实例日期所在年份
	 * @returns 输出阿拉伯数字格式
	 */
	 get year(): number {
		return +this.format('yyyy');
	}

	/** 获取实例日期所在月份
	 * @returns 输出阿拉伯数字格式
	 */
	 get month(): number {
		return +this.format('mm');
	}

	/** 获取实例日期的公历号数
	 * @returns 输出阿拉伯数字格式
	 */
	 get day(): number {
		return +this.format('dd');
	}

	/** 获取实例日期的小时
	 * @returns 输出阿拉伯数字格式
	 */
	 get hour(): number {
		return +this.format('hh');
	}

	/** 获取实例日期的分钟
	 * @returns 输出阿拉伯数字格式
	 */
	 get minute(): number {
		return +this.format('mi');
	}

	/** 获取实例日期的秒数
	 * @returns 输出阿拉伯数字格式
	 */
	 get second(): number {
		return +this.format('ss');
	}

	/** 获取实例日期的毫秒数
	 * @returns 输出阿拉伯数字格式
	 */
	 get millisecond(): number {
		return +this.format('ms');
	}

	/** 获取实例日期是周几
	 * @returns 输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7）
	 */
	get week(): number {
		return this.val.getDay() || 7;
	}

	/** 获取实例日期的所在季度
	 * @returns 输出阿拉伯数字代表的季度序号，起始为1
	 */
	get quarter(): number {
		const m = this.val.getMonth() + 1;
		return ((m < 4) && 1) || ((m < 7) && 2) || ((m < 10) && 3) || 4;
	}

	/** 获取实例日期对应的节气
	 * @returns
	 */
	get solar(): string {
		const [year, month, day] = this.toArr();
		let y = +year;
		let m = +month - 1;
		let d = +day;
		const sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
		const solarTerm = new Array('小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至');
		let solarTerms = '';
		while (solarTerms == '') {
			let tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
			let tmp2 = tmp1.getUTCDate();
			if (tmp2 == d) solarTerms = solarTerm[m * 2 + 1];
			tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
			tmp2 = tmp1.getUTCDate(); if (tmp2 == d) solarTerms = solarTerm[m * 2];
			if (d > 1) {
				d = d - 1;
			} else {
				m = m - 1;
				if (m < 0) {
					y = y - 1; m = 11;
				}
				d = 31;
			}
		}
		return solarTerms;
	}

	/** 获取实例日期所对应的星座
	 */
	get sign(): string {
		const Zone = new Array(1222, 122, 222, 321, 421, 522, 622, 722, 822, 922, 1022, 1122, 1222);
		const [year, month, day] = this.toArr(); // eslint-disable-line
		const m = month;
		const d = day;
		if ((100 * m + d) >= Zone[0] || (100 * m + d) < Zone[1]) {
			var i = 0;
		} else {
			for (var i = 1; i < 12; i++) {
				if ((100 * m + d) >= Zone[i] && (100 * m + d) < Zone[i + 1]) {
					break;
				}
			}
		}
		return DICT_SIGN.substring(2 * i, 2 * i + 2);
	}

	/** 获取实例日期所对应的属相
	 */
	get animal(): string {
		return DICT_ANIMAL.charAt((this.val.getFullYear() - 4) % 12);
	}

	/** 获取实例日期是所在季度的第几天
	 * @returns 输出阿拉伯数字代表的周（起始为1）
	 */
	get indexOfQuarter(): number {
		return -1 * this.getDiff(new Date(`${this.year}-${[1, 4, 7, 10][this.quarter - 1]}-1 00:00:00.000`), 'day');
	}

	/** 获取实例日期是所在年份的第几天
	 * @returns 输出阿拉伯数字代表的周（起始为1）
	 */
	get indexOfYear(): number {
		return numToRound((this.toNumber() - new Date(`${this.year}-1-1 00:00:00.000`).getTime()) / MS_DAY, 0, 'carry');
	}

	/** 获取实例日期所在月份的总天数
	 */
	get daysOfMonth(): number {
		return new Date(this.val.getFullYear(), +this.format('mm'), 0).getDate();
	}

	/** 获取实例日期所在季度的总天数
	 */
	get daysOfQuarter(): number {
		const daysOfMonth2 = new Date(this.year, 2, 0).getDate();
		return [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]][this.quarter - 1].map(v => DAYS_MONTH[v] || daysOfMonth2).reduce((pre, curr) => {
			return pre + curr;
		}, 0);
	}

	/** 获取实例日期所在年份的总天数
	 * @returns
	 */
	get daysOfYear(): number {
		return 337 + new Date(this.val.getFullYear(), 2, 0).getDate();
	}

	/** 获取实例日期相比所在周的百分比占比
	 * @returns
	 */
	get ratioOfWeek(): number {
		return numToRound(this.week / 7, 1);
	}

	/** 获取实例日期相比所在月的百分比占比
	 * @returns
	 */
	get ratioOfMonth(): number {
		return numToRound(this.day / this.daysOfMonth, 1);
	}

	/** 获取实例日期相比所在季度的百分比占比
	 * @returns
	 */
	get ratioOfQuarter(): number {
		return numToRound(this.indexOfQuarter / this.daysOfQuarter, 1);
	}

	/** 获取实例日期相比所在年份的百分比占比
	 * @returns
	 */
	get ratioOfYear(): number {
		return numToRound(this.indexOfYear / this.daysOfYear, 3);
	}

	/** 获取实例日期对应的天干纪年法
	 */
	get tiangan(): string {
		const i = this.val.getFullYear() - 1900 + 36;
		return DICT_GZ[0].charAt(i % 10) + DICT_GZ[1].charAt(i % 12);
	}

	/** 获取实例日期属于本月第几周
	 * @returns 输出阿拉伯数字代表的月内周次序号，起始为1
	 */
	get weekOfMonth(): number {
		return Math.ceil((this.val.getDate() + 6 - this.val.getDay()) / 7);
	}

	/** 获取实例日期属于当年第几周
	 * @returns 输出阿拉伯数字代表的年内周次序号，起始为1
	 */
	get weekOfYear(): number {
		return Math.ceil((this.val.getDate() + 6 - this.val.getDay()) / 7);
	}

	/** 将指定日期按照提供的模式匹配字符串格式化
	 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
	 * @returns 已格式化的时间 / 日期 字符串（阿拉伯数字形式）
	 */
	format = (fmt?: string): string => {
		return __fmtVal__.call(this, this.val, fmt || 'yyyy-mm-dd');
	};

	/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
	 * @param {*} withYear 是否输出年份，默认为否
	 * @param {*} withTime 是否输出时间信息
	 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
	 */
	formatAsCn = (withYear: boolean = false, withTime?: boolean): string => {
		const [a, b] = Intl.DateTimeFormat('zh-u-nu-hanidec', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: 'numeric',
			second: 'numeric',
			hour12: false,
			timeZone: 'Asia/Shanghai'
		}).format(this.val).split(/\s+/);
		const [y, m, d] = a.split('/');
		const rplc = (str: string) => str.replace(/^〇〇$/, '零').replace(/^〇/, '').replace(/〇$/, '十');
		const _dtPart = withYear ? `${y}年${rplc(m)}月${rplc(d)}日` : `${rplc(m)}月${rplc(d)}日`;
		if (!withTime) {
			return _dtPart;
		} else {
			const _tmPart = b.split(':').map(v => rplc(v)).join(':');
			return `${_dtPart} ${_tmPart}`;
		}
	};

	/** 将指定日期格式化为农历表示法
	 * @param {boolean} skipYear 是否省略年份信息
	 * @returns 已格式化的农历日期
	 */
	formatAsLunar = (skipYear: boolLike = true): string => {
		const _val: string = Intl.DateTimeFormat('zh-u-ca-chinese-nu-latn').format(this.val);
		if (!skipYear) {
			return _val;
		} else {
			const _arr: string[] = _val.split('年');
			return _arr[1] || '';
		}
	};

	/** 获取实例日期的佛历表示法
	 * @returns 已格式化的佛历日期
	 */
	formatAsBh = (): string => {
		return Intl.DateTimeFormat('zh-chinese-u-ca-buddhist').format(this.val).replace(/-/, '年').replace(/-/, '月');
	}

	/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
	 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
	 * @returns 已格式化的字符串
	 */
	formatAsWorld = (languageTag: string | null | undefined): string => {
		return Intl.DateTimeFormat(languageTag || 'fr-ca').format(this.val);
	};

	/** 获取实例日期的周信息
	 * @param local [可选]，代表返回数据采用的区域信息
	 * @returns 若传入参数为空，则输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7），若传入参数不为空，则返回字符化的周信息。
	 */
	getWeek = (local?: 'zh' | 'en'): string | number => {
		const w: number = this.val.getDay();
		const str = local || 'zh';
		if (typeof local === 'undefined') {
			return w || 7;
		} else {
			return WEEK_STR[str][w];
		}
	};

	/** 获取实例日期属于本月第几周
	 * @param local [可选]，代表返回数据采用的区域信息
	 * @returns 若传入参数为空，则输出阿拉伯数字代表的月内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
	 */
	getWeekOfMonth = (local?: 'zh' | 'en'): string | number => {
		const w = Math.ceil((this.val.getDate() + 6 - this.val.getDay()) / 7);
		if (typeof local !== 'undefined') {
			return NUM_TO_STR[w];
		} else {
			return w;
		}
	};

	/** 获取实例日期属于当年第几周
	 * @param local [可选]，代表返回数据采用的区域信息
	 * @returns 若传入参数为空，则输出阿拉伯数字代表的年内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
	 */
	getWeekOfYear = (local?: 'zh' | 'en'): string | number => {
		return numToRound((this.indexOfYear - (7 - (new Date(`${this.year}-1-1`).getDay() || 7))) / 7, 0, 'carry') + 1;
	};

	/** 获取实例日期的所在季度
	 * @param local [可选]，代表返回数据采用的区域信息
	 * @returns 若传入参数为空，则输出阿拉伯数字代表的季度序号，起始为1，若传入 zh ，则将数字中文字符化
	 */
	getQuarter = (local?: 'zh' | 'en'): string | number => {
		const m = this.val.getMonth() + 1;
		const q = ((m < 4) && 1) || ((m < 7) && 2) || ((m < 10) && 3) || 4;
		if (typeof local !== 'undefined') {
			return `${NUM_TO_STR[q]}季度`;
		} else {
			return q;
		}
	};

	/** 获取相对于实例日期，指定单位数量（天、周、月、年）之前或之后的日期值
	 *
	 * @param diffNum 与实例日期间相差的数量（默认单位为天），为正则返回日期在实例日期之后，反之则在实例日期之前
	 * @param diffType 相对于实例日期，相差数量的日期单位
	 */
	getOffset = (diffNum: number, diffType?: 'day' | 'week' | 'month' | 'year'): string => {
		if (typeof diffNum !== 'undefined') {
			let val = diffNum * MS_DAY;
			if (diffType === 'week') {
				val *= 7;
			} else if (diffType === 'month') {
				val *= 30;
			} else if (diffType === 'year') {
				val *= 365;
			}
			return Intl.DateTimeFormat('fr-ca').format(new Date(this.val.getTime() + val));
		} else {
			return this.format();
		}
	};

	/** 比较两个日期数据，并返回相差数量，单位为（天、周、月、年）
	 *
	 * @param start 要比较的基准日期
	 * @param end 要比较的目标日期
	 * @param outputType 返回值所使用的日期单位，默认为天
	 */
	getDiff = (dateVal: Date | Tdate | string | number, outputType?: 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'): number => {
		if (typeof dateVal !== 'undefined') {
			const num1: number = this.val.getTime();
			const tp = typeof dateVal;
			// @ts-ignore
			const num2 = ((tp === 'number') && dateVal) || (((dateVal instanceof Date && dateVal) || (typeof dateVal === 'string' && new Date(dateVal)) || dateVal.val || this.val).getTime());
			const diffVal = num2 - num1;
			const diffValDay = Math.round((num2 - num1) / 1000 / 60 / 60 / 24);
			const getNum = (val: number, len: number = 1): number => +val.toFixed(len);
			if (outputType === 'ms') {
				return diffVal;
			} else if (outputType === 'second') {
				return (diffVal / 1000) << 0;
			} else if (outputType === 'minute') {
				return (diffVal / 1000 / 60) << 0;
			} else if (outputType === 'hour') {
				return getNum(diffVal / 1000 / 60 / 60, 1);
			} else if (outputType === 'year') {
				return +(diffValDay / 365).toFixed(3);
			} else if (outputType === 'month') {
				return getNum(diffValDay / 30);
			} else if (outputType === 'week') {
				return getNum(diffValDay / 7);
			} else {
				return diffValDay;
			}
		} else {
			return 0;
		}
	};

	/** 将实例日期的值转换为数字
	 *
	 * @param notTimestamp 是否弃用时间戳形式而改为用户序列值，默认为否。为真时，可以自定义数字来源中包含的日期时间片段
	 * @param fmt 自定义数字来源片段的格式化字符串，仅当 notTimestamp 为真时有效
	 * @returns
	 */
	toNumber = (notTimestamp: boolean = false, fmt?: string): number => {
		if (notTimestamp) {
			const val = +this.format((fmt || 'yyyymmddhhmissms').replace(/\-/g, ''));
			if (!isNaN(val)) {
				return val;
			} else {
				throw new Error('Get invalid param of tdate.toNumber.\nIn this function\'s param string, you should with the pattern string like tdate.format only.');
			}
		} else {
			return this.val.getTime();
		}
	};

	/** 获取实例日期的 JSON 对象表示
	 * @param local [可选]，代表返回数据采用的区域信息
	 * @returns 格式化后的 JSON 对象
	 */
	toJson = (local?: 'zh' | 'en'): IObj<number | boolean | string> => {
		const [y, m, d, h, mi, s, ms] = this.toArr(true);
		return {
			year: y,
			month: m,
			day: d,
			hour: h,
			minutes: mi,
			second: s,
			millisecond: ms,
			week: this.getWeek(local),
			weekOfMonth: this.getWeekOfMonth(local),
			weekOfYear: this.getWeekOfYear(local),
			quarter: this.getQuarter(local),
			isLeap: this.isLeap,
			lunar: this.formatAsLunar(),
			buddhist: this.formatAsBh()
		};
	};

	/** 将实例日期转换为值数组
	 * @param {*} includTime [可选]是否包含时间信息
	 * @returns 不传入参数时，默认返回数组内元素依次为 [年，月，日，时，分，秒，毫秒]
	 */
	toArr = (includTime?: boolean): number[] => {
		return this.format(includTime ? 'yyyy-mm-dd-hh-mi-ss-ms' : 'yyyy-mm-dd').split('-').map(v => +v);
	};
}

export function tdate(): Tdate;
export function tdate(val: string): Tdate;
export function tdate(val: number): Tdate;
export function tdate(y: number, m: number, d?: number | undefined, h?: number | undefined, mi?: number | undefined, s?: number | undefined, ms?: number | undefined): Tdate;
export function tdate(val: null): Tdate;
export function tdate(val?: unknown): Tdate {
	const _tp = typeof val;
	switch (_tp) {
		case 'string':
			return __checkDate__(new Date(val as string));
		case 'number':
			if (arguments.length > 1) {
				const [a, b, c = 0, d = 0, e = 0, f = 0, g = 0] = arguments;
				return __checkDate__(new Date(a, b, c, d, e, f, g));
			} else {
				return __checkDate__(new Date(val as number));
			}
		case 'undefined':
			return new Tdate(new Date());
		default:
			if (Array.isArray(val) && (val.length >= 0 && val.length < 8)) {
				// const [a, b, ...otherVal] = val;
				// return __checkDate__(new Date(a, b, ...otherVal as number[]));
				// @ts-ignore
				return __checkDate__(new Date(...val));
			} else if (val === null) {
				return new Tdate(new Date());
			} else {
				return __checkDate__(new Date('invalid'));
			}
	}
}
