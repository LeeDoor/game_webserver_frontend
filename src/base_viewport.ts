import { Vector2 } from "./vector2.js";
import { Sprite } from "./sprite_manager.js";

export enum ViewportState {
    Idle,
    Shake
}

export abstract class BaseViewport {
    readonly shaketime = 1000; // const time for shaking animation
    animationtime = 0; // ticks for some animation. 0 means that animation stopped
    size: Vector2; // size of this viewport (canvas)
    readonly ctx: CanvasRenderingContext2D; // context to draw elements
    shift: Vector2; // shift inside canvas. used for animations like shaking, avoiding moving the canvas itself
    state: ViewportState; // current animation of viewport

    constructor(canvas: HTMLCanvasElement) {
        this.size = new Vector2(0);
        this.recalculate(canvas);
        this.ctx = canvas.getContext('2d')!;
        this.shift = new Vector2(0, 0);
        this.state = ViewportState.Idle;
    }

    getFontString(fontSize: number) {
        return fontSize + "px Kirang Haerang";
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    }
    recalculate(canvas: HTMLCanvasElement) {
        this.size = new Vector2(canvas.width, canvas.height);
    }
    update(timestamp: number) {
        this.animationtime -= timestamp;
        if (this.state == ViewportState.Shake) {
            let maxShift = 200;
            // function defines the curve of shakeness
            let timeDep = (1 + this.shaketime / 10 - this.animationtime / 10);
            this.shift.x = (Math.random() - 0.5) * 2 * maxShift / timeDep;
            this.shift.y = (Math.random() - 0.5) * 2 * maxShift / timeDep;
        }

        if (this.animationtime < 0) {
            this.state = ViewportState.Idle;
            this.animationtime = 0;
            this.shift = new Vector2(0, 0);
        }
    }

    shake() {
        this.state = ViewportState.Shake;
        this.animationtime = this.shaketime;
    }

    drawImage(sprite: Sprite, position: Vector2, size?: Vector2) {
        position = this.toLocalPosition(position);
        this.ctx.drawImage(sprite.img,
            position.x, position.y,
            size ? size.x : sprite.img.width,
            size ? size.y : sprite.img.height
        );
    }

    drawText(text: string, position?: Vector2, fitTo?: Vector2, color?: string) {
        position = position ? this.toLocalPosition(position) : new Vector2(0);
        this.ctx.fillStyle = color ?? "black";
        fitTo = fitTo ? this.toLocalSize(fitTo) : undefined;
        this.ctx.font = this.getFontString(fitTo ? this.getFittedFontSize(text, fitTo) : 240);
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, position.x, position.y, this.size.x);
    }

    drawRect(position: Vector2, size: Vector2, color: string) {
        this.ctx.fillStyle = color;
        position = this.toLocalPosition(position);
        size = this.toLocalSize(size);
        this.ctx.fillRect(position.x, position.y, size.x, size.y);
    }

    getFittedFontSize(text: string, fitTo: Vector2): number {
        let fontSize = 10;
        const step = 10;
        for (let i = 0; i < 100; ++i) {
            this.ctx.font = this.getFontString(fontSize);
            let measured = this.ctx.measureText(text);
            let height = measured.actualBoundingBoxAscent + measured.actualBoundingBoxDescent;
            if (measured.width > fitTo.x || height > fitTo.y)
                return fontSize - step;
            fontSize += step;
        }
        return fontSize - step;
    }

    abstract toLocalPosition(position: Vector2): Vector2;
    abstract toStandardPosition(position: Vector2): Vector2;
    abstract toLocalSize(size: Vector2): Vector2;
}   
