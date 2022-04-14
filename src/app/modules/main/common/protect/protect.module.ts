import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectComponent } from './protect.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProtectFormComponent } from './protect-form/protect-form.component';
import { ProtectInfoComponent } from './protect-info/protect-info.component';

@NgModule({
  declarations: [ProtectComponent, ProtectFormComponent, ProtectInfoComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ProtectComponent }]), SharedModule]
})
export class ProtectModule {}
