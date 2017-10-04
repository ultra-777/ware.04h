import {Routes} from "@angular/router";
import * as Constants from '../../constants';
import {PageNotFoundComponent} from '../../components/not-found/not-found.component';
import {RootAuthGuard} from './root-auth-guard';
import {AuthComponent} from "../../components/auth/auth.component";
import {FundComponent} from "../../components/fund/fund.component";
import {ResultComponent} from "../../components/result/result.component";

export const ROUTES: Routes = [
  {
    path: Constants.ROUTE_AUTH,
    component: AuthComponent,
    resolve: {
      auth: RootAuthGuard
    }
  },
  {
    path: Constants.ROUTE_FUND,
    component: FundComponent,
    resolve: {
      auth: RootAuthGuard
    }
  },
  {
    path: Constants.ROUTE_RESULT,
    component: ResultComponent,
    resolve: {
      auth: RootAuthGuard
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    resolve: {
      auth: RootAuthGuard
    }
  },
];
