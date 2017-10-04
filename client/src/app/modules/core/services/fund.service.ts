import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/do';
import {buildUrl, checkIfSucceeded} from './util';
import {Result} from "../models/result";

@Injectable()
export class FundService {

    constructor(private _http: Http) {
    }

    getBalance(): Observable<Result<number>> {
        return this.getNumber('balance');
    }

    getInvoice(): Observable<Result<number>> {
        return this.getNumber('invoice');
    }

    getNumber(url): Observable<Result<number>> {
        return this._http.get(buildUrl(url)).map((response: Response) => {
            let succeeded = checkIfSucceeded(response.status);
            return {
                succeeded: succeeded,
                data: succeeded ? +response.text() : undefined
            };
        }).catch(error => {
            return Observable.from([
                {
                    succeeded: false,
                    errorMessage: error ? error.toString() : 'unexpected'
                }
            ]);
        });
    }
}
