/* eslint-disable no-unused-vars */
declare global {
	export interface String extends String {
		/** 返回字符串的长度，等效于 length
		 */
		len(): number;
		/** 返回字符串从0开始计数的长度值(len - 1)
		 */
		lenfrom0(): number;
		/** 字符串截取左边指定长度
		 * @param len 要截取的长度
		 */
		left(len: number): string;
		/** 字符串截取右边指定长度
		 * @param len 要截取的长度
		 */
		right(len: number): string;
		/** 字符串从指定索引位置（始于0）开始截取指定长度
		 * @param startIdx 开始截取的的起始索引
		 * @param len 若值为正数，则代表要截取的长度，
		 * 						若为负数，则该值代表右边应该舍去的长度（均从1开始计数）
		 * 						若为 0，则返回一个空字符串
		 * @returns	截取后的结果字符串
		 */
		mid(startIdx: number, len: number): string;
		/** 判断当前字符串是否为有效的类进制数据
		 * @param 要判断的进制类型
		 * num2：判断是否为类二进制字符
		 * num8：判断是否为类八进制字符
		 * num10：判断是否为类十进制字符
		 * num16：判断是否为类十六进制字符
		 * num26：判断是否为类二十六进制字符
		 * @returns	Ture表示判断有效，反之亦反
		 */
		like(typestr: 'num2' | 'num8' | 'num10' | 'num16' | 'num26'): boolean;
		/** 字符串首字母大写
		 */
		upFirst(): string;
		/** 将下划线、中括号或空格分隔的字符组合为小驼峰
		 */
		camelCase(): string;
		/** 转换为小驼峰
		 */
		toCamelCase(): string;
		/** 将字符串编码为 uniCode格式
		 */
		encode: tmind.Iencode;
	}

	export interface Number extends Number {
		/** 将数字转换为货币显示
		 * @param val 要转换的数字
		 * @param typeStr 货币类型
		 * @returns
		 */
		toPrice(type?: 'CNY' | 'USD'): string;
		/** 采用千分符分隔数字
		 * @param val 要分隔的数字
		 * @param fracDigits 小数最大显示位数
		 * @returns
		 */
		toSplit(fracDigits?: number): string;
		/** 以小数点为分隔符，将数字拆分为二元数组，分别代表整数部分和小数部分
		 *
		 * @param val
		 * @returns
		 */
		toArr(): string[];
		/** 四舍五入
		 * @param val 要处理的数字
		 * @param digit 保留的小数位数，默认为2
		 * @param type 舍入规则： '常规：四舍五入' | '银行家舍入: 四舍六入五考虑' | '强制进位' | '强制舍位'
		 * @returns
		 */
		toRound(digit?: number, type?: 'normal' | 'bank' | 'carry' | 'drop'): number;
		/** 金额转换为人民币大写
		 * @param val 要转换的金额
		 * @returns
		 */
		toCNY(): string;
		/** 判断数字是否为奇数
		 * @param val
		 * @returns
		 */
		isOdd(val: number): boolean;
	}

	export interface Array extends Array {
		/** 对传入的数组，在指定索引位置之后插入值，该方法默认会改变原始数组
		 * @param arr 要插入的原始数组
		 * @param destIndex 要插入的索引位置，起始值为：0
		 * @param newItem 要插入的新元素
		 * @returns 插入元素后的数组
		 */
		insertTo<T>(destIndex: number, ...newItem: T[]): void;
		/** 向前或向后移动传入数组中指定索引位置的元素，该方法会改变原始数组。
		 *  该方法针对数组内元素的类型不同，处理方式亦不同。
		 * 数组内元素为 JSON 对象的，会对 orderField指定的元素字段（默认为 orderIdx）按照新的排序刷新排序值，而不改变元素在数组内的实际位置
		 * 数组内元素若是 JSON 对象之外的其他类型，则排序过程会直接调整元素在数组内顺序
		 * @param arr 要进行元素移动的原始数组
		 * @param fromIdx 要移动的元素在数组中的原始索引（索引从0开始计数），
		 * 								若要移动的元素在数组中系连续多个，则此处代表这些元素中的最小索引
		 * @param	 destIdx 本次要移动到的目标位置索引
		 * @param	 itemCount 本次要移动的元素数量（若数量 > 1，则这些元素在原始位置中必须连续存在）
		 * @returns
		 */
		moveTo(fromIdx: number, destIdx: number, itemCount?: number, orderField: string): void;
	}

	export interface Object extends Object {
		// /** 此处不做复杂逻辑的深拷贝，仅利用JSON.stringify方法简单返回结果
		//  * 基于 tFrameV9框架的设计，仅对数据载荷的 JSON 对象进行深拷贝，该对象本身仅作为数据表示层。
		//  *
		//  * @param obj 要拷贝的原始对象
		//  * @returns 拷贝后的对象
		//  */
		//  dClone: () => any;
	}
}

declare namespace tmind {
	export type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;

	// 可作为日期传参的类型
	type dateLike = string | number | number[] | Date | null | undefined;

	// 可作为 Boolean 传参的类型
	export type boolLike = boolean | string | number | null | undefined;

	// 支持校验的数据类型
	type verifiAble = string | number | boolean | null | undefined;

	export interface IObj<T> {
		[index: string]: T;
	}

	export type IObj<T> = IObj1<T> | IObj2<T>;

	export type IObj1<T> = {
		[P in keyof T]: T[P];
	}

	export type IObj2<T> = {
		[P in keyof T]: any;
	}

	export type IObjKt<K, T> = {
		[P in keyof K]: T;
	}

	export interface Iencode {
		toUniCode: (str: string) => number[],
		wechatNick: () => string
	}

	export interface Idecode {
		toStr: (val: string | number[], sep: string) => string,
		wechatNick: () => string
	}

	export interface Iparse {
		encode: Iencode,
		decode: Idecode
	}

	export interface IverifiOpt {
		/** 正则断言为匹配时的值
		 *  默认为 TRUE，若设为 FALSE，设为断言匹配，但需拒绝
		 */
		trueVal: boolean,
		/** 校验规则中要求的最小长度
		 */
		minLen?: number,
		/** 校验规则中允许的最大长度
		 */
		maxLen?: number,
		/** 进制类型判断的可选范围
		 */
		numType?: '2' | '8' | '10' | '16' | '26'
	}

	export interface ItVerifi {
		isOk: boolean;

		// /** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
		//  * @returns
		//  */
		// static getRules: () => tmind.IObj<string>;

		/** 判断参数是否为有效进制的数字或形似数字的字符
		 *
		 * @param val 要判断的参数
		 * @param numType 要判断的参数，默认判断十进制
		 * @returns 若符合，则返回 True，反之亦反
		 */
		isNum: (opt: IverifiOpt) => ItVerifi;

		// // 包含空格
		// strSpaceHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 包含特殊符号
		// strSpeciaHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 包含中文
		// strCnHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 纯英文字母
		// strEnOnly: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 用户名，4到16位（字母，数字，下划线，减号）
		// userName: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
		// uPwd: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 数字
		// num: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 整数
		// numInt: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 正数
		// numPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 负数
		// numNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 正整数
		// numIntPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 负整数
		// numIntNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // Email
		// email: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 手机号
		// mobile: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 固定电话
		// telphone: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 身份证号（18位）
		// idCard: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // URL
		// url: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // ipv4地址
		// ip: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // RGB Hex颜色
		// rgbHex: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 日期时间
		// date: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 微信号，6至20位，以字母开头，字母，数字，减号，下划线
		// wechatNo: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// // 车牌号
		// carNum: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
	}

	export interface Isort {
		sortASC: typeof tmind.sortASC,
		sortDESC: typeof tmind.sortDESC
	}

	/** tmind.smpoo 方法返回的深普信息格式
	 */
	export interface IsmpooInfo {
		company: string,
		appCopy: string,
		webSite: string,
		consoleStr: void
	}

	export interface Itpinying {
		/** 依据传入中文数组的首字母分组
		 *
		 * @param arr 要进行分组的中文数组
		 * @param fullLetter 若为True，则即时某个字母标签下没有匹配的文字，也返回空数组
		 * @returns 按照26个英文字母分组的结果集
		 */
		groupByFirstLetter: (arr: string[], fullLetter: boolean) => IObj<string[]>;

		/** 获取传入文字的首字母
		 * @param word 要获取首字母的字符串
		 * @returns
		 */
		getFirstLetter: (word: string) => string
	}

	/** 类型字面量枚举
	 */
	export declare const enum ETYPE {
		arguments = 'arguments',
		array = 'array',
		arraybuffer = 'arraybuffer',
		boolean = 'boolean',
		date = 'date',
		dataview = 'dataview',
		error = 'error',
		float32array = 'float32array',
		float64array = 'float64array',
		function = 'function',
		int16array = 'int16array',
		int32array = 'int32array',
		int8array = 'int8array',
		map = 'map',
		number = 'number',
		object = 'object',
		regexp = 'regexp',
		set = 'set',
		string = 'string',
		symbol = 'symbol',
		uint16array = 'uint16array',
		uint32array = 'uint32array',
		uint8array = 'uint8array',
		uint8clampedarray = 'uint8clampedarray',
		weakmap = 'weakmap',
		weakref = 'weakref',
		weakset = 'weakset'
	}

	export namespace tLog {
		/** 日志发生点
		 */
		export declare const enum LOG_END {
			// 业务服务端
			BIZ_END = 'BIZ_END',
			// 组件端
			COMPONET_END = 'COMPONET_END',
			// 接口端
			IO_END = 'IO_END',
			// 日志记录器端
			LOGGER_END = 'LOGGER_END',
			// 用户界面端
			WEB_END = 'WEB_END'
		}

		/** 日志维度
		 *
		 */
		export declare const enum LOG_DIM {
			// 审批操作
			appro = 'appro',
			// 授权操作
			authOpt = 'authOpt',
			// 跨域跳转
			crosDomain = 'crosDomain',
			// 数据库读
			dbRead = 'dbRead',
			// 数据库写
			dbAdd = 'dbAdd',
			// 数据库更新
			dbEdit = 'dbEdit',
			// 数据库删除
			dbDel = 'dbDel',
			// 接口读
			ioRead = 'ioRead',
			// 接口写
			ioWrite = 'ioWrite',
			// 接口同步
			ioSync = 'ioSync',
			// 运行时
			runtime = 'runtime',
			// 安全日志
			security = 'security',
			// 鉴权日志
			sign = 'sign'
		}
	}
}

declare module tmind {
	export class Tutil {
		static inBrowser: boolean;
		static inSvr: boolean;
		static NUM_TO_STR: string[];
		static sort: tmind.Isort;
		static encode: tmind.IObj<tmind.Iencode>;
		static decode: tmind.IObj<tmind.Idecode>;
	}

	export class Tdate {
		private val: Date;

		/** 判断当前实例所代表的日期是否为闰年
		 * @returns 输入布尔值，Ture代表是，False代表否
		 */
		get isLeap(): boolean;

		/** 获取时间戳的最大绝对值。
		 *  时间戳的有效范围应该是正负（绝对值）区间
		 * @returns 代表区间范围的绝对值（正负绝对值相同）
		 */
		get abs(): number;

		/** 获取实例日期所在年份
		 * @returns 输出阿拉伯数字格式
		 */
		get year(): number;

		/** 获取实例日期所在月份
		 * @returns 输出阿拉伯数字格式
		 */
		get month(): number;

		/** 获取实例日期的公历号数
		 * @returns 输出阿拉伯数字格式
		 */
		get day(): number;

		/** 获取实例日期的小时
		 * @returns 输出阿拉伯数字格式
		 */
		get hour(): number;

		/** 获取实例日期的分钟
		 * @returns 输出阿拉伯数字格式
		 */
		get minute(): number;

		/** 获取实例日期的秒数
		 * @returns 输出阿拉伯数字格式
		 */
		get second(): number;

		/** 获取实例日期的毫秒数
		 * @returns 输出阿拉伯数字格式
		 */
		get millisecond(): number;

		/** 获取实例日期是周几
		 * @returns 输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7）
		 */
		get week(): number;

		/** 获取实例日期的所在季度
		 * @returns 输出阿拉伯数字代表的季度序号，起始为1
		 */
		get quarter(): number;

		/** 获取实例日期对应的节气
		 * @returns
		 */
		get solar(): string;

		/** 获取实例日期所对应的星座
		 */
		get sign(): string;

		/** 获取实例日期所对应的属相
		 */
		get animal(): string;

		/** 获取实例日期是所在季度的第几天
		 * @returns 输出阿拉伯数字代表的周（起始为1）
		 */
		get indexOfQuarter(): number;

		/** 获取实例日期是所在年份的第几天
		 * @returns 输出阿拉伯数字代表的周（起始为1）
		 */
		get indexOfYear(): number;

		/** 获取实例日期所在月份的总天数
		 */
		get daysOfMonth(): number;

		/** 获取实例日期所在季度的总天数
		 */
		get daysOfQuarter(): number;

		/** 获取实例日期所在年份的总天数
		 * @returns
		 */
		get daysOfYear(): number;

		/** 获取实例日期相比所在周的百分比占比
		 * @returns
		 */
		get ratioOfWeek(): number;

		/** 获取实例日期相比所在月的百分比占比
		 * @returns
		 */
		get ratioOfMonth(): number;

		/** 获取实例日期相比所在季度的百分比占比
		 * @returns
		 */
		get ratioOfQuarter(): number;

		/** 获取实例日期相比所在年份的百分比占比
		 * @returns
		 */
		get ratioOfYear(): number;

		/** 获取实例日期对应的天干纪年法
		 */
		get tiangan(): string;

		/** 获取实例日期属于本月第几周
		 * @returns 输出阿拉伯数字代表的月内周次序号，起始为1
		 */
		get weekOfMonth(): number;

		/** 获取实例日期属于当年第几周
		 * @returns 输出阿拉伯数字代表的年内周次序号，起始为1
		 */
		get weekOfYear(): number;

		/** 将指定日期按照提供的模式匹配字符串格式化
		 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
		 * @returns 已格式化的时间 / 日期 字符串（阿拉伯数字形式）
		 */
		format: (fmt?: string) => string;

		/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
		 * @param {*} withYear 是否输出年份，默认为否
		 * @param {*} withTime 是否输出时间信息
		 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
		 */
		formatAsCn: (withYear: boolean = false, withTime?: boolean) => string;

		/** 将指定日期格式化为农历表示法
		 * @param {boolean} skipYear 是否省略年份信息
		 * @returns 已格式化的农历日期
		 */
		formatAsLunar: (skipYear: tmind.boolLike = true) => string;

		/** 获取实例日期的佛历表示法
		 * @returns 已格式化的佛历日期
		 */
		formatAsBh: () => string;

		/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
		 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
		 * @returns 已格式化的字符串
		 */
		formatAsWorld: (languageTag: string | null | undefined) => string;

		/** 获取实例日期的周信息
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7），若传入参数不为空，则返回字符化的周信息。
		 */
		getWeek: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于本月第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出阿拉伯数字代表的月内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfMonth: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于当年第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出阿拉伯数字代表的年内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfYear: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期的所在季度
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出阿拉伯数字代表的季度序号，起始为1，若传入 zh ，则将数字中文字符化
		 */
		getQuarter: (local?: 'zh' | 'en') => string | number;

		/** 获取相对于实例日期，指定单位数量（天、周、月、年）之前或之后的日期值
		 *
		 * @param diffNum 与实例日期间相差的数量（默认单位为天），为正则返回日期在实例日期之后，反之则在实例日期之前
		 * @param diffType 相对于实例日期，相差数量的日期单位
		 */
		getOffset: (diffNum: number, diffType?: 'day' | 'week' | 'month' | 'year') => string;

		/** 比较两个日期数据，并返回相差数量，单位为（天、周、月、年）
		 *
		 * @param start 要比较的基准日期
		 * @param end 要比较的目标日期
		 * @param outputType 返回值所使用的日期单位，默认为天
		 */
		getDiff: (dateVal: Date | string | number, outputType?: 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year') => number;

		/** 将实例日期的值转换为数字
		 *
		 * @param notTimestamp 是否弃用时间戳形式而改为用户序列值，默认为否。为真时，可以自定义数字来源中包含的日期时间片段
		 * @param fmt 自定义数字来源片段的格式化字符串，仅当 notTimestamp 为真时有效
		 * @returns
		 */
		toNumber: (notTimestamp: boolean = false, fmt?: string) => number;

		/** 获取实例日期的 JSON 对象表示
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 格式化后的 JSON 对象
		 */
		toJson: (local?: 'zh' | 'en') => tmind.IObj<number | boolean | string>;

		/** 将实例日期转换为值数组
		 * @param {*} includTime [可选]是否包含时间信息
		 * @returns 不传入参数时，默认返回数组内元素依次为 [年，月，日，时，分，秒，毫秒]
		 */
		toArr: (includTime?: boolean) => number[];
	}

	export function smpoo(): tmind.IsmpooInfo;

	export function sortASC(a: string, b: string): number;
	export function sortASC(a: number, b: number): number;
	export function sortDESC(a: string, b: string): number;
	export function sortDESC(a: number, b: number): number;

	export function tCheckType(val: any): string;

	export function tEcho(msg: any, title?: string, type?: tmind.MSG_TYPE): void;

	export function tdate(): Tdate;
	export function tdate(val: string): Tdate;
	export function tdate(val: number): Tdate;
	export function tdate(y: number, m: number, d?: number | undefined, h?: number | undefined, mi?: number | undefined, s?: number | undefined, ms?: number | undefined): Tdate;
	export function tdate(val: null): Tdate;
	export function tdate(val?: unknown): Tdate


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
	export function tVerifi(val?: tmind.verifiAble, immediately?: boolean, alias?: string, fullCheck?: boolean): tmind.ItVerifi | boolean;

	export const tPinyin = tmind.Itpinying;
}

export = tmind;
