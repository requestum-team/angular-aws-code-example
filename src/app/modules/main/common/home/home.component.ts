import { AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseFormAbstractComponent } from '@app/misc/abstracts/base-form.abstract.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseFormAbstractComponent implements AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;

  constructor(private _toolbarHelper: ToolbarHelperService, protected translate: TranslateService, private _cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.HOME`)
    };
    this._cdr.detectChanges();
  }
}
