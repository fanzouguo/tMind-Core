/// <reference types="src/@types" />
import * as _tDate from './package/tDate';
import { bline, tEcho as _tEcho } from './package/tEcho';
import { Tutil as _Tutil } from './class/Tutil';
declare const _default: {
    Tutil: typeof _Tutil;
    tdate: typeof _tDate.tdate;
    tEcho: typeof _tEcho;
    tParse: {
        encode: import("./@types/tParse").Iencode;
        decode: import("./@types/tParse").Idecode;
        companyInfo: () => {
            compay: string;
            appCopy: string;
            website: string;
            consoleStr: typeof bline;
        };
    };
    smpoo: () => {
        compay: string;
        appCopy: string;
        website: string;
        consoleStr: typeof bline;
    };
};
export default _default;
