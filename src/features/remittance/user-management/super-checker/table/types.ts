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

export interface CreateSuperCheckerRequest {
  full_name: string;
  email: string;
  password: string;
  product_types: string[];
  phone_number: string;
  agent_ids: string[];
}

export interface UpdateSuperCheckerRequest extends CreateSuperCheckerRequest {
  id: string;
}