/** 判断传入元素的类型
* @param val 要判断类型的元素
* @returns	代表类型的字符串
*/
export default function tCheckType (val: any): string {
	return `${(Object.prototype.toString.call(val)).replace(/\[object\s|\]/g, '').toLowerCase()}`;
}
