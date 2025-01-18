class NetworkManager {
    readonly SERVER_URL = "http://localhost:8000";

    async login(ad: AccountData) : Promise<string | null> {
        let response = await fetch(this.SERVER_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        });    
        return response.ok ? (await response.json()).token : null;
    }

    async register(ad: AccountData) : Promise<boolean> {
        let res : boolean;
        await fetch(this.SERVER_URL + '/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ad)
        }).then(response=>{
            res = response.ok;    
        });    
        return res;
    }
    async validateToken(token: string) : Promise<boolean> {
        let res : boolean = false; // true if login is valid
        await fetch(this.SERVER_URL + '/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        }).then(response=>{
            res = response.ok;
        });
        return res;
    }
    
    async enqueue(token: string) : Promise<boolean>{
        let res : boolean = false;
        await fetch(this.SERVER_URL + '/api/game/enqueue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        }).then(response=>{
            res = response.ok;
        });
        return res;
    }
    async waitForOpponent(token: string) : Promise<string | null> {
        let res : string | null = "";
        await fetch(this.SERVER_URL + '/api/game/wait_for_opponent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }
        }).then(response=>{
            if(!response.ok) res = null;
            return response.json();
        }).then(json=> {
            if(res) res = json.sessionId;
        });
        return res;
    }
}

type Notify = () => void;
export class GameManager {
    sessionId: string | null;

    async joinMatch(onEnqueued?: Notify, onFound?: Notify) : Promise<boolean> {
        let token = account.ld.token;
        if(!token) 
            return false;
        let enqueued = await network.enqueue(token);
        if(!enqueued) 
            return false;
        if (onEnqueued) 
            onEnqueued();
        let sessionId : string | null = await network.waitForOpponent(account.ld.token);
        this.sessionId = sessionId;
        if(onFound)
            onFound();
        return sessionId != null;
    }
}

export class AccountManager {
    ld = new AccountData();

    generatedLogin() {return "guest_abobus_" + Math.ceil(Math.random() * 1000000)}
    generatedPassword() {
        let password = "";
        let charset = "qwertyuiopasdfghjklzxcvbnm!@#$%^&*()";
        for (let i = 0; i < 15; ++i) {
            password += charset[Math.random() * 100 % charset.length];
        }
        return password;
   }
    parseData() : AccountData | null {
        let login = localStorage.getItem("login");
        let password = localStorage.getItem("password");
        let token = localStorage.getItem("token");
        return (login && password) ?  {login, password, token} : null;
    }

    saveData(ad: AccountData) {
        localStorage.setItem("login", ad.login);
        localStorage.setItem("password", ad.password);
        if (ad.token) 
            localStorage.setItem("token", ad.token);
        this.ld = ad;
        return true;
    }

    async connect() : Promise<boolean> {
        let parsed = this.parseData();
        if(parsed != null) {
            this.ld = parsed;
            if(this.ld.token && network.validateToken(this.ld.token)) 
                return this.saveData(this.ld);
        }
        else{
            this.ld = new AccountData();
            this.ld.login = this.generatedLogin();
            this.ld.password = this.generatedPassword();
        }
        let token : string | null = await network.login(this.ld);
        if(token) {
            this.ld.token = token;
            return this.saveData(this.ld);
        }
        let registered : boolean = await network.register(this.ld);
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
    token?: string;
}

export const game = new GameManager();
export const account = new AccountManager();
export const network = new NetworkManager();
