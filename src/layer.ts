import { BaseViewport, ViewportState } from "./base_viewport.js";
import { BaseAnimated, BaseClickable, BaseDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class Layer {
    viewport: BaseViewport;
    toDraw: BaseDrawable[];
    toUpdate: BaseAnimated[];
    toClick: BaseClickable[];

    constructor(viewport: BaseViewport) {
        this.viewport = viewport;
        this.toDraw = [];
        this.toUpdate = [];
        this.toClick = [];
    }

    draw(){
        this.viewport.clearScreen();
        for(let drawable of this.toDraw) {
            drawable.draw(this.viewport);
        }
    }
    update(timestamp: number) {
        for(let animated of this.toUpdate) {
            animated.update(timestamp);
        }
    }
    recalculate(canvas: HTMLCanvasElement) {
        this.viewport.recalculate(canvas);
    }
    onClick(position: Vector2){
        for (let clickable of this.toClick) {
            if(clickable.isClicked(position, this.viewport)) {
                clickable.click(position, this.viewport);
            }
        }
    }
    subscribeDraw(drawable: BaseDrawable) {
        if(this.toDraw.indexOf(drawable) == -1){
            this.toDraw.push(drawable);
            return true;
        }
        return false;
    }
    subscribeUpdate(animated: BaseAnimated) {
        this.subscribeDraw(animated);
        if(this.toUpdate.indexOf(animated) == -1){
            this.toUpdate.push(animated);
            return true;
        }
        return false;
    }
    subscribeOnClick(clickable: BaseClickable) {
        this.subscribeDraw(clickable);
        if(this.toClick.indexOf(clickable) == -1){
            this.toClick.push(clickable);
            return true;
        }
        return false;
    }
}
