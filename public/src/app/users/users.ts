import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

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
    selector: 'users',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/users/users.html'
})

export class UsersPage {

    http: Http;
    people: Array<Object>;
    companies: Array<Object>;

    constructor(http: Http) {
        this.http = http;
        this.people = [];
        this.http.get("/api/user/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.people.push(
                    {
                        id: jsonResponse[i]._id,
                        name: {
                            first: jsonResponse[i].name.first,
                            last: jsonResponse[i].name.last,
                        },
                        company: jsonResponse[i].company
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
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
            console.error(JSON.stringify(error));
        });
    }

    create(firstname: string, lastname: string, street: string, city: string, state: string, zip: string, country: string, phone: string, email: string, company: string) {
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
            this.people.push(success.json());
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }
}
