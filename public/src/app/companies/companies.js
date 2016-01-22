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
var CompaniesPage = (function () {
    function CompaniesPage(http, router, authManager) {
        var _this = this;
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.companies = [];
        this.http.get("/api/company/getAll")
            .subscribe(function (success) {
            var jsonResponse = success.json();
            for (var i = 0; i < jsonResponse.length; i++) {
                _this.companies.push({
                    id: jsonResponse[i]._id,
                    name: jsonResponse[i].name,
                    city: jsonResponse[i].address.city,
                    state: jsonResponse[i].address.state,
                    website: jsonResponse[i].website
                });
            }
        }, function (error) {
            console.error(JSON.stringify(error));
        });
    }
    CompaniesPage.prototype.create = function (name, street, city, state, zip, country, phone, website) {
        var _this = this;
        var postBody = {
            name: name,
            street: street,
            city: city,
            state: state,
            country: country,
            zip: zip,
            phone: phone,
            website: website
        };
        var requestHeaders = new http_1.Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new http_1.Request({
            method: http_1.RequestMethod.Post,
            url: "/api/company/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
            .subscribe(function (success) {
            postBody.id = success.json()._id;
            _this.companies.push(postBody);
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    CompaniesPage = __decorate([
        core_1.Component({
            selector: "companies",
            viewProviders: [http_1.HTTP_PROVIDERS, authmanager_1.AuthManager]
        }),
        core_1.View({
            templateUrl: "app/companies/companies.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authmanager_1.AuthManager])
    ], CompaniesPage);
    return CompaniesPage;
})();
exports.CompaniesPage = CompaniesPage;
