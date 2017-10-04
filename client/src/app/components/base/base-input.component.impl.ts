import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator
} from '@angular/forms';

export class BaseInputComponentImpl<T> implements ControlValueAccessor, Validator {

  private _instance: any;
  private _modelValue: T;

  constructor() {
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
      this.modelValue = value;
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    let errorMessage = this.onValidate.call(this._instance, c.value);
    let result: ValidationErrors =
      errorMessage ?
        {
          'error': {
            message: errorMessage
          }
        }
        : null;
    return result;
  }

  protected initialize(instance: any) {
    this._instance = instance;
  }

  protected get modelValue(): T {
    return this._modelValue;
  }

  protected set modelValue(value: T) {
    const self = this;
    setTimeout(() => {
      self._modelValue = value;
      self.onChange(self._modelValue);
    });
  }

  protected onValidate(value: T): T {
    return undefined;
  }
}
