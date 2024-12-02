import * as Screen from "./canvas.js";
import {Grid} from "./grid.js";
import { AccountManager } from "./account_manager.js";
import {LoginScreen} from "./login_screen.js";
import { GameScreen,  FRAME_INTERVAL, GameState } from "./game_screen.js";
import { MainMenuScreen } from "./main_menu_screen.js";

export const account: AccountManager = new AccountManager();

export class Game {
    prevTime: number;
    state: GameState;
    readonly screens: {[key in GameState]: GameScreen};

    constructor(){
        this.prevTime = 0;
        this.screens = {
            [GameState.Login]: new LoginScreen((state: GameState) => {
                this.redirectScreen(state)
            }),
            [GameState.MainMenu]: new MainMenuScreen((state: GameState) => {
                this.redirectScreen(state)
            }),
        };
    }
    public start(){
        for(const [_, value] of Object.entries(this.screens)) {
            value.init(Screen.canvas);
        }
        this.state = GameState.Login;
        this.captureEvents();  
            
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
    private redirectScreen(toState: GameState){
        this.state = toState;
    }
}