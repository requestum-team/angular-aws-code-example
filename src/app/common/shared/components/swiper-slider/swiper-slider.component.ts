import { Component, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper';
import Swiper, { Pagination, SwiperOptions } from 'swiper';
import { getRandomIdentifier } from '@misc/helpers/get-random-identifier.function';
import { EventEmitter } from '@angular/core';

SwiperCore.use([Pagination, Autoplay, Navigation, Thumbs, FreeMode]);

export interface ISliderSlide {
  image?: string;
  title?: string;
  icon?: string;
  value?: string;
}

@Component({
  selector: 'swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: ['./swiper-slider.component.scss']
})
export class SwiperSliderComponent implements OnInit {
  @Output() swiped: EventEmitter<Swiper> = new EventEmitter<Swiper>();
  @Input() config: SwiperOptions = {};
  @Input() slideTemplate: TemplateRef<any>;
  @Input() slides: ISliderSlide[];
  @Input() thumbs: {} = {};
  defaultConfig: SwiperOptions = {
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
  swiperOpts: SwiperOptions;
  cssClass: string = getRandomIdentifier();

  constructor() {}

  get fullConfig(): SwiperOptions {
    return this.swiperOpts as SwiperOptions;
  }

  ngOnInit(): void {
    this.swiperOpts = { ...this.defaultConfig, ...this.config, ...this.thumbs };
  }

  onSwiper(swiper: Swiper): void {
    this.swiped.emit(swiper);
  }

  onSlideChange(): void {}
}
