import { Layer } from "./layer.js";
import { Vector2 } from "./vector2.js";

export enum GameState {
    Login,
    MainMenu,
    Queue,
    Match,
    Result
}

export type RedirectionMethod = (redirectTo: GameState) => void;

export abstract class BaseScreen {
    layers: Layer[];
    redirectionMethod: RedirectionMethod;

    constructor(redirectionMethod: RedirectionMethod){
        this.redirectionMethod = redirectionMethod;
        this.layers = [];
    }

    update(timestamp: number) {
        for(let layer of this.layers){
            layer.update(timestamp);
        }
    }
    draw(): void {
        for(let layer of this.layers) {
            layer.draw();
        }
    }
    recalculate(canvas: HTMLCanvasElement): void {
        for(let layer of this.layers) {
            layer.recalculate(canvas);
        }
    }

    abstract init(canvas: HTMLCanvasElement) : void; 

    mouseEvent(position: Vector2) {
        for(let layer of this.layers) {
            layer.onClick(position);
        }
    }
}
export const FRAMERATE = 60; // request animation frame is max 60
export const FRAME_INTERVAL = 1000 / FRAMERATE;
