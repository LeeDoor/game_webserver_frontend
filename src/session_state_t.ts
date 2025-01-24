import { Cell } from "./cell.js";

export class SessionState {
    constructor() {
        this.map_size = { width: 0, height: 0 };
        this.move_number = 0;
        this.now_turn = "";
        this.state = "";
        this.terrain = [];
    }
    map_size: {
        height: number;
        width: number;
    };
    move_number: number;
    now_turn: string;
    state: string;
    terrain: Cell[];
}
