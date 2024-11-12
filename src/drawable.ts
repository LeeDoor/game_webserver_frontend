import {Viewport} from "./viewport.js";
export interface IDrawable{
    draw(vp: Viewport) : void;
}