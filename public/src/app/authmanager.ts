import {Injectable, Inject} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

export interface IUser {
    id?: string,
    name: {
        first: string,
        last: string
    },
    email: string,
    password: string
}

@Injectable()

export class AuthManager {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    isAuthenticated() {
        if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
            return false;
        } else {
            return true;
        }
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.get("/api/user/login/" + email + "/" + password)
            .subscribe((success) => {
                if(success.json().length > 0) {
                    localStorage.setItem("user", JSON.stringify(success.json()));
                    resolve(success.json());
                } else {
                    reject("User not found");
                }
            }, (error) => {
                reject(error.json());
            });
        });
    }

    logout() {
        localStorage.clear();
    }

    register(user: IUser) {

    }

}
