import { useMutation } from '@tanstack/react-query';
import { CurrencyEditFormData } from '../type/currency-edit-form.types';
import { updateCurrencyData } from '../api/currency-edit.api';

// Hook to update currency data
export const useUpdateCurrencyData = () => {
  return useMutation({
    mutationFn: (data: CurrencyEditFormData & { id: string }) => updateCurrencyData(data),
    onSuccess: () => {
      console.log('Currency data updated successfully');
    },
    onError: (error) => {
      console.error('Error updating currency data:', error);
    },
  });
};