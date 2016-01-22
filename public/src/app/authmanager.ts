import {Injectable, Inject} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

export interface IUser {
    id?: string,
    name: {
        first: string,
        last: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
    },
    email: string,
    password: string,
    company: Object
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

    getAuthToken() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"))._id;
        } else {
            return null;
        }
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.get("/api/user/login/" + email + "/" + password)
            .subscribe((success) => {
                if(success.json()) {
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
        return new Promise((resolve, reject) => {
            var requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: "/api/user/create",
                body: JSON.stringify(user),
                headers: requestHeaders
            }))
            .subscribe((success) => {
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        })
    }

}
