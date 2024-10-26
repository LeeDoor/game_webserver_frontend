
function initializeMap() {
    const canvas_e = document.getElementById("canvas");
    const canvas = canvas_e as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "orange";
    ctx.font = "48px serif";
    ctx.fillText("kakaya to igra", 10, 50);
}
addEventListener("DOMContentLoaded", initializeMap);