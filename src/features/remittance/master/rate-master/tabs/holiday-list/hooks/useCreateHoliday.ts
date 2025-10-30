import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHoliday, HolidayResponse } from '../api/holidays.api';
import { CreateHolidayPayload } from '../table/types';
import { toast } from 'sonner';

export const useCreateHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation<HolidayResponse, Error, CreateHolidayPayload>({
    mutationFn: createHoliday,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holidays'] });
      toast.success('Holiday created successfully');
    },
  });
};
