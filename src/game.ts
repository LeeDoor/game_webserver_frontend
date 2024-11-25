import * as Screen from "./canvas.js";
import {Viewport} from "./viewport.js";
import { EventCapturer } from "./event_capturer.js";
import {Direction} from "./types.js";
import {Grid} from "./grid.js";
import { AccountManager } from "./account_manager.js";

export class Game {
    viewport: Viewport;
    grid : Grid;
    prevTime: number;
    account: AccountManager;
    readonly framerate = 60; // request animation frame is max 60
    readonly frameInterval : number;

    constructor(){
        this.prevTime = 0;
        this.frameInterval = 1000 / this.framerate;
        this.account = new AccountManager();
    }
    public start(){
        this.viewport = new Viewport(Screen.canvas);
        this.grid = new Grid(this.viewport);
        this.captureEvents();
        this.account.connect();        
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.viewport.clearScreen();
        this.grid.draw(this.viewport);
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
        this.viewport.update(timestamp);
    };
    
    private captureEvents() {
        let cc = new EventCapturer();
        cc.captureMovement((dir : Direction)=>{
            switch(dir) {
                case Direction.Up:
                    this.viewport.scale += 0.1;
                    break;
                case Direction.Right:
                    this.viewport.position.x += 50;
                    break;
                case Direction.Down:
                    this.viewport.scale -= 0.1;
                    break;
                case Direction.Left:
                    this.viewport.position.x -= 50;
                    break;
            }
        });
        cc.captureResize(() => {
            this.grid.recalculate(this.viewport);
        });
    }
}