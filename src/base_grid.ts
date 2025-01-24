import { BaseViewport } from "./base_viewport.js"
import { Vector2 } from "./vector2.js"
import { BaseAnimated, BaseClickable } from "./types.js";
import { Cell } from "./cell.js";
import { Sprite } from "./sprite_manager.js";

abstract class BaseGrid {
    size: Vector2;
    terrain: Cell[];
}

abstract class BaseDrawableGrid extends BaseGrid implements BaseAnimated {
    update(timestamp: number): void { }

    cellMargin: number; // margin between viewport borders and grid begining
    cellInnerMargin: number; // margin for each cell
    cellSize: number; // size of each cell in pixels
    gridSize: number; // size of whole grid side
    cellShift: number; // shift for each cell
    draw(vp: BaseViewport): void {
        for (let cell of this.terrain) {
            cell.draw(vp, this.getCellPosition(cell.position), new Vector2(this.cellSize));
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
    getCellPosition(position: Vector2): Vector2 {
        return new Vector2(
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.x,
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.y
        );
    }
}

export class ClickableGrid extends BaseDrawableGrid implements BaseClickable {
    constructor(vp: BaseViewport) {
        super();
        this.size = new Vector2(8, 8);
        this.terrain = [new Cell("rock", new Vector2(2, 3), 1)];
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

