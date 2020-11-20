import io from "./connections";

export default class Controller{
    socketId: string;
    masterStatus: boolean;
    name: string;

    constructor(socketId: string, name: string, masterStatus: boolean = false){
        this.socketId = socketId;
        this.name = name;
        this.masterStatus = masterStatus;
    }

    isMaster(){
        return this.masterStatus;
    }

    setMaster(){
        this.masterStatus = true;
    }

    revokeMaster(){
        this.masterStatus = false;
    }

    send(event:string,data:any):void{
        io.to(this.socketId).emit(event,data);
    }
}