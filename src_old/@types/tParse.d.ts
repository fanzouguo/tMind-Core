
export declare interface Iencode {
	toUniCode: (str: string) => number[],
	wechatNick: () => string
}

export declare interface Idecode {
	toStr: (val: string | number[], sep: string) => string,
	wechatNick: () => string
}