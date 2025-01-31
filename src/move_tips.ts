import { GameConsts } from "./game_consts.js";
import { Matrix } from "./matrix.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

export enum MoveType{
    Walk,
    Bomb,
    Gun
}

enum CellSpread {
    Axial,
    Square
} 

export class MoveTips {
    gc: GameConsts;
    constructor(gc: GameConsts) {
        this.gc = gc; 
    }
    getTips(matrix: Matrix, moveType: MoveType, player: Player): Vector2[] {
        let cellSpread: CellSpread = this.getCellSpread(moveType);
        let distance: number = this.getDistance(moveType);
        let res: Vector2[] = [];
        let fromX = Math.max(0, player.position.x - distance);
        let toX = Math.min(player.position.x + distance + 1, matrix.map_size.width);
        let fromY = Math.max(0, player.position.y - distance);
        let toY = Math.min(player.position.y + distance + 1, matrix.map_size.height);
        switch(cellSpread) {
            case CellSpread.Axial: {
                for(let i = fromX; i < toX; ++i) {
                    if(matrix.matrix[i][player.position.y].length == 0){
                        res.push(new Vector2(i, player.position.y));
                    }
                }
                for(let i = fromY; i < toY; ++i) {
                    let cell = new Vector2(player.position.x, i); 
                    if(this.matchRestrictions(cell, matrix, moveType))
                        res.push(cell);
                }
            } break;
            case CellSpread.Square: {
                for(let i = fromX; i < toX; ++i) {
                    for(let j = fromY; j < toY; ++j) {
                        let cell = new Vector2(i, j);
                        if(this.matchRestrictions(cell, matrix, moveType)){
                            res.push(cell);
                        }
                    }
                }

            } break;
        }
        return res;
    }
    matchRestrictions(cell: Vector2, matrix: Matrix, moveType: MoveType): boolean {
        switch(moveType) {
            case MoveType.Walk:
            case MoveType.Bomb:
            case MoveType.Gun:
                return matrix.matrix[cell.x][cell.y].length == 0;
        }
    }
    getCellSpread(mt: MoveType): CellSpread {
        switch(mt) {
            case MoveType.Gun:
            case MoveType.Bomb:
                return CellSpread.Square;
            case MoveType.Walk:
                return CellSpread.Axial;
        }
    }
    getDistance(mt: MoveType): number {
        switch(mt) {
            case MoveType.Gun:
                return this.gc.gun_place_radius;
            case MoveType.Bomb:
                return this.gc.bomb_place_radius;
            case MoveType.Walk:
                return 1;
        }
    }
}
