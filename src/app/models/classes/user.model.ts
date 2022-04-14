import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';
import { UserRole } from '@models/enums/user-role.enum';
import { BaseModel } from '@models/classes/_base.model';
import { transformToModel } from '@misc/helpers/model-conversion/convert-to-model.function';
import { Organization } from '@models/classes/organisation.model';
import { convertToModelsArray } from '@misc/helpers/model-conversion/convert-to-models-array';

@Exclude()
export class User extends BaseModel {
  @Expose()
  @Transform(transformToModel(Organization))
  organisation: string | Organization;
  @Expose()
  avatar: string;
  @Expose()
  isPendingApproval: boolean;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  country: string;
  @Expose()
  firstName: string;
  @Expose()
  role: UserRole;
  @Expose()
  isMFAEnabled: boolean;
  @Expose()
  phone: string;
  @Expose()
  @Transform(({ value }: TransformFnParams): Organization[] => convertToModelsArray(value, Organization))
  secondaryOrganisations: string[] | Organization[];
  @Expose()
  @Transform(({ value, obj }: TransformFnParams): string => value ?? `${obj.lastName ?? ''} ${obj.firstName ?? ''}`.trim())
  fullName: string;
}
