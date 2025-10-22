import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { HolidayEditFormData } from '../type/holiday-edit-form.types';

// Function to update holiday data
export const updateHolidayData = async (holidayData: HolidayEditFormData & { id: string }): Promise<HolidayEditFormData> => {
  const { id, ...payload } = holidayData;
  const response = await axiosInstance.put(API.HOLIDAYS.UPDATE(id), payload);
  return response.data;
};