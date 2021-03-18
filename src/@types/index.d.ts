/* eslint-disable no-unused-vars */
declare global {
	// 可作为日期传参的类型
	type dateLike = string | number | number[] | Date | null | undefined;

	// 可作为 Boolean 传参的类型
	type boolLike = boolean | string | number | null | undefined;

	interface IObj<T> {
		[index: string]: T;
	}

	interface IObjKv {
		[index: string]: string;
	}
}

export {};