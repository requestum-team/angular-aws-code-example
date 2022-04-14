import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { MaterialModule } from '@app/common/shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalActionsModule } from '../../modal-actions/modal-actions.module';
import { ChangePasswordModalComponent } from './change-password-modal.component';
import { PasswordValidationIndicatorsModule } from '@app/common/shared/components/password-validation-indicators/password-validation-indicators.module';

@NgModule({
  declarations: [ChangePasswordModalComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule, TranslateModule, ModalActionsModule, PasswordValidationIndicatorsModule],
  exports: [ChangePasswordModalComponent]
})
export class ChangePasswordModalModule {}
