import { __len__, __lenfrom0__, __left__, __right__, __mid__, __like__, __upFirst__, __camelCase__, __toObj__ } from './baseType/tStr';
import { numToPrice, numToSplit, numToArr, numToCNY, numToRound, numIsOdd, funcAdd, funcSub, funcMult, funcDiv } from './baseType/tNum';
import { arrInsert, arrMoveItem } from './baseType/tArr';
import { bline, techo as _techo_, tclear as __tclear__ } from './package/tEcho';
// import { deepClone } from './baseType/tObj';
import { companyInfo, encode, decode } from './package/tParse';
import * as TutilClass from './class/Tutil';
import * as TuserClass from './class/Tuser';
import { tDate as _tdate_ } from './package/tDate';
import { getFirstLetter, groupByFirstLetter } from './package/tPinyin';
import { getRules, check } from './package/tVerifi';
import { tCheckType as _tCheckType_ } from './package/tCheckType';
import * as TerrClass from './baseType/tErr';
import { ERR_TYPE as errType } from './enum';

String.prototype.len = __len__;
String.prototype.lenfrom0 = __lenfrom0__;
String.prototype.left = __left__;
String.prototype.right = __right__;
String.prototype.mid = __mid__;
String.prototype.like = __like__;
String.prototype.upFirst = __upFirst__;
String.prototype.camelCase = __camelCase__;
String.prototype.toObj = __toObj__;
String.prototype.encodeToUniCode = function (): number[] {
	return encode.toUniCode(this.valueOf());
};
String.prototype.encodeFromWechatNick = function (): string {
	return encode.wechatNick(this.valueOf());
};
String.prototype.decodeToStr = function (splitStr?: string): string {
	return decode.toStr(this.valueOf(), splitStr || '-');
};
String.prototype.decodeToWechatNick = function (): string {
	return decode.wechatNick(this.valueOf());
};

Number.prototype.toPrice = function (typeStr: 'CNY' | 'USD' = 'CNY'): string {
	return numToPrice.call(this, this.valueOf(), typeStr);
};
Number.prototype.toSplit = function (fracDigits?: number): string {
	return numToSplit.call(this, this.valueOf(), fracDigits);
};
Number.prototype.toArr = function (): string[] {
	return numToArr.call(this, this.valueOf());
};
Number.prototype.toRound = function (digit?: number, type?: 'normal' | 'bank' | 'carry' | 'drop'): number {
	return numToRound.call(this, this.valueOf(), digit, type);
};
Number.prototype.toCNY = function (): string {
	return numToCNY.call(this, this.valueOf());
};
Number.prototype.isOdd = function (): boolean {
	return numIsOdd.call(this, this.valueOf());
};
Number.prototype.funcAdd = function (...item: number[]): number {
	return funcAdd(this.valueOf(), ...item);
};
Number.prototype.funcSub = function (...item: number[]): number {
	return funcSub(this.valueOf(), ...item);
};
Number.prototype.funcMult = function (...item: number[]): number {
	return funcMult(this.valueOf(), ...item);
};
Number.prototype.funcDiv = function (...item: number[]): number {
	return funcDiv(this.valueOf(), ...item);
};

Array.prototype.insertTo = function (destIndex: number = 1, ...newItem: any[]): void {
	arrInsert.call(this, this, destIndex, ...newItem);
};

Array.prototype.moveTo = function (fromIdx: number, destIdx: number, itemCount: number = 1, orderField = 'orderIdx'): void {
	arrMoveItem.call(this, this, fromIdx, destIdx, itemCount, orderField);
};

Array.prototype.decodeToStr = function (): string {
	return decode.toStr(this, '');
};

const tU = TutilClass.default;
if (tU.inBrowser) {
	bline();
	window.onerror = function (err, url, l) {	// eslint-disable-line
		return false;
	};
} else if (tU.inSvr) {
	process.on('uncaughtException', function (err: Error): void {
		_techo_(err, '未处理的异常', 'ERR');
	});
}

// Object.prototype.dClone = function (): any {
// 	return deepClone.call(this, this);
// };

// 枚举
export const ERR_TYPE = errType;
// 类
export const Tuser = TuserClass.default;
export const Terr = TerrClass.default;
export const Tutil = TutilClass.default;
// 函数
export const smpoo = companyInfo;
export const tCheckType = _tCheckType_;
export const tEcho = _techo_;
export const tDate = _tdate_;
export const tClear = __tclear__;
export const tPinyin = {
	getFirstLetter,
	groupByFirstLetter
};
export const tVerifi = {
	getRules,
	check
};
