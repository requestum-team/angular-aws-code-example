import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseFormAbstractComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  constructor(private _toolbarHelper: ToolbarHelperService, private _fb: FormBuilder, private _translate: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formGroup = this._fb.group({
      receiveNotifications: this._fb.control(true),
      defaultValidation: this._fb.control(false),
      defaultRecordAccess: this._fb.control(true),
      multiFactorAuth: this._fb.control(false)
    });
  }
  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this._translate.instant(`PAGE_NAME.SETTINGS`),
      hint: this._translate.instant(`HINT.SETTINGS`)
    };
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    console.log('SUBMIT');
  }
  cancel() {}
}
