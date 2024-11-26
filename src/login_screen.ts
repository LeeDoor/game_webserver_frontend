import { GameScreen } from "./game_screen.js";

export class LoginScreen extends GameScreen {
    readonly textAnimationInterval = 200;
    intervalToAnimation = this.textAnimationInterval;
    textAnimation: number;
    readonly loginTexts = ["Login.", "Login..", "Login..."];

    constructor() {
        super();
        this.textAnimation = 0;
    }
    clear(): void {
        this.viewport.clearScreen();
    }
    update(timestamp: number): void {
        this.viewport.update(timestamp);
        this.intervalToAnimation -= timestamp;
        if (this.intervalToAnimation < 0) {
            this.textAnimation = (this.textAnimation + 1) % this.loginTexts.length;
            this.intervalToAnimation = this.textAnimationInterval;
        }
    }
    draw(): void {
        let logpos = this.viewport.size.multed(0.5, 0.3);
        this.viewport.drawText(this.loginTexts[this.textAnimation], logpos, 28, "coral");
    }
}