export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y?: number) {
        this.x = x;
        this.y = y ?? x;
    }
    public lengthSquare() { 
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    public length() {
        Math.sqrt(this.lengthSquare());
    }
    public multed(nx: number, ny?: number) : Vector2 {
        return new Vector2(this.x * nx, this.y * (ny ?? nx));
    }
}
