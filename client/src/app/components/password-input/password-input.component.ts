import {
  Component, ViewEncapsulation, forwardRef
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {BaseInputComponentImpl} from "../base/base-input.component.impl";

function maskToCurrent(maskedValue: string): string {
  return maskedValue ? maskedValue.replace(/[^0-9]*/ig, '') : '';
}

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent extends BaseInputComponentImpl<string> {
  form: FormGroup;

  constructor(
      private fb: FormBuilder
  ) {
    super();
    this.initialize(this);
  }

  ngOnInit() {
    this.form = this.fb.group({
      some: new FormControl()
    });
  }

  onBlur() {
    this.onTouched();
  }

  onChangeInputValue(newValue: string) {
    this.modelValue = newValue;
  }

  protected onValidate(value: string): string {
    if (value) {
      return (value.length > 5) ? undefined : "Пароль должен быть не меньше 6 символов";
    }
    else {
      return "Пароль не введен";
    }
  }
}
