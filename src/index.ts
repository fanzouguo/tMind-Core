import * as _tDate from './package/tDate';
import { bline, tEcho as _tEcho } from './package/tEcho';
import tParse from './package/tParse';
import { __len__, __lenfrom0__, __left__, __right__, __mid__, __like__, __upFirst__, __camelCase__ } from './package/tStr';
import { numToPrice, numToSplit, numToArr, numToCNY, numToRound, numIsOdd } from './package/tNum';
import { arrInsert, arrMoveItem } from './package/tArr';
import { deepClone } from './package/tObj';
import { Tutil as _Tutil } from './class/Tutil';

if (_Tutil.inBrowser) {
	bline();
	globalThis.window.onerror = function (err, url, l)	{ /* eslint-disable-line */
		return false;
	};
} else if (_Tutil.inSvr) {
	// @ts-ignore
	process.on('uncaughtException', function(err: Error): void { /* eslint-disable-line */
		_tEcho(err, '未处理的异常', 'ERR'); /* eslint-disable-line */
	});
}

new Date();

// @ts-ignore
String.prototype.len = __len__;
String.prototype.lenfrom0 = __lenfrom0__;
String.prototype.left = __left__;
String.prototype.right = __right__;
String.prototype.mid = __mid__;
String.prototype.like = __like__;
String.prototype.upFirst = __upFirst__;
String.prototype.camelCase = __camelCase__;
String.prototype.wxAliaseEncode = tParse.encode.wechatAliase;
String.prototype.wxAliaseDecode = tParse.decode.wechatAliase;

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

Array.prototype.insertTo = function(destIndex: number = 1, ...newItem: any[]): void {
	arrInsert.call(this, this, destIndex, ...newItem);
};
Array.prototype.moveTo = function(fromIdx: number,  destIdx: number, itemCount: number = 1, orderField = 'orderIdx'): void {
	arrMoveItem.call(this, this, fromIdx, destIdx, itemCount, orderField);
};

Object.prototype.deepClone = function (): any {
	return deepClone.call(this, this);
};

export const Tutil = _Tutil;
export const tdate = _tDate.tdate;
export const tEcho = _tEcho;
export const smpoo = tParse.companyInfo;
