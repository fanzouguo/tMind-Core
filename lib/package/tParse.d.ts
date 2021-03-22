declare const tParse: {
    encode: {
        str2UniCode: (str: string) => number[];
        wechatAliase: () => string;
    };
    decode: {
        uniCode2Str: (val: string | number[], sep?: string) => string;
        wechatAliase: () => string;
    };
};
export default tParse;
