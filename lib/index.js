(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tmind = {}));
}(this, (function (exports) { 'use strict';

	/** 返回字符串的长度，等效于 length
	 */
	const __len__ = function () {
	    // @ts-ignore
	    return this.length;
	};
	/** 返回字符串从0开始计数的长度值(len - 1)
	 */
	const __lenfrom0__ = function () {
	    // @ts-ignore
	    return (!(this.length) && 0) || this.length - 1;
	};
	/** 字符串截取左边指定长度
	 * @param len 要截取的长度
	 */
	const __left__ = function (len) {
	    // @ts-ignore
	    return (this || '').slice(0, len);
	};
	/** 字符串截取右边指定长度
	 * @param len 要截取的长度
	 */
	const __right__ = function (len) {
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
	const __mid__ = function (startIdx, len) {
	    if (len > 0) {
	        // @ts-ignore
	        return (this || '').slice(startIdx, startIdx + len);
	    }
	    else if (len < 0) {
	        // @ts-ignore
	        return (this || '').slice(startIdx, len);
	    }
	    else {
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
	const __like__ = function (typestr) {
	    if (typestr === 'num2') {
	        // @ts-ignore
	        return /^[0-1]*$/.test(`${this}`);
	    }
	    else if (typestr === 'num8') {
	        // @ts-ignore
	        return /^[0-7]*$/.test(`${this}`);
	    }
	    else if (typestr === 'num16') {
	        // @ts-ignore
	        return /^[0-9a-fA-F]*$/.test(`${this}`);
	    }
	    else if (typestr === 'num26') {
	        // @ts-ignore
	        return /^[a-zA-Z]*$/.test(`${this}`);
	    }
	    else {
	        // @ts-ignore
	        return /^[0-9]*$/.test(`${this}`);
	    }
	};
	/** 字符串首字母大写
	 * @returns
	 */
	const __upFirst__ = function () {
	    // @ts-ignore
	    return this.replace(/^(\w)/, (a, b) => a.toUpperCase());
	};
	/** 将下划线、中括号或空格分隔的字符组合为小驼峰
	 * @returns
	 */
	const __camelCase__ = function () {
	    // @ts-ignore
	    return this.replace(/[-|_|\s+](\w)/g, (a, b) => b.toUpperCase());
	};
	/** 将小驼峰字符转换为中横线分隔法
	 * @returns
	 */
	const __splitCamelCase__ = function () {
	    // @ts-ignore
	    return this.replace(/[A-Z]/, ($1) => {
	        return `-${$1}`;
	    });
	};
	/** 将字符串实例转换为JSON对象格式，且忽略转换错误
	 * @returns 输出绝对的JSON对象，若转换错误，则会添加 gotNull或gotWrong字段
	 */
	const __toObj__ = function () {
	    // @ts-ignore
	    const _str = this;
	    if (!_str)
	        return {
	            gotNull: 'The original paramter shouldn\'t be a empty string.'
	        };
	    try {
	        const __token__ = JSON.parse(_str);
	        return __token__;
	    }
	    catch (err) {
	        return {
	            gotWrong: 'The original paramter isn\'t a correct json like string.'
	        };
	    }
	};

	const KEEP_UNIT = ['万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正'];
	const ALIAS_NUM = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const ALIAS_UNIT = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '兆', '拾', '佰', '仟', '京', '拾', '佰', '仟', '垓', '拾', '佰', '仟', '杼', '拾', '佰', '仟', '穰', '拾', '佰', '仟', '沟', '拾', '佰', '仟', '涧', '拾', '佰', '仟', '正', '拾', '佰', '仟'];
	// 四则运算种子倍数
	const __SEED__ = 1000000;
	/** 将数字转换为货币显示
	 * @param val 要转换的数字
	 * @param typeStr 货币类型
	 * @returns
	 */
	const numToPrice = function (val, typeStr) {
	    // @ts-ignore
	    return Intl.NumberFormat('cmn-Hans-CN', {
	        style: 'currency',
	        currency: typeStr
	    }).format(val);
	};
	/** 采用千分符分隔数字
	 * @param val 要分隔的数字
	 * @param fracDigits 小数最大显示位数
	 * @returns
	 */
	const numToSplit = function (val, fracDigits) {
	    return Intl.NumberFormat('en-US', {
	        maximumFractionDigits: (typeof fracDigits === 'undefined') ? 2 : fracDigits
	    }).format(2334.338922);
	};
	/** 以小数点为分隔符，将数字拆分为二元数组，分别代表整数部分和小数部分
	 *
	 * @param val
	 * @returns
	 */
	const numToArr = function (val) {
	    return `${val}`.split('.');
	};
	/** 四舍五入
	 * @param val 要处理的数字
	 * @param digit 保留的小数位数，默认为2
	 * @param type 舍入规则： '常规：四舍五入' | '银行家舍入: 四舍六入五考虑' | '强制进位' | '强制舍位'
	 * @returns
	 */
	const numToRound = function (val, digit, type) {
	    const _digit = digit ?? 2;
	    switch (type ?? 'normal') {
	        case 'bank':
	            return +(val.toFixed(_digit));
	        case 'carry':
	            return +(`${val}`.split('.'))[0] + 1;
	        case 'drop':
	            return +(`${val}`.split('.'))[0];
	        default:
	            const _pw = 10 ** _digit;
	            const [a, b] = (`${val * _pw}`.split('.'));
	            let ouputNum = +a;
	            if (b && (+(b.slice(0, 1)) > 4)) {
	                ouputNum += 1;
	            }
	            return ouputNum / _pw;
	    }
	};
	/** 金额转换为人民币大写
	 * @param val 要转换的金额
	 * @returns
	 */
	const numToCNY = function (val) {
	    const ALIAS_FRA = ['角', '分', '厘', '毫', '丝'];
	    const [a, b] = `${val}`.split('.');
	    if (a.length > ALIAS_UNIT.length)
	        return '金额超出有效范围，无法显示大写';
	    const _arr = [];
	    const _arr2 = [];
	    // 处理整数部分
	    const _arrA = a.split('').reverse();
	    _arrA.forEach((v, k) => {
	        const u = ALIAS_UNIT[k];
	        const numIntPart = `${ALIAS_NUM[+v]}${(v !== '0' || KEEP_UNIT.includes(u)) ? u : ''}`;
	        _arr.push(numIntPart);
	    });
	    if (b && b.length) {
	        // 处理小数部分
	        const _arrB = b.split('').slice(0, ALIAS_FRA.length);
	        const _arrFra = [];
	        _arrB.forEach((v, k) => {
	            _arrFra.push(`${ALIAS_NUM[+v]}${ALIAS_FRA[k]}`);
	        });
	        _arr2.push(_arrFra.join(''));
	    }
	    else {
	        _arr2.push('整');
	    }
	    // 处理返回值
	    return [_arr.reverse().join('').replace(new RegExp(KEEP_UNIT.map(v => `(零+${v})`).join('|'), 'g'), a => {
	            return a.replace(/零+/g, '');
	        }).replace(/零+/g, '零'), _arr2.join('')].join('');
	};
	/** 判断数字是否为奇数
	 * @param val
	 * @returns
	 */
	const numIsOdd = function (val) {
	    return !!((val & 1) !== 0);
	};
	/** 四则运算加法（累加）
	 *
	 * @param item 要依次累加的值
	 * @returns
	 */
	const funcAdd = (...item) => {
	    try {
	        return item.reduce((pre, curr) => {
	            return pre + +curr * __SEED__;
	        }, 0) / __SEED__;
	    }
	    catch (err) {
	        return NaN;
	    }
	};
	/** 四则运算减法（累减）
	 *
	 * @param item 要依次累减的值
	 * @returns
	 */
	const funcSub = (...item) => {
	    try {
	        const [a, ...b] = item;
	        return b.reduce((pre, curr) => {
	            return pre - +curr * __SEED__;
	        }, +a * __SEED__) / __SEED__;
	    }
	    catch (err) {
	        return NaN;
	    }
	};
	/** 四则运算乘法（累乘）
	 *
	 * @param item 要依次累乘的值
	 * @returns
	 */
	const funcMult = (...item) => {
	    try {
	        return item.reduce((pre, curr) => {
	            return pre * +curr * __SEED__;
	        }, 1) / __SEED__ ** item.length;
	    }
	    catch (err) {
	        return NaN;
	    }
	};
	/** 四则运算除法（累除）
	 *
	 * @param item 要依次累除的值
	 * @returns
	 */
	const funcDiv = (...item) => {
	    try {
	        const [a, ...b] = item;
	        if (b.includes(0))
	            return NaN;
	        return b.reduce((pre, curr) => {
	            return pre / (curr * __SEED__);
	        }, +a * __SEED__);
	    }
	    catch (err) {
	        return NaN;
	    }
	};

	/* eslint-disable no-unused-vars */
	/** JS类型字面量枚举
	 */
	var ETYPE;
	(function (ETYPE) {
	    ETYPE["arguments"] = "arguments";
	    ETYPE["array"] = "array";
	    ETYPE["arraybuffer"] = "arraybuffer";
	    ETYPE["boolean"] = "boolean";
	    ETYPE["date"] = "date";
	    ETYPE["dataview"] = "dataview";
	    ETYPE["error"] = "error";
	    ETYPE["float32array"] = "float32array";
	    ETYPE["float64array"] = "float64array";
	    ETYPE["function"] = "function";
	    ETYPE["int16array"] = "int16array";
	    ETYPE["int32array"] = "int32array";
	    ETYPE["int8array"] = "int8array";
	    ETYPE["map"] = "map";
	    ETYPE["number"] = "number";
	    ETYPE["object"] = "object";
	    ETYPE["regexp"] = "regexp";
	    ETYPE["set"] = "set";
	    ETYPE["string"] = "string";
	    ETYPE["symbol"] = "symbol";
	    ETYPE["uint16array"] = "uint16array";
	    ETYPE["uint32array"] = "uint32array";
	    ETYPE["uint8array"] = "uint8array";
	    ETYPE["uint8clampedarray"] = "uint8clampedarray";
	    ETYPE["weakmap"] = "weakmap";
	    ETYPE["weakref"] = "weakref";
	    ETYPE["weakset"] = "weakset";
	})(ETYPE || (ETYPE = {}));

	/** 判断传入元素的类型
	* @param val 要判断类型的元素
	* @returns	代表类型的字符串
	*/
	function tCheckType$1(val) {
	    return `${(Object.prototype.toString.call(val)).replace(/\[object\s|\]/g, '').toLowerCase()}`;
	}

	function testMoveUp(arr, fromIdx, destIdx, itemCount, orderField) {
	    const [a, b] = [destIdx, fromIdx];
	    const [c, d] = [fromIdx, fromIdx + itemCount];
	    for (let i = a; i < b; i++) {
	        const _obj = arr[i];
	        _obj[orderField] = (+(_obj[orderField]) || i) + itemCount;
	    }
	    for (let i = c; i < d; i++) {
	        const _obj = arr[i];
	        _obj[orderField] = (+(_obj[orderField]) || i) - (fromIdx - destIdx);
	    }
	}
	function testMoveDown(arr, fromIdx, destIdx, itemCount, orderField) {
	    const [a, b] = [fromIdx, fromIdx + itemCount];
	    const [c, d] = [fromIdx + itemCount, destIdx + itemCount];
	    const step = destIdx - fromIdx;
	    for (let i = a; i < b; i++) {
	        const _obj = arr[i];
	        _obj[orderField] = (_obj[orderField] || i) + step;
	    }
	    for (let i = c; i < d; i++) {
	        const _obj = arr[i];
	        const newIdx = (_obj[orderField] || i) - itemCount;
	        _obj[orderField] = newIdx;
	    }
	}
	/** 对传入的数组，在指定索引位置之后插入值，该方法默认会改变原始数组
	 * @param arr 要插入的原始数组
	 * @param destIndex 要插入的索引位置，起始值为：0
	 * @param newItem 要插入的新元素
	 * @returns 插入元素后的数组
	 */
	function arrInsert(arr, destIndex, ...newItem) {
	    if (!destIndex) {
	        arr.unshift(...newItem);
	    }
	    else if (destIndex === arr.length) {
	        arr.push(...newItem);
	    }
	    else if (destIndex > 0) {
	        const frag = arr.splice(0, destIndex);
	        arr.unshift(...newItem);
	        arr.unshift(...frag);
	    }
	}
	/** 该重载适用于数组内元素为 JSON对象的情形，处理过程会要求元素具有orderIdx字段。
	 *  本重载不会改动数组内元素的排列顺序，仅对元素的 orderIdx 字段安装新的顺序重新赋值
	 */
	function arrMoveItem(arr, fromIdx, destIdx, itemCount, orderField) {
	    const _tp = tCheckType$1(arr[0]);
	    if (_tp === ETYPE.object) {
	        if (fromIdx > destIdx) {
	            testMoveUp(arr, fromIdx, destIdx, itemCount, orderField);
	        }
	        else if (fromIdx < destIdx) {
	            testMoveDown(arr, fromIdx, destIdx, itemCount, orderField);
	        }
	    }
	    else {
	        const _arrOld = arr.splice(fromIdx, itemCount);
	        if (fromIdx < destIdx) {
	            arrInsert(arr, destIdx - itemCount, ..._arrOld);
	        }
	        else if (fromIdx > destIdx) {
	            arrInsert(arr, destIdx, ..._arrOld);
	        }
	    }
	}

	function sortASC(a, b) {
	    if (typeof a === 'string') {
	        return a.localeCompare(`${b}`);
	    }
	    else if (typeof a === 'number' && typeof b === 'number') {
	        return a - b;
	    }
	    else {
	        return 0;
	    }
	}
	function sortDESC(a, b) {
	    if (typeof a === 'string') {
	        return `${b}`.localeCompare(a);
	    }
	    else if (typeof a === 'number' && typeof b === 'number') {
	        return b - a;
	    }
	    else {
	        return 0;
	    }
	}

	/** 将传入字符串编码为 uniCode 数组
	 * @param str 要编码的字符串
	 * @returns uniCode数组
	 */
	const __str2u__ = (str) => str.split('').map(v => v.charCodeAt(0));
	/** uniCode（字符/数字）数组解析出字符串原文
	 * @param val 要解析的uniCode（字符/数字）数组，或者分隔符拼接的uniCode字符串
	 * @param sep 传入参数中val的拼接字符串，默认为半角中横线
	 * @returns
	 */
	const __u2Str__ = (val, sep) => String.fromCharCode(...(Array.isArray(val) ? val : val.split(sep || '-').map(v => +v)));
	const __companyInfo__ = () => {
	    const _copy1 = '67-111-112-121-114-105-103-104-116-32-169-32-50-48-49-53-32-45-32';
	    const _copy2 = __str2u__(`${new Date().getFullYear()}`).join('-');
	    const _copy3 = '32-28145-26222-32-83-77-80-79-79-46-99-111-109-32-29256-26435-25152-26377';
	    return {
	        company: __u2Str__('19978-28023-28145-26222-36719-20214-26377-38480-20844-21496'),
	        appCopy: __u2Str__(`${_copy1}-${_copy2}-${_copy3}`),
	        website: __u2Str__('119-119-119-46-115-109-112-111-111-46-99-111-109'),
	        consoleStr: bline
	    };
	};
	const encode = {
	    // 字符串转换为 unicode 数组
	    toUniCode: __str2u__,
	    /** 转码微信昵称
	     * @param val 微信昵称字符串
	     * @returns
	     */
	    wechatNick: function (str) {
	        return __str2u__(str).join('-');
	    }
	};
	const decode = {
	    /** 解码代表字符串的 uniCode 数组，或 uniCode数组元素拼接的字符串
	     */
	    toStr: __u2Str__,
	    /** 将转码后的数据解析出微信昵称
	     * @returns
	     */
	    wechatNick: function (val) {
	        return __u2Str__(val, '-');
	    }
	};
	const companyInfo = __companyInfo__;

	class Tutil$1 {
	}
	Tutil$1.inBrowser = !!(globalThis.window); // eslint-disable-line
	Tutil$1.inSvr = !!(globalThis.process); // eslint-disable-line
	Tutil$1.NUM_TO_STR = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	Tutil$1.sort = {
	    sortASC: sortASC,
	    sortDESC: sortDESC
	};
	Tutil$1.encode = encode;
	Tutil$1.decode = decode;

	const tcode = '32-32-32-32-32-32-95-95-95-32-32-32-32-32-32-32-32-32-32-32-95-95-95-32-32-32-32-32-32-32-32-32-32-32-95-95-95-32-32-32-32-32-32-32-32-32-32-32-95-95-95-32-32-32-32-32-32-32-32-32-32-32-95-95-95-32-32-32-32-32-10-32-32-32-32-32-47-92-32-32-92-32-32-32-32-32-32-32-32-32-47-92-95-95-92-32-32-32-32-32-32-32-32-32-47-92-32-32-92-32-32-32-32-32-32-32-32-32-47-92-32-32-92-32-32-32-32-32-32-32-32-32-47-92-32-32-92-32-32-32-32-10-32-32-32-32-47-58-58-92-32-32-92-32-32-32-32-32-32-32-47-58-58-124-32-32-124-32-32-32-32-32-32-32-47-58-58-92-32-32-92-32-32-32-32-32-32-32-47-58-58-92-32-32-92-32-32-32-32-32-32-32-47-58-58-92-32-32-92-32-32-32-10-32-32-32-47-58-47-92-32-92-32-32-92-32-32-32-32-32-47-58-124-58-124-32-32-124-32-32-32-32-32-32-47-58-47-92-58-92-32-32-92-32-32-32-32-32-47-58-47-92-58-92-32-32-92-32-32-32-32-32-47-58-47-92-58-92-32-32-92-32-32-10-32-32-95-92-58-92-45-92-32-92-32-32-92-32-32-32-47-58-47-124-58-124-95-95-124-95-95-32-32-32-47-58-58-92-45-92-58-92-32-32-92-32-32-32-47-58-47-32-32-92-58-92-32-32-92-32-32-32-47-58-47-32-32-92-58-92-32-32-92-32-10-32-47-92-32-92-58-92-32-92-32-92-95-95-92-32-47-58-47-32-124-58-58-58-58-92-95-95-92-32-47-58-47-92-58-92-32-92-58-92-95-95-92-32-47-58-47-95-95-47-32-92-58-92-95-95-92-32-47-58-47-95-95-47-32-92-58-92-95-95-92-32-10-32-92-58-92-32-92-58-92-32-92-47-95-95-47-32-92-47-95-95-47-45-45-47-58-47-32-32-47-32-92-47-95-95-92-58-92-47-58-47-32-32-47-32-92-58-92-32-32-92-32-47-58-47-32-32-47-32-92-58-92-32-32-92-32-47-58-47-32-32-47-32-10-32-32-92-58-92-32-92-58-92-95-95-92-32-32-32-32-32-32-32-32-32-47-58-47-32-32-47-32-32-32-32-32-32-32-92-58-58-47-32-32-47-32-32-32-92-58-92-32-32-47-58-47-32-32-47-32-32-32-92-58-92-32-32-47-58-47-32-32-47-32-10-32-32-32-92-58-92-47-58-47-32-32-47-32-32-32-32-32-32-32-32-47-58-47-32-32-47-32-32-32-32-32-32-32-32-32-92-47-95-95-47-32-32-32-32-32-92-58-92-47-58-47-32-32-47-32-32-32-32-32-92-58-92-47-58-47-32-32-47-32-32-10-32-32-32-32-92-58-58-47-32-32-47-32-32-32-32-32-32-32-32-47-58-47-32-32-47-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-92-58-58-47-32-32-47-32-32-32-32-32-32-32-92-58-58-47-32-32-47-32-32-32-10-32-32-32-32-32-92-47-95-95-47-32-32-32-32-32-32-32-32-32-92-47-95-95-47-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-92-47-95-95-47-32-32-32-32-32-32-32-32-32-92-47-95-95-47-32-32-32-32-10-10-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-32-19978-28023-28145-26222-36719-20214-26377-38480-20844-21496-32-45-32-119-119-119-46-115-109-112-111-111-46-99-111-109';
	const color = {
	    black: ['\x1B[30m', '\x1B[39m'],
	    white: ['\x1B[37m', '\x1B[39m'],
	    bold: ['\x1B[1m', '\x1B[22m'],
	    blue: ['\x1B[34m', '\x1B[39m'],
	    // green: ['\x1B[32m', '\x1B[39m'],
	    green: ['\x1B[32m', '\x1B[39m'],
	    yellow: ['\x1B[33m', '\x1B[39m'],
	    red: ['\x1B[31m', '\x1B[39m'],
	    blueBG: ['\x1B[44m', '\x1B[49m'],
	    blueBGLight: ['\x1B[104m', '\x1B[49m'],
	    greenBG: ['\x1B[42;30m', '\x1B[49m'],
	    greenBGLight: ['\x1B[102m', '\x1B[49m'],
	    yellowBG: ['\x1B[43;30m', '\x1B[49m'],
	    yellowBGLight: ['\x1B[103m', '\x1B[49m'],
	    redBG: ['\x1B[41m', '\x1B[49m'],
	    redBGLight: ['\x1B[105m', '\x1B[49m'],
	    end: ['\x1B[0m']
	};
	// 终端控制台配色
	const msgColor = {
	    INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1], color.end[0]],
	    SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1], color.end[0]],
	    WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1], color.end[0]],
	    ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1], color.end[0]]
	};
	// 浏览器控制台配色
	const msgColorBrowser = {
	    INFO: ['信息', color.blueBGLight[0], color.blueBGLight[1], color.black[0], color.black[1]],
	    SUCC: ['成功', color.greenBGLight[0], color.greenBGLight[1], color.black[0], color.black[1]],
	    WARN: ['警告', color.yellowBGLight[0], color.yellowBGLight[1], color.black[0], color.black[1]],
	    ERR: ['错误', color.redBGLight[0], color.redBGLight[1], color.red[0], color.red[1]]
	};
	function bline() {
	    /* eslint-disable no-console */
	    console.log(String.fromCharCode(...(tcode.split('-').map(v => +v))));
	}
	function techo(msg, title, type) {
	    /* eslint-disable no-console */
	    if (!title) {
	        if (msg instanceof Error) {
	            console.error(msg);
	        }
	        else {
	            console.log(msg);
	        }
	    }
	    else {
	        const _currType = `${type}`.toUpperCase();
	        const _func = (execer, str) => execer(str);
	        const msgType = typeof msg;
	        const [a, b, c, d, e] = Tutil$1.inBrowser ? (msgColorBrowser[_currType] || ['', '', '', '', '']) : (msgColor[_currType] || ['', '', '', '', '']);
	        const _execer = (type && (((type === 'ERR') && console.error) || ((type === 'WARN') && console.warn) || console.log)) || console.log;
	        if (msgType === 'string') {
	            const _currMsg = `${b} ${title || a} ${c} ${d} ${msg} ${e}`;
	            _func(_execer, _currMsg);
	        }
	        else if (msg instanceof Error) {
	            _func(console.error, `${b} ${title || a} ${c} ${d} ${msg?.message || ''} ${e}，详情如下：`);
	            console.error(msg);
	        }
	        else if (msgType === 'object') {
	            if (type === 'ERR') {
	                _func(console.error, `${b} ${title || a} ${c} ${d} ${msg?.message || ''} ${e}，详情如下：`);
	            }
	            _func(_execer, msg);
	        }
	        else {
	            _func(_execer, msg);
	        }
	    }
	}
	function tclear() {
	    console.clear();
	}

	class Tuser$1 {
	    constructor(payload) {
	        this.id = payload?.id || -1;
	        this.pid = payload?.pid || -1;
	        this.code = payload?.code || '';
	        this.name = payload?.name || '';
	        this.namezh = payload?.namezh || '';
	        this.nickName = payload?.nickName || '';
	        this.gender = payload?.gender || 1;
	        this.avator = payload?.avator || '';
	        this.authStr = payload?.authStr || '';
	    }
	}

	const DICT_ANIMAL = '鼠牛虎兔龙蛇马羊猴鸡狗猪';
	const DICT_SIGN = '摩羯宝瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手';
	const DICT_GZ = ['甲乙丙丁戊己庚辛壬癸', '子丑寅卯辰巳午未申酉戌亥'];
	// 代表时间戳的最大绝对值
	const MIN_MAX = 8640000000000000;
	// 默认格式化字符串
	const DEFAULT_FMTSTR = 'yyyy-mm-dd';
	// 周内名称缓存
	const WEEK_STR = {
	    zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	};
	// 缓存年内各月天数（2月份为0，需要实时计算）
	const DAYS_MONTH = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// 缓存一天中的毫秒数
	const MS_DAY = 24 * 60 * 60 * 1000;
	const NUM_TO_STR = Tutil$1.NUM_TO_STR;
	/** 格式化日期/时间
	 *
	 * @param dateVal 要格式化的日期或时间数据，如果为空，则为当前
	 * @param fmt 格式化模版字符串，若为空，则默认为 yyyy-mm-dd 格式
	 * @returns 返回格式化后的字符串
	 */
	const __fmtVal__ = function (val, fmt) {
	    const __keepLen__ = (val, len = 2) => `${val}`.padStart(len, '0');
	    const _y = `${val.getFullYear()}`;
	    const _patternObj = {
	        yyyy: _y,
	        yy: __keepLen__(_y.slice(-2)),
	        mm: __keepLen__(val.getMonth() + 1),
	        dd: __keepLen__(val.getDate()),
	        hh: __keepLen__(val.getHours()),
	        mi: __keepLen__(val.getMinutes()),
	        ss: __keepLen__(val.getSeconds()),
	        ms: __keepLen__(val.getMilliseconds(), 3)
	    };
	    return (fmt?.toLowerCase() || DEFAULT_FMTSTR).replace(/yyyy|ms|dd|hh|mi|ss|mm/g, (a) => {
	        return _patternObj[a || ''] || '';
	    });
	};
	/** 校验并确保正确的日期时间类型
	 *
	 * @param val 要校验的日期/时间类型数据
	 * @returns 若正确，则返回原值，否则抛出异常
	 */
	const __checkDate__ = (val) => {
	    if (!(val.toString() === 'Invalid Date')) {
	        return new Tdate(val);
	    }
	    else {
	        throw new Error(`Get invalid param for fuction tdate. \nThis parma can be null/undefind or datetime string, \nalso can be number between -${MIN_MAX} AND < ${MIN_MAX}.\nThis function already return now as default.`);
	    }
	};
	class Tdate {
	    constructor(initVal) {
	        /** 将指定日期按照提供的模式匹配字符串格式化
	         * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
	         * @returns 已格式化的时间 / 日期 字符串（阿拉伯数字形式）
	         */
	        this.format = (fmt) => {
	            return __fmtVal__.call(this, this.#val, fmt || 'yyyy-mm-dd');
	        };
	        /** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
	         * @param {*} withYear 是否输出年份，默认为否
	         * @param {*} withTime 是否输出时间信息
	         * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
	         */
	        this.formatAsCn = (withYear = false, withTime) => {
	            const [a, b] = Intl.DateTimeFormat('zh-u-nu-hanidec', {
	                year: 'numeric',
	                month: '2-digit',
	                day: '2-digit',
	                hour: '2-digit',
	                minute: 'numeric',
	                second: 'numeric',
	                hour12: false,
	                timeZone: 'Asia/Shanghai'
	            }).format(this.#val).split(/\s+/);
	            const [y, m, d] = a.split('/');
	            const rplc = (str) => str.replace(/^〇〇$/, '零').replace(/^〇/, '').replace(/〇$/, '十');
	            const _dtPart = withYear ? `${y}年${rplc(m)}月${rplc(d)}日` : `${rplc(m)}月${rplc(d)}日`;
	            if (!withTime) {
	                return _dtPart;
	            }
	            else {
	                const _tmPart = b.split(':').map(v => rplc(v)).join(':');
	                return `${_dtPart} ${_tmPart}`;
	            }
	        };
	        /** 将指定日期格式化为农历表示法
	         * @param {boolean} skipYear 是否省略年份信息
	         * @returns 已格式化的农历日期
	         */
	        this.formatAsLunar = (skipYear = true) => {
	            const _val = Intl.DateTimeFormat('zh-u-ca-chinese-nu-latn').format(this.#val);
	            if (!skipYear) {
	                return _val;
	            }
	            else {
	                const _arr = _val.split('年');
	                return _arr[1] || '';
	            }
	        };
	        /** 获取实例日期的佛历表示法
	         * @returns 已格式化的佛历日期
	         */
	        this.formatAsBh = () => {
	            return Intl.DateTimeFormat('zh-chinese-u-ca-buddhist').format(this.#val).replace(/-/, '年').replace(/-/, '月');
	        };
	        /** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
	         * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
	         * @returns 已格式化的字符串
	         */
	        this.formatAsWorld = (languageTag) => {
	            return Intl.DateTimeFormat(languageTag || 'fr-ca').format(this.#val);
	        };
	        /** 获取实例日期的周信息
	         * @param local [可选]，代表返回数据采用的区域信息
	         * @returns 若传入参数为空，则输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7），若传入参数不为空，则返回字符化的周信息。
	         */
	        this.getWeek = (local) => {
	            const w = this.#val.getDay();
	            const str = local || 'zh';
	            if (typeof local === 'undefined') {
	                return w || 7;
	            }
	            else {
	                return WEEK_STR[str][w];
	            }
	        };
	        /** 获取实例日期属于本月第几周
	         * @param local [可选]，代表返回数据采用的区域信息
	         * @returns 若传入参数为空，则输出阿拉伯数字代表的月内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
	         */
	        this.getWeekOfMonth = (local) => {
	            const w = Math.ceil((this.#val.getDate() + 6 - this.#val.getDay()) / 7);
	            if (typeof local !== 'undefined') {
	                return NUM_TO_STR[w];
	            }
	            else {
	                return w;
	            }
	        };
	        /** 获取实例日期属于当年第几周
	         * @param local [可选]，代表返回数据采用的区域信息
	         * @returns 若传入参数为空，则输出阿拉伯数字代表的年内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
	         */
	        this.getWeekOfYear = (local) => {
	            return numToRound((this.indexOfYear - (7 - (new Date(`${this.year}-1-1`).getDay() || 7))) / 7, 0, 'carry') + 1;
	        };
	        /** 获取实例日期的所在季度
	         * @param local [可选]，代表返回数据采用的区域信息
	         * @returns 若传入参数为空，则输出阿拉伯数字代表的季度序号，起始为1，若传入 zh ，则将数字中文字符化
	         */
	        this.getQuarter = (local) => {
	            const m = this.#val.getMonth() + 1;
	            const q = ((m < 4) && 1) || ((m < 7) && 2) || ((m < 10) && 3) || 4;
	            if (typeof local !== 'undefined') {
	                return `${NUM_TO_STR[q]}季度`;
	            }
	            else {
	                return q;
	            }
	        };
	        /** 获取相对于实例日期，指定单位数量（天、周、月、年）之前或之后的日期值
	         *
	         * @param diffNum 与实例日期间相差的数量（默认单位为天），为正则返回日期在实例日期之后，反之则在实例日期之前
	         * @param diffType 相对于实例日期，相差数量的日期单位
	         */
	        this.getOffset = (diffNum, diffType) => {
	            if (typeof diffNum !== 'undefined') {
	                let val = diffNum * MS_DAY;
	                if (diffType === 'week') {
	                    val *= 7;
	                }
	                else if (diffType === 'month') {
	                    val *= 30;
	                }
	                else if (diffType === 'year') {
	                    val *= 365;
	                }
	                return Intl.DateTimeFormat('fr-ca').format(new Date(this.#val.getTime() + val));
	            }
	            else {
	                return this.format();
	            }
	        };
	        /** 比较两个日期数据，并返回相差数量，单位为（天、周、月、年）
	         *
	         * @param start 要比较的基准日期
	         * @param end 要比较的目标日期
	         * @param outputType 返回值所使用的日期单位，默认为天
	         */
	        this.getDiff = (dateVal, outputType) => {
	            if (typeof dateVal !== 'undefined') {
	                const num1 = this.#val.getTime();
	                const tp = typeof dateVal;
	                // @ts-ignore
	                const num2 = ((tp === 'number') && dateVal) || (((dateVal instanceof Date && dateVal) || (typeof dateVal === 'string' && new Date(dateVal)) || dateVal.val || this.#val).getTime());
	                const diffVal = num2 - num1;
	                const diffValDay = Math.round((num2 - num1) / 1000 / 60 / 60 / 24);
	                const getNum = (val, len = 1) => +val.toFixed(len);
	                if (outputType === 'ms') {
	                    return diffVal;
	                }
	                else if (outputType === 'second') {
	                    return (diffVal / 1000) << 0;
	                }
	                else if (outputType === 'minute') {
	                    return (diffVal / 1000 / 60) << 0;
	                }
	                else if (outputType === 'hour') {
	                    return getNum(diffVal / 1000 / 60 / 60, 1);
	                }
	                else if (outputType === 'year') {
	                    return +(diffValDay / 365).toFixed(3);
	                }
	                else if (outputType === 'month') {
	                    return getNum(diffValDay / 30);
	                }
	                else if (outputType === 'week') {
	                    return getNum(diffValDay / 7);
	                }
	                else {
	                    return diffValDay;
	                }
	            }
	            else {
	                return 0;
	            }
	        };
	        /** 将实例日期的值转换为数字
	         *
	         * @param notTimestamp 是否弃用时间戳形式而改为用户序列值，默认为否。为真时，可以自定义数字来源中包含的日期时间片段
	         * @param fmt 自定义数字来源片段的格式化字符串，仅当 notTimestamp 为真时有效
	         * @returns
	         */
	        this.toNumber = (notTimestamp = false, fmt) => {
	            if (notTimestamp) {
	                const val = +this.format((fmt || 'yyyymmddhhmissms').replace(/\-/g, ''));
	                if (!isNaN(val)) {
	                    return val;
	                }
	                else {
	                    throw new Error('Get invalid param of tdate.toNumber.\nIn this function\'s param string, you should with the pattern string like tdate.format only.');
	                }
	            }
	            else {
	                return this.#val.getTime();
	            }
	        };
	        /** 获取实例日期的 JSON 对象表示
	         * @param local [可选]，代表返回数据采用的区域信息
	         * @returns 格式化后的 JSON 对象
	         */
	        this.toJson = (local) => {
	            const [y, m, d, h, mi, s, ms] = this.toArr(true);
	            return {
	                year: y,
	                month: m,
	                day: d,
	                hour: h,
	                minutes: mi,
	                second: s,
	                millisecond: ms,
	                week: this.getWeek(local),
	                weekOfMonth: this.getWeekOfMonth(local),
	                weekOfYear: this.getWeekOfYear(local),
	                quarter: this.getQuarter(local),
	                isLeap: this.isLeap,
	                lunar: this.formatAsLunar(),
	                buddhist: this.formatAsBh()
	            };
	        };
	        /** 将实例日期转换为值数组
	         * @param {*} includTime [可选]是否包含时间信息
	         * @returns 不传入参数时，默认返回数组内元素依次为 [年，月，日，时，分，秒，毫秒]
	         */
	        this.toArr = (includTime) => {
	            return this.format(includTime ? 'yyyy-mm-dd-hh-mi-ss-ms' : 'yyyy-mm-dd').split('-').map(v => +v);
	        };
	        this.#val = initVal;
	    }
	    #val;
	    /** 判断当前实例所代表的日期是否为闰年
	     * @returns 输入布尔值，Ture代表是，False代表否
	     */
	    get isLeap() {
	        const y = this.#val.getFullYear();
	        return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
	    }
	    /** 获取时间戳的最大绝对值。
	     *  时间戳的有效范围应该是正负（绝对值）区间
	     * @returns 代表区间范围的绝对值（正负绝对值相同）
	     */
	    static get abs() {
	        return MIN_MAX;
	    }
	    /** 获取实例日期所在年份
	     * @returns 输出阿拉伯数字格式
	     */
	    get year() {
	        return +this.format('yyyy');
	    }
	    /** 获取实例日期所在月份
	     * @returns 输出阿拉伯数字格式
	     */
	    get month() {
	        return +this.format('mm');
	    }
	    /** 获取实例日期的公历号数
	     * @returns 输出阿拉伯数字格式
	     */
	    get day() {
	        return +this.format('dd');
	    }
	    /** 获取实例日期的小时
	     * @returns 输出阿拉伯数字格式
	     */
	    get hour() {
	        return +this.format('hh');
	    }
	    /** 获取实例日期的分钟
	     * @returns 输出阿拉伯数字格式
	     */
	    get minute() {
	        return +this.format('mi');
	    }
	    /** 获取实例日期的秒数
	     * @returns 输出阿拉伯数字格式
	     */
	    get second() {
	        return +this.format('ss');
	    }
	    /** 获取实例日期的毫秒数
	     * @returns 输出阿拉伯数字格式
	     */
	    get millisecond() {
	        return +this.format('ms');
	    }
	    /** 获取实例日期是周几
	     * @returns 输出阿拉伯数字代表的周（本周第几天，周一为1，周日为7）
	     */
	    get week() {
	        return this.#val.getDay() || 7;
	    }
	    /** 获取实例日期的所在季度
	     * @returns 输出阿拉伯数字代表的季度序号，起始为1
	     */
	    get quarter() {
	        const m = this.#val.getMonth() + 1;
	        return ((m < 4) && 1) || ((m < 7) && 2) || ((m < 10) && 3) || 4;
	    }
	    /** 获取实例日期对应的节气
	     * @returns
	     */
	    get solar() {
	        const [year, month, day] = this.toArr();
	        let y = +year;
	        let m = +month - 1;
	        let d = +day;
	        const sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
	        const solarTerm = new Array('小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至');
	        let solarTerms = '';
	        while (solarTerms == '') {
	            let tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	            let tmp2 = tmp1.getUTCDate();
	            if (tmp2 == d)
	                solarTerms = solarTerm[m * 2 + 1];
	            tmp1 = new Date((31556925974.7 * (y - 1900) + sTermInfo[m * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	            tmp2 = tmp1.getUTCDate();
	            if (tmp2 == d)
	                solarTerms = solarTerm[m * 2];
	            if (d > 1) {
	                d = d - 1;
	            }
	            else {
	                m = m - 1;
	                if (m < 0) {
	                    y = y - 1;
	                    m = 11;
	                }
	                d = 31;
	            }
	        }
	        return solarTerms;
	    }
	    /** 获取实例日期所对应的星座
	     */
	    get sign() {
	        const Zone = new Array(1222, 122, 222, 321, 421, 522, 622, 722, 822, 922, 1022, 1122, 1222);
	        const [year, month, day] = this.toArr(); // eslint-disable-line
	        const m = month;
	        const d = day;
	        if ((100 * m + d) >= Zone[0] || (100 * m + d) < Zone[1]) {
	            var i = 0;
	        }
	        else {
	            for (var i = 1; i < 12; i++) {
	                if ((100 * m + d) >= Zone[i] && (100 * m + d) < Zone[i + 1]) {
	                    break;
	                }
	            }
	        }
	        return DICT_SIGN.substring(2 * i, 2 * i + 2);
	    }
	    /** 获取实例日期所对应的属相
	     */
	    get animal() {
	        return DICT_ANIMAL.charAt((this.#val.getFullYear() - 4) % 12);
	    }
	    /** 获取实例日期是所在季度的第几天
	     * @returns 输出阿拉伯数字代表的周（起始为1）
	     */
	    get indexOfQuarter() {
	        return -1 * this.getDiff(new Date(`${this.year}-${[1, 4, 7, 10][this.quarter - 1]}-1 00:00:00.000`), 'day');
	    }
	    /** 获取实例日期是所在年份的第几天
	     * @returns 输出阿拉伯数字代表的周（起始为1）
	     */
	    get indexOfYear() {
	        return numToRound((this.toNumber() - new Date(`${this.year}-1-1 00:00:00.000`).getTime()) / MS_DAY, 0, 'carry');
	    }
	    /** 获取实例日期所在月份的总天数
	     */
	    get daysOfMonth() {
	        return new Date(this.#val.getFullYear(), +this.format('mm'), 0).getDate();
	    }
	    /** 获取实例日期所在季度的总天数
	     */
	    get daysOfQuarter() {
	        const daysOfMonth2 = new Date(this.year, 2, 0).getDate();
	        return [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]][this.quarter - 1].map(v => DAYS_MONTH[v] || daysOfMonth2).reduce((pre, curr) => {
	            return pre + curr;
	        }, 0);
	    }
	    /** 获取实例日期所在年份的总天数
	     * @returns
	     */
	    get daysOfYear() {
	        return 337 + new Date(this.#val.getFullYear(), 2, 0).getDate();
	    }
	    /** 获取实例日期相比所在周的百分比占比
	     * @returns
	     */
	    get ratioOfWeek() {
	        return numToRound(this.week / 7, 1);
	    }
	    /** 获取实例日期相比所在月的百分比占比
	     * @returns
	     */
	    get ratioOfMonth() {
	        return numToRound(this.day / this.daysOfMonth, 1);
	    }
	    /** 获取实例日期相比所在季度的百分比占比
	     * @returns
	     */
	    get ratioOfQuarter() {
	        return numToRound(this.indexOfQuarter / this.daysOfQuarter, 1);
	    }
	    /** 获取实例日期相比所在年份的百分比占比
	     * @returns
	     */
	    get ratioOfYear() {
	        return numToRound(this.indexOfYear / this.daysOfYear, 3);
	    }
	    /** 获取实例日期对应的天干纪年法
	     */
	    get tiangan() {
	        const i = this.#val.getFullYear() - 1900 + 36;
	        return DICT_GZ[0].charAt(i % 10) + DICT_GZ[1].charAt(i % 12);
	    }
	    /** 获取实例日期属于本月第几周
	     * @returns 输出阿拉伯数字代表的月内周次序号，起始为1
	     */
	    get weekOfMonth() {
	        return Math.ceil((this.#val.getDate() + 6 - this.#val.getDay()) / 7);
	    }
	    /** 获取实例日期属于当年第几周
	     * @returns 输出阿拉伯数字代表的年内周次序号，起始为1
	     */
	    get weekOfYear() {
	        return Math.ceil((this.#val.getDate() + 6 - this.#val.getDay()) / 7);
	    }
	}
	function tDate$1(...val) {
	    const [a, b, c = 0, d = 0, e = 0, f = 0, g = 0] = val;
	    if (!a) {
	        return __checkDate__(new Date());
	    }
	    else {
	        if (val.length > 1) {
	            return __checkDate__(new Date(a, b, c, d, e, f, g));
	        }
	        else {
	            return __checkDate__(new Date(a));
	        }
	    }
	}

	const EN_LETTER = 'abcdefghjklmnopqrstwxyz'.split('');
	const CH_LETTER = '阿八嚓哒妸发旮哈讥咔垃吗拏噢妑七呥扨它穵夕丫帀'.split('');
	/** 依据传入中文数组的首字母分组
	 *
	 * @param arr 要进行分组的中文数组
	 * @param fullLetter 若为True，则即时某个字母标签下没有匹配的文字，也返回空数组
	 * @returns 按照26个英文字母分组的结果集
	 */
	function groupByFirstLetter(arr, fullLetter) {
	    const res = {};
	    let i = 0;
	    while (i < arr.length) {
	        const va = arr[i];
	        if (/^[a-zA-Z]/.test(va)) {
	            const lt = va.charAt(0);
	            if (!res[lt])
	                res[lt] = [];
	            res[lt].push(va);
	        }
	        else {
	            let k = 0;
	            for (const v of EN_LETTER) {
	                if ((CH_LETTER[k].localeCompare(va, 'zh') <= 0) && va.localeCompare(CH_LETTER[k + 1], 'zh') === -1) {
	                    if (!res[v]) {
	                        res[v] = [];
	                    }
	                    res[v].push(va);
	                    break;
	                }
	                else if (fullLetter && !res[v]) {
	                    res[v] = [];
	                }
	                k++;
	            }
	        }
	        i++;
	    }
	    return res;
	}
	/** 获取传入文字的首字母
	 * @param word 要获取首字母的字符串
	 * @returns
	 */
	function getFirstLetter(word) {
	    let k = 0;
	    let currLetter = '';
	    const str = word.charAt(0);
	    for (const v of EN_LETTER) {
	        if ((CH_LETTER[k].localeCompare(str, 'zh') <= 0) && str.localeCompare(CH_LETTER[k + 1], 'zh') === -1) {
	            currLetter = v;
	            break;
	        }
	        k++;
	    }
	    return currLetter;
	}

	// 默认校验参数
	// const DEFAULT_OPT: tmind.tVerifi.Irule = {
	// 	trueVal: true,
	// 	numType: '10'
	// };
	// 模式列表
	const pattern = {
	    '2': /^[01]+$/,
	    '8': /^[0-7]$/,
	    '10': /^-{0,1}\d*\.{0,1}\d+$/,
	    '16': /^[A-Fa-f0-9]{1,4}$/,
	    '26': /^[a-zA-Z]+$/,
	    specialLetter: `[\`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]` // eslint-disable-line
	};
	const RULES = {
	    isNum: {
	        title: '为纯数字',
	        func: (val, opt) => {
	            const _tp = typeof val;
	            if (_tp === 'number' || _tp === 'string') {
	                if (opt.numType === '2')
	                    return pattern['2'].test(`${val}`);
	                if (opt.numType === '8')
	                    return pattern['8'].test(`${val}`);
	                if (opt.numType === '10')
	                    return pattern['10'].test(`${val}`);
	                if (opt.numType === '16')
	                    return pattern['16'].test(`${val}`);
	                if (opt.numType === '26')
	                    return pattern['26'].test(`${val}`);
	                return false;
	            }
	            else {
	                return false;
	            }
	        }
	    },
	    hasSpace: {
	        title: '是否包含空格',
	        func: (val, opt) => (typeof val === 'string') && /\s+/.test(`${val}`)
	    },
	    hasSpecial: {
	        title: '是否包含特殊字符',
	        func: (val, opt) => (typeof val === 'string')
	    },
	    stringLen: {
	        title: '字符长度限定',
	        func: (val, opt) => {
	            const _currLen = `${val}`.length;
	            if (typeof opt?.minLen !== 'undefined') {
	                return _currLen > opt.minLen;
	            }
	            else if (typeof opt?.maxLen !== 'undefined') {
	                return _currLen < opt.maxLen;
	            }
	            else {
	                return true;
	            }
	        }
	    }
	};
	class TVerifi {
	    constructor(val, fullCheck, ...rules) {
	        this.isNum = (opt) => {
	            return this;
	        };
	        this.#val = val;
	        this.#isOk = false;
	        this.#fullCheck = fullCheck ?? false;
	        this.#checked = false;
	        this.#reason = [];
	        for (const v of rules) {
	            if (v.patten) {
	                v.trueVal = typeof v.trueVal === 'undefined' ? true : v.trueVal;
	                v.isOk = false;
	                v.reason = '';
	                this.#reason.push(v);
	            }
	        }
	    }
	    #val;
	    #isOk;
	    #fullCheck;
	    #reason;
	    #checked;
	    /** 获取当前实例校验结果
	     */
	    get isOk() {
	        if (!this.#checked) {
	            for (const v of this.#reason) {
	                const b = RULES[v.patten].func(this.#val, v);
	                v.isOk = b;
	                v.reason = '';
	                this.#isOk = this.#isOk && b;
	                if (!this.#fullCheck && !b) {
	                    break;
	                }
	            }
	            this.#checked = true;
	        }
	        return this.#isOk;
	    }
	}
	/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
	 * @returns
	 */
	TVerifi.getRules = () => {
	    // const _obj: tmind.IObjKt<typeof RULES, any> = {};
	    const _obj = {};
	    const _arr = Object.keys(RULES);
	    for (const v of _arr) {
	        _obj[v] = RULES[v].title;
	    }
	    return _obj;
	};
	/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
	 */
	const getRules = TVerifi.getRules;
	/** 执行有效性校验
	 * @param val 要校验的值，支持校验的值类型为：（string | number | boolean | null | undefined）
	 * @param fullCheck 链式校验过程中，是否强制全链遍历
	 *  			若为 false，则任何一环校验失败，则立即终止校验
	 * @param rules 校验规则组
	 * @returns
	 */
	function check(val, fullCheck, ...rules) {
	    return (new TVerifi(val, fullCheck, ...rules)).isOk;
	}

	String.prototype.len = __len__;
	String.prototype.lenfrom0 = __lenfrom0__;
	String.prototype.left = __left__;
	String.prototype.right = __right__;
	String.prototype.mid = __mid__;
	String.prototype.like = __like__;
	String.prototype.upFirst = __upFirst__;
	String.prototype.camelCase = __camelCase__;
	String.prototype.splitCamelCase = __splitCamelCase__;
	String.prototype.toObj = __toObj__;
	String.prototype.encodeToUniCode = function () {
	    return encode.toUniCode(this.valueOf());
	};
	String.prototype.encodeFromWechatNick = function () {
	    return encode.wechatNick(this.valueOf());
	};
	String.prototype.decodeToStr = function (splitStr) {
	    return decode.toStr(this.valueOf(), splitStr || '-');
	};
	String.prototype.decodeToWechatNick = function () {
	    return decode.wechatNick(this.valueOf());
	};
	Number.prototype.toPrice = function (typeStr = 'CNY') {
	    return numToPrice.call(this, this.valueOf(), typeStr);
	};
	Number.prototype.toSplit = function (fracDigits) {
	    return numToSplit.call(this, this.valueOf(), fracDigits);
	};
	Number.prototype.toArr = function () {
	    return numToArr.call(this, this.valueOf());
	};
	Number.prototype.toRound = function (digit, type) {
	    return numToRound.call(this, this.valueOf(), digit, type);
	};
	Number.prototype.toCNY = function () {
	    return numToCNY.call(this, this.valueOf());
	};
	Number.prototype.isOdd = function () {
	    return numIsOdd.call(this, this.valueOf());
	};
	Number.prototype.funcAdd = function (...item) {
	    return funcAdd(this.valueOf(), ...item);
	};
	Number.prototype.funcSub = function (...item) {
	    return funcSub(this.valueOf(), ...item);
	};
	Number.prototype.funcMult = function (...item) {
	    return funcMult(this.valueOf(), ...item);
	};
	Number.prototype.funcDiv = function (...item) {
	    return funcDiv(this.valueOf(), ...item);
	};
	Array.prototype.insertTo = function (destIndex = 1, ...newItem) {
	    arrInsert.call(this, this, destIndex, ...newItem);
	};
	Array.prototype.moveTo = function (fromIdx, destIdx, itemCount = 1, orderField = 'orderIdx') {
	    arrMoveItem.call(this, this, fromIdx, destIdx, itemCount, orderField);
	};
	Array.prototype.decodeToStr = function () {
	    return decode.toStr(this, '');
	};
	const tU = Tutil$1;
	if (tU.inBrowser) {
	    bline();
	    window.onerror = function (err, url, l) {
	        return false;
	    };
	}
	else if (tU.inSvr) {
	    process.on('uncaughtException', function (err) {
	        techo(err, '未处理的异常', 'ERR');
	    });
	}
	// Object.prototype.dClone = function (): any {
	// 	return deepClone.call(this, this);
	// };
	// 枚举
	// 类
	const Tuser = Tuser$1;
	const Tutil = Tutil$1;
	// 函数
	const smpoo = companyInfo;
	const tCheckType = tCheckType$1;
	const tEcho = techo;
	const tDate = tDate$1;
	const tClear = tclear;
	const tPinyin = {
	    getFirstLetter,
	    groupByFirstLetter
	};
	const tVerifi = {
	    getRules,
	    check
	};

	exports.Tuser = Tuser;
	exports.Tutil = Tutil;
	exports.smpoo = smpoo;
	exports.tCheckType = tCheckType;
	exports.tClear = tClear;
	exports.tDate = tDate;
	exports.tEcho = tEcho;
	exports.tPinyin = tPinyin;
	exports.tVerifi = tVerifi;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
