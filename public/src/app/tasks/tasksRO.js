var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var utility_1 = require("../utility");
var TasksROPage = (function () {
    function TasksROPage(http, routeParams, router, utility) {
        this.http = http;
        this.utility = utility;
        this.projectId = routeParams.get("url");
        this.project = { _id: "", name: "", description: "", owner: {}, users: [], tasks: null, permalink: "" };
        this.getProject(this.projectId);
    }
    TasksROPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.utility.makeGetRequest("/api/project/link", [projectId]).then(function (result) {
            _this.project = result;
        }, function (error) {
            console.log(error);
        });
    };
    TasksROPage = __decorate([
        core_1.Component({
            selector: "tasksRO",
            viewProviders: [http_1.HTTP_PROVIDERS, utility_1.Utility]
        }),
        core_1.View({
            templateUrl: "app/tasks/tasksRO.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.RouteParams, router_1.Router, utility_1.Utility])
    ], TasksROPage);
    return TasksROPage;
})();
exports.TasksROPage = TasksROPage;
