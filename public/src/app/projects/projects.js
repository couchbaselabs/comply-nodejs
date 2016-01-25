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
var ProjectsPage = (function () {
    function ProjectsPage(http, router, authManager, utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.getProjects();
        this.getOtherProjects();
        this.getAssignedTasks();
    }
    ProjectsPage.prototype.getProjects = function () {
        var _this = this;
        this.utility.makeGetRequest("/api/project/getAll", [this.authManager.getAuthToken()]).then(function (result) {
            _this.projects = result;
        }, function (error) {
            console.error(error);
        });
    };
    ProjectsPage.prototype.getOtherProjects = function () {
        var _this = this;
        this.otherProjects = [];
        this.utility.makeGetRequest("/api/project/getOther", [this.authManager.getAuthToken()]).then(function (result) {
            _this.otherProjects = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].owner._id != _this.authManager.getAuthToken()) {
                    _this.otherProjects.push(result[i]);
                }
            }
        }, function (error) {
            console.error(error);
        });
    };
    ProjectsPage.prototype.getAssignedTasks = function () {
        var _this = this;
        this.utility.makeGetRequest("/api/task/getAssignedTo", [this.authManager.getAuthToken()]).then(function (result) {
            _this.assignedTasks = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].owner._id != _this.authManager.getAuthToken()) {
                    _this.assignedTasks.push(result[i]);
                }
            }
        }, function (error) {
            console.error(error);
        });
    };
    ProjectsPage.prototype.create = function (name, description) {
        var _this = this;
        this.utility.makePostRequest("/api/project/create", [], {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            users: [],
            tasks: []
        }).then(function (result) {
            _this.projects.push(result);
        }, function (error) {
            console.error(error);
        });
    };
    ProjectsPage = __decorate([
        core_1.Component({
            selector: "projects",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager, utility_1.Utility]
        }),
        core_1.View({
            templateUrl: "app/projects/projects.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authmanager_1.AuthManager, utility_1.Utility])
    ], ProjectsPage);
    return ProjectsPage;
})();
exports.ProjectsPage = ProjectsPage;
