const DEFAULT_FMTSTR = 'yyyy-mm-dd';
const __keepLen__ = (val, len = 2) => `${val}`.padStart(len, '0');
const __dateInit__ = (val) => (!val && new Date()) || (val instanceof Date && val) || new Date(`${val}`);
const __getPattern__ = (val) => {
    const _dt = __dateInit__(val);
    const _y = `${_dt.getFullYear()}`;
    return {
        yyyy: _y,
        yy: __keepLen__(_y.slice(-2)),
        mm: __keepLen__(_dt.getMonth() + 1),
        dd: __keepLen__(_dt.getDate()),
        hh: __keepLen__(_dt.getHours()),
        mi: __keepLen__(_dt.getMinutes()),
        ss: __keepLen__(_dt.getSeconds()),
        ms: __keepLen__(_dt.getMilliseconds(), 3)
    };
};
const __fmtVal__ = (dateVal, fmt) => {
    const _obj = __getPattern__(dateVal);
    return (fmt || DEFAULT_FMTSTR).replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g, (matched) => {
        if (!Array.isArray(matched)) {
            return _obj[matched] || '';
        }
        else {
            return '';
        }
    });
};
class TDate {
}
TDate.toCode = () => __fmtVal__(new Date(), 'yyyymmddhhmissms');
TDate.format = __fmtVal__;
export default TDate;
