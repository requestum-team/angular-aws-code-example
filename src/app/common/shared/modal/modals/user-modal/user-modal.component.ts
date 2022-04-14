import { Component, Inject, OnInit } from '@angular/core';
import { COMPONENT_CONTEXT, IModalComponentContext, ModalComponent } from '@shared/modal/modal.component';
import { User } from '@models/classes/user.model';
import { BaseFormAbstractComponent } from '@misc/abstracts/base-form.abstract.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRole } from '@models/enums/user-role.enum';
import { IOption } from '@models/interfaces/forms/option.interface';
import { IModalAction } from '@shared/modal/modal-actions/modal-actions.component';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { difference } from '@misc/helpers/difference.function';

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole;
}

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent extends BaseFormAbstractComponent implements OnInit {
  private _availableRoles: UserRole[] = [UserRole.user];
  actions: IModalAction<boolean>[];
  roleOptions: IOption[] = [];

  constructor(
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<User>,
    private _translate: TranslateService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._initActions();
    this._initOptions();
    this._initForm();
  }

  get user(): User {
    return this._context.entity;
  }

  get defaultValues(): IFormValues {
    return {
      firstName: this.user?.firstName ?? '',
      lastName: this.user?.lastName ?? '',
      email: this.user?.email ?? '',
      role: this.user?.role
    };
  }

  get dialog(): MatDialogRef<ModalComponent<User>> {
    return this._context.dialog;
  }

  getModalResult(): IFormValues {
    return difference(this.formGroup.getRawValue(), this.defaultValues) as IFormValues;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.dialog.close(this.getModalResult());
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      firstName: this._fb.control(this.defaultValues?.firstName, Validators.compose([Validators.required, VALIDATORS_SET.NAME])),
      lastName: this._fb.control(this.defaultValues?.lastName, Validators.compose([Validators.required, VALIDATORS_SET.NAME])),
      email: this._fb.control(this.defaultValues?.email, Validators.compose([Validators.required, VALIDATORS_SET.EMAIL])),
      role: this._fb.control(this.defaultValues?.role)
    });
  }

  private _initOptions(): void {
    this.roleOptions = this._availableRoles.map(
      (role: UserRole): IOption => ({ value: role, label: this._translate.instant(`SERVICE_ROLE.${role.toUpperCase()}`), disabled: false })
    );
  }

  private _initActions(): void {
    this.actions = [
      { value: false, type: 'close', name: 'BUTTON_NAME.CANCEL', color: 'accent' },
      { value: true, type: 'submit', name: `BUTTON_NAME.${this.user ? 'SAVE' : 'CREATE'}`, color: 'primary' }
    ];
  }
}
