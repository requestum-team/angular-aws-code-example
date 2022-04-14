import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoMenuComponent } from './photo-menu.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from '@shared/components/dropdown/dropdown.module';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [PhotoMenuComponent],
  exports: [PhotoMenuComponent],
  imports: [CommonModule, MaterialModule, TranslateModule, RouterModule, DropdownModule, DirectivesModule]
})
export class PhotoMenuModule {}
