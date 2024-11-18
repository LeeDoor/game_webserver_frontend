import { IDrawable, IUpdateable } from "./types.js"
import { Viewport } from "./viewport.js"
import { Vector2 } from "./vector2.js"
import { Sprite, SpriteManager } from "./sprite_manager.js"
import { Direction } from "./types.js"
import { GridDrawData } from "./grid.js"

class ObjectDrawData {
    size: number;
    position: Vector2;
}

export class GameObject {
    type: string;
    position: Vector2;
    owner: string;

    drawData: ObjectDrawData;

    constructor(gdd: GridDrawData) {
        this.type = "object";
        this.position = new Vector2(5,5);
        this.owner = "abobus";

        this.drawData = new ObjectDrawData();
        this.recalculate(gdd);
    }

    recalculate(gdd: GridDrawData){
        this.drawData.size = gdd.cellSize;
        let cellShift = 2 * gdd.cellInnerMargin + gdd.cellSize;
        this.drawData.position = new Vector2(
            gdd.cellMargin + gdd.cellInnerMargin + cellShift * this.position.x, 
            gdd.cellMargin + gdd.cellInnerMargin + cellShift * this.position.y);
    }

    draw(vp : Viewport) {
        console.log("object draw on " + this.position.x + " " + this.position.y);
    }
}

export class Bullet extends GameObject {
    direction: Direction;

    draw(vp : Viewport) {
        console.log("bullet draw on " + this.position.x + " " + this.position.y);
    }
}
export class Bomb extends GameObject {
    ticks_left: number;

    draw(vp : Viewport) {
        vp.drawImage(SpriteManager.abobus[0], this.drawData.position, new Vector2(this.drawData.size));
    }
}
export class Gun extends GameObject {
    shots_left: number;
    ticks_to_shot: number;

    draw(vp : Viewport) {
        console.log("gun draw on " + this.position.x + " " + this.position.y);
    }
}