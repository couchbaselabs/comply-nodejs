import {Injectable, Inject} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";

@Injectable()

export class Utility {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    makePostRequest(url: string, params: Array<string>, body: Object) {
        var fullUrl: string = url;
        if(params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        return new Promise((resolve, reject) => {
            var requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            this.http.request(new Request({
                method: RequestMethod.Post,
                url: fullUrl,
                body: JSON.stringify(body),
                headers: requestHeaders
            }))
            .subscribe((success) => {
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        });
    }

    makeGetRequest(url: string, params: Array<string>) {
        var fullUrl: string = url;
        if(params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        return new Promise((resolve, reject) => {
            this.http.get(fullUrl)
            .subscribe((success) => {
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        });
    }

}
