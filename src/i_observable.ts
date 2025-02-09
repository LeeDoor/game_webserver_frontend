export type Notify<Param> = (p: Param) => void;
export class IObservable<Param>{
    subs: Notify<Param>[];

    constructor() {
        this.subs = [];
    }

    subscribe(n: Notify<Param>) {
        this.subs.push(n);
    }

    notify(p: Param) {
        for(let sub of this.subs) {
            sub(p);
        }
    }
}
