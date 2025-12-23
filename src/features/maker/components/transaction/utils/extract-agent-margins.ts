interface CurrencyMargin {
  margin: number;
  currency_code: string;
}

interface AgentDetails {
  commission: {
    nostro_charges: {
      currency_list: CurrencyMargin[];
      all_currency_margin: number;
    };
    product_margin: {
      currency_list: CurrencyMargin[];
      all_currency_margin: number;
    };
    other_charges: {
      rate: number;
    };
  };
}

export interface ExtractedMargins {
  nostroMargin: number;
  productMargin: number;
  otherChargesRate: number;
}

export const extractAgentMargins = (
  agentDetails: AgentDetails,
  selectedCurrency: string
): ExtractedMargins => {
  const { commission } = agentDetails;

  // Extract nostro margin
  const nostroCurrency = commission.nostro_charges.currency_list.find(
    (item) => item.currency_code === selectedCurrency
  );
  const nostroMargin = nostroCurrency ? nostroCurrency.margin : commission.nostro_charges.all_currency_margin;

  // Extract product margin
  const productCurrency = commission.product_margin.currency_list.find(
    (item) => item.currency_code === selectedCurrency
  );
  const productMargin = productCurrency ? productCurrency.margin : commission.product_margin.all_currency_margin;

  // Extract other charges rate
  const otherChargesRate = commission.other_charges.rate;

  return {
    nostroMargin,
    productMargin,
    otherChargesRate,
  };
};