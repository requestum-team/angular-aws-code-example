import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from './qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [QrCodeComponent],
  imports: [CommonModule, QRCodeModule],
  exports: [QrCodeComponent]
})
export class QrCodeModule {}
