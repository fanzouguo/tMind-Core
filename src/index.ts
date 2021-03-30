import tmind from './types/index';

const _tUtil_ = (str: string): string => str;

const _tEcho_ = (msg: tmind.tMsg): void => {
	if (msg === 'info') console.log('info'); // eslint-disable-line
	else if (msg === 'warn') console.log('warn'); // eslint-disable-line
	else if (msg === 'err') console.log('err'); // eslint-disable-line
	else console.log('未定义'); // eslint-disable-line
};

const _tFunc_ = (val: string | number): string => `${val}`;
const _tTest = (str: string): void => {};

export default {
	Tutil: _tUtil_,
	Techo: _tEcho_,
	Tfunc: _tFunc_,
	Ttest: _tTest
};
