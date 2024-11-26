import * as Screen from "./canvas.js";
import {Grid} from "./grid.js";
import { AccountManager } from "./account_manager.js";
import {LoginScreen} from "./login_screen.js";
import { GameScreen,  FRAME_INTERVAL } from "./game_screen.js";
import { MainMenuScreen } from "./main_menu_screen.js";

enum GameState {
    Login,
    MainMenu,
    Queue,
    Match
}

export class Game {
    grid : Grid;
    prevTime: number;
    state: GameState;
    readonly account: AccountManager;
    readonly screens: {[key in GameState]: GameScreen};

    constructor(){
        this.prevTime = 0;
        this.account = new AccountManager();
        this.screens = {
            [GameState.Login]: new LoginScreen(),
            [GameState.MainMenu]: new MainMenuScreen(),
            [GameState.Queue]: new MainMenuScreen(),
            [GameState.Match]: new LoginScreen(),
        };
    }
    public start(){
        for(const [_, value] of Object.entries(this.screens)) {
            value.init(Screen.canvas);
        }
        this.state = GameState.MainMenu;
        this.captureEvents();
        // this.account.connect();    
            
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.screens[this.state].clear();
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
    
    private captureEvents() {
    }
}