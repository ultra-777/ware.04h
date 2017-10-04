import { Component, ViewEncapsulation } from "@angular/core";
import {AuthService} from "./auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth.component.scss'],
  host: {
    'class': 'auth-component'
  }
})
export class AuthComponent {

  form: FormGroup;
  phoneValue: string;
  passwordValue: string;

  constructor(
      private fb: FormBuilder,
      private _authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      phone: new FormControl(
        '',
        Validators.compose([
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
        ])
      )
    });
  }

  submit(event: any) {
    const self = this;
    event.preventDefault();

    if (this.form.valid) {
      this._authService.login(self.form.controls['phone'].value, self.form.controls['password'].value)
        .subscribe(succeeded => {
          if (!succeeded) {
            self.form.setErrors({
              'incorrect': true
            });
          }
        });
    }
  }
}

