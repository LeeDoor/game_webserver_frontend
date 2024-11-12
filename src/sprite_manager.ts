import { Vector2 } from "./vector2.js"

export class Sprite {
    img: HTMLImageElement;
    constructor(src: string, size?: Vector2) {
        this.img = size ? new Image(size.x, size.y) : new Image();
        this.img.src = src;
    }
}

export let abobuses : Sprite[] = [
    new Sprite("abobus4.png", new Vector2(200, 200))
]