import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {RouteParams} from "angular2/router";

export interface ITask {
    id?: string,
    name: string,
    description: string,
    owner: string,
    assignedTo: string
}

export interface IProject {
    id: string,
    name: string,
    description: string
}

export interface IProjectUser {
    id?: string,
    firstname?: string,
    lastname?: string,
    email: string
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
    users: Array<Object>;
    projectUsers: Array<Object>;
    project: IProject;
    projectId: string;

    constructor(http: Http, routeParams: RouteParams) {
        this.http = http;
        this.project = {
            id: "1234",
            name: "meh",
            description: "blah"
        }
        this.projectId = routeParams.get("projectId");
        //this.getProject(routeParams.get("projectId"));
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
        this.getUsers();
        this.projectUsers = [];
        this.http.get("/api/task/getAll/" + routeParams.get("projectId"))
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
        });
    }

    getUsers() {
        this.users = [];
        this.http.get("/api/user/getAll")
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.users.push(
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

    getProject(projectId: string) {
        //this.project = {};
        this.http.get("/api/task/getAll/" + projectId)
        .subscribe((success) => {
            var jsonResponse = success.json();
            console.log(JSON.stringify(success.json()));
            this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    create(name: string, description: string, owner: string, assignedTo: string) {
        var postBody: ITask = {
            name: name,
            description: description,
            owner: owner,
            assignedTo: assignedTo
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/task/create/" + this.projectId,
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            console.log(JSON.stringify(success.json()));
            postBody.id = success.json()._id;
            this.tasks.push(postBody);
        }, (error) => {
            //alert("ERROR -> " + JSON.stringify(error));
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

    addUser(projectUser: string) {
        var postBody = {
            email: projectUser,
            projectId: this.project.id
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/project/addUser",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            //postBody.id = success.json()._id;
            console.log(JSON.stringify(success.json()));
            this.projectUsers.unshift({id: success.json()._id, firstname: success.json().name.first});
        }, (error) => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
