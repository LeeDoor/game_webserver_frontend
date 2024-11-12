import { IDrawable } from "./drawable.js"
import { IUpdateable } from "./updateable.js"
import { Viewport } from "./viewport.js"
import { Vector2 } from "./vector2.js"

export class GameObject implements IDrawable, IUpdateable {
    img : HTMLImageElement;
    position : Vector2;
    constructor(position? :Vector2) {
        this.img = new Image(600, 600);
        this.img.src = "abobus.png";
        this.position = position ?? new Vector2(200, 400);
    }
    draw(vp: Viewport): void {
        vp.drawImage(this.img, this.position);
    }
    update(timestamp : number): void {
        console.log("updated: " + timestamp);
    }

}