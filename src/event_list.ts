import { Direction } from "./types.js";
import { Vector2 } from "./vector2.js";
export abstract class Event {
    actor_id: number;
    move_number: number;
    event: string;
    constructor() {
        this.actor_id = 0;
        this.move_number = 0;
        this.event = "";
    }
}
export class EmptyEvent extends Event {
    constructor() {
        super();
    }
}
export class PositionEvent extends Event {
    position: Vector2;
    constructor() {
        super();
        this.position = new Vector2();
    }
}

export class NewObjectEvent extends PositionEvent {
    new_actor_id: number;
    constructor() {
        super();
        this.new_actor_id = 0;
    }
}

export class NewDirObjectEvent extends NewObjectEvent {
    direction: Direction;
    constructor() {
        super();
        this.direction = Direction.Up;
    }
}

export class InteractionEvent extends Event {
    interacted_actor_id: number;
    happened: Event[];
    constructor() {
        super();
        this.interacted_actor_id = 0;
        this.happened = [];
    }
}
export function createEvent(e: {event: string}): Event | null {
    switch(e.event) {
        case "player_resign":
        case "player_won":
        case "bomb_ticking":
        case "player_explode":
        case "gun_waiting":
        case "gun_destroy":
        case "bullet_fly":
        case "bullet_destroy":
            return Object.assign(new EmptyEvent(), e);
        case "player_walk":
        case "player_place_bomb":
        case "player_place_gun":
            return Object.assign(new PositionEvent(), e);
        case "gun_shot":
            return Object.assign(new NewDirObjectEvent(), e);
        case "bullet_interaction":
            return Object.assign(new InteractionEvent(), e);
    }
    return null;
}

export type EventList = Event[];
