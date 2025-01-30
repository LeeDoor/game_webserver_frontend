import { BaseObject } from "./base_object.js";
import { BaseViewport } from "./base_viewport.js";
import { GridManager } from "./grid_manager.js";
import { Matrix } from "./matrix.js";
import { sm } from "./sprite_manager.js";
import { BaseDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class MatrixDrawer implements BaseDrawable {
    gm: GridManager;
    matrix: Matrix;
    constructor(gridManager: GridManager, matrix: Matrix) {
        this.gm = gridManager;
        this.matrix = matrix;
    }
    cellSizev2(): Vector2 {
        return new Vector2(this.gm.cellSize);
    }
    drawBackground(vp: BaseViewport) {
        vp.ctx.globalAlpha = 0.5;
        let sprite = sm.sprites.grass;
        for (let i = 0; i < this.gm.gridSize.x; ++i) {
            for (let j = 0; j < this.gm.gridSize.y; ++j) {
                vp.drawImage(sprite, this.gm.cellPos(new Vector2(i, j)), this.cellSizev2());
            }
        }
        vp.ctx.globalAlpha = 1;
    }
    adjPos(position: Vector2, scale: number) {
        return position.added(this.cellSizev2().multed((scale - 1) / -2));
    }

    drawObject(vp: BaseViewport, obj: BaseObject) {
        let sprite = sm.sprites[obj.drawSprite];
        vp.drawImage(sprite, this.adjPos(this.gm.cellPos(obj.position), obj.spriteScale), this.cellSizev2().multed(obj.spriteScale));
    }

    draw(vp: BaseViewport): void {
        this.drawBackground(vp);
        this.matrix.forMatrix((obj: BaseObject) => this.drawObject(vp, obj));
    }
}
