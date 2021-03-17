declare enum MSG_TYPE {
    INFO = "INFO",
    SUCC = "SUCC",
    WARN = "WARN",
    ERR = "ERR"
}
declare enum LOG_END {
    BIZ_END = "BIZ_END",
    COMPONET_END = "COMPONET_END",
    IO_END = "IO_END",
    LOGGER_END = "LOGGER_END",
    WEB_END = "WEB_END"
}
declare enum LOG_DIM {
    appro = "appro",
    authOpt = "authOpt",
    crosDomain = "crosDomain",
    dbRead = "dbRead",
    dbAdd = "dbAdd",
    dbEdit = "dbEdit",
    dbDel = "dbDel",
    ioRead = "ioRead",
    ioWrite = "ioWrite",
    ioSync = "ioSync",
    runtime = "runtime",
    security = "security",
    sign = "sign"
}
interface ILog {
    senderID: any;
    detail: string | IObj<any> | Error;
    logEnd: LOG_END;
    logDim: LOG_DIM;
    logAt: string | number;
    msgType: MSG_TYPE;
}
declare const _default: {
    MSG_TYPE: typeof MSG_TYPE;
    echo: (msg: string | Error, title?: string | undefined, type?: MSG_TYPE | undefined) => void;
    LOG_END: typeof LOG_END;
    LOG_DIM: typeof LOG_DIM;
    logger: (senderID: number, msg: string | Error, lEnd: LOG_END, lDim: LOG_DIM | undefined, msgType: MSG_TYPE) => ILog;
};
export default _default;
