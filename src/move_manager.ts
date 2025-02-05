import { Matrix } from "./matrix.js";
import { MoveTips, MoveType } from "./move_tips.js";
import { account, game, MoveData, MoveError, network } from "./network_manager.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

enum MoveDataReq {
    Nothing,
    Position,
    PositionDirection
}

export class MoveManager {
    moveType: MoveType;
    player: Player;
    matrix: Matrix;
    moveTips: MoveTips;
    prevCell: Vector2 | null;

    constructor(matrix: Matrix, moveTips: MoveTips) {
        this.matrix = matrix;
        this.moveTips = moveTips;
        this.moveType = MoveType.Walk;
        this.prevCell = null;
        this.player = this.matrix.findPlayer(account.ld.login) ?? new Player();
        if(this.player.login != account.ld.login) 
            console.log(`unable to find player ${account.ld.login} in move_manager.ts`);
    }

    onMoveTypeChanged(mt: MoveType) {
        this.moveType = mt;
    }
    errorHandler(err: MoveError | null) {
        if (err)
            console.error(`Move request returned an error with code ${err.error_name}: ${err.description}`);
    } 
    onCellSelected(cell: Vector2 | null) {
        switch(this.getRequirements(this.moveType)) {
            case MoveDataReq.Nothing:
                return network.move(new MoveData(this.moveType), game.sessionId!).then(this.errorHandler);
            case MoveDataReq.Position:
                let tips = this.moveTips.getTips(this.matrix, this.moveType, this.player);
                if(!tips.find((a: Vector2) => JSON.stringify(a) == JSON.stringify(this.prevCell ?? cell))) {
                    return;
                } 
            case MoveDataReq.PositionDirection:
                let dir = 

                
        }

        console.log(`prepared move ${this.moveType} on cell ${cell}`);
    }
    getRequirements(moveType: MoveType) {
        switch(moveType){
            case MoveType.Gun:
                return MoveDataReq.PositionDirection;
            case MoveType.Walk:
            case MoveType.Bomb:
                return MoveDataReq.Position;
            case MoveType.Resign:
                return MoveDataReq.Nothing;
        }
    }
}
