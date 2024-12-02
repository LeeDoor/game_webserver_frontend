import { BaseViewport, ViewportState } from "./base_viewport.js";
import { Sprite } from "./sprite_manager.js";
import { Vector2 } from "./vector2.js";

export class GameViewport extends BaseViewport {

    position: Vector2;
    scale: number;
    
    constructor(canvas:HTMLCanvasElement, position: Vector2 = new Vector2(0), scale: number = 1) {
        super(canvas);
        this.position = position;
        this.scale = scale;
    }

    private globalToLocalPos(position: Vector2) {
        return new Vector2(
            this.scale * (position.x - this.position.x + this.shift.x), 
            this.scale * (position.y - this.position.y + this.shift.y)
        );
    }

    drawImage(sprite: Sprite, position: Vector2, size?: Vector2) {
        let vpp = this.globalToLocalPos(position);
        return super.drawImage(sprite, vpp, size.multed(this.scale));
    }

    drawText(text: string, position?: Vector2, fitTo?: Vector2, color?: string) {
        return super.drawText(text, position ? this.globalToLocalPos(position) : null, fitTo, color);
    }

    drawRect(position: Vector2, size: Vector2, color: string) {
        return super.drawRect(this.globalToLocalPos(position), size.multed(this.scale), color);
    }
}