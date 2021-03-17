/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 04:18:01
*/
const e=(e,t=2)=>`${e}`.padStart(t,"0"),t=t=>{const s=(e=>!e&&new Date||e instanceof Date&&e||new Date(`${e}`))(t),y=`${s.getFullYear()}`;return{yyyy:y,yy:e(y.slice(-2)),mm:e(s.getMonth()+1),dd:e(s.getDate()),hh:e(s.getHours()),mi:e(s.getMinutes()),ss:e(s.getSeconds()),ms:e(s.getMilliseconds(),3)}},s=(e,s)=>{const y=t(e);return(s||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(e=>Array.isArray(e)?"":y[e]||""))};var y={toCode:()=>s(new Date,"yyyymmddhhmissms"),format:s},a={Tmind:class{constructor(){this.name="This is a class"}},Tdate:y};export default a;
