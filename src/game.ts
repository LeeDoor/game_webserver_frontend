import * as Screen from "./canvas.js";
import {Viewport} from "./viewport.js";
import {Vector2} from "./vector2.js";
import {Controller} from "./controller.js";
import {Direction} from "./direction.js";
import {Field} from "./field.js";

export class Game {
    viewport: Viewport;
    field : Field;
    prevTime: number;
    readonly framerate = 30; // request animation frame is max 60
    readonly frameInterval : number;

    constructor(){
        this.prevTime = 0;
        this.field = new Field();
        this.frameInterval = 1000 / this.framerate;
    }
    public start(){
        this.prevTime = document.timeline.currentTime.valueOf() as number;
        this.viewport = new Viewport(Screen.canvas);
        this.captureControls();
        this.field.init();
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.viewport.clearScreen();
        this.field.draw(this.viewport);
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
        this.field.update(timestamp);
    };
    
    private captureControls() {
        new Controller().captureMovement((dir : Direction)=>{
            switch(dir) {
                case Direction.Up:
                    this.viewport.position.y -= 50;
                    break;
                case Direction.Right:
                    this.viewport.position.x += 50;
                    break;
                case Direction.Down:
                    this.viewport.shake();
                    break;
                case Direction.Left:
                    this.viewport.position.x -= 50;
                    break;
            }
        });
    }
}