import { Request } from '@models/classes/request.model';
import { OrganisationSize } from '@models/enums/organisation-size.enum';
import { OrganisationSharing } from '@models/enums/organisation-sharing.enum';
import { OrganisationType } from '@models/enums/organisation-type.enum';
import { OrganisationTierEnum } from '@models/enums/organisation-tier.enum';
import { UserRole } from '@models/enums/user-role.enum';
import { RequestStatus } from '@models/enums/request-status.enum';

export const meRequests: Request[] = [
  {
    member: {
      id: '817696ee-632f-4a6f-a18c-e9b07b8e2e18',
      organisation: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
      avatar: '',
      isPendingApproval: false,
      lastName: 'Dou',
      email: 'test@gmail.com',
      country: '',
      firstName: 'John',
      role: UserRole['ROLE_USER'],
      isMFAEnabled: false,
      phone: '',
      secondaryOrganisations: ['', '89D226E8-7796-51DF-2D50-FF937BA49DDF'],
      fullName: 'John Dou'
    },
    id: '3231e8a6-3c5a-4f14-a33a-930983e77092',
    organisation: {
      id: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
      partnerOrganisations: ['', '7EC95E54-53F2-27C7-5DBB-C46CFF38791E', 'EE2EB029-31CA-1AF0-5EE8-BDAE61796BF1'],
      size: OrganisationSize['5000+'],
      allowExternalUsers: false,
      tier: OrganisationTierEnum['basic'],
      address: '',
      logo: '',
      country: 'US',
      name: '',
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
    },
    status: RequestStatus['approved']
  }
];
