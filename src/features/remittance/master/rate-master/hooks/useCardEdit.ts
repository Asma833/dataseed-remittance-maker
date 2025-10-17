import { useMutation, useQuery } from '@tanstack/react-query';
import { CardEditFormData } from '../tabs/card/form/card-edit-form.types';
import { getCardDataById, updateCardData } from '../api/card-edit.api';

// Hook to get card data by ID
export const useGetCardData = (id: string) => {
  return useQuery({
    queryKey: ['cardData', id],
    queryFn: () => getCardDataById(id),
    enabled: !!id,
  });
};

// Hook to update card data
export const useUpdateCardData = () => {
  return useMutation({
    mutationFn: (data: CardEditFormData & { id: string }) => updateCardData(data),
    onSuccess: () => {
      console.log('Card data updated successfully');
    },
    onError: (error) => {
      console.error('Error updating card data:', error);
    },
  });
};