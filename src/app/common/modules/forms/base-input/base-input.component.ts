import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { BaseFormFieldAbstractComponent } from '@misc/abstracts/base-form-field.abstract.component';
import { InputType } from '@models/enums/input-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@services/notification/notification.service';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';

@Component({
  selector: 'base-form-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.scss']
})
export class BaseInputComponent extends BaseFormFieldAbstractComponent {
  private _shouldRevealPassword: boolean = false;
  @Input() inputType: InputType;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() clear: EventEmitter<string> = new EventEmitter<string>();
  @Input() matAutocomplete: _MatAutocompleteBase = null;
  @Input() showClear = false;
  @Input() showCopy = false;

  constructor(protected cdr: ChangeDetectorRef, protected translate: TranslateService, private _notifications: NotificationService) {
    super(cdr, translate);
  }

  get isSearchInput(): boolean {
    return this.inputType === InputType.search;
  }

  get isPasswordInput(): boolean {
    return this.inputType === InputType.password;
  }

  get buttonIcon(): string {
    return this._shouldRevealPassword ? 'eye-invisible' : 'eye';
  }

  get type(): string {
    switch (this.inputType) {
      case InputType.password:
        return this._shouldRevealPassword ? InputType.text : InputType.password;
      default:
        return this.inputType;
    }
  }

  onEnter(event: Event): void {
    if (this.isSearchInput) {
      event.preventDefault();
      this.search.emit(this.formControl.value);
    }
  }

  clearInput(event: Event) {
    event.stopPropagation();
    this.clear.emit();
  }

  togglePassword(): void {
    this._shouldRevealPassword = !this._shouldRevealPassword;
  }

  showCopyNotification(): void {
    this._notifications.addToQueue({ heading: '', message: 'Value copied to clipboard!' }, SnackBarNotificationType.success);
  }
}
