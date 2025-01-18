import * as Screen from "./canvas.js";
import {Grid} from "./grid.js";
import * as Network from "./network_manager.js";
import {LoginScreen} from "./login_screen.js";
import { GameScreen,  FRAME_INTERVAL, GameState } from "./game_screen.js";
import { MainMenuScreen } from "./main_menu_screen.js";
import { Vector2 } from "./vector2.js";
import { QueueScreen } from "./queue_screen.js";

export class Game {
    prevTime: number;
    state: GameState;
    readonly screens: {[key in GameState]: GameScreen};

    constructor(){
        this.prevTime = 0;
        let redirectionFunc = (state: GameState) => {
            this.redirectScreen(state)
        };

        this.screens = {
            [GameState.Login]: new LoginScreen(redirectionFunc),
            [GameState.MainMenu]: new MainMenuScreen(redirectionFunc),
            [GameState.Queue]: new QueueScreen(redirectionFunc),
        };
    }
    public start(){
        for(const [_, value] of Object.entries(this.screens)) {
            value.init(Screen.canvas);
        }
        this.state = GameState.Login;
        this.captureMouseEvents(Screen.canvas);
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.screens[this.state].draw();
    };
    private loop(timestamp : number){
        if (timestamp - this.prevTime > FRAME_INTERVAL){
            this.update(timestamp - this.prevTime);
            this.draw();
            this.prevTime = timestamp;
        }
        requestAnimationFrame((ts)=> this.loop(ts));
    };
    private update(timestamp : number){
        this.screens[this.state].update(timestamp);
    };
    private redirectScreen(toState: GameState){
        this.state = toState;
        this.screens[this.state].init(Screen.canvas);
    }
    private captureMouseEvents(canvas: HTMLCanvasElement){
        canvas.addEventListener("mousedown", (e) => {this.onMouseEvent(e);});
    }
    private onMouseEvent(e: MouseEvent) { 
        this.screens[this.state].mouseEvent(new Vector2(e.offsetX, e.offsetY).multed(Screen.canvasQualityMultiplier));
    }
}