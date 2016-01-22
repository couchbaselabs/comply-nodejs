import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {RouteParams, Router} from "angular2/router";
import {AuthManager} from "../authmanager";
import {ITask, IProject} from "../interfaces";

@Component({
    selector: "tasks",
    viewProviders: [HTTP_PROVIDERS, AuthManager]
})

@View({
    templateUrl: "app/tasks/tasks.html"
})

export class TasksPage {

    http: Http;
    users: Array<Object>;
    project: IProject;
    projectId: string;
    projectUser: string;
    authManager: AuthManager;

    constructor(http: Http, routeParams: RouteParams, router: Router, authManager: AuthManager) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.projectId = routeParams.get("projectId");
        this.project = { id: "", name: "", description: "", owner: {}, users: [], tasks: null };
        this.getProject(routeParams.get("projectId"));
        this.getUsers();
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

    create(name: string, description: string, assignedTo: string) {
        var postBody: ITask = {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            assignedTo: assignedTo,
            users: [],
            history: []
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
            this.project.tasks.push(success.json());
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    addUser(projectUser: string) {
        if (projectUser && projectUser != "") {
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
                this.project.users.unshift({id: success.json()._id, name: {"first": success.json().name.first, "last": success.json().name.last}});
            }, (error) => {
                alert(error.json().message);
                console.error(JSON.stringify(error.json()));
            });
            this.projectUser = "";
        }
    }

}
