import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  BankAccount,
  CreateBankAccountRequest,
  UpdateBankAccountRequest,
} from '../api/bankAccounts';

/**
 * Hook to get bank accounts for an owner
 */
export const useGetBankAccounts = (ownerId: string) => {
  return useQuery<BankAccount[], Error>({
    queryKey: ['bankAccounts', ownerId],
    queryFn: () => getBankAccounts(ownerId),
    enabled: !!ownerId,
  });
};

/**
 * Hook to create a bank account
 */
export const useCreateBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<BankAccount, Error, CreateBankAccountRequest>({
    mutationFn: createBankAccount,
    onSuccess: (data) => {
      // Invalidate and refetch bank accounts
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', data.owner_id] });
    },
  });
};

/**
 * Hook to update a bank account
 */
export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<BankAccount, Error, UpdateBankAccountRequest>({
    mutationFn: updateBankAccount,
    onSuccess: (data) => {
      // Invalidate and refetch bank accounts
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', data.owner_id] });
    },
  });
};

/**
 * Hook to delete a bank account
 */
export const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; ownerId: string }>({
    mutationFn: ({ id }) => deleteBankAccount(id),
    onSuccess: (_, variables) => {
      // Invalidate and refetch bank accounts
      queryClient.invalidateQueries({ queryKey: ['bankAccounts', variables.ownerId] });
    },
  });
};
