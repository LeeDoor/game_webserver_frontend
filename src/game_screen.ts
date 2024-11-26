import { Viewport } from "./viewport.js";
export abstract class GameScreen {
    viewport: Viewport;

    abstract update(timestamp: number): void;
    abstract draw(): void;
    abstract clear(): void;

    init(canvas: HTMLCanvasElement) {
        this.viewport = new Viewport(canvas);
    }
}
export const FRAMERATE = 60; // request animation frame is max 60
export const FRAME_INTERVAL = 1000 / FRAMERATE;