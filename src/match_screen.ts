import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { UIViewport } from "./ui_viewport.js";
import { GameViewport } from "./game_viewport.js";
import { Layer } from "./layer.js";
import { Grid } from "./grid.js";
import * as Network from './network_manager.js';

export class MatchScreen extends GameScreen {
    gamelayer!: Layer;
    matrix!: Matrix;
    matrixDrawer!: MatrixDrawer;
    gridManager!: gridManager;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
    }

    init(canvas: HTMLCanvasElement) {
        this.gamelayer = new Layer(new GameViewport(canvas));
        this.layers = [this.gamelayer];

        Network.game.getSessionState().then(ss => {
            if (!ss) { 
                console.log('unable to load session');
                return;
            }
            this.gridManager = new GridManager(new Vector2(ss.map_size.width, ss.map_size.height));
            this.matrix = new Matrix(this.gridManager);
            this.matrixDrawer = new MatrixDrawer(this.gridManager, this.matrix);

            Object.assign(this.matrix, ss);
            this.matrix.init();
            this.gamelayer.subscribeDraw(this.matrixDrawer);
        });
    }
}
