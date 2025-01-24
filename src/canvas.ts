export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;
export let style: CSSStyleDeclaration;
export let canvasQualityMultiplier = 3;

// loads canvas. should be called at the program startup.
export function loadCanvas(after?: () => void) {
    document.addEventListener("DOMContentLoaded", (event) => {
        canvas = document.getElementById("canvas") as HTMLCanvasElement;
        ctx = canvas.getContext("2d")!;
        updateCanvas(canvas);
        if (after) after();
    });
}
export function updateCanvas(canvas: HTMLCanvasElement) {
    style = getComputedStyle(canvas);
    canvas.width = parseFloat(style.width) * canvasQualityMultiplier;
    canvas.height = parseFloat(style.height) * canvasQualityMultiplier;
}
