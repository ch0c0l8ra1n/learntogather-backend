import GameRoom from './gameroom';

export default class GameRoomManager{
    gameRooms: any;

    constructor(){
        this.gameRooms = {};
    }

    createRoom(bigScreen: string): GameRoom{
        const gameRoom = new GameRoom(bigScreen);
        this.gameRooms[gameRoom.key] = gameRoom;
        return gameRoom;
    }

    getRoom(key: string): GameRoom{
        if (key in this.gameRooms) return this.gameRooms[key];
        return null;
    }

    handleEvent(event): void{

    }
}