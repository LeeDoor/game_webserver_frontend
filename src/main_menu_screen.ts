import { Button } from "./button.js";
import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";
import { Layer } from "./layer.js";

enum MenuButtons {
    Play,
    Exit
}

export class MainMenuScreen extends GameScreen {
    layer: Layer;
    buttons: {[key in MenuButtons]: Button};

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
        this.buttons = {
            [MenuButtons.Play]: new Button(new Vector2(0.3, 0.3), new Vector2(0.4, 0.2), "Play", "blue"),
            [MenuButtons.Exit]: new Button(new Vector2(0.3, 0.7), new Vector2(0.4, 0.2), "Exit", "red"),
        }
    }

    init(canvas: HTMLCanvasElement) {
        this.layer = new Layer(new UIViewport(canvas));
        this.layers.push(this.layer);
        this.subscribeButtons();
    }

    private subscribeButtons() {
        for(let [_, button] of Object.entries(this.buttons)) {
            this.layer.subscribeOnClick(button);
        }
    }
}