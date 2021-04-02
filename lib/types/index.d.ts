/* eslint-disable no-unused-vars */
declare global {
	export interface String extends String {
		len(): number;
		lenfrom0(): number;
		left(len: number): string;
		right(len: number): string;
		mid(startIdx: number, len: number): string;
		like(typestr: 'num2' | 'num8' | 'num10' | 'num16' | 'num26'): boolean;
		upFirst(): string;
		camelCase(): string;
		toCamelCase(): string;
		encode: tmind.Iencode;
	}

	export interface Number extends Number {
		toPrice(type?: 'CNY' | 'USD'): string;
		toSplit(fracDigits?: number): string;
		toArr(): string[];
		toRound(digit?: number, type?: 'normal' | 'bank' | 'carry' | 'drop'): number;
		toCNY(): string;
		isOdd(val: number): boolean;
	}

	export interface Array extends Array {
		insertTo<T>(destIndex: number, ...newItem: T[]): void;
		moveTo(fromIdx: number, destIdx: number, itemCount?: number, orderField: string): void;
	}

	export interface Object extends Object {
		//  dClone: () => any;
	}
}

declare namespace tmind {
	export type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;

	type dateLike = string | number | number[] | Date | null | undefined;

	export type boolLike = boolean | string | number | null | undefined;

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
		trueVal: boolean,
		minLen?: number,
		maxLen?: number,
		numType?: '2' | '8' | '10' | '16' | '26'
	}

	export interface ItVerifi {
		isOk: boolean;
		// static getRules: () => tmind.IObj<string>;
		isNum: (opt: IverifiOpt) => ItVerifi;
		// strSpaceHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// strSpeciaHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// strCnHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// strEnOnly: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// userName: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// uPwd: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// num: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// numInt: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// numPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// numNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// numIntPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// numIntNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// email: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// mobile: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// telphone: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// idCard: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// url: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// ip: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// rgbHex: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// date: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// wechatNo: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
		// carNum: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
	}

	export interface Isort {
		sortASC: typeof tmind.sortASC,
		sortDESC: typeof tmind.sortDESC
	}

	export interface IsmpooInfo {
		company: string,
		appCopy: string,
		webSite: string,
		consoleStr: void
	}

	export interface Itpinying {
		groupByFirstLetter: (arr: string[], fullLetter: boolean) => IObj<string[]>;
		getFirstLetter: (word: string) => string
	}

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
		export declare const enum LOG_END {
			BIZ_END = 'BIZ_END',
			COMPONET_END = 'COMPONET_END',
			IO_END = 'IO_END',
			LOGGER_END = 'LOGGER_END',
			WEB_END = 'WEB_END'
		}

		export declare const enum LOG_DIM {
			appro = 'appro',
			authOpt = 'authOpt',
			crosDomain = 'crosDomain',
			dbRead = 'dbRead',
			dbAdd = 'dbAdd',
			dbEdit = 'dbEdit',
			dbDel = 'dbDel',
			ioRead = 'ioRead',
			ioWrite = 'ioWrite',
			ioSync = 'ioSync',
			runtime = 'runtime',
			security = 'security',
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
		#val: Date;
		get isLeap(): boolean;
		get abs(): number;
		get year(): number;
		get month(): number;
		get day(): number;
		get hour(): number;
		get minute(): number;
		get second(): number;
		get millisecond(): number;
		get week(): number;
		get quarter(): number;
		get solar(): string;
		get sign(): string;
		get animal(): string;
		get indexOfQuarter(): number;
		get indexOfYear(): number;
		get daysOfMonth(): number;
		get daysOfQuarter(): number;
		get daysOfYear(): number;
		get ratioOfWeek(): number;
		get ratioOfMonth(): number;
		get ratioOfQuarter(): number;
		get ratioOfYear(): number;
		get tiangan(): string;
		get weekOfMonth(): number;
		get weekOfYear(): number;
		format: (fmt?: string) => string;
		formatAsCn: (withYear: boolean = false, withTime?: boolean) => string;
		formatAsLunar: (skipYear: tmind.boolLike = true) => string;
		formatAsBh: () => string;
		formatAsWorld: (languageTag: string | null | undefined) => string;
		getWeek: (local?: 'zh' | 'en') => string | number;
		getWeekOfMonth: (local?: 'zh' | 'en') => string | number;
		getWeekOfYear: (local?: 'zh' | 'en') => string | number;
		getQuarter: (local?: 'zh' | 'en') => string | number;
		getOffset: (diffNum: number, diffType?: 'day' | 'week' | 'month' | 'year') => string;
		getDiff: (dateVal: Date | string | number, outputType?: 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year') => number;
		toNumber: (notTimestamp: boolean = false, fmt?: string) => number;
		toJson: (local?: 'zh' | 'en') => tmind.IObj<number | boolean | string>;
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

	export function tVerifi(val?: tmind.verifiAble, immediately?: boolean, alias?: string, fullCheck?: boolean): tmind.ItVerifi | boolean;

	export const tPinyin = tmind.Itpinying;
}

export = tmind;
