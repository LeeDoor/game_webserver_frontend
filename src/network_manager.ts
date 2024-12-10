export class AccountData {
    login: string;
    password: string;
    token?: string;
}

export class NetworkManager {
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