import { GameScreen, RedirectionMethod } from "./game_screen.js";
import { GameViewport } from "./game_viewport.js";
import { GridManager } from "./grid_manager.js";
import { Layer } from "./layer.js";
import { Matrix } from "./matrix.js";
import { MatrixDrawer } from "./matrix_drawer.js";
import * as Network from './network_manager.js';
import { Vector2 } from "./vector2.js";

export class MatchScreen extends GameScreen {
    gamelayer!: Layer;
    matrix!: Matrix;
    matrixDrawer!: MatrixDrawer;
    gridManager!: GridManager;

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
            this.matrix = new Matrix();
            Object.assign(this.matrix, ss);
            this.matrix.init();
            this.gridManager = new GridManager(new Vector2(ss.map_size.width, ss.map_size.height));
            this.gridManager.recalculate(this.gamelayer.viewport);
            this.matrixDrawer = new MatrixDrawer(this.gridManager, this.matrix);

            this.gamelayer.subscribeRecalculate(this.gridManager);
            this.gamelayer.subscribeDraw(this.matrixDrawer);
        });
    }
}
