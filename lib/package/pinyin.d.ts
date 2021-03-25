declare const pinyin: {
    groupByFirstLetter: (arr: string[], fullLetter: boolean) => IObj<string[]>;
    getFirstLetter: (word: string) => string;
};
export default pinyin;
