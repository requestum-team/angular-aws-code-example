import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/common/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectAutocompleteComponent } from './multiselect-autocomplete.component';
import { PipesModule } from '@app/pipes/pipes.module';

@NgModule({
  declarations: [MultiselectAutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, PipesModule],
  exports: [MultiselectAutocompleteComponent]
})
export class MultiselectAutocompleteModule {}
