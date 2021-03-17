/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 07:57:25
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self)["tmind-core"]=t()}(this,(function(){"use strict";const e=(e,t=2)=>`${e}`.padStart(t,"0"),t=function(t,n){const s=(t=>{const n=`${t.getFullYear()}`;return{yyyy:n,yy:e(n.slice(-2)),mm:e(t.getMonth()+1),dd:e(t.getDate()),hh:e(t.getHours()),mi:e(t.getMinutes()),ss:e(t.getSeconds()),ms:e(t.getMilliseconds(),3)}})(t);return(n||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(e=>Array.isArray(e)?"":s[e]||""))},n=e=>{if("Invalid Date"===e.toString())throw new Error("Get invalid param for fuction tdate. This parma can be null/undefind or datetime string, also can be number just < 8640000000000000");return new s(e)};class s{constructor(e){this.toCode=e=>t.call(this,this.val,"yyyymmddhhmissms"),this.format=e=>t.call(this,this.val,e||"yyyy-mm-dd"),this.val=e}}return{Tmind:class{constructor(){this.name="This is a class"}},tdate:function(e){switch(typeof e){case"string":case"number":return n(new Date(e));case"undefined":return new s(new Date);default:if(Array.isArray(e)){const[t,s,...i]=e;return n(new Date(t,s,...i))}return null===e?new s(new Date):n(new Date("invalid"))}}}}));
