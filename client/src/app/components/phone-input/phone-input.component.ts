import {
  Component, ViewEncapsulation, forwardRef
} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {BaseInputComponentImpl} from "../base/base-input.component.impl";


const PHONE_MASK = ['+', /[1-9]/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

function maskToCurrent(maskedValue: string): string {
  return maskedValue ? maskedValue.replace(/[^0-9]*/ig, '') : '';
}

@Component({
  selector: 'phone-input',
  templateUrl: './phone-input.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent extends BaseInputComponentImpl<string> {
  public phoneMask = PHONE_MASK;
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
    this.modelValue = maskToCurrent(newValue);
  }

  protected onValidate(value: string): string {
    if (value) {
      return (value.length === 11) ? undefined : "Номер телефона введен неверно";
    }
    else {
      return "Номер телефона не введен";
    }
  }
}
