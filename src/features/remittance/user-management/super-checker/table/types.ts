export interface SuperCheckerData {
  id: string;
  fullName: string;
  emailId: string;
  phoneNo: string;
  productType: string;
  productSubType: string;
  status: 'Active' | 'Inactive';
  location?: string;
}