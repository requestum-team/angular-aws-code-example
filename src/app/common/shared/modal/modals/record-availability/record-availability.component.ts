import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { OrganisationSharing } from '@app/models/enums/organisation-sharing.enum';
import { TranslateService } from '@ngx-translate/core';
import { IModalAction } from '../../modal-actions/modal-actions.component';
import { COMPONENT_CONTEXT, IModalComponentContext, ModalComponent } from '../../modal.component';

@Component({
  selector: 'record-availability',
  templateUrl: './record-availability.component.html',
  styleUrls: ['./record-availability.component.scss']
})
export class RecordAvailabilityComponent extends BaseFormAbstractComponent implements OnInit {
  actions: IModalAction<boolean>[];
  organisationSharing = OrganisationSharing;
  constructor(
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<boolean>,
    private _translate: TranslateService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
    this._initActions();
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      shareType: [OrganisationSharing.open]
    });
  }

  private _initActions(): void {
    this.actions = [
      { value: true, type: 'submit', name: `BUTTON_NAME.APPLY`, color: 'primary' },
      { value: false, type: 'close', name: `BUTTON_NAME.CANCEL`, color: 'primary' }
    ];
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this._context?.dialog?.close(this.formGroup.value);
  }
}
