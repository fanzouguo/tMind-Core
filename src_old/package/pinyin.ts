import global from '../@types/index'; // eslint-disable-line

const EN_LETTER: string[] = 'abcdefghjklmnopqrstwxyz'.split('');
const CH_LETTER: string[] = '阿八嚓哒妸发旮哈讥咔垃吗拏噢妑七呥扨它穵夕丫帀'.split('');

const pinyin = {
	/** 依据传入中文数组的首字母分组
	 *
	 * @param arr 要进行分组的中文数组
	 * @param fullLetter 若为True，则即时某个字母标签下没有匹配的文字，也返回空数组
	 * @returns 按照26个英文字母分组的结果集
	 */
	 groupByFirstLetter: (arr: string[], fullLetter: boolean): IObj<string[]> => {
		const res: IObj<string[]> = {};
		let i = 0;
		while (i < arr.length) {
			const va = arr[i];
			if (/^[a-zA-Z]/.test(va)) {
				const lt = va.charAt(0);
				if (!res[lt]) res[lt] = [];
				res[lt].push(va);
			} else {
				let k = 0;
				for (const v of EN_LETTER) {
					if ((CH_LETTER[k].localeCompare(va, 'zh') <= 0) && va.localeCompare(CH_LETTER[k + 1], 'zh') === -1) {
						if (!res[v]) {
							res[v] = [];
						}
						res[v].push(va);
						break;
					} else if (fullLetter && !res[v]) {
						res[v] = [];
					}
					k++;
				}
			}
			i++;
		}
		return res;
	},

	getFirstLetter: (word: string): string => {
		let k = 0;
		let currLetter = '';
		const str = word.charAt(0);
		for (const v of EN_LETTER) {
				if ((CH_LETTER[k].localeCompare(str, 'zh') <= 0) && str.localeCompare(CH_LETTER[k + 1], 'zh') === -1) {
					currLetter = v;
					break;
				}
			k++;
		}
		return currLetter;
	}
};

export default pinyin;
