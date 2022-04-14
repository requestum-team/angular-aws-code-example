import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { MaterialModule } from '@app/common/shared/material/material.module';

@NgModule({
  declarations: [SelectFilterComponent],
  imports: [CommonModule, AppFormsModule, MaterialModule],
  exports: [SelectFilterComponent]
})
export class ItemsFilterModule {}
