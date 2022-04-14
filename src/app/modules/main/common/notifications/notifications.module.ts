import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/common/shared/shared.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: NotificationsComponent }]), SharedModule]
})
export class NotificationsModule {}
