import Controller from '../controller';
import GameRoom from '../gameroom';
import BaseApp from './baseapp';
import {asleep} from '../utils';



const questions = [
    {
        title: "What's your name?",
        options: [{
            text: "Rj",
            correct: true,
            selectedBy: []
        },
        {
            text: "Mohit",
            correct: false,
            selectedBy: []
        },
        {
            text: "Krishna",
            correct: false,
            selectedBy: []
        },
        {
            text: "Maharsh",
            correct: false,
            selectedBy: []
        }
        ]
    },
    {
        title: "What's your last name?",
        options: [{
            text: "Pj",
            correct: true,
            selectedBy: []
        },
        {
            text: "Kedia",
            correct: false,
            selectedBy: []
        },
        {
            text: "Dhakals",
            correct: false,
            selectedBy: []
        },
        {
            text: "Bhusalz",
            correct: false,
            selectedBy: []
        }
        ]
    },
    {
        title: "What's your pin code?",
        options: [{
            text: "1234",
            correct: true,
            selectedBy: []
        },
        {
            text: "0000",
            correct: false,
            selectedBy: []
        },
        {
            text: "2580",
            correct: false,
            selectedBy: []
        },
        {
            text: "8888",
            correct: false,
            selectedBy: []
        }
        ]
    },
    {
        title: "What's your address?",
        options: [{
            text: "Earth",
            correct: true,
            selectedBy: []
        },
        {
            text: "Moon",
            correct: false,
            selectedBy: []
        },
        {
            text: "Mars",
            correct: false,
            selectedBy: []
        },
        {
            text: "Neptune",
            correct: false,
            selectedBy: []
        }
        ]
    },
    {
        title: "What's your favourite color?",
        options: [{
            text: "Black",
            correct: true,
            selectedBy: []
        },
        {
            text: "White",
            correct: false,
            selectedBy: []
        },
        {
            text: "Burple",
            correct: false,
            selectedBy: []
        },
        {
            text: "Vanta black",
            correct: false,
            selectedBy: []
        }
        ]
    }
]

export default class Trivia extends BaseApp{
    static NAME:string = "Trivia";
    gameRoom: GameRoom;
    question: any;
    questions: any[];
    scores: any;
    appStage: string;

    constructor(gameRoom: GameRoom){
        super(Trivia.NAME);
        this.questions = JSON.parse(JSON.stringify(questions));
        this.question = null;
        this.gameRoom = gameRoom;
        this.scores = {};
        this.appStage = "questioning"
    }

    async service(): Promise<void>{
        this.start();

        for(const question of this.questions){
            this.question = question;
            this.gameRoom.updateBigScreen();
            await asleep(10*1000);
        }

        this.appStage = "finished";

        this.gameRoom.updateBigScreen();
    }

    select(option: string, controller: Controller){
        console.log("selecting!")
        const indices = {
            a:0,
            b:1,
            c:2,
            d:3,
            
            A:0,
            B:1,
            C:2,
            D:3
        }
        let index = indices[option] ? indices[option] : 0;
        const opt = this.question.options[index];

        opt.selectedBy.push(controller);
        return opt.correct
    }

    handleEvent(event: string, data:any, controller: Controller){
        console.log("Handling this")
        switch(event){
            case "select":
                const correct = this.select(data.option,controller);
                const delta = correct ? 1 : 0;
                if (controller.name in this.scores){
                    this.scores[controller.name] += delta;
                }
                else{
                    this.scores[controller.name] = delta;
                }
                break;
        }
    }

    getAppState(): any{
        return {
            question: this.question,
            scores:this.scores,
            appStage: this.appStage
        }
    }
}