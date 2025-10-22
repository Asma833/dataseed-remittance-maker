export interface HolidayData {
  id: string;
  sno?: number;
  created_at?: string;
  holiday_name: string;
  date: string;
  year: number;
  is_active: boolean;
}

export interface CreateHolidayPayload {
  holidayName: string;
  date: string;
  isActive: boolean;
}
