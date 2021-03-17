import { getFromat } from './date';
var MSG_TYPE;
(function (MSG_TYPE) {
    MSG_TYPE["INFO"] = "INFO";
    MSG_TYPE["SUCC"] = "SUCC";
    MSG_TYPE["WARN"] = "WARN";
    MSG_TYPE["ERR"] = "ERR";
})(MSG_TYPE || (MSG_TYPE = {}));
const color = {
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
const msgColor = {
    INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1]],
    SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1]],
    WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1]],
    ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1]]
};
const msgFunc = {
    INFO: console.log,
    SUCC: console.log,
    WARN: console.warn,
    ERR: console.error
};
const echo = (msg, title, type) => {
    const currType = type || MSG_TYPE.INFO;
    const _func = msgFunc[currType] || console.log;
    if (_func && typeof _func === 'function') {
        const [a, b, c, d, e] = msgColor[currType] || ['', '', '', '', ''];
        _func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
    }
};
var LOG_END;
(function (LOG_END) {
    LOG_END["BIZ_END"] = "BIZ_END";
    LOG_END["COMPONET_END"] = "COMPONET_END";
    LOG_END["IO_END"] = "IO_END";
    LOG_END["LOGGER_END"] = "LOGGER_END";
    LOG_END["WEB_END"] = "WEB_END";
})(LOG_END || (LOG_END = {}));
var LOG_DIM;
(function (LOG_DIM) {
    LOG_DIM["appro"] = "appro";
    LOG_DIM["authOpt"] = "authOpt";
    LOG_DIM["crosDomain"] = "crosDomain";
    LOG_DIM["dbRead"] = "dbRead";
    LOG_DIM["dbAdd"] = "dbAdd";
    LOG_DIM["dbEdit"] = "dbEdit";
    LOG_DIM["dbDel"] = "dbDel";
    LOG_DIM["ioRead"] = "ioRead";
    LOG_DIM["ioWrite"] = "ioWrite";
    LOG_DIM["ioSync"] = "ioSync";
    LOG_DIM["runtime"] = "runtime";
    LOG_DIM["security"] = "security";
    LOG_DIM["sign"] = "sign";
})(LOG_DIM || (LOG_DIM = {}));
const logger = (senderID, msg, lEnd, lDim = LOG_DIM.runtime, msgType) => {
    if (senderID === -1 && lEnd !== LOG_END.BIZ_END && (lDim !== LOG_DIM.runtime && lDim !== LOG_DIM.ioSync)) {
        return {};
    }
    else {
        let currMsg = '';
        if (msg instanceof Error) {
            currMsg = msg.toString();
        }
        else if (typeof msg === 'object') {
            currMsg = JSON.stringify(msg);
        }
        else {
            currMsg = `${msg}`;
        }
        return {
            senderID,
            detail: currMsg,
            logEnd: lEnd,
            logDim: LOG_DIM.runtime,
            logAt: getFromat('yyyy-mm-dd hh:mi:ss.ms'),
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
