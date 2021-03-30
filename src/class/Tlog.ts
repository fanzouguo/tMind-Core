import { LOG_END, LOG_DIM } from '../enum/index';
import { tdate } from '../package/tDate';

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
export const logger = (senderID: number, msg: string | Error, lEnd: LOG_END, lDim: LOG_DIM = LOG_DIM.runtime, msgType: MSG_TYPE = 'INFO'): ILog => {
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
			logAt: tdate().format('yyyy-mm-dd hh:mi:ss.ms'),
			// 日志信息类型
			msgType
		};
	}
};