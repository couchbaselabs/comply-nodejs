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
var router_1 = require("angular2/router");
var http_1 = require("angular2/http");
var utility_1 = require("../utility");
var TaskROPage = (function () {
    function TaskROPage(routeParams, http, router, utility) {
        this.http = http;
        this.utility = utility;
        this.users = [];
        this.taskId = routeParams.get("url");
        this.project = { name: "", description: "", owner: {}, users: [], tasks: [], permalink: "" };
        this.task = { _id: "", name: "", description: "", owner: null, assignedTo: { name: {} }, users: [], history: [], permalink: "" };
        this.getTask(this.taskId);
    }
    TaskROPage.prototype.getTask = function (taskId) {
        var _this = this;
        this.utility.makeGetRequest("/api/task/link", [taskId]).then(function (result) {
            console.log("taskId:", [taskId]);
            _this.task = result.task;
            console.log("this.history:", result.task.history);
            _this.getProject(result.projectId);
        }, function (error) {
            console.error(error);
        });
    };
    TaskROPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.utility.makeGetRequest("/api/project/get", [projectId]).then(function (result) {
            _this.project = result;
        }, function (error) {
            console.log(error);
        });
    };
    TaskROPage.prototype.parseDate = function (date) {
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
    TaskROPage = __decorate([
        core_1.Component({
            selector: "taskRO",
            viewProviders: [http_1.HTTP_PROVIDERS, utility_1.Utility]
        }),
        core_1.View({
            templateUrl: "app/task/taskRO.html"
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, router_1.Router, utility_1.Utility])
    ], TaskROPage);
    return TaskROPage;
})();
exports.TaskROPage = TaskROPage;
