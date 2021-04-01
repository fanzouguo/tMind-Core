/* eslint-disable no-console */
const { smpoo, TUtil } = require('../lib/index');

const echo = (...param) => {
	const [a, b, ...c] = param;
	const _tp = typeof b;
	if (_tp === 'function') {
		console.log(`${a}(${c.join(', ')}) output：${b.apply(b, c)}`);
	} else {
		console.log(`${a} = `, b);
	}
};

console.clear();
const _objSmpoo = smpoo();
console.log(_objSmpoo.consoleStr());
console.log(Object.keys(_objSmpoo));
echo('TUtil.inBrowser', TUtil.inBrowser);
echo('TUtil.NUM_TO_STR', TUtil.NUM_TO_STR);
echo('TUtil.encode.toUniCode', TUtil.encode.toUniCode, 'tFrameV9 平台');
// echo('TUtil.decode', TUtil.decode.toStr());

// /* eslint-disable */
// console.log(str1.encode.str2UniCode(str1));
// console.log(str2.encode.str2UniCode(str2));

// const x = tdate('2021-3-28');
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

// console.log(x);
// console.log(x.isLeap, 'isLeap');
// console.log(x.abs, 'abs');
// console.log(x.daysOfMonth, 'daysOfMonth');
// console.log(x.daysOfQuarter, 'daysOfQuarter');
// console.log(x.daysOfYear, 'daysOfYear');
// console.log(x.tiangan, 'tiangan');
// console.log(x.week, 'week');
// console.log(x.weekOfMonth, 'weekOfMonth');
// console.log(x.weekOfYear, 'weekOfYear');
// console.log(x.quarter, 'quarter');
// console.log(x.solar, 'solar');
// console.log(x.sign, 'sign');
// console.log(x.animal, 'animal');
// console.log(x.indexOfQuarter, 'indexOfQuarter');
// console.log(x.indexOfYear, 'indexOfYear');
// console.log(x.ratioOfWeek, 'ratioOfWeek');
// console.log(x.ratioOfMonth, 'ratioOfMonth');
// console.log(x.ratioOfQuarter, 'ratioOfQuarter');
// console.log(x.ratioOfYear, 'ratioOfYear');

// console.log(x.getWeekOfMonth(), 'weekOfMonth');
// console.log(x.getWeekOfYear(), 'weekOfYear');

// console.log(x.format('dd'));
// //  console.log(__str2u__(x1));
// //  console.log(__str2u__(x2));
// //  console.log(__str2u__(x3));


// // const testFunc = function (obj, def) {
// // 	def.forEach(v => {
// // 		const [a, ...b] = v;
// // 		try {
// // 			tEcho(`${a}(${b.join(',')})`, a, 'INFO');
// // 			console.log(obj[a].apply(obj, b));
// // 		} catch (err) {
// // 			console.error(err);
// // 		}
// // 	});
// // }

// // const _caseTDate = [
// // 	['getAnimal'],
// // 	['format', 'yyyy-dd-mm'],
// //   ['getAbs'],
// //   ['getWeek'],
// //   ['getWeekOfMonth'],
// //   ['getWeekOfYear'],
// //   ['getQuarter'],
// //   ['getDaysMonth'],
// //   ['getDaysYear'],
// //   ['isLeap'],
// //   ['getTiangan'],
// //   ['getSolar'],
// //   ['getSign'],
// //   ['getAnimal'],
// //   ['getOffset', '23', 'day'],
// //   ['getDiff', '2021-03-31'],
// //   ['getDiff', '2021-03-31', 'ms'],
// //   ['getDiff', '2021-03-31', 'second'],
// //   ['getDiff', '2021-03-31', 'minute'],
// //   ['getDiff', '2021-03-31', 'hour'],
// //   ['getDiff', '2021-03-31', 'day'],
// //   ['getDiff', '2021-03-31', 'week'],
// //   ['getDiff', '2021-03-31', 'month'],
// //   ['getDiff', '2021-03-31', 'year'],
// //   ['toNumber'],
// //   ['toNumber', true],
// //   ['toNumber', true, 'hh-mi'],
// //   ['toJson'],
// //   ['toArr'],
// //   ['format'],
// //   ['formatCn'],
// //   ['formatCn', true],
// //   ['formatCn', true, true],
// //   ['formatLunar'],
// //   ['formatBh'],
// //   ['formatWorld']
// // ];

// // const x = tDate('2021-10-01 10:03:30');
// // // testFunc(x, _caseTDate);
// // console.log('*************');


console.log('\n\n\n---------------------------------------------------------------------\n当前运行在 dev 模式下，执行的是 JS 脚本');
