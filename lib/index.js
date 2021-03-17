/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 04:32:07
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Tmind=t()}(this,(function(){"use strict";const e=(e,t=2)=>`${e}`.padStart(t,"0"),t=t=>{const s=(e=>!e&&new Date||e instanceof Date&&e||new Date(`${e}`))(t),n=`${s.getFullYear()}`;return{yyyy:n,yy:e(n.slice(-2)),mm:e(s.getMonth()+1),dd:e(s.getDate()),hh:e(s.getHours()),mi:e(s.getMinutes()),ss:e(s.getSeconds()),ms:e(s.getMilliseconds(),3)}},s=(e,s)=>{const n=t(e);return(s||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(e=>Array.isArray(e)?"":n[e]||""))};var n={toCode:()=>s(new Date,"yyyymmddhhmissms"),format:s};return{Tmind:class{constructor(){this.name="This is a class"}},Tdate:n}}));
