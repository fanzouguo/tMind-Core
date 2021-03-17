/// <refrence path="../@types/global.d.ts" />
/// <refrence path="../package/date.ts" />
import TDate from '../package/date';

const initExtend = function(): void {
	Date.prototype.formatA = function(fmt: string): string {
		return TDate.format(this, fmt);
	};
};

class coreExtend {
	static init = initExtend;
}

export default coreExtend;
