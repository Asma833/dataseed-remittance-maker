export interface RemittanceData {
  id: string | number;
  currency: string;
  'ttMargin10-12': number;
  'ttMargin12-02': number;
  'ttMargin02-3-30': number;
  'ttMargin03-30end': number;
  'ttHolidayMargin': number;
  'ttWeekendMargin': number;
}