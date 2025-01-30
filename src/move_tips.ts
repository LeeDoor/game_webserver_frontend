import { Matrix } from "./matrix.js";
import { Player } from "./player.js";
import { Vector2 } from "./vector2.js";

export enum MoveType{
    Walk,
    Bomb,
    Gun
}

export class MoveTips {
    getTips(matrix: Matrix, moveType: MoveType, player: Player):Vector2[] {
        return [
            new Vector2(1,1),
            new Vector2(2,2)
        ];
    } 
}
