import { IDrawable, IUpdateable } from "./types.js"
import { Viewport } from "./viewport.js"
import { Vector2 } from "./vector2.js"
import { Sprite } from "./sprite_manager.js"

export class GameObject implements IDrawable, IUpdateable {
    img : Sprite;
    position : Vector2;
    constructor(position? :Vector2) {
        this.img = new Sprite("abobus4.png", new Vector2(200, 200));
        this.position = position ?? new Vector2(200, 200);
    }
    draw(vp: Viewport): void {
        vp.drawImage(this.img, this.position);
    }
    update(timestamp : number): void {
        console.log("updated: " + timestamp);
    }

}