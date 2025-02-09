import { BaseViewport } from "./base_viewport.js";
import { IDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class TextBlock implements IDrawable {
    text: string;
    position: Vector2;
    size: Vector2;
    color: string;

    constructor(text: string, size?: Vector2, position?: Vector2, color?: string){
        this.text = text;
        this.size = size ?? new Vector2(1, 0.1);
        this.position = position ?? new Vector2(0.5);
        this.color = color ?? "coral";
    }

    draw(vp: BaseViewport): void {
        vp.drawText(this.text, this.position, this.size, this.color);
    }
    recalculate(vp: BaseViewport): void {}
}
