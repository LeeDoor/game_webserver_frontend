import {Grid} from "./grid.js"
import {Viewport} from "./viewport.js"
import {Vector2} from "./vector2.js"
import { SpriteManager } from "./sprite_manager.js";

interface Drawer {
    draw(todraw: any, recalculate: boolean): void;
    recalculate(todraw: any): void;
}

class GridDrawer implements Drawer {
    viewport : Viewport;
    cellMargin : number;
    cellInnerMargin : number;
    cellSize : number;
    gridSize: number;

    constructor (viewport: Viewport) {
        this.viewport = viewport;
        this.cellSize = -1;
    }
    draw(grid: Grid, recalculate = false): void {
        if (recalculate || this.cellSize == -1) 
            this.recalculate(grid);

        for (let x = 0; x < grid.size.x; ++x) {
            for (let y = 0; y < grid.size.y; ++y) {
                let cellPosition = new Vector2(
                    this.cellMargin + this.cellInnerMargin + (this.cellSize + 2 * this.cellInnerMargin) * x,
                    this.cellMargin + this.cellInnerMargin + (this.cellSize + 2 * this.cellInnerMargin) * y
                );
                this.viewport.drawImage(SpriteManager.abobus[0], cellPosition, new Vector2(this.cellSize, this.cellSize));
            }
        }
    }
    recalculate(grid: Grid): void {
        let sideSize = Math.min(this.viewport.size.x, this.viewport.size.y);
        this.cellMargin = sideSize / 100;
        this.cellInnerMargin = sideSize / 100;
        this.cellSize = (sideSize - 2 * this.cellMargin) / grid.size.x - 2 * this.cellInnerMargin;
    }
}

export class DrawManager {
    viewport : Viewport;
    gridDrawer: GridDrawer;

    constructor(viewport : Viewport){
        this.viewport = viewport;
        this.gridDrawer = new GridDrawer(viewport);
    }

    drawGrid(grid: Grid) {
        this.gridDrawer.draw(grid);
    }
}