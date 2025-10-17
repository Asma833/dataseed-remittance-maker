export interface CurrencyRate {
  id: string;
  currency_code: string;
  card_buy_rate: string;
  card_sell_rate: string;
  holiday_margin: string;
  time_wise_margin: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type CurrencyRateResponse = CurrencyRate[];