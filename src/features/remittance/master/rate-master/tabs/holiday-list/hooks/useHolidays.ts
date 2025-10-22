import { useQuery } from '@tanstack/react-query';
import { getHolidays, getHolidayById, HolidayResponse } from '../api/holidays.api';

export const useGetHolidays = () => {
  return useQuery<HolidayResponse[], Error>({
    queryKey: ['holidays'],
    queryFn: getHolidays,
  });
};

export const useGetHolidayById = (id: string) => {
  return useQuery<HolidayResponse, Error>({
    queryKey: ['holidays', id],
    queryFn: () => getHolidayById(id),
    enabled: !!id,
  });
};