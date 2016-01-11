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
var TaskPage = (function () {
    function TaskPage(routeParams, http) {
        var _this = this;
        this.http = http;
        this.project = {
            id: "1234",
            name: "test",
            description: "some description here",
            "owner": "nraboy",
            "createdat": 1,
            tasks: 1,
            users: 5
        };
        this.task = {
            id: "1234",
            name: "Test Task",
            description: "a sample description for a task"
        };
        this.users = [
            {
                firstname: "Nic",
                lastname: "Raboy"
            }
        ];
        this.activity = [];
        this.http.get("/api/project/get/" + routeParams.get("id"))
            .subscribe(function (success) {
            var jsonResponse = success.json();
            console.log(JSON.stringify(jsonResponse));
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.project = {
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name,
                    description: jsonResponse[i].description
                };
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }
    TaskPage.prototype.reply = function (comment) {
        if (comment && comment != "") {
            this.activity.unshift({
                content: comment,
                name: "Nic Raboy"
            });
        }
        this.comment = "";
    };
    TaskPage.prototype.addUser = function () {
        this.users.unshift({
            firstname: "Todd",
            lastname: "Greenstein"
        });
    };
    TaskPage = __decorate([
        core_1.Component({
            selector: 'task',
            viewProviders: [http_1.HTTP_PROVIDERS]
        }),
        core_1.View({
            templateUrl: 'app/task/task.html'
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http])
    ], TaskPage);
    return TaskPage;
})();
exports.TaskPage = TaskPage;
