export interface SuperCheckerData {
  id: string;
  full_name: string | null;
  email?: string;
  phone_number: string | null;
  product_types: string[] | null;
  is_active: boolean;
  created_at: string;
}

export interface CreateSuperCheckerRequest {
  full_name: string;
  email?: string;
  password: string;
  product_types: string[];
  phone_number: string;
  agent_ids: string[];
  is_active?: boolean;
}

export interface UpdateSuperCheckerRequest extends Omit<CreateSuperCheckerRequest, 'password'> {
  id: string;
  password?: string | undefined;
}
