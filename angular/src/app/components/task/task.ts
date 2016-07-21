import {Component} from "@angular/core";
import {ActivatedRoute, Router, ROUTER_DIRECTIVES} from "@angular/router";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import {AuthManager} from "../../authmanager";
import {ITask, IProject, IUser} from "../../interfaces";
import {Utility} from "../../utility";

@Component({
    selector: "task",
    viewProviders: [HTTP_PROVIDERS, AuthManager, Utility],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: "./app/components/task/task.html"
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
    users: Array<IUser>;
    utility: Utility;
    userPhoto: File;

    constructor(route: ActivatedRoute, http: Http, router: Router, authManager: AuthManager, utility: Utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["/auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.users = [];
        route.params.subscribe(params => {
            this.taskId = params["taskId"];
        })
        this.project = { _id: "", name: "", description: "", owner: <IUser> {}, users: [], tasks: [], permalink:"" };
        this.task = { _id: "", name: "", description: "", owner: null, assignedTo: {name: {}}, users: [], history: [], permalink :""};
        this.getTask(this.taskId);
        this.getUsers();
    }

    getTask(taskId) {
        this.utility.makeGetRequest("/api/task/get", [taskId]).then((result: any) => {
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

    reply(comment: String) {
        if(comment && comment != "") {
            this.utility.makePostRequest("/api/task/addHistory", [], {log: comment, userId: this.authManager.getAuthToken(), taskId: this.taskId}).then((result) => {
                this.task.history.unshift(result);
            }, (error) => {
                console.error(error);
            });
        }
        this.comment = "";
    }

    savePhoto(description:string){
        this.utility.makeFileRequest("/api/cdn/add", [], this.userPhoto, description, this.authManager.getAuthToken(), this.taskId).then((result) => {
            this.task.history.unshift(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileEventUpload(photo:any){
        this.userPhoto=photo.target.files[0];
    }

    addUser(taskUser: string) {
        if (taskUser && taskUser != "") {
            this.utility.makePostRequest("/api/task/addUser", [], {email: taskUser, taskId: this.taskId}).then((result) => {
                this.task.users.unshift(<IUser> result);
            }, (error) => {
                console.error(error);
            });
            this.taskUser = "";
        }
    }

    getUsers() {
        this.utility.makeGetRequest("/api/user/getAll", []).then((result) => {
            this.users = <Array<IUser>> result;
        }, (error) => {
            console.error(error);
        });
    }

    change(event) {
        this.utility.makePostRequest("/api/task/assignUser", [], {userId: event.target.value, taskId: this.taskId}).then((result) => {
            console.log(<IUser> result);
        }, (error) => {
            console.error(error);
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
