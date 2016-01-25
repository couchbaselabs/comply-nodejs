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
var Utility = (function () {
    function Utility(http) {
        this.http = http;
    }
    Utility.prototype.makePostRequest = function (url, params, body) {
        var _this = this;
        var fullUrl = url;
        if (params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        return new Promise(function (resolve, reject) {
            var requestHeaders = new http_1.Headers();
            requestHeaders.append("Content-Type", "application/json");
            _this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: fullUrl,
                body: JSON.stringify(body),
                headers: requestHeaders
            }))
                .subscribe(function (success) {
                resolve(success.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    Utility.prototype.makeGetRequest = function (url, params) {
        var _this = this;
        var fullUrl = url;
        if (params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        return new Promise(function (resolve, reject) {
            _this.http.get(fullUrl)
                .subscribe(function (success) {
                resolve(success.json());
            }, function (error) {
                reject(error.json());
            });
        });
    };
    Utility = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Utility);
    return Utility;
})();
exports.Utility = Utility;
