import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MainInfoFormComponent } from './main-info-form/main-info-form.component';

@NgModule({
  declarations: [ProfileComponent, MainInfoFormComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ProfileComponent }]), SharedModule]
})
export class ProfileModule {}
