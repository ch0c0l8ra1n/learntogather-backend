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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseapp_1 = __importDefault(require("./baseapp"));
var MainMenu = /** @class */ (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu(gameRoom) {
        var _this = this;
        var apps = [
            {
                name: "Trivia!",
            }, {
                name: ""
            }
        ];
        _this = _super.call(this, MainMenu.NAME) || this;
        _this.selectedAppIndex = 0;
        _this.gameRoom = gameRoom;
        return _this;
    }
    MainMenu.prototype.navigate = function (dir) {
        var delta = 0;
        console.log(dir);
        switch (dir) {
            case "left":
                delta = -1;
                break;
            case "right":
                delta = 1;
        }
        this.selectedAppIndex += delta;
        if (this.selectedAppIndex < 0) {
            this.selectedAppIndex = 10 - this.selectedAppIndex;
        }
        this.selectedAppIndex = this.selectedAppIndex % 10;
    };
    MainMenu.prototype.handleEvent = function (event, data, controller) {
        console.log(event, data, controller);
        switch (event) {
            case "navigate":
                this.navigate(data.direction);
                break;
            case "launch":
                this.gameRoom.launch(this.selectedAppIndex);
                break;
        }
    };
    MainMenu.prototype.getAppState = function () {
        return {
            selectedAppIndex: this.selectedAppIndex
        };
    };
    MainMenu.NAME = "MainMenu";
    return MainMenu;
}(baseapp_1.default));
exports.default = MainMenu;
//# sourceMappingURL=mainmenu.js.map