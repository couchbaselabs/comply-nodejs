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
var AuthManager = (function () {
    function AuthManager(http) {
        this.http = http;
    }
    AuthManager.prototype.isAuthenticated = function () {
        if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
            return false;
        }
        else {
            return true;
        }
    };
    AuthManager.prototype.getAuthToken = function () {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"))._id;
        }
        else {
            return null;
        }
    };
    AuthManager.prototype.getUserEmail = function () {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user")).email;
        }
        else {
            return null;
        }
    };
    AuthManager.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("/api/user/login/" + email + "/" + password)
                .subscribe(function (success) {
                if (success.json()) {
                    localStorage.setItem("user", JSON.stringify(success.json()));
                    resolve(success.json());
                }
                else {
                    reject("User not found");
                }
            }, function (error) {
                reject(error.json());
            });
        });
    };
    AuthManager.prototype.logout = function () {
        localStorage.clear();
    };
    AuthManager.prototype.register = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var requestHeaders = new http_1.Headers();
            requestHeaders.append("Content-Type", "application/json");
            _this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: "/api/user/create",
                body: JSON.stringify(user),
                headers: requestHeaders
            }))
                .subscribe(function (success) {
                resolve(success.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    AuthManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthManager);
    return AuthManager;
})();
exports.AuthManager = AuthManager;
