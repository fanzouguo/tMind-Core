import global from '../@types/index'; /* eslint-disable-line */
import { Tutil } from '../class/tutil';

type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;

const APP_RIGHT_SYMBOL = ['      ___           ___           ___           ___           ___     ', 		'     /\\  \\         /\\__\\         /\\  \\         /\\  \\         /\\  \\    ', 		'    /::\\  \\       /::|  |       /::\\  \\       /::\\  \\       /::\\  \\   ', 		'   /:/\\ \\  \\     /:|:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\  ', 		'  _\\:\\-\\ \\  \\   /:/|:|__|__   /::\\-\\:\\  \\   /:/  \\:\\  \\   /:/  \\:\\  \\ ', 		' /\\ \\:\\ \\ \\__\\ /:/ |::::\\__\\ /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/__/ \\:\\__\\ ', 		' \\:\\ \\:\\ \\/__/ \\/__/--/:/  / \\/__\\:\\/:/  / \\:\\  \\ /:/  / \\:\\  \\ /:/  / ', 		'  \\:\\ \\:\\__\\         /:/  /       \\::/  /   \\:\\  /:/  /   \\:\\  /:/  / ', 		'   \\:\\/:/  /        /:/  /         \\/__/     \\:\\/:/  /     \\:\\/:/  /  ', 		'    \\::/  /        /:/  /                     \\::/  /       \\::/  /   ', 		'     \\/__/         \\/__/                       \\/__/         \\/__/    ', 		'\n                       上海深普软件有限公司 - www.smpoo.com'];

const color: IObj<string[]> = {
  black: ['\x1B[30m', '\x1B[39m'],
  white: ['\x1B[37m', '\x1B[39m'],
  bold: ['\x1B[1m', '\x1B[22m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  // green: ['\x1B[32m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  blueBG: ['\x1B[44m', '\x1B[49m'],
  blueBGLight: ['\x1B[104m', '\x1B[49m'],
  greenBG: ['\x1B[42m', '\x1B[49m'],
  greenBGLight: ['\x1B[102m', '\x1B[49m'],
  yellowBG: ['\x1B[43;30m', '\x1B[49m'],
  yellowBGLight: ['\x1B[103m', '\x1B[49m'],
  redBG: ['\x1B[41m', '\x1B[49m'],
  redBGLight: ['\x1B[105m', '\x1B[49m'],
  end: ['\x1B[0m']
};

// 终端控制台配色
const msgColor: IObj<string[]> = {
  INFO: ['信息', color.blueBG[0], color.blueBG[1], color.blue[0], color.blue[1], color.end[0]],
  SUCC: ['成功', color.greenBG[0], color.greenBG[1], color.green[0], color.green[1], color.end[0]],
  WARN: ['警告', color.yellowBG[0], color.yellowBG[1], color.yellow[0], color.yellow[1], color.end[0]],
  ERR: ['错误', color.redBG[0], color.redBG[1], color.red[0], color.red[1], color.end[0]]
};

// 浏览器控制台配色
const msgColorBrowser: IObj<string[]> = {
  INFO: ['信息', color.blueBGLight[0], color.blueBGLight[1], color.black[0], color.black[1]],
  SUCC: ['成功', color.greenBGLight[0], color.greenBGLight[1], color.green[0], color.green[1]],
  WARN: ['警告', color.yellowBGLight[0], color.yellowBGLight[1], color.black[0], color.black[1]],
  ERR: ['错误', color.redBGLight[0], color.redBGLight[1], color.red[0], color.red[1]]
};

export function bline(): void {
  /* eslint-disable no-console */
  console.clear();
  console.log(APP_RIGHT_SYMBOL.join('\n'));
}

export function tEcho(msg: any, title?: string, type?: MSG_TYPE): void {
  const _currType = `${type}`.toUpperCase();
  const _func: any = (execer: any, str: string) => execer(str);
  const msgType = typeof msg;
  const [a, b, c, d, e] = Tutil.inBrowser ? (msgColorBrowser[_currType] || ['', '', '', '', '']) : (msgColor[_currType] || ['', '', '', '', '']);
  if (msgType === 'string') {
    const _currMsg = `${b} ${title || a} ${c} ${d} ${msg} ${e}`;
    /* eslint-disable no-console */
    const _execer = (type && (((type === 'ERR') && console.error) || ((type === 'WARN') && console.warn) || console.log)) || console.log;
    _func(_execer, _currMsg);
  } else if (msg instanceof Error) {
    _func(console.error, `${b} ${title || a} ${c} ${d} ${msg} ${e}`);
  } else if (msgType === 'object') {
    console.log(JSON.stringify(msg), null, 2);
  }
}
