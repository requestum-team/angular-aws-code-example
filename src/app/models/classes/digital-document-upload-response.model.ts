import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';

export function cropUselessPartOfString(value: string): string {
  return (value ?? '').split(':').reverse()[0].trim();
}

@Exclude()
export class DigitalDocumentUploadResponse {
  @Expose()
  @Transform(({ value }: TransformFnParams): string => cropUselessPartOfString(value))
  data: string;
  @Expose({ name: 'additionalInfo' })
  @Transform(({ value }: TransformFnParams): string[] => cropUselessPartOfString(value).trim().split(','))
  duplicates: string;
}
