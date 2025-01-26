import { Cell } from "./cell.js";
import { GameObject } from "./game_object.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

export class SessionState {
    map_size: {
        height: number;
        width: number;
    };
    move_number: number;
    now_turn: string;
    state: string;
    terrain: Cell[];
    players: Player[];
    objects: GameObject[];

    constructor() {
        this.map_size = { width: 0, height: 0 };
        this.move_number = 0;
        this.now_turn = "";
        this.state = "";
        this.terrain = [];
        this.players = [];
        this.objects = [];
    }
}
