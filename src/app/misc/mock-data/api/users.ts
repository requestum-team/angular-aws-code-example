import { User } from '@models/classes/user.model';
import { Organization } from '@models/classes/organisation.model';
import { OrganisationSize } from '@models/enums/organisation-size.enum';
import { OrganisationSharing } from '@models/enums/organisation-sharing.enum';
import { OrganisationType } from '@models/enums/organisation-type.enum';
import { OrganisationTierEnum } from '@models/enums/organisation-tier.enum';
import { UserRole } from '@models/enums/user-role.enum';

export const me: User = {
  id: '817696ee-632f-4a6f-a18c-e9b07b8e2e18',
  organisation: {
    id: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
    partnerOrganisations: ['', '7EC95E54-53F2-27C7-5DBB-C46CFF38791E', 'EE2EB029-31CA-1AF0-5EE8-BDAE61796BF1'],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: '',
    country: 'US',
    name: 'Test organization',
    sharingDefault: OrganisationSharing['open'],
    state: 'CA',
    members: [
      '142317b0-6f0b-44c4-bc63-08b7c3f91302',
      '26f94fa3-824e-4c06-825b-03748dad1b7f',
      '817696ee-632f-4a6f-a18c-e9b07b8e2e18',
      '894baa86-6348-442b-9808-c08e1558e037'
    ],
    primaryContact: {
      email: 'test@gmail.com',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'test.com',
    type: OrganisationType['Internal'],
    apiKey: {
      id: '71a91df7-25a9-4adc-8eae-7938be8d57dd',
      apiKey: 'testkey',
      organisation: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
      createdAt: '2022-02-10T00:00:00.000Z',
      expiredAt: '2022-08-10T00:00:00.000Z'
    },
    shouldUseVault: true
  },
  avatar: '',
  isPendingApproval: false,
  lastName: 'Smith',
  email: 'smith@gmail.com',
  country: '',
  firstName: 'Smith',
  role: UserRole['ROLE_USER'],
  isMFAEnabled: false,
  phone: '',
  secondaryOrganisations: [
    {
      id: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
      partnerOrganisations: ['', '7EC95E54-53F2-27C7-5DBB-C46CFF38791E', 'EE2EB029-31CA-1AF0-5EE8-BDAE61796BF1'],
      size: OrganisationSize['5000+'],
      allowExternalUsers: false,
      tier: OrganisationTierEnum['basic'],
      address: '',
      logo: '',
      country: 'US',
      name: 'Organisation test',
      sharingDefault: OrganisationSharing['open'],
      state: 'CA',
      members: [
        '142317b0-6f0b-44c4-bc63-08b7c3f91302',
        '26f94fa3-824e-4c06-825b-03748dad1b7f',
        '817696ee-632f-4a6f-a18c-e9b07b8e2e18',
        '894baa86-6348-442b-9808-c08e1558e037'
      ],
      primaryContact: {
        email: 'test@gmail.com',
        lastName: '',
        firstName: '',
        fullName: ''
      },
      domain: 'test.com',
      type: OrganisationType['Internal'],
      apiKey: '71a91df7-25a9-4adc-8eae-7938be8d57dd',
      shouldUseVault: true
    }
  ],
  fullName: 'John Dou'
};
