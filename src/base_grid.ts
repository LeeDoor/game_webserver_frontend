import { BaseViewport } from "./base_viewport.js"
import { Vector2 } from "./vector2.js"
import { BaseAnimated, BaseClickable, BaseDrawable } from "./types.js";
import { sm, Sprite } from "./sprite_manager.js";
import { SessionState } from "./session_state_t.js";
import { Cell } from "./cell.js";

class BaseGrid extends SessionState {
    constructor() {
        super();
    }
}

abstract class BaseDrawableGrid extends BaseGrid implements BaseDrawable {
    cellMargin: number; // margin between viewport borders and grid begining
    cellInnerMargin: number; // margin for each cell
    cellSize: number; // size of each cell in pixels
    gridSize: number; // size of whole grid side
    cellShift: number; // shift for each cell

    constructor() {
        super();
        this.cellMargin = 0;
        this.cellInnerMargin = 0;
        this.cellSize = 0;
        this.gridSize = 0;
        this.cellShift = 0;
    }

    drawCell(cell: Cell, vp: BaseViewport): void {
        vp.drawImage(sm.sprites[cell.type],
            this.getCellPosition(cell.position),
            new Vector2(this.cellSize));
    }
    draw(vp: BaseViewport): void {
        vp.ctx.globalAlpha = 0.5;
        for (let i = 0; i < this.map_size.width; ++i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                vp.drawImage(sm.sprites.grass, this.getCellPosition(new Vector2(i, j)), new Vector2(this.cellSize));
            }
        }
        vp.ctx.globalAlpha = 1;
        for (let cell of this.terrain) {
            this.drawCell(cell, vp);
        }
    }
    recalculate(vp: BaseViewport): void {
        let sideSize = Math.min(vp.size.x, vp.size.y);
        this.cellMargin = sideSize / 100;
        this.cellInnerMargin = sideSize / 100;
        this.cellSize
            = (sideSize - 2 * this.cellMargin) / this.map_size.width
            - 2 * this.cellInnerMargin;
        this.cellShift = (this.cellSize + 2 * this.cellInnerMargin);
        this.gridSize = this.cellInnerMargin + this.cellShift * this.map_size.width;
    }
    getCellPosition(position: Vector2): Vector2 {
        return new Vector2(
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.x,
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.y
        );
    }
}

export class ClickableGrid extends BaseDrawableGrid implements BaseClickable {
    constructor() {
        super();
    }
    init(vp: BaseViewport) {
        this.recalculate(vp);
    }
    click(clicked: Vector2, viewport: BaseViewport): void {
        clicked = viewport.toStandardPosition(clicked);
        let ms = new Vector2(this.map_size.width, this.map_size.height);
        const cellpos: Vector2 = clicked.multed(ms.multed(1 / (this.gridSize - 2 * this.cellMargin))).floor();
        console.log(cellpos);
    }
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        position = viewport.toStandardPosition(position);
        return this.cellMargin < position.x && position.x < this.gridSize &&
            this.cellMargin < position.y && position.y < this.gridSize;
    }
}

