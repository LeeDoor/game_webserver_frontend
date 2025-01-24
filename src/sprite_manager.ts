let root: string = "img";
export class Sprite {
    img: HTMLImageElement;
    constructor(src: string) {
        this.img = new Image();
        this.img.src = src;
    }
}
export class SpriteManager {
    sprites: { [key: string]: Sprite };
    names = ["gun", "bomb",
        "red_dino", "green_dino",
        "grass", "wall"];
    constructor() {
        this.sprites = {};
        this.init(root);
    }
    init(path: string) {
        for (let name of this.names) {
            this.sprites[name] = new Sprite(path + "/" + name + ".svg");
        }
    }
}
export let sm = new SpriteManager();
