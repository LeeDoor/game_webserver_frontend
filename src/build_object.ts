import { BaseObject } from "./base_object.js";
import { Cell } from "./cell.js";
import { NewDirObjectEvent, NewObjectEvent} from "./event_list.js";
import { GameObject, ObjectType } from "./game_object.js";
import { Player } from "./player.js";
import { SessionState } from "./session_state_t.js";
import { Vector2 } from "./vector2.js";

export function gameObjectFromEvent(type: ObjectType, owner: string, e: NewObjectEvent) {
    let data: any = {
            actor_id: e.new_actor_id,
            position: e.position,
            owner: owner,
            type: type
        }; 
    if('direction' in e) {
        data.direction = (e as NewDirObjectEvent).direction;
    }
    let res = gameObjectFromAny(data); 
    return res;
}

export function sessionStateFromAny(data: any): SessionState {
    let res = new SessionState();
    Object.assign(res, data);
    res.terrain = res.terrain.map((cell: Cell) => cellFromAny(cell));
    res.players = res.players.map((player: Player) => playerFromAny(player));
    res.objects = res.objects.map((obj: GameObject) => gameObjectFromAny(obj));
    return res;
}

function cellFromAny(c: any): Cell {
    let res = new Cell();
    Object.assign(res, c);
    baseObjectFromAny(res, c);
    return res;
}
function playerFromAny(p: any): Player {
    let res = new Player();
    Object.assign(res, p);
    baseObjectFromAny(res, p);
    return res;
}
function gameObjectFromAny(go: any): GameObject {
    let res = new GameObject();
    Object.assign(res, go);
    res.direction = 'direction' in go? go.direction : null;
    baseObjectFromAny(res, go);
    return res;
}
function baseObjectFromAny(object: BaseObject, bo: any) {
    object.position = vectorFromAny(bo.position);
    object.init();
}
function vectorFromAny(v: any): Vector2{
    let res = new Vector2();
    res.x = v.x;
    res.y = v.y;
    return res;
}
