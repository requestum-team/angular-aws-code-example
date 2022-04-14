import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModalComponent } from './share-modal.component';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { MaterialModule } from '@app/common/shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalActionsModule } from '../../modal-actions/modal-actions.module';

@NgModule({
  declarations: [ShareModalComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule, TranslateModule, ModalActionsModule],
  exports: [ShareModalComponent]
})
export class ShareModalModule {}
