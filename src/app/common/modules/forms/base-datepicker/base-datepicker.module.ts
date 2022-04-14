import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { BaseDatepickerComponent } from './base-datepicker.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DATE_FORMATS } from '@app/misc/constants/date-formats';

@NgModule({
  declarations: [BaseDatepickerComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, PipesModule, RouterModule, MomentDateModule],
  exports: [BaseDatepickerComponent],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }]
})
export class BaseDatepickerModule {}
