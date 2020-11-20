import Controller from "../controller";

export default abstract class BaseApp{
    name : string;
    running: boolean
    constructor(name:string){
        this.name = name;
        this.running = false;
    }

    start():void{
        this.running = true;
    }

    async service(): Promise<void>{

    }

    stop():void{
        this.running = false;
    }

    isRunning():boolean{
        return this.running;
    }

    getName():string{
        return this.name;
    }
    abstract handleEvent(event: string, data: any,controller: Controller):void
    abstract getAppState(): any
}