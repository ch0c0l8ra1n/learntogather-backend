import BaseApp from './baseapp';
import GameRoom from '../gameroom';
import Controller from '../controller';


export default class MainMenu extends BaseApp{
    static NAME:string = "MainMenu";
    gameRoom: GameRoom;

    selectedAppIndex: number;
    constructor(gameRoom: GameRoom){
        const apps = [
            {
                name:"Trivia!",
            },{
                name:""
            }
        ];
        super(MainMenu.NAME);
        this.selectedAppIndex = 0;
        this.gameRoom = gameRoom;
    }

    navigate(dir){
        let delta = 0
        console.log(dir)
        switch(dir){
            case "left":
                delta = -1;
                break;
            case "right":
                delta = 1;
        }
        this.selectedAppIndex += delta;
        if (this.selectedAppIndex < 0){
            this.selectedAppIndex = 10 - this.selectedAppIndex;
        }
        this.selectedAppIndex = this.selectedAppIndex % 10;
    }

    handleEvent(event: string, data:any, controller: Controller){
        console.log(event,data,controller);
        switch(event){
            case "navigate":
            this.navigate(data.direction);
            break;
            case "launch":
            this.gameRoom.launch(this.selectedAppIndex);
            break;
        }
    }

    getAppState(): any{
        return {
            selectedAppIndex: this.selectedAppIndex
        }
    }
}