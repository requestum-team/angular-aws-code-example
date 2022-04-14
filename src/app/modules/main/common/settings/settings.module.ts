import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/common/shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SettingsComponent }]), SharedModule]
})
export class SettingsModule {}
