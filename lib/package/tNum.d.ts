declare const numToPrice: (val: number, typeStr: 'CNY' | 'USD') => string;
declare const numToSplit: (val: number, fracDigits?: number | undefined) => string;
declare const numToArr: (val: number) => string[];
declare const numToRound: (val: number, digit?: number | undefined, type?: "normal" | "bank" | "carry" | "drop" | undefined) => number;
declare const numToCNY: (val: number) => string;
declare const numIsOdd: (val: number) => boolean;
export { numToPrice, numToSplit, numToArr, numToRound, numToCNY, numIsOdd };
