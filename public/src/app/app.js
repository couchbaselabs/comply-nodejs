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
var browser_1 = require("angular2/platform/browser");
var router_1 = require("angular2/router");
var http_1 = require("angular2/http");
var authmanager_1 = require("./authmanager");
var companies_1 = require("./companies/companies");
var projects_1 = require("./projects/projects");
var task_1 = require("./task/task");
var users_1 = require("./users/users");
var tasks_1 = require("./tasks/tasks");
var auth_1 = require("./auth/auth");
var App = (function () {
    function App(router, location, authManager) {
        this.router = router;
        this.location = location;
        this.authManager = authManager;
        if (!this.authManager.isAuthenticated()) {
            this.router.navigate(["Auth"]);
        }
    }
    App.prototype.logout = function () {
        this.authManager.logout();
        this.router.navigate(["Auth"]);
    };
    App = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./app/app.html",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: "/companies", as: "Companies", component: companies_1.CompaniesPage },
            { path: "/", as: "Projects", component: projects_1.ProjectsPage },
            { path: "/task/:projectId/:taskId", as: "Task", component: task_1.TaskPage },
            { path: "/users", as: "Users", component: users_1.UsersPage },
            { path: "/tasks/:projectId", as: "Tasks", component: tasks_1.TasksPage },
            { path: "/auth", as: "Auth", component: auth_1.AuthPage }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.Location, authmanager_1.AuthManager])
    ], App);
    return App;
})();
browser_1.bootstrap(App, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, authmanager_1.AuthManager, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
