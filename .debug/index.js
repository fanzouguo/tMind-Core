// const { Tmind, tdate, echo } = require('tmind-core');
const { Tmind, tdate, echo } = require('../lib/index');
// import * as Tmind from '../src/index';

const x = new Tmind();

console.clear();
// console.log(x.name);
// console.log(new Tmind());
// console.log(new Tmind());
// const x = new Tmind();
// x.echo('aaaa');
// console.log(new aaa.Tmind());
// console.log(MSG_TYPE);
console.log('Tmind');
console.log(x.name);
console.log(Tmind);
// echo('aaaaa', 'aaaa', 'INFO');
console.log(typeof echo);
console.log('typeof echo');
echo('aaaa', '测试', 'INFO');
echo('aaaa', '测试', 'WARN');
echo('aaaa', '测试', 'ERR');

const aaa = tdate(1616025793855).formatBh();
// console.log(echo);
// echo('aaaa');
// echo('测试信息', '测试', 'INFO');
// console.log(tdate);
// console.log(tdate.format(new Date(), 'yyyy-mm-dd@hh-mi-ss-ms'));
// console.log(tdate.toCode());
// new Date().format('yyyy-mm');
// echo('测试消息', '消息', MSG_TYPE.ERR);
// getEcho('aaa');
// aaa.echo();
// aaa.echo('aaa');
// const y = new?
// console.log(y);
// const k = new Date().format(new Date(), 'yyyy-mm-dd@hh-mi-ss-ms');
// console.log(k.format('yyyy'));
// console.log(globalThis.Date);

console.log('\n\n\n---------------------------------------------------------------------\n当前运行在 dev 模式下，执行的是 JS 脚本');
