import { IClickable, IDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";
import { BaseViewport } from "./base_viewport.js";

export type ButtonSize = Vector2 | "MenuButton"; 
export type ClickMethod = () => void;
export class Button implements IClickable, IDrawable {
    position: Vector2;
    size: Vector2;
    text: string;
    color: string;
    clickCommand: ClickMethod;

    constructor (position: Vector2, size: ButtonSize, command: ClickMethod, text = "", color = "coral") {
        this.clickCommand = command;
        this.text = text;
        this.color = color;
        switch(size) {
            case "MenuButton":
                this.size = new Vector2(0.4, 0.2);
                break;
            default:
                this.size = size as Vector2;
                break;
        }
        this.position = position.added(this.size.multed(-0.5));
    }

    draw(vp: BaseViewport): void {
        vp.drawRect(this.position, this.size, this.color);
        vp.drawText(this.text, this.position.added(this.size.multed(0.5)), this.size.multed(0.9), "white");
    }
    
    click(position: Vector2, viewport: BaseViewport): void {
        this.clickCommand();
    }
    
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        position = viewport.toStandardPosition(position);
        return this.position.x < position.x && position.x < this.position.x + this.size.x &&
            this.position.y < position.y && position.y < this.position.y + this.size.y;
    }
}
