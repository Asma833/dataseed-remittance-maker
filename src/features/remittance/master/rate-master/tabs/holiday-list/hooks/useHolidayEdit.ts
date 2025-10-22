import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HolidayEditFormData } from '../type/holiday-edit-form.types';
import { updateHolidayData } from '../api/holiday-edit.api';
import { toast } from 'sonner';

// Hook to update holiday data
export const useUpdateHolidayData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HolidayEditFormData & { id: string }) => updateHolidayData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      toast.success('Holiday updated successfully');
    },
    onError: (error) => {
      console.error('Error updating holiday data:', error);
    },
  });
};