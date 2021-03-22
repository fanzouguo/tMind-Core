// const { Tmind, tDate, tEcho } = require('tmind-core');
// const { Tutil, tDate, tEcho, tVerifi } = require('../lib/index');
const tMind = require('../lib/index');

console.clear();
console.log(tMind);
let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// x.insertTo(999, 1);
console.log(x.join('--'));
x.insertTo(4, 999, 88, 77);
console.log(x);
let y = [1, 2, 3, 4, 5];
// const z = y.splice(0, 3);
// y.unshift(99, 88, 77);
// y.unshift(...z);
// console.log(y);
const func = (arr, destIndex, ...item) => {
	console.log(arr);
	const k = arr.splice(0, destIndex - 1);
	arr.unshift(...item);
	arr.unshift(...k);
	console.log(arr);
}

const currArr = [{
	name: '0',
	orderIdx: 0
}, {
	name: '1',
	orderIdx: 1
}, {
	name: '2',
	orderIdx: 2
}, {
	name: '3',
	orderIdx: 3
}, {
	name: '4',
	orderIdx: 4
}, {
	name: '5',
	orderIdx: 5
}, {
	name: '6',
	orderIdx: 6
}];

currArr.moveTo(1, 4, 2);
console.log(currArr.sort((a, b) => a.orderIdx - b.orderIdx));

// const currArr2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(currArr2);
// currArr2.moveTo(7, 3, 2);
// console.log('=======================');
// console.log(currArr2);

const testMoveUp = (arr, fromIdx,  destIdx, itemCount, orderField) => {
	const step = fromIdx - destIdx;
	const [a, b] = [destIdx, fromIdx];
	const [c, d] = [fromIdx, fromIdx + itemCount];
	for (let i = a; i < b; i++) {
		const _obj = arr[i];
		_obj[orderField] = (_obj[orderField] || i) + itemCount;
	}
	for (let i = c; i < d; i++) {
		const _obj = arr[i];
		_obj[orderField] = (_obj[orderField] || i) - (fromIdx - destIdx);
	}
}


const testMoveDown = (arr, fromIdx,  destIdx, itemCount, orderField) => {
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

const move = (arr, fromIdx,  destIdx, itemCount, orderField = 'orderIdx') => {
	if (fromIdx > destIdx) {
		testMoveUp(arr, fromIdx,  destIdx, itemCount, orderField);
	} else if (fromIdx < destIdx) {
		testMoveDown(arr, fromIdx,  destIdx, itemCount, orderField);
	}
}

// console.log(currArr.sort((a, b) => a.orderIdx - b.orderIdx));
// // testMoveUp(currArr, 4, 1, 2);
// // testMoveDown(currArr, 1, 4, 2);
// // move(currArr, 1, 4, 2);
// move(currArr, 4, 1, 2);
// console.log(currArr.sort((a, b) => a.orderIdx - b.orderIdx));

// func(y, 3, 99, 88, 77);
// console.log(tmind.tEcho('aaaa', 'aaaa', 'ERR'));
// console.log(tVerifi.isNum(333, {
// 	numType: '10'
// }));

// if (Tmind.inBrowser) console.log('在浏览器');

// if (Tmind.inSvr) console.log('在服务端');
// const strX = '北纬30度'.wxAliaseEncode();
// const strY = strX.wxAliaseDecode();
// console.log(strX);
// console.log(strY);
// const yyy = 3456789.136;
// console.log(yyy.toPrice());
// // console.log(Intl.NumberFormat('cmn-Hans-CN', {
// // 	style: 'decimal'
// // }).format(yyy));
// let rmb = 2380000434.338922;
// let nu = 2.55;
// console.log(rmb.toSplit(4));
// console.log(rmb.toArr());
// console.log(rmb.toPrice());
// console.log(rmb.toCNY());
// console.log(nu.toRound(1));
// console.log('------------------bb');
// console.log(new Intl.NumberFormat('zh-CN').format(987654321));
// console.log(Intl.NumberFormat('zh-Hans-CN-u-nu', {
// 	style: 'decimal',
// 	maximumSignificantDigits: 4
// }).format(rmb));
// console.log(Intl.NumberFormat('cmn-Hans-CN', {
// 	maximumFractionDigits: 2,
// 	useGrouping: true
// }).format(2333442245333.338922))
// console.log('------------------aa');

// console.log(Tmind.pinyin.groupByFirstLetter);
// const _arrStr = ['可以', '留住', '这', '我的', 'see', 'li类', '刘备', '长江', '', '张飞', '浏阳河', '武汉', 'say it', '安全', '啊啊'];
// console.log(Tmind.pinyin.groupByFirstLetter(['可以', '留住', '这', '我的', 'see', 'li类', '刘备', '长江', '', '张飞', '浏阳河', '武汉', 'say it', '安全', '啊啊']));
// _arrStr.forEach(v => console.log(v, '：', Tmind.pinyin.getFirstLetter(v).toUpperCase()));
// const abc = [9, 3, 5, 2, 4, 8, 6];
// console.log(abc.sort(Tmind.sort.sortASC));


// const testFunc = function (obj, def) {
// 	def.forEach(v => {
// 		const [a, ...b] = v;
// 		try {
// 			tEcho(`${a}(${b.join(',')})`, a, 'INFO');
// 			console.log(obj[a].apply(obj, b));
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	});
// }

// const _caseTDate = [
// 	['getAnimal'],
// 	['format', 'yyyy-dd-mm'],
//   ['getAbs'],
//   ['getWeek'],
//   ['getWeekOfMonth'],
//   ['getWeekOfYear'],
//   ['getQuarter'],
//   ['getDaysMonth'],
//   ['getDaysYear'],
//   ['isLeap'],
//   ['getTiangan'],
//   ['getSolar'],
//   ['getSign'],
//   ['getAnimal'],
//   ['getOffset', '23', 'day'],
//   ['getDiff', '2021-03-31'],
//   ['getDiff', '2021-03-31', 'ms'],
//   ['getDiff', '2021-03-31', 'second'],
//   ['getDiff', '2021-03-31', 'minute'],
//   ['getDiff', '2021-03-31', 'hour'],
//   ['getDiff', '2021-03-31', 'day'],
//   ['getDiff', '2021-03-31', 'week'],
//   ['getDiff', '2021-03-31', 'month'],
//   ['getDiff', '2021-03-31', 'year'],
//   ['toNumber'],
//   ['toNumber', true],
//   ['toNumber', true, 'hh-mi'],
//   ['toJson'],
//   ['toArr'],
//   ['format'],
//   ['formatCn'],
//   ['formatCn', true],
//   ['formatCn', true, true],
//   ['formatLunar'],
//   ['formatBh'],
//   ['formatWorld']
// ];

// const x = tDate('2021-10-01 10:03:30');
// // testFunc(x, _caseTDate);
// console.log('*************');


// console.log('\n\n\n---------------------------------------------------------------------\n当前运行在 dev 模式下，执行的是 JS 脚本');


// const APP_RIGHT_SYMBOL = ['      ___           ___           ___           ___           ___     ', 		'     /\\  \\         /\\__\\         /\\  \\         /\\  \\         /\\  \\    ', 		'    /::\\  \\       /::|  |       /::\\  \\       /::\\  \\       /::\\  \\   ', 		'   /:/\\ \\  \\     /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  ', 		'  _\\:\\-\\ \\  \\   /:/|:|__|__   /::\\-\\:\\  \\   /:/  \\:\\  \\   /:/  \\:\\  \\ ', 		' /\\ \\:\\ \\ \\__\\ /:/ |::::\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/__/ \\:\\__\\ ', 		' \\:\\ \\:\\ \\/__/ \\/__/--/:/  / \\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  / ', 		'  \\:\\ \\:\\__\\         /:/  /       \\::/  /   \\:\\  /:/  /   \\:\\  /:/  / ', 		'   \\:\\/:/  /        /:/  /         \\/__/     \\:\\/:/  /     \\:\\/:/  /  ', 		'    \\::/  /        /:/  /                     \\::/  /       \\::/  /   ', 		'     \\/__/         \\/__/                       \\/__/         \\/__/    ', 		'\n                       上海深普软件有限公司 - www.smpoo.com'];

// console.log(APP_RIGHT_SYMBOL.join('\n'));
