import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NotificationsType } from '@app/models/enums/notifications.enum';

@Component({
  selector: 'notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent {
  @ViewChild('customMenuTemplate') customMenuTemplate: TemplateRef<any>;
  notifications = [
    { id: '1091', fileId: '528399192', date: '2022-02-16T15:02:59+00:00', type: NotificationsType.fileAccess, read: true },
    { id: '1092', name: 'Svetlana Y', date: '2022-01-10T15:02:59+00:00', type: NotificationsType.newEntry, read: false },
    { id: '1093', name: 'Svetlana Y', date: '2022-01-10T15:02:59+00:00', type: NotificationsType.newEntry, read: false },
    { id: '1094', fileId: '528399192', date: '2022-02-16T15:02:59+00:00', type: NotificationsType.fileAccess, read: true }
  ];
  notificationsType = NotificationsType;
  constructor() {}

  remove(id: string) {}
}
