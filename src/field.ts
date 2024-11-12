import { Viewport } from "./viewport.js"
import {GameObject} from "./game_object.js"
export class Field {
    objects : GameObject[];

    init() {
        this.objects = [];
        this.objects.push(new GameObject());
    }
    draw(vp: Viewport): void {
        for (let obj of this.objects) {
            obj.draw(vp);
        }
    }
    update(timestamp : number): void {
        for (let obj of this.objects) {
            obj.update(timestamp);
        }
    }
}