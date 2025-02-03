import { GameConsts } from "./game_consts.js";
import { SessionState } from "./session_state_t.js";
class NetworkManager {
    readonly SERVER_URL = "http://localhost:8080";

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
    async sessionState(sessionId: string, token: string): Promise<SessionState | null> {
        let res: SessionState | null = null;
        await fetch(`${this.SERVER_URL}/api/game/session_state?sessionId=${sessionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => { return response.json(); })
            .then(json => {
                if (!('error_name' in json)) {
                    res = new SessionState();
                    Object.assign(res, json);
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
        return sessionState;
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
