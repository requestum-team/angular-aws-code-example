import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperSliderComponent } from './swiper-slider.component';
import { SwiperModule } from 'swiper/angular';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
const DEFAULT_SWIPER_CONFIG = {
  slidesPerView: 3,
  spaceBetween: 50,
  navigation: false,
  pagination: { clickable: true },
  scrollbar: false,
  watchSlidesProgress: false,
  updateOnWindowResize: true,
  direction: 'horizontal',
  freeMode: false
};

@NgModule({
  declarations: [SwiperSliderComponent],
  imports: [CommonModule, SwiperModule, MaterialModule, TranslateModule],
  exports: [SwiperSliderComponent, SwiperModule]
})
export class SwiperSliderModule {}
