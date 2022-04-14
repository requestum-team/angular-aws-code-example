import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SDKError extends Error {
  @Expose()
  message: string;
  @Expose()
  name: string;
  @Expose()
  code: string;
  @Expose()
  stack: string;
}
