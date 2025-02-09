import { BaseObject } from "./base_object.js";

export class Cell extends BaseObject {
    type: string;

    constructor() {
        super();
        this.type = "";
        this.spriteScale = 1;
    }
    init(): void {
        this.drawSprite = this.type;
    }
}
