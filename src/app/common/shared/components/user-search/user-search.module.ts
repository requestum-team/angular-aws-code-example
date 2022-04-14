import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './user-search.component';
import { CroppedTextModule } from '../cropped-text/cropped-text.module';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormsModule } from '@app/common/modules/forms/forms.module';

@NgModule({
  declarations: [UserSearchComponent],
  imports: [CommonModule, CroppedTextModule, MaterialModule, TranslateModule, ReactiveFormsModule, AppFormsModule],
  exports: [UserSearchComponent]
})
export class UserSearchModule {}
