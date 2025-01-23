import { Vector2 } from "./vector2.js"
let root: string = "img/";
class SpriteTuple {
    frames: number;
    constructor(frames: number){
        this.frames = frames;
    }
}
export class Sprite {
    img: HTMLImageElement;
    filename: string;
    constructor(filename:string){
    	this.filename = filename;
    }
    init(dir: string, size?: Vector2) {
        this.img = size ? new Image(size.x, size.y) : new Image();
        this.img.src = dir + this.filename;
    }
}

export class SpriteManager {
    sprites = {
        effects: [
            new Sprite("fire.svg")
        ],
        objects: { 
            blue_gun: {
                down:[
                    new Sprite("1.svg"),
                    new Sprite("2.svg"),
                    new Sprite("3.svg"),
                    new Sprite("4.svg"),
                ],
                up:[
                    new Sprite("1.svg"),
                    new Sprite("2.svg"),
                    new Sprite("3.svg"),
                    new Sprite("4.svg"),
                ],
                right:[
                    new Sprite("1.svg"),
                    new Sprite("2.svg"),
                    new Sprite("3.svg"),
                    new Sprite("4.svg"),
                ],
            }
        },
        players: {

        },
        terrain: {
            
        },
    };
    constructor() {
        this.init(root, this.sprites);
    }
    init(path: string, cur: Object) {
        if (Array.isArray(cur)) {
            if (cur.length > 0 && cur[0] instanceof Sprite) {
                for(let sp of cur){
                    sp.init(path);
                }
            }
            if (cur.length > 0 && Number.isInteger(cur[0])){
                let frames = cur[0];
                cur = [];
                for(let i:number = 1; i <= frames; ++i) {
                    cur.push(new Sprite("${i}.svg"));
                    cur[i - 1].init(path);         
                }
            }
            return;
        }
        for (const [key, value] of Object.entries(cur)){
            this.init(path + key + '/', value);
        }
    }
}
export let sm = new SpriteManager();
