import { Viewport } from "./viewport.js"
import { GameObject } from "./game_object.js"
import { Vector2 } from "./vector2.js"

export class Grid {
    size: Vector2;
    move_number: number;
    now_turn: string;
    objects : GameObject[]; 
    state: string;

    constructor() {
        this.objects = [];
        this.objects.push(new GameObject());
        this.size = new Vector2 (8,8);
    }
}