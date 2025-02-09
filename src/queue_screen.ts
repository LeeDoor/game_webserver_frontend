import * as Network from "./network_manager.js";
import { BaseScreen, GameState, RedirectionMethod } from "./base_screen.js";
import { Layer } from "./layer.js";
import { TextBlock } from "./text_block.js";
import { UIViewport } from "./ui_viewport.js";
import { Vector2 } from "./vector2.js";

export class QueueScreen extends BaseScreen {
    layer!: Layer;
    queueTB!: TextBlock;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
    }
    init(canvas: HTMLCanvasElement): void {
        this.queueTB = new TextBlock("Enqueuing...");
        this.layer = new Layer(new UIViewport(canvas));
        this.layer.subscribeDraw(this.queueTB);
        this.layers = [this.layer];
        Network.game.joinMatch(
            () => { this.queueTB.text = "waiting for opponents..."; },
            () => { this.queueTB.text = "opponent found!"; }
        ).then(res => {
            if (res) this.redirectionMethod(GameState.Match);
            else this.redirectionMethod(GameState.MainMenu);
        });
    }
}
