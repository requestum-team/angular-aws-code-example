import { NgModule } from '@angular/core';
import { LoaderContainerModule } from './loader-container/loader-container.module';
import { CroppedTextModule } from './cropped-text/cropped-text.module';
import { DropdownModule } from '@shared/components/dropdown/dropdown.module';
import { NotificationModule } from '@shared/components/notification/notification.module';
import { LogoModule } from './logo/logo.module';
import { PasswordValidationIndicatorsModule } from '@shared/components/password-validation-indicators/password-validation-indicators.module';
import { PhotoMenuModule } from './photo-menu/photo-menu.module';
import { SwiperSliderModule } from './swiper-slider/swiper-slider.module';
import { SharingTypeModule } from './sharing-type/sharing-type.module';
import { ItemsListModule } from './items-list/items-list.module';
import { UserSearchModule } from './user-search/user-search.module';
import { ProtectResultsModule } from './protect-results/protect-results.module';
import { GeneralSearchModule } from './general-search/general-search.module';
import { QrCodeModule } from './qr-code/qr-code.module';

// Components

@NgModule({
  exports: [
    LoaderContainerModule,
    CroppedTextModule,
    DropdownModule,
    NotificationModule,
    LogoModule,
    PasswordValidationIndicatorsModule,
    PhotoMenuModule,
    PasswordValidationIndicatorsModule,
    SwiperSliderModule,
    SharingTypeModule,
    ItemsListModule,
    UserSearchModule,
    ProtectResultsModule,
    GeneralSearchModule,
    QrCodeModule
  ]
})
export class SharedComponentsModule {}
