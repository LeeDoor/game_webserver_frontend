import { Direction } from "./types.js"

export type MovingFunction = (direction : Direction) => void;
export class Controller {
    public captureMovement(func : MovingFunction) {
        document.addEventListener("keydown", function (e : KeyboardEvent) {        
            switch (e.code){
                case 'KeyW':
                    return func(Direction.Up);
                case 'KeyD':
                    return func(Direction.Right);
                case 'KeyS':
                    return func(Direction.Down);
                case 'KeyA':
                    return func(Direction.Left);
            }
        });
    }
}