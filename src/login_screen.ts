import { GameScreen } from "./game_screen.js";
import { UIViewport } from "./ui_viewport.js";

export class LoginScreen extends GameScreen {
    readonly textAnimationInterval = 200;
    intervalToAnimation = this.textAnimationInterval;
    textAnimation: number;
    readonly loginTexts = ["Login.", "Login..", "Login..."];
    viewport: UIViewport;
    constructor() {
        super();
        this.textAnimation = 0;
    }
    init(canvas: HTMLCanvasElement): void {
        this.viewport = new UIViewport(canvas);
        this.viewports = [this.viewport];
    }

    update(timestamp: number): void {
        super.update(timestamp);
        this.intervalToAnimation -= timestamp;
        if (this.intervalToAnimation < 0) {
            this.textAnimation = (this.textAnimation + 1) % this.loginTexts.length;
            this.intervalToAnimation = this.textAnimationInterval;
        }
    }
    draw(): void {
        let logpos = this.viewport.size.multed(0.5, 0.3);
        this.viewport.drawText(this.loginTexts[this.textAnimation], logpos, null, "coral");
    }
}