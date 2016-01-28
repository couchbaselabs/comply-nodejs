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
var authmanager_1 = require("../authmanager");
var utility_1 = require("../utility");
var TasksPage = (function () {
    function TasksPage(http, routeParams, router, authManager, utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.projectId = routeParams.get("projectId");
        this.project = { _id: "", name: "", description: "", owner: {}, users: [], tasks: null, permalink: "" };
        this.getProject(this.projectId);
        this.getUsers();
    }
    TasksPage.prototype.getUsers = function () {
        var _this = this;
        this.utility.makeGetRequest("/api/user/getAll", []).then(function (result) {
            _this.users = result;
        }, function (error) {
            console.log(error);
        });
    };
    TasksPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.utility.makeGetRequest("/api/project/get", [projectId]).then(function (result) {
            _this.project = result;
            console.log("This project:", _this.project);
        }, function (error) {
            console.log(error);
        });
    };
    TasksPage.prototype.create = function (name, description, assignedTo) {
        var _this = this;
        this.utility.makePostRequest("/api/task/create", [this.projectId], {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            assignedTo: assignedTo,
            users: [],
            history: []
        }).then(function (result) {
            _this.project.tasks.push(result);
        }, function (error) {
            console.error(error);
        });
    };
    TasksPage.prototype.addUser = function (projectUser) {
        var _this = this;
        if (projectUser && projectUser != "") {
            this.utility.makePostRequest("/api/project/addUser", [], { email: projectUser, projectId: this.project._id }).then(function (result) {
                _this.project.users.unshift(result);
            }, function (error) {
                console.error(error);
            });
            this.projectUser = "";
        }
    };
    TasksPage = __decorate([
        core_1.Component({
            selector: "tasks",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager, utility_1.Utility]
        }),
        core_1.View({
            templateUrl: "app/tasks/tasks.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams, router_1.Router, authmanager_1.AuthManager, utility_1.Utility])
    ], TasksPage);
    return TasksPage;
}());
exports.TasksPage = TasksPage;
