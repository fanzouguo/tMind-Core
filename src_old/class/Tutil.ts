/* eslint-disable no-undef */
import global from '../@types/index'; // eslint-disable-line
import pinyin from '../package/pinyin';
import { sortASC, sortDESC } from '../package/tSort';
import { verifi, checkType } from '../package/tVerifi';

export class Tutil {
	static inBrowser: boolean = !!(globalThis.window); // eslint-disable-line
	// @ts-ignore
	static inSvr: boolean = !!(globalThis.process); // eslint-disable-line
	static NUM_TO_STR: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	static sort: IObj<any> = {
		sortASC: sortASC,
		sortDESC: sortDESC
	};
	static pinyin = pinyin;
	static verifi: (val: string | number, alias?: string, fullCheck?: boolean) => ItVerifi = verifi;
	static checkType = checkType;
	constructor() {

	}
}
