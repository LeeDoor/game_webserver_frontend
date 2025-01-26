import { BaseObject } from "./base_object.js";

export class Cell extends BaseObject {
    type: string;
    actor_id: number;

    constructor() {
        super();
        this.type = "";
        this.actor_id = 0;
        this.spriteScale = 1;
    }
    init(): void {
        this.drawSprite = this.type;
    }
}
