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
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.project = { name: "", description: "", owner: {}, users: [], tasks: [] };
        this.users = [];
        this.taskId = routeParams.get("taskId");
        this.getUsers();
        this.task = { id: "", name: "", description: "", owner: null, assignedTo: { name: {} }, users: [], history: [] };
        this.http.get("/api/task/get/" + routeParams.get("taskId"))
            .subscribe(function (success) {
            var jsonResponse = success.json();
            _this.task = {
                id: jsonResponse.task._id,
                name: jsonResponse.task.name,
                description: jsonResponse.task.description,
                owner: jsonResponse.task.owner,
                assignedTo: jsonResponse.task.assignedTo,
                history: jsonResponse.task.history,
                users: jsonResponse.task.users
            };
            _this.getProject(jsonResponse.projectId);
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }
    TaskPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.http.get("/api/project/get/" + projectId)
            .subscribe(function (success) {
            var jsonResponse = success.json();
            _this.project = {
                id: jsonResponse._id,
                name: jsonResponse.name,
                description: jsonResponse.description,
                owner: jsonResponse.owner,
                users: jsonResponse.users,
                tasks: jsonResponse.tasks
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
                userId: this.authManager.getAuthToken(),
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
    TaskPage.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.http.get("/api/user/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.users.push({
                    id: jsonResponse[i]._id,
                    firstname: jsonResponse[i].name.first,
                    lastname: jsonResponse[i].name.last,
                    email: jsonResponse[i].email
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TaskPage.prototype.change = function (event) {
        var postBody = {
            userId: event.target.value,
            taskId: this.taskId
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/task/assignUser",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            console.log({ id: success.json()._id, name: { "first": success.json().name.first, "last": success.json().name.last } });
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    TaskPage.prototype.parseDate = function (date) {
        var d = new Date(date);
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
