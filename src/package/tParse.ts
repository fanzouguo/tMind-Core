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
const __u2Str__ = (val: string | number[], sep: string = '-'): string => String.fromCharCode(...(Array.isArray(val) ? val : val.split(sep).map(v => +v)));

const getCompany = () => {
	return {
		compay: ('上海深普软件有限公司'),
		appCopy: (`Copyright © 2015 - ${new Date().getFullYear()} 深普 SMPOO.com 版权所有`),
		website: ('www.smpoo.com')
	};
};

/** 格式转换器
 */
const tParse = {
	encode: {
		// 字符串转换为
		str2UniCode: __str2u__,
		/** 转码微信昵称
		 * @param val
		 * @returns
		 */
		wechatAliase: function(): string {
			return __str2u__(`${this}`).join('-');
		}
	},
	decode: {
		/** 解码代表字符串的 uniCode 数组，或 uniCode数组元素拼接的字符串
		 */
		uniCode2Str: __u2Str__,
		/** 将转码后的数据解析出微信昵称
		 * @returns
		 */
		wechatAliase: function (): string {
			return __u2Str__(`${this}`, '-');
		}
	},
	companyInfo: getCompany()
};

export default tParse;
