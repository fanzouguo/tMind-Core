/* eslint-disable no-unused-vars */
declare global {
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
		/** 将小驼峰字符转换为中横线分隔法
		 */
		splitCamelCase(): string;
		/** 转换为小驼峰
		 */
		toCamelCase(): string;
		/** 将字符串实例转换为JSON对象格式，且忽略转换错误
		 * @returns 输出绝对的JSON对象，若转换错误，则会添加 gotNull或gotWrong字段
		 */
		toObj(): tmind.IObj<any>;
		/** 将字符串编码为 uniCode 数组的字符串拼接样式
		 * @param str 拼接字符串的分隔符
		 * @returns uniCode数组的拼接样式
		 */
		encodeToUniCode(): number[];
		/** 将代表微信昵称的字符串编码为 uniCode 格式
		 */
		encodeFromWechatNick(): string;
		/** 将已编码的字符串按照指定分隔符解码还原
		 * @param splitStr 解码所用的分隔符
		 */
		decodeToStr(splitStr?: string): string;
		/** 将代表微信昵称的已编码 uniCode 格式字符串还原为微信昵称
		 */
		decodeToWechatNick(): string;
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
		/** 四则运算加法（累加）
		 *
		 * @param item 要依次累加的值
		 * @returns
		 */
		funcAdd(...item: number[]): number;
		/** 四则运算减法（累减）
		 *
		 * @param item 要依次累减的值
		 * @returns
		 */
		funcSub(...item: number[]): number;
		/** 四则运算乘法（累乘）
		 *
		 * @param item 要依次累乘的值
		 * @returns
		 */
		funcMult(...item: number[]): number;
		/** 四则运算除法（累除）
		 *
		 * @param item 要依次累除的值
		 * @returns
		 */
		funcDiv(...item: number[]): number;
	}

	interface Array<T> extends Array<T> {
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
		 * @param fromIdx 要移动的元素在数组中的原始索引（索引从0开始计数），
		 * 								若要移动的元素在数组中系连续多个，则此处代表这些元素中的最小索引
		 * @param	 destIdx 本次要移动到的目标位置索引
		 * @param	 itemCount 本次要移动的元素数量（若数量 > 1，则这些元素在原始位置中必须连续存在）
		 * @param	 orderField
		 * @returns
		 */
		moveTo(fromIdx: number, destIdx: number, itemCount: number = 1, orderField: string): void;
		/** uniCode 数组解析出字符串原文
		 * @returns
		 */
		decodeToStr(): string
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

declare namespace tmind {
	/** 键值类型接口
	 *  以键可以是任意字符串，值为T
	 */
	interface IObj<T> {
		[index?: string]: T;
	}

	/** 从第一个泛型中获取键名的限定范围，第二个泛型申明值类型
	 */
	type IObjKT<K, T> = {
		[P in keyof K]: T;
	}

	/** 基础键值对
	 *
	 */
	interface IKv {
		id: number;
		namezh: string;
	}

	/** 基于 代码/名称 的键值对
	 *
	 */
	interface ICodeName {
		code: string;
		namezh: string;
	}

	/** 业务对象基类
	 *
	 */
	interface IBaseBiz extends IKv, ICodeName {
		/** 记录ID
		 *
		 */
		id: number;
		/** 从属主记录ID
		 *	(!)勿用于业务逻辑中的关联关系
		 */
		pid: number;
		/** 业务 code
		 *
		 */
		code: string;
		/** 业务名称
		 *
		 */
		namezh: string;
		/** 备注
		 *
		 */
		memo: string;
	}

	type nullLike = null | undefined;

	/** 全局输出信息类型
	 */
	type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | nullLike;

	/** 可作为日期传参的代类型
	 */
	type dateLike = string | number | number[] | Date | nullLike;

	/** 可作为 Boolean 传参的类型
	 */
	type boolLike = boolean | string | number | nullLike;

	/** 支持校验的数据类型
	 */
	type verifiAble = string | number | boolean | nullLike;

	/** tFrameV9 所支持的校验规则类型
	 *
	 */
	type VERIFI_RULE = 'isNum' | 'hasSpace' | 'hasSpecial' | 'maxOrMinLen';

	/** 校验规则项定义
	 */
	type IRullItem = {
		title: string,
		func: (val: tmind.verifiAble, opt: tmind.tVerifi.Irule) => boolean
	};

	/** 用户信息基类
	 *
	 */
	interface IUserBase {
		/** 用户ID
		 */
		id: number,
		/** 上级挂载对象ID
		 */
		pid: number,
		/** 用户登录码
		 */
		code: string,
		/** 非中文母语的用户名称
		 */
		name: string,
		/** 用户中文名称
		 */
		namezh: string,
		/** 用户昵称
		 */
		nickName: string,
		/** 用户昵称
		 */
		gender: number,
		/** 头像地址
		 */
		avator: string,
		/** 赋权值
		 */
		authStr: string
	}

	/** 编码接口
	 */
	interface Iencode {
		/** 字符串转换为 unicode 数组
		 * @param str 待转码的字符串
		 */
		toUniCode: (str: string) => number[],
		/** 转码微信昵称
		 * @param str 微信昵称字符串
		 * @returns
		 */
		wechatNick: (str: string) => string
	}

	interface Idecode {
		/** uniCode（字符/数字）数组解析出字符串原文
		 * @param val 要解析的uniCode（字符/数字）数组
		 * @param sep 传入参数中val的拼接字符串，默认为半角中横线
		 * @returns
		 */
		toStr: (val: string | number[], sep: string) => string,
		/** 将转码后的数据解析出微信昵称
		 * @param val 要解析的uniCode（字符/数字）数组
		 * @returns
		 */
		wechatNick: (val: string | number[]) => string
	}

	interface Iparse {
		/** 将字符串编码为 uniCode格式 */
		encode: Iencode,
		/** 将uniCode 格式信息解码回字符串 */
		decode: Idecode
	}

	interface Isort {
		/** 数组 sort 方法的升序回调函数
		 *
		 * @param a
		 * @param b
		 */
		sortASC: typeof tmind.sortASC,
		/** 数组 sort 方法的降序回调函数
		 *
		 * @param a
		 * @param b
		 */
		sortDESC: typeof tmind.sortDESC
	}

	/** tmind.smpoo 方法返回的深普信息格式
	 */
	interface IsmpooInfo {
		company: string,
		appCopy: string,
		webSite: string,
		consoleStr: void
	}

	/** DB规则
	 *
	 */
	namespace IDbRule {
		/** 可提供的初始化语句的对象类型
		 *
		 */
		type dbInitType = 'db' | 'table' | 'view' | 'procedure' | 'function' | 'trigger';
		/** 数据库表操作类型
		 *
		 */
		type dbTableOptType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
		/** tFrame 平台支持的 DB 类型
		 *
		 */
		type supportDbType = 'mysql' | 'postgre' | 'mongodb' | 'sqlite' | 'lowDb' | 'msSql' | 'oracle' | 'db2';
		/** tFrame 平台支持的DB字段数据类型（以postgresql为准）
		 */
		type supportColumnType = 'index' | 'bit' | 'varbit' | 'bool' | 'bytea' | 'char' | 'varchar' | 'text' | 'cidr' | 'inet' | 'macaddr' | 'macaddr8' | 'numeric' | 'timestamp' | 'date' | 'time' | 'float4' | 'float8' | ' int2' | ' int4' | ' int8' | 'json' | 'jsonb' | 'uuid';
		/** tFrame 平台字段定义规范
		 *
		 */
		interface IDbColumn {
			/** 字段名称
			 *
			 */
			code: string,
			/** 字段标签
			 *
			 */
			namezh: string,
			/** 字段类型
			 *
			 */
			type: string,
			/** 字段长度
			 *
			 */
			len: number,
			/** 小数位数
			 *
			 */
			decimalLen: number,
			/** 是否允许空
			 *
			 */
			nullable: boolean,
			/** 默认值
			 *
			 */
			defaultVal: string | number | boolean | IObj<any>,
			/** 字段说明
			 *
			 */
			memo: string
		}
		/** 数据表记录基类
		 *
		 */
		interface IRecode extends IKv, ICodeName {
			/** 记录ID
			 *
			 */
			id: number;
			/** 从属主记录ID
			 *	(!)勿用于业务逻辑中的关联关系
			*/
			pid: number;
			/** 业务 code
			 *
			 */
			code: string;
			/** 业务名称
			 *
			 */
			namezh: string;
			/** 备注
			 *
			 */
			memo: string;
			/** 当前审批进度，初始值为：1000
			 * 若审批重启，则在最高位递增，
			 * 如3000代表第三轮审批重启，2005代表第二轮的第5个审批节点
			 */
			approStep: number;
			/** 该记录是否已停用
			 *
			 */
			stopped: 0 | 1;
			/** 该记录是否已标记删除
			 *
			 */
			deleted: 0 | 1;
			/** 记录创建者ID
			 *
			 */
			createBy: number;
			/** 修改者ID
			 *
			 */
			changeBy: number;
			/** 标记删除者ID
			 *
			 */
			deleteBy: number;
			/** 停用者
			 *
			 */
			stopBy: number;
			/** 记录创建时间
			 *
			 */
			createTime: string;
			/** 最后创建时间
			 *
			 */
			changeTime: string;
			/** 标记为停用的触发时间
			 *
			 */
			stopTime: string;
			/** 标记删除日期
			 *
			 */
			deleteTime: string;
			tLeft: number;
			tRight: number;
		}
	}

	/** 服务端配置接口
	 *
	 */
	namespace ISvrConf {
		/** 支持的 SSL 文件类型
		 */
		declare interface IConfCert {
			key: string,
			pem?: string,
			ca?: string[],
			cert?: string
		}

		/** 服务单元配置模型
		 */
		declare interface IConfUnit {
			// 服务索引序号
			id: number,
			/** 服务端实例标识
			 */
			ident: string,
			/** 服务显示名称
			 */
			namezh: string,
			/** 服务描述信息
			 */
			memo: string,
			/** 服务地址，配置管理器初始化时会自动根据 isDev ，从配置文件中该项的元组列表中判断有效的值
			 */
			addr: string,
			/** 服务端口
			 */
			port: number,
			/** 是否将本服务识别标识（ident）作为访问路由的一级前缀
			 */
			prefix?: boolean,
			/** 本服务是否支持跨域
			 */
			corsed?: boolean,
			/** 额外添加的跨域响应头
			 */
			appendCorsHeader: string[],
			/** 禁用的 http 方法，
			 */
			disableMethods: string[],
			/** 跨域白名单
			 */
			corsWhiteList: string[],
			/** 计划任务定时器
			 */
			schedule: string,
			/** 本服务实例是否访问主业务DB服务(true为是，false表示不访问)
			 */
			linkToDb: boolean,
			/** 微信小程序配置
			 *
			 */
			weichat?: {
				appId: string,
				appSecret: string,
			}
		}

		/** DB服务单元配置模型
		 *
		 */
		declare interface IConfDbSvr extends IConfUnit {
			/** 数据库类型
			 *
			 */
			dbType: IDbRule.supportDbType,
			/** 数据库地址
			 *
			 */
			dbAddr: string,
			/** 数据库端口
			 *
			 */
			dbPort: number,
			/** 数据库连接用户名
			 *
			 */
			user: string,
			/** 数据库连接密码
			 *
			 */
			pwd: string,
			/** 数据库连接池细则
			 *
			 */
			defaultDbPool?: {
				/** 池内最大连接数
				 *
				 */
				maxConnCount: number,
				/** 池内最少连接数
				 *
				 */
				minConnCount: number
			},
			/** 字符集
			 *
			 */
			charset?: string,
			/** 排序规则
			 *
			 */
			collate?: string,
			/** 分页查询每页数量
			 *
			 */
			pageCount: number,
			/** 备份参数
			 *
			 */
			backup: {
				/** 备份文件目标文件夹路径
				 *
				 */
				destPath: string,
				/** 定时备份周期（基于 Cron表达式的字符串）
				 *
				 */
				loopStr: string
			}
		}

		/** ORM 实体配置规则
		 *
		 */
		declare interface IConfOrm {
			/** ORM实体类型
			 *
			 */
			type: 'dict' | 'master' | 'bill' | 'report' | 'setting'
			/** ORM实体代码
			 *
			 */
			code: string,
			/** ORM实体名称
			 *
			 */
			namezh: string,
			/** 字段定义
			 *
			 */
			columns: IDbRule.IDbColumn[],
			/** 初始化默认记录
			 *
			 */
			initValue: IObj<IBaseBiz>[],
			/** 是否防止初始记录被变更
			 *
			 */
			protectInitVal: boolean,
			/** 记录代码编码规则
			 *
			 */
			codeRole: (opt?: any) => string,
			/** 是否采用物理删除
			 *
			 */
			realDel: boolean
			/** 表单推送映射
			 *
			 */
			push: {
				/** 单个推送定义的命名作为键，值为[原表要推送字段列表, 目标表接收字段列表（数组第一个元素为目标表名称）]
				 *
				 */
				[k: string]: [string[], string[]]
			},
			/** 标准CRUD之外的扩展定义
			 *
			 */
			extend: IObj<any>
		}

		/** 实例配置
		 */
		export declare interface IConfSvr {
			/** 工程对应的平台蓝图根节点ID
			 */
			id: string,
			/** 工程识别标识
			 */
			ident: string,
			/** 工程名称
			 */
			namezh: string,
			/** 工程级默认服务地址，适用于子服务非分布式部署时的默认值
			 *  工程级服务地址，若是下属各子服务具备独立地址，则需在子服务配置文件中单独指明
			 */
			addr: string,
			/** SSL 验证文件
			 */
			cert: IConfCert,
			/** token 加盐码
			 */
			secretKey: string,
			/** 工程版本号
			 */
			ver: string,
			/** 是否为开发环境
			 */
			isDev: boolean,
			/** 动态生成的日志服务连接地址
			 */
			loggerUrl: string,
			/** 动态生成的数据库服务连接地址
			 */
			dbUrl: string,
			/** 各服务单元的配置信息
			 */
			unit: tmind.IObj<IConfUnit>
		}
	}
}

declare module tmind {
	/** tMind-Core 工具类
	 */
	class Tutil {
		/** 判断当前运行环境是否为浏览器
		 */
		static inBrowser: boolean;
		/** 判断当前运行环境是否为 nodeJs ServerLike
		 */
		static inSvr: boolean;
		/** 0~9 的整型数字中文大写
		 */
		static NUM_TO_STR: string[];

		static sort: tmind.Isort;
		static encode: tmind.IObj<tmind.Iencode>;
		static decode: tmind.IObj<tmind.Idecode>;
	}

	class Tdate {
		private val: Date;

		/** 判断当前实例所代表的日期是否为闰年
		 * @returns 输出为布尔值，Ture代表是，False代表否
		 */
		get isLeap(): boolean;

		/** 获取时间戳的最大绝对值。
		 *  时间戳的有效范围应该是正负（绝对值）区间
		 * @returns 代表区间范围的绝对值（正负绝对值相同）
		 */
		get abs(): number;

		/** 获取实例日期所在年份
		 * @returns 输出为整型数字格式
		 */
		get year(): number;

		/** 获取实例日期所在月份
		 * @returns 输出为整型数字
		 */
		get month(): number;

		/** 获取实例日期的公历号数
		 * @returns 输出为整型数字
		 */
		get day(): number;

		/** 获取实例日期的小时值
		 * @returns 输出为整型数字
		 */
		get hour(): number;

		/** 获取实例日期的分钟值
		 * @returns 输出为整型数字
		 */
		get minute(): number;

		/** 获取实例日期的秒数
		 * @returns 输出为整型数字
		 */
		get second(): number;

		/** 获取实例日期的毫秒数
		 * @returns 输出为整型数字
		 */
		get millisecond(): number;

		/** 获取实例日期是周几
		 * @returns 输出整型数字代表的周（本周第几天，周一为1，周日为7）
		 */
		get week(): number;

		/** 获取实例日期的所在季度
		 * @returns 输出整型数字代表的季度序号，起始为1
		 */
		get quarter(): number;

		/** 获取实例日期对应的节气
		 * @returns
		 */
		get solar(): string;

		/** 获取实例日期所对应的星座
		 */
		get sign(): string;

		/** 获取实例日期所对应的属相
		 */
		get animal(): string;

		/** 获取实例日期是所在季度的第几天
		 * @returns 输出整型数字代表的周（起始为1）
		 */
		get indexOfQuarter(): number;

		/** 获取实例日期是所在年份的第几天
		 * @returns 输出整型数字代表的周（起始为1）
		 */
		get indexOfYear(): number;

		/** 获取实例日期所在月份的总天数
		 */
		get daysOfMonth(): number;

		/** 获取实例日期所在季度的总天数
		 */
		get daysOfQuarter(): number;

		/** 获取实例日期所在年份的总天数
		 * @returns
		 */
		get daysOfYear(): number;

		/** 获取实例日期相比所在周的百分比占比
		 * @returns
		 */
		get ratioOfWeek(): number;

		/** 获取实例日期相比所在月的百分比占比
		 * @returns
		 */
		get ratioOfMonth(): number;

		/** 获取实例日期相比所在季度的百分比占比
		 * @returns
		 */
		get ratioOfQuarter(): number;

		/** 获取实例日期相比所在年份的百分比占比
		 * @returns
		 */
		get ratioOfYear(): number;

		/** 获取实例日期对应的天干纪年法
		 */
		get tiangan(): string;

		/** 获取实例日期属于本月第几周
		 * @returns 输出整型数字代表的月内周次序号，起始为1
		 */
		get weekOfMonth(): number;

		/** 获取实例日期属于当年第几周
		 * @returns 输出整型数字代表的年内周次序号，起始为1
		 */
		get weekOfYear(): number;

		/** 将指定日期按照提供的模式匹配字符串格式化
		 * @param {*} fmt 用于格式化的模式匹配字符串，为空时默认为 'yyyy-mm-dd'
		 * @returns 已格式化的时间 / 日期 字符串（整型数字形式）
		 */
		format: (fmt?: string) => string;

		/** 将指定日期按照提供的模式匹配字符串格式化为中文汉字输出
		 * @param {*} withYear 是否输出年份，默认为否
		 * @param {*} withTime 是否输出时间信息
		 * @returns 已格式化的时间 / 日期 字符串（中文汉字形式）
		 */
		formatAsCn: (withYear: boolean = false, withTime?: boolean) => string;

		/** 将指定日期格式化为农历表示法
		 * @param {boolean} skipYear 是否省略年份信息
		 * @returns 已格式化的农历日期
		 */
		formatAsLunar: (skipYear: tmind.boolLike = true) => string;

		/** 获取实例日期的佛历表示法
		 * @returns 已格式化的佛历日期
		 */
		formatAsBh: () => string;

		/** 按照指定语言环境字符串标签格式化日期（语言环境字符串标签参考：Intl.DateTimeFormat 的 参数）
		 * @param {*} languageTag 语言环境字符串，默认为 加拿大法文格式：YYYY-MM-DD
		 * @returns 已格式化的字符串
		 */
		formatAsWorld: (languageTag: string | tmind.nullLike) => string;

		/** 获取实例日期的周信息
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的周（本周第几天，周一为1，周日为7），若传入参数不为空，则返回字符化的周信息。
		 */
		getWeek: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于本月第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的月内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfMonth: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期属于当年第几周
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的年内周次序号，起始为1，若传入参数不为空，则返回字符化的周信息。
		 */
		getWeekOfYear: (local?: 'zh' | 'en') => string | number;

		/** 获取实例日期的所在季度
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 若传入参数为空，则输出整型数字代表的季度序号，起始为1，若传入 zh ，则将数字中文字符化
		 */
		getQuarter: (local?: 'zh' | 'en') => string | number;

		/** 获取相对于实例日期，指定单位数量（天、周、月、年）之前或之后的日期值
		 *
		 * @param diffNum 与实例日期间相差的数量（默认单位为天），为正则返回日期在实例日期之后，反之则在实例日期之前
		 * @param diffType 相对于实例日期，相差数量的日期单位
		 */
		getOffset: (diffNum: number, diffType?: 'day' | 'week' | 'month' | 'year') => string;

		/** 比较两个日期数据，并返回相差数量，单位为（天、周、月、年、时、分、秒）
		 *
		 * @param start 要比较的基准日期
		 * @param end 要比较的目标日期
		 * @param outputType 返回值所使用的日期单位，默认为天
		 */
		getDiff: (dateVal: Date | string | number, outputType?: 'ms' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year') => number;

		/** 将实例日期的值转换为数字
		 *
		 * @param notTimestamp 是否弃用时间戳形式而改为用户序列值，默认为否。为真时，可以自定义数字来源中包含的日期时间片段
		 * @param fmt 自定义数字来源片段的格式化字符串，仅当 notTimestamp 为真时有效
		 * @returns
		 */
		toNumber: (notTimestamp: boolean = false, fmt?: string) => number;

		/** 获取实例日期的 JSON 对象表示
		 * @param local [可选]，代表返回数据采用的区域信息
		 * @returns 格式化后的 JSON 对象
		 */
		toJson: (local?: 'zh' | 'en') => tmind.IObj<number | boolean | string>;

		/** 将实例日期转换为值数组
		 * @param {*} includTime [可选]是否包含时间信息
		 * @returns 不传入参数时，默认返回数组内元素依次为 [年，月，日，时，分，秒，毫秒]
		 */
		toArr: (includTime?: boolean) => number[];
	}

	class Tuser extends tmind.IUserBase {
		/** 用户ID
		 */
		public id: number;
		/** 上级挂载对象ID
		 */
		public pid: number;
		/** 用户登录码
		 */
		public code: string;
		/** 非中文母语的用户名称
		 */
		public name: string;
		/** 用户中文名称
		 */
		public namezh: string;
		/** 用户昵称
		 */
		public nickName: string;
		/** 用户昵称
		 */
		public gender: number;
		/** 头像地址
		 */
		public avator: string;
		/** 赋权值
		 */
		public authStr: string;
	}

	class TVerifi {
		constructor(val: tmind.verifiAble, fullCheck?: boolean, ...rules: tmind.tVerifi.Irule[]);
		/** 获取当前实例校验结果
		 */
		get isOk(): boolean;

		/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
		 * @returns
		 */
		static getRules(): tmind.IObj<string>;

		isNum(opt: tmind.Irule): tmind.TVerifi;
	}

	function smpoo(): tmind.IsmpooInfo;

	function sortASC(a: string, b: string): number;
	function sortASC(a: number, b: number): number;
	function sortDESC(a: string, b: string): number;
	function sortDESC(a: number, b: number): number;

	function tCheckType(val: any): string;

	/** 控制台打印替代
	 *
	 * @param msg 要输出的信息
	 * @param title 标题
	 * @param type 输出样式类型
	 */
	function tEcho(msg: any, title?: string, type?: tmind.MSG_TYPE): void;
	/** 控制台清除替代
	 */
	function tClear(): void;

	/** 获取 Tdate 对象
	 *
	 */
	function tDate(): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param val 代表时间日期的字符串
	 */
	function tDate(val: string): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param val 代表时间日期的时间戳数字
	 */
	function tDate(val: number): Tdate;
	/** 获取 Tdate 对象
	 *
	 * @param y 年
	 * @param m 月
	 * @param d 日
	 * @param h 时
	 * @param mi 分
	 * @param s 秒
	 * @param ms 毫秒
	 */
	function tDate(y: number, m: number, d?: number | undefined, h?: number | undefined, mi?: number | undefined, s?: number | undefined, ms?: number | undefined): Tdate;

	namespace tPinyin {
		/** 依据传入中文数组的首字母分组
		 *
		 * @param arr 要进行分组的中文数组
		 * @param fullLetter 若为True，则即时某个字母标签下没有匹配的文字，也返回空数组
		 * @returns 按照26个英文字母分组的结果集
		 */
		function groupByFirstLetter(arr: string[], fullLetter: boolean): tmind.IObj<string[]>;

		/** 获取传入文字的首字母
		 * @param word 要获取首字母的字符串
		 * @returns
		 */
		function getFirstLetter(word: string): string;
	}

	namespace tVerifi {
		/** 校验参数
		 */
		interface Irule {
			/** 支持的校验模版
			 */
			patten: tmind.VERIFI_RULE,
			/** 正则断言为匹配时的值
			 *  默认为 TRUE，若设为 FALSE，设为断言匹配，但需拒绝
			 */
			trueVal?: boolean,
			/** 校验规则中要求的最小长度
			 */
			minLen?: number,
			/** 校验规则中允许的最大长度
			 */
			maxLen?: number,
			/** 进制类型判断的可选范围
			 */
			numType?: '2' | '8' | '10' | '16' | '26',
			/** 校验结论
			 */
			isOk?: boolean,
			/** 校验报告
			 */
			reason?: ''
		}
		/** 获取系统支持的校验规则及规则别名的键值对（键值对中的规则别名仅为中性描述，不包含任何允许或禁止意向）
		 */
		function getRules(): tmind.IObj<string>;
		/** 执行有效性校验
		 * @param val 要校验的值，支持校验的值类型为：（string | number | boolean | null | undefined）
		 * @param fullCheck 链式校验过程中，是否强制全链遍历
		 *  			若为 false，则任何一环校验失败，则立即终止校验
		 * @param rules 校验规则组
		 * @returns
		 */
		function check(val: tmind.verifiAble, fullCheck?: boolean, ...rules: tmind.tVerifi.Irule[]): boolean;
	}
}

export = tmind;
export { };
