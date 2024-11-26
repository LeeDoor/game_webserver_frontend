import {Viewport} from "./viewport.js";

export enum Direction {
    Up,
    Right,
    Down,
    Left
}

export abstract class AbstractDrawable {
    abstract draw(vp: Viewport): void;
    abstract recalculate(vp: Viewport): void;
}

export abstract class AbstractAnimated extends AbstractDrawable { 
    abstract update(timestamp : number) : void;
}