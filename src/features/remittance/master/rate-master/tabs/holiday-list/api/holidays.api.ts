import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CreateHolidayPayload } from '../table/types';

export interface HolidayResponse {
  id: string;
  holiday_name: string;
  date: string;
  year: number;
  is_active: boolean;
}

export const getHolidays = async (): Promise<HolidayResponse[]> => {
  const response = await axiosInstance.get(API.HOLIDAYS.LIST);
  return response.data;
};

export const getHolidayById = async (id: string): Promise<HolidayResponse> => {
  const response = await axiosInstance.get(API.HOLIDAYS.GET_BY_ID(id));
  return response.data;
};

export const createHoliday = async (payload: CreateHolidayPayload): Promise<HolidayResponse> => {
  const response = await axiosInstance.post(API.HOLIDAYS.CREATE, payload);
  return response.data;
};

export const updateHoliday = async (id: string, payload: any): Promise<HolidayResponse> => {
  const response = await axiosInstance.put(API.HOLIDAYS.UPDATE(id), payload);
  return response.data;
};