import {Component, View} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {AuthManager} from "../authmanager";
import {ITask} from "../interfaces";

@Component({
    selector: "task",
    viewProviders: [HTTP_PROVIDERS, AuthManager]
})

@View({
    templateUrl: "app/task/task.html"
})

export class TaskPage {

    project: Object;
    task: ITask;
    comment: String;
    http: Http;
    projectId: string;
    taskId: string;
    taskUser: string;

    constructor(routeParams: RouteParams, http: Http, router: Router, authManager: AuthManager) {
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.getProject(routeParams.get("projectId"));
        this.taskId = routeParams.get("taskId");
        this.task = { id: "", name: "", description: "", owner: null, assignedTo: {name: {}}, users: [], history: [] };
        this.http.get("/api/task/get/" + routeParams.get("taskId"))
        .subscribe((success) => {
            var jsonResponse = success.json();
            this.task = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description,
                owner: jsonResponse.owner,
                assignedTo: jsonResponse.assignedTo,
                history: jsonResponse.history,
                users: jsonResponse.users
            };
            console.log(this.task);
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    getProject(projectId: string) {
        this.project = {};
        this.http.get("/api/project/get/" + projectId)
        .subscribe((success) => {
            var jsonResponse = success.json();
            this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    reply(comment: String) {
        if(comment && comment != "") {
            var postBody = {
                log: comment,
                userId: "a37237a1-21eb-42a0-8395-bf9bb0b8c92b",
                taskId: this.taskId
            }
            var requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: "/api/task/addHistory",
                body: JSON.stringify(postBody),
                headers: requestHeaders
            }))
            .subscribe((success) => {
                this.task.history.unshift(success.json());
            }, (error) => {
                console.error(JSON.stringify(error));
            });
        }
        this.comment = "";
    }

    addUser(taskUser: string) {
        if (taskUser && taskUser != "") {
            var postBody = {
                email: taskUser,
                taskId: this.taskId
            }
            var requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: "/api/task/addUser",
                body: JSON.stringify(postBody),
                headers: requestHeaders
            }))
            .subscribe((success) => {
                this.task.users.unshift({id: success.json()._id, name: {"first": success.json().name.first, "last": success.json().name.last}});
            }, (error) => {
                console.error(JSON.stringify(error));
            });
            this.taskUser = "";
        }
    }
}
