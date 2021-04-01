import tmind from '../types/index';

const __specialLetter__ = `[\`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]`; // eslint-disable-line

const DEFAULT_OPT: tmind.IverifiOpt = {
	trueVal: true,
	numType: '10'
};

class TVerifi implements tmind.ItVerifi {
	val: string;
	alias: string;
	fullCheck: boolean;
	break: boolean;
	reason: string[];
	/** 构造类
	 *
	 * @param val 要校验的字符串或数字
	 * @param alias 用于校验（成功或失败）时，规则提示的别称
	 * @param fullCheck 对于链式调用，是否全链校验，而不论中间是否已存在校验失败。默认为否，即一旦任何一链失败，则立即终止校验
	 */
	constructor(val: string | number, alias?: string, fullCheck?: boolean) {
		this.val = typeof val === 'string' ? val : `${val}`;
		this.alias = alias || '';
		this.break = false;
		this.reason = [];
		this.fullCheck = !!(fullCheck);
	}

	/** 获取校验结果
	 */
	get isOk() {
		return !!(this.reason.length);
	}

	/** 预处理校验结果
	 * @param val 单步校验结果的提示信息
	 */
	private preResult(val: boolean, trueMsg: string, falseMsg: string, opt: tmind.IverifiOpt): TVerifi {
		if ((!val && opt.trueVal) || (val && !opt.trueVal)) {
			this.reason.push(`${this.alias || this.val}校验失败：${opt.trueVal ? trueMsg : falseMsg}`);
			if (!this.fullCheck) {
				this.break = true;
			}
		}
		return this;
	}

	/** 判断参数是否为有效进制的数字或形似数字的字符
	 *
	 * @param val 要判断的参数
	 * @param numType 要判断的参数，默认判断十进制
	 * @returns 若符合，则返回 True，反之亦反
	 */
	isNum = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => {
		/* 八、十 */
		const pattern: tmind.IObj<any> = {
			'2': /^[01]+$/,	/* eslint-disable-line */
			'8': /^[0-7]$/,	/* eslint-disable-line */
			'10': /^-{0,1}\d*\.{0,1}\d+$/,	/* eslint-disable-line */
			'16': /^[A-Fa-f0-9]{1,4}$/,	/* eslint-disable-line */
			'26': /^[a-zA-Z]+$/	/* eslint-disable-line */
		};
		const tp = typeof this.val;
		const _pt_ = pattern[`${opt?.numType}` || '10'];
		return this.preResult(((tp === 'string' || tp === 'number') && _pt_ && _pt_.test(this.val)), `不是有效的${opt?.numType}进制数据`, `不允许的${opt?.numType}进制数据`, opt);
	};

	// 包含空格
	strSpaceHas = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/\s+/.test(this.val), '包含空格', '不允许包含空格', opt);

	// 包含特殊符号
	strSpeciaHas = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult((new RegExp(__specialLetter__)).test(this.val), '包含特殊符号', '不允许包含特殊符号', opt); // eslint-disable-line

	// 包含中文
	strCnHas = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/[\u4E00-\u9FA5]/.test(this.val), '未包含中文', '不允许包含中文', opt);

	// 纯英文字母
	strEnOnly = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^[a-zA-Z]+$/.test(this.val), '非纯英文字母', '不允许出现纯英文字母组合', opt);

	// 用户名，4到16位（字母，数字，下划线，减号）
	userName = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult((new RegExp(`^[a-zA-Z0-9_-]{${opt?.minLen || 4}, ${opt?.maxLen || 16}}$`)).test(this.val), `有效用户名只允许${opt?.minLen || 4}~${opt?.maxLen || 16}位字母、数字、或下划线的组合`, `有效用户名不允许${opt?.minLen || 4}~${opt?.maxLen || 16}位字母、数字、或下划线的组合`, opt);

	// 密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
	uPwd = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult((new RegExp(`^.*(?=.{${opt?.minLen || 6},})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$`)).test(this.val), `有效密码格式最少${opt?.minLen || 6}位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符`, `有效密码格式不允许${opt?.minLen || 6}位，且至少1个大写字母，1个小写字母，1个数字，1个特殊字符这样的组合`, opt);

	// 数字
	num = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^-?\d*\.?\d+$/.test(this.val), '不是有效的数字', '不允许数字', opt);

	// 整数
	numInt = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^-?\d+$/.test(this.val), '不是有效的整数', '不允许整数', opt);

	// 正数
	numPos = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^\d*\.?\d+$/.test(this.val), '不是有效的正数', '不允许出现正数', opt);

	// 负数
	numNag = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^-\d*\.?\d+$/.test(this.val), '不是有效的负数', '不允许出现负数', opt);

	// 正整数
	numIntPos = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^\d+$/.test(this.val), '不是有效的正整数', '不允许出现正整数', opt);

	// 负整数
	numIntNag = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^-\d+$/.test(this.val), '不是有效的负整数', '不允许出现负整数', opt);

	// Email
	email = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.val), '不是有效邮箱', '不允许类似邮箱的格式', opt);

	// 手机号
	mobile = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^1[34578]\d{9}$/.test(this.val), '不是有效手机号', '不允许类似手机号的数据格式', opt);

	// 固定电话
	telphone = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^((d{3,4})|d{3,4}-|s)?d{7,14}$/.test(this.val), '不是有效的固定电话格式', '不允许类似固定电话数据格式', opt);

	// 身份证号（18位）
	idCard = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.val), '不是有效身份证号', '不允许类似身份证号码格式的数据', opt);

	// URL
	url = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(this.val), '不是有效的网址', '不允许类似网址格式的数据', opt);

	// ipv4地址
	ip = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.val), '不是有效的IP地址', '不允许类似IP地址格式的数据', opt);

	// RGB Hex颜色
	rgbHex = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(this.val), '不是有效的RGB_Hex颜色数据', '不允许类似HEX格式的数据', opt);

	// 日期时间
	date = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(this.val), '不是有效的日期时间格式化', '不允许类似日期时间格式的数据', opt);

	// 微信号，6至20位，以字母开头，字母，数字，减号，下划线
	wechatNo = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(this.val), '不是有效的微信号', '不允许类似微信号格式的数据', opt);

	// 车牌号
	carNum = (opt: tmind.IverifiOpt = DEFAULT_OPT): TVerifi => this.preResult(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(this.val), '不是有效的车牌号', '不允许类似车牌号的数据', opt);
}

/** 校验函数
 *
 * @param val 要校验的字符串或数字
 * @param alias 用于校验（成功或失败）时，规则提示的别称
 * @param fullCheck 对于链式调用，是否全链校验，而不论中间是否已存在校验失败。默认为否，即一旦任何一链失败，则立即终止校验
 */
export function tVerifi(val: string | number, alias?: string, fullCheck?: boolean): tmind.ItVerifi {
	return new TVerifi(val, alias, fullCheck);
}
