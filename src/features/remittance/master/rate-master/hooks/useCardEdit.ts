import { useMutation } from '@tanstack/react-query';
import { CardEditFormData } from '../tabs/card/form/card-edit-form.types';
import { updateCardData } from '../api/card-edit.api';

// Hook to update card data
export const useUpdateCardData = () => {
  return useMutation({
    mutationFn: (data: CardEditFormData & { id: string }) => updateCardData(data),
    onSuccess: () => {
      //console.log('Card data updated successfully');
    },
    onError: (error) => {
      // console.error('Error updating card data:', error);
    },
  });
};
