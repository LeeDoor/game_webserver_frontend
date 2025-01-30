export class MatrixDrawer extends BaseDrawable {
    gridManager: GridManager;
    matrix: Matrix;

    constructor(gridManager: GridManager, matrix: Matrix) {
        this.gridManager = gridManager;
        this.matrix = matrix;
    }

    cellSizev2(): Vector2 {
        return new Vector2(this.gridManager.cellSize);   
    }

    drawBackground(vp: BaseViewport) {
        vp.ctx.globalAlpha = 0.5;
        for (let i = 0; i < this.map_size.width; ++i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                vp.drawImage(sm.sprites.grass, this.gridManager.cellPosition(new Vector2(i, j)), cellSizev2());
            }
        }
        vp.ctx.globalAlpha = 1;
    }

    drawObject(vp: BaseViewport, object: BaseObject) {
        vp.drawImage(object.spriteDraw, this.gridManager.cellPosition(object.position), cellSizev2());
    }

    draw(vp: BaseViewport): void {
        this.drawBackground(vp);
        this.matrix.forMatrix((obj: BaseObject) => drawObject(vp, obj));
    }
}
