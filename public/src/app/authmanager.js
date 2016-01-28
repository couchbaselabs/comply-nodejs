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
var utility_1 = require("./utility");
var AuthManager = (function () {
    function AuthManager(http, utility) {
        this.http = http;
        this.utility = utility;
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
            _this.utility.makeGetRequest("/api/user/login", [email, password]).then(function (result) {
                if (result) {
                    localStorage.setItem("user", JSON.stringify(result));
                    resolve(result);
                }
                else {
                    reject("User not found");
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthManager.prototype.logout = function () {
        localStorage.clear();
    };
    AuthManager.prototype.register = function (user) {
        return this.utility.makePostRequest("/api/user/create", [], user);
    };
    AuthManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, utility_1.Utility])
    ], AuthManager);
    return AuthManager;
})();
exports.AuthManager = AuthManager;
