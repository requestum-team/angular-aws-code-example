import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationDetailsComponent } from './organisation-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [OrganisationDetailsComponent],
  imports: [CommonModule, SharedModule]
})
export class OrganisationDetailsModule {}
