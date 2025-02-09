import { BaseObject } from "./base_object.js";
import { gameObjectFromEvent } from "./build_object.js";
import * as Events from "./event_list.js";
import { GameObject, ObjectType } from "./game_object.js";
import { Matrix } from "./matrix.js";
import { Player } from "./player.js";
import { Direction } from "./types.js";
import { Vector2 } from "./vector2.js";

export class EventApplier {
    matrix: Matrix;
    constructor(mx: Matrix){
        this.matrix = mx;
    }

    onEventListCaptured(list: Events.EventList) {
        for(let e of list) {
            new Promise(resolve => setTimeout(resolve, 1000));
            this.handleEvent(e);
        }
    }
    handleEvent(e: Events.Event) {
        let actor = this.matrix.actorIdArray[e.actor_id];
        switch(e.event) {
            case "player_walk":
                this.matrix.moveObject(actor as BaseObject, (e as Events.PositionEvent).position);
                break;
            case "player_place_bomb":
                this.matrix.createObject(gameObjectFromEvent(ObjectType.bomb,
                    (actor as Player).login, 
                    e as Events.NewObjectEvent));
                break;
            case "bomb_explode":
                this.matrix.removeObject(actor as GameObject);
                break;
            case "player_place_gun":
                this.matrix.createObject(gameObjectFromEvent(ObjectType.gun, 
                    (actor as Player).login, 
                    e as Events.NewDirObjectEvent));
                break;
            case "gun_destroy":
                this.matrix.removeObject(actor as GameObject);
                break;
            case "gun_shot":
                this.matrix.createObject(gameObjectFromEvent(ObjectType.bullet, 
                    (actor as GameObject).owner, 
                    e as Events.NewDirObjectEvent)); 
                break;
            case "bullet_fly":
                let shift = this.directionShift((actor as GameObject).direction!);
                let newpos = (actor as GameObject).position;
                newpos = newpos.added(shift);
                this.matrix.moveObject(actor as BaseObject, newpos);
                break;
            case "bullet_destroy":
                this.matrix.removeObject(actor as GameObject);
                break;
            case "bullet_interaction":
                for(let ee of (e as Events.InteractionEvent).happened) {
                    this.handleEvent(ee);
                }
                break;
        } 
        console.log(e.event);
        this.matrix.move_number = Math.max(this.matrix.move_number, e.move_number);
    }
    directionShift(dir: Direction): Vector2 {
        switch(dir) {
            case Direction.Up:
                return new Vector2(0, -1);
            case Direction.Down:
                return new Vector2(0, 1);
            case Direction.Right:
                return new Vector2(1, 0);
            case Direction.Left:
                return new Vector2(-1, 0);
        }
    }
}
