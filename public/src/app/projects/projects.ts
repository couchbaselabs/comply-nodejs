import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

export interface IProject {
    id?: string,
    name: string,
    description: string,
}

@Component({
    selector: 'projects',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/projects/projects.html'
})

export class ProjectsPage {

    http: Http;
    projects: Array<Object>;
    owners: Array<Object>;

    constructor(http: Http) {
        this.http = http;
        this.projects = [
            {
                id: "1234",
                name: "test project 1",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                id: "52342",
                name: "test project 2",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                id: "8789",
                name: "test project 3",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ];
        this.owners = [
            {
                id: "1234",
                firstname: "Nic",
                lastname: "Raboy"
            },
            {
                id: "1234",
                firstname: "Todd",
                lastname: "Greenstein"
            }
        ]
        this.http.get("/api/project/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.projects.push(
                    {
                        id: jsonResponse[i]._id,
                        name: jsonResponse[i].name,
                        description: jsonResponse[i].description
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    create(name: string, description: string, owner: string) {
        var postBody: IProject = {
            name: name,
            description: description
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/project/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            postBody.id = success.json()._id;
            this.projects.push(postBody);
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
