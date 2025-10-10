import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface BankAccount {
  id: string;
  hashed_key: string;
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  is_beneficiary: boolean;
  created_by: string | null;
  updated_by: string | null;
  owner_id: string;
  owner_type: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBankAccountRequest {
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  bank_branch: string;
  ifsc_code: string;
  owner_id: string;
  owner_type: string;
}

export interface UpdateBankAccountRequest extends CreateBankAccountRequest {
  id: string;
}

/**
 * Get bank accounts for an owner
 */
export const getBankAccounts = async (ownerId: string): Promise<BankAccount[]> => {
  const { data } = await axiosInstance.get<BankAccount[]>(API.USER_MANAGEMENT.BANK_ACCOUNTS.LIST(ownerId));
  return data;
};

/**
 * Create a new bank account
 */
export const createBankAccount = async (request: CreateBankAccountRequest): Promise<BankAccount> => {
  const { data } = await axiosInstance.post<BankAccount>(API.USER_MANAGEMENT.BANK_ACCOUNTS.CREATE, request);
  return data;
};

/**
 * Update a bank account
 */
export const updateBankAccount = async (request: UpdateBankAccountRequest): Promise<BankAccount> => {
  const { id, ...payload } = request;
  const { data } = await axiosInstance.put<BankAccount>(API.USER_MANAGEMENT.BANK_ACCOUNTS.UPDATE(id), payload);
  return data;
};

/**
 * Delete a bank account
 */
export const deleteBankAccount = async (id: string): Promise<void> => {
  await axiosInstance.delete(API.USER_MANAGEMENT.BANK_ACCOUNTS.DELETE(id));
};
