import TDate from '../package/date';
const initExtend = function () {
    Date.prototype.formatA = function (fmt) {
        return TDate.format(this, fmt);
    };
};
class coreExtend {
}
coreExtend.init = initExtend;
export default coreExtend;
