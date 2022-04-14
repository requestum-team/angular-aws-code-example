import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { BaseSelectComponent } from './base-select.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BaseSelectComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, PipesModule, RouterModule, TranslateModule],
  exports: [BaseSelectComponent]
})
export class BaseSelectModule {}
