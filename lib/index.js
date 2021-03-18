/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 08:25:11
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self)["tmind-core"]=e()}(this,(function(){"use strict";const t=(t,e=2)=>`${t}`.padStart(e,"0"),e=function(e,n){const a=(e=>{const n=`${e.getFullYear()}`;return{yyyy:n,yy:t(n.slice(-2)),mm:t(e.getMonth()+1),dd:t(e.getDate()),hh:t(e.getHours()),mi:t(e.getMinutes()),ss:t(e.getSeconds()),ms:t(e.getMilliseconds(),3)}})(e);return(n||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(t=>Array.isArray(t)?"":a[t]||""))},n=t=>{if("Invalid Date"===t.toString())throw new Error("Get invalid param for fuction tdate. This parma can be null/undefind or datetime string, also can be number just < 8640000000000000");return new a(t)};class a{constructor(t){this.toCode=t=>e.call(this,this.val,"yyyymmddhhmissms"),this.format=t=>e.call(this,this.val,t||"yyyy-mm-dd"),this.formatCn=()=>"",this.formatLunar=(t=!0)=>{const e=Intl.DateTimeFormat("zh-u-ca-chinese-nu-latn").format(this.val);return t?e.split("年")[1]||"":e},this.formatBh=()=>Intl.DateTimeFormat("zh-chinese-u-ca-buddhist").format(this.val).replace(/-/,"年").replace(/-/,"月"),this.formatWorld=t=>Intl.DateTimeFormat(t||"fr-ca").format(this.val),this.val=t}}return{Tmind:class{constructor(){this.name="This is a class"}},tdate:function(t){switch(typeof t){case"string":case"number":return n(new Date(t));case"undefined":return new a(new Date);default:if(Array.isArray(t)){const[e,a,...s]=t;return n(new Date(e,a,...s))}return null===t?new a(new Date):n(new Date("invalid"))}}}}));
