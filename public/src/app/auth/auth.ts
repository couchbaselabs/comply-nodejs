import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";
import {AuthManager} from "../authmanager";
import {IUser} from "../interfaces";

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
            }, (error) => {
                console.error(error);
            });
        }
    }

    register(firstname: string, lastname: string, street: string, city: string, state: string, zip: string, country: string, phone: string, email: string, password: string, company: string) {
        var postBody: IUser = {
            name: {
                first: firstname,
                last: lastname
            },
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: country
            },
            email: email,
            phone: phone,
            password: password,
            company: company
        }
        this.authManager.register(postBody).then((result) => {
            this.authManager.login(email, password).then((result) => {
                this.router.navigate(["Projects"]);
            }, (error) => {
                console.error(error);
            });
        }, (error) => {
            console.error(error);
        });;
    }

}
