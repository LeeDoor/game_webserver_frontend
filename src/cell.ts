import { BaseViewport } from "./base_viewport.js";
import { sm } from "./sprite_manager.js";
import { Vector2 } from "./vector2.js";
import { BaseObject } from "./base_object.js";

abstract class BaseDrawableCell extends BaseObject {
    positionpx: Vector2;
    cellSize: Vector2;
    constructor() {
        super();
        this.positionpx = new Vector2();
        this.cellSize = new Vector2();
    }
}

export class Cell extends BaseDrawableCell {
    type: string;
    position: Vector2;
    actor_id: number;

    constructor() {
        super();
        this.type = "";
        this.position = new Vector2();
        this.actor_id = 0;
    }

    recalculate(positionpx: Vector2, cellSize: Vector2) {
        this.positionpx = positionpx;
        this.cellSize = cellSize;
    }

    draw(vp: BaseViewport): void {
        vp.drawImage(sm.sprites[this.type], this.positionpx, this.cellSize);
    }
}
