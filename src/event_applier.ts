import { BaseObject } from "./base_object.js";
import { buildObject } from "./build_object.js";
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
                this.matrix.createObject(buildObject(ObjectType.bomb,
                    (actor as Player).login, 
                    e as Events.NewObjectEvent));
                break;
            case "bomb_explode":
                this.matrix.removeObject(actor as GameObject);
                break;
            case "player_place_gun":
                this.matrix.createObject(buildObject(ObjectType.gun, 
                    (actor as Player).login, 
                    e as Events.NewDirObjectEvent));
                break;
            case "gun_destroy":
                this.matrix.removeObject(actor as GameObject);
                break;
            case "gun_shot":
                this.matrix.createObject(buildObject(ObjectType.bullet, 
                    (actor as GameObject).owner, 
                    e as Events.NewDirObjectEvent)); 
                break;
            case "bullet_fly":
                this.matrix.moveObject(actor as BaseObject, 
                    (actor as GameObject).position.added(
                        this.directionShift((actor as GameObject).direction!)
                    ));
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
    }
    directionShift(dir: Direction): Vector2 {
        switch(dir) {
            case Direction.Up:
                return new Vector2(-1, 0);
            case Direction.Down:
                return new Vector2(1, 0);
            case Direction.Right:
                return new Vector2(0, 1);
            case Direction.Left:
                return new Vector2(0, -1);
        }
    }
}
