import { GameState, RedirectionMethod } from "./base_screen.js";
import { EventList } from "./event_list.js";
import { IObservable } from "./i_observable.js";
import { Matrix } from "./matrix.js";
import { account, game, network } from "./network_manager.js";

export class StateUpdateNotifier extends IObservable<EventList> {
    matrix: Matrix;
    redirectionMethod: RedirectionMethod;
    constructor(mx: Matrix, rm: RedirectionMethod){
        super();
        this.matrix = mx;
        this.redirectionMethod = rm;
        this.capture();
    }
    capture(){
        network.sessionStateChange(game.sessionId!, account.ld.token!, this.matrix.move_number + 1)
            .then((el: EventList | null) => this.handleEventList(el));
    }
    handleEventList(el: EventList | null) {
       if(!el) {
            this.redirectionMethod(GameState.Result);
            return;
        }
       this.notify(el as EventList);
       this.capture();
    }
}
