import tmind from './types/index';

const _tUtil_ = (str: string): string => str;

const _tEcho_ = (msg: tmind.tMsg): void => {
	if (msg === 'info') console.log('info'); // eslint-disable-line
	else if (msg === 'warn') console.log('warn'); // eslint-disable-line
	else if (msg === 'err') console.log('err'); // eslint-disable-line
	else console.log('未定义'); // eslint-disable-line
};

const _tFunc_ = (val: string | number): string => `${val}`;
const _tTest = (str: string): void => { };

String.prototype.format = function(str: string) {
	return `${str}-fmt`;
};

// export default {
export const Tutil = _tUtil_;
export const Techo = _tEcho_;
export const Tfunc = _tFunc_;
export const Ttest = _tTest;
// };
