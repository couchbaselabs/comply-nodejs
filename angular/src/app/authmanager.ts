import {Injectable, Inject} from "@angular/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {IUser} from "./interfaces";
import {Utility} from "./utility";

@Injectable()

export class AuthManager {

    http: Http;
    utility: Utility;

    constructor(http: Http, utility: Utility) {
        this.http = http;
        this.utility = utility;
    }

    isAuthenticated() {
        if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
            return false;
        } else {
            return true;
        }
    }

    getAuthToken() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"))._id;
        } else {
            return null;
        }
    }

    getUserEmail() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user")).email;
        } else {
            return null;
        }
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.utility.makeGetRequest("/api/user/login", [email, password]).then((result) => {
                if(result) {
                    localStorage.setItem("user", JSON.stringify(result));
                    resolve(result);
                } else {
                    reject("User not found");
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    logout() {
        localStorage.clear();
    }

    register(user: IUser) {
        return this.utility.makePostRequest("/api/user/create", [], user);
    }

}
