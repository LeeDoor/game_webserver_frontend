import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";
import { Layer } from "./layer.js";
import { Grid } from "./grid.js";

export class MatchScreen extends GameScreen {
    uilayer: Layer;
    gamelayer: Layer;
    grid: Grid;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
    }

    init(canvas: HTMLCanvasElement) {
        this.uilayer = new Layer(new UIViewport(canvas));
        this.gamelayer = new Layer(new GameViewport(canvas));
        
        this.layers = [this.uilayer, this.gamelayer];
        
        this.grid = new Grid(this.gamelayer.viewport);
        this.gamelayer.subscribeDraw(this.grid);
        this.gamelayer.subscribeOnClick(this.grid);
        this.gamelayer.subscribeUpdate(this.grid);
    }
}