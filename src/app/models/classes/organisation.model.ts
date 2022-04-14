import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';
import { BaseModel } from '@models/classes/_base.model';
import { transformToModel } from '@misc/helpers/model-conversion/convert-to-model.function';
import { OrganisationSize } from '@models/enums/organisation-size.enum';
import { OrganisationTierEnum } from '@models/enums/organisation-tier.enum';
import { OrganisationSharing } from '@models/enums/organisation-sharing.enum';
import { OrganisationType } from '@models/enums/organisation-type.enum';
import { ApiKey } from '@models/classes/api-key.model';

@Exclude()
class OrganisationPrimaryContact {
  @Expose()
  email: string;
  @Expose()
  lastName: string;
  @Expose()
  firstName: string;
  @Expose()
  @Transform(({ value, obj }: TransformFnParams): string => value ?? `${obj.lastName ?? ''} ${obj.firstName ?? ''}`.trim())
  fullName: string;
}

@Exclude()
export class Organization extends BaseModel {
  @Expose()
  partnerOrganisations: string[];
  @Expose()
  size: OrganisationSize;
  @Expose()
  allowExternalUsers: boolean;
  @Expose()
  tier: OrganisationTierEnum;
  @Expose()
  address: string;
  @Expose()
  logo: string;
  @Expose()
  country: string;
  @Expose()
  name: string;
  @Expose()
  sharingDefault: OrganisationSharing;
  @Expose()
  state: string;
  @Expose()
  members: string[];
  @Expose()
  @Transform(transformToModel(OrganisationPrimaryContact))
  primaryContact: OrganisationPrimaryContact;
  @Expose()
  domain: string;
  @Expose()
  type: OrganisationType;
  @Expose()
  @Transform(transformToModel(ApiKey))
  apiKey: string | ApiKey;
  @Expose()
  shouldUseVault: boolean;
}
