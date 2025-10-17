import { useMutation } from '@tanstack/react-query';
import { updateTimewiseMargin } from '../api/currency-rate.api';
import { UpdateTimewiseMarginPayload } from '../types/currency-rate.types';

// Hook to update timewise margin for currency rates
export const useUpdateTimewiseMargin = () => {
  return useMutation({
    mutationFn: (data: UpdateTimewiseMarginPayload) => updateTimewiseMargin(data),
    onSuccess: () => {
      console.log('Timewise margin updated successfully');
    },
    onError: (error) => {
      console.error('Error updating timewise margin:', error);
    },
  });
};