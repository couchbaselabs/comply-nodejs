import {Component} from "@angular/core";
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {ITask, IProject, IUser} from "../../interfaces";
import {Utility} from "../../utility";

@Component({
    selector: "taskRO",
    viewProviders: [HTTP_PROVIDERS, Utility],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "./app/components/task/taskRO.html"
})
export class TaskROPage {

    project: IProject;
    task: ITask;
    comment: String;
    http: Http;
    projectId: string;
    taskId: string;
    taskUser: string;
    users: Array<IUser>;
    utility: Utility;

    constructor(route: ActivatedRoute, http: Http, router: Router, utility: Utility) {
        this.http = http;
        this.utility = utility;
        this.users = [];
        route.params.subscribe(params => {
            this.taskId = params["url"];
        });
        this.project = { _id: "", name: "", description: "", owner: <IUser> {}, users: [], tasks: [], permalink:"" };
        this.task = { _id: "", name: "", description: "", owner: null, assignedTo: {name: {}}, users: [], history: [], permalink :""};
        this.getTask(this.taskId);
    }

    getTask(taskId) {
        this.utility.makeGetRequest("/api/task/link", [taskId]).then((result: any) => {
          console.log("taskId:",[taskId]);
            this.task = <ITask> result.task;
            this.getProject(result.projectId);
        }, (error) => {
            console.error(error);
        });
    }

    getProject(projectId: string) {
        this.utility.makeGetRequest("/api/project/get", [projectId]).then((result) => {
            this.project = <IProject> result;
        }, (error) => {
            console.log(error);
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
