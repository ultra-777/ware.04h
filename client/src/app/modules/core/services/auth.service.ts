import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {buildUrl, checkIfSucceeded} from './util';
import {Result} from "../models/result";

@Injectable()
export class AuthService {

  constructor(private _http: Http) {
  }

  login(phone: string, password: string): Observable<Result<boolean>> {
    return this._http.post(
      buildUrl('login/'), {
        phone: phone,
        password: password,
      }).map((response: Response) => {
        return {
          succeeded: true,
          data: checkIfSucceeded(response.status)
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

