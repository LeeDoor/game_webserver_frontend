import {Viewport} from "./viewport.js";

export enum Direction {
    Up,
    Right,
    Down,
    Left
}

export interface IDrawable{
    draw(vp: Viewport) : void;
}
export interface IUpdateable{
    // timestamp: time since last update in ms
    update(timestamp : number) : void;
}