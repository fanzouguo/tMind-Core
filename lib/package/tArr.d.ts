declare function arrInsert<T>(arr: T[], destIndex?: number, ...newItem: T[]): void;
declare function arrMoveItem<T>(arr: T[], fromIdx: number, destIdx: number, itemCount: number, orderField: string): void;
export { arrInsert, arrMoveItem };
