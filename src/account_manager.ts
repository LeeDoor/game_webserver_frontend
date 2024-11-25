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
        this.ld = ad;
        return true;
    }

    async connect() : Promise<boolean> {
        let parsed = this.parseData();
        if(parsed != null) {
            this.ld = parsed;
            if(this.ld.token && this.network.validateToken(this.ld.token)) 
                return this.saveData(this.ld);
        }
        else{
            this.ld = new AccountData();
            this.ld.login = this.generatedLogin();
            this.ld.password = this.generatedPassword();
        }
        let token : string | null = await this.network.login(this.ld);
        if(token) {
            this.ld.token = token;
            return this.saveData(this.ld);
        }
        let registered : boolean = await this.network.register(this.ld);
        if (registered) {
            this.ld.token = await this.network.login(this.ld);
            return this.ld.token == null ? false : this.saveData(this.ld);
        }
        return false;
    }
} 