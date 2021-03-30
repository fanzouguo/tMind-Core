import tmind from '../types/index';
import _checkType_ from '../package/tCheckType';

function testMoveUp(arr: tmind.IObj<any>[], fromIdx: number,  destIdx: number, itemCount: number, orderField: string): void {
	const [a, b] = [destIdx, fromIdx];
	const [c, d] = [fromIdx, fromIdx + itemCount];
	for (let i = a; i < b; i++) {
		const _obj = arr[i];
		_obj[orderField] = (+(_obj[orderField]) || i) + itemCount;
	}
	for (let i = c; i < d; i++) {
		const _obj = arr[i];
		_obj[orderField] = (+(_obj[orderField]) || i) - (fromIdx - destIdx);
	}
}

function testMoveDown(arr: tmind.IObj<any>[], fromIdx: number,  destIdx: number, itemCount: number, orderField: string): void {
	const [a, b] = [fromIdx, fromIdx + itemCount];
	const [c, d] = [fromIdx + itemCount, destIdx + itemCount];
	const step = destIdx - fromIdx;
	for (let i = a; i < b; i++) {
		const _obj = arr[i];
		_obj[orderField] = (_obj[orderField] || i) + step;
	}
	for (let i = c; i < d; i++) {
		const _obj = arr[i];
		const newIdx = (_obj[orderField] || i) - itemCount;
		_obj[orderField] = newIdx;
	}
}

/** 对传入的数组，在指定索引位置之后插入值，该方法默认会改变原始数组
 * @param arr 要插入的原始数组
 * @param destIndex 要插入的索引位置，起始值为：0
 * @param newItem 要插入的新元素
 * @returns 插入元素后的数组
 */
function arrInsert<T> (arr: T[], destIndex?: number, ...newItem: T[]): void {
	if (!destIndex) {
		arr.unshift(...newItem);
	} else if (destIndex === arr.length) {
		arr.push(...newItem);
	} else if (destIndex > 0) {
		const frag = arr.splice(0, destIndex);
		arr.unshift(...newItem);
		arr.unshift(...frag);
	}
}

/** 向前或向后移动传入数组中指定索引位置的元素，该方法会改变原始数组。
 *  该方法适用于数组内元素为基本类型或数组的情形
 * @param arr 要进行元素移动的原始数组
 * @param fromIdx 要移动的元素在数组中的原始索引（索引从0开始计数），
 * 								若要移动的元素在数组中系连续多个，则此处代表这些元素中的最小索引
 * @param	 destIdx 本次要移动到的目标位置索引
 * @param	 itemCount 本次要移动的元素数量（若数量 > 1，则这些元素在原始位置中必须连续存在）
 * @returns
 */
function arrMoveItem<T> (arr: T[], fromIdx: number,  destIdx: number, itemCount: number, orderField: string): void;
/** 该重载适用于数组内元素为 JSON对象的情形，处理过程会要求元素具有orderIdx字段。
 *  本重载不会改动数组内元素的排列顺序，仅对元素的 orderIdx 字段安装新的顺序重新赋值
 */
function arrMoveItem(arr: tmind.IObj<any>[], fromIdx: number,  destIdx: number, itemCount: number, orderField: string): void {
	const _tp = _checkType_(arr[0]);
	if (_tp === tmind.ETYPE.object) {
		if (fromIdx > destIdx) {
			testMoveUp(arr, fromIdx,  destIdx, itemCount, orderField);
		} else if (fromIdx < destIdx) {
			testMoveDown(arr, fromIdx,  destIdx, itemCount, orderField);
		}
	} else {
		const _arrOld = arr.splice(fromIdx, itemCount);
		if (fromIdx < destIdx) {
			arrInsert(arr, destIdx - itemCount, ..._arrOld);
		} else if (fromIdx > destIdx) {
			arrInsert(arr, destIdx, ..._arrOld);
		}
	}
}

export {
	arrInsert,
	arrMoveItem
};
