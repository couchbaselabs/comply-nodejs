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
var ProjectsPage = (function () {
    function ProjectsPage(http) {
        var _this = this;
        this.http = http;
        this.projects = [
            {
                id: "1234",
                name: "test project 1",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                id: "52342",
                name: "test project 2",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                id: "8789",
                name: "test project 3",
                "owner": "nraboy",
                "createdat": 1,
                tasks: 1,
                users: 5,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ];
        this.owners = [
            {
                id: "1234",
                firstname: "Nic",
                lastname: "Raboy"
            },
            {
                id: "1234",
                firstname: "Todd",
                lastname: "Greenstein"
            }
        ];
        this.http.get("/api/project/getAll")
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
            console.error(JSON.stringify(error));
        });
    }
    ProjectsPage.prototype.create = function (name, description, owner) {
        var _this = this;
        var postBody = {
            name: name,
            description: description
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
            selector: 'projects',
            viewProviders: [http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            templateUrl: 'app/projects/projects.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProjectsPage);
    return ProjectsPage;
})();
exports.ProjectsPage = ProjectsPage;
