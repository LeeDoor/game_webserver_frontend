import { account } from "./game.js";
import { GameScreen, GameState, RedirectionMethod } from "./game_screen.js";
import { Layer } from "./layer.js";
import { TextBlock } from "./text_block.js";
import { UIViewport } from "./ui_viewport.js";
import { Vector2 } from "./vector2.js";

export class QueueScreen extends GameScreen {
    layer: Layer;
    queueTB: TextBlock;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
    }
    init(canvas: HTMLCanvasElement): void {
        this.layer = new Layer(new UIViewport(canvas));
        this.layers.push(this.layer);

        this.queueTB = new TextBlock("Searching for opponent...", new Vector2(1, 0.1), new Vector2(0.5), "coral");
        this.layer.subscribeDraw(this.queueTB);
        this.joinQueue().then(res => {
            if(res) this.redirectionMethod(GameState.MainMenu);
            this.redirectionMethod(GameState.Login);
        });
    }

    async joinQueue() : Promise<boolean>{ 
        if(!account.ld.token) return false;
        let enqueued = await account.network.enqueue(account.ld.token);
        if(!enqueued) return false;
        let sesssionId : string | null = await account.network.waitForOpponent(account.ld.token);
        if(sessionId) account.sessionId = sessionId;
        return sesssionId != null;
    }
}