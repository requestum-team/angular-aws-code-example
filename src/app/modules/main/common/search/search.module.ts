import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/common/shared/shared.module';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [SearchComponent, SearchFormComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SearchComponent }]), SharedModule]
})
export class SearchModule {}
