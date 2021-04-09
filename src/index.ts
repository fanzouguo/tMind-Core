import { __len__, __lenfrom0__, __left__, __right__, __mid__, __like__, __upFirst__, __camelCase__, __toObj__ } from './baseType/tStr';
import { numToPrice, numToSplit, numToArr, numToCNY, numToRound, numIsOdd } from './baseType/tNum';
import { arrInsert, arrMoveItem } from './baseType/tArr';
import { bline, techo as _techo_ } from './package/tEcho';
// import { deepClone } from './baseType/tObj';
import { encode, companyInfo } from './package/tParse';
import Tutil from './class/Tutil';
import { tdate as _tdate_ } from './package/tDate';
import { getFirstLetter, groupByFirstLetter } from './package/tPinyin';
import { getRules, check } from './package/tVerifi';
import { tCheckType as _tCheckType_ } from './package/tCheckType';

String.prototype.len = __len__;
String.prototype.lenfrom0 = __lenfrom0__;
String.prototype.left = __left__;
String.prototype.right = __right__;
String.prototype.mid = __mid__;
String.prototype.like = __like__;
String.prototype.upFirst = __upFirst__;
String.prototype.camelCase = __camelCase__;
String.prototype.toObj = __toObj__;
String.prototype.encode = encode;

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

Array.prototype.insertTo = function (destIndex: number = 1, ...newItem: any[]): void {
	arrInsert.call(this, this, destIndex, ...newItem);
};

Array.prototype.moveTo = function (fromIdx: number, destIdx: number, itemCount: number = 1, orderField = 'orderIdx'): void {
	arrMoveItem.call(this, this, fromIdx, destIdx, itemCount, orderField);
};

if (Tutil.inBrowser) {
	bline();
	window.onerror = function (err, url, l) {	// eslint-disable-line
		return false;
	};
} else if (Tutil.inSvr) {
	process.on('uncaughtException', function (err: Error): void {
		_techo_(err, '未处理的异常', 'ERR');
	});
}

// Object.prototype.dClone = function (): any {
// 	return deepClone.call(this, this);
// };

export const smpoo = companyInfo;
export const TUtil = Tutil;
export const tCheckType = _tCheckType_;
export const tEcho = _techo_;
export const tDate = _tdate_;
export const tPinyin = {
	getFirstLetter,
	groupByFirstLetter
};
export const tVerifi = {
	getRules,
	check
};