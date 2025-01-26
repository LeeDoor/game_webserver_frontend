export class Vector2 {
    x: number;
    y: number;

    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? x ?? 0;
    }
    public lengthSquare() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    public length() {
        Math.sqrt(this.lengthSquare());
    }
    public multed(n: number): Vector2;
    public multed(nx: number, ny: number): Vector2;
    public multed(n: Vector2): Vector2;
    public multed(n: Vector2 | number, ny?: number): Vector2 {
        if (n instanceof Vector2)
            return new Vector2(this.x * n.x, this.y * n.y);
        return new Vector2(this.x * n, this.y * (ny ?? n));
    }
    public added(n: number): Vector2;
    public added(nx: number, ny: number): Vector2;
    public added(n: Vector2): Vector2;
    public added(n: Vector2 | number, ny?: number): Vector2 {
        if (n instanceof Vector2)
            return new Vector2(this.x + n.x, this.y + n.y);
        return new Vector2(this.x + n, this.y + (ny ?? n));
    }
    public inverted(): Vector2 {
        return new Vector2(1 / this.x, 1 / this.y);
    }
    public floor(): Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    public ceil(): Vector2 {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }
}
