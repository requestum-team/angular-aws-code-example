import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';
import { BaseModel } from '@models/classes/_base.model';

@Exclude()
export class ApiKey extends BaseModel {
  @Expose()
  apiKey: string;
  @Expose()
  organisation: string;
  @Expose()
  @Transform(({ value }: TransformFnParams): Date => (value ? new Date(value) : value))
  createdAt: string;
  @Expose()
  @Transform(({ value }: TransformFnParams): Date => (value ? new Date(value) : value))
  expiredAt: string;
}
