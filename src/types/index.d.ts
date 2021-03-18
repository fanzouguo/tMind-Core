/* eslint-disable no-unused-vars */
export {};

declare global {
	// 可作为日期传参的类型
	type dateLike = string | number | number[] | Date | null | undefined;

	// 可作为 Boolean 传参的类型
	type boolLike = boolean | string | number | null | undefined;

	// 日志信息枚举
	const enum MSG_TYPE {
		INFO = 'INFO',
		SUCC = 'SUCC',
		WARN = 'WARN',
		ERR = 'ERR'
	}

	interface IObj<T> {
		[index: string]: T;
	}

	// 策略模式的对象结构定义
	interface IObjPlicy<K> {
		[index: keyof K]: any;
	}

	interface IObjKv {
		[index: string]: string;
	}
}

declare module Tmind {
}
