import { Vector2 } from "./vector2.js";

export abstract class BaseObject {
    position: Vector2;
    spriteScale: number;
    drawSprite: string;
    actor_id: number;

    constructor() {
        this.position = new Vector2();
        this.spriteScale = 1;
        this.drawSprite = "";
        this.actor_id = 0;
    }
    abstract init(): void; 
}
