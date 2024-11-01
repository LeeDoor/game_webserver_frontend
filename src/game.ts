import * as Screen from "./canvas.js";
import {Viewport} from "./viewport.js";
import {Vector2} from "./vector2.js";
import {Controller} from "./controller.js";

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
        requestAnimationFrame(this.loop);
    };
    private draw(){
        this.viewport.clearScreen();
        for(let obj of this.objects){
            this.viewport.drawImage(obj, new Vector2(0, 0));
        }
    };
    private loop(timestamp : number){
        this.ticks += timestamp - this.prevTime;
        this.update(timestamp);
        this.draw();
        this.prevTime = timestamp;

        requestAnimationFrame(this.loop);
    };
    private update(timestamp : number){
        if(this.ticks > 1000) {
            this.viewport.position.x += 50;
            this.viewport.position.y += 50;
            this.ticks -= 1000;
        }
    };
    
    captureControls() {
        new Controller().captureMovement(()=>{console.log("aboba");});
    }
}