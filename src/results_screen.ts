import { BaseScreen as BaseScreen, GameState, RedirectionMethod } from "./base_screen.js";
import { Button } from "./button.js";
import { Layer } from "./layer.js";
import { account, game } from "./network_manager.js";
import { TextBlock } from "./text_block.js";
import { UIViewport } from "./ui_viewport.js";
import { Vector2 } from "./vector2.js";

export class GameResultsScreen extends BaseScreen {
    resultTB!: TextBlock;
    leaveButton!: Button;
    layer!: Layer;
    constructor(rm: RedirectionMethod){
        super(rm);
    }
    init(canvas: HTMLCanvasElement): void {
        this.resultTB = new TextBlock("loading match result..", new Vector2(0.5, 0.3));    
        this.leaveButton = new Button(new Vector2(0.5, 0.8), new Vector2(0.4, 0.15), 
            () => this.redirectionMethod(GameState.MainMenu), "to main menu");
        this.layer = new Layer(new UIViewport(canvas));
        this.layers = [this.layer];
        this.layer.subscribeDraw(this.resultTB);
        this.layer.subscribeDraw(this.leaveButton);
        this.layer.subscribeClick(this.leaveButton);

        game.getSessionResult().then((winner: string | null) => {
            if(winner && winner == account.ld.login!) {
                this.resultTB.text = "You won!";
            }
            else this.resultTB.text = "You lost!";
        });
    }
}
