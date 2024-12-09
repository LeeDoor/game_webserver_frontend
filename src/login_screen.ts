import { account } from "./game.js";
import { GameScreen, GameState, RedirectionMethod} from "./game_screen.js";
import { Layer } from "./layer.js";
import { TextBlock } from "./text_block.js";
import { UIViewport } from "./ui_viewport.js";
import { Vector2 } from "./vector2.js";

export class LoginScreen extends GameScreen {
    layer: Layer;
    loadingTB: TextBlock;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.loadingTB = new TextBlock("loading...", new Vector2(1, 0.1), new Vector2(0.5), "coral");
    }

    init(canvas: HTMLCanvasElement): void {
        this.layer = new Layer(new UIViewport(canvas));
        this.layers.push(this.layer);
        this.layer.subscribeDraw(this.loadingTB);
        account.connect().then((connected: boolean) => this.onConnection(connected));
    }

    onConnection(connected: boolean){
        if(connected){
            this.loadingTB.text = "Connected!";
            (()=> this.redirectionMethod(GameState.MainMenu))();
        }
        else{
            this.loadingTB.text = "Unable to login...";
            account.connect().then((connected: boolean) => this.onConnection(connected));
        }
    }
}