import { BaseObject } from "./base_object.js";
import * as Network from "./network_manager.js";

export class Player extends BaseObject {
    actor_id: number;
    login: string;

    constructor() {
        super();
        this.actor_id = 0;
        this.login = "";
        this.spriteScale = 2;
    }
    init() {
        if (Network.account.ld.login == this.login)
            this.drawSprite = "green_dino";
        else this.drawSprite = "red_dino";
    }
}
