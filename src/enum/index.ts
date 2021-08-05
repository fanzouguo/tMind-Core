/* eslint-disable no-unused-vars */
/** JS类型字面量枚举
 */
export enum ETYPE {
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

/** 异常类型枚举
 */
export enum ERR_TYPE {
	/** 服务端启动异常
	 */
	bootErr = 10000,
	/** 服务端 Licese 异常
	 */
	licenseErr = 10001,
	/** 服务端 SSL 文件异常
	 */
	certErr = 10002,
	/** 服务端配置异常
	 */
	configErr = 10003,
	/** 服务端HTTP请求异常
	 */
	svrHttpRequestErr = 10004
}