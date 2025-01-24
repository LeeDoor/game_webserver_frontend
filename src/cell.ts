import { BaseViewport } from "./base_viewport.js";
import { sm, Sprite } from "./sprite_manager.js";
import { Vector2 } from "./vector2.js";

export class Cell {
    type: string;
    position: Vector2;
    actor_id: number;
    constructor(type: string, position: Vector2, actor_id: number) {
        this.type = type;
        this.position = position;
        this.actor_id = actor_id;
    }
    draw(vp: BaseViewport, pixpos: Vector2, pixsize: Vector2): void {
        vp.drawImage(sm.sprites[this.type], pixpos, pixsize);
    }
}
