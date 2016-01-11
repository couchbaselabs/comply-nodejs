import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

export interface IProject {
    id?: string,
    name: string,
    description: string,
    owner: string
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
        this.getUsers();
        this.getProjects();
    }

    getUsers() {
        this.owners = [];
        this.http.get("/api/user/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.owners.push(
                    {
                        id: jsonResponse[i]._id,
                        firstname: jsonResponse[i].name.first,
                        lastname: jsonResponse[i].name.last
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    getProjects() {
        this.projects = [];
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
            description: description,
            owner: owner
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
