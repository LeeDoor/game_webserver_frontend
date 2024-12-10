import { BaseAnimated, BaseClickable } from "./types.js";
import { Vector2 } from "./vector2.js";
import { BaseViewport } from "./base_viewport.js";

export type ButtonSize = Vector2 | "MenuButton" | "SmallButton"; 

export class Button extends BaseClickable {
    position: Vector2;
    size: Vector2;
    text: string;
    color: string;

    constructor (position: Vector2, size: ButtonSize, text = "", color = "green") {
        super();
        this.position = position;
        this.text = text;
        this.color = color;
        switch(size) {
            case "MenuButton":
                this.size = new Vector2(400, 100);
                break;
            case "SmallButton":
                this.size = new Vector2(100, 40);
                break;
            default:
                this.size = size as Vector2;
                break;
        }
    }

    draw(vp: BaseViewport): void {
        vp.drawRect(this.position, this.size, this.color);
        vp.drawText(this.text, this.position.added(this.size.multed(0.5)), this.size.multed(0.9), "white");
    }
    
    recalculate(vp: BaseViewport): void { }
    
    click(): void {
        console.log("button clicked " + String(this.text));
    }
    
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        position = viewport.toStandardPosition(position);
        return this.position.x < position.x && position.x < this.position.x + this.size.x &&
            this.position.y < position.y && position.y < this.position.y + this.size.y;
    }
}