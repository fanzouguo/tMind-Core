/*!
* tMind-Cli v1.0.0
* (c) 2021-2022  Smpoo soft Co. Shanghai China
* Released under the MIT License.
* Author: David
* CreateDate: 2021-03-05
* LastBuild: 2021-03-30 22:33:13
*/
String.prototype.format=function(){return`${this}-fmt is a result from function.`},String.prototype.toGet=function(){return`${this}-Get.`};const o=o=>o,t=o=>{"info"===o?console.log("info"):"warn"===o?console.log("warn"):"err"===o?console.log("err"):console.log("未定义")},n=o=>`${o}`,r=o=>{};export{t as Techo,n as Tfunc,r as Ttest,o as Tutil};
