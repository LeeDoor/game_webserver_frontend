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
        switch(cellSpread) {
            case CellSpread.Axial: {
                let from = Math.max(0, player.position.x - distance);
                let to = Math.min(player.position.x + distance + 1, matrix.map_size.width);
                for(let i = from; i < to; ++i) {
                    if(matrix.matrix[i][player.position.y].length == 0){
                        res.push(new Vector2(i, player.position.y));
                    }
                }
                from = Math.max(0, player.position.y - distance);
                to = Math.min(player.position.y + distance + 1, matrix.map_size.height);
                for(let i = from; i < to; ++i) {
                    if(matrix.matrix[player.position.x][i].length == 0){
                        res.push(new Vector2(player.position.x, i));
                    }
                }
            } break;

        }
        return res;
    } 
    getCellSpread(mt: MoveType): CellSpread {
        return CellSpread.Axial; 
    }
    getDistance(mt: MoveType): number {
        return 2;
    }
}
