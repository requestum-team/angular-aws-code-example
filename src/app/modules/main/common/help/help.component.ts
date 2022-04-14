import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;

  constructor(private _toolbarHelper: ToolbarHelperService, protected translate: TranslateService) {}

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.HELP`),
      hint: this.translate.instant(`HINT.HELP`)
    };
  }

  searchSubmit(value: string) {
    // TODO: add search handling
  }
}
