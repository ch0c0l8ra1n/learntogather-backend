"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asleep = void 0;
function asleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.asleep = asleep;
//# sourceMappingURL=utils.js.map