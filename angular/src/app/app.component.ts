import { RuntimeCompiler} from '@angular/compiler/src/runtime_compiler';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthManager } from "./authmanager";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {

    router: Router;
    location: Location;
    authManager: AuthManager;

    constructor(router: Router, location: Location, authManager: AuthManager, private _runtimeCompiler: RuntimeCompiler) {
        this._runtimeCompiler.clearCache();
        this.router = router;
        this.location = location;
        this.authManager = authManager;
        if(!this.authManager.isAuthenticated()) {
            this.router.navigate(["/auth"]);
        }
    }

    logout() {
        this.authManager.logout();
        this.router.navigate(["/auth"]);
    }

}
