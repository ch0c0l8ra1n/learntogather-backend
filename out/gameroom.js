"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mainmenu_1 = __importDefault(require("./apps/mainmenu"));
var trivia_1 = __importDefault(require("./apps/trivia"));
var memorygame_1 = __importDefault(require("./apps/memorygame"));
var connections_1 = __importDefault(require("./connections"));
var GameRoom = /** @class */ (function () {
    function GameRoom(bigScreen, digitCount) {
        if (digitCount === void 0) { digitCount = 6; }
        this.bigScreen = bigScreen;
        var digits = Array.from({ length: digitCount }, function () { return Math.floor(Math.random() * digitCount); });
        this.key = digits.join("");
        this.controllers = [];
        this.mainMenuApp = new mainmenu_1.default(this);
        this.allApps = [new trivia_1.default(this), new memorygame_1.default(this)];
        this.currentApp = this.mainMenuApp;
    }
    GameRoom.prototype.launch = function (appIndex) {
        this.currentApp = this.allApps[appIndex];
        this.currentApp.service();
    };
    GameRoom.prototype.getController = function (socketId) {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            if (controller.socketId == socketId)
                return controller;
        }
        return null;
    };
    GameRoom.prototype.hasControllers = function () {
        return this.controllers.length > 0;
    };
    GameRoom.prototype.hasMasterController = function () {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            if (controller.isMaster())
                return true;
        }
        return false;
    };
    GameRoom.prototype.addController = function (controller) {
        this.controllers.push(controller);
        if (!this.hasMasterController())
            controller.setMaster();
    };
    GameRoom.prototype.removeController = function (controller) {
        this.controllers = this.controllers.filter(function (cont) { return cont.socketId != controller.socketId; });
        if (this.hasControllers() && !this.hasMasterController())
            this.controllers[0].setMaster();
    };
    GameRoom.prototype.updateController = function (controller) {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var cont = _a[_i];
            if (cont.socketId == controller.socketId) {
                cont.send("controllerUpdate", __assign({ roomJoined: true }, this.getState()));
            }
        }
    };
    GameRoom.prototype.updateControllers = function () {
        for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
            var cont = _a[_i];
            cont.send("controllerUpdate", __assign({ roomJoined: true }, this.getState()));
        }
    };
    GameRoom.prototype.sendToAll = function (event, data) {
        connections_1.default.to(this.key).emit(event, data);
    };
    GameRoom.prototype.sendToBigScreen = function (event, data) {
        connections_1.default.to(this.bigScreen).emit(event, data);
    };
    GameRoom.prototype.updateBigScreen = function () {
        this.sendToBigScreen("bigScreenUpdate", this.getState());
    };
    GameRoom.prototype.getState = function () {
        return {
            key: this.key,
            controllers: this.controllers,
            appName: this.currentApp.name,
            appState: this.currentApp.getAppState()
        };
    };
    return GameRoom;
}());
exports.default = GameRoom;
//# sourceMappingURL=gameroom.js.map