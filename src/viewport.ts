import {Vector2} from "./vector2.js";
import {Sprite} from "./sprite_manager.js";
import {Grid} from "./grid.js";

export enum ViewportState{
    Idle,
    Shake
}

export class Viewport {
    readonly shaketime = 1000; // const time for shaking animation
    animationtime = 0; // ticks for some animation. 0 means that animation stopped

    position: Vector2; // position of viewport on global field
    size: Vector2; // size of this viewport (canvas)
    readonly ctx: CanvasRenderingContext2D; // context to draw elements
    scale: number; // scaling
    shift: Vector2; // shift inside canvas. used for animations like shaking, avoiding moving the canvas itself
    state: ViewportState; // current animation of viewport

    constructor(canvas: HTMLCanvasElement, position: Vector2 = new Vector2(0, 0)) {
        this.position = position;
        this.size = new Vector2(canvas.width, canvas.height);
        this.ctx = canvas.getContext('2d');
        this.scale = 1;
        this.shift = new Vector2(0,0);
        this.state = ViewportState.Idle;
    }
    clearScreen(){
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    }
    update(timestamp : number) {
        this.animationtime -= timestamp;
        if(this.state == ViewportState.Shake){ 
            let maxShift = 200;
            // function defines the curve of shakeness
            let timeDep = (1 + this.shaketime/10 - this.animationtime/10);
            this.shift.x = (Math.random()-0.5) * 2 * maxShift / timeDep;
            this.shift.y = (Math.random()-0.5) * 2 * maxShift / timeDep;
        }

        if (this.animationtime < 0){
            this.state = ViewportState.Idle;
            this.animationtime = 0;
            this.shift = new Vector2(0,0);
        }
    }
    shake() {
        this.state = ViewportState.Shake;
        this.animationtime = this.shaketime;
    }
    private globalToLocalPos(position: Vector2) {
        return new Vector2(
            this.scale * (position.x - this.position.x + this.shift.x), 
            this.scale * (position.y - this.position.y + this.shift.y)
        );
    }

    drawImage(sprite: Sprite, position: Vector2, size?: Vector2) {
        let vpp = this.globalToLocalPos(position);
        this.ctx.drawImage(sprite.img, 
            vpp.x, vpp.y,
            (size ? size.x : sprite.img.width) * this.scale, 
            (size ? size.y : sprite.img.height) * this.scale
        );
    }

    drawText(text: string, position?: Vector2, size?: number, color?: string) {
        let vpp = position ? this.globalToLocalPos(position) : new Vector2(0);
        // this.ctx.fillStyle = color ?? "red";  
        // this.ctx.font = (size ?? 14) + "px serif";
        this.ctx.fillText(text, vpp.x, vpp.y, this.size.x);
    }
}   