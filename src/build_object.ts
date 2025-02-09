import { NewDirObjectEvent, NewObjectEvent} from "./event_list.js";
import { GameObject, ObjectType } from "./game_object.js";

export function buildObject(type: ObjectType, owner: string, e: NewObjectEvent) {
    let data: any = {
            actor_id: e.new_actor_id,
            position: e.position,
            owner: owner,
            type: type
        }; 
    if(e instanceof NewDirObjectEvent) {
        data.direction = (e as NewDirObjectEvent).direction;
    }
    let res = Object.assign(new GameObject(), data);
    res.init();
    return res;
}
