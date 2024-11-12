export interface IUpdateable{
    // timestamp: time since last update in ms
    update(timestamp : number) : void;
}