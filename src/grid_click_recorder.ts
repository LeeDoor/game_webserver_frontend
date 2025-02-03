import { BaseViewport } from "./base_viewport.js";
import { GridManager } from "./grid_manager.js";
import { IObservable } from "./i_observable.js";
import { IClickable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class GridClickRecorder extends IObservable<Vector2 | null> implements IClickable  {
    gm: GridManager;

    constructor(gm: GridManager) {
        super();
        this.gm = gm;
    }
    click(position: Vector2, viewport: BaseViewport): void {
        let cell: Vector2 | null = this.gm.cellOnPos(viewport.toStandardPosition(position));  
        this.notify(cell);
    }
    isClicked(position: Vector2, viewport: BaseViewport): boolean {
        return this.gm.isPosInGrid(viewport.toStandardPosition(position));
    }
}
