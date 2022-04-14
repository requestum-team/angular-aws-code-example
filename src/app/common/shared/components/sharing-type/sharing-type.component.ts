import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwiperOptions } from 'swiper';
import { OrganisationSharing } from '@models/enums/organisation-sharing.enum';
import { ISliderSlide } from '@shared/components/swiper-slider/swiper-slider.component';

const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SharingTypeComponent),
  multi: true
};

@Component({
  selector: 'sharing-type',
  templateUrl: './sharing-type.component.html',
  styleUrls: ['./sharing-type.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class SharingTypeComponent implements ControlValueAccessor, OnInit {
  slides: ISliderSlide[];
  value: string;
  disabled = false;
  onChange: Function;
  onTouched: Function;
  params: SwiperOptions = {
    slidesPerView: 1.8,
    spaceBetween: 20,
    pagination: false,
    navigation: false,
    breakpoints: {
      '400': { slidesPerView: 2 },
      '460': { slidesPerView: 2.2 },
      '500': { slidesPerView: 2.4 },
      '560': { slidesPerView: 2.6 },
      '600': { slidesPerView: 2.8 },
      '660': { slidesPerView: 3 }
    }
  };

  ngOnInit(): void {
    this._initSlides();
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  selectType(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  private _initSlides(): void {
    this.slides = Object.values(OrganisationSharing).map((value: OrganisationSharing) => ({
      value,
      title: `ORGANISATION_SHARING.${value?.toLocaleUpperCase?.()}`,
      icon: value
    }));
  }
}
