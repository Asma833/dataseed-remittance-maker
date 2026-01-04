import { Role } from '@/types/enums';

export type Permission = 'view_dashboard' | 'manage_agents' | 'view_transactions' | 'approve_transactions';

export type UserRole = 'branch_agent_maker';

export interface User {
  id: string;
  email: string;
  full_name: string;
  address_city?: string;
  address_state?: string;
  address_branch?: string;
  phone_number?: string;
  is_active: boolean;
  is_blocked: boolean;
  business_type?: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  roles: {
    id: string;
    role_name: string;
  }[];
  branch?: {
    id: string;
    name: string;
  } | null;
  bankAccount?: any | null;
  agent_users: {
    id: string;
    agent_id: string;
    user_id: string;
    role_id: string;
    checker_list: any[];
  }[];
}

export interface LoginResponse {
  message: string;
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
export interface ChangePasswordRequest {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
