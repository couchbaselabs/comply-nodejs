import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";
import {AuthManager} from "../authmanager";

export interface IPerson {
    id?: string,
    firstname: string,
    lastname: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    email: string,
    company: Object
}

@Component({
    selector: "auth",
    viewProviders: [HTTP_PROVIDERS, AuthManager]
})

@View({
    templateUrl: "app/auth/auth.html"
})

export class AuthPage {

    http: Http;
    authManager: AuthManager;
    router: Router;
    companies: Array<Object>;

    constructor(http: Http, router: Router, authManager: AuthManager) {
        this.router = router;
        this.authManager = authManager;
        this.http = http;
        this.companies = [];
        this.http.get("/api/company/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.companies.push(
                    {
                        id: jsonResponse[i]._id,
                        name: jsonResponse[i].name
                    }
                );
            }
        }, (error) => {
            console.error(error.json());
        });
    }

    login(email: string, password: string) {
        if (!email || email == "") {
            console.error("Email must exist");
        } else if (!password || password == "") {
            console.error("Password must exist");
        } else {
            this.authManager.login(email, password).then((result) => {
                this.router.navigate(["Projects"]);
                console.log(result);
            }, (error) => {
                console.error(error);
            });
        }
    }

    register(firstname: string, lastname: string, street: string, city: string, state: string, zip: string, country: string, phone: string, email: string, company: string) {
        var postBody: IPerson = {
            firstname: firstname,
            lastname: lastname,
            street: street,
            city: city,
            state: state,
            country: country,
            zip: zip,
            phone: phone,
            email: email,
            company: company
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/user/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            //this.people.push(success.json());
            console.log(success.json());
        }, (error) => {
            console.error(error.json());
        });
    }

}
