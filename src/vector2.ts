export class Vector2 {
    x: number;
    y: number;
    lengthSquare() { 
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    length() {
        Math.sqrt(this.lengthSquare());
    }
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
