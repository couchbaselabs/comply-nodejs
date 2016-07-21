import {Component} from "@angular/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {AuthManager} from "../../authmanager";
import {IProject, ITask, IUser} from "../../interfaces";
import {Utility} from "../../utility";

@Component({
    selector: "projects",
    viewProviders: [HTTP_PROVIDERS, AuthManager, Utility],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "./app/components/projects/projects.html"
})
export class ProjectsPage {

    http: Http;
    projects: Array<Object>;
    otherProjects: Array<IProject>;
    assignedTasks: Array<ITask>;
    authManager: AuthManager;
    utility: Utility;

    constructor(http: Http, router: Router, authManager: AuthManager, utility: Utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["/auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.getProjects();
        this.getOtherProjects();
        this.getAssignedTasks();
    }

    getProjects() {
        this.utility.makeGetRequest("/api/project/getAll", [this.authManager.getAuthToken()]).then((result) => {
            this.projects = <Array<IProject>> result;
        }, (error) => {
            console.error(error);
        });
    }

    getOtherProjects() {
        this.otherProjects = [];
        this.utility.makeGetRequest("/api/project/getOther", [this.authManager.getAuthToken()]).then((result: Array<IProject>) => {
            this.otherProjects = [];
            for(var i = 0; i < result.length; i++) {
                if(result[i].owner._id != this.authManager.getAuthToken()) {
                    this.otherProjects.push(result[i]);
                }
            }
        }, (error) => {
            console.error(error);
        });
    }

    getAssignedTasks() {
        this.utility.makeGetRequest("/api/task/getAssignedTo", [this.authManager.getAuthToken()]).then((result: Array<ITask>) => {
            this.assignedTasks = [];
            for(var i = 0; i < result.length; i++) {
                if(result[i].owner._id != this.authManager.getAuthToken()) {
                    this.assignedTasks.push(result[i]);
                }
            }
        }, (error) => {
            console.error(error);
        });
    }

    create(name: string, description: string) {
        this.utility.makePostRequest("/api/project/create", [], {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            users: [],
            tasks: []
        }).then((result) => {
            this.projects.push(result);
        }, (error) => {
            console.error(error);
        });
    }

}
