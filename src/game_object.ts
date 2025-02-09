import { BaseObject } from "./base_object.js";
import { Direction } from "./types.js";

export enum ObjectType {
    bomb = "bomb",
    gun = "gun",
    bullet = "bullet",
}
export class GameObject extends BaseObject {
    owner: string;
    type: ObjectType;
    direction?: Direction;

    constructor() {
        super();
        this.owner = "";
        this.type = ObjectType.bomb;
    }
    init(): void {
        this.drawSprite = this.type;
    }
}
