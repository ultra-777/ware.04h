import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {KernelService} from "../../kernel.service";

@Injectable()
export class RootAuthGuard implements Resolve<any> {

  constructor(
      private _router: Router,
      private _kernelService: KernelService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const self = this;
    return this._kernelService.checkRouteAccess(route.url.toString());
  }
}
