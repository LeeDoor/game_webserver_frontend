import * as Screen from "./canvas.js";
import {Game} from "./game.js";

let game = new Game();
Screen.loadCanvas(function() {
        game.start()
    }
);
