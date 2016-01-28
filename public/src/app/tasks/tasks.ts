import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {RouteParams, Router} from "angular2/router";
import {AuthManager} from "../authmanager";
import {ITask, IProject, IUser} from "../interfaces";
import {Utility} from "../utility";

@Component({
    selector: "tasks",
    viewProviders: [HTTP_PROVIDERS, AuthManager, Utility]
})

@View({
    templateUrl: "app/tasks/tasks.html"
})

export class TasksPage {

    http: Http;
    users: Array<IUser>;
    project: IProject;
    projectId: string;
    projectUser: string;
    authManager: AuthManager;
    utility: Utility;

    constructor(http: Http, routeParams: RouteParams, router: Router, authManager: AuthManager, utility: Utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.projectId = routeParams.get("projectId");
        this.project = { _id: "", name: "", description: "", owner: <IUser> {}, users: [], tasks: null, permalink:"" };
        this.getProject(this.projectId);
        this.getUsers();
    }

    getUsers() {
        this.utility.makeGetRequest("/api/user/getAll", []).then((result) => {
            this.users = <Array<IUser>> result;
        }, (error) => {
            console.log(error);
        });
    }

    getProject(projectId: string) {
        this.utility.makeGetRequest("/api/project/get", [projectId]).then((result) => {
            this.project = <IProject> result;
            console.log("This project:",this.project);
        }, (error) => {
            console.log(error);
        });
    }

    create(name: string, description: string, assignedTo: string) {
        this.utility.makePostRequest("/api/task/create", [this.projectId], {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            assignedTo: assignedTo,
            users: [],
            history: []
        }).then((result) => {
            this.project.tasks.push(result);
        }, (error) => {
            console.error(error);
        });
    }

    addUser(projectUser: string) {
        if (projectUser && projectUser != "") {
            this.utility.makePostRequest("/api/project/addUser", [], {email: projectUser, projectId: this.project._id}).then((result) => {
                this.project.users.unshift(result);
            }, (error) => {
                console.error(error);
            });
            this.projectUser = "";
        }
    }

}
