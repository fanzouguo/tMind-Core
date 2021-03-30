declare namespace tmind {
	export type tMsg = 'info' | 'warn' | 'err';
}

declare module tmind {
	function Tutil(str: string): string;
	function Techo(msg: tmind.tMsg): void;
}

export = tmind;
