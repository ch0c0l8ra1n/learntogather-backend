import Controller from '../controller';
import GameRoom from '../gameroom';
import BaseApp from './baseapp';
import {asleep} from '../utils';
import { throws } from 'assert';

export default class MemoryGame extends BaseApp{
    static NAME:string = "MemoryGame";
    gameRoom: GameRoom;
    words: string[];
    seenWords: string[];
    word: string;
    appStage: string;
    score: number;

    constructor(gameRoom: GameRoom){
        super(MemoryGame.NAME);
        this.gameRoom = gameRoom;
        this.words = ["Abibliophobia","Absquatulate","Allegator","Anencephalous","Argle-bargle","Batrachomyomachy","Billingsgate","Bloviate","Blunderbuss","Borborygm","Boustrophedon","Bowyang","Brouhaha","Bumbershoot","Callipygian","Canoodle","Cantankerous","Catercornered","Cockalorum","Cockamamie","Codswallop","Collop","Collywobbles","Comeuppance","Crapulence","Crudivore","Discombobulate","Donnybrook","Doozy","Dudgeon","Ecdysiast","Eructation","Fard","Fartlek","Fatuous","Filibuster","Firkin","Flibbertigibbet","Flummox","Folderol","Formication","Fuddy-duddy","Furbelow","Furphy","Gaberlunzie","Gardyloo!","Gastromancy","Gazump","Gobbledygook","Gobemouche","Godwottery","Gongoozle","Gonzo","Goombah","Hemidemisemiquaver","Hobbledehoy","Hocus-pocus","Hoosegow","Hootenanny","Jackanapes","Kerfuffle","Klutz","La-di-da","Lagopodous","Lickety-split","Lickspittle","Logorrhea","Lollygag","Malarkey","Maverick","Mollycoddle","Mugwump","Mumpsimus","Namby-pamby","Nincompoop","Oocephalus","Ornery","Pandiculation","Panjandrum","Pettifogger","Pratfall","Quean","Rambunctious","Ranivorous","Rigmarole","Shenanigan","Sialoquent","Skedaddle","Skullduggery","Slangwhanger","Smellfungus","Snickersnee","Snollygoster","Snool","Tatterdemalion","Troglodyte","Turdiform","Unremacadamized","Vomitory","Wabbit","Widdershins"];
        this.word = "";
        this.appStage = "questioning";
        this.score = 0;
        this.seenWords = []
    }

    seen(controller: Controller){
        if (!this.seenWords.includes(this.word)){
            this.appStage = "lost";
        }
        else{
            this.word = this.words[Math.floor(Math.random() * this.words.length)];
            this.score += 1;
        }
    }

    unseen(controller: Controller){
        if (this.seenWords.includes(this.word)){
            this.appStage = "lost";
        }
        else{
            this.seenWords.push(this.word);
            this.word = this.words[Math.floor(Math.random() * this.words.length)];
            this.score += 1;
        }

        this.gameRoom.updateBigScreen();
    }

    async service(): Promise<void>{
        this.start();

        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.gameRoom.updateBigScreen();
    }

    handleEvent(event: string, data: any, controller: Controller){
        switch(event){
            case "seen":
                this.seen(controller);
                break;
            case "unseen":
                this.unseen(controller);
                break;
        }
    }

    getAppState(){
        return {
            word: this.word,
            seenWords: this.seenWords,
            score: this.score,
            appStage: this.appStage
        }
    }
}