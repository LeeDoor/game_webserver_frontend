import { Viewport } from "./viewport.js"
import { Vector2 } from "./vector2.js"
import { Sprite, SpriteManager } from "./sprite_manager.js"
import { Direction } from "./types.js"
import { IDrawableGrid } from "./grid.js"

interface IDrawableObject {
    drawSize: number;
    drawPosition: Vector2;

    recalculate (gd: IDrawableGrid): void;
    draw (vp: Viewport): void;
}

export class GameObject implements IDrawableObject {
    type: string;
    position: Vector2;
    owner: string;

    drawSize: number;
    drawPosition: Vector2;

    constructor(gd: IDrawableGrid) {
        this.type = "object";
        this.position = new Vector2(5,5);
        this.owner = "abobus";
        
        this.recalculate(gd);
    }

    recalculate(idg: IDrawableGrid){
        this.drawSize = idg.cellSize;
        this.position = idg.getCellPosition(this.position.x, this.position.y);
    }

    draw(vp : Viewport) {
        console.log("object draw on " + this.position.x + " " + this.position.y);
    }
}

export class Bullet extends GameObject {
    direction: Direction;

    draw(vp : Viewport) {
        vp.drawImage(SpriteManager.abobus[0], this.position, new Vector2(this.drawSize));
    }
}
export class Bomb extends GameObject {
    ticks_left: number;

    draw(vp : Viewport) {
        vp.drawImage(SpriteManager.abobus[3], this.position, new Vector2(this.drawSize));
    }
}
export class Gun extends GameObject {
    shots_left: number;
    ticks_to_shot: number;

    draw(vp : Viewport) {
        vp.drawImage(SpriteManager.abobus[2], this.position, new Vector2(this.drawSize));
    }
}