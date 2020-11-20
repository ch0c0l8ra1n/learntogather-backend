"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connections_1 = __importDefault(require("./connections"));
var Controller = /** @class */ (function () {
    function Controller(socketId, name, masterStatus) {
        if (masterStatus === void 0) { masterStatus = false; }
        this.socketId = socketId;
        this.name = name;
        this.masterStatus = masterStatus;
    }
    Controller.prototype.isMaster = function () {
        return this.masterStatus;
    };
    Controller.prototype.setMaster = function () {
        this.masterStatus = true;
    };
    Controller.prototype.revokeMaster = function () {
        this.masterStatus = false;
    };
    Controller.prototype.send = function (event, data) {
        connections_1.default.to(this.socketId).emit(event, data);
    };
    return Controller;
}());
exports.default = Controller;
//# sourceMappingURL=controller.js.map