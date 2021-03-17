/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 07:57:25
*/
const t=(t,e=2)=>`${t}`.padStart(e,"0"),e=function(e,n){const s=(e=>{const n=`${e.getFullYear()}`;return{yyyy:n,yy:t(n.slice(-2)),mm:t(e.getMonth()+1),dd:t(e.getDate()),hh:t(e.getHours()),mi:t(e.getMinutes()),ss:t(e.getSeconds()),ms:t(e.getMilliseconds(),3)}})(e);return(n||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(t=>Array.isArray(t)?"":s[t]||""))},n=t=>{if("Invalid Date"===t.toString())throw new Error("Get invalid param for fuction tdate. This parma can be null/undefind or datetime string, also can be number just < 8640000000000000");return new s(t)};class s{constructor(t){this.toCode=t=>e.call(this,this.val,"yyyymmddhhmissms"),this.format=t=>e.call(this,this.val,t||"yyyy-mm-dd"),this.val=t}}var r={Tmind:class{constructor(){this.name="This is a class"}},tdate:function(t){switch(typeof t){case"string":case"number":return n(new Date(t));case"undefined":return new s(new Date);default:if(Array.isArray(t)){const[e,s,...r]=t;return n(new Date(e,s,...r))}return null===t?new s(new Date):n(new Date("invalid"))}}};export default r;
