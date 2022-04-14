import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSearchComponent } from './general-search.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';

@NgModule({
  declarations: [GeneralSearchComponent],
  imports: [CommonModule, MaterialModule, TranslateModule, ReactiveFormsModule, AppFormsModule],
  exports: [GeneralSearchComponent]
})
export class GeneralSearchModule {}
