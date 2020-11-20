"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connections_1 = __importStar(require("./connections"));
var gameroommanager_1 = __importDefault(require("./gameroommanager"));
var controller_1 = __importDefault(require("./controller"));
connections_1.app.set("port", process.env.PORT || 3000);
var gameRoomManager = new gameroommanager_1.default();
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
connections_1.default.on("connection", function (socket) {
    socket.on("createRoom", function (data) {
        var gameRoom = gameRoomManager.createRoom(socket.id);
        socket.join(gameRoom.key);
        gameRoom.updateBigScreen();
    });
    socket.on("joinRoom", function (data) {
        if (!("key" in data))
            return;
        if (!("name" in data))
            return;
        data.name = data.name ? data.name : "TEST_CONTROLLER";
        var gameRoom = gameRoomManager.getRoom(data.key);
        var controller = new controller_1.default(socket.id, data.name);
        gameRoom.addController(controller);
        gameRoom.updateBigScreen();
        gameRoom.updateController(controller);
    });
    socket.on("*", function (packet) {
        console.log(packet);
        var event = packet.data[0];
        var data = packet.data[1];
        if (!("key" in data))
            return;
        var gameRoom = gameRoomManager.getRoom(data.key);
        if (gameRoom == null)
            return;
        var controller = gameRoom.getController(socket.id);
        if (controller == null)
            return;
        switch (event) {
            case "openMainMenu":
                if (controller.isMaster()) {
                }
                break;
            default:
                gameRoom.currentApp.handleEvent(event, data, controller);
                break;
        }
        gameRoom.updateBigScreen();
        gameRoom.updateControllers();
    });
});
var server = connections_1.http.listen(5001, function () {
    console.log("listening on *:5001");
});
//# sourceMappingURL=index.js.map