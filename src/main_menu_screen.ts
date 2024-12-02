import { Button } from "./button.js";
import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";

export class MainMenuScreen extends GameScreen {
    buttons: Button[];
    animationTime = 3000;

    viewport: UIViewport;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.buttons = [
            new Button(new Vector2(100), new Vector2(800, 400), "aboba", "red"),
        ];
    }

    init(canvas: HTMLCanvasElement) {
        this.viewport = new UIViewport(canvas);
        this.viewports = [this.viewport];
    }

    draw(): void {
        for(let button of this.buttons) {
            button.draw(this.viewport);
        }
    }
}