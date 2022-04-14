import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { IModalAction } from '../../modal-actions/modal-actions.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { COMPONENT_CONTEXT, IModalComponentContext, ModalComponent } from '../../modal.component';
import { IShareWithParams } from '@app/modules/main/common/search/search.component';
import { User } from '@app/models/classes/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ShareWithType } from '@app/models/enums/share-type.enum';

@Component({
  selector: 'share-with-modal',
  templateUrl: './share-with-modal.component.html',
  styleUrls: ['./share-with-modal.component.scss']
})
export class ShareWithModalComponent extends BaseFormAbstractComponent implements OnInit {
  actions: IModalAction<boolean>[];
  searchFields = ['email', 'fullName'];
  constructor(
    private _translate: TranslateService,
    private _fb: FormBuilder,
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<IShareWithParams>
  ) {
    super();
  }
  get users(): User[] {
    return this._context.users;
  }

  get dialog(): MatDialogRef<ModalComponent<IShareWithParams>> {
    return this._context.dialog;
  }

  ngOnInit(): void {
    this._initForm();
    this._initActions();

    this.form.shareType.valueChanges.subscribe((type: number) => {
      switch (type) {
        case ShareWithType.registeredUsers:
          this.formGroup.addControl('users', new FormControl());
          this.formGroup.removeControl('email');
          this.formGroup.removeControl('message');
          break;
        case ShareWithType.viaEmail:
          this.formGroup.addControl('email', new FormControl());
          this.formGroup.addControl('message', new FormControl());
          this.formGroup.removeControl('users');
          break;
      }
    });
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      shareType: [1],
      users: []
    });
  }

  private _initActions(): void {
    this.actions = [{ value: true, type: 'submit', name: `BUTTON_NAME.OK`, color: 'primary' }];
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.dialog.close(this.formGroup.value);
  }
  selectChange(event: any) {
    this.form.users.patchValue(event.data);
  }
}
