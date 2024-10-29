import * as Screen from "./canvas.js";
import {Vector2} from "./vector2.js";
import {Viewport} from "./viewport.js";

Screen.loadCanvas(function (){
    Screen.ctx.beginPath();
    Screen.ctx.arc(50, 50, 50, 0, Math.PI * 2);
    Screen.ctx.fillStyle = 'green';
    Screen.ctx.fill();
});
