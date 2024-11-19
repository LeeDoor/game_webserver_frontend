import { Viewport } from "./viewport.js"
import { GameObject, Bomb } from "./game_object.js"
import { Vector2 } from "./vector2.js"
import { SpriteManager } from "./sprite_manager.js"

export interface IDrawableGrid {
    cellMargin : number; // margin between viewport borders and grid begining
    cellInnerMargin : number; // margin for each cell
    cellSize : number; // size of each cell in pixels
    gridSize: number; // size of whole grid side
    cellShift: number; // shift for each cell

    draw(vp: Viewport): void;
    recalculate(vp: Viewport): void;
    getCellPosition(x: number, y: number) : Vector2;
}

export class Grid implements IDrawableGrid {
    size: Vector2;
    move_number: number;
    now_turn: string;
    objects : GameObject[]; 
    state: string;
    
    cellMargin : number;
    cellInnerMargin : number;
    cellSize : number;
    gridSize: number;
    cellShift: number;

    constructor(vp: Viewport) {
        this.size = new Vector2 (8,8);
        this.recalculate(vp);

        this.objects = [];
        this.objects.push(new Bomb(this as IDrawableGrid));
    }

    draw(vp: Viewport): void {
        for (let x = 0; x < this.size.x; ++x) {
            for (let y = 0; y < this.size.y; ++y) {
                vp.drawImage(SpriteManager.grass, 
                    this.getCellPosition(x, y),
                    new Vector2(this.cellSize));
            }
        }
        for (let obj of this.objects) {
            obj.draw(vp);
        }
    }
    recalculate(vp: Viewport): void {
        let sideSize = Math.min(vp.size.x, vp.size.y);
        this.cellMargin = sideSize / 100;
        this.cellInnerMargin = sideSize / 100;
        this.cellShift = (this.cellSize + 2 * this.cellInnerMargin);
        this.cellSize
            = (sideSize - 2 * this.cellMargin) / this.size.x 
            - 2 * this.cellInnerMargin;
    }

    getCellPosition(x: number, y: number) : Vector2 {
        return new Vector2(
            this.cellMargin + this.cellInnerMargin + this.cellShift * x,
            this.cellMargin + this.cellInnerMargin + this.cellShift * y
        );
    }
}