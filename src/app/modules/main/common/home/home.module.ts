import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/common/shared/shared.module';
import { QuickVerificationComponent } from './quick-verification/quick-verification.component';
import { QuickProtectionComponent } from './quick-protection/quick-protection.component';

@NgModule({
  declarations: [HomeComponent, QuickVerificationComponent, QuickProtectionComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HomeComponent }]), SharedModule]
})
export class HomeModule {}
