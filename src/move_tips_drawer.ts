import { BaseViewport } from "./base_viewport.js";
import { GridManager } from "./grid_manager.js";
import { MoveTips} from "./move_tips.js";
import { IDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class MoveTipsDrawer implements IDrawable {
    TIP_COLOR = "rgba(0, 0, 255, 0.3)";
    gm: GridManager;
    moveTips: MoveTips;

    constructor(mt: MoveTips, gm: GridManager) {
        this.moveTips = mt;
        this.gm = gm;
    }
    draw(vp: BaseViewport): void {
        for(let tip of this.moveTips.tips) {
            vp.drawRect(this.gm.cellPos(tip), new Vector2(this.gm.cellSize), this.TIP_COLOR);
        }
    }
}
