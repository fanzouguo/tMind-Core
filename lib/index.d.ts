declare class Tmind {
    name: string;
    constructor();
}
declare const _default: {
    Tmind: typeof Tmind;
    Tdate: {
        toCode: () => string;
        format: (dateVal?: dateLike, fmt?: string | undefined) => string;
    };
};
export default _default;
