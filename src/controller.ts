import { Direction } from "./direction.js"

export type MovingFunction = (direction : Direction) => void;
export class Controller {
    captureMovement(func : MovingFunction) {
        document.addEventListener("keydown", function (e : KeyboardEvent) {
            if (e.code == 'KeyW' && (e.ctrlKey || e.metaKey)) {
                func(Direction.Up);
            }
        });
    }
}