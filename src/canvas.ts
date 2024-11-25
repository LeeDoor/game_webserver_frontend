export let canvas : HTMLCanvasElement;
export let ctx : CanvasRenderingContext2D;
export let style : CSSStyleDeclaration;

// loads canvas. should be called at the program startup.
export function loadCanvas(after?: ()=>void) {
    document.addEventListener("DOMContentLoaded", (event) => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        ctx  = canvas.getContext("2d");
        style = getComputedStyle(canvas);
        canvas.width = parseFloat(style.width) * 3;
        canvas.height = parseFloat(style.height) * 3;
        if(after) after();
    });
}