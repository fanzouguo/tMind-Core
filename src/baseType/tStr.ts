import type { IObj } from '../types';

/** 返回字符串的长度，等效于 length
 */
const __len__ = function (): number {
	// @ts-ignore
	return this.length;
};

/** 返回字符串从0开始计数的长度值(len - 1)
 */
const __lenfrom0__ = function (): number {
	// @ts-ignore
	return (!(this.length) && 0) || this.length - 1;
};

/** 字符串截取左边指定长度
 * @param len 要截取的长度
 */
const __left__ = function (len: number): string {
	// @ts-ignore
	return (this || '').slice(0, len);
};

/** 字符串截取右边指定长度
 * @param len 要截取的长度
 */
const __right__ = function (len: number): string {
	// @ts-ignore
	return (this || '').slice(-1 * len);
};

/** 字符串从指定索引位置（始于0）开始截取指定长度
 * @param startIdx 开始截取的的起始索引
 * @param len 若值为正数，则代表要截取的长度，
 * 						若为负数，则该值代表右边应该舍去的长度（均从1开始计数）
 * 						若为 0，则返回一个空字符串
 * @returns	截取后的结果字符串
 */
const __mid__ = function (startIdx: number, len: number): string {
	if (len > 0) {
		// @ts-ignore
		return (this || '').slice(startIdx, startIdx + len);
	} else if (len < 0) {
		// @ts-ignore
		return (this || '').slice(startIdx, len);
	} else {
		return '';
	}
};

/** 判断当前字符串是否为有效的类进制数据
 * @param 要判断的进制类型
 * num2：判断是否为类二进制字符
 * num8：判断是否为类八进制字符
 * num10：判断是否为类十进制字符
 * num16：判断是否为类十六进制字符
 * num26：判断是否为类二十六进制字符
 * @returns	Ture表示判断有效，反之亦反
 */
const __like__ = function (typestr: 'num2' | 'num8' | 'num10' | 'num16' | 'num26'): boolean {
	if (typestr === 'num2') {
		// @ts-ignore
		return /^[0-1]*$/.test(`${this}`);
	} else if (typestr === 'num8') {
		// @ts-ignore
		return /^[0-7]*$/.test(`${this}`);
	} else if (typestr === 'num16') {
		// @ts-ignore
		return /^[0-9a-fA-F]*$/.test(`${this}`);
	} else if (typestr === 'num26') {
		// @ts-ignore
		return /^[a-zA-Z]*$/.test(`${this}`);
	} else {
		// @ts-ignore
		return /^[0-9]*$/.test(`${this}`);
	}
};

/** 字符串首字母大写
 * @returns
 */
const __upFirst__ = function(): string {
	// @ts-ignore
	return this.replace(/^(\w)/, (a, b) => a.toUpperCase());
};

/** 将下划线、中括号或空格分隔的字符组合为小驼峰
 * @returns
 */
const __camelCase__ = function(): string {
	// @ts-ignore
	return this.replace(/[-|_|\s+](\w)/g, (a, b) => b.toUpperCase());
};

/** 将字符串实例转换为JSON对象格式，且忽略转换错误
 * @returns 输出绝对的JSON对象，若转换错误，则会添加 gotNull或gotWrong字段
 */
const __toObj__ = function(): IObj<any> {
	// @ts-ignore
	const _str: string = this;
	if (!_str) return {
		gotNull: 'The original paramter shouldn\'t be a empty string.'
	};
  try {
    const __token__ = JSON.parse(_str);
    return __token__;
  } catch (err) {
    return {
			gotWrong: 'The original paramter isn\'t a correct json like string.'
		};
  }
};

// const __toUniCode__ = function(splitStr?: string): string {
// 	// @ts-ignore
// 	return encode.toUniCode(this).join(splitStr || '-');
// };

// const __wechatNick__ = function(): string {
// 	// @ts-ignore
// 	return encode.toUniCode(this).join('-');
// };

// const __decodeToStr__ = function(splitStr?: string): string {
// 	// @ts-ignore
// 	return decode.toStr(this, splitStr || '-');
// };

// const __decodeWechatNick__ = function(): string {
// 	return decode.wechatNick();
// };

// // 数字的进制转换（2，8， 10， 16,26）
// // 类数字字符串的进制转换（2，8， 10， 16,26）

export {
	__len__,
	__lenfrom0__,
	__left__,
	__right__,
	__mid__,
	__like__,
	__upFirst__,
	__camelCase__,
	__toObj__
	// __toUniCode__,
	// __wechatNick__,
	// __decodeToStr__,
	// __decodeWechatNick__
};
