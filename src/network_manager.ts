import { createEvent, EventList } from "./event_list.js";
import { sessionStateFromAny } from "./from_any.js";
import { GameConsts } from "./game_consts.js";
import { MoveType } from "./move_tips.js";
import { SessionState } from "./session_state_t.js";
import { Direction } from "./types.js";
import { Vector2 } from "./vector2.js";

export class MoveError{
    error_name: string;
    description: string;

    constructor() {
        this.error_name = "";
        this.description = "";
    }
}

export class MoveData {
    move_type: MoveType;
    position?: Vector2;
    direction?: Direction; 

    constructor(mt: MoveType, pos?: Vector2, dir?: Direction) {
       this.move_type= mt;
       this.position = pos;
       this.direction = dir;
    }
}

class NetworkManager {
    readonly SERVER_URL = window.location.href.split('/').slice(0, 3).join('/'); 

    async login(ad: AccountData): Promise<string | null> {
        let response = await fetch(this.SERVER_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        });
        return response.ok ? (await response.json()).token : null;
    }

    async register(ad: AccountData): Promise<boolean> {
        let res: boolean = false;
        await fetch(this.SERVER_URL + '/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        }).then(response => {
            res = response.ok;
        });
        return res;
    }
    async validateToken(token: string): Promise<boolean> {
        let res: boolean = false; // true if login is valid
        await fetch(this.SERVER_URL + '/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            res = response.ok;
        });
        return res;
    }

    async enqueue(token: string): Promise<boolean | string> {
        let res: boolean | string = false;
        await fetch(this.SERVER_URL + '/api/game/enqueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => { return response.json(); })
            .then(json => {
                if ('error_name' in json) {
                    switch (json.error_name) {
                        case "enqueue_error":
                            res = true;
                            break;
                        case "in_the_match":
                            res = json.sessionId;
                            break;
                    }
                }
                else res = true;
            });
        return res;
    }
    async waitForOpponent(token: string): Promise<string | null> {
        let res: string | null = "";
        await fetch(this.SERVER_URL + '/api/game/wait_for_opponent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if (!response.ok) res = null;
            return response.json();
        }).then(json => {
            res = json.sessionId ?? null;
        });
        return res;
    }
    async sessionState(sessionId: string, token: string): Promise<SessionState | string | null> {
        let res: SessionState | string | null = null;
        await fetch(`${this.SERVER_URL}/api/game/session_state?sessionId=${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => { return response.json(); })
            .then(json => {
                if('winner' in json) {
                    res = json.winner as string;
                    return;
                }
                if (!('error_name' in json)) {
                    res = sessionStateFromAny(json);
                }
            });
        return res;
    }
    async gameConsts(): Promise<GameConsts> {
        let res: GameConsts = new GameConsts();
        await fetch(`${this.SERVER_URL}/api/game/game_consts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => { return response.json(); })
            .then(json => {
                res = Object.assign(new GameConsts, json);
            });
        return res; 
    }
    async move(data: MoveData, token: string, sessionId: string) : Promise<MoveError | null> {
        let res: MoveError | null = null;
        await fetch(`${this.SERVER_URL}/api/game/move?sessionId=${sessionId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(json => {
            if('error_name' in json){
                res = Object.assign(new MoveError(), json);
            }
        });
        return res;
    }
    async sessionStateChange(sessionId: string, token: string, fromMove: number): Promise<EventList | null> {
        let res: EventList | null = null;
        await fetch(`${this.SERVER_URL}/api/game/session_state_change?sessionId=${sessionId}&from_move=${fromMove}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            if (!response.ok) res = null;
            return response.json();
        }).then(json => {
            if(Array.isArray(json)) {
                res = [];
                for(let e of json as EventList) {
                    let event = createEvent(e);
                    if(event)
                        res.push(e); 
                }
            }
            if("state" in json && json.state == "finished") {
                res = null;
            }
        });
        return res;
    }
}

type JoinMatchNotify = () => void;
export class GameManager {
    sessionId: string | null = null;

    async getSessionState(): Promise<SessionState | null> {
        let token = account.ld.token;
        if (!token)
            return null;
        if (!this.sessionId)
            return null;
        let sessionState = await network.sessionState(this.sessionId, token);
        if (!sessionState) {
            return null;
        }
        return sessionState as SessionState;
    }

    async getSessionResult(): Promise<string | null> {
        let winner = await network.sessionState(this.sessionId!, account.ld.token!);
        if(!winner) return null;
        return winner as string;
    }

    async joinMatch(onEnqueued?: JoinMatchNotify, onFound?: JoinMatchNotify): Promise<boolean> {
        let token = account.ld.token;
        if (!token)
            return false;
        let enqueued = await network.enqueue(token);
        let sessionId: string | null = null;
        if (enqueued == false)
            return false;
        if (enqueued != true) {
            sessionId = enqueued;
        }
        if (onEnqueued)
            onEnqueued();
        if (sessionId == null)
            sessionId = await network.waitForOpponent(token);
        this.sessionId = sessionId;
        if (onFound)
            onFound();
        return sessionId != null;
    }
}

export class AccountManager {
    ld = new AccountData();

    generatedLogin() { return "guest_abobus_" + Math.ceil(Math.random() * 1000000) }
    generatedPassword() {
        let password = "";
        let charset = "qwertyuiopasdfghjklzxcvbnm!@#$%^&*()";
        let ints = "0123456789";
        let intm = 0;
        for (let i = 0; i < 15; ++i) {
            password += charset[Math.floor(Math.random() * charset.length)];
            if (Math.random() > intm / password.length) {
                password += ints[Math.floor(Math.random() * ints.length)];
                intm += 1;
            }
        }
        return password;
    }
    parseData(): AccountData | null {
        let login = localStorage.getItem("login");
        let password = localStorage.getItem("password");
        let token = localStorage.getItem("token");
        return (login && password) ? { login, password, token } as AccountData : null;
    }

    saveData(ad: AccountData) {
        localStorage.setItem("login", ad.login);
        localStorage.setItem("password", ad.password);
        if (ad.token)
            localStorage.setItem("token", ad.token);
        this.ld = ad;
        return true;
    }

    async connect(): Promise<boolean> {
        let parsed = this.parseData();
        if (parsed != null) {
            this.ld = parsed;
            if (this.ld.token && await network.validateToken(this.ld.token))
                return this.saveData(this.ld);
        }
        this.ld = new AccountData();
        this.ld.login = this.generatedLogin();
        this.ld.password = this.generatedPassword();

        let token: string | null = await network.login(this.ld);
        if (token) {
            this.ld.token = token;
            return this.saveData(this.ld);
        }
        let registered: boolean = await network.register(this.ld);
        if (registered) {
            this.ld.token = await network.login(this.ld);
            return this.ld.token == null ? false : this.saveData(this.ld);
        }
        return false;
    }
}
class AccountData {
    login: string;
    password: string;
    token: string | null;
    constructor() {
        this.login = "";
        this.password = "";
        this.token = null;
    }
}

export const game = new GameManager();
export const account = new AccountManager();
export const network = new NetworkManager();
