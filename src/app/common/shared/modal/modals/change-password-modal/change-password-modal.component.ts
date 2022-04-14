import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { CustomValidators } from '@app/misc/custom-validators';
import { TranslateService } from '@ngx-translate/core';
import { IModalAction } from '@shared/modal/modal-actions/modal-actions.component';
import { COMPONENT_CONTEXT, IModalComponentContext } from '@shared/modal/modal.component';
import { User } from '@models/classes/user.model';
import { Params } from '@angular/router';

@Component({
  selector: 'change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent extends BaseFormAbstractComponent implements OnInit {
  actions: IModalAction<boolean>[];

  constructor(
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<User>,
    private _translate: TranslateService,
    private _fb: FormBuilder
  ) {
    super();
  }

  private _initForm(): void {
    this.formGroup = this._fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6), CustomValidators.oneDigit, CustomValidators.oneUppercase]],
        newPassword: ['', [Validators.required, Validators.minLength(6), CustomValidators.oneDigit, CustomValidators.oneUppercase]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6), CustomValidators.oneDigit, CustomValidators.oneUppercase]]
      },
      { validators: [CustomValidators.mustMatch('newPassword', 'repeatPassword')] }
    );
  }

  private _initActions(): void {
    this.actions = [
      { value: true, type: 'submit', name: `BUTTON_NAME.OK`, color: 'primary' },
      { value: false, type: 'close', name: `BUTTON_NAME.CANCEL`, color: 'primary' }
    ];
  }

  ngOnInit(): void {
    this._initForm();
    this._initActions();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const params: Params = this.formGroup.getRawValue();
    delete params.repeatPassword;
    this._context?.dialog?.close();
  }
}
