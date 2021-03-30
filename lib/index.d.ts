import { msg } from './types/index';
export declare type numLike = number | string | 0 | null;
export declare type boolLike = boolean;
export declare function tFunc(val: boolLike): boolean;
export declare const Tutil: (str: msg) => string;
export declare const Techo: (val: number) => number;
