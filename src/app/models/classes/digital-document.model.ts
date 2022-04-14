import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';
import { Organization } from '@models/classes/organisation.model';

@Exclude()
export class DigitalDocument {
  @Expose()
  @Transform(nilHandler)
  fileHash: string;
  @Expose()
  @Transform(nilHandler)
  organization: string | Organization;
  @Expose()
  @Transform(nilHandler)
  doi: string;
  @Expose()
  @Transform(nilHandler)
  subjectId: string;
  @Expose({ name: 'documentID' })
  @Transform(nilHandler)
  documentId: string;
  @Expose()
  @Transform(nilHandler)
  recordType: string;
  @Expose()
  @Transform(nilHandler)
  txId: string;
  @Expose()
  @Transform(nilHandler)
  option1: string;
  @Expose()
  @Transform(nilHandler)
  option2: string;
  @Expose()
  @Transform(nilHandler)
  option3: string;
  @Expose({ name: 'Releasability' })
  @Transform(nilHandler)
  releasability: string;
  @Expose()
  @Transform(nilHandler)
  USID: string;
  @Expose({ name: 'Context' })
  @Transform(nilHandler)
  context: string;
}

function nilHandler({ value }: TransformFnParams): any | null {
  return value === 'Nil' ? null : value;
}
