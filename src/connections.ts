import IOServer ,{Socket} from 'socket.io';
import wildcardMiddleware from 'socketio-wildcard';
import express from 'express';

export const app = express();

export var http = require("http").Server(app);

const io = IOServer(http);
io.use(wildcardMiddleware());


export default io;
