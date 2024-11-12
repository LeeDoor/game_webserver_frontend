import * as Screen from "./canvas.js";
import {Viewport} from "./viewport.js";
import {Vector2} from "./vector2.js";
import {Controller} from "./controller.js";
import {Direction} from "./direction.js";

export class Game {
    objects: HTMLImageElement[];
    viewport: Viewport;
    ticks: number;
    prevTime: number;

    constructor(){
        this.ticks = 0;
        this.objects = [];
        this.objects.push(new Image(600, 600));
        this.objects[0].src = "abobus.png";
        this.prevTime = 0;
    }
    public start(){
        this.prevTime = document.timeline.currentTime.valueOf() as number;
        this.viewport = new Viewport(Screen.canvas);
        this.captureControls();
        requestAnimationFrame(()=>this.loop(this.prevTime));
    };
    private draw(){
        this.viewport.clearScreen();
        for(let obj of this.objects){
            this.viewport.drawImage(obj, new Vector2(0, 0));
            this.viewport.drawImage(obj, new Vector2(500, 0));
            this.viewport.drawImage(obj, new Vector2(100, 600));
        }
    };
    private loop(timestamp : number){
        this.ticks += timestamp - this.prevTime;
        this.update(timestamp - this.prevTime);
        this.draw();
        this.prevTime = timestamp;

        requestAnimationFrame((ts)=> this.loop(ts));
    };
    private update(timestamp : number){
        this.viewport.update(timestamp);
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