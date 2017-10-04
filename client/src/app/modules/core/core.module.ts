import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkipSelf, Optional } from "@angular/core";
import { HttpModule} from "@angular/http";
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
