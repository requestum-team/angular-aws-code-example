import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/common/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: AnalyticsComponent }]), SharedModule, NgChartsModule]
})
export class AnalyticsModule {}
