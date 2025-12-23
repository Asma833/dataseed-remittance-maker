export interface CurrencyRate {
  id: string;
  currency_code: string;
  card_buy_rate: string;
  card_sell_rate: string;
  rate?: string;
  holiday_margin: string;
  time_wise_margin: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type CurrencyRatesResponse = CurrencyRate[];

export type CurrencyRateResponse = CurrencyRate;

export interface UpdateTimewiseMarginPayload {
  currency_code: string;
  time_wise_margin: {
    '10-12': number;
    '12-02': number;
    '02-3.30': number;
    '3.30End': number;
    holiday: number;
    weekend: number;
    margin_type: number;
    upper_circuit: number;
  };
}

export interface UpdateTimewiseMarginResponse {
  success: boolean;
  message: string;
  data?: CurrencyRate;
}
