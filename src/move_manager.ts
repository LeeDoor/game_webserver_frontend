import { Matrix } from "./matrix.js";
import { MoveTips, MoveType } from "./move_tips.js";
import { account } from "./network_manager.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

export class MoveManager {
    moveType: MoveType;
    player: Player;
    matrix: Matrix;
    moveTips: MoveTips;

    constructor(matrix: Matrix, moveTips: MoveTips) {
        this.matrix = matrix;
        this.moveTips = moveTips;
        this.moveType = MoveType.Walk;
        this.player = this.matrix.findPlayer(account.ld.login) ?? new Player();
        if(this.player.login != account.ld.login) 
            console.log(`unable to find player ${account.ld.login} in move_manager.ts`);
    }

    onMoveTypeChanged(mt: MoveType) {
        this.moveType = mt;
    }
    
    onCellSelected(cell: Vector2 | null) {
        if(!cell) return; 
        let tips = this.moveTips.getTips(this.matrix, this.moveType, this.player);
        if(!tips.find((a: Vector2) => JSON.stringify(a) == JSON.stringify(cell))) return;
        console.log(`prepared move ${this.moveType} on cell ${cell}`);
    }
}
