/** 数组 sort 方法的升序回调函数
 *
 * @param a
 * @param b
 */
function sortASC(a: string, b: string): number;
function sortASC(a: number, b: number): number;
function sortASC(a: number | string, b: number | string): number {
	if (typeof a === 'string') {
		return a.localeCompare(`${b}`);
	} else if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	} else {
		return 0 as never;
	}
}

/** 数组 sort 方法的降序回调函数
 *
 * @param a
 * @param b
 */
function sortDESC(a: string, b: string): number;
function sortDESC(a: number, b: number): number;
function sortDESC(a: number | string, b: number | string): number {
	if (typeof a === 'string') {
		return `${b}`.localeCompare(a);
	} else if (typeof a === 'number' && typeof b === 'number') {
		return b - a;
	} else {
		return 0 as never;
	}
}

export {
	sortASC,
	sortDESC
};
