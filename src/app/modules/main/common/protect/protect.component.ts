import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ProtectFormComponent } from './protect-form/protect-form.component';
import { DigitalDocument } from '@models/classes/digital-document.model';

@Component({
  selector: 'protect',
  templateUrl: './protect.component.html',
  styleUrls: ['./protect.component.scss']
})
export class ProtectComponent implements AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  @ViewChild('protectForm') protectForm: ProtectFormComponent;
  document: DigitalDocument;
  file: File;

  constructor(private _toolbarHelper: ToolbarHelperService, protected translate: TranslateService) {}

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.PROTECT`),
      hint: this.translate.instant(`HINT.PROTECT`)
    };
  }

  submitForm(): void {
    this.protectForm.onSubmit();
  }
}
