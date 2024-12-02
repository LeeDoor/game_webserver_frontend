import { BaseViewport } from "./base_viewport.js";

export enum GameState {
    Login,
    MainMenu,
    //Queue,
    //Match
}

export type RedirectionMethod = (redirectTo: GameState) => void;

export abstract class GameScreen {
    viewports: BaseViewport[];
    redirectionMethod: RedirectionMethod;

    constructor(redirectionMethod: RedirectionMethod){
        this.redirectionMethod = redirectionMethod;
    }

    update(timestamp: number) {
        for(let vp of this.viewports){
            vp.update(timestamp);
        }
    }
    abstract draw(): void;
    
    clear(): void {
        for(let vp of this.viewports){
            vp.clearScreen();
        }
    }

    abstract init(canvas: HTMLCanvasElement) : void;
}
export const FRAMERATE = 60; // request animation frame is max 60
export const FRAME_INTERVAL = 1000 / FRAMERATE;