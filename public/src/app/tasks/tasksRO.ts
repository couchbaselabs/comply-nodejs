import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {RouteParams, Router} from "angular2/router";
import {ITask, IProject, IUser} from "../interfaces";
import {Utility} from "../utility";

@Component({
    selector: "tasksRO",
    viewProviders: [HTTP_PROVIDERS, Utility]
})

@View({
    templateUrl: "app/tasks/tasksRO.html"
})

export class TasksROPage {

    http: Http;
    project: IProject;
    projectId: string;
    utility: Utility;

    constructor(http: Http, routeParams: RouteParams, router: Router, utility: Utility) {

        this.http = http;
        this.utility = utility;
        this.projectId = routeParams.get("url");
        this.project = { _id: "", name: "", description: "", owner: <IUser> {}, users: [], tasks: null, permalink:"" };
        this.getProject(this.projectId);
    }

    getProject(projectId: string) {
        this.utility.makeGetRequest("/api/project/link", [projectId]).then((result) => {
            this.project = <IProject> result;
        }, (error) => {
            console.log(error);
        });
    }


}
