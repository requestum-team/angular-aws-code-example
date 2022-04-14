import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { TranslateService } from '@ngx-translate/core';
import { IModalAction } from '../../modal-actions/modal-actions.component';
import { COMPONENT_CONTEXT, IModalComponentContext } from '@shared/modal/modal.component';

@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent extends BaseFormAbstractComponent implements OnInit {
  actions: IModalAction<boolean>[];

  constructor(
    @Inject(COMPONENT_CONTEXT) private _context: IModalComponentContext<File>,
    private _translate: TranslateService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
    this._initActions();
  }

  get control(): FormControl {
    return this._context.control as FormControl;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this._context.dialog.close(this.formGroup.getRawValue().photo);
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      photo: this.control ?? this._fb.control('', [Validators.required])
    });
  }

  private _initActions(): void {
    this.actions = [
      { value: true, type: 'submit', name: `BUTTON_NAME.UPLOAD`, color: 'primary' },
      { value: false, type: 'close', name: 'BUTTON_NAME.CANCEL', color: 'primary' }
    ];
  }
}
