import { Button } from "./button.js";
import { GameScreen, GameState, RedirectionMethod } from "./game_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";
import { Layer } from "./layer.js";

enum MenuButtons {
    Play
}

export class MainMenuScreen extends GameScreen {
    layer: Layer;
    buttons: {[key in MenuButtons]: Button};

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
        this.buttons = {
            [MenuButtons.Play]: new Button(new Vector2(0.3, 0.3), "MenuButton", 
            () => {this.redirectionMethod(GameState.Queue);}, 
            "Play", "coral"),
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