import { BaseViewport } from "./base_viewport.js"
import { sm } from "./sprite_manager.js";
import { Vector2 } from "./vector2.js";

export abstract class BaseObject {
    position: Vector2;
    spriteScale: number;
    drawPosition: Vector2;
    drawSize: Vector2;
    drawSprite: string;

    constructor() {
        this.position = new Vector2();
        this.spriteScale = 1;
        this.drawPosition = new Vector2();
        this.drawSize = new Vector2();
        this.drawSprite = "";
    }

    abstract init(): void;
    draw(vp: BaseViewport): void {
        vp.drawImage(sm.sprites[this.drawSprite], this.drawPosition, this.drawSize);
    }
    recalculate(cellPosition: Vector2, cellSize: Vector2) {
        this.drawPosition = cellPosition.added(cellSize.multed((this.spriteScale - 1) / -2));
        this.drawSize = cellSize.multed(this.spriteScale);
    }
}
