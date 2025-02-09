import { EventList } from "./event_list.js";
import { IObservable } from "./i_observable.js";
import { Matrix } from "./matrix.js";
import { account, game, network } from "./network_manager.js";

export class GameUpdateNotifier extends IObservable<EventList> {
    matrix: Matrix;
    constructor(mx: Matrix){
        super();
        this.matrix = mx;
        this.capture();
    }
    capture(){
        network.sessionStateChange(game.sessionId!, account.ld.token!, this.matrix.move_number)
            .then((el: EventList | null) => this.handleEventList(el));
    }
    handleEventList(el: EventList | null) {
       if(!el) {
            console.log("event is broken");
            return;
       }
       this.notify(el);
       this.capture();
    }
}
