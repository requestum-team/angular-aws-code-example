import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordAvailabilityComponent } from './record-availability.component';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { MaterialModule } from '@app/common/shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalActionsModule } from '../../modal-actions/modal-actions.module';

@NgModule({
  declarations: [RecordAvailabilityComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule, TranslateModule, ModalActionsModule],
  exports: [RecordAvailabilityComponent]
})
export class RecordAvailabilityModule {}
