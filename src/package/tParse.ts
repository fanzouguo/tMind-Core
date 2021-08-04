import type * as tmind from '../types';
import { bline } from './tEcho';

/** 将传入字符串编码为 uniCode 数组
 * @param str 要编码的字符串
 * @returns uniCode数组
 */
const __str2u__ = (str: string): number[] => str.split('').map(v => v.charCodeAt(0));


/** uniCode（字符/数字）数组解析出字符串原文
 * @param val 要解析的uniCode（字符/数字）数组，或者分隔符拼接的uniCode字符串
 * @param sep 传入参数中val的拼接字符串，默认为半角中横线
 * @returns
 */
const __u2Str__ = (val: string | number[], sep?: string): string => String.fromCharCode(...(Array.isArray(val) ? val : val.split(sep || '-').map(v => +v)));

const __companyInfo__ = () => {
	const _copy1: string = '67-111-112-121-114-105-103-104-116-32-169-32-50-48-49-53-32-45-32';
	const _copy2: string = __str2u__(`${new Date().getFullYear()}`).join('-');
	const _copy3: string = '32-28145-26222-32-83-77-80-79-79-46-99-111-109-32-29256-26435-25152-26377';
	return {
		company: __u2Str__('19978-28023-28145-26222-36719-20214-26377-38480-20844-21496'),
		appCopy: __u2Str__(`${_copy1}-${_copy2}-${_copy3}`),
		website: __u2Str__('119-119-119-46-115-109-112-111-111-46-99-111-109'),
		consoleStr: bline
	};
};

const encode: tmind.Iencode = {
	// 字符串转换为 unicode 数组
	toUniCode: __str2u__,
	/** 转码微信昵称
	 * @param val 微信昵称字符串
	 * @returns
	 */
	wechatNick: function(str: string): string {
		return __str2u__(str).join('-');
	}
};

const decode: tmind.Idecode = {
	/** 解码代表字符串的 uniCode 数组，或 uniCode数组元素拼接的字符串
	 */
	toStr: __u2Str__,
	/** 将转码后的数据解析出微信昵称
	 * @returns
	 */
	wechatNick: function (val: string | number[]): string {
		return __u2Str__(val, '-');
	}
};

/** 格式转换器
 */
 export {
	/** 将字符串编码为 uniCode格式 */
	encode,
	/** 将uniCode 格式信息解码回字符串 */
	decode
};

export const companyInfo =  __companyInfo__;