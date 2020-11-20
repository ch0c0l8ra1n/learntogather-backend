import io, {app, http} from './connections';
import {Socket} from 'socket.io';

import GameRoomManager from './gameroommanager';
import GameRoom from './gameroom';
import Controller from './controller';

app.set("port", process.env.PORT || 3000);


const gameRoomManager: GameRoomManager = new GameRoomManager();



  // whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", (socket:Socket): void => {
  socket.on("createRoom",(data:any) :void => {
    const gameRoom: GameRoom = gameRoomManager.createRoom(socket.id);
    socket.join(gameRoom.key);
    gameRoom.updateBigScreen();
  })

  socket.on("joinRoom",(data: any): void => {
    if (!("key" in data)) return;
    if (!("name" in data)) return;

    data.name = data.name ? data.name : "TEST_CONTROLLER" ;

    const gameRoom: GameRoom = gameRoomManager.getRoom(data.key);
    const controller: Controller = new Controller(socket.id,data.name);
    gameRoom.addController(controller);
    gameRoom.updateBigScreen();
    gameRoom.updateController(controller);
  })

  socket.on("*",(packet:any) : void => {
    console.log(packet);
    const event: string  = packet.data[0];
    const data: any = packet.data[1];

    if (!("key" in data)) return;

    const gameRoom = gameRoomManager.getRoom(data.key);
    if (gameRoom == null) return;
    const controller = gameRoom.getController(socket.id);
    if (controller == null) return;

    switch (event){
      case "openMainMenu":
        if (controller.isMaster()){

        }
        break;
      default:
        gameRoom.currentApp.handleEvent(event,data,controller);
        break;
    }

    gameRoom.updateBigScreen();
    gameRoom.updateControllers();
  })

});
  
const server = http.listen(5001, function() {
  console.log("listening on *:5001");
});