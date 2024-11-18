import { Viewport } from "./viewport.js"
import { GameObject, Bomb } from "./game_object.js"
import { Vector2 } from "./vector2.js"
import { SpriteManager } from "./sprite_manager.js"

export class GridDrawData {
    cellMargin : number;
    cellInnerMargin : number;
    cellSize : number = -1;
    gridSize: number;
}

export class Grid {
    size: Vector2;
    move_number: number;
    now_turn: string;
    objects : GameObject[]; 
    state: string;
    drawData: GridDrawData;

    constructor(vp: Viewport) {
        this.size = new Vector2 (8,8);
        this.drawData = new GridDrawData();
        this.recalculate(vp);

        this.objects = [];
        this.objects.push(new Bomb(this.drawData));

    }

    draw(vp: Viewport): void {
        let dd = this.drawData;
        for (let x = 0; x < this.size.x; ++x) {
            for (let y = 0; y < this.size.y; ++y) {
                let cellPosition = new Vector2(
                    dd.cellMargin + dd.cellInnerMargin + (dd.cellSize + 2 * dd.cellInnerMargin) * x,
                    dd.cellMargin + dd.cellInnerMargin + (dd.cellSize + 2 * dd.cellInnerMargin) * y
                );
                vp.drawImage(SpriteManager.grass, cellPosition, new Vector2(dd.cellSize, dd.cellSize));
            }
        }
        for (let obj of this.objects) {
            obj.draw(vp);
        }
    }
    recalculate(vp: Viewport): void {
        let sideSize = Math.min(vp.size.x, vp.size.y);
        this.drawData.cellMargin = sideSize / 100;
        this.drawData.cellInnerMargin = sideSize / 100;
        this.drawData.cellSize
            = (sideSize - 2 * this.drawData.cellMargin) / this.size.x 
            - 2 * this.drawData.cellInnerMargin;
    }
}