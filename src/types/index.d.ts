declare global {
	export interface String {
		format(str: string): string;
		toGet(str: string): string;
	}
}

declare namespace tmind {
	export type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;
	export type tMsg = 'info' | 'warn' | 'err';

	export interface IObj<T> {
		[index: string]: T;
	}
}

declare module tmind {
	function Tutil(str: string): string;
	function Techo(msg: tmind.tMsg): void;
	function Tfunc(val: string | number): string;
	/** 测试方法
	 *  仅用于d.ts文件智能感知测试
	 * @param str
	 */
	function Ttest(str: string): void;
}

export = tmind;
