import {Vector2} from "./vector2.js";

export class Viewport {
    position: Vector2;
    size: Vector2;
    readonly ctx: CanvasRenderingContext2D;
    scale: number;
    constructor(canvas: HTMLCanvasElement, position: Vector2 = new Vector2(0, 0)) {
        this.position = position;
        this.size = new Vector2(canvas.width, canvas.height);
        this.ctx = canvas.getContext('2d');
        this.scale = 0.5;
    }
    drawImage(image: HTMLImageElement, position: Vector2, size: Vector2 = new Vector2(0, 0)) {
        if(size.x == 0 && size.y == 0) {
            size.x = image.width;
            size.y = image.height;
        }
        this.ctx.drawImage(image, position.x - this.position.x, position.y - this.position.y, size.x * this.scale, size.y * this.scale);
    }
}