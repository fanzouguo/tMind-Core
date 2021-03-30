declare namespace tmind {
	export type tMsg = 'info' | 'warn' | 'err';
// }

// declare module tmind {
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
