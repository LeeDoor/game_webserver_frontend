import { BaseViewport, ViewportState } from "./base_viewport.js";
import { Sprite } from "./sprite_manager.js";
import { Vector2 } from "./vector2.js";

export class GameViewport extends BaseViewport {
    toStandardPosition(position: Vector2): Vector2 {
        return new Vector2(
            position.x / this.scale + this.position.x - this.shift.x,
            position.y / this.scale + this.position.y - this.shift.y
        );
    }

    position: Vector2;
    scale: number;
    
    constructor(canvas:HTMLCanvasElement, position: Vector2 = new Vector2(0), scale: number = 1) {
        super(canvas);
        this.position = position;
        this.scale = scale;
    }

    toLocalPosition(position: Vector2) {
        return new Vector2(
            this.scale * (position.x - this.position.x + this.shift.x), 
            this.scale * (position.y - this.position.y + this.shift.y)
        );
    }
    toLocalSize(size: Vector2) {
        return size.multed(this.scale);
    }
}