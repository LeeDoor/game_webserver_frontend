import { BaseViewport } from "./base_viewport.js";
import { IRecalculatable } from "./types.js";
import { Vector2 } from "./vector2.js"

export class GridManager implements IRecalculatable {
    gridSize: Vector2;
    gridMargin: number; // margin between viewport borders and grid begining
    cellInnerMargin: number; // margin for each cell
    cellSize: number; // size of each cell in pixels
    sideSize: number; // size of whole grid side
    cellShift: number; // shift for each cell

    constructor(gridSize: Vector2) {
        this.gridSize = gridSize;
        this.gridMargin = 0;
        this.cellInnerMargin = 0;
        this.cellSize = 0;
        this.sideSize = 0;
        this.cellShift = 0;
    }
    init(vp: BaseViewport) {
        this.recalculate(vp);
    } 
    recalculate(vp: BaseViewport): void {
        let sideSize = Math.min(vp.size.x, vp.size.y);
        this.gridMargin = sideSize / 100;
        this.cellInnerMargin = sideSize / 100;
        this.cellSize
            = (sideSize - 2 * this.gridMargin) / this.gridSize.x
                - 2 * this.cellInnerMargin;
        this.cellShift = (this.cellSize + 2 * this.cellInnerMargin);
        this.sideSize = this.cellInnerMargin + this.cellShift * this.gridSize.x;
    }
    cellPos(cell: Vector2): Vector2 {
        return new Vector2(
            this.gridMargin + this.cellInnerMargin + this.cellShift * cell.x,
            this.gridMargin + this.cellInnerMargin + this.cellShift * cell.y
        );
    }
    isPosInGrid(position:Vector2): boolean {
        if (this.gridMargin >= position.x || position.x >= this.sideSize - this.gridMargin ||
            this.gridMargin >= position.y || position.y >= this.sideSize - this.gridMargin)
            return false;
        return true;
    }
    cellOnPos(position: Vector2): Vector2 | null {
        if(!this.isPosInGrid(position)) return null;
        position = position.added(-this.gridMargin);
        let cellposition = position.multed(1 / this.cellShift).floor(); // approximate position 
        if (cellposition.x * this.cellShift + this.cellInnerMargin < position.x
            && cellposition.y * this.cellShift + this.cellInnerMargin < position.y
            && position.x < cellposition.x * this.cellShift + this.cellInnerMargin + this.cellSize
            && position.y < cellposition.y * this.cellShift + this.cellInnerMargin + this.cellSize)
            return cellposition; // verifying position
        return null;
    }
}
