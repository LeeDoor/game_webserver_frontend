import { IObservable } from "./i_observable.js";
import { MoveType } from "./move_tips.js";

export type ButtonNotify = (mt: MoveType) => void;
class ScreenButton {
    id: string;
    type: MoveType;

    HTMLButton!: HTMLDivElement;

    constructor(id: string, type: MoveType) {
        this.id = id;
        this.type = type;
    }
    init(invoke: ButtonNotify) {
        let htmlb =document.getElementById(this.id); 
        if(htmlb == null){
            throw Error(`wrong HTML Button Id: ${this.id}`);
        }
        this.HTMLButton = htmlb as HTMLDivElement;
        this.HTMLButton.addEventListener("mousedown", () => invoke(this.type));
    }
}

export class ScreenButtonsManager extends IObservable<MoveType>{
    buttons: ScreenButton[]; 
    moveType: MoveType;
    constructor() {
        super();
        this.buttons = [];
        this.moveType = MoveType.Walk;
    }

    init() {
        this.buttons.push(new ScreenButton("walk_button", MoveType.Walk)); 
        this.buttons.push(new ScreenButton("gun_button", MoveType.Gun)); 
        this.buttons.push(new ScreenButton("bomb_button", MoveType.Bomb)); 
        this.buttons.push(new ScreenButton("resign_button", MoveType.Resign)); 
        for(let button of this.buttons) {
            button.init((mt: MoveType) => this.invoke(mt));
        }
    }
    invoke(moveType: MoveType) {
        if(this.moveType != moveType){
            this.moveType = moveType;
            this.notify(moveType);
        }
    }
}
