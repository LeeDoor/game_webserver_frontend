import { Vector2 } from "./vector2.js";

export abstract class BaseObject {
    position: Vector2;
    spriteScale: number;
    drawSprite: string;

    constructor() {
        this.position = new Vector2();
        this.spriteScale = 1;
        this.drawSprite = "";
    }
    abstract init(): void; 
}
