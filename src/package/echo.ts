/* eslint-disable no-unused-vars */
import global from '../@types/index';

type MSG_TYPE = '' | 'INFO' | 'WARN' | 'ERR' | undefined | null;

// const originStr: string = '4S0ZOlOll0I06T77OlOll0I06TR1OlOll0I0666SOlOll0I08R6ROlOll0I04SR6OlOll0I06709OlOll0I09650OlOll0I0516XOlOll0I053R8';

// 日志信息枚举
// const enum MSG_TYPE {
//   INFO = 'INFO',
//   SUCC = 'SUCC',
//   WARN = 'WARN',
//   ERR = 'ERR'
// }

const color: IObj<string[]> = {
  black: ['\x1B[30m', '\x1B[39m'],
  white: ['\x1B[37m', '\x1B[39m'],
  bold: ['\x1B[1m', '\x1B[22m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  blueBG: ['\x1B[44m', '\x1B[49m'],
  blueBGLight: ['\x1B[104m', '\x1B[49m'],
  greenBG: ['\x1B[42;32m', '\x1B[49m'],
  greenBGLight: ['\x1B[102m', '\x1B[49m'],
  yellowBG: ['\x1B[43;30m', '\x1B[49m'],
  yellowBGLight: ['\x1B[103m', '\x1B[49m'],
  redBG: ['\x1B[41m', '\x1B[49m'],
  redBGLight: ['\x1B[105m', '\x1B[49m'],
  end: ['\x1B[0m']
};

// 终端控制台配色
const msgColor: IObj<string[]> = {
  INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1]],
  SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1]],
  WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1]],
  ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1]]
};

// 浏览器控制台配色
const msgColorBrowser: IObj<string[]> = {
  INFO: ['信息', color.blueBGLight[0], color.blueBGLight[1], color.black[0], color.black[1]],
  SUCC: ['成功', color.greenBGLight[0], color.greenBGLight[1], color.green[0], color.green[1]],
  WARN: ['警告', color.yellowBGLight[0], color.yellowBGLight[1], color.black[0], color.black[1]],
  ERR: ['错误', color.redBGLight[0], color.redBGLight[1], color.red[0], color.red[1]]
};

const msgFunc: IObj<unknown> = {
  INFO: console.log, // eslint-disable-line
  SUCC: console.log, // eslint-disable-line
  WARN: console.warn, // eslint-disable-line
  ERR: console.error, // eslint-disable-line
};

// export default (): void => {
// 	const _rigthSymbol: string = process.env.VUE_APP_RIGHT_SYMBOL || '';
// 	/** 定义版权欢迎信息数组 */
// 	const _arr: Array<string> = _rigthSymbol.split(',');
// 	// 打印版权欢迎信息
// 	console.log(_arr.join('\n')); // eslint-disable-line
// };

function echo(msg: string | Error, title?: string, type?: MSG_TYPE): void {
  const _currType = `${type}`.toUpperCase();
  const _func = type ? (msgFunc[_currType] || msgFunc['INFO']) : msgFunc['INFO'];
  if (typeof _func === 'function') {
    if (globalThis.window) { // eslint-disable-line
      const [a, b, c, d, e] = msgColorBrowser[_currType] || ['', '', '', '', ''];
      _func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
    } else {
      const [a, b, c, d, e] = msgColor[_currType] || ['', '', '', '', ''];
      _func(`${b} ${title || a} ${c} ${d} ${msg} ${e}`);
    }
  }
}

export default echo;
