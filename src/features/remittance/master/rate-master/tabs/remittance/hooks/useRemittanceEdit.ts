import { useMutation } from '@tanstack/react-query';
import { RemittanceEditFormData } from '../type/remittance-edit-form.types';
import { updateRemittanceData } from '../api/remittance-edit.api';

// Hook to update remittance data
export const useUpdateRemittanceData = () => {
  return useMutation({
    mutationFn: (data: RemittanceEditFormData & { id: string | number }) => updateRemittanceData(data),
    onSuccess: () => {
      //console.log('Remittance data updated successfully');
    },
    onError: (error) => {
      //console.error('Error updating remittance data:', error);
    },
  });
};
