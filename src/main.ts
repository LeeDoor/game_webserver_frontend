
import {Vector2} from "./vector2.js";
import {Viewport} from "./viewport.js";


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const abobus = new Image();
const style = getComputedStyle(canvas);
canvas.width = parseFloat(style.width);
canvas.height = parseFloat(style.height);
abobus.src = "abobus.png";

let viewport : Viewport = new Viewport(canvas);

abobus.addEventListener("load", function (e) {
    for(let i = 0; i < 5; i++) {
        setTimeout(function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            viewport.position = new Vector2(i * 100, i * 100);
            viewport.drawImage(abobus, new Vector2(0, 0)); 
        },i * 1000);
    }
});