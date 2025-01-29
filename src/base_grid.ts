import { BaseViewport } from "./base_viewport.js"
import { Vector2 } from "./vector2.js"
import { BaseAnimated, BaseClickable, BaseDrawable } from "./types.js";
import { sm, Sprite } from "./sprite_manager.js";
import { SessionState } from "./session_state_t.js";
import { Cell } from "./cell.js";
import { BaseObject } from "./base_object.js";
import { Player } from "./player.js";
import { GameObject } from "./game_object.js";

class BaseGrid extends SessionState {
    matrix: BaseObject[][][];
    constructor() {
        super();
        this.matrix = [];
    }

    init(_: BaseViewport) {
        this.terrain = this.terrain.map(obj => {
            return Object.assign(new Cell(), obj);
        });
        this.players = this.players.map(obj => {
            return Object.assign(new Player(), obj);
        });
        this.objects = this.objects.map(obj => {
            return Object.assign(new GameObject(), obj);
        });
        for (let i = 0; i < this.map_size.width; ++i) {
            this.matrix.push([]);
            for (let j = 0; j < this.map_size.height; ++j) {
                this.matrix[i].push([]);
            }
        }
        for (let player of this.players) {
            this.matrix[player.position.x][player.position.y].push(player);
        }
        for (let cell of this.terrain) {
            this.matrix[cell.position.x][cell.position.y].push(cell);
        }
        for (let obj of this.objects) {
            this.matrix[obj.position.x][obj.position.y].push(obj);
        }
        this.forMatrix((obj: BaseObject) => obj.init());
    }
    forMatrix(func: (obj: BaseObject) => void) {
        for (let i = this.map_size.width - 1; i >= 0; --i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                for (let obj of this.matrix[i][j]) {
                    func(obj);
                }
            }
        }
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
        this.matrix = [];
    }
    init(vp: BaseViewport) {
        super.init(vp);
        this.recalculate(vp);
    }
    drawBackground(vp: BaseViewport) {
        vp.ctx.globalAlpha = 0.5;
        for (let i = 0; i < this.map_size.width; ++i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                vp.drawImage(sm.sprites.grass, this.getCellPosition(new Vector2(i, j)), new Vector2(this.cellSize));
            }
        }
        vp.ctx.globalAlpha = 1;
    }

    draw(vp: BaseViewport): void {
        this.drawBackground(vp);
        this.forMatrix((obj: BaseObject) => obj.draw(vp));
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
        this.forMatrix(
            (obj: BaseObject) =>
                obj.recalculate(this.getCellPosition(obj.position), new Vector2(this.cellSize)));
    }
    getCellPosition(position: Vector2): Vector2 {
        return new Vector2(
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.x,
            this.cellMargin + this.cellInnerMargin + this.cellShift * position.y
        );
    }
}

export abstract class BaseClickableGrid extends BaseDrawableGrid implements BaseClickable {
    constructor() {
        super();
    }
    click(clicked: Vector2, viewport: BaseViewport): void {
        clicked = viewport.toStandardPosition(clicked);
        clicked = clicked.added(-this.cellMargin);
        let cellclicked: Vector2 = clicked.multed(1 / this.cellShift).floor();
        if (cellclicked.x * this.cellShift + this.cellInnerMargin < clicked.x && clicked.x < cellclicked.x * this.cellShift + this.cellInnerMargin + this.cellSize &&
            cellclicked.y * this.cellShift + this.cellInnerMargin < clicked.y && clicked.y < cellclicked.y * this.cellShift + this.cellInnerMargin + this.cellSize) {
            console.log(cellclicked);
        }
    }
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        position = viewport.toStandardPosition(position);
        return this.cellMargin < position.x && position.x < this.gridSize - this.cellMargin &&
            this.cellMargin < position.y && position.y < this.gridSize - this.cellMargin;
    }
}

