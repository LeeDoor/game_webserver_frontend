import { BaseViewport } from "./base_viewport.js"
import { Vector2 } from "./vector2.js"
import { BaseAnimated, BaseClickable, BaseDrawable } from "./types.js";
import { sm, Sprite } from "./sprite_manager.js";
import { SessionState } from "./session_state_t.js";
import { Cell } from "./cell.js";
import { BaseObject } from "./base_object.js";
import { Player } from "./player.js";
import { GameObject } from "./game_object.js";

class Matrix extends SessionState {
    matrix: BaseObject[][][];
    constructor(gridmanager: GridManager) {
        super();
        this.matrix = [];
    }
    init() {
        this.terrain = this.terrain.map(obj => {
            return Object.assign(new Cell(), obj);
        });
        this.players = this.players.map(obj => {
            return Object.assign(new Player(), obj);
        });
        this.objects = this.objects.map(obj => {
            return Object.assign(new GameObject(), obj);
        });
        for (let i = 0; i < this.map_size.width; ++i) {
            this.matrix.push([]);
            for (let j = 0; j < this.map_size.height; ++j) {
                this.matrix[i].push([]);
            }
        }
        for (let player of this.players) {
            this.matrix[player.position.x][player.position.y].push(player);
        }
        for (let cell of this.terrain) {
            this.matrix[cell.position.x][cell.position.y].push(cell);
        }
        for (let obj of this.objects) {
            this.matrix[obj.position.x][obj.position.y].push(obj);
        }
        this.forMatrix((obj: BaseObject) => obj.init());
    }
    forMatrix(func: (obj: BaseObject) => void) {
        for (let i = this.map_size.width - 1; i >= 0; --i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                for (let obj of this.matrix[i][j]) {
                    func(obj);
                }
            }
        }
    }
}
