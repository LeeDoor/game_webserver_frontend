import { BaseViewport, ViewportState } from "./base_viewport.js";
import { IAnimated, IClickable, IDrawable, IRecalculatable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class Layer {
    viewport: BaseViewport;
    toRecalculate: IRecalculatable[];
    toDraw: IDrawable[];
    toUpdate: IAnimated[];
    toClick: IClickable[];

    constructor(viewport: BaseViewport) {
        this.viewport = viewport;
        this.toDraw = [];
        this.toUpdate = [];
        this.toClick = [];
        this.toRecalculate = [];
    }

    draw() {
        this.viewport.clearScreen();
        for (let drawable of this.toDraw) {
            drawable.draw(this.viewport);
        }
    }
    update(timestamp: number) {
        for (let animated of this.toUpdate) {
            animated.update(timestamp);
        }
    }
    recalculate(canvas: HTMLCanvasElement) {
        this.viewport.recalculate(canvas);
        for (let rec of this.toRecalculate) {
            rec.recalculate(this.viewport);
        }
    }
    onClick(position: Vector2) {
        for (let clickable of this.toClick) {
            if (clickable.isClicked(position, this.viewport)) {
                clickable.click(position, this.viewport);
            }
        }
    }
    subscribeDraw(drawable: IDrawable) {
        if (this.toDraw.indexOf(drawable) == -1) {
            this.toDraw.push(drawable);
            return true;
        }
        return false;
    }
    subscribeUpdate(animated: IAnimated) {
        this.subscribeDraw(animated);
        if (this.toUpdate.indexOf(animated) == -1) {
            this.toUpdate.push(animated);
            return true;
        }
        return false;
    }
    subscribeClick(clickable: IClickable) {
        if (this.toClick.indexOf(clickable) == -1) {
            this.toClick.push(clickable);
            return true;
        }
        return false;
    }
    subscribeRecalculate(recal: IRecalculatable) {
        if (this.toRecalculate.indexOf(recal) == -1) {
            this.toRecalculate.push(recal);
            return true;
        }
        return false;
    }
}
