/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-30 22:25:47
*/
String.prototype.format=function(o){return`${o}-fmt`};const o=o=>o,n=o=>{"info"===o?console.log("info"):"warn"===o?console.log("warn"):"err"===o?console.log("err"):console.log("未定义")},r=o=>`${o}`,t=o=>{};export{n as Techo,r as Tfunc,t as Ttest,o as Tutil};
