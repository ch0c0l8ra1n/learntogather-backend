"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseapp_1 = __importDefault(require("./baseapp"));
var utils_1 = require("../utils");
var questions = [
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
];
var Trivia = /** @class */ (function (_super) {
    __extends(Trivia, _super);
    function Trivia(gameRoom) {
        var _this = _super.call(this, Trivia.NAME) || this;
        _this.questions = JSON.parse(JSON.stringify(questions));
        _this.question = null;
        _this.gameRoom = gameRoom;
        _this.scores = {};
        _this.appStage = "questioning";
        return _this;
    }
    Trivia.prototype.service = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, question;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.start();
                        _i = 0, _a = this.questions;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        question = _a[_i];
                        this.question = question;
                        this.gameRoom.updateBigScreen();
                        return [4 /*yield*/, utils_1.asleep(10 * 1000)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.appStage = "finished";
                        this.gameRoom.updateBigScreen();
                        return [2 /*return*/];
                }
            });
        });
    };
    Trivia.prototype.select = function (option, controller) {
        console.log("selecting!");
        var indices = {
            a: 0,
            b: 1,
            c: 2,
            d: 3,
            A: 0,
            B: 1,
            C: 2,
            D: 3
        };
        var index = indices[option] ? indices[option] : 0;
        var opt = this.question.options[index];
        opt.selectedBy.push(controller);
        return opt.correct;
    };
    Trivia.prototype.handleEvent = function (event, data, controller) {
        console.log("Handling this");
        switch (event) {
            case "select":
                var correct = this.select(data.option, controller);
                var delta = correct ? 1 : 0;
                if (controller.name in this.scores) {
                    this.scores[controller.name] += delta;
                }
                else {
                    this.scores[controller.name] = delta;
                }
                break;
        }
    };
    Trivia.prototype.getAppState = function () {
        return {
            question: this.question,
            scores: this.scores,
            appStage: this.appStage
        };
    };
    Trivia.NAME = "Trivia";
    return Trivia;
}(baseapp_1.default));
exports.default = Trivia;
//# sourceMappingURL=trivia.js.map