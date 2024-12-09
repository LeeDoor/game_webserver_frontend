import { Button } from "./button.js";
import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";

export class MainMenuScreen extends GameScreen {
    viewport: UIViewport;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
    }

    init(canvas: HTMLCanvasElement) {
        this.viewport = new UIViewport(canvas);
        this.viewports = [this.viewport];
    }

    draw(): void {
        
    }
}