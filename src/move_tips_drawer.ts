import { BaseViewport } from "./base_viewport.js";
import { GridManager } from "./grid_manager.js";
import { Matrix } from "./matrix.js";
import { MoveTips, MoveType } from "./move_tips.js";
import { account } from "./network_manager.js";
import { Player } from "./player.js";
import { IDrawable } from "./types.js";
import { Vector2 } from "./vector2.js";

export class MoveTipsDrawer implements IDrawable {
    matrix: Matrix;
    gm: GridManager;
    moveType: MoveType;
    player: Player;
    moveTips: MoveTips;
    tips: Vector2[];
    ourMove: boolean;

    constructor(mt: MoveTips, matrix: Matrix, gm: GridManager) {
        this.moveTips = mt;
        this.tips = [];
        this.matrix = matrix;
        this.gm = gm;
        this.moveType = MoveType.Walk;
        this.player = this.matrix.findPlayer((p) => p.login == account.ld.login) ?? new Player();
        if (this.player.login != account.ld.login) {
            console.log("player not found in MoveTipsDrawer");
        }
        this.ourMove = this.player.login == this.matrix.now_turn;
        this.update();
    }

    update() {
        if(this.ourMove)
            this.tips = this.moveTips.getTips(this.matrix, this.moveType, this.player);
        else this.tips = [];
    }

    draw(vp: BaseViewport): void {
        for(let tip of this.tips) {
            vp.drawRect(this.gm.cellPos(tip), new Vector2(this.gm.cellSize), "rgba(0, 0, 255, 0.3)");
        }
    }

    notifyMoveType(moveType: MoveType) {
        this.moveType = moveType;
        this.update();
    }
    notifyCurrentPlayerChanged() {
        this.ourMove = this.matrix.now_turn == this.player.login;
        this.update();
    }
}
