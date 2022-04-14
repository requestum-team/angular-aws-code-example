import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PasswordErrors } from '@app/misc/constants/_base.constant';

@Component({
  selector: 'password-validation-indicators',
  templateUrl: './password-validation-indicators.component.html',
  styleUrls: ['./password-validation-indicators.component.scss']
})
export class PasswordValidationIndicatorsComponent {
  @Input() passwordField: AbstractControl;

  constructor() {}

  isPassValidBy(err: string) {
    return (
      (this.passwordField.dirty || this.passwordField.touched) &&
      ((this.passwordField.errors && !this.passwordField.hasError(err)) || !this.passwordField.errors)
    );
  }

  isPassInvalidBy(err: string) {
    return (this.passwordField.dirty || this.passwordField.touched) && this.passwordField.errors && this.passwordField.hasError(err);
  }

  get isPassValid() {
    return {
      minCharacters: this.isPassValidBy(PasswordErrors.MIN_LENGTH),
      oneUpperCase: this.isPassValidBy(PasswordErrors.ONE_UPPERCASE),
      oneDigit: this.isPassValidBy(PasswordErrors.ONE_DIGIT)
    };
  }

  get isPassInvalid() {
    return {
      minCharacters: this.isPassInvalidBy(PasswordErrors.MIN_LENGTH),
      oneUpperCase: this.isPassInvalidBy(PasswordErrors.ONE_UPPERCASE),
      oneDigit: this.isPassInvalidBy(PasswordErrors.ONE_DIGIT)
    };
  }
}
