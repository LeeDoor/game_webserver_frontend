import { IDrawable, IUpdateable } from "./types.js"
import { Viewport } from "./viewport.js"
import { Vector2 } from "./vector2.js"
import { Sprite, SpriteManager } from "./sprite_manager.js"
import { Direction } from "./types.js"

export class GameObject {
    type: string;
    position: Vector2;
    owner: string;
}

export class Bullet extends GameObject {
    direction: Direction;
}
export class Bomb extends GameObject {
    ticks_left: number;
}
export class Gun extends GameObject {
    shots_left: number;
    ticks_to_shot: number;
}