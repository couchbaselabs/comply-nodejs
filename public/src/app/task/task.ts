import {Component, View} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {AuthManager} from "../authmanager";
import {ITask, IProject} from "../interfaces";

@Component({
    selector: "task",
    viewProviders: [HTTP_PROVIDERS, AuthManager]
})

@View({
    templateUrl: "app/task/task.html"
})

export class TaskPage {

    project: IProject;
    task: ITask;
    comment: String;
    http: Http;
    projectId: string;
    taskId: string;
    taskUser: string;
    authManager: AuthManager;
    users: Array<Object>;

    constructor(routeParams: RouteParams, http: Http, router: Router, authManager: AuthManager) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.project = { name: "", description: "", owner: {}, users: [], tasks: [] };
        this.users = [];
        this.taskId = routeParams.get("taskId");
        this.getUsers();
        this.task = { id: "", name: "", description: "", owner: null, assignedTo: {name: {}}, users: [], history: [] };
        this.http.get("/api/task/get/" + routeParams.get("taskId"))
        .subscribe((success) => {
            var jsonResponse = success.json();
            this.task = {
                id: jsonResponse.task._id,
                name: jsonResponse.task.name,
                description: jsonResponse.task.description,
                owner: jsonResponse.task.owner,
                assignedTo: jsonResponse.task.assignedTo,
                history: jsonResponse.task.history,
                users: jsonResponse.task.users
            };
            this.getProject(jsonResponse.projectId);
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    getProject(projectId: string) {
        this.http.get("/api/project/get/" + projectId)
        .subscribe((success) => {
            var jsonResponse = success.json();
            this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description,
                owner: jsonResponse.owner,
                users: jsonResponse.users,
                tasks: jsonResponse.tasks
            };
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    reply(comment: String) {
        if(comment && comment != "") {
            var postBody = {
                log: comment,
                userId: this.authManager.getAuthToken(),
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
                        lastname: jsonResponse[i].name.last,
                        email: jsonResponse[i].email
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    change(userId) {
        var postBody = {
            userId: userId,
            taskId: this.taskId
        }
        console.log(userId);
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/task/assignUser",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            console.log({id: success.json()._id, name: {"first": success.json().name.first, "last": success.json().name.last}});
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    parseDate(date: string) {
        var d: Date = new Date(date);
        var fullMonth = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return fullMonth[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " @ " + d.toLocaleTimeString();
    }
}
