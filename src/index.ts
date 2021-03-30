// /* eslint-disable no-undef*/
import { msg } from './types/index';

export type numLike = number | string | 0 | null;
export type boolLike = boolean;
export declare function tFunc(val:boolLike): boolean;

const _Tutil = (str: msg): string => {
	if (str === 'info') return '信息';
	else if (str === 'error') return '错误';
	else if (str === 'warn') return '警告';
	else return '未声明';
};
const _Techo = (val: number): number => val;

export const Tutil = _Tutil;
export const Techo = _Techo;
