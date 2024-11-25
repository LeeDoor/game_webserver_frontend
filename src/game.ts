import * as Screen from "./canvas.js";
import {Viewport} from "./viewport.js";
import { EventCapturer } from "./event_capturer.js";
import {Direction} from "./types.js";
import {Grid} from "./grid.js";
import { AccountManager } from "./account_manager.js";
import { GameScreen, LoginScreen } from "./game_screen.js";

enum GameState {
    Login,
    Queue,
    Match
}

export class Game {
    grid : Grid;
    prevTime: number;
    account: AccountManager;
    state: GameState;
    screens: {[key in GameState]: GameScreen};
    readonly framerate = 60; // request animation frame is max 60
    readonly frameInterval : number;

    constructor(){
        this.prevTime = 0;
        this.frameInterval = 1000 / this.framerate;
        this.account = new AccountManager();
    }
    public start(){
        this.state = GameState.Login;
        this.screens = {
            [GameState.Login]: new LoginScreen(Screen.canvas),
            [GameState.Queue]: new LoginScreen(Screen.canvas),
            [GameState.Match]: new LoginScreen(Screen.canvas),
        };

        this.captureEvents();
        // this.account.connect();        
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.screens[this.state].clear();
        this.screens[this.state].draw();
    };
    private loop(timestamp : number){
        if (timestamp - this.prevTime > this.frameInterval){
            this.update(timestamp - this.prevTime);
            this.draw();
            this.prevTime = timestamp;
        }
        requestAnimationFrame((ts)=> this.loop(ts));
    };
    private update(timestamp : number){
        this.screens[this.state].update(timestamp);
    };
    
    private captureEvents() {
    }
}