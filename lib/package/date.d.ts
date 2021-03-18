interface ITdate {
    toCode: (fmt: string) => string;
    format: (fmt: string) => string;
    formatCn: () => string;
    formatLunar: (skipYear: boolLike) => string;
    formatBh: () => string;
    formatWorld: (languageTag: string | null | undefined) => string;
}
declare function tdate(): ITdate;
declare function tdate(val: string): ITdate;
declare function tdate(val: number): ITdate;
declare function tdate(val: number[]): ITdate;
declare function tdate(val: null): ITdate;
export default tdate;
