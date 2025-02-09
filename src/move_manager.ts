import { Matrix } from "./matrix.js";
import { MoveTips, MoveType } from "./move_tips.js";
import { account, game, MoveData, MoveError, network } from "./network_manager.js";
import { Player } from "./player.js";
import { Direction } from "./types.js";
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
        this.prevCell = null;
    }
    errorHandler(err: MoveError | null) {
        if (err)
            console.error(`Move request returned an error with code ${err.error_name}: ${err.description}`);
    } 
    onCellSelected(cell: Vector2 | null) {
        switch(this.getRequirements()) {
            case MoveDataReq.Nothing: {
                return this.sendMove();
            }
            case MoveDataReq.PositionDirection: {
                if(!cell) return;
                if(this.prevCell){
                    let dir: Direction | null = this.getDirection(cell, this.prevCell);
                    if(!dir) return;
                    let prevCell = this.prevCell;
                    this.prevCell = null;
                    return this.sendMove(prevCell, dir);
                } 
                this.prevCell = cell;
            } break;
            case MoveDataReq.Position: {
                if(!cell) return;
                if(!this.verifyCell(cell)) return;
                return this.sendMove(cell);
            }
        } 


    }
    getRequirements() {
        switch(this.moveType){
            case MoveType.Gun:
                return MoveDataReq.PositionDirection;
            case MoveType.Walk:
                case MoveType.Bomb:
                return MoveDataReq.Position;
            case MoveType.Resign:
                return MoveDataReq.Nothing;
        }
    }
    async sendMove(pos?: Vector2, dir?: Direction) {
        return network.move(new MoveData(this.moveType, pos, dir), account.ld.token!, game.sessionId!).then(this.errorHandler);
    }
    verifyCell(cell: Vector2) {
        let tips = this.moveTips.getTips(this.matrix, this.moveType, this.player);
        return tips.find((a: Vector2) => JSON.stringify(a) == JSON.stringify(cell));

    }
    getDirection(to: Vector2, from: Vector2): Direction | null {
        let xs = to.x - from.x;
        let ys = to.y - from.y;
        if(xs == 0 && ys == -1) return Direction.Up; 
        if(xs == 0 && ys == 1) return Direction.Down; 
        if(xs == 1 && ys == 0) return Direction.Right; 
        if(xs == -1 && ys == 0) return Direction.Left; 
        return null;
    }
}

