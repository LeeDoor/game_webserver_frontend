import {BaseViewport} from "./base_viewport.js";

export enum Direction {
    Up,
    Right,
    Down,
    Left
}

export abstract class AbstractDrawable {
    abstract draw(vp: BaseViewport): void;
    abstract recalculate(vp: BaseViewport): void;
}

export abstract class AbstractAnimated extends AbstractDrawable { 
    abstract update(timestamp : number) : void;
}