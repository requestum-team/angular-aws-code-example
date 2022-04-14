import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareWithModalComponent } from './share-with-modal.component';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { MaterialModule } from '@app/common/shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalActionsModule } from '../../modal-actions/modal-actions.module';

@NgModule({
  declarations: [ShareWithModalComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule, TranslateModule, ModalActionsModule],
  exports: [ShareWithModalComponent]
})
export class ShareWithModalModule {}
