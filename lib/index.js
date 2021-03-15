(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tmind {
        constructor() {
            this.#currtype = 3;
            this.name = '333';
            this.name = '222';
            const x = "ERR";
            console.log(x);
        }
        #currtype;
    }
    exports.default = Tmind;
});
