import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { BaseFormFieldAbstractComponent } from '@misc/abstracts/base-form-field.abstract.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SnackBarNotificationType } from '@models/enums/snack-bar-notification-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@services/notification/notification.service';

@Component({
  selector: 'base-textarea',
  templateUrl: './base-textarea.component.html',
  styleUrls: ['./base-textarea.component.scss']
})
export class BaseTextareaComponent extends BaseFormFieldAbstractComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @Input() minRows: number = 8;
  @Input() maxRows: number = 12;
  @Input() isCopyingAvailable = false;

  constructor(protected cdr: ChangeDetectorRef, protected translate: TranslateService, private _notifications: NotificationService) {
    super(cdr, translate);
  }

  showCopyNotification(): void {
    this._notifications.addToQueue({ heading: '', message: 'Value copied to clipboard!' }, SnackBarNotificationType.success);
  }
}
