/* eslint-disable no-unused-vars */
import { getFromat } from './date';

/** 信息类型枚举
 */
enum MSG_TYPE {
	INFO = 'INFO',
	SUCC = 'SUCC',
	WARN = 'WARN',
	ERR = 'ERR'
}

/** 控制台输出颜色
 */
const color: IObj<string[]> = {
	bold: ['\x1B[1m', '\x1B[22m'],
	blue: ['\x1B[34m', '\x1B[39m'],
	green: ['\x1B[32m', '\x1B[39m'],
	yellow: ['\x1B[33m', '\x1B[39m'],
	red: ['\x1B[31m', '\x1B[39m'],
	blueBG: ['\x1B[44m', '\x1B[49m'],
	greenBG: ['\x1B[42;30m', '\x1B[49m'],
	yellowBG: ['\x1B[43;30m', '\x1B[49m'],
	redBG: ['\x1B[41m', '\x1B[49m'],
	end: ['\x1B[0m']
};

/** 控制台输出信息类型的配色
 *
 */
const msgColor: IObj<string[]> = {
	INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1]],
	SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1]],
	WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1]],
	ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1]]
};

/** 控制台输出信息类型的方法映射
 */
const msgFunc: IObj<Function> = {
	INFO: console.log, // eslint-disable-line
	SUCC: console.log, // eslint-disable-line
	WARN: console.warn, // eslint-disable-line
	ERR: console.error // eslint-disable-line
};

/** 控制台彩色输出
 * @param msg 要输出的信息
 * @param title 强调输出信息的前缀头
 * @param type 输出信息类型
 */
const echo = (msg: string | Error, title?: string, type?: MSG_TYPE): void => {
	const currType = type || MSG_TYPE.INFO;
	const _func = msgFunc[currType] || console.log; // eslint-disable-line
	if (_func && typeof _func === 'function') {
		const [a, b, c, d, e] = msgColor[currType] || ['', '', '', '', ''];
		_func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
	}
};

/** 日志发生点
 */
enum LOG_END {
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
enum LOG_DIM {
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

interface ILog {
	// 日志发起者ID（可以是终端用户ID，或者用-1表示服务端自运行发起）
	senderID: any,
	// 日志详情
	detail: string | IObj<any> | Error,
	// 日志发生点
	logEnd: LOG_END,
	// 日志维度
	logDim: LOG_DIM,
	// 日志产生日期
	logAt: string | number,
	// 日志信息类型
	msgType: MSG_TYPE
}

/** 日志发生器
 *
 * @param senderID 日志发起者ID（可以是终端用户ID，或者用-1表示服务端自运行发起）
 * @param msg 日志信息（字符串或Error对象，或其他JSON对象）
 * @param lEnd 日志发生点
 * @param lDim 日志维度
 * @param msgType 日志信息类型
 * @returns ILog 类型对象
 */
const logger = (senderID: number, msg: string | Error, lEnd: LOG_END, lDim: LOG_DIM = LOG_DIM.runtime, msgType: MSG_TYPE): ILog => {
	if (senderID === -1 && lEnd !== LOG_END.BIZ_END && (lDim !== LOG_DIM.runtime && lDim !== LOG_DIM.ioSync)) {
		return {} as never;
	} else {
		let currMsg: string = '';
		if (msg instanceof Error) {
			currMsg = msg.toString();
		} else if (typeof msg === 'object') {
			currMsg = JSON.stringify(msg);
		} else {
			currMsg = `${msg}`;
		}

		return {
			senderID,
			// 日志详情
			detail: currMsg,
			// 日志发生点
			logEnd: lEnd,
			// 日志维度
			logDim: LOG_DIM.runtime,
			// 日志产生日期
			logAt: getFromat('yyyy-mm-dd hh:mi:ss.ms'),
			// 日志信息类型
			msgType
		};
	}
};

export default {
	MSG_TYPE,
	echo,
	LOG_END,
	LOG_DIM,
	logger
};
