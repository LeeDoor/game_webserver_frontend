import { account } from "./game.js";
import { GameScreen, GameState, RedirectionMethod} from "./game_screen.js";
import { UIViewport } from "./ui_viewport.js";

export class LoginScreen extends GameScreen {
    readonly textAnimationInterval = 200;
    intervalToAnimation = this.textAnimationInterval;
    viewport: UIViewport;
    loginText: string;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.loginText = "Logining...";
    }

    init(canvas: HTMLCanvasElement): void {
        this.viewport = new UIViewport(canvas);
        this.viewports = [this.viewport];
        account.connect().then((connected: boolean) => this.onConnection(connected));
    }

    onConnection(connected: boolean){
        if(connected){
            this.loginText = "Connected!";
            (()=> this.redirectionMethod(GameState.MainMenu))();
        }
        else{
            this.loginText = "Unable to login...";
            account.connect().then(this.onConnection);
        }
    }

    update(timestamp: number) {
        super.update(timestamp);
        this.intervalToAnimation -= timestamp;
        if (this.intervalToAnimation < 0) {
            console.log("logining...");
        }
    }
    draw(): void {
        let logpos = this.viewport.size.multed(0.5, 0.3);
        this.viewport.drawText(this.loginText, logpos, null, "coral");
    }
}