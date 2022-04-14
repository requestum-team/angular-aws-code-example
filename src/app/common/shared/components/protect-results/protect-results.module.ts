import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectResultsComponent } from './protect-results.component';
import { MaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CroppedTextModule } from '../cropped-text/cropped-text.module';
import { QrCodeModule } from '@shared/components/qr-code/qr-code.module';

@NgModule({
  declarations: [ProtectResultsComponent],
  imports: [CommonModule, MaterialModule, TranslateModule, CroppedTextModule, QrCodeModule],
  exports: [ProtectResultsComponent]
})
export class ProtectResultsModule {}
