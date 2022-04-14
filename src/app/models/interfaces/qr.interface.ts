import { elementType, errorCorrectionLevel } from '../enums/qrcode.enum';

export interface IQRoptions {
  colorDark?: string;
  colorLight?: string;
  cssClass?: string;
  elementType?: elementType;
  errorCorrectionLevel?: errorCorrectionLevel;
  margin?: number;
  scale?: number;
  width?: number;
  qrdata?: string;
}
