"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameroom_1 = __importDefault(require("./gameroom"));
var GameRoomManager = /** @class */ (function () {
    function GameRoomManager() {
        this.gameRooms = {};
    }
    GameRoomManager.prototype.createRoom = function (bigScreen) {
        var gameRoom = new gameroom_1.default(bigScreen);
        this.gameRooms[gameRoom.key] = gameRoom;
        return gameRoom;
    };
    GameRoomManager.prototype.getRoom = function (key) {
        if (key in this.gameRooms)
            return this.gameRooms[key];
        return null;
    };
    GameRoomManager.prototype.handleEvent = function (event) {
    };
    return GameRoomManager;
}());
exports.default = GameRoomManager;
//# sourceMappingURL=gameroommanager.js.map