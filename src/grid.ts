import { BaseViewport } from "./base_viewport.js"
import { Vector2 } from "./vector2.js"
import { SpriteManager, sm } from "./sprite_manager.js"
import { BaseAnimated, BaseClickable, BaseDrawable } from "./types.js";

class BaseGrid {
    size: Vector2;
}

abstract class BaseDrawableGrid extends BaseGrid implements BaseAnimated {
    update(timestamp: number): void {

    }
    cellMargin: number; // margin between viewport borders and grid begining
    cellInnerMargin: number; // margin for each cell
    cellSize: number; // size of each cell in pixels
    gridSize: number; // size of whole grid side
    cellShift: number; // shift for each cell
    draw(vp: BaseViewport): void {
        for (let x = 0; x < this.size.x; ++x) {
            for (let y = 0; y < this.size.y; ++y) {
                vp.drawImage(sm.sprites.terrain[0],
                    this.getCellPosition(x, y),
                    new Vector2(this.cellSize));
            }
        }
    }
    recalculate(vp: BaseViewport): void {
        let sideSize = Math.min(vp.size.x, vp.size.y);
        this.cellMargin = sideSize / 100;
        this.cellInnerMargin = sideSize / 100;
        this.cellSize
            = (sideSize - 2 * this.cellMargin) / this.size.x
            - 2 * this.cellInnerMargin;
        this.cellShift = (this.cellSize + 2 * this.cellInnerMargin);
        this.gridSize = this.cellInnerMargin + this.cellShift * this.size.x;
    }
    getCellPosition(x: number, y: number): Vector2 {
        return new Vector2(
            this.cellMargin + this.cellInnerMargin + this.cellShift * x,
            this.cellMargin + this.cellInnerMargin + this.cellShift * y
        );
    }
}

export class Grid extends BaseDrawableGrid implements BaseClickable {
    constructor(vp: BaseViewport) {
        super();
        this.size = new Vector2(8, 8);
        this.recalculate(vp);
    }
    click(clicked: Vector2, viewport: BaseViewport): void {
        clicked = viewport.toStandardPosition(clicked);
        const cellpos: Vector2 = clicked.multed(this.size.multed(1 / (this.gridSize - 2 * this.cellMargin))).floor();
        console.log(cellpos);
    }
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        position = viewport.toStandardPosition(position);
        return this.cellMargin < position.x && position.x < this.gridSize &&
            this.cellMargin < position.y && position.y < this.gridSize;
    }
}
