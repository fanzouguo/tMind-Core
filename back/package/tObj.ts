import global from '../@types/index'; /* eslint-disable-line */
import { ETYPE } from '../enum/index';
import { checkType } from './tVerifi';

/** 此处不做复杂逻辑的深拷贝，仅利用JSON.stringify方法简单返回结果
 * 基于 tFrameV9框架的设计，仅对数据载荷的 JSON 对象进行深拷贝，该对象本身仅作为数据表示层。
 *
 * @param obj 要拷贝的原始对象
 * @returns 拷贝后的对象
 */
const deepClone = (obj: any): any => {
	const _type = checkType(obj);
	if (_type === ETYPE.object || _type === ETYPE.array) {
		return JSON.parse(JSON.stringify(obj));
	} else {
		return obj;
	}
};

export {
	deepClone
};
