import {
    Component,
    View,
    provide
} from "angular2/core";

import {bootstrap} from "angular2/platform/browser";

import {
    RouteConfig,
    RouterLink,
    RouterOutlet,
    Route,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    Router
} from "angular2/router";

import { CompaniesPage } from "./companies/companies";
import { ProjectsPage } from "./projects/projects";
import { TaskPage } from "./task/task";
import { UsersPage } from "./users/users";
import { TasksPage } from "./tasks/tasks";

@Component({
    selector: "my-app",
    templateUrl: "./app/app.html",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: "/companies", as: "Companies", component: CompaniesPage },
    { path: "/", as: "Projects", component: ProjectsPage },
    { path: "/task/:projectId/:taskId", as: "Task", component: TaskPage },
    { path: "/users", as: "Users", component: UsersPage },
    { path: "/tasks/:projectId", as: "Tasks", component: TasksPage }
])

class App {

    router: Router;
    location: Location;

    constructor(router: Router, location: Location) {
        this.router = router;
        this.location = location;
    }

}

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);
