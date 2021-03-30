/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-30 22:25:47
*/
!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).tmind={})}(this,(function(e){"use strict";String.prototype.format=function(e){return`${e}-fmt`};e.Techo=e=>{"info"===e?console.log("info"):"warn"===e?console.log("warn"):"err"===e?console.log("err"):console.log("未定义")},e.Tfunc=e=>`${e}`,e.Ttest=e=>{},e.Tutil=e=>e,Object.defineProperty(e,"__esModule",{value:!0})}));
