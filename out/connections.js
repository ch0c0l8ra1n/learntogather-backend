"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.app = void 0;
var socket_io_1 = __importDefault(require("socket.io"));
var socketio_wildcard_1 = __importDefault(require("socketio-wildcard"));
var express_1 = __importDefault(require("express"));
exports.app = express_1.default();
exports.http = require("http").Server(exports.app);
var io = socket_io_1.default(exports.http);
io.use(socketio_wildcard_1.default());
exports.default = io;
//# sourceMappingURL=connections.js.map