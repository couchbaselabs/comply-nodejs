import {Injectable, Inject} from "@angular/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";

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
        console.log("HTTP POST REQUEST: ", fullUrl);
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
                console.log("HTTP POST RESPONSE: ", success.json);
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        });
    }

    makeFileRequest(url: string, params: Array<string>, file:File, description:string, userId: string, taskId:string) {

        return new Promise((resolve, reject)=> {
            var formData:any = new FormData();

            formData.append('upl', file, file.name);
            formData.append('description', description);
            formData.append('userId', userId);
            formData.append('taskId', taskId);

            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response)); // NOT Json by default, it must be parsed.
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', '/api/cdn/add', true);
            xhr.send(formData);
        });
    }

    makeGetRequest(url: string, params: Array<string>) {
        var fullUrl: string = url;
        if(params && params.length > 0) {
            fullUrl = fullUrl + "/" + params.join("/");
        }
        console.log("HTTP GET REQUEST: ", fullUrl);
        return new Promise((resolve, reject) => {
            this.http.get(fullUrl)
            .subscribe((success) => {
                console.log("HTTP GET RESPONSE: ", success.json());
                resolve(success.json());
            }, (error) => {
                reject(error.json());
            });
        });
    }

}
