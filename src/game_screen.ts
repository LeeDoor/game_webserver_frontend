import { Viewport } from "./viewport.js";
export abstract class GameScreen {
    viewport: Viewport;

    update(timestamp: number): void {
        this.viewport.update(timestamp);
    }
    abstract draw(): void;
    
    clear(): void {
        this.viewport.clearScreen();
    }

    init(canvas: HTMLCanvasElement) {
        this.viewport = new Viewport(canvas);
    }
}
export const FRAMERATE = 60; // request animation frame is max 60
export const FRAME_INTERVAL = 1000 / FRAMERATE;