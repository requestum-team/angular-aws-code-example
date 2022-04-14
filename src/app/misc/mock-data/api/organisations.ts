import { Organization } from '@models/classes/organisation.model';
import { OrganisationSize } from '@models/enums/organisation-size.enum';
import { OrganisationSharing } from '@models/enums/organisation-sharing.enum';
import { OrganisationType } from '@models/enums/organisation-type.enum';
import { OrganisationTierEnum } from '@models/enums/organisation-tier.enum';

export const organisation: Organization = {
  id: '736A285D-197E-877B-77AF-BD08ECDF5154',
  partnerOrganisations: [''],
  size: OrganisationSize['5000+'],
  allowExternalUsers: false,
  tier: OrganisationTierEnum['basic'],
  address: '',
  logo: 'NUS LOGO.png',
  country: 'SG',
  name: 'National University of Singapore',
  sharingDefault: OrganisationSharing['open'],
  state: 'SG',
  members: [''],
  primaryContact: {
    email: 'nus.edu.sg',
    lastName: '',
    firstName: '',
    fullName: ''
  },
  domain: 'nus.edu.sg',
  type: OrganisationType['academic'],
  apiKey: '',
  shouldUseVault: false
};
export const organisations: Organization[] = [
  {
    id: '736A285D-197E-877B-77AF-BD08ECDF5154',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'NUS LOGO.png',
    country: 'SG',
    name: 'National University of Singapore',
    sharingDefault: OrganisationSharing['open'],
    state: 'SG',
    members: [''],
    primaryContact: {
      email: 'nus.edu.sg',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'nus.edu.sg',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  },
  {
    id: 'EE2EB029-31CA-1AF0-5EE8-BDAE61796BF1',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: true,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'Stanford.png',
    country: 'US',
    name: 'Stanford University',
    sharingDefault: OrganisationSharing['open'],
    state: 'CA',
    members: ['', '894baa86-6348-442b-9808-c08e1558e037'],
    primaryContact: {
      email: 'stanford.edu',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'stanford.edu',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  },
  {
    id: 'AF8AF89D-962B-1515-A162-0A100DE799A4',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'CALTECH.jpg',
    country: 'US',
    name: 'California Institute of Technology (CALTECH)',
    sharingDefault: OrganisationSharing['open'],
    state: 'CA',
    members: [''],
    primaryContact: {
      email: 'caltech.edu',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'caltech.edu',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  },
  {
    id: '3195C032-1444-396A-3EBA-5F75D9BB1297',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'Yale.png',
    country: 'US',
    name: 'Yale University',
    sharingDefault: OrganisationSharing['open'],
    state: 'CT',
    members: [''],
    primaryContact: {
      email: 'yale.edu',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'yale.edu',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  },
  {
    id: '7EC95E54-53F2-27C7-5DBB-C46CFF38791E',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'Oxford.jpg',
    country: 'UK',
    name: 'Oxford University',
    sharingDefault: OrganisationSharing['open'],
    state: 'UK',
    members: [''],
    primaryContact: {
      email: 'ox.ac.uk',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'ox.ac.uk',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  },
  {
    id: '89D226E8-7796-51DF-2D50-FF937BA49DDF',
    partnerOrganisations: ['', '7EC95E54-53F2-27C7-5DBB-C46CFF38791E', 'EE2EB029-31CA-1AF0-5EE8-BDAE61796BF1'],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: '',
    country: 'US',
    name: 'organization',
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
    domain: 'organisation.com',
    type: OrganisationType['academic'],
    apiKey: '71a91df7-25a9-4adc-8eae-7938be8d57dd',
    shouldUseVault: true
  },
  {
    id: '01141FE1-7288-7517-0B8A-65241DF114FA',
    partnerOrganisations: [''],
    size: OrganisationSize['5000+'],
    allowExternalUsers: false,
    tier: OrganisationTierEnum['basic'],
    address: '',
    logo: 'Cambridge.png',
    country: 'UK',
    name: 'Cambridge University',
    sharingDefault: OrganisationSharing['open'],
    state: 'UK',
    members: [''],
    primaryContact: {
      email: 'cam.ac.uk',
      lastName: '',
      firstName: '',
      fullName: ''
    },
    domain: 'cam.ac.uk',
    type: OrganisationType['academic'],
    apiKey: '',
    shouldUseVault: false
  }
];
