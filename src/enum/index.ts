/* eslint-disable no-unused-vars */
/** 类型字面量枚举
 */
const enum ETYPE {
	arguments = 'arguments',
	array = 'array',
	arraybuffer = 'arraybuffer',
	boolean = 'boolean',
	date = 'date',
	dataview = 'dataview',
	error = 'error',
	float32array = 'float32array',
	float64array = 'float64array',
	function = 'function',
	int16array = 'int16array',
	int32array = 'int32array',
	int8array = 'int8array',
	map = 'map',
	number = 'number',
	object = 'object',
	regexp = 'regexp',
	set = 'set',
	string = 'string',
	symbol = 'symbol',
	uint16array = 'uint16array',
	uint32array = 'uint32array',
	uint8array = 'uint8array',
	uint8clampedarray = 'uint8clampedarray',
	weakmap = 'weakmap',
	weakref = 'weakref',
	weakset = 'weakset'
}

/** 日志发生点
 */
const enum LOG_END {
	// 业务服务端
	BIZ_END = 'BIZ_END',
	// 组件端
	COMPONET_END = 'COMPONET_END',
	// 接口端
	IO_END = 'IO_END',
	// 日志记录器端
	LOGGER_END = 'LOGGER_END',
	// 用户界面端
	WEB_END = 'WEB_END'
}

/** 日志维度
 *
 */
 const enum LOG_DIM {
	// 审批操作
	appro = 'appro',
	// 授权操作
	authOpt = 'authOpt',
	// 跨域跳转
	crosDomain = 'crosDomain',
	// 数据库读
	dbRead = 'dbRead',
	// 数据库写
	dbAdd = 'dbAdd',
	// 数据库更新
	dbEdit = 'dbEdit',
	// 数据库删除
	dbDel = 'dbDel',
	// 接口读
	ioRead = 'ioRead',
	// 接口写
	ioWrite = 'ioWrite',
	// 接口同步
	ioSync = 'ioSync',
	// 运行时
	runtime = 'runtime',
	// 安全日志
	security = 'security',
	// 鉴权日志
	sign = 'sign'
}

export {
	ETYPE,
	LOG_END,
	LOG_DIM
};
