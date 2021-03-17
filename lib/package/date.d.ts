interface ITdate {
    val: Date;
    toCode: (fmt: string) => string;
    format: (fmt: string) => string;
}
declare function tdate(): ITdate;
declare function tdate(val: string): ITdate;
declare function tdate(val: number): ITdate;
declare function tdate(val: number[]): ITdate;
declare function tdate(val: null): ITdate;
export default tdate;
