const KEEP_UNIT: string[] = ['万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正'];
const ALIAS_NUM: string[] = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const ALIAS_UNIT: string[] = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '兆', '拾', '佰', '仟', '京', '拾', '佰', '仟', '垓', '拾', '佰', '仟', '杼', '拾', '佰', '仟', '穰', '拾', '佰', '仟', '沟', '拾', '佰', '仟', '涧', '拾', '佰', '仟', '正', '拾', '佰', '仟'];

/** 将数字转换为货币显示
 * @param val 要转换的数字
 * @param typeStr 货币类型
 * @returns
 */
const numToPrice = function (val: number, typeStr: 'CNY' | 'USD'): string {
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
const numToSplit = function (val: number, fracDigits?: number): string {
	return Intl.NumberFormat('en-US', {
		maximumFractionDigits: (typeof fracDigits === 'undefined') ? 2 : fracDigits
	}).format(2334.338922);
};

/** 以小数点为分隔符，将数字拆分为二元数组，分别代表整数部分和小数部分
 *
 * @param val
 * @returns
 */
const numToArr = function (val: number): string[] {
	return `${val}`.split('.');
};

/** 四舍五入
 * @param val 要处理的数字
 * @param digit 保留的小数位数，默认为2
 * @param type 舍入规则： '常规：四舍五入' | '银行家舍入: 四舍六入五考虑' | '强制进位' | '强制舍位'
 * @returns
 */
const numToRound = function(val: number, digit?: number, type?: 'normal' | 'bank' | 'carry' | 'drop'): number {
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
			let ouputNum: number = +a;
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
const numToCNY = function (val: number): string {
	const ALIAS_FRA = ['角', '分', '厘', '毫', '丝'];
	const [a, b] = `${val}`.split('.');
	if (a.length > ALIAS_UNIT.length) return '金额超出有效范围，无法显示大写';
	const _arr: string[] = [];
	const _arr2: string[] = [];
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
		const _arrFra: string[] = [];
		_arrB.forEach((v, k) => {
			_arrFra.push(`${ALIAS_NUM[+v]}${ALIAS_FRA[k]}`);
		});
		_arr2.push(_arrFra.join(''));
	} else {
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
const numIsOdd = function (val: number): boolean {
	return !!((val & 1) !== 0);
};

export {
	numToPrice,
	numToSplit,
	numToArr,
	numToRound,
	numToCNY,
	numIsOdd
};