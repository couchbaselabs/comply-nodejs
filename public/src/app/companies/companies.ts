import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";
import {AuthManager} from "../authmanager";
import {ICompany} from "../interfaces";

@Component({
    selector: "companies",
    viewProviders: [HTTP_PROVIDERS, AuthManager]
})

@View({
    templateUrl: "app/companies/companies.html"
})

export class CompaniesPage {

    http: Http;
    companies: Array<Object>;

    constructor(http: Http, router: Router, authManager: AuthManager) {
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.companies = [];
        this.http.get("/api/company/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.companies.push(
                    {
                        id: jsonResponse[i]._id,
                        name: jsonResponse[i].name,
                        city: jsonResponse[i].address.city,
                        state: jsonResponse[i].address.state,
                        website: jsonResponse[i].website
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    create(name: string, street: string, city: string, state: string, zip: string, country: string, phone: string, website: string) {
        var postBody: ICompany = {
            name: name,
            address: {
                street: street,
                city: city,
                state: state,
                country: country,
                zip: zip
            },
            phone: phone,
            website: website
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/company/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            postBody.id = success.json()._id;
            this.companies.push(postBody);
        }, (error) => {
            console.error("ERROR -> " + JSON.stringify(error));
        });
    }
}
