/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 08:25:11
*/
const t=(t,e=2)=>`${t}`.padStart(e,"0"),e=function(e,a){const r=(e=>{const a=`${e.getFullYear()}`;return{yyyy:a,yy:t(a.slice(-2)),mm:t(e.getMonth()+1),dd:t(e.getDate()),hh:t(e.getHours()),mi:t(e.getMinutes()),ss:t(e.getSeconds()),ms:t(e.getMilliseconds(),3)}})(e);return(a||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(t=>Array.isArray(t)?"":r[t]||""))},a=t=>{if("Invalid Date"===t.toString())throw new Error("Get invalid param for fuction tdate. This parma can be null/undefind or datetime string, also can be number just < 8640000000000000");return new r(t)};class r{constructor(t){this.toCode=t=>e.call(this,this.val,"yyyymmddhhmissms"),this.format=t=>e.call(this,this.val,t||"yyyy-mm-dd"),this.formatCn=()=>"",this.formatLunar=(t=!0)=>{const e=Intl.DateTimeFormat("zh-u-ca-chinese-nu-latn").format(this.val);return t?e.split("年")[1]||"":e},this.formatBh=()=>Intl.DateTimeFormat("zh-chinese-u-ca-buddhist").format(this.val).replace(/-/,"年").replace(/-/,"月"),this.formatWorld=t=>Intl.DateTimeFormat(t||"fr-ca").format(this.val),this.val=t}}var n={Tmind:class{constructor(){this.name="This is a class"}},tdate:function(t){switch(typeof t){case"string":case"number":return a(new Date(t));case"undefined":return new r(new Date);default:if(Array.isArray(t)){const[e,r,...n]=t;return a(new Date(e,r,...n))}return null===t?new r(new Date):a(new Date("invalid"))}}};export default n;
