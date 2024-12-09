import { BaseViewport } from "./base_viewport.js";
import { BaseDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class TextBlock extends BaseDrawable {
    text: string;
    position: Vector2;
    size: Vector2;
    color: string;

    constructor(text: string, size: Vector2, position = new Vector2(0), color = "white"){
        super();
        this.text = text;
        this.size = size;
        this.position = position;
        this.color = color;
    }

    draw(vp: BaseViewport): void {
        vp.drawText(this.text, this.position, this.size, this.color);
    }
    recalculate(vp: BaseViewport): void {}
}