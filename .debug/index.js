// const { Tmind, tDate, tEcho } = require('tmind-core');
// const { Tutil, tDate, tEcho, tVerifi } = require('../lib/index');
const { smpoo } = require('../lib/index');

console.clear();
const nnn = 234;
// console.log(`公司：${compay.join('-')}`);
// console.log(`版权：${appCopy.join('-')}`);
// console.log(`网址：${website.join('-')}`);


//  const __str2u__ = (str) => str.split('').map(v => v.charCodeAt(0));
// //  const __u2Str__ = (val, sep = '-') => String.fromCharCode(...(Array.isArray(val) ? val : val.split(sep).map(v => +v)));
//  let x1 = 'Copyright © 2015 - ';
//  let x2 = new Date().getFullYear();
//  let x3 = ' 深普 SMPOO.com 版权所有';

// console.log(x1.split('').map(v => v.charCodeAt(0)).join('-'));
// console.log(`${x2}`.split('').map(v => v.charCodeAt(0)).join('-'));
// console.log(x3.split('').map(v => v.charCodeAt(0)).join('-'));
console.log(smpoo);

//  console.log(__str2u__(x1));
//  console.log(__str2u__(x2));
//  console.log(__str2u__(x3));


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
