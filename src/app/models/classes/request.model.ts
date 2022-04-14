import { Exclude, Expose } from 'class-transformer';
import { BaseModel } from '@models/classes/_base.model';
import { User } from '@models/classes/user.model';
import { Organization } from '@models/classes/organisation.model';
import { RequestStatus } from '@models/enums/request-status.enum';

@Exclude()
export class Request extends BaseModel {
  @Expose()
  member: string | User;
  @Expose()
  organisation: string | Organization;
  @Expose()
  status: RequestStatus;
}
