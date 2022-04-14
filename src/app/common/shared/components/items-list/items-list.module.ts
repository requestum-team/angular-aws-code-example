import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list.component';
import { CroppedTextModule } from '../cropped-text/cropped-text.module';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { PipesModule } from '@pipes/pipes.module';
import { ItemsFilterModule } from './items-filter/items-filter.module';

@NgModule({
  declarations: [ItemsListComponent],
  imports: [
    CommonModule,
    CroppedTextModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    AppFormsModule,
    DropdownModule,
    PipesModule,
    ItemsFilterModule
  ],
  exports: [ItemsListComponent, ItemsFilterModule]
})
export class ItemsListModule {}
