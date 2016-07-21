import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RouterConfig, provideRouter } from "@angular/router";
import { HTTP_PROVIDERS } from "@angular/http";
import { AppComponent, environment } from './app/';
import { AuthManager } from "./app/authmanager";
import { Utility } from "./app/utility";

import { AuthPage } from "./app/components/auth/auth";
import { CompaniesPage } from "./app/components/companies/companies";
import { ProjectsPage } from "./app/components/projects/projects";
import { TaskPage } from "./app/components/task/task";
import { TasksPage } from "./app/components/tasks/tasks";
import { TasksROPage } from "./app/components/tasks/tasksRO";
import { TaskROPage } from "./app/components/task/taskRO";

if (environment.production) {
    enableProdMode();
}

export const AppRoutes: RouterConfig = [
    { path: "auth", component: AuthPage },
    { path: "companies", component: CompaniesPage },
    { path: "", component: ProjectsPage },
    { path: "task/:taskId", component: TaskPage },
    { path: "tasks/:projectId", component: TasksPage },
    { path: "p/:url", component: TasksROPage },
    { path: "t/:url", component: TaskROPage }
];

bootstrap(AppComponent, [AuthManager, Utility, [provideRouter(AppRoutes)], HTTP_PROVIDERS]);
