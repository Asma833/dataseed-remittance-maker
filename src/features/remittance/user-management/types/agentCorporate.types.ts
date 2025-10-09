export interface AgentCorporate {
  id: string;
  entity_name: string;
  pan_number: string;
  date_of_incorporation: string;
  entity_type: string;
  cin: string;
  address: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string;
  owner_type: string;
}

export interface CreateAgentCorporateRequest {
  entity_name: string;
  pan_number: string;
  date_of_incorporation: string;
  entity_type: string;
  cin?: string;
  address?: string;
  owner_id: string;
  owner_type: string;
}

export interface UpdateAgentCorporateRequest extends CreateAgentCorporateRequest {
  id: string;
}