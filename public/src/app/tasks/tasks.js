"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var TasksPage = (function () {
    function TasksPage(http, routeParams) {
        this.http = http;
        this.project = {
            id: "1234",
            name: "Project 1",
            description: "Description 1"
        };
        this.tasks = [
            {
                id: "1234",
                name: "Task 1",
                description: "Description 1"
            },
            {
                id: "4321",
                name: "Task 2",
                description: "Description 2"
            }
        ];
        /*this.http.get("/api/task/findAll/" + routeParams.get("projectId"))
        .subscribe((success) => {
            var jsonResponse = success.json();
            for(var i = 0; i < jsonResponse.length; i++) {
                this.tasks.push(
                    {
                        id: jsonResponse[i]._id,
                        name: jsonResponse[i].name,
                        description: jsonResponse[i].description
                    }
                );
            }
        }, (error) => {
            console.error(JSON.stringify(error));
        });*/
    }
    TasksPage.prototype.create = function (name, description) {
        var _this = this;
        var postBody = {
            name: name,
            description: description
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/task/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            postBody.id = success.json()._id;
            _this.tasks.push(postBody);
        }, function (error) {
            //alert("ERROR -> " + JSON.stringify(error));
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    TasksPage = __decorate([
        core_1.Component({
            selector: "tasks",
            viewProviders: [http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            templateUrl: 'app/tasks/tasks.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams])
    ], TasksPage);
    return TasksPage;
})();
exports.TasksPage = TasksPage;