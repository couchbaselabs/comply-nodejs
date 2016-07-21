import {Component} from "@angular/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {ITask, IProject, IUser} from "../../interfaces";
import {Utility} from "../../utility";

@Component({
    selector: "tasksRO",
    viewProviders: [HTTP_PROVIDERS, Utility],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "./app/components/tasks/tasksRO.html"
})
export class TasksROPage {

    http: Http;
    project: IProject;
    projectId: string;
    utility: Utility;

    constructor(http: Http, route: ActivatedRoute, router: Router, utility: Utility) {
        this.http = http;
        this.utility = utility;
        route.params.subscribe(params => {
            this.projectId = params["url"];
        });
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
