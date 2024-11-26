import { Button } from "./button.js";
import { GameScreen } from "./game_screen.js";
import { Vector2 } from "./vector2.js";

export class MainMenuScreen extends GameScreen {
    buttons: Button[];
    animationTime = 3000;

    constructor() {
        super();
        this.buttons = [
            new Button(new Vector2(100), new Vector2(800, 400), "aboba", "red"),
        ];
    }

    draw(): void {
        for(let button of this.buttons) {
            button.draw(this.viewport);
        }
    }
}