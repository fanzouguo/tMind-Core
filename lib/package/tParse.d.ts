import { bline } from './tEcho';
declare const tParse: {
    encode: {
        str2UniCode: (str: string) => number[];
        wechatAliase: () => string;
    };
    decode: {
        uniCode2Str: (val: string | number[], sep?: string) => string;
        wechatAliase: () => string;
    };
    companyInfo: () => {
        compay: string;
        appCopy: string;
        website: string;
        consoleStr: typeof bline;
    };
};
export default tParse;
