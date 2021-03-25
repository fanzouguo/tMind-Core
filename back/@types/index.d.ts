/* eslint-disable no-unused-vars */
declare global {
	// 信息记录类型
	type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;

	// 可作为日期传参的类型
	type dateLike = string | number | number[] | Date | null | undefined;

	// 可作为 Boolean 传参的类型
	type boolLike = boolean | string | number | null | undefined;

	// type ptverifi = (val: string | number, alias?: string, fullCheck?: boolean)

	interface IObj<T> {
		[index: string]: T;
	}

	interface IObjKv {
		[index: string]: string;
	}

	interface IverifiOpt {
		/** 正则断言为匹配时的值
		 *  默认为 TRUE，若设为 FALSE，设为断言匹配，但需拒绝
		 */
		trueVal: boolean,
		/** 校验规则中要求的最小长度
		 */
		minLen?: number,
		/** 校验规则中允许的最大长度
		 */
		maxLen?: number,
		/** 进制类型判断的可选范围
		 */
		numType?: '2' | '8' | '10' | '16' | '26'
	}

	interface ItVerifi {
		/** 判断参数是否为有效进制的数字或形似数字的字符
		 *
		 * @param val 要判断的参数
		 * @param numType 要判断的参数，默认判断十进制
		 * @returns 若符合，则返回 True，反之亦反
		 */
		isNum: (opt: IverifiOpt) => ItVerifi,

		// 包含空格
		strSpaceHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 包含特殊符号
		strSpeciaHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 包含中文
		strCnHas: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 纯英文字母
		strEnOnly: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 用户名，4到16位（字母，数字，下划线，减号）
		userName: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
		uPwd: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 数字
		num: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 整数
		numInt: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 正数
		numPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 负数
		numNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 正整数
		numIntPos: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 负整数
		numIntNag: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// Email
		email: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 手机号
		mobile: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 固定电话
		telphone: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 身份证号（18位）
		idCard: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// URL
		url: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// ipv4地址
		ip: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// RGB Hex颜色
		rgbHex: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 日期时间
		date: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 微信号，6至20位，以字母开头，字母，数字，减号，下划线
		wechatNo: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi

		// 车牌号
		carNum: (opt: IverifiOpt = DEFAULT_OPT) => ItVerifi
	}

	interface String extends String {
		/** 返回字符串的长度，等效于 length
		 */
		len(): number;
		/** 返回字符串从0开始计数的长度值(len - 1)
		 */
		lenfrom0(): number;
		/** 字符串截取左边指定长度
		 * @param len 要截取的长度
		 */
		left(len: number): string;
		/** 字符串截取右边指定长度
		 * @param len 要截取的长度
		 */
		right(len: number): string;
		/** 字符串从指定索引位置（始于0）开始截取指定长度
		 * @param startIdx 开始截取的的起始索引
		 * @param len 若值为正数，则代表要截取的长度，
		 * 						若为负数，则该值代表右边应该舍去的长度（均从1开始计数）
		 * 						若为 0，则返回一个空字符串
		 * @returns	截取后的结果字符串
		 */
		mid(startIdx: number, len: number): string;
		/** 判断当前字符串是否为有效的类进制数据
		 * @param 要判断的进制类型
		 * num2：判断是否为类二进制字符
		 * num8：判断是否为类八进制字符
		 * num10：判断是否为类十进制字符
		 * num16：判断是否为类十六进制字符
		 * num26：判断是否为类二十六进制字符
		 * @returns	Ture表示判断有效，反之亦反
		 */
		like(typestr: 'num2' | 'num8' | 'num10' | 'num16' | 'num26'): boolean;
		/** 字符串首字母大写
		 */
		upFirst(): string;
		/** 将下划线、中括号或空格分隔的字符组合为小驼峰
		 */
		camelCase(): string;
		/** 转换为小驼峰
		 */
		toCamelCase(): string;
		/** 转码微信昵称
		 * @param val
		 * @returns
		 */
		wxAliaseEncode(): string;
		/** 将转码后的数据解析出微信昵称
		 * @returns
		 */
		wxAliaseDecode(): string;
	}

	interface Number extends Number {
		/** 将数字转换为货币显示
		 * @param val 要转换的数字
		 * @param typeStr 货币类型
		 * @returns
		 */
		toPrice(type?: 'CNY' | 'USD'): string;
		/** 采用千分符分隔数字
		 * @param val 要分隔的数字
		 * @param fracDigits 小数最大显示位数
		 * @returns
		 */
		toSplit(fracDigits?: number): string;
		/** 以小数点为分隔符，将数字拆分为二元数组，分别代表整数部分和小数部分
		 *
		 * @param val
		 * @returns
		 */
		toArr(): string[];
		/** 四舍五入
		 * @param val 要处理的数字
		 * @param digit 保留的小数位数，默认为2
		 * @param type 舍入规则： '常规：四舍五入' | '银行家舍入: 四舍六入五考虑' | '强制进位' | '强制舍位'
		 * @returns
		 */
		toRound(digit?: number, type?: 'normal' | 'bank' | 'carry' | 'drop'): number;
		/** 金额转换为人民币大写
		 * @param val 要转换的金额
		 * @returns
		 */
		toCNY(): string;
		/** 判断数字是否为奇数
		 * @param val
		 * @returns
		 */
		isOdd(val: number): boolean;
	}

	interface Array extends Array {
		/** 对传入的数组，在指定索引位置之后插入值，该方法默认会改变原始数组
		 * @param arr 要插入的原始数组
		 * @param destIndex 要插入的索引位置，起始值为：0
		 * @param newItem 要插入的新元素
		 * @returns 插入元素后的数组
		 */
		insertTo<T>(destIndex: number, ...newItem: T[]): void;
		/** 向前或向后移动传入数组中指定索引位置的元素，该方法会改变原始数组。
		 *  该方法针对数组内元素的类型不同，处理方式亦不同。
		 * 数组内元素为 JSON 对象的，会对 orderField指定的元素字段（默认为 orderIdx）按照新的排序刷新排序值，而不改变元素在数组内的实际位置
		 * 数组内元素若是 JSON 对象之外的其他类型，则排序过程会直接调整元素在数组内顺序
		 * @param arr 要进行元素移动的原始数组
		 * @param fromIdx 要移动的元素在数组中的原始索引（索引从0开始计数），
		 * 								若要移动的元素在数组中系连续多个，则此处代表这些元素中的最小索引
		 * @param	 destIdx 本次要移动到的目标位置索引
		 * @param	 itemCount 本次要移动的元素数量（若数量 > 1，则这些元素在原始位置中必须连续存在）
		 * @returns
		 */
		moveTo(fromIdx: number, destIdx: number, itemCount?: number, orderField: string): void;
	}

	interface Object extends Object {
		// /** 此处不做复杂逻辑的深拷贝，仅利用JSON.stringify方法简单返回结果
		//  * 基于 tFrameV9框架的设计，仅对数据载荷的 JSON 对象进行深拷贝，该对象本身仅作为数据表示层。
		//  *
		//  * @param obj 要拷贝的原始对象
		//  * @returns 拷贝后的对象
		//  */
		//  dClone: () => any;
	}
}

export { };