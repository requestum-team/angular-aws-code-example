import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { DirectivesModule } from '@directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordValidationIndicatorsComponent } from './password-validation-indicators.component';

@NgModule({
  declarations: [PasswordValidationIndicatorsComponent],
  exports: [PasswordValidationIndicatorsComponent],
  imports: [CommonModule, RouterModule, MaterialModule, DirectivesModule, TranslateModule]
})
export class PasswordValidationIndicatorsModule {}
