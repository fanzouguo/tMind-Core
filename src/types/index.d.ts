declare namespace tmind {
	export type tMsg = 'info' | 'warn' | 'err';
}

declare module tmind {
	function Tutil(str: string): string;
	function Techo(msg: tmind.tMsg): void;
	function Tfunc(val: string | number): string;
	function Ttest(str: string): void;
}

export = tmind;
