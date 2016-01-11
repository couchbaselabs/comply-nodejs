import {Component, View} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

@Component({
    selector: 'task',
    viewProviders: [HTTP_PROVIDERS]
})

@View({
    templateUrl: 'app/task/task.html'
})

export class TaskPage {

    project: Object;
    task: Object;
    users: Array<Object>;
    activity: Array<Object>;
    comment: String;
    http: Http;

    constructor(routeParams: RouteParams, http: Http) {
        this.http = http;
        this.project = {
            id: "1234",
            name: "test",
            description: "some description here",
            "owner": "nraboy",
            "createdat": 1,
            tasks: 1,
            users: 5
        }

        this.task = {
            id: "1234",
            name: "Test Task",
            description: "a sample description for a task"
        }

        this.users = [
            {
                firstname: "Nic",
                lastname: "Raboy"
            }
        ]

        this.activity = [];

        this.http.get("/api/project/get/" + routeParams.get("id"))
        .subscribe((success) => {
            var jsonResponse = success.json();
            console.log(JSON.stringify(jsonResponse));
            for(var i = 0; i < jsonResponse.length; i++) {
                this.project = {
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name,
                    description: jsonResponse[i].description
                }
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });
    }

    reply(comment: String) {
        if(comment && comment != "") {
            this.activity.unshift({
                content: comment,
                name: "Nic Raboy"
            });
        }
        this.comment = "";
    }

    addUser() {
        this.users.unshift({
            firstname: "Todd",
            lastname: "Greenstein"
        });
    }
}
