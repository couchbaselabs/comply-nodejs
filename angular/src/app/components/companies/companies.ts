import {Component} from "@angular/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {Router} from "@angular/router";
import {AuthManager} from "../../authmanager";
import {ICompany} from "../../interfaces";
import {Utility} from "../../utility";

@Component({
    selector: "companies",
    viewProviders: [HTTP_PROVIDERS, AuthManager, Utility],
    templateUrl: "./app/components/companies/companies.html"
})
export class CompaniesPage {

    http: Http;
    companies: Array<ICompany>;
    utility: Utility;

    constructor(http: Http, router: Router, authManager: AuthManager, utility: Utility) {
        if (!authManager.isAuthenticated()) {
            router.navigate(["/auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.companies = [];
        this.utility.makeGetRequest("/api/company/getAll", []).then((result) => {
            this.companies = <Array<ICompany>> result;
        }, (error) => {
            console.error(error);
        });
    }

    create(name: string, street: string, city: string, state: string, zip: string, country: string, phone: string, website: string) {
        this.utility.makePostRequest("/api/company/create", [], {
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
        }).then((result) => {
            this.companies.push(<ICompany> result);
        }, (error) => {
            console.error(error);
        });
    }
}
