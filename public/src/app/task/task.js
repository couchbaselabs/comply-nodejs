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
var authmanager_1 = require("../authmanager");
var utility_1 = require("../utility");
var TaskPage = (function () {
    function TaskPage(routeParams, http, router, authManager, utility) {
        this.authManager = authManager;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.users = [];
        this.taskId = routeParams.get("taskId");
        this.project = { name: "", description: "", owner: {}, users: [], tasks: [], permalink: "" };
        this.task = { _id: "", name: "", description: "", owner: null, assignedTo: { name: {} }, users: [], history: [], permalink: "" };
        this.getTask(this.taskId);
        this.getUsers();
    }
    TaskPage.prototype.getTask = function (taskId) {
        var _this = this;
        this.utility.makeGetRequest("/api/task/get", [taskId]).then(function (result) {
            _this.task = result.task;
            console.log("this.history:", result.task.history);
            _this.getProject(result.projectId);
        }, function (error) {
            console.error(error);
        });
    };
    TaskPage.prototype.getProject = function (projectId) {
        var _this = this;
        this.utility.makeGetRequest("/api/project/get", [projectId]).then(function (result) {
            _this.project = result;
        }, function (error) {
            console.log(error);
        });
    };
    TaskPage.prototype.reply = function (comment) {
        var _this = this;
        if (comment && comment != "") {
            this.utility.makePostRequest("/api/task/addHistory", [], { log: comment, userId: this.authManager.getAuthToken(), taskId: this.taskId }).then(function (result) {
                _this.task.history.unshift(result);
            }, function (error) {
                console.error(error);
            });
        }
        this.comment = "";
    };
    TaskPage.prototype.savePhoto = function (description) {
        var _this = this;
        this.utility.makeFileRequest("/api/cdn/add", [], this.userPhoto, description, this.authManager.getAuthToken(), this.taskId).then(function (result) {
            _this.task.history.unshift(result);
        }, function (error) {
            console.error(error);
        });
    };
    TaskPage.prototype.fileEventUpload = function (photo) {
        this.userPhoto = photo.target.files[0];
    };
    TaskPage.prototype.addUser = function (taskUser) {
        var _this = this;
        if (taskUser && taskUser != "") {
            this.utility.makePostRequest("/api/task/addUser", [], { email: taskUser, taskId: this.taskId }).then(function (result) {
                _this.task.users.unshift(result);
            }, function (error) {
                console.error(error);
            });
            this.taskUser = "";
        }
    };
    TaskPage.prototype.getUsers = function () {
        var _this = this;
        this.utility.makeGetRequest("/api/user/getAll", []).then(function (result) {
            _this.users = result;
        }, function (error) {
            console.error(error);
        });
    };
    TaskPage.prototype.change = function (event) {
        this.utility.makePostRequest("/api/task/assignUser", [], { userId: event.target.value, taskId: this.taskId }).then(function (result) {
            console.log(result);
        }, function (error) {
            console.error(error);
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
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager, utility_1.Utility]
        }),
        core_1.View({
            templateUrl: "app/task/task.html"
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, http_1.Http, router_1.Router, authmanager_1.AuthManager, utility_1.Utility])
    ], TaskPage);
    return TaskPage;
})();
exports.TaskPage = TaskPage;
