import { Iencode, Idecode } from '../@types/tParse';
import { bline } from './tEcho';
declare const tParse: {
    encode: Iencode;
    decode: Idecode;
    companyInfo: () => {
        compay: string;
        appCopy: string;
        website: string;
        consoleStr: typeof bline;
    };
};
export default tParse;
