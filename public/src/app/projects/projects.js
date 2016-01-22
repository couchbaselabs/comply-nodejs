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
var ProjectsPage = (function () {
    function ProjectsPage(http, router, authManager) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.getUsers();
        this.getProjects();
    }
    ProjectsPage.prototype.getUsers = function () {
        var _this = this;
        this.owners = [];
        this.http.get("/api/user/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.owners.push({
                    id: jsonResponse[i]._id,
                    firstname: jsonResponse[i].name.first,
                    lastname: jsonResponse[i].name.last
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    };
    ProjectsPage.prototype.getProjects = function () {
        var _this = this;
        this.projects = [];
        this.http.get("/api/project/getAll/" + this.authManager.getAuthToken())
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.projects.push({
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name,
                    description: jsonResponse[i].description
                });
            }
        }, function (error) {
            console.error(error.json());
        });
    };
    ProjectsPage.prototype.create = function (name, description) {
        var _this = this;
        var postBody = {
            name: name,
            description: description,
            owner: this.authManager.getAuthToken(),
            users: [],
            tasks: []
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/project/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            postBody.id = success.json()._id;
            _this.projects.push(postBody);
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    ProjectsPage = __decorate([
        core_1.Component({
            selector: "projects",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager]
        }),
        core_1.View({
            templateUrl: "app/projects/projects.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authmanager_1.AuthManager])
    ], ProjectsPage);
    return ProjectsPage;
})();
exports.ProjectsPage = ProjectsPage;
