/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-18 01:32:59
*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t="undefined"!=typeof globalThis?globalThis:t||self).Tmind=n()}(this,(function(){"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var n=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return"".concat(t).padStart(n,"0")},e=function(t){var e=function(t){return!t&&new Date||t instanceof Date&&t||new Date("".concat(t))}(t),i="".concat(e.getFullYear());return{yyyy:i,yy:n(i.slice(-2)),mm:n(e.getMonth()+1),dd:n(e.getDate()),hh:n(e.getHours()),mi:n(e.getMinutes()),ss:n(e.getSeconds()),ms:n(e.getMilliseconds(),3)}},i=function(t,n){var i=e(t);return(n||"yyyy-mm-dd").replace(/yyyy|yy|dd|hh|mi|ms|ss|mm/g,(function(t){return Array.isArray(t)?"":i[t]||""}))},o=function n(){t(this,n)};o.toCode=function(){return i(new Date,"yyyymmddhhmissms")},o.format=i;var r=function n(){t(this,n)};r.init=function(){Date.prototype.formatA=function(t){return o.format(this,t)}},r.init();return function n(){t(this,n),this.name="aa"}}));
