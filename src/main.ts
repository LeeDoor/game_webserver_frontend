import * as Screen from "./canvas.js";
import {Game} from "./game.js";

console.log(window.location.href.split('/').slice(0, 3).join('/'));
let game = new Game();
Screen.loadCanvas(() => game.start());
