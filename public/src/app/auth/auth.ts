import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";
import {AuthManager} from "../authmanager";

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

    constructor(http: Http, router: Router, authManager: AuthManager) {
        this.router = router;
        this.authManager = authManager;
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

}
