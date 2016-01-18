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
        this.projectId = routeParams.get("projectId");
        this.project = { id: "", name: "", description: "", users: null, tasks: null };
        this.getProject(routeParams.get("projectId"));
        this.getUsers();
    }
    TasksPage.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.http.get("/api/user/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.users.push({
                    id: jsonResponse[i]._id,
                    firstname: jsonResponse[i].name.first,
                    lastname: jsonResponse[i].name.last
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TasksPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.http.get("/api/project/get/" + projectId)
            .subscribe(function (success) {
            var jsonResponse = success.json();
            _this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description,
                users: jsonResponse.users,
                tasks: jsonResponse.tasks
            };
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TasksPage.prototype.create = function (name, description, owner, assignedTo) {
        var _this = this;
        var postBody = {
            name: name,
            description: description,
            owner: owner,
            assignedTo: assignedTo
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/task/create/" + this.projectId,
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            postBody.id = success.json()._id;
            _this.project.tasks.push(postBody);
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TasksPage.prototype.addUser = function (projectUser) {
        var _this = this;
        if (projectUser && projectUser != "") {
            var postBody = {
                email: projectUser,
                projectId: this.project.id
            };
            var requestHeaders = new http_1.Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: "/api/project/addUser",
                body: JSON.stringify(postBody),
                headers: requestHeaders
            }))
                .subscribe(function (success) {
                _this.project.users.unshift({ id: success.json()._id, name: { "first": success.json().name.first, "last": success.json().name.last } });
            }, function (error) {
                console.error(JSON.stringify(error));
            });
            this.projectUser = "";
        }
    };
    TasksPage = __decorate([
        core_1.Component({
            selector: "tasks",
            viewProviders: [http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            templateUrl: "app/tasks/tasks.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams])
    ], TasksPage);
    return TasksPage;
})();
exports.TasksPage = TasksPage;
