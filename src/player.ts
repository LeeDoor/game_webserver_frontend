import { BaseObject } from "./base_object.js";
import { BaseViewport } from "./base_viewport.js";
import { Vector2 } from "./vector2.js";
abstract class BaseDrawablePlayer extends BaseObject {
    constructor() {
        super();
    }
}
export class Player extends BaseDrawablePlayer {
    actor_id: number;
    login: string;
    position: Vector2;

    constructor() {
        super();
        this.actor_id = 0;
        this.login = "";
        this.position = new Vector2(0);
    }
    draw(vp: BaseViewport): void {

    }
    recalculate(cellSize: Vector2) {

    }
}
