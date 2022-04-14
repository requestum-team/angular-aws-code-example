import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingTypeComponent } from './sharing-type.component';
import { SwiperSliderModule } from '../swiper-slider/swiper-slider.module';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SharingTypeComponent],
  imports: [CommonModule, SwiperSliderModule, MaterialModule, TranslateModule],
  exports: [SharingTypeComponent]
})
export class SharingTypeModule {}
