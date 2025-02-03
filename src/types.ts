import { BaseViewport } from "./base_viewport.js";
import { Vector2 } from "./vector2.js";

export enum Direction {
  Up,
  Right,
  Down,
  Left
}

export interface IRecalculatable {
  recalculate(vp: BaseViewport): void;
}
export interface IDrawable {
  draw(vp: BaseViewport): void;
}
export interface IAnimated extends IDrawable {
  update(timestamp: number): void;
}

export interface IClickable {
  click(clicked: Vector2, viewport: BaseViewport): void;
  isClicked(position: Vector2, viewport: BaseViewport): boolean;
}
