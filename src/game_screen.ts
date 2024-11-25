import { Viewport } from "./viewport.js";

export interface GameScreen {
    update(timestamp: number): void;
    draw(): void;
    clear(): void;
}

export class LoginScreen implements GameScreen {
    viewport: Viewport;
    constructor(canvas: HTMLCanvasElement) {
        this.viewport = new Viewport(canvas);
    }
    clear(): void {
        this.viewport.clearScreen();
    }
    update(timestamp: number): void {
        this.viewport.update(timestamp);
    }
    draw(): void {
        this.viewport.drawText("BORIS IS SO OMEGA ABOBUS");
        console.log("AAA");
    }

}
