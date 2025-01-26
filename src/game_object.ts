import { BaseObject } from "./base_object.js";

export enum ObjectType {
    bomb = "bomb",
    gun = "gun",
    bullet = "bullet",
}
export class GameObject extends BaseObject {
    actor_id: number;
    owner: string;
    type: ObjectType;

    constructor() {
        super();
        this.actor_id = 0;
        this.owner = "";
        this.type = ObjectType.bomb;
    }
    init(): void {
        this.drawSprite = this.type;
    }
}
