import { Viewport } from "./viewport.js";
import { Vector2 } from "./vector2.js";

function initializeMap() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const style = getComputedStyle(canvas);
    canvas.width = parseFloat(style.width);
    canvas.height = parseFloat(style.height);

    // let vp : Viewport = new Viewport();
    // vp.position = new Vector2(0,0);
    // let abobus = new Image();
    // abobus.src = "abobus.png";
    // ctx.drawImage(abobus, 50, 50);
    console.log(5); 
}
addEventListener("DOMContentLoaded", initializeMap);