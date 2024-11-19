class AccountData {
    login: string;
    password: string;
    token?: string;
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

    
    connect() : boolean {
        let parsed = this.parseData();
        if(parsed) {
            if(parsed.token && this.network.validateToken(parsed.token)) 
                return true;
        }
        else{
            parsed.login = this.generatedLogin();
            parsed.password = this.generatedPassword();
        }
        let token : string | null = this.network.login(parsed);
        if(token) {
            parsed.token = token;
            return true;
        }
        let registered : boolean = this.network.register(parsed);
        if (registered) {
            parsed.token = this.network.login(parsed);
            return parsed.token == null;
        }
        return false;
    }
} 