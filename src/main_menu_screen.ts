import { Button } from "./button.js";
import { BaseScreen, GameState, RedirectionMethod } from "./base_screen.js";
import { Vector2 } from "./vector2.js";
import { UIViewport } from "./ui_viewport.js";
import { Layer } from "./layer.js";

enum MenuButtons {
    Play
}

export class MainMenuScreen extends BaseScreen {
    layer!: Layer;
    buttons: { [key in MenuButtons]: Button };

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
        this.buttons = {
            [MenuButtons.Play]: new Button(new Vector2(0.5, 0.3), "MenuButton",
                () => { this.redirectionMethod(GameState.Queue); },
                "Play"),
        }
    }

    init(canvas: HTMLCanvasElement) {
        this.layer = new Layer(new UIViewport(canvas));
        this.layers = [this.layer];
        this.subscribeButtons();
    }

    private subscribeButtons() {
        for (let [_, button] of Object.entries(this.buttons)) {
            this.layer.subscribeDraw(button);
            this.layer.subscribeClick(button);
        }
    }
}
