import {NgModule, ApplicationRef, LOCALE_ID} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {TextMaskModule} from 'angular2-text-mask';
import {CoreModule} from '../core/';
import {ROUTES} from './root.routes';

import {RootComponent} from "../../components/root/root.component";
import {PageNotFoundComponent} from '../../components/not-found/not-found.component';
import {RootAuthGuard} from './root-auth-guard';
import {AuthComponent} from "../../components/auth/auth.component";
import {AuthService as AuthStub} from "../../components/auth/auth.service";
import {FundService as FundStub} from "../../components/fund/fund.service";
import {ResultService as ResultStub} from "../../components/result/result.service";
import {FundComponent} from "../../components/fund/fund.component";
import {ResultComponent} from "../../components/result/result.component";
import {KernelService} from "../../kernel.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PhoneInputComponent} from "../../components/phone-input/phone-input.component";
import {PasswordInputComponent} from "../../components/password-input/password-input.component";
import {FundService} from "../core/services/fund.service";
import {AuthService} from "../core/services/auth.service";
import {ActionService} from "../core/services/action.service";

@NgModule({
  bootstrap: [RootComponent],
  declarations: [
    RootComponent,
    PageNotFoundComponent,
    AuthComponent,
    FundComponent,
    ResultComponent,
    PhoneInputComponent,
    PasswordInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU'
    },
    AuthService,
    FundService,
    ActionService,
    KernelService,
    RootAuthGuard,
    {
      provide: AuthStub,
      useExisting: KernelService
    },
    {
      provide: FundStub,
      useExisting: KernelService
    },
    {
      provide: ResultStub,
      useExisting: KernelService
    }
  ]
})
export class AppModule {
  constructor() {}
}
