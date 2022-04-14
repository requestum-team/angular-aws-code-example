import { Component, Input } from '@angular/core';
import { IQRoptions } from '@models/interfaces/qr.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import { elementType, errorCorrectionLevel } from '@models/enums/qrcode.enum';

@Component({
  selector: 'qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  private _desktopSize: number = 124;
  private _mobileSize: number = 60;
  @Input() options: Partial<Omit<IQRoptions, 'qrdata'>>;
  @Input() value: string;

  constructor(private _breakpointObserver: BreakpointObserver) {}

  get width(): number {
    const style: CSSStyleDeclaration = window.getComputedStyle(document.documentElement);
    const isBreakpointMatch = this._breakpointObserver.isMatched(`(max-width: ${style.getPropertyValue('--tablet-xs')})`);

    return isBreakpointMatch ? this._mobileSize : this._desktopSize;
  }

  get config(): IQRoptions {
    return {
      colorDark: '#000000ff',
      colorLight: '#ffffffff',
      cssClass: 'left',
      elementType: elementType.img,
      errorCorrectionLevel: errorCorrectionLevel.M,
      margin: 0,
      scale: 1,
      width: this.width,
      qrdata: this.value,
      ...this.options
    };
  }
}
