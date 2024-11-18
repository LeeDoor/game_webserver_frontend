import { Vector2 } from "./vector2.js"

export class Sprite {
    img: HTMLImageElement;
    constructor(src: string, size?: Vector2) {
        this.img = size ? new Image(size.x, size.y) : new Image();
        this.img.src = src;
    }
}

export class SpriteManager {
    static abobus : Sprite[] = [
        new Sprite("abobus1.png"),
        new Sprite("abobus2.png"),
        new Sprite("abobus3.png"),
        new Sprite("abobus4.png"),
    ];
    static grass = new Sprite("grass.png");
}