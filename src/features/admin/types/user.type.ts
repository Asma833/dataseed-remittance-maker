export interface UserCreationRequest {
  role_id: string;
  is_active: boolean;
  hashed_key?: string;
  email: string;
  password: string;
  business_type?: string;
  branch_id: string;
  bank_account_id: string;
}
export interface UserStatusRequest {
  is_active: boolean;
  hashed_key: string;
}
export interface UserUpdateRequest {
  hashed_key: string;
  email: string;
  password: string;
}

export interface UserCreationResponse {
  success: boolean;
  message: string;
}

export interface UserFormData {
  email: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  created_by?: string;
  updated_by?: string;
}

export interface UserRequest {
  role_id: string;
  email: string;
  password: string;
  business_type: string;
  created_by?: string;
  updated_by?: string;
  branch_id: string;
  bank_account_id: string;
  role?: string;
}

export interface User {
  id: string;
  email: string;
  hashed_key: string;
  role_id: string;
  branch_id: string;
  bank_account_id: string;
  is_active: boolean;
  business_type: string;
  created_by: string | null;
  updated_by: string | null;
  role: {
    id: string;
    name: string;
  };
  branch: {
    id: string;
    name: string;
  };
  bank_account: {
    id: string;
    account_number: string;
    ifsc_code: string;
    bank_name: string;
    bank_branch: string;
  };
}