import { Button } from "./button.js";
import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";

export class MainMenuScreen extends GameScreen {

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
    }

    init(canvas: HTMLCanvasElement) {
    }
}