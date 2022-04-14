export interface IProtectFormData {
  recordType: string;
  studentId: string;
  date: string;
  organisation: { name: string; value: string };
  sharingDefault: string;
  fileId: File;
}
