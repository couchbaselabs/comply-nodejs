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
