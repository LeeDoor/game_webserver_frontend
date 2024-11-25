import { AccountData, NetworkManager } from "./network_manager.js";

export class AccountManager {
    network = new NetworkManager();
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
        return true;
    }

    async connect() : Promise<boolean> {
        let parsed = this.parseData();
        if(parsed) {
            if(parsed.token && this.network.validateToken(parsed.token)) 
                return this.saveData(parsed);
        }
        else{
            parsed.login = this.generatedLogin();
            parsed.password = this.generatedPassword();
        }
        let token : string | null = await this.network.login(parsed);
        if(token) {
            parsed.token = token;
            return this.saveData(parsed);
        }
        let registered : boolean = await this.network.register(parsed);
        if (registered) {
            parsed.token = await this.network.login(parsed);
            return parsed.token == null ? false : this.saveData(parsed);
        }
        return false;
    }
} 