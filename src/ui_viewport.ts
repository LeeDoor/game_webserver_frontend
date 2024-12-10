import { BaseViewport } from "./base_viewport.js";
import { Vector2 } from "./vector2.js";

export class UIViewport extends BaseViewport {
    toLocalPosition(position: Vector2): Vector2 {
        return this.size.multed(position);
    }
    toLocalSize(size: Vector2): Vector2 {
        return this.size.multed(size);
    }
    toStandardPosition(position: Vector2): Vector2 {
        return position.multed(new Vector2(1 / this.size.x, 1 / this.size.y));
    }
} 