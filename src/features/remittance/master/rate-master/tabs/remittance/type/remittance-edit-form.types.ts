export interface RemittanceEditFormData {
  currencyType: 'inr' | 'percentage';
  currency: string;
  'ttMargin10-12': number | string;
  'ttMargin12-02': number | string;
  'ttMargin02-3-30': number | string;
  'ttMargin03-30end': number | string;
  ttHolidayMargin: number | string;
  ttWeekendMargin: number | string;
  ttUpperCircuit: string;
}
