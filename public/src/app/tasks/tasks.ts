import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {RouteParams} from "angular2/router";

export interface ITask {
    id?: string,
    name: string,
    description: string,
}

@Component({
    selector: "tasks",
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/tasks/tasks.html'
})

export class TasksPage {

    http: Http;
    tasks: Array<Object>;
    project: Object;

    constructor(http: Http, routeParams: RouteParams) {
        this.http = http;
        this.project = {
            id: "1234",
            name: "Project 1",
            description: "Description 1"
        }
        this.tasks = [
            {
                id: "1234",
                name: "Task 1",
                description: "Description 1"
            },
            {
                id: "4321",
                name: "Task 2",
                description: "Description 2"
            }
        ];
        /*this.http.get("/api/task/findAll/" + routeParams.get("projectId"))
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.tasks.push(
                    {
                        id: jsonResponse[i]._id,
                        name: jsonResponse[i].name,
                        description: jsonResponse[i].description
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });*/
    }

    create(name: string, description: string) {
        var postBody: ITask = {
            name: name,
            description: description
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/task/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            postBody.id = success.json()._id;
            this.tasks.push(postBody);
        }, (error) => {
            //alert("ERROR -> " + JSON.stringify(error));
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
