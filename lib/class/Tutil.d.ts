export declare class Tutil {
    static inBrowser: boolean;
    static inSvr: boolean;
    static NUM_TO_STR: string[];
    static sort: IObj<any>;
    static pinyin: {
        groupByFirstLetter: (arr: string[], fullLetter: boolean) => IObj<string[]>;
        getFirstLetter: (word: string) => string;
    };
    static verifi: (val: string | number, alias?: string, fullCheck?: boolean) => ItVerifi;
    static checkType: (val: any) => string;
    constructor();
}
