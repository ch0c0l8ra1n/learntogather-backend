import BaseApp from "./apps/baseapp";
import MainMenu from "./apps/mainmenu";
import Trivia from './apps/trivia';
import MemoryGame from './apps/memorygame';

import io from "./connections";

import Controller from './controller';

export default class GameRoom{
    bigScreen: string;
    key: string;
    currentApp: BaseApp;
    allApps: BaseApp[];
    mainMenuApp: MainMenu;
    controllers: Controller[];

    constructor(bigScreen: string, digitCount: number = 6){
        this.bigScreen = bigScreen;
        const digits: number[] = Array.from({length: digitCount},
            (): number => Math.floor(Math.random() * digitCount));
        this.key = digits.join("");
        this.controllers = [];
        
        this.mainMenuApp = new MainMenu(this);
        this.allApps = [new Trivia(this), new MemoryGame(this)];
        this.currentApp = this.mainMenuApp;
    }

    launch(appIndex):void{
        this.currentApp = this.allApps[appIndex];
        this.currentApp.service();
    }

    getController(socketId: string): Controller{
        for(const controller of this.controllers){
            if (controller.socketId == socketId) return controller;
        }
        return null;
    }

    hasControllers(){
        return this.controllers.length > 0;
    }

    hasMasterController(){
        for(const controller of this.controllers){
            if (controller.isMaster()) return true;
        }
        return false;
    }

    addController(controller: Controller): void{
        this.controllers.push(controller);
        if (!this.hasMasterController())
            controller.setMaster();
    }

    removeController(controller: Controller): void{
        this.controllers = this.controllers.filter( (cont: Controller) : boolean => cont.socketId != controller.socketId)
        if (this.hasControllers() && !this.hasMasterController())
            this.controllers[0].setMaster();
        
    }

    updateController(controller: Controller): void{
        for(const cont of this.controllers){
            if (cont.socketId == controller.socketId){
                cont.send("controllerUpdate",{
                    roomJoined: true,
                    ...this.getState()
                })
            }
        }
    }

    updateControllers(): void{
        for(const cont of this.controllers){
            cont.send("controllerUpdate",{
                roomJoined: true,
                ...this.getState()
            })
        }
    }

    sendToAll(event: string,data: any): void{
        io.to(this.key).emit(event,data);
    }

    sendToBigScreen(event: string, data: any): void{
        io.to(this.bigScreen).emit(event,data);
    }

    updateBigScreen():void {
        this.sendToBigScreen("bigScreenUpdate",this.getState());
    }

    getState(): any{
        return {
            key: this.key,
            controllers: this.controllers,
            appName: this.currentApp.name,
            appState: this.currentApp.getAppState()
        }
    }
}