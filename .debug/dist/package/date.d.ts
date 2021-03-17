declare class TDate {
    static toCode: () => string;
    static format: (dateVal?: dateLike, fmt?: string | undefined) => string;
}
export default TDate;
