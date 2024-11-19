class LoginData {
    login: string;
    password: string;
    token?: string;
}

let ld = new LoginData();

export class NetworkManager {
    generatedLogin() {return "guest_abobus_" + Math.ceil(Math.random() * 1000000)}
    parseData() {
        ld.login = localStorage.getItem("login") ?? this.generatedLogin();
        if(localStorage.getItem("password")) {
            ld.password = localStorage.getItem("password");
        }
        else{ 
            ld.password = "";
            let charset = "qwertyuiopasdfghjklzxcvbnm!@#$%^&*()";
            for (let i = 0; i < 15; ++i) {
                ld.password += charset[Math.random() * 100 % charset.length];
            }
        }
        localStorage.setItem("login", ld.login);
        localStorage.setItem("password", ld.password);
    }
    login(){
        this.getLoginData();

    }
} 