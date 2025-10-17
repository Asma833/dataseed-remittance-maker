export interface RemittanceData {
  id: string | number;
  currency: string | number;
  'ttMargin10-12': string | number;
  'ttMargin12-02': string | number;
  'ttMargin02-3-30': string | number;
  'ttMargin03-30end': string | number;
  ttHolidayMargin: string | number;
  ttWeekendMargin: string | number;
  ttUpperCircuit:string | number;
}
