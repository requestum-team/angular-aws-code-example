import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MaterialModule } from '@shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '@shared/modal/modal.service';
import { ModalActionsModule } from '@shared/modal/modal-actions/modal-actions.module';
import { UserModalModule } from '@shared/modal/modals/user-modal/user-modal.module';
import { PhotoModalModule } from './modals/photo-modal/photo-modal.module';
import { ChangePasswordModalModule } from './modals/change-password-modal/change-password-modal.module';
import { ShareModalModule } from './modals/share-modal/share-modal.module';
import { ShareWithModalModule } from './modals/share-with-modal/share-with-modal.module';
import { RecordAvailabilityModule } from './modals/record-availability/record-availability.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    ModalActionsModule,
    UserModalModule,
    PhotoModalModule,
    ChangePasswordModalModule,
    ShareModalModule,
    ShareWithModalModule,
    RecordAvailabilityModule
  ],
  providers: [ModalService],
  exports: [UserModalModule, PhotoModalModule, ChangePasswordModalModule, ShareModalModule, ShareWithModalModule, RecordAvailabilityModule]
})
export class ModalModule {}
