import { EventApplier } from "./event_applier.js";
import { EventList } from "./event_list.js";
import { BaseScreen, GameState, RedirectionMethod } from "./base_screen.js";
import { StateUpdateNotifier } from "./state_update_notifier.js";
import { GameViewport } from "./game_viewport.js";
import { GridClickRecorder } from "./grid_click_recorder.js";
import { GridManager } from "./grid_manager.js";
import { Layer } from "./layer.js";
import { Matrix } from "./matrix.js";
import { MatrixDrawer } from "./matrix_drawer.js";
import { MoveManager } from "./move_manager.js";
import { MoveTips, MoveType } from "./move_tips.js";
import { MoveTipsDrawer } from "./move_tips_drawer.js";
import * as Network from './network_manager.js';
import { ScreenButtonsManager } from "./screen_buttons_manager.js";
import { Vector2 } from "./vector2.js";

export class MatchScreen extends BaseScreen {
    gamelayer!: Layer;
    matrix!: Matrix;
    matrixDrawer!: MatrixDrawer;
    gridManager!: GridManager;
    moveTipsDrawer!: MoveTipsDrawer;
    gridClickRecorder!: GridClickRecorder;
    moveManager!: MoveManager;
    gameUpdateNotifier!: StateUpdateNotifier;
    eventApplier!: EventApplier;
    buttonsManager!: ScreenButtonsManager;

    constructor(redirectionMethod: RedirectionMethod) {
        super(redirectionMethod);
        this.layers = [];
    }

    async init(canvas: HTMLCanvasElement) {
        this.gamelayer = new Layer(new GameViewport(canvas));
        this.layers = [this.gamelayer];
        let consts = await Network.network.gameConsts();
        let moveTips = new MoveTips(consts);
        let ss = await Network.game.getSessionState();
        if (!ss) {
            console.log('unable to load session');
            return;
        }
        this.buttonsManager = new ScreenButtonsManager();
        this.buttonsManager.init();
        this.matrix = new Matrix();
        Object.assign(this.matrix, ss);
        this.matrix.init();
        this.gridManager = new GridManager(new Vector2(ss.map_size.width, ss.map_size.height));
        this.gridManager.recalculate(this.gamelayer.viewport);
        this.matrixDrawer = new MatrixDrawer(this.gridManager, this.matrix);
        this.gridClickRecorder = new GridClickRecorder(this.gridManager);
        this.moveTipsDrawer = new MoveTipsDrawer(moveTips, this.matrix, this.gridManager);
        this.moveManager = new MoveManager(this.matrix, moveTips);
        this.gameUpdateNotifier = new StateUpdateNotifier(this.matrix, (gs: GameState) => this.redirectionMethod(gs));
        this.eventApplier = new EventApplier(this.matrix);
        this.subscribeDependencies();
    }
    subscribeDependencies() {
        this.gamelayer.subscribeRecalculate(this.gridManager);
        this.gamelayer.subscribeDraw(this.matrixDrawer);
        this.gamelayer.subscribeDraw(this.moveTipsDrawer);
        this.gamelayer.subscribeClick(this.gridClickRecorder);
        this.gridClickRecorder.subscribe((p: Vector2 | null) => this.moveManager.onCellSelected(p));
        this.buttonsManager.subscribe((mt: MoveType) => this.moveTipsDrawer.notifyMoveType(mt));
        this.buttonsManager.subscribe((mt: MoveType) => this.moveManager.onMoveTypeChanged(mt));
        this.gameUpdateNotifier.subscribe((el: EventList) => 
            {this.eventApplier.onEventListCaptured(el);});
        this.gameUpdateNotifier.subscribe((_: EventList) => 
            {this.moveTipsDrawer.notifyCurrentPlayerChanged();});
    }
}
