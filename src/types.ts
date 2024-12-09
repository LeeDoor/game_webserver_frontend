import {BaseViewport} from "./base_viewport.js";
import { Vector2 } from "./vector2.js";

export enum Direction {
    Up,
    Right,
    Down,
    Left
}

export abstract class BaseDrawable {
    abstract draw(vp: BaseViewport): void;
    abstract recalculate(vp: BaseViewport): void;
}

export abstract class BaseAnimated extends BaseDrawable { 
    abstract update(timestamp : number) : void;
}

export abstract class BaseClickable extends BaseDrawable {
    abstract click(): void;
    abstract isClicked(position: Vector2): boolean;
}