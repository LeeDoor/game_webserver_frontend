import { GameConsts } from "./game_consts.js";
import { Matrix } from "./matrix.js";
import { MoveManager } from "./move_manager.js";
import { account } from "./network_manager.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

export enum MoveType{
    Walk = "walk",
    Bomb = "place_bomb",
    Gun = "place_gun",
    Resign = "resign"
}

enum CellSpread {
    Axial,
    Square,
    None
} 

export class MoveTips {
    private gc: GameConsts;
    cellHistory: Vector2[];
    moveType: MoveType;
    matrix: Matrix;
    player: Player;
    tips: Vector2[];
    moveManager: MoveManager;

    constructor(matrix: Matrix, gc: GameConsts, moveManager: MoveManager) {
        this.gc = gc; 
        this.cellHistory = [];
        this.moveType = MoveType.Walk;
        this.matrix = matrix;
        this.player = matrix.findPlayer((p) => p.login == account.ld.login)!;
        this.tips = [];
        this.moveManager = moveManager;
        this.update();
    }
    onCellSelected(cell: Vector2 | null) {
        if(this.validate(cell)) {
            if (cell) 
                this.cellHistory.push(cell);
            if(this.moveManager.tryMove(this.cellHistory, this.moveType)) {
                this.cellHistory = [];
            }
        }
        this.update();
    }
    onMoveTypeChanged(mt: MoveType){
        this.moveType = mt;
        this.cellHistory = [];
        this.update();
    }
    onMoveReceived() {
        this.update();
    }
    validate(cell: Vector2 | null) {
        return this.tips.length == 0 || cell && this.tips.find((c) => JSON.stringify(c) == JSON.stringify(cell));
    }
    update(player = this.player){
        this.tips = [];
        if(player.login != this.matrix.now_turn) {
            this.cellHistory = [];
            return;
        }
        let cellSpread: CellSpread = this.getCellSpread();
        let distance: number = this.getDistance();
        let fromCell: Vector2 = this.cellHistory.length > 0 ? 
            this.cellHistory[this.cellHistory.length - 1] : 
            player.position; 
        let fromX = Math.max(0, fromCell.x - distance);
        let toX = Math.min(fromCell.x + distance + 1, this.matrix.map_size.width);
        let fromY = Math.max(0, fromCell.y - distance);
        let toY = Math.min(fromCell.y + distance + 1, this.matrix.map_size.height);
        switch(cellSpread) {
            case CellSpread.Axial: {
                for(let i = fromX; i < toX; ++i) {
                    let cell = new Vector2(i, fromCell.y);
                    if(this.matchRestrictions(cell)){
                        this.tips.push(cell);
                    }
                }
                for(let i = fromY; i < toY; ++i) {
                    let cell = new Vector2(fromCell.x, i); 
                    if(this.matchRestrictions(cell))
                        this.tips.push(cell);
                }
            } break;
            case CellSpread.Square: {
                for(let i = fromX; i < toX; ++i) {
                    for(let j = fromY; j < toY; ++j) {
                        let cell = new Vector2(i, j);
                        if(this.matchRestrictions(cell)){
                            this.tips.push(cell);
                        }
                    }
                }

            } break;
        }
    }
    private matchRestrictions(cell: Vector2): boolean {
        switch(this.moveType) {
            case MoveType.Gun:
                if(this.cellHistory.length == 1) 
                    return JSON.stringify(cell) != JSON.stringify(this.cellHistory[0]);
            case MoveType.Walk:
            case MoveType.Bomb:
                return this.matrix.matrix[cell.x][cell.y].length == 0;
            case MoveType.Resign:
                return true;
        }
    }
    private getCellSpread(): CellSpread {
        switch(this.moveType) {
            case MoveType.Gun:
                if(this.cellHistory.length == 1) return CellSpread.Axial;
            case MoveType.Bomb:
                return CellSpread.Square;
            case MoveType.Walk:
                return CellSpread.Axial;
            case MoveType.Resign:
                return CellSpread.None;
        }
    }
    private getDistance(): number {
        switch(this.moveType) {
            case MoveType.Gun:
                if(this.cellHistory.length == 1) return 1;
                return this.gc.gun_place_radius;
            case MoveType.Bomb:
                return this.gc.bomb_place_radius;
            case MoveType.Walk:
                return 1;
            case MoveType.Resign:
                return 0;
        }
    }
}
