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
    constructor() {}
    tryMove(pressedCells: Vector2[], moveType: MoveType): boolean {
        if(!this.validatePressedCells(pressedCells, this.getRequirements(moveType))) return false;
        this.sendMove(this.makeMoveData(pressedCells, moveType));
        return true;
    }
    validatePressedCells(pressed: Vector2[], mdr: MoveDataReq) {
        switch(mdr) {
        case MoveDataReq.PositionDirection: 
            return pressed.length == 2;
        case MoveDataReq.Position:
            return pressed.length == 1;
        case MoveDataReq.Nothing:
            return pressed.length == 0;
        }
    }
    errorHandler(err: MoveError | null) {
        if (err)
            console.error(`Move request returned an error with code ${err.error_name}: ${err.description}`);
    } 
    makeMoveData(pressedCells: Vector2[], moveType: MoveType): MoveData {
        let pos : Vector2 | undefined = undefined;
        let dir : Direction | undefined = undefined;
        switch(this.getRequirements(moveType)) {
        case MoveDataReq.PositionDirection:
            dir = this.getDirection(pressedCells[1], pressedCells[0])!;
        case MoveDataReq.Position:
            pos = pressedCells[0];
            break;
        }
        return new MoveData(moveType, pos, dir);
    }
    getRequirements(mt: MoveType): MoveDataReq {
        switch(mt) {
            case MoveType.Gun:
                return MoveDataReq.PositionDirection;
            case MoveType.Walk:
            case MoveType.Bomb:
                return MoveDataReq.Position;
            case MoveType.Resign:
                return MoveDataReq.Nothing;
        }
    }
    async sendMove(md: MoveData) {
        return network.move(md, account.ld.token!, game.sessionId!).then(this.errorHandler);
    }
    private getDirection(to: Vector2, from: Vector2): Direction | null {
        let xs = to.x - from.x;
        let ys = to.y - from.y;
        if(xs == 0 && ys == -1) return Direction.Up; 
        if(xs == 0 && ys == 1) return Direction.Down; 
        if(xs == 1 && ys == 0) return Direction.Right; 
        if(xs == -1 && ys == 0) return Direction.Left; 
        return null;
    }
}

