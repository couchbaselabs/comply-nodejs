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
var router_1 = require("angular2/router");
var http_1 = require("angular2/http");
var authmanager_1 = require("../authmanager");
var TaskPage = (function () {
    function TaskPage(routeParams, http, router, authManager) {
        var _this = this;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.getProject(routeParams.get("projectId"));
        this.taskId = routeParams.get("taskId");
        this.task = { id: "", name: "", description: "", users: [], history: [] };
        this.http.get("/api/task/get/" + routeParams.get("taskId"))
            .subscribe(function (success) {
            var jsonResponse = success.json();
            console.log(JSON.stringify(jsonResponse));
            _this.task = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description,
                history: jsonResponse.history,
                users: jsonResponse.users
            };
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }
    TaskPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.project = {};
        this.http.get("/api/project/get/" + projectId)
            .subscribe(function (success) {
            var jsonResponse = success.json();
            _this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description
            };
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TaskPage.prototype.reply = function (comment) {
        var _this = this;
        if (comment && comment != "") {
            var postBody = {
                log: comment,
                userId: "a37237a1-21eb-42a0-8395-bf9bb0b8c92b",
                taskId: this.taskId
            };
            var requestHeaders = new http_1.Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: "/api/task/addHistory",
                body: JSON.stringify(postBody),
                headers: requestHeaders
            }))
                .subscribe(function (success) {
                console.log(success.json());
                _this.task.history.unshift(success.json());
            }, function (error) {
                console.error(JSON.stringify(error));
            });
        }
        this.comment = "";
    };
    TaskPage.prototype.addUser = function (taskUser) {
        var _this = this;
        if (taskUser && taskUser != "") {
            var postBody = {
                email: taskUser,
                taskId: this.taskId
            };
            var requestHeaders = new http_1.Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: "/api/task/addUser",
                body: JSON.stringify(postBody),
                headers: requestHeaders
            }))
                .subscribe(function (success) {
                _this.task.users.unshift({ id: success.json()._id, name: { "first": success.json().name.first, "last": success.json().name.last } });
            }, function (error) {
                console.error(JSON.stringify(error));
            });
            this.taskUser = "";
        }
    };
    TaskPage = __decorate([
        core_1.Component({
            selector: "task",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager]
        }),
        core_1.View({
            templateUrl: "app/task/task.html"
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, router_1.Router, authmanager_1.AuthManager])
    ], TaskPage);
    return TaskPage;
})();
exports.TaskPage = TaskPage;
