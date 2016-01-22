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
var AuthPage = (function () {
    function AuthPage(http, router, authManager) {
        var _this = this;
        this.router = router;
        this.authManager = authManager;
        this.http = http;
        this.companies = [];
        this.http.get("/api/company/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.companies.push({
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name
                });
            }
        }, function (error) {
            console.error(error.json());
        });
    }
    AuthPage.prototype.login = function (email, password) {
        var _this = this;
        if (!email || email == "") {
            console.error("Email must exist");
        }
        else if (!password || password == "") {
            console.error("Password must exist");
        }
        else {
            this.authManager.login(email, password).then(function (result) {
                _this.router.navigate(["Projects"]);
            }, function (error) {
                console.error(error);
            });
        }
    };
    AuthPage.prototype.register = function (firstname, lastname, street, city, state, zip, country, phone, email, password, company) {
        var _this = this;
        var postBody = {
            name: {
                first: firstname,
                last: lastname
            },
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: country
            },
            email: email,
            phone: phone,
            password: password,
            company: company
        };
        this.authManager.register(postBody).then(function (result) {
            _this.authManager.login(email, password).then(function (result) {
                _this.router.navigate(["Projects"]);
            }, function (error) {
                console.error(error);
            });
        }, function (error) {
            console.error(error);
        });
        ;
    };
    AuthPage = __decorate([
        core_1.Component({
            selector: "auth",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager]
        }),
        core_1.View({
            templateUrl: "app/auth/auth.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authmanager_1.AuthManager])
    ], AuthPage);
    return AuthPage;
})();
exports.AuthPage = AuthPage;
