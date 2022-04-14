import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NotificationsType } from '@app/models/enums/notifications.enum';
import { ToolbarHelperService } from '@app/services/toolbar-helper/toolbar-helper.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements AfterViewInit {
  @ViewChild('toolbarTemplate') toolbarTemplate: TemplateRef<any>;
  notifications = [
    { fileId: '528399192', date: '2022-02-16T15:02:59+00:00', type: NotificationsType.fileAccess, read: true },
    { name: 'Svetlana Y', date: '2022-01-10T15:02:59+00:00', type: NotificationsType.newEntry, read: false }
  ];
  notificationsType = NotificationsType;
  constructor(private _toolbarHelper: ToolbarHelperService, protected translate: TranslateService) {}

  ngAfterViewInit(): void {
    this._toolbarHelper.data = {
      template: this.toolbarTemplate,
      pageName: this.translate.instant(`PAGE_NAME.NOTIFICATIONS`)
    };
  }
}
