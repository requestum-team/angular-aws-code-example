import { IOption } from '@app/models/interfaces/forms/option.interface';

export const PER_PAGE_DEFAULT: number = 10;

export enum DATE_FORMAT {
  DM = 'dd/MM',
  DMY = 'dd/MM/yyyy',
  TIME = 'HH:mm',
  FULL = 'dd/MM/yyyy HH:mm'
}

export enum PasswordErrors {
  MIN_LENGTH = 'minlength',
  ONE_DIGIT = 'oneDigit',
  ONE_UPPERCASE = 'oneUppercase',
  ONE_LOWERCASE = 'oneLowercase',
  REQUIRED = 'required'
}

export const recordOptions: IOption[] = [
  {
    label: 'STUDENT_OPTION',
    value: 'student'
  },
  {
    label: 'CORRESPONDENCE_OPTION',
    value: 'correspondence'
  },
  {
    label: 'FINANCIAL_OPTION',
    value: 'financial'
  },
  {
    label: 'GOVERNANCE_OPTION',
    value: 'governance'
  },
  {
    label: 'REVIEW_OPTION',
    value: 'review'
  }
];
