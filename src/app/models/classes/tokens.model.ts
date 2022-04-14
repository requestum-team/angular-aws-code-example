import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Token {
  @Expose()
  accessToken: { jwtToken: string; payload: any };
  @Expose()
  refreshToken: { jwtToken: string; payload: any };
  @Expose()
  idToken: { jwtToken: string; payload: any };
}
