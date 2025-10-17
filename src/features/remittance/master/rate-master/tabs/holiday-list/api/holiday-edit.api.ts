import { HolidayEditFormData } from '../type/holiday-edit-form.types';

// Dummy API URL
const HOLIDAY_EDIT_API_URL = 'https://api.example.com/holiday/edit';

// Function to update holiday data
export const updateHolidayData = async (holidayData: HolidayEditFormData & { id: string }): Promise<HolidayEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating holiday data:', holidayData);
      resolve(holidayData);
    }, 1000);
  });
};