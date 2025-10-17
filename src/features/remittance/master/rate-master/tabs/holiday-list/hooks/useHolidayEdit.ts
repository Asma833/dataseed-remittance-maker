import { useMutation } from '@tanstack/react-query';
import { HolidayEditFormData } from '../type/holiday-edit-form.types';
import { updateHolidayData } from '../api/holiday-edit.api';

// Hook to update holiday data
export const useUpdateHolidayData = () => {
  return useMutation({
    mutationFn: (data: HolidayEditFormData & { id: string }) => updateHolidayData(data),
    onSuccess: () => {
      console.log('Holiday data updated successfully');
    },
    onError: (error) => {
      console.error('Error updating holiday data:', error);
    },
  });
};