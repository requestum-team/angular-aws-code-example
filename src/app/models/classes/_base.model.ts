import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class BaseModel {
  @Expose()
  id: string;

  /* [Symbol.toPrimitive](hint: 'number' | 'string' | 'default') {
    switch (hint) {
      case 'string':
        return this.id;
      case 'number':
      case 'default':
      default:
        return null;
    }
  }*/
}
