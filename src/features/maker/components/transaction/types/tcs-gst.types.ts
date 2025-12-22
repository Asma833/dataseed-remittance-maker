// Types for TCS Calculation
export type TCSCalculationPayload = {
  purpose: string;
  panNumber: string;
  sourceofFund: string;
  declarationAmt: string;
  txnAmount: string;
};

export type TCSCalculationResponse = {
  tcsAmount: number;
  totalAmount: number;
};
// Types for GST Calculation
export type GSTCalculationPayload = {
  txnAmount: string;
};

export type GSTCalculationResponse = {
  gstAmount: number;
  totalAmount: number;
};
