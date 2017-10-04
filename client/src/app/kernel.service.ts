import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as Constants from "./constants";
import {Router} from "@angular/router";
import {AuthService} from "./modules/core/services/auth.service";
import {Snapshot} from "./components/fund/fund.service";
import {FundService} from "./modules/core/services/fund.service";
import 'rxjs/add/observable/forkJoin';
import {Result} from "./modules/core/models/result";
import {ActionService} from "./modules/core/services/action.service";
import {Status} from "./components/result/result.service";

enum Stage {
    auth = 0,
    fund = 1,
    result = 2
}

const routeMap: {[key: number]: string} = {
    [Stage.auth]: Constants.ROUTE_AUTH,
    [Stage.fund]: Constants.ROUTE_FUND,
    [Stage.result]: Constants.ROUTE_RESULT
};

@Injectable()
export class KernelService {
    private _stage = Stage.auth;
    private _status = Status.pending;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _fundService: FundService,
        private _actionService: ActionService
    ) {

    }

    checkRouteAccess(url: string): Observable<boolean> {

        let currentStageRoute = routeMap[this.stage];
        let targetStage =
            Object.keys(routeMap)
                .reduce((result: Stage, key: string) => {
                    if (!result) {
                        if (routeMap[key] === url) {
                            result = <Stage>+key;
                        }
                    }
                    return result;
                }, undefined);

        let result = true;
        if (targetStage !== undefined) {
            result = (this.stage === targetStage);
        }
        else {
            result = !!url;
        }

        if (!result) {
            this._router.navigate([currentStageRoute]);
        }

        return Observable.from([result]);
    }


    login(phone: string, password: string): Observable<boolean> {
        this._authService.login(phone, password).subscribe();
        this.stage = Stage.fund;
        return Observable.from([true]);
    }

    get stage(): Stage {
        return this._stage;
    }

    set stage(newValue: Stage) {
        if (newValue !== this._stage) {
            this._stage = newValue;
            this._router.navigate([routeMap[this._stage]]);
        }
    }

    getSnapshot(): Observable<Snapshot> {
        const self = this;
        return Observable.create(observer => {
            Observable.forkJoin([
                self._fundService.getBalance(),
                self._fundService.getInvoice()
            ]).subscribe(results => {
                let balanceResult = results[0] as Result<number>;
                let invoiceResult = results[1] as Result<number>;
                let snapshot =
                    new Snapshot(
                        balanceResult.succeeded ? balanceResult.data : 0,
                        invoiceResult.succeeded ? invoiceResult.data : 0
                    );
                observer.next(snapshot);
                observer.complete();
            });
        });
    }

    pay() {
        const self = this;
        this._actionService.pay().subscribe(result => {
            if (result && result.succeeded && !!result.data) {
                self._stage = Stage.result;
                self._status = Status.succeeded;
                self._router.navigate([routeMap[self._stage]]);
            }
        });
    }

    cancel() {
        const self = this;
        this._actionService.cancel().subscribe(result => {
            if (result && result.succeeded && !!result.data) {
                self._stage = Stage.result;
                self._status = Status.cancelled;
                self._router.navigate([routeMap[self._stage]]);
            }
        });
    }

    get status(): Status {
        return this._status;
    }

}
