export interface BranchAgentData {
  id?: string;
  agent_vendor_code: string;
  agent_entity_name: string;
  full_name: string;
  email: string;
  role: string;
  type: string;
}

export interface CreateBranchAgentRequest {
  full_name: string;
  email: string;
  password: string;
  address_city: string;
  address_state: string;
  address_branch: string;
  phone_number: string;
  role: string;
  agent_ids: string[];
}

export interface UpdateBranchAgentRequest extends Omit<CreateBranchAgentRequest, 'password' | 'email'> {
  id: string;
  email?: string;
  password?: string | undefined;
}