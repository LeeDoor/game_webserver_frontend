import { SessionState } from "./session_state_t.js";
import { Cell } from "./cell.js";
import { BaseObject } from "./base_object.js";
import { Player } from "./player.js";
import { GameObject } from "./game_object.js";
import { Vector2 } from "./vector2.js";

export class Matrix extends SessionState {
    matrix: BaseObject[][][];
    actorIdArray: (BaseObject | null)[];
    constructor() {
        super();
        this.matrix = [];
        this.actorIdArray = [];
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
            this.createObject(player);
        }
        for (let cell of this.terrain) {
            this.createObject(cell);
        }
        for (let obj of this.objects) {
            this.createObject(obj);
        }
        this.forMatrix((obj: BaseObject) => obj.init());
        
    }
    forMatrix(func: (obj: BaseObject) => void) {
        for (let i = 0; i < this.map_size.width; ++i) {
            for (let j = 0; j < this.map_size.height; ++j) {
                for (let obj of this.matrix[i][j]) {
                    func(obj);
                }
            }
        }
    }
   forActor(func: (obj: BaseObject) => void) {
        for(let actor of this.actorIdArray) {
            if(actor)
                func(actor);
        }
    }
    findPlayer(login: string): Player | null {
        return this.players.find((player: Player) => player.login == login) ?? null;
    }
    createObject(obj: BaseObject) {
        this.matrix[obj.position.x][obj.position.y].push(obj);
        let curlen = Math.max(obj.actor_id + 1, this.actorIdArray.length);
        while(curlen < this.actorIdArray.length) this.actorIdArray.push(null);
        this.actorIdArray[obj.actor_id] = obj;
    }
    moveObject(obj: BaseObject, newpos: Vector2) {
        let idx = this.matrix[obj.position.x][obj.position.y].indexOf(obj);
        if(idx > -1) {
            this.matrix[obj.position.x][obj.position.y].splice(idx, 1);
        }
        this.matrix[newpos.x][newpos.y].push(obj);
        obj.position = newpos;
    }
    removeObject(obj: GameObject) {
        let idx = this.objects.indexOf(obj);
        if(idx > -1) {
            this.objects.splice(idx, 1);
        }
        idx = this.matrix[obj.position.x][obj.position.y].indexOf(obj);
        if(idx > -1) {
            this.matrix[obj.position.x][obj.position.y].splice(idx, 1);
        }
        this.actorIdArray[obj.actor_id] = null;
    }
}
