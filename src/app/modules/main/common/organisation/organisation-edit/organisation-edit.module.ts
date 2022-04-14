import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationEditComponent } from './organisation-edit.component';
import { SharedModule } from '@shared/shared.module';
import { MainInfoFormComponent } from './main-info-form/main-info-form.component';

@NgModule({
  declarations: [OrganisationEditComponent, MainInfoFormComponent],
  imports: [CommonModule, SharedModule]
})
export class OrganisationEditModule {}
