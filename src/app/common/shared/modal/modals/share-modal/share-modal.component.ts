import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { User } from '@app/models/classes/user.model';
import { TranslateService } from '@ngx-translate/core';
import { IModalAction } from '../../modal-actions/modal-actions.component';
import { COMPONENT_CONTEXT, IModalComponentContext, ModalComponent } from '../../modal.component';
export interface IShareParams {
  users: Array<User>;
}

@Component({
  selector: 'share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent extends BaseFormAbstractComponent implements OnInit {
  actions: IModalAction<boolean>[];
  searchFields = ['email', 'fullName'];
  @ViewChild('optionTemplate') optionTemplate: TemplateRef<any>;

  constructor(
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<IShareParams>,
    private _translate: TranslateService,
    private _fb: FormBuilder
  ) {
    super();
  }

  get users(): User[] {
    return this._context.users;
  }
  get dialog(): MatDialogRef<ModalComponent<IShareParams>> {
    return this._context.dialog;
  }

  selectChange = (event: any) => {
    this.form.users.patchValue(event.data);
  };

  ngOnInit(): void {
    this._initForm();
    this._initActions();
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      users: ['']
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
}
